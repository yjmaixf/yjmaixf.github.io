<script setup>
import { installCode, usageCode } from "../data/siteContent";
</script>

<template>
  <section id="start" class="start-section">
    <div class="start-copy">
      <p class="section-kicker">Get Started</p>
      <h2>几行配置接入真实二维场景</h2>
      <p>
        安装正式版包、引入样式、提供资源解析函数和地图初始化配置，就可以通过 DOM target 创建 editor 实例。
      </p>
      <a class="primary-link" href="https://www.npmjs.com/package/openlayers2dsceneeditor" target="_blank" rel="noreferrer">
        查看 npm 包
      </a>
    </div>

    <div class="code-stack">
      <div class="code-card">
        <span>Install</span>
        <pre><code>{{ installCode }}</code></pre>
      </div>
      <div class="code-card large">
        <span>Usage</span>
        <pre><code>{{ usageCode }}</code></pre>
      </div>
    </div>
  </section>
</template>
