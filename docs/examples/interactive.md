# 真实交互示例

这个示例不是静态场景，而是用按钮直接调用公开 API，适合验证交互式能力是否接通。

<ClientOnly>
  <InteractiveScenario />
</ClientOnly>

## 覆盖的交互

| 操作 | 对应 API |
| --- | --- |
| 添加标绘 | `addAnnotation()` |
| 距离测量 | `startMeasureMode("distance")`、`onMeasure()` |
| 右键菜单 | `setContextMenuItems()` |
| 移动模型 | `updateModel()` |
| 撤销/重做 | `undo()`、`redo()` |

## 接入建议

正式业务中建议把这些 API 绑定到自己的工具栏、右键菜单和属性面板，而不是直接复用文档站按钮。
