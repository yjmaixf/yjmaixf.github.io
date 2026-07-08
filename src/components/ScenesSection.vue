<script setup>
import { effectGroups, sceneCards } from "../data/siteContent";
</script>

<template>
  <section id="scenes" class="split-section">
    <div class="section-heading compact">
      <p class="section-kicker">Scenarios</p>
      <h2>三种工作模式覆盖主要业务界面</h2>
      <p>编辑、态势显示、回放可以独立使用，也可以组合成完整推演系统。</p>
    </div>

    <div class="scene-layout">
      <div class="scene-list">
        <article v-for="card in sceneCards" :key="card.title" class="scene-card">
          <span>{{ card.meta }}</span>
          <h3>{{ card.title }}</h3>
          <p>{{ card.text }}</p>
        </article>
      </div>

      <div class="effect-board">
        <div class="radar-visual">
          <span class="radar-ring one"></span>
          <span class="radar-ring two"></span>
          <span class="radar-sweep"></span>
          <strong>Effects</strong>
        </div>
        <div class="effect-tags">
          <span v-for="item in effectGroups" :key="item">{{ item }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
