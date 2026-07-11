<script setup>
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import { createMapEngine, createScenarioEditor } from "openlayers2dsceneeditor";
import { stats } from "../data/siteContent";

const props = defineProps({
  resourceOptions: {
    type: Object,
    required: true
  },
  mapOptions: {
    type: Object,
    required: true
  }
});

const mapRef = ref(null);
let editor = null;

const seedHeroScene = async () => {
  await editor.loadScene({
    mode: "view",
    metadata: { name: "Hero preview" },
    models: [
      {
        UID: "hero_red_radar",
        showName: "红方雷达",
        name: "红方雷达",
        NodeType: "radar",
        iconKey: "default",
        modelType: "RADAR",
        nation: "red",
        lon: 116.22,
        lat: 39.92,
        heading: 70,
        targetUID: "hero_blue_ship"
      },
      {
        UID: "hero_red_missile",
        showName: "红方导弹",
        name: "红方导弹",
        NodeType: "missile",
        iconKey: "missile",
        modelType: "WEAPON",
        nation: "red",
        lon: 116.32,
        lat: 39.78,
        heading: 42,
        targetUID: "hero_blue_ship"
      },
      {
        UID: "hero_blue_ship",
        showName: "蓝方舰船",
        name: "蓝方舰船",
        NodeType: "ship",
        iconKey: "ship",
        modelType: "PLATFORM",
        nation: "blue",
        lon: 116.78,
        lat: 40.06,
        heading: 250
      },
      {
        UID: "hero_blue_air",
        showName: "蓝方飞机",
        name: "蓝方飞机",
        NodeType: "b2",
        iconKey: "b2",
        modelType: "AIRCRAFT",
        nation: "blue",
        lon: 116.65,
        lat: 39.72,
        heading: 304
      }
    ],
    relations: [
      {
        id: "hero_attack",
        type: "attack",
        sourceUID: "hero_red_missile",
        targetUID: "hero_blue_ship",
        label: "攻击",
        style: { width: 3, lineType: "flowDash" }
      },
      {
        id: "hero_detect",
        type: "detect",
        sourceUID: "hero_red_radar",
        targetUID: "hero_blue_air",
        label: "探测",
        style: { width: 2, lineType: "dash" }
      }
    ],
    effects: [
      {
        id: "hero_radar",
        type: "radar",
        sourceUID: "hero_red_radar",
        geometry: { shape: "sector", radius: 125000, angle: 105, direction: 70 },
        label: "雷达扫描",
        style: {
          animation: "scan",
          color: "rgba(60, 160, 255, 0.18)",
          strokeColor: "rgba(60, 160, 255, 0.9)"
        }
      },
      {
        id: "hero_missile",
        type: "missileFlight",
        sourceUID: "hero_red_missile",
        targetUID: "hero_blue_ship",
        geometry: { shape: "line", targetUID: "hero_blue_ship" },
        label: "导弹飞行",
        style: { strokeColor: "rgba(255, 190, 80, 0.96)", width: 5 }
      }
    ],
    display: {
      showPopup: true,
      showModelName: true,
      showTargetLine: true,
      headingVisible: { red: true, blue: true },
      targetLineStyle: {
        redColor: "#ff5c5c",
        blueColor: "#409eff",
        width: 3,
        lineType: "flowDash"
      },
      performance: { level: "balanced" }
    }
  }, { recordHistory: false });
};

onMounted(async () => {
  if (!mapRef.value) return;
  const engine = createMapEngine();
  editor = createScenarioEditor({
    engine,
    mapApp: engine.getMapApp(),
    context: engine.getContext()
  });
  await editor.init({
    ...props.resourceOptions,
    ...props.mapOptions,
    target: mapRef.value
  });
  await editor.ready();
  await nextTick();
  await seedHeroScene();
});

onUnmounted(() => {
  editor?.destroy?.();
  editor = null;
});
</script>

<template>
  <section id="top" class="hero-section">
    <div class="hero-copy">
      <p class="section-kicker">Framework-free JavaScript / OpenLayers</p>
      <h1>二维想定编辑与态势显示 JavaScript 库</h1>
      <p class="hero-lead">
        面向仿真推演、态势展示、航线编辑和历史回放的通用地图组件。业务系统负责规则判断，组件库负责把模型、关系线和特效稳定呈现在二维场景中。
      </p>
      <div class="hero-actions">
        <a class="primary-link" href="#start">快速接入</a>
        <a class="secondary-link" href="#features">查看能力</a>
      </div>
      <dl class="hero-stats">
        <div v-for="item in stats" :key="item.label">
          <dt>{{ item.value }}</dt>
          <dd>{{ item.label }}</dd>
        </div>
      </dl>
    </div>

    <div class="product-frame">
      <div class="frame-toolbar">
        <span></span>
        <span></span>
        <span></span>
        <strong>Scenario Console</strong>
      </div>
      <div class="product-preview">
        <div ref="mapRef" class="hero-map"></div>
      </div>
      <div class="floating-panel">
        <p>态势帧</p>
        <strong>Models / Relations / Effects</strong>
        <span>incremental update</span>
      </div>
    </div>
  </section>
</template>
