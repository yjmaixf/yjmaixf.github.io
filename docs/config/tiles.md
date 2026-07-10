# 地图瓦片

<div class="example-shell">
  <div class="example-shell__head">
    <strong>运行效果</strong>
    <span>运行时添加或清空局部离线瓦片区域。</span>
  </div>
  <ClientOnly>
    <ControllerRecipesScenario recipe="tiles" />
  </ClientOnly>
</div>

## XYZ 瓦片

```js
const resourceOptions = {
  tileUrlTemplate: "/Sate/{z}/{x}/{y}.png"
};
```

本站提供的 `public/Sate` 目录包含 `0-6` 层级瓦片。地图视图可以继续放大，底层瓦片源会在超过 6 级后复用最大层级瓦片：

```js
const mapOptions = {
  minZoom: 0,
  maxZoom: 18
};
```

## 局部瓦片区域

```js
const mapOptions = {
  localTileRegions: [
    {
      id: "harbor-a",
      urlTemplate: "/tiles/harbor-a/{z}/{x}/{y}.png",
      extent: [120.10, 30.20, 120.30, 30.36],
      minZoom: 10,
      maxZoom: 18
    }
  ]
};
```
