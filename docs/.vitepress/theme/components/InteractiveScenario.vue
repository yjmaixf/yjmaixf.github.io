<script setup>
import { computed, nextTick, onMounted, onUnmounted, reactive, ref } from "vue";

const props = defineProps({
  mode: {
    type: String,
    default: "batch"
  }
});

const mapRef = ref(null);
const log = ref("Select models, draw a box, or run an operation.");
const selectedUids = ref(["interactive_red_001", "interactive_red_002", "interactive_red_003"]);
const boxSelectionMode = ref(false);
const interactiveMoveMode = ref(false);
const interactiveRotateMode = ref(false);
const selectedAnnotationId = ref(null);
let selectionOff = null;
let editor = null;

const batchForm = reactive({
  deltaLon: 0.08,
  deltaLat: 0.03,
  heading: 90,
  spacing: 0.08,
  formation: "grid",
  columns: 3,
  rotateAngle: 25
});

const annotationStyleForm = reactive({
  strokeColor: "#ff5c5c",
  fillColor: "rgba(255,92,92,0.18)",
  strokeWidth: 3,
  lineDash: "none",
  pointRadius: 7,
  labelColor: "#ffffff",
  labelBackgroundColor: "rgba(9,18,30,0.72)"
});

const resourceOptions = {
  tileUrlTemplate: "/Sate/{z}/{x}/{y}.png",
  assetBaseUrl: "/",
  modelIconResolver: model => {
    const nation = ["red", "blue", "white"].includes(model?.nation) ? model.nation : "white";
    const icon = model?.iconKey || model?.NodeType || "default";
    return `/two/images/${nation}/${icon}.png`;
  },
  templateIconResolver: template => `/two/images/white/${template?.templateIcon || template?.NodeType || "default"}.png`,
  annotationPointIconUrl: "/two/images/white/car.png"
};

const mapOptions = {
  projection: "EPSG:3857",
  center: [116.42, 39.86],
  zoom: 7,
  minZoom: 0,
  maxZoom: 18,
  multiWorld: true,
  smoothExtentConstraint: true
};

const scene = {
  mode: "edit",
  metadata: { name: "Interactive batch preview" },
  models: [
    {
      UID: "interactive_red_001",
      showName: "Red Radar",
      name: "Red Radar",
      NodeType: "radar",
      iconKey: "default",
      modelType: "PLATFORM",
      nation: "red",
      lon: 116.18,
      lat: 39.82,
      heading: 65,
      targetUID: "interactive_blue_001"
    },
    {
      UID: "interactive_red_002",
      showName: "Red Vehicle 1",
      name: "Red Vehicle 1",
      NodeType: "car",
      iconKey: "car",
      modelType: "PLATFORM",
      nation: "red",
      lon: 116.28,
      lat: 39.78,
      heading: 90
    },
    {
      UID: "interactive_red_003",
      showName: "Red Vehicle 2",
      name: "Red Vehicle 2",
      NodeType: "car",
      iconKey: "car",
      modelType: "PLATFORM",
      nation: "red",
      lon: 116.36,
      lat: 39.74,
      heading: 90
    },
    {
      UID: "interactive_blue_001",
      showName: "Blue Ship",
      name: "Blue Ship",
      NodeType: "ship",
      iconKey: "ship",
      modelType: "PLATFORM",
      nation: "blue",
      lon: 116.72,
      lat: 40.05,
      heading: 245
    },
    {
      UID: "interactive_blue_002",
      showName: "Blue Aircraft",
      name: "Blue Aircraft",
      NodeType: "b2",
      iconKey: "b2",
      modelType: "AIRCRAFT",
      nation: "blue",
      lon: 116.56,
      lat: 39.68,
      heading: 305
    },
    {
      UID: "interactive_red_004",
      showName: "Red Missile",
      name: "Red Missile",
      NodeType: "missile",
      iconKey: "missile",
      modelType: "WEAPON",
      nation: "red",
      lon: 116.1,
      lat: 39.94,
      heading: 40,
      targetUID: "interactive_blue_001"
    }
  ],
  relations: [
    {
      id: "interactive_attack",
      type: "attack",
      sourceUID: "interactive_red_004",
      targetUID: "interactive_blue_001",
      style: { width: 3, lineType: "flowDash" }
    }
  ],
  effects: [],
  annotations: [],
  display: {
    showPopup: true,
    showModelName: true,
    showTargetLine: true,
    headingVisible: { red: true, blue: true },
    targetLineStyle: { redColor: "#ff5c5c", blueColor: "#409eff", width: 3, lineType: "flowDash" }
  }
};

