<script setup>
import { featureCards } from "../data/siteContent";
</script>

<template>
  <section id="features" class="content-section">
    <div class="section-heading">
      <p class="section-kicker">Capabilities</p>
      <h2>从编辑到显示的完整二维场景能力</h2>
      <p>官网重点呈现组件库可以交付给宿主系统的能力，而不是把业务规则写死在组件内部。</p>
    </div>

    <div class="feature-grid">
      <article v-for="card in featureCards" :key="card.title" class="feature-card">
        <h3>{{ card.title }}</h3>
        <p>{{ card.text }}</p>
        <div class="tag-row">
          <span v-for="tag in card.tags" :key="tag">{{ tag }}</span>
        </div>
      </article>
    </div>
  </section>
</template>
