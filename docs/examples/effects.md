# 态势特效

特效用于表达探测、压制、预警、武器射程、目标状态、传感器状态、链路质量和攻击过程。宿主系统负责业务判断，组件库负责把 `effects` 渲染成地图态势。

<div class="example-shell">
  <div class="example-shell__head">
    <strong>交互式运行效果</strong>
    <span>按业务场景切换雷达、预警、干扰、链路、攻击过程、目标状态和传感器状态，也可以推送实时位置帧验证效果跟随。</span>
  </div>
  <ClientOnly>
    <EffectScenario />
  </ClientOnly>
</div>

## 范围类效果

范围类通常绑定 `sourceUID`，使用 `circle` 或 `sector` 几何表达雷达、探测、预警、干扰和射程。

```js
await editor.upsertEffects([
  {
    id: "radar_red_radar_001",
    type: "radar",
    sourceUID: "red_radar_001",
    geometry: {
      shape: "sector",
      radius: 120000,
      angle: 100,
      direction: 70
    },
    style: {
      animation: "scan",
      fillColor: "rgba(64,200,255,0.16)",
      strokeColor: "#40c8ff",
      width: 3
    },
    label: "雷达扫描"
  },
  {
    id: "warning_blue_radar_001",
    type: "warning",
    sourceUID: "blue_radar_001",
    geometry: { shape: "circle", radius: 76000 },
    style: {
      animation: "pulse",
      fillColor: "rgba(255,77,79,0.16)",
      strokeColor: "#ff4d4f"
    },
    label: "预警范围"
  },
  {
    id: "jammer_red_jammer_001",
    type: "jammer",
    sourceUID: "red_jammer_001",
    geometry: { shape: "circle", radius: 82000 },
    style: {
      fillColor: "rgba(178,93,255,0.16)",
      strokeColor: "#b25dff"
    },
    label: "干扰范围"
  },
  {
    id: "weapon_red_missile_001",
    type: "weapon",
    sourceUID: "red_missile_001",
    geometry: { shape: "circle", radius: 70000 },
    label: "武器射程"
  }
]);
```

## 状态类效果

状态类用于把业务状态叠加到模型上，例如锁定、毁伤、失联、发现和跟踪。

```js
await editor.upsertEffects([
  {
    id: "lock_blue_ship_001",
    type: "lock",
    sourceUID: "blue_ship_001",
    geometry: { shape: "box", size: 64 },
    label: "锁定"
  },
  {
    id: "damaged_blue_ship_001",
    type: "damaged",
    sourceUID: "blue_ship_001",
    geometry: { shape: "circle", radius: 26000 },
    label: "毁伤"
  },
  {
    id: "lost_blue_air_001",
    type: "lost",
    sourceUID: "blue_air_001",
    geometry: { shape: "circle", radius: 22000 },
    label: "失联"
  },
  {
    id: "tracking_blue_drone_001",
    type: "tracking",
    sourceUID: "blue_drone_001",
    geometry: { shape: "circle", radius: 30000 },
    label: "目标跟踪"
  }
]);
```

## 传感器状态

传感器状态可以用在搜索、关机、被压制等场景。

```js
await editor.upsertEffects([
  {
    id: "sensor_search_white_sensor_001",
    type: "sensorSearch",
    sourceUID: "white_sensor_001",
    geometry: {
      shape: "sector",
      radius: 76000,
      angle: 100,
      direction: 180
    },
    style: { animation: "scan" },
    label: "传感器搜索"
  },
  {
    id: "sensor_off_red_jammer_001",
    type: "sensorOff",
    sourceUID: "red_jammer_001",
    geometry: { shape: "circle", radius: 26000 },
    label: "传感器关机"
  },
  {
    id: "sensor_suppressed_blue_radar_001",
    type: "sensorSuppressed",
    sourceUID: "blue_radar_001",
    geometry: { shape: "circle", radius: 32000 },
    label: "传感器压制"
  }
]);
```

