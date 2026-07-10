# 效果结构

```js
const effect = {
  id: "radar_red_001",
  type: "radar",
  sourceUID: "red_001",
  targetUID: "blue_001",
  geometry: {
    shape: "sector",
    radius: 120000,
    angle: 100,
    direction: 45
  },
  style: {
    animation: "scan",
    color: "rgba(64, 200, 255, 0.18)",
    strokeColor: "rgba(64, 200, 255, 0.85)"
  },
  label: "雷达扫描"
};
```

## 几何类型

| shape | 说明 |
| --- | --- |
| `circle` | 圆形范围 |
| `sector` | 扇形范围 |
| `line` | 线形效果 |
| `box` | 锁定框 |

## 内置效果类型

| 分类 | 类型 |
| --- | --- |
| 范围类 | `radar`、`detect`、`warning`、`jammer`、`weapon` |
| 状态类 | `lock`、`damaged`、`lost`、`discovered`、`tracking` |
| 传感器类 | `sensorSearch`、`sensorOff`、`sensorSuppressed` |
| 链路/攻击过程类 | `linkQuality`、`missileFlight`、`intercept`、`miss`、`overlap` |

## 线类效果

```js
const linkEffect = {
  id: "link_red_001_blue_001",
  type: "linkQuality",
  sourceUID: "red_001",
  targetUID: "blue_001",
  geometry: {
    shape: "line",
    targetUID: "blue_001"
  },
  style: {
    quality: "weak",
    color: "#13c2c2",
    width: 3,
    headColor: "#5cdbd3"
  }
};
```

## 样式优先级

内置默认样式 < `display.effectStyles.default` < `display.effectStyles[type]` < 单个 `effect.style`。

## 可配置样式

| 字段 | 说明 |
| --- | --- |
| `color` | 范围填充色；线类特效中也可作为线色。 |
| `fillColor` | 范围填充色。 |
| `strokeColor` | 范围边框或线类颜色。 |
| `width` | 边框或线宽。 |
| `lineDash` | 虚线数组。 |
| `animation` | `scan`、`pulse`、`flow`、`none`。 |
| `labelColor` / `labelStrokeColor` | 标签文字颜色和描边。 |
| `headColor` | 线类动态头部颜色。 |
| `quality` / `qualityColors` | 链路质量和质量颜色映射。 |
