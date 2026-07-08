# 测量工具

测量工具适合临时计算距离和面积。测量结果通过 `onMeasure` 回调返回，宿主可以写入面板、弹窗或业务日志。

<div class="example-shell">
  <div class="example-shell__head">
    <strong>运行效果</strong>
    <span>预览场景包含线和面标绘，便于说明距离和面积测量的使用场景。</span>
  </div>
  <ClientOnly>
    <LiveScenario variant="measure" />
  </ClientOnly>
</div>

## 距离测量

```js
const offMeasure = editor.onMeasure(result => {
  console.log(result.label, result.value, result.unit);
});

editor.startMeasureMode("distance");
```

## 面积测量

```js
editor.startMeasureMode("area", result => {
  console.log("area", result);
});
```

## 结束测量

```js
editor.endMeasure();
offMeasure();
```

## 结果结构

| 字段 | 说明 |
| --- | --- |
| `label` | 格式化后的测量文本。 |
| `value` | 数值。 |
| `unit` | 单位。 |
| `type` | `distance` 或 `area`。 |
