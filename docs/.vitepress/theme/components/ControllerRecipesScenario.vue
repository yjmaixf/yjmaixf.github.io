<script setup>
import { computed, nextTick, onMounted, onUnmounted, reactive, ref } from "vue";

const props = defineProps({
  recipe: {
    type: String,
    default: ""
  }
});

const mainMapRef = ref(null);
const mirrorMapRef = ref(null);
const log = ref("选择一个配方并点击按钮，观察地图和日志变化。");
const activeRecipe = ref(props.recipe || "runtime");
const selectedUid = ref("recipe_air_001");
const localRegionCount = ref(0);
const frameMergerEnabled = ref(false);
const eventListening = ref(false);
const mirrorReady = ref(false);
const hasMirror = ref(false);
const selectionList = ref(["recipe_air_001"]);
const issues = ref([]);

let editor = null;
let mirrorEditor = null;
let eventOffs = [];
let streamTimer = null;
let streamStep = 0;

const form = reactive({
  deployLon: 116.28,
  deployLat: 39.86,
  heading: 45,
  routeName: "巡航航路 A",
  moveLon: 116.48,
  moveLat: 39.98
});

const recipes = [
  { id: "runtime", label: "模板与校验" },
  { id: "models", label: "模型 upsert" },
  { id: "route", label: "航路编辑" },
  { id: "mounts", label: "载荷挂载" },
  { id: "tiles", label: "局部瓦片" },
  { id: "events", label: "事件联动" },
  { id: "frame", label: "帧合并" },
  { id: "multi", label: "多实例" }
];

const visibleRecipes = computed(() => {
  if (!props.recipe) return recipes;
  return recipes.filter(item => item.id === props.recipe);
});

const shouldUseMirror = computed(() => !props.recipe || activeRecipe.value === "multi");

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
  center: [116.48, 39.9],
  zoom: 7,
  minZoom: 0,
  maxZoom: 18,
  multiWorld: true,
  smoothExtentConstraint: true
};

const templates = [
  {
    NodeType: "aircraft",
    name: "飞机模板",
    modelType: "AIRCRAFT",
    templateCategory: "platform",
    iconKey: "b2",
    mountable: true,
    nation: "red"
  },
  {
    NodeType: "missile",
    name: "导弹载荷",
    modelType: "MISSILE",
    templateCategory: "payload",
    iconKey: "missile",
    mountable: true,
    nation: "white"
  },
  {
    NodeType: "radar",
    name: "雷达站",
    modelType: "RADAR",
    templateCategory: "platform",
    iconKey: "default",
    mountable: true,
    nation: "red"
  }
];

const baseScene = {
  mode: "edit",
  metadata: { name: "Controller interactive recipes" },
  models: [
    {
      UID: "recipe_air_001",
      showName: "红方飞机",
      name: "红方飞机",
      NodeType: "aircraft",
      iconKey: "b2",
      modelType: "AIRCRAFT",
      nation: "red",
      lon: 116.24,
      lat: 39.78,
      heading: 65,
      mountable: true,
      line: [
        { lon: 116.24, lat: 39.78, height: 7600, speed: 220 },
        { lon: 116.42, lat: 39.88, height: 8000, speed: 230 }
      ]
    },
    {
      UID: "recipe_radar_001",
      showName: "红方雷达",
      name: "红方雷达",
      NodeType: "radar",
      iconKey: "default",
      modelType: "RADAR",
      nation: "red",
      lon: 116.08,
      lat: 39.94,
      heading: 35,
      targetUID: "recipe_ship_001"
    },
    {
      UID: "recipe_ship_001",
      showName: "蓝方舰船",
      name: "蓝方舰船",
      NodeType: "ship",
      iconKey: "ship",
      modelType: "PLATFORM",
      nation: "blue",
      lon: 116.78,
      lat: 40.04,
      heading: 245
    }
  ],
  relations: [
    {
      id: "recipe_detect_001",
      type: "detect",
      sourceUID: "recipe_radar_001",
      targetUID: "recipe_ship_001",
      label: "探测",
      style: { width: 2, lineType: "dash" }
    }
  ],
  effects: [
    {
      id: "recipe_radar_scan",
      type: "radar",
      sourceUID: "recipe_radar_001",
      geometry: { shape: "sector", radius: 115000, angle: 95, direction: 35 },
      style: { animation: "scan" },
      label: "雷达扫描"
    }
  ],
  annotations: [],
  display: {
    showPopup: true,
    showModelName: true,
    showTargetLine: true,
    headingVisible: { red: true, blue: true },
    targetLineStyle: { redColor: "#ff5c5c", blueColor: "#409eff", width: 3, lineType: "flowDash" },
    relationLineStyles: {
      detect: { color: "rgba(72, 167, 255, 0.95)", width: 2, lineType: "dash" },
      attack: { color: "rgba(255, 185, 80, 0.95)", width: 3, lineType: "flowDash" }
    },
    performance: { level: "balanced" }
  }
};

