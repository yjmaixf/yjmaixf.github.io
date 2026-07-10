<script setup>
import { assetRows } from "../data/siteContent";
</script>

<template>
  <section id="assets" class="assets-section">
    <div class="section-heading compact">
      <p class="section-kicker">Assets</p>
      <h2>内置素材可以直接撑起官网演示</h2>
      <p>示例素材已经适合展示离线地图、区域数据和红蓝白目标图标。</p>
    </div>

    <div class="assets-panel">
      <div v-for="row in assetRows" :key="row.name" class="asset-row">
        <strong>{{ row.name }}</strong>
        <code>{{ row.value }}</code>
        <p>{{ row.desc }}</p>
      </div>
    </div>

    <div class="icon-showcase" aria-label="模型图标展示">
      <img src="/two/images/red/missile.png" alt="红方导弹" />
      <img src="/two/images/blue/ship.png" alt="蓝方舰船" />
      <img src="/two/images/white/bomber.png" alt="白方飞机" />
      <img src="/two/images/red/car.png" alt="红方车辆" />
      <img src="/two/images/blue/b2.png" alt="蓝方飞机" />
    </div>
  </section>
</template>
