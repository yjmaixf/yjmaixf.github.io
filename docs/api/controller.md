# Controller API

通过 `createScenarioEditor()` 获取 editor 实例。新接入优先使用 controller 方法，不建议直接依赖兼容层导出的 `mapBridge` 散装函数。

```js
import { createScenarioEditor } from "openlayers2dsceneeditor";

const editor = createScenarioEditor();
await editor.init({
  target: document.getElementById("map")
});
```

## 推荐入口

| 入口 | 说明 |
| --- | --- |
| `createScenarioEditor()` | 1.0 推荐入口，适合通过 DOM target 初始化单地图页面。 |
| `createScenarioEditor({ engine, context, mapApp })` | 创建绑定自定义地图引擎的 controller，适合多实例或测试。 |
| `createMapEngine()` / `createMapContext()` | 高级入口，用于自行组织底层地图上下文。 |

## 生命周期与底层访问

| 方法 | 说明 |
| --- | --- |
| `init(options)` | 初始化地图，`options.target` 为挂载容器。 |
| `ready()` | 等待地图可用。 |
| `sync()` | 将当前场景状态同步到地图。 |
| `destroy()` | 销毁地图实例和交互。 |
| `getContext()` | 获取地图上下文。 |
| `getEngine()` | 获取地图引擎。 |
| `getMapApp()` | 获取底层 `MapApp`。 |

## 场景与配置

| 方法 | 说明 |
| --- | --- |
| `getSceneState()` | 获取当前场景状态。 |
| `getSceneSnapshot()` | 获取可序列化场景快照。 |
| `loadScene(snapshot, options)` | 加载完整场景。 |
| `resetScene()` | 重置为空场景。 |
| `setMetadata(patch)` | 更新场景元数据。 |
| `setMode(mode)` | 切换 `edit` / `view` / `playback`。 |
| `setDisplayConfig(patch)` | 更新名称、目标线、航向线、关系线、特效样式和性能配置。 |
| `setPerformanceConfig(config)` | 设置性能等级或动画刷新参数。 |
| `getPerformanceConfig()` | 读取当前性能配置。 |
| `setResourceOptions(options)` | 更新瓦片、图标、资源根路径。 |
| `getResourceOptions()` | 读取资源配置。 |
| `setLocalTileRegions(regions)` | 设置局部离线瓦片区域。 |
| `addLocalTileRegion(region)` | 新增局部离线瓦片区域。 |
| `removeLocalTileRegion(id)` | 删除局部离线瓦片区域。 |
| `clearLocalTileRegions()` | 清空局部离线瓦片区域。 |
| `getLocalTileRegions()` | 读取局部离线瓦片区域。 |

## 模板、规则与校验

| 方法 | 说明 |
| --- | --- |
| `getTemplates()` | 获取当前模板列表。 |
| `setTemplates(templates)` | 设置模型和载荷模板。 |
| `configureSceneRuntime(config)` | 一次性设置模板、挂载兼容性、校验器、默认特效。 |
| `setMountCompatibility(compatibility)` | 设置宿主类型与载荷类型兼容关系。 |
| `setMountValidator(validator)` | 设置自定义挂载校验函数。 |
| `setSceneValidators(validators)` | 设置场景校验函数列表。 |
| `setDefaultEffectPresets(presets)` | 设置模板或模型类型的默认特效。 |
| `validateScene()` | 返回场景校验结果。 |
| `getHistoryState()` | 获取撤销/重做状态。 |
| `undo()` | 撤销一次场景修改。 |
| `redo()` | 重做一次场景修改。 |

## 模型

| 方法 | 说明 |
| --- | --- |
| `createModelFromTemplate(templateOrKey, overrides)` | 按模板创建模型对象，不加入场景。 |
| `deployModel(templateOrKey, overrides, options)` | 按模板创建并加入场景。 |
| `addModel(model, options)` | 新增模型。 |
| `updateModel(uid, patch, options)` | 更新单个模型。 |
| `batchUpdateModels(updates, options)` | 批量更新模型。 |
| `upsertModels(models, options)` | 新增或更新一个或多个模型。 |
| `updateModelPosition(uid, position, options)` | 只更新 `lon`、`lat`、`height`、`heading`、`speed`。 |
| `removeModel(uid, options)` | 删除单个模型。 |
| `removeModels(uids, options)` | 批量删除模型。 |
| `getModelsBySide(side)` | 按阵营读取模型。 |
| `canMountTemplateOnModel(templateOrKey, uidOrModel)` | 判断模板是否能挂载到指定模型。 |
| `setTemplateDragData(event, templateOrKey, extra)` | 向拖拽事件写入模板数据。 |

## 选择与批量操作

