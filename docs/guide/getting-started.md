# 快速开始

`openlayers2dsceneeditor` 是基于 Vue 3 和 OpenLayers 的二维想定编辑与态势显示组件库。

它面向两类场景：

- 想定编辑：部署模型、编辑航线、挂载载荷、批量框选、批量移动/旋转、标绘、测量、导入导出。
- 态势显示：接入外部实时数据，增量更新模型、关系线和态势特效，并支持高频数据刷新优化。

## 安装

```bash
npm i openlayers2dsceneeditor vue
```

引入样式：

```js
import "openlayers2dsceneeditor/style.css";
```

## 组件方式

```vue
<script setup>
import ScenarioEditor from "openlayers2dsceneeditor";
import "openlayers2dsceneeditor/style.css";

const resourceOptions = {
  tileUrlTemplate: "/Sate/{z}/{x}/{y}.png",
  modelIconResolver: model =>
    `/two/images/${model.nation}/${model.iconKey || model.NodeType}.png`,
  annotationPointIconUrl: "/two/images/white/car.png"
};

const mapOptions = {
  projection: "EPSG:3857",
  center: [116.394926, 39.9125],
  zoom: 5,
  minZoom: 0,
  maxZoom: 18,
  multiWorld: true
};
</script>

<template>
  <div style="width: 100vw; height: 100vh;">
    <ScenarioEditor
      :resource-options="resourceOptions"
      :map-options="mapOptions"
      :show-workbench="false"
    />
  </div>
</template>
```

## 控制器方式

```js
import { createScenarioEditor } from "openlayers2dsceneeditor";

const editor = createScenarioEditor();
await editor.ready();

await editor.setMode("edit");
await editor.addModel({
  UID: "red_radar_001",
  lon: 116.3,
  lat: 39.9,
  nation: "red",
  showName: "红方雷达"
});
```

## 下一步

- 查看 [模型部署示例](/examples/models)
- 查看 [多实例集成](/guide/multi-instance)
- 查看 [资源路径配置](/config/resources)
- 查看 [Controller API](/api/controller)
