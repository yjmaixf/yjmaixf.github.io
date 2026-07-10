# 资源路径

推荐由宿主应用提供模型图标、模板图标、瓦片地址等资源。

```js
const resourceOptions = {
  tileUrlTemplate: "/Sate/{z}/{x}/{y}.png",
  assetBaseUrl: "/",
  modelIconResolver: model =>
    `/two/images/${model.nation}/${model.iconKey || model.NodeType}.png`,
  templateIconResolver: template =>
    `/two/images/white/${template.templateIcon || template.NodeType}.png`,
  annotationPointIconUrl: "/two/images/white/car.png"
};

editor.setResourceOptions(resourceOptions);
```

## 示例素材

| 资源 | 说明 |
| --- | --- |
| `/Sate/{z}/{x}/{y}.png` | 离线 XYZ 瓦片 |
| `/data/geojson/*.json` | 世界、中国、国家边界 GeoJSON |
| `/two/images/red/*.png` | 红方模型图标 |
| `/two/images/blue/*.png` | 蓝方模型图标 |
| `/two/images/white/*.png` | 白方模型图标 |
