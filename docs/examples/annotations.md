# 标绘

标绘用于在地图上叠加点、线、面、圆、文本、箭头、禁飞区和军事标绘等辅助信息。你可以直接写入标绘数据，也可以开启交互式绘制。

<div class="example-shell">
  <div class="example-shell__head">
    <strong>运行效果</strong>
    <span>展示点、线、面、圆、文本、箭头和军事区域，也可以开启交互式绘制并手动退出标绘模式。</span>
  </div>
  <ClientOnly>
    <InteractiveScenario mode="annotations" />
  </ClientOnly>
</div>

<div class="example-shell">
  <div class="example-shell__head">
    <strong>细分效果</strong>
    <span>同时展示基础标绘、禁飞区、军事区域和箭头标绘。</span>
  </div>
  <ClientOnly>
    <LiveScenario variant="annotations-advanced" />
  </ClientOnly>
</div>

## 直接新增标绘

```js
await editor.addAnnotation({
  id: "anno-nofly",
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

## 交互式绘制

```js
editor.startAnnotationMode("point", {}, annotation => {
  console.log("created", annotation);
});

editor.startAnnotationMode("polygon", {
  category: "noFlyZone",
  name: "禁飞区"
});

editor.startAnnotationMode("circle", {
  name: "警戒圆",
  category: "military",
  drawShape: "circle",
  style: {
    strokeColor: "#ff5c5c",
    fillColor: "rgba(255,92,92,0.18)",
    strokeWidth: 3,
    lineDash: "dash",
    labelColor: "#ffffff",
    labelBackgroundColor: "rgba(9,18,30,0.72)"
  }
});

editor.cancelTool();
```

## 常用类型

| 类型 | 说明 |
| --- | --- |
| `point` | 点标记。 |
| `line` | 折线。 |
| `polygon` | 多边形区域。 |
| `circle` | 圆形区域，交互绘制时会保存为 `polygon` 几何并保留 `shape: "circle"`。 |
| `text` | 文本标注。 |
| `arrow` | 箭头线。 |

## 细分示例

```js
const createCircleCoordinates = ([lon, lat], radius, steps = 72) =>
  Array.from({ length: steps + 1 }, (_, index) => {
    const angle = (Math.PI * 2 * index) / steps;
    return [
      lon + Math.cos(angle) * radius,
      lat + Math.sin(angle) * radius
    ];
  });

await editor.addAnnotation({
  name: "Attack Arrow",
  type: "arrow",
  category: "military",
  text: "Attack",
  style: {
    strokeColor: "#ff4d4f",
    strokeWidth: 4,
    lineDash: "dash",
    labelColor: "#ffffff"
  },
  geometry: {
    type: "line",
    coordinates: [
      [116.16, 39.78],
      [116.36, 39.88],
      [116.62, 39.98]
    ]
  }
});

await editor.addAnnotation({
  name: "Operation Area",
  type: "polygon",
  category: "military",
  text: "Area A",
  style: {
    strokeColor: "#1677ff",
    fillColor: "rgba(22,119,255,0.18)",
    strokeWidth: 3,
    labelBackgroundColor: "rgba(0,0,0,0.5)"
  },
  geometry: {
    type: "polygon",
    coordinates: [
      [116.08, 39.98],
      [116.28, 40.08],
      [116.46, 40.02],
      [116.38, 39.88],
      [116.08, 39.98]
    ]
  }
});

await editor.addAnnotation({
  name: "Warning Circle",
  type: "circle",
  shape: "circle",
  category: "military",
  text: "Warning",
  style: {
    strokeColor: "#faad14",
    fillColor: "rgba(250,173,20,0.2)",
    strokeWidth: 3,
    lineDash: "dot"
  },
  geometry: {
    type: "polygon",
    coordinates: createCircleCoordinates([116.34, 39.94], 0.08)
  }
});
```

## 样式配置

标绘的 `style` 可用于直接新增和交互式绘制。常用字段如下：

| 字段 | 说明 |
| --- | --- |
| `strokeColor` / `color` | 线、面边框、点标记主色。 |
| `fillColor` | 面和圆的填充色。 |
| `strokeWidth` / `width` | 线宽。 |
| `lineDash` | 虚线样式，支持 `none`、`dash`、`dot`、`dashDot`，也可以传数字数组。 |
| `pointRadius` / `radius` | 点标记半径。 |
| `pointFillColor` / `markerColor` | 点标记填充色。 |
| `pointStrokeColor` / `pointStrokeWidth` | 点标记边框颜色和宽度。 |
| `iconScale` / `iconOpacity` | 使用点图标时的缩放和透明度。 |
| `labelColor` | 文本颜色。 |
| `labelBackgroundColor` | 文本背景色。 |
| `labelStrokeColor` / `labelStrokeWidth` | 文本描边颜色和宽度。 |
| `labelOffsetY` | 文本垂直偏移。 |

## 事件监听

```js
const off = editor.onAnnotationCreated(annotation => {
  console.log(annotation);
});

off();
```
