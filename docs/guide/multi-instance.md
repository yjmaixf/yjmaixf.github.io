# 多实例集成

当页面需要左右对比、预案对照或多个地图容器时，可以用 `createMapEngine()` 为每个容器创建独立地图引擎，再把引擎传给 `createScenarioEditor()`。

<div class="example-shell">
  <div class="example-shell__head">
    <strong>运行效果</strong>
    <span>左侧和右侧是两个独立 controller。可以把左侧场景同步到右侧，也可以只移动右侧模型。</span>
  </div>
  <ClientOnly>
    <ControllerRecipesScenario recipe="multi" />
  </ClientOnly>
</div>

## 接入方式

```js
import { createMapEngine, createScenarioEditor } from "openlayers2dsceneeditor";

const leftEngine = createMapEngine();
const rightEngine = createMapEngine();

const leftEditor = createScenarioEditor({
  engine: leftEngine,
  context: leftEngine.getContext(),
  mapApp: leftEngine.getMapApp()
});

const rightEditor = createScenarioEditor({
  engine: rightEngine,
  context: rightEngine.getContext(),
  mapApp: rightEngine.getMapApp()
});

leftEditor.init({ target: document.getElementById("left-map") });
rightEditor.init({ target: document.getElementById("right-map") });
```

## 场景同步

```js
const snapshot = leftEditor.getSceneSnapshot();

await rightEditor.loadScene(snapshot, {
  recordHistory: false
});

await rightEditor.setMode("view");
```

两个 editor 的状态互不共享。同步之后继续在右侧调用 `updateModelPosition()`、`setDisplayConfig()` 或 `applySituationFrame()`，不会影响左侧。
