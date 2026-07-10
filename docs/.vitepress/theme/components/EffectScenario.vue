<script setup>
import { computed, nextTick, onMounted, onUnmounted, reactive, ref } from "vue";

const mapRef = ref(null);
const activeGroup = ref("range");
const activeEffectIds = ref([]);
const log = ref("选择一个效果场景，或直接叠加单个效果。");
let editor = null;
let streamTimer = null;
let streamStep = 0;

const form = reactive({
  radarRange: 125000,
  warningRange: 76000,
  jammerRange: 82000,
  linkQuality: "weak"
});

const styleForm = reactive({
  relationColor: "#ffb950",
  relationWidth: 3,
  relationLineType: "flowDash",
  relationLineDash: "dash",
  effectStrokeColor: "#40c8ff",
  effectFillColor: "rgba(64,200,255,0.16)",
  effectLineColor: "#ffb950",
  effectWidth: 3,
  effectAnimation: "pulse"
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
  center: [116.5, 39.96],
  zoom: 7,
  minZoom: 0,
  maxZoom: 18,
  multiWorld: true,
  smoothExtentConstraint: true
};

const baseModels = [
  {
    UID: "effect_red_radar_001",
    showName: "红方雷达",
    name: "红方雷达",
    NodeType: "radar",
    iconKey: "default",
    modelType: "RADAR",
    nation: "red",
    lon: 116.18,
    lat: 39.92,
    heading: 70,
    targetUID: "effect_blue_air_001"
  },
  {
    UID: "effect_red_jammer_001",
    showName: "红方干扰车",
    name: "红方干扰车",
    NodeType: "jammer",
    iconKey: "car",
    modelType: "JAMMER",
    nation: "red",
    lon: 116.12,
    lat: 40.08,
    heading: 115
  },
  {
    UID: "effect_red_missile_001",
    showName: "红方导弹",
    name: "红方导弹",
    NodeType: "missile",
    iconKey: "missile",
    modelType: "WEAPON",
    nation: "red",
    lon: 116.28,
    lat: 39.76,
    heading: 42,
    targetUID: "effect_blue_ship_001"
  },
  {
    UID: "effect_blue_radar_001",
    showName: "蓝方预警雷达",
    name: "蓝方预警雷达",
    NodeType: "radar",
    iconKey: "default",
    modelType: "RADAR",
    nation: "blue",
    lon: 116.86,
    lat: 39.82,
    heading: 260
  },
  {
    UID: "effect_blue_ship_001",
    showName: "蓝方舰船",
    name: "蓝方舰船",
    NodeType: "ship",
    iconKey: "ship",
    modelType: "PLATFORM",
    nation: "blue",
    lon: 116.78,
    lat: 40.05,
    heading: 245
  },
  {
    UID: "effect_blue_air_001",
    showName: "蓝方飞机",
    name: "蓝方飞机",
    NodeType: "b2",
    iconKey: "b2",
    modelType: "AIRCRAFT",
    nation: "blue",
    lon: 116.58,
    lat: 39.72,
    height: 8000,
    speed: 230,
    heading: 305
  },
  {
    UID: "effect_blue_drone_001",
    showName: "蓝方无人机",
    name: "蓝方无人机",
    NodeType: "b2",
    iconKey: "b2",
    modelType: "UAV",
    nation: "blue",
    lon: 116.92,
    lat: 40.18,
    heading: 220
  },
  {
    UID: "effect_white_sensor_001",
    showName: "中立传感器",
    name: "中立传感器",
    NodeType: "radar",
    iconKey: "default",
    modelType: "SENSOR",
    nation: "white",
    lon: 116.5,
    lat: 40.18,
    heading: 180
  }
];

const baseRelations = [
  {
    id: "effect_relation_detect",
    type: "detect",
    sourceUID: "effect_red_radar_001",
    targetUID: "effect_blue_air_001",
    label: "探测",
    style: { width: 2, lineType: "dash" }
  },
  {
    id: "effect_relation_attack",
    type: "attack",
    sourceUID: "effect_red_missile_001",
    targetUID: "effect_blue_ship_001",
    label: "攻击",
    style: { width: 3, lineType: "flowDash" }
  }
];

const getRelationStyle = (overrides = {}) => ({
  color: styleForm.relationColor,
  width: styleForm.relationWidth,
  lineType: styleForm.relationLineType,
  lineDash: styleForm.relationLineDash === "none" ? false : styleForm.relationLineDash,
  ...overrides
});

const getEffectAreaStyle = (overrides = {}) => ({
  color: styleForm.effectFillColor,
  fillColor: styleForm.effectFillColor,
  strokeColor: styleForm.effectStrokeColor,
  width: styleForm.effectWidth,
  animation: styleForm.effectAnimation,
  ...overrides
});

const getEffectLineStyle = (overrides = {}) => ({
  color: styleForm.effectLineColor,
  strokeColor: styleForm.effectLineColor,
  width: styleForm.effectWidth,
  ...overrides
});

const getStyledRelations = () => baseRelations.map(relation => ({
  ...relation,
  style: getRelationStyle(relation.type === "detect"
    ? { color: styleForm.effectStrokeColor, lineType: "dash" }
    : {})
}));

const createEffects = () => ({
  radar: {
    id: "effect_radar_scan",
    type: "radar",
    sourceUID: "effect_red_radar_001",
    geometry: { shape: "sector", radius: form.radarRange, angle: 105, direction: 70 },
    style: getEffectAreaStyle({ animation: "scan" }),
    label: "雷达扫描"
  },
  detect: {
    id: "effect_detect_range",
    type: "detect",
    sourceUID: "effect_red_radar_001",
    geometry: { shape: "circle", radius: 90000 },
    style: getEffectAreaStyle(),
    label: "探测范围"
  },
  warning: {
    id: "effect_warning_area",
    type: "warning",
    sourceUID: "effect_blue_radar_001",
    geometry: { shape: "circle", radius: form.warningRange },
    style: getEffectAreaStyle({ strokeColor: "#ff4d4f", fillColor: "rgba(255,77,79,0.16)" }),
    label: "预警范围"
  },
  jammer: {
    id: "effect_jammer_area",
    type: "jammer",
    sourceUID: "effect_red_jammer_001",
    geometry: { shape: "circle", radius: form.jammerRange },
    style: getEffectAreaStyle({ strokeColor: "#b25dff", fillColor: "rgba(178,93,255,0.16)" }),
    label: "干扰压制"
  },
  weapon: {
    id: "effect_weapon_range",
    type: "weapon",
    sourceUID: "effect_red_missile_001",
    geometry: { shape: "circle", radius: 70000 },
    style: getEffectAreaStyle({ strokeColor: "#faad14", fillColor: "rgba(250,173,20,0.14)", animation: "none" }),
    label: "武器射程"
  },
  missileFlight: {
    id: "effect_missile_flight",
    type: "missileFlight",
    sourceUID: "effect_red_missile_001",
    targetUID: "effect_blue_ship_001",
    geometry: { shape: "line", targetUID: "effect_blue_ship_001" },
    style: getEffectLineStyle({ width: Math.max(4, styleForm.effectWidth + 1) }),
    label: "导弹飞行"
  },
  lock: {
    id: "effect_lock_ship",
    type: "lock",
    sourceUID: "effect_blue_ship_001",
    geometry: { shape: "box", size: 64 },
    style: getEffectAreaStyle({ fillColor: "rgba(255,77,79,0.08)", strokeColor: "#ff4d4f" }),
    label: "锁定"
  },
  linkQuality: {
    id: "effect_link_quality",
    type: "linkQuality",
    sourceUID: "effect_red_radar_001",
    targetUID: "effect_blue_ship_001",
    geometry: { shape: "line", targetUID: "effect_blue_ship_001" },
    style: getEffectLineStyle({ quality: form.linkQuality }),
    label: form.linkQuality === "broken" ? "链路中断" : form.linkQuality === "weak" ? "弱链路" : "良好链路"
  },
  damaged: {
    id: "effect_damaged_ship",
    type: "damaged",
    sourceUID: "effect_blue_ship_001",
    geometry: { shape: "circle", radius: 26000 },
    style: getEffectAreaStyle({ strokeColor: "#ff4d4f", fillColor: "rgba(255,77,79,0.14)" }),
    label: "毁伤"
  },
  lost: {
    id: "effect_lost_air",
    type: "lost",
    sourceUID: "effect_blue_air_001",
    geometry: { shape: "circle", radius: 22000 },
    style: getEffectAreaStyle({ strokeColor: "#bfbfbf", fillColor: "rgba(160,160,160,0.14)" }),
    label: "失联"
  },
  discovered: {
    id: "effect_discovered_drone",
    type: "discovered",
    sourceUID: "effect_blue_drone_001",
    geometry: { shape: "circle", radius: 18000 },
    style: getEffectAreaStyle({ strokeColor: "#13c2c2", fillColor: "rgba(19,194,194,0.14)" }),
    label: "发现"
  },
  tracking: {
    id: "effect_tracking_drone",
    type: "tracking",
    sourceUID: "effect_blue_drone_001",
    geometry: { shape: "circle", radius: 30000 },
    style: getEffectAreaStyle({ strokeColor: "#52c41a", fillColor: "rgba(82,196,26,0.12)" }),
    label: "跟踪"
  },
  sensorSearch: {
    id: "effect_sensor_search",
    type: "sensorSearch",
    sourceUID: "effect_white_sensor_001",
    geometry: { shape: "sector", radius: 76000, angle: 100, direction: 180 },
    style: getEffectAreaStyle({ animation: "scan" }),
    label: "传感器搜索"
  },
  sensorOff: {
    id: "effect_sensor_off",
    type: "sensorOff",
    sourceUID: "effect_white_sensor_001",
    geometry: { shape: "circle", radius: 26000 },
    style: getEffectAreaStyle({ animation: "none", strokeColor: "#8c8c8c", fillColor: "rgba(140,140,140,0.1)" }),
    label: "关机"
  },
  sensorSuppressed: {
    id: "effect_sensor_suppressed",
    type: "sensorSuppressed",
    sourceUID: "effect_blue_radar_001",
    geometry: { shape: "circle", radius: 32000 },
    style: getEffectAreaStyle({ strokeColor: "#b25dff", fillColor: "rgba(178,93,255,0.16)" }),
    label: "被压制"
  },
  intercept: {
    id: "effect_intercept",
    type: "intercept",
    sourceUID: "effect_red_missile_001",
    targetUID: "effect_blue_air_001",
    geometry: { shape: "line", targetUID: "effect_blue_air_001" },
    style: getEffectLineStyle({ color: "#ffffff", strokeColor: "#ffffff" }),
    label: "拦截"
  },
  miss: {
    id: "effect_miss",
    type: "miss",
    sourceUID: "effect_blue_radar_001",
    targetUID: "effect_red_jammer_001",
    geometry: { shape: "line", targetUID: "effect_red_jammer_001" },
    style: getEffectLineStyle({ color: "#bfbfbf", strokeColor: "#bfbfbf" }),
    label: "脱靶"
  },
  overlap: {
    id: "effect_overlap",
    type: "overlap",
    sourceUID: "effect_white_sensor_001",
    geometry: { shape: "circle", radius: 36000, lon: 116.62, lat: 40.02 },
    style: getEffectAreaStyle({ strokeColor: "#fadb14", fillColor: "rgba(250,219,20,0.2)" }),
    label: "覆盖重叠"
  }
});

const groups = [
  {
    id: "range",
    label: "雷达/预警/干扰",
    description: "雷达扫描、探测范围、预警圈、干扰压制和武器射程。",
    effectKeys: ["radar", "detect", "warning", "jammer", "weapon"]
  },
  {
    id: "attack",
    label: "链路与攻击",
    description: "链路质量、导弹飞行、拦截点和脱靶事件。",
    effectKeys: ["linkQuality", "missileFlight", "intercept", "miss"]
  },
  {
    id: "status",
    label: "目标状态",
    description: "锁定、毁伤、失联、发现和跟踪。",
    effectKeys: ["lock", "damaged", "lost", "discovered", "tracking"]
  },
  {
    id: "sensor",
    label: "传感器状态",
    description: "搜索、关机和被压制。",
    effectKeys: ["sensorSearch", "sensorOff", "sensorSuppressed"]
  },
  {
    id: "overlap",
    label: "覆盖重叠",
    description: "表达多个探测区、火力区或控制区的重叠区域。",
    effectKeys: ["radar", "warning", "jammer", "overlap"]
  }
];

const currentGroup = computed(() => groups.find(item => item.id === activeGroup.value) || groups[0]);
const activeLabel = computed(() => activeEffectIds.value.length ? `${activeEffectIds.value.length} 个特效已叠加` : "当前无特效");

const clone = value => JSON.parse(JSON.stringify(value));

const createScene = () => ({
  mode: "view",
  metadata: { name: "Effects interactive scenario" },
  models: clone(baseModels),
  relations: getStyledRelations(),
  effects: [],
  annotations: [],
  display: {
    showPopup: true,
    showModelName: true,
    showTargetLine: true,
    headingVisible: { red: true, blue: true },
    targetLineStyle: { redColor: "#ff5c5c", blueColor: "#409eff", width: 3, lineType: "flowDash" },
    relationLineStyles: {
      default: getRelationStyle(),
      detect: getRelationStyle({ color: styleForm.effectStrokeColor, lineType: "dash" }),
      attack: getRelationStyle()
    },
    effectStyles: {
      default: getEffectAreaStyle(),
      radar: { fillColor: styleForm.effectFillColor, strokeColor: styleForm.effectStrokeColor },
      linkQuality: getEffectLineStyle(),
      missileFlight: getEffectLineStyle()
    },
    performance: {
      level: "balanced",
      effectAnimationInterval: 80
    }
  }
});

const getActiveEffects = () => {
  const effects = createEffects();
  return activeEffectIds.value.map(id => effects[id]).filter(Boolean);
};

const syncActiveEffects = async message => {
  if (!editor) return;
  const state = editor.getSceneState?.();
  const existingIds = (state?.effects || []).map(effect => effect.id);
  if (existingIds.length) {
    await editor.removeEffects(existingIds, { recordHistory: false });
  }
  const effects = getActiveEffects();
  if (effects.length) {
    await editor.upsertEffects(effects, { recordHistory: false });
  }
  log.value = message || `已同步 ${effects.length} 个态势特效。`;
};

const applyStyleConfig = async () => {
  if (!editor) return;
  await editor.setDisplayConfig({
    relationLineStyles: {
      default: getRelationStyle(),
      detect: getRelationStyle({ color: styleForm.effectStrokeColor, lineType: "dash" }),
      attack: getRelationStyle()
    },
    effectStyles: {
      default: getEffectAreaStyle(),
      linkQuality: getEffectLineStyle(),
      missileFlight: getEffectLineStyle()
    }
  });
  await editor.upsertRelations?.(getStyledRelations(), { recordHistory: false });
  await syncActiveEffects("自定义颜色和线型已应用。");
};

const setGroup = async id => {
  stopStream();
  activeGroup.value = id;
  activeEffectIds.value = [...currentGroup.value.effectKeys];
  await syncActiveEffects(`已切换到${currentGroup.value.label}场景。`);
};

const toggleEffect = async key => {
  stopStream();
  const next = new Set(activeEffectIds.value);
  if (next.has(key)) {
    next.delete(key);
  } else {
    next.add(key);
  }
  activeEffectIds.value = Array.from(next);
  await syncActiveEffects(next.has(key) ? `已叠加 ${createEffects()[key]?.label || key}。` : `已移除 ${key}。`);
};

const clearEffects = async () => {
  stopStream();
  activeEffectIds.value = [];
  await syncActiveEffects("已清空所有态势特效。");
};

const resetScene = async () => {
  stopStream();
  await editor.loadScene(createScene(), { recordHistory: false });
  activeGroup.value = "range";
  activeEffectIds.value = ["radar", "detect", "warning", "jammer", "weapon"];
  await syncActiveEffects("场景已重置，并加载雷达、预警和干扰效果。");
};

const applyRangeConfig = async () => {
  await syncActiveEffects("范围参数已更新，特效已重新渲染。");
};

const setLinkQuality = async quality => {
  form.linkQuality = quality;
  if (!activeEffectIds.value.includes("linkQuality")) {
    activeEffectIds.value = [...activeEffectIds.value, "linkQuality"];
  }
  await syncActiveEffects(`链路质量已切换为 ${quality}。`);
};

const moveBlueTarget = async () => {
  stopStream();
  streamStep += 1;
  await editor.applySituationFrame({
    updates: [
      {
        uid: "effect_blue_ship_001",
        patch: {
          lon: 116.78 + Math.sin(streamStep / 2) * 0.12,
          lat: 40.05 + Math.cos(streamStep / 3) * 0.08,
          heading: (245 + streamStep * 18) % 360
        }
      },
      {
        uid: "effect_blue_air_001",
        patch: {
          lon: 116.58 + Math.cos(streamStep / 2) * 0.12,
          lat: 39.72 + Math.sin(streamStep / 3) * 0.08,
          heading: (305 + streamStep * 14) % 360
        }
      }
    ]
  }, {
    recordHistory: false,
    merge: false
  });
  log.value = "已推送一帧模型位置，绑定模型的特效和线类效果会跟随更新。";
};

const pushRealtimeFrame = async () => {
  streamStep += 1;
  await editor.applySituationFrame({
    updates: [
      {
        uid: "effect_blue_ship_001",
        patch: {
          lon: 116.78 + Math.sin(streamStep / 3) * 0.1,
          lat: 40.05 + Math.cos(streamStep / 4) * 0.07,
          heading: (245 + streamStep * 10) % 360
        }
      },
      {
        uid: "effect_blue_drone_001",
        patch: {
          lon: 116.92 + Math.cos(streamStep / 5) * 0.08,
          lat: 40.18 + Math.sin(streamStep / 4) * 0.06,
          heading: (220 + streamStep * 12) % 360
        }
      }
    ],
    effects: getActiveEffects()
  }, {
    recordHistory: false,
    merge: false
  });
};

const startStream = () => {
  if (streamTimer) {
    log.value = "实时态势流已经启动。";
    return;
  }
  if (!activeEffectIds.value.length) {
    activeEffectIds.value = [...currentGroup.value.effectKeys];
    syncActiveEffects();
  }
  pushRealtimeFrame();
  streamTimer = setInterval(pushRealtimeFrame, 650);
  log.value = "实时态势流已启动，每 650ms 推送模型与特效增量。";
};

const stopStream = () => {
  if (!streamTimer) return;
  clearInterval(streamTimer);
  streamTimer = null;
  log.value = "实时态势流已停止。";
};

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
  stopStream();
  editor?.destroy?.();
  editor = null;
});
</script>

