# 标绘

标绘用于在地图上叠加点、线、面、文本、箭头、禁飞区和军事标绘等辅助信息。你可以直接写入标绘数据，也可以开启交互式绘制。

<div class="example-shell">
  <div class="example-shell__head">
    <strong>运行效果</strong>
    <span>展示点标记、线标绘、禁飞区面和文本标注。</span>
  </div>
  <ClientOnly>
    <LiveScenario variant="annotations" />
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
```

## 常用类型

| 类型 | 说明 |
| --- | --- |
| `point` | 点标记。 |
| `line` | 折线。 |
| `polygon` | 多边形区域。 |
| `text` | 文本标注。 |
| `arrow` | 箭头线。 |

## 事件监听

```js
const off = editor.onAnnotationCreated(annotation => {
  console.log(annotation);
});

off();
```
