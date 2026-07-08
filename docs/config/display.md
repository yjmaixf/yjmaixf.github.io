# 显示配置

```js
await editor.setDisplayConfig({
  showPopup: true,
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
  },
  relationLineStyles: {
    attack: {
      redColor: "#ff5252",
      blueColor: "#4aa3ff",
      width: 3,
      lineType: "flowDash"
    }
  },
  effectVisible: {
    radar: true,
    jammer: true,
    missileFlight: true
  }
});
```

## 常用字段

| 字段 | 说明 |
| --- | --- |
| `showPopup` | 是否显示模型弹窗 |
| `showModelName` | 是否显示模型名称 |
| `showTargetLine` | 是否显示目标线 |
| `targetLineStyle` | 目标线样式 |
| `relationLineStyles` | 关系线样式 |
| `effectVisible` | 按特效类型控制显示隐藏 |
| `effectStyles` | 特效样式配置 |
| `headingVisible` | 按阵营控制航向线 |