const selectedLabel = computed(() => `${selectedUids.value.length} selected`);
const canBatchOperate = computed(() => selectedUids.value.length > 0);
const isBatchMode = computed(() => props.mode === "batch");
const isAnnotationMode = computed(() => props.mode === "annotations");
const isMeasureMode = computed(() => props.mode === "measure");
const isContextMode = computed(() => props.mode === "context");

const initialLog = () => {
  if (isAnnotationMode.value) return "选择标绘类型，或直接添加预置标绘到地图。";
  if (isMeasureMode.value) return "选择距离或面积测量，然后在地图上点击绘制。";
  if (isContextMode.value) return "启用右键菜单后，在模型上右键触发业务动作。";
  return "Select models, draw a box, or run a batch operation.";
};

const setSelectedUids = uids => {
  selectedUids.value = Array.from(new Set((uids || []).map(uid => String(uid))));
  editor?.setBatchSelection?.(selectedUids.value);
};

const stopTransformModes = () => {
  editor?.stopBatchTransformMode?.();
  interactiveMoveMode.value = false;
  interactiveRotateMode.value = false;
};

const stopBoxSelection = () => {
  editor?.stopBoxSelectionMode?.();
  boxSelectionMode.value = false;
};

const resetScene = async () => {
  stopBoxSelection();
  stopTransformModes();
  editor?.endMeasure?.();
  await editor.loadScene(scene, { recordHistory: false });
  setSelectedUids(["interactive_red_001", "interactive_red_002", "interactive_red_003"]);
  selectedAnnotationId.value = null;
  if (selectionOff) {
    selectionOff();
    selectionOff = null;
  }
  if (isContextMode.value) {
    enableContextMenu();
  }
  log.value = initialLog();
};

const startBoxSelection = () => {
  if (boxSelectionMode.value) {
    stopBoxSelection();
    log.value = "Box selection stopped.";
    return;
  }

  stopTransformModes();
  const started = editor.startBoxSelectionMode?.(({ uids }) => {
    setSelectedUids(uids);
    stopBoxSelection();
    log.value = uids.length
      ? `Box selected ${uids.length} models.`
      : "No models in the box.";
  });

  if (!started && started !== undefined) {
    log.value = "Box selection could not start.";
    return;
  }

  boxSelectionMode.value = true;
  log.value = "Drag a box on the map to select models.";
};

const syncSelection = () => {
  editor?.setBatchSelection?.(selectedUids.value);
  log.value = `Synced ${selectedUids.value.length} selected models to the map.`;
};

const clearSelection = () => {
  stopBoxSelection();
  stopTransformModes();
  setSelectedUids([]);
  log.value = "Batch selection cleared.";
};

const ensureSelection = () => {
  if (selectedUids.value.length) return true;
  log.value = "Select models first.";
  return false;
};

const applyBatchMove = async () => {
  if (!ensureSelection()) return;
  stopTransformModes();
  const updated = await editor.batchMoveModels?.(selectedUids.value, {
    deltaLon: batchForm.deltaLon,
    deltaLat: batchForm.deltaLat
  });
  log.value = `Moved ${updated?.length || 0} models.`;
};

const applyBatchHeading = async () => {
  if (!ensureSelection()) return;
  stopTransformModes();
  const updated = await editor.batchSetModelHeading?.(selectedUids.value, batchForm.heading);
  log.value = `Updated heading for ${updated?.length || 0} models.`;
};

const applyBatchLayout = async () => {
  if (!ensureSelection()) return;
  stopTransformModes();
  const updated = await editor.batchLayoutModels?.(selectedUids.value, {
    spacing: batchForm.spacing,
    formation: batchForm.formation,
    columns: batchForm.columns
  });
  log.value = `Applied ${batchForm.formation} layout to ${updated?.length || 0} models.`;
};

const applyBatchRotation = async () => {
  if (!ensureSelection()) return;
  stopTransformModes();
  const updated = await editor.batchRotateModels?.(selectedUids.value, batchForm.rotateAngle);
  log.value = `Rotated ${updated?.length || 0} models.`;
};

