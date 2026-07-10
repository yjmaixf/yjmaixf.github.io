# 版本兼容

当前文档基于 npm 包 `openlayers2dsceneeditor@0.2.1` 整理。

## Peer Dependencies

```json
{
  "vue": "^3.3.4"
}
```

## 推荐环境

- Vue 3
- Vite / VitePress / VuePress
- 现代浏览器

## 注意事项

- 当前示例使用 `public/Sate` 离线瓦片，素材层级是 `0-6`；示例视图允许继续放大，超过 6 级后复用最大层级瓦片。
- 如果部署到子路径，需要同步调整 VitePress `base`、资源路径和 `assetBaseUrl`。
- OpenLayers 和地图组件体积较大，生产构建出现 chunk size warning 属于正常现象，可以通过代码分割优化。
