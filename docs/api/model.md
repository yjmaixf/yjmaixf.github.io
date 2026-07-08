# 模型结构

```js
const model = {
  UID: "red_radar_001",
  name: "雷达站",
  showName: "红方雷达 001",
  NodeType: "radar",
  modelType: "PLATFORM",
  nation: "red",
  lon: 116.35,
  lat: 39.92,
  height: 0,
  speed: 0,
  heading: 90,
  status: "normal",
  targetUID: "blue_ship_001",
  iconKey: "radar",
  line: [],
  routeMeta: {},
  mounts: []
};
```

## 字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `UID` | `string` | 模型唯一标识 |
| `name` | `string` | 内部名称 |
| `showName` | `string` | 显示名称 |
| `NodeType` | `string` | 节点类型 |
| `modelType` | `string` | 模型分类 |
| `nation` | `string` | 阵营 |
| `lon` / `lat` | `number` | 经纬度 |
| `height` | `number` | 高度 |
| `speed` | `number` | 速度 |
| `heading` | `number` | 航向 |
| `status` | `string` | 状态 |
| `targetUID` | `string` | 目标 UID |
| `line` | `array` | 航线点 |
| `mounts` | `array` | 挂载载荷 |
