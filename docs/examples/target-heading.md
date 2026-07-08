# 目标连线与航向显示

目标线由模型的 `targetUID` 驱动，航向线由模型的 `heading` 和 `headingVisible` 显示配置控制。

<div class="example-shell">
  <div class="example-shell__head">
    <strong>运行效果</strong>
    <span>红方雷达和导弹指向蓝方舰船，并展示红蓝双方航向线。</span>
  </div>
  <ClientOnly>
    <LiveScenario variant="target-heading" />
  </ClientOnly>
</div>

## 设置目标

```js
await editor.updateModel("red_missile_001", {
  heading: 42,
  targetUID: "blue_ship_001"
});
```

## 显示配置

```js
await editor.setDisplayConfig({
  showModelName: true,
  showTargetLine: true,
  headingVisible: {
    red: true,
    blue: true
  },
  targetLineStyle: {
    redColor: "#ff5252",
    blueColor: "#40d8ff",
    width: 3,
    lineType: "flowDash"
  }
});
```

## 线型说明

| 值 | 说明 |
| --- | --- |
| `flowDash` | 流动虚线，适合强调目标指向。 |
| `dash` | 静态虚线，适合普通关联。 |
| `solid` | 实线，适合稳定连接。 |

## 参数说明

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `targetUID` | `string` | 当前模型指向的目标模型 UID。 |
| `heading` | `number` | 航向角，单位为度。 |
| `showTargetLine` | `boolean` | 是否显示目标线。 |
| `headingVisible` | `object` | 按阵营控制航向线。 |
| `targetLineStyle` | `object` | 目标线颜色、宽度和线型。 |