const selectedLabel = computed(() => selectionList.value.length ? selectionList.value.join(", ") : "未选择");

const clone = value => JSON.parse(JSON.stringify(value));

const setLog = message => {
  log.value = message;
};

const configureRuntime = () => {
  editor.configureSceneRuntime({
    templates,
    mountCompatibility: {
      AIRCRAFT: ["MISSILE"]
    },
    mountValidator: (template, host) => {
      if ((host.mounts || []).length >= 2) return false;
      return host.modelType === "AIRCRAFT" && template.modelType === "MISSILE";
    },
    validators: [
      sceneState => {
        const hasBlueTarget = sceneState.models.some(model => model.nation === "blue");
        return hasBlueTarget ? null : {
          level: "warning",
          code: "NO_BLUE_TARGET",
          message: "场景中缺少蓝方目标"
        };
      },
      sceneState => {
        const duplicateNames = new Set();
        const seen = new Set();
        sceneState.models.forEach(model => {
          const name = model.showName || model.name;
          if (!name) return;
          if (seen.has(name)) duplicateNames.add(name);
          seen.add(name);
        });
        return duplicateNames.size
          ? { level: "warning", code: "DUPLICATE_NAME", message: `重复名称：${Array.from(duplicateNames).join("、")}` }
          : null;
      }
    ],
    defaultEffectPresets: {
      radar: {
        type: "radar",
        geometry: { shape: "sector", radius: 100000, angle: 90 },
        style: { animation: "scan" }
      }
    }
  });
};

const selectModel = uid => {
  selectedUid.value = uid;
  selectionList.value = uid ? [uid] : [];
  editor?.selectModel?.(uid);
  editor?.setBatchSelection?.(selectionList.value);
};

const resetScene = async () => {
  stopRealtimeStream();
  eventOffs.forEach(off => off?.());
  eventOffs = [];
  eventListening.value = false;
  frameMergerEnabled.value = false;
  localRegionCount.value = 0;
  configureRuntime();
  await editor.loadScene(clone(baseScene), { recordHistory: false });
  await editor.setMode("edit");
  editor.setFrameMergerConfig?.({ enabled: false, interval: 100, maxDelay: 200 });
  selectModel("recipe_air_001");
  issues.value = editor.validateScene?.() || [];
  setLog("场景已重置，运行时模板、挂载规则和校验器已重新配置。");
};

const deployFromTemplate = async () => {
  const model = await editor.deployModel("aircraft", {
    UID: `recipe_air_${Date.now()}`,
    lon: form.deployLon,
    lat: form.deployLat,
    heading: form.heading,
    nation: "red",
    showName: "新部署飞机",
    mountable: true
  });
  selectModel(model.UID);
  setLog(`已通过 deployModel() 从模板部署：${model.showName}`);
};

const addDuplicateForValidation = async () => {
  await editor.addModel({
    UID: `recipe_dup_${Date.now()}`,
    showName: "红方飞机",
    name: "红方飞机",
    NodeType: "car",
    iconKey: "car",
    modelType: "PLATFORM",
    nation: "red",
    lon: 116.34,
    lat: 39.72,
    heading: 0
  });
  issues.value = editor.validateScene?.() || [];
  setLog(`已制造重复名称，validateScene() 返回 ${issues.value.length} 个问题。`);
};

const validateNow = () => {
  issues.value = editor.validateScene?.() || [];
  setLog(`校验完成：${issues.value.length} 个问题。`);
};

