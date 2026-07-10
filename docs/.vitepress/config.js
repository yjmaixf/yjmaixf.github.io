import { defineConfig } from "vitepress";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  title: "openlayers2dsceneeditor",
  description: "Vue 3 and OpenLayers 2D scenario editor documentation",
  lang: "zh-CN",
  cleanUrls: true,
  srcDir: ".",
  themeConfig: {
    logo: "/two/images/blue/default.png",
    siteTitle: "openlayers2dsceneeditor",
    nav: [
      { text: "指南", link: "/guide/getting-started" },
      { text: "示例", link: "/examples/models" },
      { text: "API", link: "/api/controller" },
      { text: "配置", link: "/config/resources" },
      { text: "Playground", link: "/playground" },
      { text: "覆盖检查", link: "/coverage" },
      { text: "npm", link: "https://www.npmjs.com/package/openlayers2dsceneeditor" }
    ],
    sidebar: [
      {
        text: "指南",
        items: [
          { text: "快速开始", link: "/guide/getting-started" },
          { text: "设计边界", link: "/guide/boundary" },
          { text: "版本兼容", link: "/guide/compatibility" },
          { text: "多实例集成", link: "/guide/multi-instance" }
        ]
      },
      {
        text: "功能示例",
        items: [
          { text: "模型部署", link: "/examples/models" },
          { text: "目标连线与航向", link: "/examples/target-heading" },
          { text: "批量框选", link: "/examples/batch-selection" },
          { text: "航路编辑", link: "/examples/routes" },
          { text: "态势特效", link: "/examples/effects" },
          { text: "关系线", link: "/examples/relations" },
          { text: "导入导出与截图", link: "/examples/import-export" },
          { text: "回放", link: "/examples/playback" },
          { text: "标绘", link: "/examples/annotations" },
          { text: "测量工具", link: "/examples/measure" },
          { text: "右键菜单", link: "/examples/context-menu" },
          { text: "载荷挂载", link: "/examples/mounts" },
          { text: "实时帧合并", link: "/examples/realtime-frame" },
          { text: "校验与历史", link: "/examples/validation-history" }
        ]
      },
      {
        text: "专题示例",
        items: [
          { text: "大规模性能示例", link: "/examples/performance-large" },
          { text: "自定义模板体系", link: "/examples/custom-templates" }
        ]
      },
      {
        text: "API",
        items: [
          { text: "Controller API", link: "/api/controller" },
          { text: "API 类型定义", link: "/api/types" },
          { text: "场景数据结构", link: "/api/scene" },
          { text: "模型结构", link: "/api/model" },
          { text: "效果结构", link: "/api/effect" }
        ]
      },
      {
        text: "配置",
        items: [
          { text: "资源路径", link: "/config/resources" },
          { text: "地图瓦片", link: "/config/tiles" },
          { text: "显示配置", link: "/config/display" },
          { text: "性能配置", link: "/config/performance" }
        ]
      },
      {
        text: "更多",
        items: [
          { text: "Playground", link: "/playground" },
          { text: "功能覆盖检查", link: "/coverage" },
          { text: "更新日志", link: "/changelog" }
        ]
      }
    ],
    socialLinks: [
      { icon: "github", link: "https://www.npmjs.com/package/openlayers2dsceneeditor" }
    ],
    search: {
      provider: "local"
    },
    outline: {
      level: [2, 3],
      label: "本页目录"
    },
    docFooter: {
      prev: "上一页",
      next: "下一页"
    },
    footer: {
      message: "Released under the ISC License.",
      copyright: "Copyright openlayers2dsceneeditor"
    }
  },
  vite: {
    publicDir: resolve(__dirname, "../../public")
  }
});
