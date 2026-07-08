<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "overview"
  },
  height: {
    type: [Number, String],
    default: 520
  },
  autoPlay: {
    type: Boolean,
    default: false
  }
});

const mapRef = ref(null);
const status = ref("loading");
let editor = null;

const resourceOptions = {
  tileUrlTemplate: "/Sate/{z}/{x}/{y}.png",
  assetBaseUrl: "/",
  modelIconResolver: model => {
    const nation = ["red", "blue", "white"].includes(model?.nation) ? model.nation : "white";
    const icon = model?.iconKey || model?.NodeType || "default";
    return `/two/images/${nation}/${icon}.png`;
  },
  templateIconResolver: template => {
    const icon = template?.templateIcon || template?.NodeType || "default";
    return `/two/images/white/${icon}.png`;
  },
  annotationPointIconUrl: "/two/images/white/car.png"
};

const mapOptions = {
  projection: "EPSG:3857",
  center: [116.48, 39.9],
  zoom: 5,
  minZoom: 0,
  maxZoom: 18,
  multiWorld: true,
  smoothExtentConstraint: true
};

const baseModels = [
  {
    UID: "red_radar_001",
    showName: "Red Radar",
    name: "Red Radar",
    NodeType: "radar",
    iconKey: "default",
    modelType: "PLATFORM",
    nation: "red",
    lon: 116.22,
    lat: 39.92,
    height: 0,
    speed: 0,
    heading: 70,
    targetUID: "blue_ship_001"
  },
  {
    UID: "red_missile_001",
    showName: "Red Missile",
    name: "Red Missile",
    NodeType: "missile",
    iconKey: "missile",
    modelType: "WEAPON",
    nation: "red",
    lon: 116.32,
    lat: 39.78,
    height: 0,
    speed: 0,
    heading: 42,
    targetUID: "blue_ship_001"
  },
  {
    UID: "blue_ship_001",
    showName: "Blue Ship",
    name: "Blue Ship",
    NodeType: "ship",
    iconKey: "ship",
    modelType: "PLATFORM",
    nation: "blue",
    lon: 116.78,
    lat: 40.06,
    height: 0,
    speed: 0,
    heading: 250
  },
  {
    UID: "blue_air_001",
    showName: "Blue Aircraft",
    name: "Blue Aircraft",
    NodeType: "b2",
    iconKey: "b2",
    modelType: "AIRCRAFT",
    nation: "blue",
    lon: 116.65,
    lat: 39.72,
    height: 8000,
    speed: 230,
    heading: 304,
    line: [
      { lon: 116.42, lat: 39.62, height: 7600, speed: 220 },
      { lon: 116.58, lat: 39.74, height: 8000, speed: 230 },
      { lon: 116.78, lat: 39.86, height: 8200, speed: 235 }
    ],
    routeMeta: {
      name: "Blue patrol route",
      speed: 230,
      altitude: 8000
    }
  }
];

const groupModels = [
  ...baseModels,
  {
    UID: "red_car_001",
    showName: "Red Vehicle 1",
    name: "Red Vehicle 1",
    NodeType: "car",
    iconKey: "car",
    modelType: "PLATFORM",
    nation: "red",
    lon: 116.08,
    lat: 39.72,
    heading: 90
  },
  {
    UID: "red_car_002",
    showName: "Red Vehicle 2",
    name: "Red Vehicle 2",
    NodeType: "car",
    iconKey: "car",
    modelType: "PLATFORM",
    nation: "red",
    lon: 116.14,
    lat: 39.68,
    heading: 90
  }
];

const mountedModels = baseModels.map(model => {
  if (model.UID !== "blue_air_001") return model;
  return {
    ...model,
    mounts: [
      {
        UID: "sensor_payload_001",
        showName: "EO Sensor",
        name: "EO Sensor",
        NodeType: "sensor",
        modelType: "PAYLOAD",
        nation: "blue",
        status: "mounted"
      },
      {
        UID: "weapon_payload_001",
        showName: "Air Missile",
        name: "Air Missile",
        NodeType: "missile",
        modelType: "WEAPON",
        nation: "blue",
        status: "mounted"
      }
    ]
  };
});

const invalidModels = [
  {
    ...baseModels[0],
    UID: "invalid_red_radar_001",
    showName: "Duplicate Unit",
    lon: 116.2,
    lat: 39.9
  },
  {
    ...baseModels[1],
    UID: "invalid_red_missile_001",
    showName: "Duplicate Unit",
    lon: 196.4,
    lat: 39.8
  },
  baseModels[2]
];

