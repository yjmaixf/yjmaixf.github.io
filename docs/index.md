---
layout: home

hero:
  name: openlayers2dsceneeditor
  text: Vue 3 + OpenLayers 二维想定编辑器
  tagline: 文档、可运行示例、API 入口和配置说明，面向模型部署、关系线、航路编辑、态势特效与回放。
  image:
    src: /two/images/blue/ship.png
    alt: openlayers2dsceneeditor
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 打开 Playground
      link: /playground

features:
  - title: 想定编辑
    details: 部署模型、编辑航线、批量框选、批量移动/旋转、标绘、测量、导入导出。
  - title: 态势显示
    details: 接入实时数据，增量更新模型、关系线和态势特效，支持高频刷新优化。
  - title: 可配置资源
    details: 宿主应用提供瓦片、图标、模板和标绘资源，组件库不绑定业务素材。
  - title: API 驱动
    details: 通过 ScenarioEditor 和 createScenarioEditor() 组织 Vue 组件接入与业务控制。
---

## 文档结构

<div class="doc-card-grid">
  <a class="doc-card" href="/guide/getting-started">
    <h3>指南</h3>
    <p>安装、快速接入、设计边界和版本兼容。</p>
  </a>
  <a class="doc-card" href="/examples/models">
    <h3>功能示例</h3>
    <p>按模型、关系线、态势特效、回放等功能拆分示例。</p>
  </a>
  <a class="doc-card" href="/api/controller">
    <h3>API 文档</h3>
    <p>Controller API、场景数据结构、模型结构、效果结构。</p>
  </a>
  <a class="doc-card" href="/config/resources">
    <h3>配置</h3>
    <p>资源路径、瓦片、显示配置和性能配置。</p>
  </a>
</div>

## 可运行预览

<ClientOnly>
  <LiveScenario variant="overview" />
</ClientOnly>

这块预览直接使用 `ScenarioEditor`、`createScenarioEditor()`、离线瓦片和模型图标资源。
