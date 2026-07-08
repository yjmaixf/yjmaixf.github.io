# 自定义模板体系

模板体系用于把宿主业务里的装备类型、图标、挂载规则和校验规则接入编辑器。

<div class="example-shell">
  <div class="example-shell__head">
    <strong>运行效果</strong>
    <span>预置 fighter、drone、launcher 三类自定义模板模型。</span>
  </div>
  <ClientOnly>
    <LiveScenario variant="custom-templates" />
  </ClientOnly>
</div>

## 设置模板

```js
editor.setTemplates([
  {
    NodeType: "fighter",
    name: "战斗机",
    modelType: "AIRCRAFT",
    templateCategory: "platform",
    iconKey: "b2",
    mountable: true
  },
  {
    NodeType: "drone",
    name: "无人机",
    modelType: "UAV",
    templateCategory: "platform",
    iconKey: "default"
  },
  {
    NodeType: "missile",
    name: "导弹",
    modelType: "WEAPON",
    templateCategory: "payload",
    iconKey: "missile",
    mountable: true
  }
]);
```

## 图标解析

```js
await editor.setResourceOptions({
  modelIconResolver: model =>
    `/assets/units/${model.nation}/${model.iconKey || model.NodeType}.png`,
  templateIconResolver: template =>
    `/assets/templates/${template.iconKey || template.NodeType}.png`
});
```

## 挂载兼容

```js
editor.setMountCompatibility({
  AIRCRAFT: ["WEAPON", "PAYLOAD"],
  PLATFORM: ["PAYLOAD"]
});
```

## 部署自定义模型

```js
await editor.deployModel("fighter", {
  lon: 116.16,
  lat: 39.78,
  nation: "red",
  showName: "Custom Fighter"
});
```
