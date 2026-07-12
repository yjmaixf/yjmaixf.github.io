# 快速开始

`openlayers2dsceneeditor@1.0.2` 是基于 OpenLayers 的二维想定编辑与态势显示 JavaScript 库。1.0 起库本身不再依赖 Vue，也不再导出 `ScenarioEditor` Vue 组件。

官网仍然可以使用 Vue/VitePress 构建文档页面；业务项目接入库时只需要提供一个 DOM 容器。

## 安装

```bash
npm i openlayers2dsceneeditor
```

如果包管理器没有自动安装 peer dependency，请同时安装 OpenLayers：

```bash
npm i ol
```

引入样式：

```js
import "openlayers2dsceneeditor/style.css";
```

## DOM 初始化

```html
<div id="map" style="width: 100vw; height: 100vh;"></div>
```

```js
import { createScenarioEditor } from "openlayers2dsceneeditor";
import "openlayers2dsceneeditor/style.css";

const editor = createScenarioEditor();

editor.setResourceOptions({
  tileUrlTemplate: "/Sate/{z}/{x}/{y}.png",
  modelIconResolver: model =>
    `/two/images/${model.nation}/${model.iconKey || model.NodeType}.png`,
  annotationPointIconUrl: "/two/images/white/car.png"
});

await editor.init({
  target: document.getElementById("map"),
  projection: "EPSG:3857",
  center: [116.394926, 39.9125],
  zoom: 5,
  minZoom: 0,
  maxZoom: 18,
  multiWorld: true
});
```

## 控制器调用

```js
await editor.setMode("edit");

await editor.addModel({
  UID: "red_radar_001",
  lon: 116.3,
  lat: 39.9,
  nation: "red",
  NodeType: "radar",
  iconKey: "default",
  showName: "红方雷达"
});

await editor.upsertEffects({
  id: "radar_red_radar_001",
  type: "radar",
  sourceUID: "red_radar_001",
  geometry: { shape: "sector", radius: 120000, angle: 100 },
  style: { animation: "scan" },
  label: "雷达扫描"
});
```

## 从 0.x 迁移

- 0.x 的 `ScenarioEditor` Vue 组件在 1.0 中已移除。
- 1.0 默认导出和命名导出均围绕 `createScenarioEditor()`。
- 仍需要 Vue 组件 API 的项目请继续使用 `openlayers2dsceneeditor@0.2.1`。
- Vue、React、Svelte、原生 HTML 等宿主都可以通过 DOM target 使用 1.0 API。

## 下一步

- 查看 [模型部署示例](/examples/models)
- 查看 [多实例集成](/guide/multi-instance)
- 查看 [资源路径配置](/config/resources)
- 查看 [Controller API](/api/controller)
