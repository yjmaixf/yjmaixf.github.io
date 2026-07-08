# 态势特效

特效用于表达模型的探测、压制、状态、攻击过程等视觉信息。

<div class="example-shell">
  <div class="example-shell__head">
    <strong>运行效果</strong>
    <span>展示雷达扫描、目标锁定和导弹飞行等态势特效。</span>
  </div>
  <ClientOnly>
    <LiveScenario variant="effects" />
  </ClientOnly>
</div>

## 雷达扫描

```js
await editor.upsertEffects([
  {
    id: "radar_red_radar_001",
    type: "radar",
    sourceUID: "red_radar_001",
    geometry: {
      shape: "sector",
      radius: 120000,
      angle: 100,
      direction: 70
    },
    style: {
      animation: "scan",
      color: "rgba(64, 200, 255, 0.18)",
      strokeColor: "rgba(64, 200, 255, 0.85)"
    },
    label: "雷达扫描"
  }
]);
```

## 导弹飞行

```js
await editor.upsertEffects([
  {
    id: "missile_red_001_blue_001",
    type: "missileFlight",
    sourceUID: "red_missile_001",
    targetUID: "blue_ship_001",
    geometry: {
      shape: "line",
      targetUID: "blue_ship_001"
    },
    style: {
      strokeColor: "rgba(255, 185, 72, 0.95)",
      headColor: "rgba(255, 220, 120, 1)",
      width: 5
    }
  }
]);
```

## 支持类型

| 分类 | 类型 |
| --- | --- |
| 范围类 | `radar`、`detect`、`warning`、`jammer`、`weapon` |
| 状态类 | `lock`、`damaged`、`lost`、`discovered`、`tracking` |
| 传感器类 | `sensorSearch`、`sensorOff`、`sensorSuppressed` |
| 链路/攻击过程类 | `linkQuality`、`missileFlight`、`intercept`、`miss`、`overlap` |