const toggleInteractiveMove = () => {
  if (interactiveMoveMode.value) {
    stopTransformModes();
    log.value = "Mouse move mode stopped.";
    return;
  }
  if (!ensureSelection()) return;
  stopBoxSelection();
  const started = editor.startBatchMoveMode?.(selectedUids.value, {
    onCommit: updated => {
      interactiveMoveMode.value = false;
      log.value = `Mouse move committed for ${updated?.length || 0} models.`;
    },
    onCancel: () => {
      interactiveMoveMode.value = false;
      log.value = "Mouse move cancelled.";
    }
  });
  interactiveMoveMode.value = Boolean(started);
  log.value = started
    ? "Hold the left mouse button and drag to move the selected group."
    : "Mouse move mode could not start.";
};

const toggleInteractiveRotate = () => {
  if (interactiveRotateMode.value) {
    stopTransformModes();
    log.value = "Mouse rotate mode stopped.";
    return;
  }
  if (!ensureSelection()) return;
  stopBoxSelection();
  const started = editor.startBatchRotateMode?.(selectedUids.value, {
    onCommit: updated => {
      interactiveRotateMode.value = false;
      log.value = `Mouse rotation committed for ${updated?.length || 0} models.`;
    },
    onCancel: () => {
      interactiveRotateMode.value = false;
      log.value = "Mouse rotation cancelled.";
    }
  });
  interactiveRotateMode.value = Boolean(started);
  log.value = started
    ? "Hold the left mouse button and drag around the group center to rotate."
    : "Mouse rotate mode could not start.";
};

const removeSelected = async () => {
  if (!ensureSelection()) return;
  stopBoxSelection();
  stopTransformModes();
  const count = selectedUids.value.length;
  await editor.removeModels?.(selectedUids.value, { recordHistory: true });
  setSelectedUids([]);
  log.value = `Removed ${count} models.`;
};

const createCircleCoordinates = (center, radius, steps = 72) => {
  const [lon, lat] = center;
  const coordinates = [];
  for (let index = 0; index <= steps; index += 1) {
    const angle = (Math.PI * 2 * index) / steps;
    coordinates.push([
      lon + Math.cos(angle) * radius,
      lat + Math.sin(angle) * radius
    ]);
  }
  return coordinates;
};

const getAnnotationStyle = () => ({
  strokeColor: annotationStyleForm.strokeColor,
  fillColor: annotationStyleForm.fillColor,
  strokeWidth: annotationStyleForm.strokeWidth,
  lineDash: annotationStyleForm.lineDash === "none" ? false : annotationStyleForm.lineDash,
  pointRadius: annotationStyleForm.pointRadius,
  pointFillColor: annotationStyleForm.strokeColor,
  labelColor: annotationStyleForm.labelColor,
  labelBackgroundColor: annotationStyleForm.labelBackgroundColor
});

const addPresetAnnotation = async type => {
  if (!editor) return;
  const id = `${type}-anno-${Date.now()}`;
  const style = getAnnotationStyle();
  const annotationMap = {
    point: {
      id,
      name: "集结点",
      type: "point",
      category: "basic",
      style,
      geometry: { type: "point", coordinates: [116.18, 39.86] }
    },
    text: {
      id,
      name: "指挥备注",
      type: "text",
      text: "Hold Line",
      category: "basic",
      style,
      geometry: { type: "point", coordinates: [116.42, 40.05] }
    },
    arrow: {
      id,
      name: "攻击箭头",
      type: "arrow",
      category: "military",
      text: "Attack",
      style,
      geometry: {
        type: "line",
        coordinates: [
          [116.16, 39.78],
          [116.36, 39.88],
          [116.62, 39.98]
        ]
      }
    },
    polygon: {
      id,
      name: "禁飞区",
      type: "polygon",
      category: "noFlyZone",
      text: "禁飞区",
      style,
      geometry: {
        type: "polygon",
        coordinates: [
          [116.52, 39.78],
          [116.72, 39.82],
          [116.74, 39.98],
          [116.5, 40.02],
          [116.52, 39.78]
        ]
      }
    },
    circle: {
      id,
      name: "警戒圆",
      type: "circle",
      shape: "circle",
      category: "noFlyZone",
      text: "警戒圆",
      style,
      geometry: {
        type: "polygon",
        coordinates: createCircleCoordinates([116.34, 39.94], 0.08)
      }
    }
  };
  const created = await editor.addAnnotation(annotationMap[type]);
  selectedAnnotationId.value = created?.id || id;
  editor.setSelectedAnnotation?.(selectedAnnotationId.value);
  log.value = `已添加${annotationMap[type].name}。`;
};