<template>
  <div class="effect-scenario">
    <div class="effect-scenario__tabs" role="tablist" aria-label="Effect scenarios">
      <button
        v-for="group in groups"
        :key="group.id"
        type="button"
        :class="{ active: activeGroup === group.id }"
        @click="setGroup(group.id)"
      >
        {{ group.label }}
      </button>
    </div>

    <div class="effect-scenario__panel">
      <div class="effect-scenario__summary">
        <strong>{{ currentGroup.label }}</strong>
        <span>{{ currentGroup.description }}</span>
        <em>{{ activeLabel }}</em>
      </div>

      <div class="effect-scenario__toggles">
        <button
          v-for="key in currentGroup.effectKeys"
          :key="key"
          type="button"
          :class="{ active: activeEffectIds.includes(key) }"
          @click="toggleEffect(key)"
        >
          {{ createEffects()[key]?.label || key }}
        </button>
      </div>

      <div class="effect-scenario__fields">
        <label>
          关系线色
          <input v-model="styleForm.relationColor" type="color" @change="applyStyleConfig" />
        </label>
        <label>
          关系线宽
          <input v-model.number="styleForm.relationWidth" type="number" min="1" max="10" step="1" @change="applyStyleConfig" />
        </label>
        <label>
          关系线型
          <select v-model="styleForm.relationLineType" @change="applyStyleConfig">
            <option value="flowDash">flowDash</option>
            <option value="dash">dash</option>
            <option value="solid">solid</option>
          </select>
        </label>
        <label>
          关系虚线
          <select v-model="styleForm.relationLineDash" @change="applyStyleConfig">
            <option value="dash">dash</option>
            <option value="dot">dot</option>
            <option value="dashDot">dashDot</option>
            <option value="none">none</option>
          </select>
        </label>
        <label>
          特效边框
          <input v-model="styleForm.effectStrokeColor" type="color" @change="applyStyleConfig" />
        </label>
        <label>
          特效填充
          <input v-model="styleForm.effectFillColor" type="text" @change="applyStyleConfig" />
        </label>
        <label>
          线类特效
          <input v-model="styleForm.effectLineColor" type="color" @change="applyStyleConfig" />
        </label>
        <label>
          特效线宽
          <input v-model.number="styleForm.effectWidth" type="number" min="1" max="10" step="1" @change="applyStyleConfig" />
        </label>
        <label>
          特效动画
          <select v-model="styleForm.effectAnimation" @change="applyStyleConfig">
            <option value="pulse">pulse</option>
            <option value="scan">scan</option>
            <option value="flow">flow</option>
            <option value="none">none</option>
          </select>
        </label>
        <label>
          雷达半径
          <input v-model.number="form.radarRange" type="number" min="20000" step="5000" @change="applyRangeConfig" />
        </label>
        <label>
          预警半径
          <input v-model.number="form.warningRange" type="number" min="20000" step="5000" @change="applyRangeConfig" />
        </label>
        <label>
          干扰半径
          <input v-model.number="form.jammerRange" type="number" min="20000" step="5000" @change="applyRangeConfig" />
        </label>
        <label>
          链路质量
          <select v-model="form.linkQuality" @change="setLinkQuality(form.linkQuality)">
            <option value="good">good</option>
            <option value="weak">weak</option>
            <option value="broken">broken</option>
          </select>
        </label>
      </div>

      <div class="effect-scenario__actions">
        <button type="button" @click="moveBlueTarget">推送一帧位置</button>
        <button type="button" @click="startStream">启动实时态势</button>
        <button type="button" @click="stopStream">停止实时态势</button>
        <button type="button" @click="clearEffects">清空特效</button>
        <button type="button" @click="resetScene">Reset</button>
      </div>
    </div>

    <div class="effect-scenario__status">{{ log }}</div>
    <div ref="mapRef" class="effect-scenario__map"></div>
  </div>
