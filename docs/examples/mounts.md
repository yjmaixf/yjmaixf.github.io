# 载荷挂载

载荷挂载用于表达平台和载荷之间的组合关系，例如飞机挂载传感器、导弹或任务载荷。

<div class="example-shell">
  <div class="example-shell__head">
    <strong>运行效果</strong>
    <span>给飞机添加或移除导弹挂载，并通过运行时规则校验挂载兼容性。</span>
  </div>
  <ClientOnly>
    <ControllerRecipesScenario recipe="mounts" />
  </ClientOnly>
</div>

## 添加挂载

```js
await editor.addMount("recipe_air_001", {
  UID: "recipe_missile_001",
  showName: "训练导弹",
  name: "训练导弹",
  NodeType: "missile",
  modelType: "MISSILE",
  iconKey: "missile",
  mountable: true
});
```

## 移除挂载

```js
await editor.removeMount("recipe_air_001", "recipe_missile_001");
```

## 配置兼容规则

```js
editor.setMountCompatibility({
  AIRCRAFT: ["MISSILE", "PAYLOAD", "WEAPON"],
  PLATFORM: ["PAYLOAD"]
});
```

## 自定义校验

```js
editor.setMountValidator((template, model, sceneState) => {
  if (model.status === "destroyed") return false;
  return true;
});
```
