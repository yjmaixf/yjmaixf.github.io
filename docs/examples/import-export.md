# 导入导出与截图

场景 JSON 导入导出和地图截图通常用于保存想定、复制场景、生成报告和问题复现。

<div class="example-shell">
  <div class="example-shell__head">
    <strong>运行效果</strong>
    <span>预置一个完整场景，便于对照导出的 JSON 内容。</span>
  </div>
  <ClientOnly>
    <LiveScenario variant="import-export" />
  </ClientOnly>
</div>

## 导出场景

```js
const sceneJson = editor.exportSceneJson(2);
```

## 导入场景

```js
await editor.loadScene(JSON.parse(sceneJson));
```

## 下载文件

```js
editor.downloadSceneJson("scenario.json");
editor.downloadReport("scenario-report.txt");
```

## 地图截图

```js
editor.exportMapScreenshot("scenario-map.png");
```
