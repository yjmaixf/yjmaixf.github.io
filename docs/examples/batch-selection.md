# 批量框选

批量框选适合成组移动、旋转和布局模型。宿主可以把选中状态同步到业务面板，也可以调用批量 API 直接更新模型。

<div class="example-shell">
  <div class="example-shell__head">
    <strong>运行效果</strong>
    <span>预置多个红方模型并同步批量选中状态，适合说明批量操作入口。</span>
  </div>
  <ClientOnly>
    <InteractiveScenario mode="batch" />
  </ClientOnly>
</div>

## 推荐交互

```js
await editor.setMode("edit");
editor.setBatchSelection(["red_radar_001", "red_missile_001"]);
```

批量编辑通常包括：

- 框选地图上的多个模型
- 批量移动
- 批量旋转
- 批量阵形布局
- 同步选中状态到业务面板

## 数据更新方式

```js
await editor.batchUpdateModels([
  { uid: "red_001", patch: { lon: 116.31, lat: 39.91 } },
  { uid: "red_002", patch: { lon: 116.35, lat: 39.93 } }
]);
```

## 批量布局

```js
await editor.batchLayoutModels(["red_001", "red_002", "red_003"], {
  formation: "row",
  spacing: 0.08
});
```