const startAnnotationTool = type => {
  editor?.cancelTool?.();
  const isArea = type === "polygon" || type === "circle";
  editor.startAnnotationMode?.(type, {
    name: type === "circle" ? "交互绘制圆" : type === "polygon" ? "交互绘制区域" : "交互标绘",
    category: isArea ? "military" : "basic",
    drawShape: type === "circle" ? "circle" : "custom",
    text: isArea ? "交互区域" : "",
    style: getAnnotationStyle()
  }, annotation => {
    selectedAnnotationId.value = annotation.id;
    editor.setSelectedAnnotation?.(annotation.id);
    log.value = `交互标绘完成：${annotation.name || annotation.id}`;
  });
  log.value = `已开启 ${type} 标绘，请在地图上点击绘制。`;
};

const stopAnnotationTool = () => {
  editor?.cancelTool?.();
  log.value = "已退出标绘模式。";
};

const removeSelectedAnnotation = async () => {
  if (!selectedAnnotationId.value) {
    log.value = "当前没有选中的标绘。";
    return;
  }
  await editor.removeAnnotation?.(selectedAnnotationId.value);
  log.value = `已删除标绘 ${selectedAnnotationId.value}。`;
  selectedAnnotationId.value = null;
};

const startDistanceMeasure = () => {
  editor?.cancelTool?.();
  editor.startMeasureMode?.("distance", result => {
    log.value = `距离测量完成：${result.label || `${result.value || ""}${result.unit || ""}`}`;
  });
  log.value = "距离测量已开启，请在地图上点击路径点。";
};

const startAreaMeasure = () => {
  editor?.cancelTool?.();
  editor.startMeasureMode?.("area", result => {
    log.value = `面积测量完成：${result.label || `${result.value || ""}${result.unit || ""}`}`;
  });
  log.value = "面积测量已开启，请在地图上点击多边形边界。";
};

const endMeasureTool = () => {
  editor?.endMeasure?.();
  log.value = "测量工具已结束。";
};

const enableContextMenu = () => {
  editor.setContextMenuItems?.([
    {
      id: "focus",
      label: "聚焦模型",
      visible: ({ model }) => Boolean(model),
      action: ({ model }) => {
        editor.focusModel?.(model.UID);
        log.value = `已聚焦 ${model.showName || model.UID}。`;
      }
    },
    {
      id: "select",
      label: "选中模型",
      visible: ({ model }) => Boolean(model),
      action: ({ model }) => {
        setSelectedUids([model.UID]);
        editor.selectModel?.(model.UID);
        log.value = `已选中 ${model.showName || model.UID}。`;
      }
    },
    {
      id: "target",
      label: "设为导弹目标",
      visible: ({ model }) => Boolean(model),
      action: async ({ model }) => {
        await editor.updateModel("interactive_red_004", {
          targetUID: model.UID
        });
        log.value = `红方导弹目标已设置为 ${model.showName || model.UID}。`;
      }
    }
  ], { enabled: true });
  editor.setContextMenuHandler?.(payload => {
    if (!payload?.model) {
      log.value = "地图空白处右键：没有模型上下文。";
    }
  });
  log.value = "右键菜单已启用，请在模型上右键。";
};

const enableSelectionLink = () => {
  if (selectionOff) {
    log.value = "选择联动已经启用。";
    return;
  }
  selectionOff = editor.onSelectionChange?.(feature => {
    const uid = feature?.get?.("UID");
    if (!uid) return;
    setSelectedUids([uid]);
    log.value = `onSelectionChange 捕获到模型：${uid}`;
  });
  log.value = "选择联动已启用，点击模型会同步到日志和选中状态。";
};

const focusContextSelection = () => {
  const uid = selectedUids.value[0];
  if (!uid) {
    log.value = "请先通过右键或点击选中一个模型。";
    return;
  }
  editor.focusModel?.(uid);
  log.value = `已定位到 ${uid}。`;
};

