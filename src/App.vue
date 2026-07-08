<script setup>
import { onMounted } from "vue";
import { createScenarioEditor } from "openlayers2dsceneeditor";
import ArchitectureSection from "./components/ArchitectureSection.vue";
import AssetsSection from "./components/AssetsSection.vue";
import ExamplesSection from "./components/ExamplesSection.vue";
import FeatureSection from "./components/FeatureSection.vue";
import HeroSection from "./components/HeroSection.vue";
import ScenesSection from "./components/ScenesSection.vue";
import SiteFooter from "./components/SiteFooter.vue";
import SiteHeader from "./components/SiteHeader.vue";
import StartSection from "./components/StartSection.vue";

const editor = createScenarioEditor();

const resourceOptions = {
  tileUrlTemplate: "/Sate/{z}/{x}/{y}.png",
  assetBaseUrl: "/",
  modelIconResolver: model => {
    const nation = ["red", "blue", "white"].includes(model?.nation) ? model.nation : "white";
    const icon = model?.iconKey || model?.NodeType || "car";
    return `/two/images/${nation}/${icon}.png`;
  },
  templateIconResolver: template => {
    const icon = template?.templateIcon || template?.NodeType || "car";
    return `/two/images/white/${icon}.png`;
  },
  annotationPointIconUrl: "/two/images/white/car.png"
};

const mapOptions = {
  projection: "EPSG:3857",
  center: [116.394926, 39.9125],
  zoom: 5,
  minZoom: 0,
  maxZoom: 18,
  multiWorld: true,
  smoothExtentConstraint: true
};

const models = [
  {
    UID: "red_radar_001",
    showName: "红方雷达",
    NodeType: "radar",
    iconKey: "default",
    modelType: "PLATFORM",
    nation: "red",
    lon: 116.22,
    lat: 39.92,
    heading: 70,
    targetUID: "blue_ship_001"
  },
  {
    UID: "red_missile_001",
    showName: "红方导弹",
    NodeType: "missile",
    iconKey: "missile",
    modelType: "WEAPON",
    nation: "red",
    lon: 116.32,
    lat: 39.78,
    heading: 42,
    targetUID: "blue_ship_001"
  },
  {
    UID: "blue_ship_001",
    showName: "蓝方舰船",
    NodeType: "ship",
    iconKey: "ship",
    modelType: "PLATFORM",
    nation: "blue",
    lon: 116.78,
    lat: 40.06,
    heading: 250
  },
  {
    UID: "blue_air_001",
    showName: "蓝方飞机",
    NodeType: "b2",
    iconKey: "b2",
    modelType: "AIRCRAFT",
    nation: "blue",
    lon: 116.65,
    lat: 39.72,
    heading: 304
  }
];

const relations = [
  {
    id: "attack_red_missile_blue_ship",
    type: "attack",
    sourceUID: "red_missile_001",
    targetUID: "blue_ship_001",
    label: "攻击",
    style: { width: 3, lineType: "flowDash" }
  },
  {
    id: "detect_red_radar_blue_air",
    type: "detect",
    sourceUID: "red_radar_001",
    targetUID: "blue_air_001",
    label: "探测",
    style: { width: 2, lineType: "dash" }
  }
];

const effects = [
  {
    id: "radar_red_radar_001",
    type: "radar",
    sourceUID: "red_radar_001",
    geometry: { shape: "sector", radius: 125000, angle: 105, direction: 70 },
    label: "雷达扫描",
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
    label: "导弹飞行",
    style: { strokeColor: "rgba(255, 190, 80, 0.96)", width: 5 }
  }
];

async function callEditor(method, ...args) {
  if (typeof editor?.[method] === "function") {
    await editor[method](...args);
  }
}

onMounted(async () => {
  await editor.ready();
  await callEditor("setDisplayConfig", {
    showPopup: true,
    showModelName: true,
    showTargetLine: true,
    headingVisible: { red: true, blue: true, white: true },
    targetLineStyle: {
      redColor: "#ff5c5c",
      blueColor: "#409eff",
      width: 3,
      lineType: "flowDash"
    },
    performance: { level: "balanced" }
  });

  if (typeof editor?.batchUpdateModels === "function") {
    await editor.batchUpdateModels(models.map(model => ({ uid: model.UID, patch: model })));
  } else {
    for (const model of models) {
      await callEditor("addModel", model);
    }
  }

  await callEditor("upsertRelations", relations);
  await callEditor("upsertEffects", effects);
});
</script>

<template>
  <SiteHeader />
  <main>
    <HeroSection :resource-options="resourceOptions" :map-options="mapOptions" />
    <FeatureSection />
    <ScenesSection />
    <ExamplesSection />
    <ArchitectureSection />
    <AssetsSection />
    <StartSection />
  </main>
  <SiteFooter />
</template>
