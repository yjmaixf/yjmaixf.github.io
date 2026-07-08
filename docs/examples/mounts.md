# 载荷挂载

载荷挂载用于表达平台和载荷之间的组合关系，例如飞机挂载传感器、导弹或任务载荷。

<div class="example-shell">
  <div class="example-shell__head">
    <strong>运行效果</strong>
    <span>蓝方飞机预置了传感器和武器载荷，可在场景数据中查看 mounts。</span>
  </div>
  <ClientOnly>
    <LiveScenario variant="mounts" />
  </ClientOnly>
</div>

## 添加挂载

```js
await editor.addMount("blue_air_001", {
  UID: "sensor_payload_001",
  showName: "EO Sensor",
  NodeType: "sensor",
  modelType: "PAYLOAD",
  mountable: true
}, {
  force: true
});
```

## 移除挂载

```js
await editor.removeMount("blue_air_001", "sensor_payload_001");
```

## 配置兼容规则

```js
editor.setMountCompatibility({
  AIRCRAFT: ["PAYLOAD", "WEAPON"],
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
