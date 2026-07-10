# 关系线

关系线用于表达模型之间的业务关系，宿主系统根据业务自行创建。

<div class="example-shell">
  <div class="example-shell__head">
    <strong>运行效果</strong>
    <span>同时展示攻击、探测和通信三类关系线，不同线型对应不同语义。</span>
  </div>
  <ClientOnly>
    <LiveScenario variant="relations" />
  </ClientOnly>
</div>

## 攻击关系

```js
await editor.upsertRelations([
  {
    id: "attack_red_001_blue_001",
    type: "attack",
    sourceUID: "red_missile_001",
    targetUID: "blue_ship_001",
    label: "攻击",
    style: {
      color: "#ff7a45",
      width: 3,
      lineType: "flowDash",
      lineDash: "dash"
    }
  }
]);
```

## 全局样式

```js
await editor.setDisplayConfig({
  relationLineStyles: {
    default: {
      color: "#13c2c2",
      width: 2,
      lineType: "dash",
      lineDash: "dash"
    },
    attack: {
      color: "#ff7a45",
      width: 4,
      lineType: "flowDash"
    },
    detect: {
      color: "#1677ff",
      width: 2,
      lineType: "dash",
      lineDash: "dot"
    }
  }
});
```

样式优先级：`relationLineStyles.default` < `relationLineStyles[type]` < `targetLineStyle`（仅 `target`） < 单条 `relation.style`。

## 删除关系

```js
await editor.removeRelations(["attack_red_001_blue_001"]);
```

## 类型

| 类型 | 说明 |
| --- | --- |
| `target` | 目标指向。 |
| `attack` | 攻击关系。 |
| `detect` | 探测关系。 |
| `communication` | 通信关系。 |

## 样式字段

| 字段 | 说明 |
| --- | --- |
| `color` | 关系线颜色。 |
| `redColor` / `blueColor` | 按阵营设置目标线颜色。 |
| `sideColors` / `nationColors` | 按任意阵营值设置颜色。 |
| `width` | 线宽，范围会限制在 1 到 10。 |
| `lineType` | `solid`、`dash`、`flowDash`。 |
| `lineDash` | `dash`、`dot`、`dashDot`、`none` 或数字数组。 |
