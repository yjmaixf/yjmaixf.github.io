# Controller API

通过 `createScenarioEditor()` 获取 editor 实例。

```js
import { createScenarioEditor } from "openlayers2dsceneeditor";

const editor = createScenarioEditor();
await editor.ready();
```

## 常用方法

| 方法 | 说明 |
| --- | --- |
| `ready()` | 等待编辑器初始化完成 |
| `setMode(mode)` | 切换 `edit` / `view` / `playback` |
| `setDisplayConfig(config)` | 更新显示配置 |
| `setResourceOptions(options)` | 更新资源配置 |
| `deployModel(type, payload)` | 按模板部署模型 |
| `addModel(model)` | 新增模型 |
| `updateModel(uid, patch)` | 更新单个模型 |
| `batchUpdateModels(items)` | 批量更新模型 |
| `removeModel(uid)` | 删除单个模型 |
| `removeModels(uids)` | 批量删除模型 |
| `upsertRelations(relations)` | 新增或更新关系线 |
| `removeRelations(ids)` | 删除关系线 |
| `upsertEffects(effects)` | 新增或更新态势特效 |
| `applySituationFrame(frame)` | 应用态势帧 |

## 示例

```js
await editor.setMode("view");
await editor.batchUpdateModels([
  { uid: "red_001", patch: { lon: 116.31, lat: 39.91 } }
]);
await editor.upsertRelations(relations);
await editor.upsertEffects(effects);
```
