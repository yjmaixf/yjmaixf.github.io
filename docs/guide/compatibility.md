# 版本兼容

当前文档基于 npm 包 `openlayers2dsceneeditor@1.0.2` 整理。

## 1.0 运行时依赖

```json
{
  "peerDependencies": {
    "ol": "^10.7.0"
  }
}
```

`ol` 从 1.0.2 起作为 peer dependency 声明，业务项目建议显式安装。库本身不再声明 Vue runtime、Vue peer dependency 或 Vue 构建插件依赖。

## 推荐环境

- 现代浏览器
- Vite / Webpack / Rollup 等现代构建工具
- 任意 UI 层：原生 HTML、Vue、React、Svelte、Angular 等

## 破坏性变更

- 移除了默认导出的 `ScenarioEditor` Vue 组件。
- 移除了 Vue adapter、Vue provide/inject context helper 和 Vue native component plugin。
- 默认导出改为 `createScenarioEditor`。
- 应用需要通过 `editor.init({ target })` 绑定 DOM 容器。

## 旧版本用户

仍需要 Vue 组件 API 的项目请继续使用：

```bash
npm i openlayers2dsceneeditor@0.2.1
```

新项目建议使用：

```bash
npm i openlayers2dsceneeditor
```

## 注意事项

- 当前示例使用离线瓦片，素材层级是 `0-6`；示例视图允许继续放大，超过 6 级后复用最大层级瓦片。
- 如果部署到子路径，需要同步调整 VitePress `base`、资源路径和 `assetBaseUrl`。
- OpenLayers 和地图能力体积较大，生产构建出现 chunk size warning 属于正常现象，可通过代码分割优化。