const upsertPatrolGroup = async () => {
  const result = await editor.upsertModels([
    {
      UID: "recipe_patrol_001",
      showName: "巡逻车 1",
      name: "巡逻车 1",
      NodeType: "car",
      iconKey: "car",
      modelType: "PLATFORM",
      nation: "red",
      lon: 116.38,
      lat: 39.82,
      heading: 80
    },
    {
      UID: "recipe_patrol_002",
      showName: "巡逻车 2",
      name: "巡逻车 2",
      NodeType: "car",
      iconKey: "car",
      modelType: "PLATFORM",
      nation: "red",
      lon: 116.44,
      lat: 39.84,
      heading: 80
    }
  ]);
  selectionList.value = result.map(model => model.UID);
  editor.setBatchSelection?.(selectionList.value);
  setLog(`upsertModels() 已写入 ${result.length} 个模型，并同步批量选择。`);
};

const updatePosition = async () => {
  const updated = await editor.updateModelPosition(selectedUid.value, {
    lon: form.moveLon,
    lat: form.moveLat,
    heading: form.heading,
    speed: 220
  });
  setLog(updated ? `updateModelPosition() 已更新 ${updated.showName || updated.UID}` : "未找到当前模型。");
};

const focusSelected = () => {
  editor.focusModel?.(selectedUid.value);
  setLog(`focusModel() 已定位到 ${selectedUid.value}`);
};

const addMount = async () => {
  const result = await editor.addMount("recipe_air_001", {
    UID: `recipe_missile_${Date.now()}`,
    showName: "训练导弹",
    name: "训练导弹",
    NodeType: "missile",
    modelType: "MISSILE",
    iconKey: "missile",
    mountable: true,
    status: "mounted"
  });
  setLog(result?.host ? `已给 ${result.host.showName} 挂载 ${result.mount.showName}` : "挂载失败，规则不允许或主模型不存在。");
};

const removeLatestMount = async () => {
  const host = editor.getSceneState?.().models.find(model => model.UID === "recipe_air_001");
  const latest = host?.mounts?.[host.mounts.length - 1];
  if (!latest) {
    setLog("当前飞机没有可移除的挂载。");
    return;
  }
  const result = await editor.removeMount("recipe_air_001", latest.UID);
  setLog(result?.host ? `已移除挂载 ${latest.showName || latest.UID}` : "移除挂载失败。");
};

const setRoute = async () => {
  const updated = await editor.setModelRoute("recipe_air_001", [
    { lon: 116.24, lat: 39.78, height: 7600, speed: 220 },
    { lon: 116.42, lat: 39.88, height: 8000, speed: 230 },
    { lon: 116.62, lat: 40.0, height: 8200, speed: 235 },
    { lon: 116.76, lat: 40.08, height: 8200, speed: 235 }
  ], {
    name: form.routeName,
    source: "interactive-doc"
  });
  setLog(updated ? `setModelRoute() 已写入 ${form.routeName}` : "航路写入失败。");
};

const startRouteEdit = async () => {
  const started = await editor.startRouteEdit("recipe_air_001");
  setLog(started ? "startRouteEdit() 已开启，拖动航路点后保存。" : "未能开启航路编辑，请先确认模型已渲染。");
};

const addTileRegion = () => {
  editor.addLocalTileRegion({
    id: "recipe-local-region",
    urlTemplate: "/Sate/{z}/{x}/{y}.png",
    extent: [116.0, 39.6, 116.9, 40.2],
    minZoom: 6,
    maxZoom: 18
  });
  localRegionCount.value = editor.getLocalTileRegions?.().length || 0;
  setLog(`addLocalTileRegion() 已添加局部瓦片区域，当前 ${localRegionCount.value} 个。`);
};

const clearTileRegions = () => {
  editor.clearLocalTileRegions?.();
  localRegionCount.value = editor.getLocalTileRegions?.().length || 0;
  setLog("clearLocalTileRegions() 已清空局部瓦片区域。");
};

const startEventListening = () => {
  if (eventListening.value) {
    setLog("事件监听已经开启。");
    return;
  }
  eventOffs = [
    editor.onSelectionChange?.(feature => {
      const uid = feature?.get?.("UID");
      if (uid) {
        selectedUid.value = uid;
        selectionList.value = [uid];
        setLog(`onSelectionChange：选中 ${uid}`);
      }
    }),
    editor.onMeasure?.(result => {
      setLog(`onMeasure：${result.label || `${result.value || ""}${result.unit || ""}`}`);
    }),
    editor.onAnnotationCreated?.(annotation => {
      editor.setSelectedAnnotation?.(annotation.id);
      setLog(`onAnnotationCreated：${annotation.name || annotation.id}`);
    }),
    editor.onTemplateDrop?.(payload => {
      setLog(`onTemplateDrop：${payload?.template?.name || "模板投放"}`);
    })
  ].filter(Boolean);
  eventListening.value = true;
  setLog("事件监听已开启：点击模型、测量或创建标绘会写入日志。");
};

