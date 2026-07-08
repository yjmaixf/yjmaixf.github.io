# 右键菜单

右键菜单用于把地图对象和业务动作连接起来，例如查看属性、聚焦模型、设置目标、删除模型等。

<div class="example-shell">
  <div class="example-shell__head">
    <strong>运行效果</strong>
    <span>在模型上右键可以打开自定义菜单，菜单项可按模型上下文显示。</span>
  </div>
  <ClientOnly>
    <LiveScenario variant="context-menu" />
  </ClientOnly>
</div>

## 注册菜单项

```js
editor.setContextMenuItems([
  {
    id: "focus",
    label: "聚焦模型",
    visible: ({ model }) => Boolean(model),
    action: ({ model }) => editor.focusModel(model.UID)
  },
  {
    id: "set-target",
    label: "设为目标",
    visible: ({ model }) => Boolean(model),
    action: async ({ model }) => {
      await editor.updateModel("red_missile_001", {
        targetUID: model.UID
      });
    }
  }
], { enabled: true });
```

## 监听菜单上下文

```js
editor.setContextMenuHandler(payload => {
  console.log(payload.coordinate, payload.model);
});
```

## 菜单项字段

| 字段 | 说明 |
| --- | --- |
| `id` | 菜单项唯一标识。 |
| `label` | 文案，支持函数。 |
| `visible` | 是否显示，支持按上下文判断。 |
| `action` | 点击后的业务动作。 |
| `danger` | 是否展示危险操作样式。 |
