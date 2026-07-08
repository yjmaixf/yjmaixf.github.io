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

## 样式优先级

内置默认样式 < `display.effectStyles.default` < `display.effectStyles[type]` < 单个 `effect.style`。
