<script setup>
import { navItems } from "../data/siteContent";
</script>

<template>
  <header class="site-header">
    <a class="brand" href="#top" aria-label="openlayers2dsceneeditor 首页">
      <span class="brand-mark">OL</span>
      <span>
        <strong>openlayers2dsceneeditor</strong>
        <small>2D Scenario Editor</small>
      </span>
    </a>

    <nav class="main-nav" aria-label="主导航">
      <a v-for="item in navItems" :key="item.href" :href="item.href">{{ item.label }}</a>
    </nav>

    <a class="header-action" href="https://www.npmjs.com/package/openlayers2dsceneeditor" target="_blank" rel="noreferrer">
      npm
    </a>
  </header>
</template>
