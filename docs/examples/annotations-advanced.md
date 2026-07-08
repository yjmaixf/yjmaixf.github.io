# 更细的标绘示例

本页把标绘拆得更细，用于展示点、线、面、文本、箭头、禁飞区和军事区域的组合效果。

<div class="example-shell">
  <div class="example-shell__head">
    <strong>运行效果</strong>
    <span>同时展示基础标绘、禁飞区、军事区域和箭头标绘。</span>
  </div>
  <ClientOnly>
    <LiveScenario variant="annotations-advanced" />
  </ClientOnly>
</div>

## 点标绘

```js
await editor.addAnnotation({
  name: "Rally Point",
  type: "point",
  category: "basic",
  geometry: { type: "point", coordinates: [116.18, 39.86] }
});
```

## 文本标绘

```js
await editor.addAnnotation({
  name: "Command Note",
  type: "text",
  text: "Hold Line",
  geometry: { type: "point", coordinates: [116.42, 40.05] }
});
```

## 箭头标绘

```js
await editor.addAnnotation({
  name: "Attack Arrow",
  type: "arrow",
  category: "military",
  text: "Attack",
  geometry: {
    type: "line",
    coordinates: [
      [116.16, 39.78],
      [116.36, 39.88],
      [116.62, 39.98]
    ]
  }
});
```

## 禁飞区

```js
await editor.addAnnotation({
  name: "No Fly Zone",
  type: "polygon",
  category: "noFlyZone",
  geometry: {
    type: "polygon",
    coordinates: [
      [116.52, 39.78],
      [116.72, 39.82],
      [116.74, 39.98],
      [116.50, 40.02],
      [116.52, 39.78]
    ]
  }
});
```

## 交互绘制入口

```js
editor.startAnnotationMode("polygon", {
  category: "military",
  name: "Operation Area"
});
```