const stopEventListening = () => {
  eventOffs.forEach(off => off?.());
  eventOffs = [];
  eventListening.value = false;
  setLog("事件监听已关闭。");
};

const startMeasure = () => {
  startEventListening();
  editor.startMeasureMode?.("distance", result => {
    setLog(`测量完成：${result.label || `${result.value || ""}${result.unit || ""}`}`);
  });
  setLog("距离测量已开启，请在地图上点击两点或多点。");
};

const startAnnotation = () => {
  startEventListening();
  editor.startAnnotationMode?.("polygon", {
    name: "交互标绘区",
    category: "military",
    style: {
      strokeColor: "#ff5c5c",
      fillColor: "rgba(255,92,92,0.18)"
    }
  }, annotation => {
    editor.setSelectedAnnotation?.(annotation.id);
    setLog(`标绘创建完成：${annotation.name || annotation.id}`);
  });
  setLog("多边形标绘已开启，请在地图上点击绘制。");
};

const toggleFrameMerger = () => {
  frameMergerEnabled.value = !frameMergerEnabled.value;
  editor.setFrameMergerConfig?.({
    enabled: frameMergerEnabled.value,
    interval: 120,
    maxDelay: 240
  });
  setLog(frameMergerEnabled.value ? "帧合并器已开启。" : "帧合并器已关闭。");
};

const stopRealtimeStream = () => {
  if (streamTimer) {
    clearInterval(streamTimer);
    streamTimer = null;
  }
};

const pushRealtimeFrame = async () => {
  streamStep += 1;
  await editor.applySituationFrame({
    updates: [
      {
        uid: "recipe_ship_001",
        patch: {
          lon: 116.78 + Math.sin(streamStep / 3) * 0.08,
          lat: 40.04 + Math.cos(streamStep / 4) * 0.05,
          heading: (245 + streamStep * 8) % 360
        }
      },
      {
        uid: "recipe_air_001",
        patch: {
          lon: 116.24 + Math.cos(streamStep / 4) * 0.08,
          lat: 39.78 + Math.sin(streamStep / 3) * 0.05,
          heading: (65 + streamStep * 10) % 360
        }
      }
    ],
    effects: [
      {
        id: "recipe_tracking_ship",
        type: "tracking",
        sourceUID: "recipe_ship_001",
        geometry: { shape: "circle", radius: 26000 },
        style: { animation: "pulse" },
        label: "跟踪"
      }
    ]
  }, {
    recordHistory: false
  });
  setLog(`applySituationFrame() 已推送第 ${streamStep} 帧。`);
};

const startRealtimeStream = () => {
  stopRealtimeStream();
  pushRealtimeFrame();
  streamTimer = setInterval(pushRealtimeFrame, 450);
  setLog("实时推送已启动，每 450ms 写入一帧。");
};

const flushFrameMerger = async () => {
  await editor.flushFrameMerger?.();
  setLog("flushFrameMerger() 已刷新待合并帧。");
};

const syncToMirror = async () => {
  if (!mirrorEditor) return;
  const snapshot = editor.getSceneSnapshot();
  await mirrorEditor.loadScene(snapshot, { recordHistory: false });
  await mirrorEditor.setMode("view");
  mirrorReady.value = true;
  setLog("右侧地图已通过独立 controller 加载左侧场景快照。");
};

const divergeMirror = async () => {
  if (!mirrorEditor) return;
  await mirrorEditor.updateModelPosition("recipe_ship_001", {
    lon: 116.96,
    lat: 39.78,
    heading: 180
  }, {
    recordHistory: false
  });
  setLog("右侧实例已独立更新蓝方舰船，左侧实例不受影响。");
};

const resetMirror = async () => {
  if (!mirrorEditor) return;
  await mirrorEditor.loadScene(clone(baseScene), { recordHistory: false });
  await mirrorEditor.setMode("view");
  mirrorReady.value = true;
  setLog("右侧独立实例已重置。");
};

