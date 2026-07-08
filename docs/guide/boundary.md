# 设计边界

核心库不绑定具体业务规则。

宿主系统负责判断：

- 谁发现谁
- 谁锁定谁
- 谁攻击谁
- 谁毁伤或失联
- 哪些模型、关系、效果需要在某一帧显示

组件库负责：

- 地图初始化
- 模型显示与更新
- 航向、目标线和关系线显示
- 标绘、测量、截图、导入导出
- 态势特效渲染
- 回放和高频刷新优化

## 推荐发布入口

推荐作为正式发布入口使用：

- `ScenarioEditor`
- `createScenarioEditor()`
- `openlayers2dsceneeditor/style.css`

兼容层仍保留但不建议新项目依赖：

- `mapApp`
- `modelList`
- `selectedModel`
- `mapBridge` 的散装函数导出

## 接入建议

业务系统应该围绕 `ScenarioEditor` 组件或 `createScenarioEditor()` 返回的 editor 实例组织调用。

不要直接修改内部 `sceneStore` 状态。需要改变场景时，通过公开 API 更新模型、关系线、特效和显示配置。