## 链路与攻击过程

线类效果需要 `sourceUID` 和 `targetUID`，`geometry.targetUID` 用于确定终点。链路质量可通过 `quality` 表达 `good`、`weak`、`broken`。

```js
await editor.upsertEffects([
  {
    id: "link_red_radar_blue_ship",
    type: "linkQuality",
    sourceUID: "red_radar_001",
    targetUID: "blue_ship_001",
    geometry: { shape: "line", targetUID: "blue_ship_001" },
    style: {
      quality: "weak",
      color: "#13c2c2",
      width: 3
    },
    label: "弱链路"
  },
  {
    id: "missile_red_missile_blue_ship",
    type: "missileFlight",
    sourceUID: "red_missile_001",
    targetUID: "blue_ship_001",
    geometry: { shape: "line", targetUID: "blue_ship_001" },
    style: {
      color: "#faad14",
      width: 5,
      headColor: "#ffd666"
    },
    label: "导弹飞行"
  },
  {
    id: "intercept_red_missile_blue_air",
    type: "intercept",
    sourceUID: "red_missile_001",
    targetUID: "blue_air_001",
    geometry: { shape: "line", targetUID: "blue_air_001" },
    label: "拦截"
  },
  {
    id: "miss_blue_radar_red_jammer",
    type: "miss",
    sourceUID: "blue_radar_001",
    targetUID: "red_jammer_001",
    geometry: { shape: "line", targetUID: "red_jammer_001" },
    label: "脱靶"
  }
]);
```

## 覆盖重叠

`overlap` 适合表达多个探测区、火力区或禁控区的重叠区域。它可以绑定 `sourceUID`，也可以在 `geometry` 中直接给中心点。

```js
await editor.upsertEffects([
  {
    id: "overlap_effect_area",
    type: "overlap",
    sourceUID: "white_sensor_001",
    geometry: {
      shape: "circle",
      radius: 36000,
      lon: 116.62,
      lat: 40.02
    },
    label: "覆盖重叠"
  }
]);
```

## 支持类型

| 分类 | 类型 |
| --- | --- |
| 范围类 | `radar`、`detect`、`warning`、`jammer`、`weapon` |
| 状态类 | `lock`、`damaged`、`lost`、`discovered`、`tracking` |
| 传感器类 | `sensorSearch`、`sensorOff`、`sensorSuppressed` |
| 链路/攻击过程类 | `linkQuality`、`missileFlight`、`intercept`、`miss`、`overlap` |

## 样式建议

| 字段 | 说明 |
| --- | --- |
| `animation` | `scan`、`pulse`、`flow`、`none` |
| `color` | 范围填充色；线类特效中也可作为线色 |
| `fillColor` | 范围填充色，优先级高于 `color` |
| `strokeColor` | 范围或线条颜色 |
| `width` | 线宽或边框宽度 |
| `lineDash` | 虚线数组，范围类和部分线类效果可用 |
| `headColor` | 线类动态头部颜色，例如导弹头或链路流动点 |
| `quality` | 链路质量，支持 `good`、`weak`、`broken` |
| `qualityColors` | 自定义链路质量颜色 |

## 全局样式

```js
await editor.setDisplayConfig({
  effectStyles: {
    default: {
      fillColor: "rgba(64,200,255,0.14)",
      strokeColor: "#40c8ff",
      width: 2
    },
    radar: {
      animation: "scan",
      strokeColor: "#1677ff"
    },
    linkQuality: {
      color: "#13c2c2",
      qualityColors: {
        good: "#52c41a",
        weak: "#faad14",
        broken: "#ff4d4f"
      }
    },
    missileFlight: {
      color: "#faad14",
      headColor: "#ffd666",
      width: 5
    }
  }
});
```

样式优先级：内置默认样式 < `display.effectStyles.default` < `display.effectStyles[type]` < 单个 `effect.style`。
