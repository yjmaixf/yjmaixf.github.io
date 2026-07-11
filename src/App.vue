<script setup>
import ArchitectureSection from "./components/ArchitectureSection.vue";
import AssetsSection from "./components/AssetsSection.vue";
import ExamplesSection from "./components/ExamplesSection.vue";
import FeatureSection from "./components/FeatureSection.vue";
import HeroSection from "./components/HeroSection.vue";
import ScenesSection from "./components/ScenesSection.vue";
import SiteFooter from "./components/SiteFooter.vue";
import SiteHeader from "./components/SiteHeader.vue";
import StartSection from "./components/StartSection.vue";

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
