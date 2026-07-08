# 场景数据结构

场景数据通常由模型、关系线、特效、标绘和显示配置组成。

```js
const scene = {
  models: [],
  relations: [],
  effects: [],
  annotations: [],
  display: {},
  map: {}
};
```

## 字段

| 字段 | 说明 |
| --- | --- |
| `models` | 模型数组 |
| `relations` | 关系线数组 |
| `effects` | 态势特效数组 |
| `annotations` | 标绘数据 |
| `display` | 显示配置 |
| `map` | 地图初始化或视图状态 |
