# 大规模性能示例

本页展示 200+ 模型的静态态势，用于观察模型图标、名称、缩放和地图交互在较大规模下的表现。

<div class="example-shell">
  <div class="example-shell__head">
    <strong>运行效果</strong>
    <span>预置 240 个模型，使用 view 模式和性能配置。</span>
  </div>
  <ClientOnly>
    <LiveScenario variant="performance-large" height="620" />
  </ClientOnly>
</div>

## 推荐配置

```js
await editor.setMode("view");
await editor.setDisplayConfig({
  showPopup: false,
  showModelName: false,
  showTargetLine: false,
  headingVisible: {
    red: false,
    blue: false
  },
  performance: {
    level: "performance"
  }
});
```

## 高频数据建议

```js
editor.setFrameMergerConfig({
  enabled: true,
  interval: 100,
  maxDelay: 200
});

editor.applySituationFrame({
  updates: latestUpdates
});
```

## 调优优先级

- 大量模型时先关闭模型名称、弹窗和航向线。
- 高频刷新使用 `updates`，不要每帧 `loadScene()`。
- 关系线和特效按需显示，避免所有图层同时动画。
