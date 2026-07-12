# 更新日志

## 1.0.2

- 增加 `index.d.ts` 类型声明入口。
- 将 OpenLayers 声明为 peer dependency，业务项目建议显式安装 `ol`。

## 1.0.0

- 发布 1.0 正式版：`latest` 标签指向无 Vue 运行时依赖的 JavaScript API 版本。
- 官网安装示例改为 `npm i openlayers2dsceneeditor`。
- 保持 `createScenarioEditor()`、`createMapEngine()`、DOM target 初始化和 controller API 作为推荐接入方式。
- 旧 Vue 组件用户请继续使用 `openlayers2dsceneeditor@0.2.1`。

## 1.0.0-beta.0

- 发布 1.0 beta：库运行时移除 Vue 依赖。
- 移除 `ScenarioEditor` Vue 组件导出，默认导出改为 `createScenarioEditor`。
- 官网示例改为 `editor.init({ target })` 的 DOM 初始化方式。
- 保留 `createMapEngine()`、`createMapContext()` 和 controller API，用于多实例、测试和业务集成。
- 旧 Vue 组件用户请继续使用 `openlayers2dsceneeditor@0.2.1`。

## 0.2.1

- 明确推荐发布入口：`ScenarioEditor`、`createScenarioEditor()`、`style.css`。
- README 补充架构边界、资源配置、地图初始化、模型 API、关系线、态势特效和显示配置。
- 支持 Vue 3 + OpenLayers 的二维想定编辑与态势显示。

## 文档站

- 使用 VitePress 构建 npm 库官网。
- 增加首页、指南、功能示例、API、配置、Playground 和更新日志。
- Playground 使用真实地图实例和 `public` 静态资源。
