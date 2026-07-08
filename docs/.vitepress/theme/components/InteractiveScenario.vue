<script setup>
import { computed, nextTick, onMounted, onUnmounted, reactive, ref } from "vue";

const mapRef = ref(null);
const log = ref("Select models, draw a box, or run a batch operation.");
const selectedUids = ref(["interactive_red_001", "interactive_red_002", "interactive_red_003"]);
const boxSelectionMode = ref(false);
const interactiveMoveMode = ref(false);
const interactiveRotateMode = ref(false);
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
  await editor.loadScene(scene, { recordHistory: false });
  setSelectedUids(["interactive_red_001", "interactive_red_002", "interactive_red_003"]);
  log.value = "Scene reset. Three red models are selected.";
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
  editor?.destroy?.();
  editor = null;
});
</script>

<template>
  <div class="interactive-scenario">
    <div class="interactive-scenario__toolbar">
      <button type="button" @click="startBoxSelection">
        {{ boxSelectionMode ? "Stop Box Select" : "Box Select" }}
      </button>
      <button type="button" @click="syncSelection">Sync Highlight</button>
      <button type="button" @click="clearSelection">Clear</button>
      <strong>{{ selectedLabel }}</strong>
      <span>{{ log }}</span>
    </div>

    <div class="interactive-scenario__batch">
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

    <div class="interactive-scenario__toolbar">
      <button type="button" @click="run('annotation')">Add Annotation</button>
      <button type="button" @click="run('measure')">Measure</button>
      <button type="button" @click="run('context')">Context Menu</button>
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

.interactive-scenario__batch input,
.interactive-scenario__batch select {
  width: 86px;
  height: 30px;
  box-sizing: border-box;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.interactive-scenario__map {
  width: 100%;
  height: 560px;
}
</style>
