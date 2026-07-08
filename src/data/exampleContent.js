export const exampleGroups = [
  {
    id: "resources",
    title: "资源配置",
    summary: "通过 resourceOptions 把瓦片、模型图标、模板图标和标绘资源交给组件库。",
    badge: "Resource",
    code: `const resourceOptions = {
  tileUrlTemplate: "/Sate/{z}/{x}/{y}.png",
  assetBaseUrl: "/",
  modelIconResolver: model => {
    const nation = model.nation || "white";
    const icon = model.iconKey || model.NodeType || "car";
    return \`/two/images/\${nation}/\${icon}.png\`;
  },
  templateIconResolver: template =>
    \`/two/images/white/\${template.NodeType || "car"}.png\`,
  annotationPointIconUrl: "/two/images/white/car.png"
};`,
    api: [
      ["tileUrlTemplate", "string", "XYZ 瓦片地址模板"],
      ["assetBaseUrl", "string", "静态资源根路径"],
      ["modelIconResolver", "function", "返回模型图标地址"],
      ["templateIconResolver", "function", "返回模板图标地址"],
      ["annotationPointIconUrl", "string", "点标绘默认图标"]
    ]
  },
  {
    id: "map",
    title: "地图初始化",
    summary: "配置投影、中心点、缩放层级、多世界和局部离线瓦片区域。",
    badge: "Map",
    code: `const mapOptions = {
  projection: "EPSG:3857",
  center: [116.394926, 39.9125],
  zoom: 5,
  minZoom: 0,
  maxZoom: 18,
  multiWorld: true,
  smoothExtentConstraint: true,
  localTileRegions: [
    {
      id: "harbor-a",
      urlTemplate: "/tiles/harbor-a/{z}/{x}/{y}.png",
      extent: [120.10, 30.20, 120.30, 30.36],
      minZoom: 10,
      maxZoom: 18
    }
  ]
};`,
    api: [
      ["projection", "string", "地图投影，常用 EPSG:3857"],
      ["center", "number[]", "初始中心点，经纬度数组"],
      ["zoom / minZoom / maxZoom", "number", "缩放级别配置"],
      ["extent", "number[]", "地图限制范围"],
      ["localTileRegions", "array", "局部离线瓦片区域"]
    ]
  },
  {
    id: "models",
    title: "模型部署",
    summary: "模型是态势系统的基础节点，支持红蓝阵营、位置、航向、状态、目标指向和批量更新。",
    badge: "Models",
    code: `await editor.addModel({
  UID: "blue_ship_001",
  showName: "蓝方舰船",
  NodeType: "ship",
  modelType: "PLATFORM",
  nation: "blue",
  lon: 116.78,
  lat: 40.06,
  heading: 250,
  targetUID: "red_radar_001",
  iconKey: "ship"
});

await editor.batchUpdateModels([
  {
    uid: "blue_ship_001",
    patch: { lon: 116.82, lat: 40.08, heading: 268 }
  }
]);`,
    api: [
      ["UID", "string", "模型唯一标识"],
      ["lon / lat", "number", "模型经纬度"],
      ["heading", "number", "航向角，单位度"],
      ["nation", "red | blue | white", "阵营"],
      ["targetUID", "string", "目标模型 UID"]
    ]
  },
  {
    id: "relations",
    title: "关系线",
    summary: "用于表达目标、攻击、探测、通信等模型间业务关系，关系判断由宿主系统完成。",
    badge: "Relations",
    code: `await editor.upsertRelations([
  {
    id: "attack_red_001_blue_001",
    type: "attack",
    sourceUID: "red_missile_001",
    targetUID: "blue_ship_001",
    label: "攻击",
    style: {
      width: 3,
      lineType: "flowDash"
    }
  }
]);

await editor.removeRelations(["attack_red_001_blue_001"]);`,
    api: [
      ["target", "type", "目标指向"],
      ["attack", "type", "攻击关系"],
      ["detect", "type", "探测关系"],
      ["communication", "type", "通信关系"],
      ["lineType", "style", "solid / dash / flowDash"]
    ]
  },
  {
    id: "effects",
    title: "态势特效",
    summary: "用 effect 表达雷达、干扰、锁定、导弹飞行、毁伤、失联、链路质量等视觉效果。",
    badge: "Effects",
    code: `await editor.upsertEffects([
  {
    id: "radar_red_radar_001",
    type: "radar",
    sourceUID: "red_radar_001",
    geometry: {
      shape: "sector",
      radius: 125000,
      angle: 105,
      direction: 70
    },
    style: {
      animation: "scan",
      color: "rgba(60, 160, 255, 0.18)",
      strokeColor: "rgba(60, 160, 255, 0.9)"
    },
    label: "雷达扫描"
  }
]);`,
    api: [
      ["radar / detect / warning", "范围类", "探测、预警、雷达范围"],
      ["jammer / weapon", "范围类", "干扰范围、射程范围"],
      ["lock / damaged / lost", "状态类", "锁定、毁伤、失联"],
      ["missileFlight / intercept / miss", "过程类", "导弹飞行、拦截、脱靶"],
      ["circle / sector / line / box", "geometry.shape", "支持的几何形态"]
    ]
  },
  {
    id: "display",
    title: "显示配置",
    summary: "集中控制名称、弹窗、目标线、关系线样式、特效可见性和性能等级。",
    badge: "Display",
    code: `await editor.setDisplayConfig({
  showPopup: true,
  showModelName: true,
  showTargetLine: true,
  headingVisible: {
    red: true,
    blue: true
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
  },
  performance: {
    level: "balanced"
  }
});`,
    api: [
      ["showPopup", "boolean", "是否显示模型弹窗"],
      ["showModelName", "boolean", "是否显示模型名称"],
      ["showTargetLine", "boolean", "是否显示 targetUID 指向线"],
      ["relationLineStyles", "object", "关系线全局样式"],
      ["effectVisible", "object", "按特效类型控制显示隐藏"]
    ]
  },
  {
    id: "modes",
    title: "工作模式",
    summary: "edit 用于编辑，view 用于只读态势显示，playback 用于历史回放。",
    badge: "Mode",
    code: `await editor.setMode("edit");
await editor.setMode("view");
await editor.setMode("playback");`,
    api: [
      ["edit", "mode", "允许部署、拖拽、航线编辑和批量操作"],
      ["view", "mode", "禁用编辑交互，适合实时态势展示"],
      ["playback", "mode", "适合按时间轴播放历史航迹"]
    ]
  },
  {
    id: "playback",
    title: "态势帧回放",
    summary: "实时态势和历史回放都可以按帧组织，批量更新模型、关系和特效。",
    badge: "Playback",
    code: `await editor.setMode("playback");

await editor.applySituationFrame({
  timestamp: Date.now(),
  models: [
    {
      uid: "blue_air_001",
      patch: { lon: 116.72, lat: 39.76, heading: 318 }
    }
  ],
  relations,
  effects
});`,
    api: [
      ["timestamp", "number", "态势帧时间"],
      ["models", "array", "模型增量更新"],
      ["relations", "array", "关系线快照或增量"],
      ["effects", "array", "态势特效快照或增量"],
      ["frame merger", "performance", "高频数据刷新优化"]
    ]
  }
];
