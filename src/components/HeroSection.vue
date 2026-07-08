<script setup>
import ScenarioEditor from "openlayers2dsceneeditor";
import { stats } from "../data/siteContent";

defineProps({
  resourceOptions: {
    type: Object,
    required: true
  },
  mapOptions: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <section id="top" class="hero-section">
    <div class="hero-copy">
      <p class="section-kicker">Vue 3 / OpenLayers</p>
      <h1>二维想定编辑与态势显示组件库</h1>
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
        <ScenarioEditor
          :resource-options="resourceOptions"
          :map-options="mapOptions"
          :show-workbench="false"
        />
      </div>
      <div class="floating-panel">
        <p>态势帧</p>
        <strong>Models / Relations / Effects</strong>
        <span>incremental update</span>
      </div>
    </div>
  </section>
</template>