| 方法 | 说明 |
| --- | --- |
| `selectModel(uid)` | 设置当前选中模型。 |
| `setSelectedAnnotation(id)` | 设置当前选中标绘。 |
| `focusModel(uid)` | 将地图定位到指定模型。 |
| `setBatchSelection(uids)` | 设置批量选择 UID。 |
| `clearBatchSelection()` | 清空批量选择。 |
| `getBatchSelection()` | 读取批量选择 UID。 |
| `isBatchTransformActive()` | 判断交互式批量变换是否进行中。 |
| `batchMoveModels(uids, delta, options)` | 按经纬度增量批量移动。 |
| `batchSetModelHeading(uids, heading, options)` | 批量设置航向角。 |
| `batchLayoutModels(uids, layout, options)` | 按行、列、网格或圆形布局。 |
| `batchRotateModels(uids, angleDegrees, options)` | 围绕中心批量旋转。 |
| `startBoxSelectionMode(handler)` | 开启框选模式。 |
| `stopBoxSelectionMode()` | 关闭框选模式。 |
| `startBatchMoveMode(uids, callbacks)` | 开启交互式批量移动。 |
| `startBatchRotateMode(uids, callbacks)` | 开启交互式批量旋转。 |
| `stopBatchTransformMode()` | 停止交互式批量变换。 |

## 航路、挂载与工具

| 方法 | 说明 |
| --- | --- |
| `startRouteEdit(uid)` | 开启指定模型的交互式航路编辑。 |
| `setModelRoute(uid, points, routeMeta, options)` | 设置模型航路和航路元数据。 |
| `addMount(uid, mount, options)` | 给模型添加载荷。 |
| `removeMount(uid, mountUID, options)` | 从模型移除载荷。 |
| `addAnnotation(annotation, options)` | 新增标绘。 |
| `updateAnnotation(id, patch, options)` | 更新标绘。 |
| `removeAnnotation(id, options)` | 删除标绘。 |
| `startAnnotationMode(mode, options, handler)` | 开启交互式标绘。 |
| `startMeasureMode(mode, handler)` | 开启距离或面积测量。 |
| `endMeasure()` | 结束测量。 |
| `cancelTool()` | 取消当前地图工具。 |
| `setContextMenuItems(items, options)` | 设置右键菜单项。 |
| `setContextMenuHandler(handler)` | 设置右键菜单自定义处理函数。 |

## 态势、回放与导出

| 方法 | 说明 |
| --- | --- |
| `applySituationFrame(frame, options)` | 一次提交模型、关系、特效、删除项、显示配置和模式变化。 |
| `upsertRelations(relations, options)` | 新增或更新关系线。 |
| `removeRelations(ids, options)` | 删除关系线。 |
| `upsertEffects(effects, options)` | 新增或更新态势特效。 |
| `removeEffects(ids, options)` | 删除态势特效。 |
| `playEventEffect(target, options)` | 播放一次性事件特效。 |
| `setFrameMergerConfig(config)` | 配置高频态势帧合并器。 |
| `getFrameMergerConfig()` | 读取帧合并器配置。 |
| `flushFrameMerger()` | 立即刷新待合并的态势帧。 |
| `setPlaybackConfig(patch)` | 设置回放速度、进度、时长和尾迹配置。 |
| `startPlayback()` | 开始回放。 |
| `pausePlayback()` | 暂停回放。 |
| `stopPlayback()` | 停止回放。 |
| `seekPlayback(progress)` | 跳转回放进度，通常为 `0` 到 `1`。 |
| `exportSceneJson(space)` | 导出场景 JSON 字符串。 |
| `downloadSceneJson(filename)` | 下载场景 JSON。 |
| `downloadReport(filename)` | 下载校验与统计报告。 |
| `exportMapScreenshot(filename)` | 导出地图截图。 |

## 事件

事件监听方法返回取消监听函数。

| 方法 | 说明 |
| --- | --- |
| `onReady(handler)` | 监听地图 ready。 |
| `onSelectionChange(handler)` | 监听模型选择变化。 |
| `onRouteSaved(handler)` | 监听航路保存。 |
| `onMeasure(handler)` | 监听测量结果。 |
| `onAnnotationCreated(handler)` | 监听交互式标绘创建。 |
| `onTemplateDrop(handler)` | 监听模板拖拽投放。 |

## 通用 options

| 字段 | 默认 | 说明 |
| --- | --- | --- |
| `sync` | `true` | 是否同步到地图。批量导入时可设为 `false`，最后调用 `sync()`。 |
| `recordHistory` | `true` | 是否写入撤销历史。实时态势更新建议设为 `false`。 |
| `label` | 方法默认值 | 历史记录名称。 |
| `force` | `false` | 挂载时是否跳过兼容性校验。 |
| `merge` | `true` | `applySituationFrame()` 是否走帧合并器。 |
| `fullSync` | `false` | 态势帧是否强制全量同步。 |
| `bypassFrameMerger` | `false` | 显式绕过帧合并器。 |

## 示例

```js
await editor.setMode("view");

await editor.batchUpdateModels([
  { uid: "red_001", patch: { lon: 116.31, lat: 39.91 } }
], {
  recordHistory: false
});

await editor.upsertRelations(relations);
await editor.upsertEffects(effects);
```
