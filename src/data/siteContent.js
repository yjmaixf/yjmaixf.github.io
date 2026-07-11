export const navItems = [
  { label: "产品能力", href: "#features" },
  { label: "应用场景", href: "#scenes" },
  { label: "功能示例", href: "#examples" },
  { label: "架构边界", href: "#architecture" },
  { label: "资源示例", href: "#assets" },
  { label: "快速接入", href: "#start" }
];

export const stats = [
  { value: "JS API", label: "无框架接入" },
  { value: "OpenLayers", label: "二维 GIS 底座" },
  { value: "0-6", label: "内置离线瓦片层级" },
  { value: "17+", label: "态势特效类型" }
];

export const featureCards = [
  {
    title: "想定编辑",
    text: "部署模型、编辑航线、批量框选、批量移动/旋转、标绘、测量、导入导出，适合仿真推演和任务规划界面。",
    tags: ["模型部署", "航线编辑", "批量操作"]
  },
  {
    title: "态势显示",
    text: "接入外部实时数据，增量更新模型、关系线和态势特效，面向指挥显示、仿真回放和态势监控。",
    tags: ["实时刷新", "关系线", "特效叠加"]
  },
  {
    title: "离线地图",
    text: "支持在线/离线瓦片、局部瓦片区域、多投影初始化配置，方便在内网、专网或演示环境落地。",
    tags: ["XYZ 瓦片", "局部区域", "投影配置"]
  },
  {
    title: "业务解耦",
    text: "核心库不绑定业务规则。宿主系统判断发现、锁定、攻击和毁伤，组件库负责把业务结果表达成地图视觉。",
    tags: ["资源注入", "控制器 API", "视觉呈现"]
  }
];

export const sceneCards = [
  {
    title: "推演编辑器",
    text: "为红蓝对抗、任务规划、模型部署和航线编排提供二维编辑底座。",
    meta: "Edit Mode"
  },
  {
    title: "态势显示大屏",
    text: "从业务系统接收实时态势帧，显示目标、链路、探测、干扰、攻击和毁伤过程。",
    meta: "View Mode"
  },
  {
    title: "历史回放",
    text: "按时间轴回放模型轨迹、关系变化和关键态势特效，辅助复盘分析。",
    meta: "Playback Mode"
  }
];

export const effectGroups = [
  "雷达扫描",
  "干扰范围",
  "目标锁定",
  "导弹飞行",
  "链路质量",
  "毁伤失联",
  "拦截脱靶",
  "覆盖重叠"
];

export const assetRows = [
  {
    name: "Sate",
    value: "/Sate/{z}/{x}/{y}.png",
    desc: "0-6 级离线 XYZ 瓦片；视图可继续放大，超过 6 级时复用最大层级瓦片。"
  },
  {
    name: "GeoJSON",
    value: "/data/geojson/*.json",
    desc: "世界、中国和国家边界数据，适合做区域叠加示例。"
  },
  {
    name: "Unit Icons",
    value: "/two/images/red|blue|white/*.png",
    desc: "红蓝白阵营模型图标，覆盖车辆、舰船、导弹、飞机等目标。"
  }
];

export const architectureItems = [
  {
    title: "createScenarioEditor()",
    text: "1.0 推荐入口，宿主通过普通 DOM target 初始化并主动驱动地图场景。"
  },
  {
    title: "createMapEngine()",
    text: "高级入口，用于多实例、测试或自定义地图上下文。"
  },
  {
    title: "resourceOptions",
    text: "由宿主提供瓦片、模型图标、模板图标和标绘资源。"
  },
  {
    title: "mapApp / sceneStore",
    text: "内部承载模型、关系线、特效、显示配置和场景状态。"
  }
];

export const installCode = `npm i openlayers2dsceneeditor`;

export const usageCode = `import { createScenarioEditor } from "openlayers2dsceneeditor";
import "openlayers2dsceneeditor/style.css";

const resourceOptions = {
  tileUrlTemplate: "/Sate/{z}/{x}/{y}.png",
  modelIconResolver: model =>
    \`/two/images/\${model.nation}/\${model.iconKey}.png\`
};

const mapOptions = {
  center: [116.394926, 39.9125],
  zoom: 5,
  minZoom: 0,
  maxZoom: 18
};

const editor = createScenarioEditor();

editor.setResourceOptions(resourceOptions);

await editor.init({
  target: document.getElementById("map"),
  ...mapOptions
});`;