async function run(action) {
  if (!editor) return;
  if (action === "annotation") {
    await editor.addAnnotation({
      id: `manual-anno-${Date.now()}`,
      name: "Manual Area",
      type: "polygon",
      category: "military",
      text: "Manual Area",
      geometry: {
        type: "polygon",
        coordinates: [
          [116.34, 39.75],
          [116.62, 39.8],
          [116.66, 39.98],
          [116.38, 40.02],
          [116.34, 39.75]
        ]
      }
    });
    log.value = "Added one polygon annotation.";
  }
  if (action === "measure") {
    editor.startMeasureMode?.("distance", result => {
      log.value = `Measure complete: ${result.label}`;
    });
    log.value = "Distance measure mode started. Click points on the map.";
  }
  if (action === "context") {
    editor.setContextMenuItems?.([
      {
        id: "focus",
        label: "Focus model",
        visible: ({ model }) => Boolean(model),
        action: ({ model }) => {
          editor.focusModel?.(model.UID);
          log.value = `Focused ${model.showName || model.UID}.`;
        }
      },
      {
        id: "select",
        label: "Select model",
        visible: ({ model }) => Boolean(model),
        action: ({ model }) => {
          setSelectedUids([model.UID]);
          log.value = `Selected ${model.showName || model.UID}.`;
        }
      }
    ], { enabled: true });
    log.value = "Context menu enabled. Right-click a model.";
  }
  if (action === "undo") {
    await editor.updateModel("interactive_red_001", {
      lon: 116.34,
      lat: 39.95,
      heading: 120
    });
    log.value = "Moved Red Radar. Use Undo or Redo.";
  }
  if (action === "undoNow") {
    const ok = await editor.undo?.();
    log.value = ok ? "Undo complete." : "Nothing to undo.";
  }
  if (action === "redoNow") {
    const ok = await editor.redo?.();
    log.value = ok ? "Redo complete." : "Nothing to redo.";
  }
}

onMounted(async () => {
  await import("openlayers2dsceneeditor/style.css");
  const { createMapEngine, createScenarioEditor } = await import("openlayers2dsceneeditor");
  const engine = createMapEngine();
  editor = createScenarioEditor({
    engine,
    mapApp: engine.getMapApp(),
    context: engine.getContext()
  });
  editor.init({
    ...resourceOptions,
    ...mapOptions,
    target: mapRef.value
  });
  await editor.ready();
  await nextTick();
  await resetScene();
});

onUnmounted(() => {
  stopBoxSelection();
  stopTransformModes();
  editor?.endMeasure?.();
  if (selectionOff) {
    selectionOff();
    selectionOff = null;
  }
  editor?.destroy?.();
  editor = null;
});
</script>