const annotationList = [
  {
    id: "anno-point-rally",
    name: "Rally Point",
    type: "point",
    category: "basic",
    geometry: { type: "point", coordinates: [116.18, 39.86] }
  },
  {
    id: "anno-route-line",
    name: "Ingress Line",
    type: "line",
    category: "basic",
    geometry: {
      type: "line",
      coordinates: [
        [116.1, 39.68],
        [116.32, 39.78],
        [116.58, 39.92]
      ]
    }
  },
  {
    id: "anno-nofly",
    name: "No Fly Zone",
    type: "polygon",
    category: "noFlyZone",
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
  {
    id: "anno-text",
    name: "Command Note",
    type: "text",
    category: "basic",
    text: "Hold Line",
    geometry: { type: "point", coordinates: [116.42, 40.05] }
  }
];

const advancedAnnotationList = [
  ...annotationList,
  {
    id: "anno-arrow-attack",
    name: "Attack Arrow",
    type: "arrow",
    category: "military",
    text: "Attack",
    geometry: {
      type: "line",
      coordinates: [
        [116.16, 39.78],
        [116.36, 39.88],
        [116.62, 39.98]
      ]
    }
  },
  {
    id: "anno-military-area",
    name: "Operation Area",
    type: "polygon",
    category: "military",
    text: "Area A",
    geometry: {
      type: "polygon",
      coordinates: [
        [116.08, 39.98],
        [116.28, 40.08],
        [116.46, 40.02],
        [116.38, 39.88],
        [116.08, 39.98]
      ]
    }
  }
];

const performanceSpecialModels = {
  0: {
    showName: "BLUE Radar North",
    name: "BLUE Radar North",
    NodeType: "radar",
    iconKey: "default",
    modelType: "RADAR",
    nation: "blue",
    heading: 120
  },
  23: {
    showName: "RED Radar West",
    name: "RED Radar West",
    NodeType: "radar",
    iconKey: "default",
    modelType: "RADAR",
    nation: "red",
    heading: 70
  },
  60: {
    showName: "RED Jammer Alpha",
    name: "RED Jammer Alpha",
    NodeType: "jammer",
    iconKey: "default",
    modelType: "JAMMER",
    nation: "red",
    heading: 35
  },
  95: {
    showName: "BLUE Radar East",
    name: "BLUE Radar East",
    NodeType: "radar",
    iconKey: "default",
    modelType: "RADAR",
    nation: "blue",
    heading: 255
  },
  127: {
    showName: "BLUE Jammer Beta",
    name: "BLUE Jammer Beta",
    NodeType: "jammer",
    iconKey: "default",
    modelType: "JAMMER",
    nation: "blue",
    heading: 310
  },
  188: {
    showName: "RED Radar South",
    name: "RED Radar South",
    NodeType: "radar",
    iconKey: "default",
    modelType: "RADAR",
    nation: "red",
    heading: 18
  },
  209: {
    showName: "RED Missile Section",
    name: "RED Missile Section",
    NodeType: "missile",
    iconKey: "missile",
    modelType: "WEAPON",
    nation: "red",
    heading: 42
  }
};

const createLargeScaleModels = () => {
  const models = [];
  const columns = 20;
  const count = 240;
  for (let index = 0; index < count; index += 1) {
    const row = Math.floor(index / columns);
    const column = index % columns;
    const nation = index % 3 === 0 ? "blue" : "red";
    const nodeType = index % 5 === 0 ? "ship" : index % 7 === 0 ? "b2" : "car";
    const model = {
      UID: `perf_${index}`,
      showName: `${nation.toUpperCase()} ${index + 1}`,
      name: `${nation.toUpperCase()} ${index + 1}`,
      NodeType: nodeType,
      iconKey: nodeType,
      modelType: nodeType === "b2" ? "AIRCRAFT" : "PLATFORM",
      nation,
      lon: 115.7 + column * 0.045,
      lat: 39.35 + row * 0.045,
      heading: (index * 23) % 360,
      speed: index % 7 === 0 ? 220 : 0
    };
    models.push({
      ...model,
      ...(performanceSpecialModels[index] || {})
    });
  }
  return models;
};

const performanceModels = createLargeScaleModels();

const performanceRelations = [
  {
    id: "perf_detect_radar_north_056",
    type: "detect",
    sourceUID: "perf_0",
    targetUID: "perf_56",
    label: "Detect",
    style: { width: 2, lineType: "dash" }
  },
  {
    id: "perf_detect_radar_west_118",
    type: "detect",
    sourceUID: "perf_23",
    targetUID: "perf_118",
    label: "Detect",
    style: { width: 2, lineType: "dash" }
  },
  {
    id: "perf_detect_radar_east_174",
    type: "detect",
    sourceUID: "perf_95",
    targetUID: "perf_174",
    label: "Detect",
    style: { width: 2, lineType: "dash" }
  },
  {
    id: "perf_comm_radar_network_0_95",
    type: "communication",
    sourceUID: "perf_0",
    targetUID: "perf_95",
    label: "Data Link",
    style: { width: 2, lineType: "solid", color: "rgba(80, 220, 150, 0.9)" }
  },
  {
    id: "perf_comm_jammer_coord_60_188",
    type: "communication",
    sourceUID: "perf_60",
    targetUID: "perf_188",
    label: "Coord",
    style: { width: 2, lineType: "dash", color: "rgba(255, 210, 100, 0.9)" }
  },
  {
    id: "perf_attack_missile_209_15",
    type: "attack",
    sourceUID: "perf_209",
    targetUID: "perf_15",
    label: "Strike",
    style: { width: 3, lineType: "flowDash" }
  },
  {
    id: "perf_attack_red_188_95",
    type: "attack",
    sourceUID: "perf_188",
    targetUID: "perf_95",
    label: "Suppress",
    style: { width: 3, lineType: "flowDash" }
  }
];

const performanceEffects = [
  {
    id: "perf_radar_scan_0",
    type: "radar",
    sourceUID: "perf_0",
    geometry: { shape: "sector", radius: 125000, angle: 105, direction: 120 },
    label: "North Radar",
    style: { animation: "scan" }
  },
  {
    id: "perf_radar_scan_23",
    type: "radar",
    sourceUID: "perf_23",
    geometry: { shape: "sector", radius: 115000, angle: 95, direction: 70 },
    label: "West Radar",
    style: { animation: "scan", strokeColor: "rgba(255, 160, 72, 0.9)" }
  },
  {
    id: "perf_radar_scan_95",
    type: "radar",
    sourceUID: "perf_95",
    geometry: { shape: "sector", radius: 135000, angle: 110, direction: 255 },
    label: "East Radar",
    style: { animation: "scan" }
  },
  {
    id: "perf_radar_scan_188",
    type: "radar",
    sourceUID: "perf_188",
    geometry: { shape: "sector", radius: 120000, angle: 100, direction: 18 },
    label: "South Radar",
    style: { animation: "scan", strokeColor: "rgba(255, 160, 72, 0.9)" }
  },
  {
    id: "perf_jammer_60",
    type: "jammer",
    sourceUID: "perf_60",
    geometry: { shape: "circle", radius: 85000 },
    label: "Jammer Alpha",
    style: { animation: "pulse" }
  },
  {
    id: "perf_jammer_127",
    type: "jammer",
    sourceUID: "perf_127",
    geometry: { shape: "circle", radius: 78000 },
    label: "Jammer Beta",
    style: { animation: "pulse" }
  },
  {
    id: "perf_warning_150",
    type: "warning",
    sourceUID: "perf_150",
    geometry: { shape: "circle", radius: 62000 },
    label: "Warning Area",
    style: { animation: "pulse" }
  },
  {
    id: "perf_link_0_95",
    type: "linkQuality",
    sourceUID: "perf_0",
    targetUID: "perf_95",
    geometry: { shape: "line", targetUID: "perf_95" },
    label: "Link",
    style: { quality: "good", width: 3 }
  },
  {
    id: "perf_missile_209_15",
    type: "missileFlight",
    sourceUID: "perf_209",
    targetUID: "perf_15",
    geometry: { shape: "line", targetUID: "perf_15" },
    label: "Missile Flight",
    style: { width: 5 }
  }
];

const customTemplateModels = [
  {
    UID: "custom_fighter_001",
    showName: "Custom Fighter",
    name: "Custom Fighter",
    NodeType: "fighter",
    iconKey: "b2",
    modelType: "AIRCRAFT",
    templateCategory: "platform",
    nation: "red",
    lon: 116.16,
    lat: 39.78,
    heading: 65,
    targetUID: "custom_drone_001"
  },
  {
    UID: "custom_drone_001",
    showName: "Custom Drone",
    name: "Custom Drone",
    NodeType: "drone",
    iconKey: "default",
    modelType: "UAV",
    templateCategory: "platform",
    nation: "blue",
    lon: 116.66,
    lat: 40.02,
    heading: 245
  },
  {
    UID: "custom_launcher_001",
    showName: "Custom Launcher",
    name: "Custom Launcher",
    NodeType: "launcher",
    iconKey: "car",
    modelType: "PLATFORM",
    templateCategory: "platform",
    nation: "red",
    lon: 116.28,
    lat: 39.92,
    heading: 20
  }
];

const relationList = [
  {
    id: "attack_red_missile_blue_ship",
    type: "attack",
    sourceUID: "red_missile_001",
    targetUID: "blue_ship_001",
    label: "Attack",
    style: { width: 3, lineType: "flowDash" }
  },
  {
    id: "detect_red_radar_blue_air",
    type: "detect",
    sourceUID: "red_radar_001",
    targetUID: "blue_air_001",
    label: "Detect",
    style: { width: 2, lineType: "dash" }
  },
  {
    id: "communication_red_radar_blue_ship",
    type: "communication",
    sourceUID: "red_radar_001",
    targetUID: "blue_ship_001",
    label: "Communication",
    style: { width: 2, lineType: "solid", color: "rgba(80, 220, 150, 0.92)" }
  }
];

const effectList = [
  {
    id: "radar_red_radar_001",
    type: "radar",
    sourceUID: "red_radar_001",
    geometry: { shape: "sector", radius: 125000, angle: 105, direction: 70 },
    label: "Radar scan",
    style: {
      animation: "scan",
      color: "rgba(60, 160, 255, 0.18)",
      strokeColor: "rgba(60, 160, 255, 0.9)"
    }
  },
  {
    id: "missile_red_missile_blue_ship",
    type: "missileFlight",
    sourceUID: "red_missile_001",
    targetUID: "blue_ship_001",
    geometry: { shape: "line", targetUID: "blue_ship_001" },
    label: "Missile flight",
    style: { strokeColor: "rgba(255, 190, 80, 0.96)", width: 5 }
  },
  {
    id: "lock_blue_ship_001",
    type: "lock",
    sourceUID: "blue_ship_001",
    geometry: { shape: "box", size: 64 },
    label: "Lock"
  }
];

const sceneByVariant = {
  overview: {
    mode: "edit",
    models: baseModels,
    relations: relationList.slice(0, 2),
    effects: effectList.slice(0, 2)
  },
  models: {
    mode: "edit",
    models: groupModels,
    relations: [],
    effects: []
  },
  "target-heading": {
    mode: "edit",
    models: baseModels,
    relations: [],
    effects: []
  },
  relations: {
    mode: "view",
    models: baseModels,
    relations: relationList,
    effects: []
  },
  effects: {
    mode: "view",
    models: baseModels,
    relations: relationList.slice(0, 1),
    effects: effectList
  },
  routes: {
    mode: "playback",
    models: baseModels,
    relations: [],
    effects: []
  },
  "batch-selection": {
    mode: "edit",
    models: groupModels,
    relations: [],
    effects: []
  },
  playback: {
    mode: "playback",
    models: baseModels,
    relations: relationList.slice(0, 1),
    effects: []
  },
  "import-export": {
    mode: "edit",
    models: baseModels,
    relations: relationList.slice(0, 2),
    effects: effectList.slice(0, 1)
  },
  annotations: {
    mode: "edit",
    models: baseModels,
    relations: [],
    effects: [],
    annotations: annotationList
  },
  measure: {
    mode: "edit",
    models: baseModels,
    relations: [],
    effects: [],
    annotations: annotationList.slice(1, 3)
  },
  "context-menu": {
    mode: "edit",
    models: baseModels,
    relations: relationList.slice(0, 1),
    effects: []
  },
  mounts: {
    mode: "edit",
    models: mountedModels,
    relations: [],
    effects: []
  },
  "realtime-frame": {
    mode: "view",
    models: groupModels,
    relations: relationList,
    effects: effectList
  },
  "validation-history": {
    mode: "edit",
    models: invalidModels,
    relations: [],
    effects: []
  },
  "annotations-advanced": {
    mode: "edit",
    models: baseModels,
    relations: [],
    effects: [],
    annotations: advancedAnnotationList
  },
  "performance-large": {
    mode: "view",
    models: performanceModels,
    relations: performanceRelations,
    effects: performanceEffects,
    display: {
      showPopup: false,
      showModelName: false,
      showTargetLine: false,
      headingVisible: {
        red: false,
        blue: false
      },
      performance: {
        level: "performance"
      },
      effectStyles: {
        default: {
          width: 2
        },
        radar: {
          color: "rgba(64, 200, 255, 0.12)"
        },
        jammer: {
          color: "rgba(178, 93, 255, 0.12)"
        },
        warning: {
          color: "rgba(255, 82, 82, 0.12)"
        }
      }
    }
  },
  "custom-templates": {
    mode: "edit",
    models: customTemplateModels,
    relations: [
      {
        id: "custom_target_fighter_drone",
        type: "target",
        sourceUID: "custom_fighter_001",
        targetUID: "custom_drone_001"
      }
    ],
    effects: []
  }
};

const normalizeCssSize = value => {
  if (typeof value === "number") return `${value}px`;
  const normalized = String(value).trim();
  return /^\d+(\.\d+)?$/.test(normalized) ? `${normalized}px` : normalized;
};

const containerStyle = computed(() => ({
  height: normalizeCssSize(props.height)
}));

const clone = value => JSON.parse(JSON.stringify(value));

const createScene = variant => {
  const preset = sceneByVariant[variant] || sceneByVariant.overview;
  return {
    mode: preset.mode,
    metadata: {
      name: `${variant} preview`,
      description: "Documentation preview scene"
    },
    models: clone(preset.models),
    relations: clone(preset.relations),
    effects: clone(preset.effects),
    annotations: clone(preset.annotations || []),
    display: {
      showPopup: true,
      showModelName: true,
      showTargetLine: ["overview", "target-heading", "import-export", "custom-templates"].includes(variant),
      targetLineStyle: {
        redColor: "#ff5c5c",
        blueColor: "#409eff",
        width: 3,
        lineType: variant === "target-heading" ? "flowDash" : "dash"
      },
      headingVisible: {
        red: ["overview", "target-heading", "routes", "playback", "custom-templates"].includes(variant),
        blue: ["overview", "target-heading", "routes", "playback", "custom-templates"].includes(variant)
      },
      relationLineStyles: {
        target: { width: 3, lineType: "flowDash" },
        attack: { color: "rgba(255, 185, 80, 0.95)", width: 3, lineType: "flowDash" },
        detect: { color: "rgba(72, 167, 255, 0.95)", width: 2, lineType: "dash" },
        communication: { color: "rgba(80, 220, 150, 0.92)", width: 2, lineType: "solid" }
      },
      performance: { level: "balanced" },
      ...(preset.display || {})
    },
    playback: {
      speed: 4,
      progress: 0,
      duration: 120,
      elapsed: 0,
      currentTimeLabel: "T+00:00",
      maxTrailPoints: 1200
    }
  };
};

async function renderPreview() {
  if (!editor) return;
  status.value = "loading";
  await editor.loadScene(createScene(props.variant), { recordHistory: false });
  if (props.variant === "batch-selection") {
    editor.setBatchSelection?.(["red_radar_001", "red_missile_001", "red_car_001", "red_car_002"]);
  }
  if (props.variant === "context-menu") {
    editor.setContextMenuItems?.([
      {
        id: "focus",
        label: "聚焦模型",
        visible: ({ model }) => Boolean(model),
        action: ({ model }) => editor.focusModel?.(model.UID)
      },
      {
        id: "inspect",
        label: "查看属性",
        visible: ({ model }) => Boolean(model),
        action: ({ model }) => editor.selectModel?.(model.UID)
      }
    ], { enabled: true });
  }
  if (props.variant === "validation-history") {
    editor.validateScene?.();
  }
  if (props.autoPlay || props.variant === "playback") {
    editor.startPlayback?.();
  }
  status.value = "ready";
}

onMounted(async () => {
  if (!mapRef.value) return;
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
  await renderPreview();
});

watch(() => props.variant, () => {
  renderPreview();
});

onUnmounted(() => {
  editor?.destroy?.();
  editor = null;
});
</script>

<template>
  <div class="live-scenario" :style="containerStyle">
    <div ref="mapRef" class="live-scenario__map"></div>
    <div v-if="status === 'loading'" class="live-scenario__loading">Loading preview...</div>
  </div>
</template>

<style scoped>
.live-scenario {
  position: relative;
  width: 100%;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.live-scenario__map {
  width: 100%;
  height: 100%;
}

.live-scenario__loading {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: var(--vp-c-text-2);
  background: color-mix(in srgb, var(--vp-c-bg) 82%, transparent);
}
</style>
