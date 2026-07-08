<script setup>
import { architectureItems } from "../data/siteContent";
</script>

<template>
  <section id="architecture" class="content-section architecture-section">
    <div class="section-heading">
      <p class="section-kicker">Architecture</p>
      <h2>清晰的发布边界，方便业务系统接入</h2>
      <p>推荐入口保持简单，复杂状态和地图桥接留在组件库内部。业务侧只需要组织数据并调用公开 API。</p>
    </div>

    <div class="architecture-grid">
      <article v-for="item in architectureItems" :key="item.title">
        <h3>{{ item.title }}</h3>
        <p>{{ item.text }}</p>
      </article>
    </div>
  </section>
</template>
