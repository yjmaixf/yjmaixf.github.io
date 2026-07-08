# 模型部署

模型是态势系统中的基础节点。红蓝双方、位置、航向、状态、目标指向和挂载信息都可以通过模型数据表达。

<div class="example-shell">
  <div class="example-shell__head">
    <strong>运行效果</strong>
    <span>加载红方雷达、红方导弹、蓝方舰船和蓝方飞机。</span>
  </div>
  <ClientOnly>
    <LiveScenario variant="models" />
  </ClientOnly>
</div>

## 新增模型

```js
await editor.addModel({
  UID: "blue_ship_001",
  showName: "蓝方舰船",
  NodeType: "ship",
  modelType: "PLATFORM",
  nation: "blue",
  lon: 116.78,
  lat: 40.06,
  heading: 250,
  targetUID: "red_radar_001",
  iconKey: "ship"
});
```

## 批量更新

```js
await editor.batchUpdateModels([
  {
    uid: "blue_ship_001",
    patch: {
      lon: 116.82,
      lat: 40.08,
      heading: 268
    }
  },
  {
    uid: "blue_air_001",
    patch: {
      lon: 116.72,
      lat: 39.76,
      heading: 318
    }
  }
]);
```

## 参数说明

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `UID` | `string` | 模型唯一标识 |
| `lon` / `lat` | `number` | 经纬度 |
| `heading` | `number` | 航向角，单位度 |
| `nation` | `red \| blue \| white` | 阵营 |
| `showName` | `string` | 地图显示名称 |
| `targetUID` | `string` | 目标模型 UID |
| `line` | `array` | 航线点数组 |
| `mounts` | `array` | 挂载载荷数组 |
