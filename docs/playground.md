# Playground

这个页面嵌入真实 `ScenarioEditor`，并加载离线瓦片和模型图标资源。

<ClientOnly>
  <LiveScenario variant="overview" height="640" />
</ClientOnly>

## 当前场景包含

- 红方雷达
- 红方导弹
- 蓝方舰船
- 蓝方飞机
- 攻击关系线
- 探测关系线
- 雷达扫描特效
- 导弹飞行特效

## 对应资源配置

```js
const resourceOptions = {
  tileUrlTemplate: "/Sate/{z}/{x}/{y}.png",
  modelIconResolver: model =>
    `/two/images/${model.nation}/${model.iconKey || model.NodeType}.png`
};
```
