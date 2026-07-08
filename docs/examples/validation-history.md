# 校验与历史

场景校验用于发现重复名称、越界坐标等问题；撤销重做用于编辑态工作流。

<div class="example-shell">
  <div class="example-shell__head">
    <strong>运行效果</strong>
    <span>预览场景包含重复名称和越界坐标，调用 validateScene 可返回问题列表。</span>
  </div>
  <ClientOnly>
    <LiveScenario variant="validation-history" />
  </ClientOnly>
</div>

## 校验场景

```js
const issues = editor.validateScene();

issues.forEach(issue => {
  console.log(issue.level, issue.code, issue.message);
});
```

## 撤销与重做

```js
await editor.updateModel("red_missile_001", {
  lon: 116.44,
  lat: 39.88
});

await editor.undo();
await editor.redo();
```

## 导出问题报告

```js
editor.downloadReport("scenario-report.txt");
```

## 常见问题类型

| code | 说明 |
| --- | --- |
| `DUPLICATE_NAME` | 模型或挂载名称重复。 |
| `INVALID_COORDINATE` | 经纬度越界。 |