onMounted(async () => {
  await import("openlayers2dsceneeditor/style.css");
  const { createMapEngine, createScenarioEditor } = await import("openlayers2dsceneeditor");

  const mainEngine = createMapEngine();
  editor = createScenarioEditor({
    engine: mainEngine,
    mapApp: mainEngine.getMapApp(),
    context: mainEngine.getContext()
  });
  editor.init({
    ...resourceOptions,
    ...mapOptions,
    target: mainMapRef.value
  });

  if (shouldUseMirror.value) {
    hasMirror.value = true;
    const mirrorEngine = createMapEngine();
    mirrorEditor = createScenarioEditor({
      engine: mirrorEngine,
      mapApp: mirrorEngine.getMapApp(),
      context: mirrorEngine.getContext()
    });
    mirrorEditor.init({
      ...resourceOptions,
      ...mapOptions,
      target: mirrorMapRef.value
    });
  }

  await Promise.all([editor.ready(), mirrorEditor?.ready?.()].filter(Boolean));
  await nextTick();
  await resetScene();
  if (mirrorEditor) {
    await resetMirror();
  }
});

onUnmounted(() => {
  stopRealtimeStream();
  stopEventListening();
  editor?.cancelTool?.();
  editor?.destroy?.();
  mirrorEditor?.destroy?.();
  editor = null;
  mirrorEditor = null;
});
</script>