</template>

<style scoped>
.effect-scenario {
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.effect-scenario__tabs,
.effect-scenario__panel,
.effect-scenario__status {
  border-bottom: 1px solid var(--vp-c-divider);
}

.effect-scenario__tabs,
.effect-scenario__toggles,
.effect-scenario__fields,
.effect-scenario__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.effect-scenario__tabs {
  padding: 10px;
  background: var(--vp-c-bg-soft);
}

.effect-scenario__panel {
  display: grid;
  gap: 10px;
  padding: 12px;
}

.effect-scenario__summary {
  display: grid;
  gap: 3px;
}

.effect-scenario__summary strong {
  color: var(--vp-c-text-1);
  font-size: 14px;
}

.effect-scenario__summary span,
.effect-scenario__summary em,
.effect-scenario__status {
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-style: normal;
}

.effect-scenario button {
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.effect-scenario button.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.effect-scenario__fields label {
  display: grid;
  gap: 4px;
  min-width: 112px;
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.effect-scenario__fields input,
.effect-scenario__fields select {
  width: 112px;
  height: 32px;
  box-sizing: border-box;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.effect-scenario__fields input[type="color"] {
  width: 44px;
  padding: 2px;
}

.effect-scenario__fields input[type="text"] {
  width: 150px;
}

.effect-scenario__status {
  min-height: 36px;
  padding: 10px 12px;
  background: var(--vp-c-bg-soft);
}

.effect-scenario__map {
  width: 100%;
  height: 560px;
}
</style>
