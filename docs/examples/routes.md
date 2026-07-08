# 航路编辑

航路通常存放在模型的 `line` 字段中，也可以通过 `routeMeta` 保存额外业务信息。

<div class="example-shell">
  <div class="example-shell__head">
    <strong>运行效果</strong>
    <span>蓝方飞机包含航路点，可用于回放和航迹展示。</span>
  </div>
  <ClientOnly>
    <LiveScenario variant="routes" />
  </ClientOnly>
</div>

## 模型航路数据

```js
await editor.updateModel("blue_air_001", {
  line: [
    { lon: 116.4, lat: 39.7, height: 8000, speed: 220 },
    { lon: 116.6, lat: 39.8, height: 8200, speed: 230 },
    { lon: 116.8, lat: 39.9, height: 8200, speed: 230 }
  ],
  routeMeta: {
    name: "巡航航路 A",
    speed: 230,
    altitude: 8200
  }
});
```

## 回放中的航迹

```js
await editor.setMode("playback");
editor.setPlaybackConfig({
  speed: 4,
  maxTrailPoints: 1200
});
editor.startPlayback();
```

## 参数说明

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `line` | `array` | 航路点数组。 |
| `routeMeta` | `object` | 航路元数据。 |
| `height` | `number` | 高度。 |
| `speed` | `number` | 速度。 |
