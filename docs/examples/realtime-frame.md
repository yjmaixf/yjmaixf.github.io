# 实时帧合并

实时态势推荐使用 `applySituationFrame()`。当 WebSocket 或其他数据源高频推送时，可以开启帧合并器，把短时间内多次更新合并成一次渲染。

<div class="example-shell">
  <div class="example-shell__head">
    <strong>运行效果</strong>
    <span>直接推送态势帧、启动模拟实时流、开启帧合并并手动刷新待合并帧。</span>
  </div>
  <ClientOnly>
    <ControllerRecipesScenario recipe="frame" />
  </ClientOnly>
</div>

## 开启帧合并

```js
editor.setFrameMergerConfig({
  enabled: true,
  interval: 100,
  maxDelay: 200
});
```

## 提交态势帧

```js
await editor.applySituationFrame({
  updates: [
    {
      uid: "blue_air_001",
      patch: {
        lon: 116.72,
        lat: 39.76,
        heading: 318
      }
    }
  ],
  relations: [
    {
      id: "detect_red_radar_blue_air",
      type: "detect",
      sourceUID: "red_radar_001",
      targetUID: "blue_air_001"
    }
  ],
  effects: [
    {
      id: "tracking_blue_air_001",
      type: "tracking",
      sourceUID: "blue_air_001",
      geometry: { shape: "circle", radius: 24000 }
    }
  ]
});
```

## 立即刷新

```js
await editor.flushFrameMerger();
```

## 建议

- 实时增量用 `applySituationFrame()`，初始化或切换想定用 `loadScene()`。
- 高频更新时提交 `updates`，避免每帧传完整场景。
- 样式和显示配置变化较少时单独调用 `setDisplayConfig()`。