<template>
  <div class="controller-recipes">
    <div v-if="visibleRecipes.length > 1" class="controller-recipes__tabs" role="tablist" aria-label="Controller recipes">
      <button
        v-for="recipe in visibleRecipes"
        :key="recipe.id"
        type="button"
        :class="{ active: activeRecipe === recipe.id }"
        @click="activeRecipe = recipe.id"
      >
        {{ recipe.label }}
      </button>
    </div>

    <div class="controller-recipes__content">
      <section v-show="activeRecipe === 'runtime'" class="controller-recipes__panel">
        <div class="controller-recipes__fields">
          <label>
            经度
            <input v-model.number="form.deployLon" type="number" step="0.01" />
          </label>
          <label>
            纬度
            <input v-model.number="form.deployLat" type="number" step="0.01" />
          </label>
          <label>
            航向
            <input v-model.number="form.heading" type="number" step="5" />
          </label>
        </div>
        <div class="controller-recipes__actions">
          <button type="button" @click="deployFromTemplate">按模板部署飞机</button>
          <button type="button" @click="addDuplicateForValidation">制造重复名称</button>
          <button type="button" @click="validateNow">运行校验</button>
        </div>
        <div class="controller-recipes__chips">
          <span v-for="issue in issues" :key="issue.code + issue.message">{{ issue.level }} · {{ issue.message }}</span>
          <span v-if="!issues.length">当前无校验问题</span>
        </div>
      </section>

      <section v-show="activeRecipe === 'models'" class="controller-recipes__panel">
        <div class="controller-recipes__fields">
          <label>
            当前 UID
            <select v-model="selectedUid" @change="selectModel(selectedUid)">
              <option value="recipe_air_001">recipe_air_001</option>
              <option value="recipe_radar_001">recipe_radar_001</option>
              <option value="recipe_ship_001">recipe_ship_001</option>
              <option value="recipe_patrol_001">recipe_patrol_001</option>
            </select>
          </label>
          <label>
            目标经度
            <input v-model.number="form.moveLon" type="number" step="0.01" />
          </label>
          <label>
            目标纬度
            <input v-model.number="form.moveLat" type="number" step="0.01" />
          </label>
        </div>
        <div class="controller-recipes__actions">
          <button type="button" @click="upsertPatrolGroup">Upsert 巡逻组</button>
          <button type="button" @click="updatePosition">更新当前位置</button>
          <button type="button" @click="focusSelected">聚焦当前模型</button>
        </div>
        <p>当前批量选择：{{ selectedLabel }}</p>
      </section>

      <section v-show="activeRecipe === 'route'" class="controller-recipes__panel">
        <div class="controller-recipes__fields">
          <label>
            航路名称
            <input v-model="form.routeName" type="text" />
          </label>
        </div>
        <div class="controller-recipes__actions">
          <button type="button" @click="setRoute">写入航路</button>
          <button type="button" @click="startRouteEdit">交互式编辑航路</button>
        </div>
      </section>

      <section v-show="activeRecipe === 'mounts'" class="controller-recipes__panel">
        <div class="controller-recipes__actions">
          <button type="button" @click="addMount">添加导弹挂载</button>
          <button type="button" @click="removeLatestMount">移除最新挂载</button>
          <button type="button" @click="validateNow">运行挂载校验</button>
        </div>
        <div class="controller-recipes__chips">
          <span v-for="issue in issues" :key="issue.code + issue.message">{{ issue.level }} · {{ issue.message }}</span>
          <span v-if="!issues.length">当前挂载规则通过</span>
        </div>
      </section>

      <section v-show="activeRecipe === 'tiles'" class="controller-recipes__panel">
        <div class="controller-recipes__actions">
          <button type="button" @click="addTileRegion">添加局部瓦片区域</button>
          <button type="button" @click="clearTileRegions">清空局部瓦片</button>
        </div>
        <p>当前局部瓦片区域：{{ localRegionCount }} 个</p>
      </section>

      <section v-show="activeRecipe === 'events'" class="controller-recipes__panel">
        <div class="controller-recipes__actions">
          <button type="button" @click="startEventListening">开启事件监听</button>
          <button type="button" @click="stopEventListening">关闭事件监听</button>
          <button type="button" @click="startMeasure">开始测距</button>
          <button type="button" @click="startAnnotation">绘制多边形</button>
        </div>
      </section>

      <section v-show="activeRecipe === 'frame'" class="controller-recipes__panel">
        <div class="controller-recipes__actions">
          <button type="button" @click="toggleFrameMerger">{{ frameMergerEnabled ? "关闭帧合并" : "开启帧合并" }}</button>
          <button type="button" @click="pushRealtimeFrame">推送单帧</button>
          <button type="button" @click="startRealtimeStream">启动实时流</button>
          <button type="button" @click="stopRealtimeStream">停止实时流</button>
          <button type="button" @click="flushFrameMerger">立即刷新合并帧</button>
        </div>
      </section>

      <section v-show="activeRecipe === 'multi'" class="controller-recipes__panel">
        <div class="controller-recipes__actions">
          <button type="button" @click="syncToMirror">同步到右侧实例</button>
          <button type="button" @click="divergeMirror">只移动右侧舰船</button>
          <button type="button" @click="resetMirror">重置右侧实例</button>
        </div>
        <p>右侧实例：{{ mirrorReady ? "已初始化" : "初始化中" }}</p>
      </section>
    </div>

    <div class="controller-recipes__status">{{ log }}</div>

    <div class="controller-recipes__maps" :class="{ 'controller-recipes__maps--single': !hasMirror }">
      <div class="controller-recipes__mapBlock">
        <div class="controller-recipes__mapTitle">主实例</div>
        <div ref="mainMapRef" class="controller-recipes__map"></div>
      </div>
      <div v-show="hasMirror" class="controller-recipes__mapBlock">
        <div class="controller-recipes__mapTitle">独立实例</div>
        <div ref="mirrorMapRef" class="controller-recipes__map"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.controller-recipes {
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.controller-recipes__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.controller-recipes button {
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.controller-recipes button.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.controller-recipes__content {
  border-bottom: 1px solid var(--vp-c-divider);
}

.controller-recipes__panel {
  padding: 12px;
}

.controller-recipes__fields,
.controller-recipes__actions,
.controller-recipes__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: flex-end;
}

.controller-recipes__actions,
.controller-recipes__chips {
  margin-top: 10px;
}

.controller-recipes label {
  display: grid;
  gap: 4px;
  min-width: 112px;
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.controller-recipes input,
.controller-recipes select {
  height: 32px;
  box-sizing: border-box;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.controller-recipes__chips span {
  display: inline-flex;
  align-items: center;
  min-height: 26px;
  padding: 0 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.controller-recipes__panel p,
.controller-recipes__status {
  margin: 10px 0 0;
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.controller-recipes__status {
  min-height: 36px;
  margin: 0;
  padding: 10px 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.controller-recipes__maps {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  min-height: 460px;
}

.controller-recipes__maps--single {
  grid-template-columns: minmax(0, 1fr);
}

.controller-recipes__mapBlock {
  min-width: 0;
}

.controller-recipes__mapBlock + .controller-recipes__mapBlock {
  border-left: 1px solid var(--vp-c-divider);
}

.controller-recipes__mapTitle {
  height: 32px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.controller-recipes__map {
  width: 100%;
  height: 430px;
}

@media (max-width: 860px) {
  .controller-recipes__maps {
    grid-template-columns: 1fr;
  }

  .controller-recipes__mapBlock + .controller-recipes__mapBlock {
    border-top: 1px solid var(--vp-c-divider);
    border-left: 0;
  }
}
</style>