<template>
  <div class="interactive-scenario">
    <div v-if="isBatchMode" class="interactive-scenario__toolbar">
      <button type="button" @click="startBoxSelection">
        {{ boxSelectionMode ? "Stop Box Select" : "Box Select" }}
      </button>
      <button type="button" @click="syncSelection">Sync Highlight</button>
      <button type="button" @click="clearSelection">Clear</button>
      <strong>{{ selectedLabel }}</strong>
      <span>{{ log }}</span>
    </div>

    <div v-if="isBatchMode" class="interactive-scenario__batch">
      <label>
        Move Lon
        <input v-model.number="batchForm.deltaLon" type="number" step="0.01" />
      </label>
      <label>
        Move Lat
        <input v-model.number="batchForm.deltaLat" type="number" step="0.01" />
      </label>
      <button type="button" :disabled="!canBatchOperate" @click="applyBatchMove">Batch Move</button>
      <button type="button" :disabled="!canBatchOperate" @click="toggleInteractiveMove">
        {{ interactiveMoveMode ? "Stop Mouse Move" : "Mouse Move" }}
      </button>

      <label>
        Heading
        <input v-model.number="batchForm.heading" type="number" step="5" />
      </label>
      <button type="button" :disabled="!canBatchOperate" @click="applyBatchHeading">Set Heading</button>

      <label>
        Layout
        <select v-model="batchForm.formation">
          <option value="row">Row</option>
          <option value="column">Column</option>
          <option value="grid">Grid</option>
          <option value="circle">Circle</option>
        </select>
      </label>
      <label>
        Spacing
        <input v-model.number="batchForm.spacing" type="number" min="0.01" step="0.01" />
      </label>
      <label>
        Columns
        <input v-model.number="batchForm.columns" type="number" min="2" max="12" step="1" />
      </label>
      <button type="button" :disabled="!canBatchOperate" @click="applyBatchLayout">Apply Layout</button>

      <label>
        Rotate
        <input v-model.number="batchForm.rotateAngle" type="number" step="5" />
      </label>
      <button type="button" :disabled="!canBatchOperate" @click="applyBatchRotation">Batch Rotate</button>
      <button type="button" :disabled="!canBatchOperate" @click="toggleInteractiveRotate">
        {{ interactiveRotateMode ? "Stop Mouse Rotate" : "Mouse Rotate" }}
      </button>
      <button type="button" :disabled="!canBatchOperate" @click="removeSelected">Delete Selected</button>
    </div>

    <div v-if="isAnnotationMode" class="interactive-scenario__toolbar">
      <label class="interactive-scenario__styleField">
        线色
        <input v-model="annotationStyleForm.strokeColor" type="color" />
      </label>
      <label class="interactive-scenario__styleField">
        填充
        <input v-model="annotationStyleForm.fillColor" type="text" />
      </label>
      <label class="interactive-scenario__styleField">
        线宽
        <input v-model.number="annotationStyleForm.strokeWidth" type="number" min="1" max="12" step="1" />
      </label>
      <label class="interactive-scenario__styleField">
        虚线
        <select v-model="annotationStyleForm.lineDash">
          <option value="none">none</option>
          <option value="dash">dash</option>
          <option value="dot">dot</option>
          <option value="dashDot">dashDot</option>
        </select>
      </label>
      <label class="interactive-scenario__styleField">
        点半径
        <input v-model.number="annotationStyleForm.pointRadius" type="number" min="3" max="18" step="1" />
      </label>
      <label class="interactive-scenario__styleField">
        文字色
        <input v-model="annotationStyleForm.labelColor" type="color" />
      </label>
      <button type="button" @click="addPresetAnnotation('point')">添加点</button>
      <button type="button" @click="addPresetAnnotation('text')">添加文本</button>
      <button type="button" @click="addPresetAnnotation('arrow')">添加箭头</button>
      <button type="button" @click="addPresetAnnotation('polygon')">添加禁飞区</button>
      <button type="button" @click="addPresetAnnotation('circle')">添加圆形区域</button>
      <button type="button" @click="startAnnotationTool('point')">绘制点</button>
      <button type="button" @click="startAnnotationTool('line')">绘制线</button>
      <button type="button" @click="startAnnotationTool('polygon')">绘制面</button>
      <button type="button" @click="startAnnotationTool('circle')">绘制圆</button>
      <button type="button" @click="stopAnnotationTool">退出标绘</button>
      <button type="button" @click="removeSelectedAnnotation">删除选中标绘</button>
      <button type="button" @click="resetScene">Reset</button>
      <span>{{ log }}</span>
    </div>

    <div v-if="isMeasureMode" class="interactive-scenario__toolbar">
      <button type="button" @click="startDistanceMeasure">距离测量</button>
      <button type="button" @click="startAreaMeasure">面积测量</button>
      <button type="button" @click="endMeasureTool">结束测量</button>
      <button type="button" @click="resetScene">Reset</button>
      <span>{{ log }}</span>
    </div>

    <div v-if="isContextMode" class="interactive-scenario__toolbar">
      <button type="button" @click="enableContextMenu">启用右键菜单</button>
      <button type="button" @click="enableSelectionLink">启用选择联动</button>
      <button type="button" @click="focusContextSelection">聚焦选中模型</button>
      <button type="button" @click="resetScene">Reset</button>
      <strong>{{ selectedLabel }}</strong>
      <span>{{ log }}</span>
    </div>

    <div v-if="isBatchMode" class="interactive-scenario__toolbar">
      <button type="button" @click="run('undo')">Move One</button>
      <button type="button" @click="run('undoNow')">Undo</button>
      <button type="button" @click="run('redoNow')">Redo</button>
      <button type="button" @click="resetScene">Reset</button>
    </div>

    <div ref="mapRef" class="interactive-scenario__map"></div>
  </div>
</template>

<style scoped>
.interactive-scenario {
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.interactive-scenario__toolbar,
.interactive-scenario__batch {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.interactive-scenario__batch {
  align-items: flex-end;
}

.interactive-scenario__toolbar button,
.interactive-scenario__batch button {
  height: 30px;
  padding: 0 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.interactive-scenario__toolbar button:disabled,
.interactive-scenario__batch button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.interactive-scenario__toolbar strong,
.interactive-scenario__toolbar span {
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.interactive-scenario__batch label {
  display: grid;
  gap: 3px;
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.interactive-scenario__styleField {
  display: grid;
  gap: 3px;
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.interactive-scenario__batch input,
.interactive-scenario__batch select,
.interactive-scenario__styleField input,
.interactive-scenario__styleField select {
  width: 86px;
  height: 30px;
  box-sizing: border-box;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.interactive-scenario__styleField input[type="color"] {
  width: 42px;
  padding: 2px;
}

.interactive-scenario__styleField input[type="text"] {
  width: 150px;
}

.interactive-scenario__map {
  width: 100%;
  height: 560px;
}
</style>
