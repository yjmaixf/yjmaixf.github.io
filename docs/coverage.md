# 功能覆盖检查

本页按 `README.md` 的能力清单检查官网覆盖情况，用于后续维护文档和示例。

## 已覆盖

| 能力 | 官网入口 | 状态 |
| --- | --- | --- |
| 安装与快速开始 | `/guide/getting-started` | 已覆盖 |
| 设计边界与推荐入口 | `/guide/boundary` | 已覆盖 |
| 版本兼容说明 | `/guide/compatibility` | 已覆盖 |
| 模型新增、更新、删除 | `/examples/models`、`/api/model` | 已覆盖，含预览 |
| 目标连线与航向显示 | `/examples/target-heading`、`/config/display` | 已覆盖，含预览 |
| 批量选择、批量移动、批量旋转、阵形布局 | `/examples/batch-selection` | 已覆盖，含预览 |
| 航路与回放 | `/examples/routes`、`/examples/playback` | 已覆盖，含预览 |
| 关系线 | `/examples/relations` | 已覆盖，含预览 |
| 态势特效 | `/examples/effects`、`/api/effect` | 已覆盖，含预览 |
| 场景 JSON 导入导出、报告、截图 | `/examples/import-export` | 已覆盖，含预览 |
| 标绘能力 | `/examples/annotations`、`/examples/annotations-advanced` | 已覆盖，含细分预览 |
| 测量工具 | `/examples/measure`、`/examples/interactive` | 已覆盖，含真实交互 |
| 右键菜单 | `/examples/context-menu`、`/examples/interactive` | 已覆盖，含真实交互 |
| 载荷挂载 | `/examples/mounts` | 已覆盖，含预览 |
| 实时态势帧合并 | `/examples/realtime-frame`、`/config/performance` | 已覆盖，含预览 |
| 校验与历史 | `/examples/validation-history`、`/examples/interactive` | 已覆盖，含真实交互 |
| 大规模性能 | `/examples/performance-large` | 已覆盖，含 240 模型预览 |
| 自定义模板体系 | `/examples/custom-templates` | 已覆盖 |
| API 类型定义 | `/api/types` | 已覆盖 |
| 资源路径、图标、瓦片 | `/config/resources`、`/config/tiles` | 已覆盖 |
| 显示配置和性能配置 | `/config/display`、`/config/performance` | 已覆盖 |
| Controller API | `/api/controller` | 已覆盖 |
| 场景、模型、特效结构 | `/api/scene`、`/api/model`、`/api/effect` | 已覆盖 |
| 可运行总览 | `/playground`、首页预览 | 已覆盖 |

## 后续可继续增强

| 方向 | 建议 |
| --- | --- |
| API 类型自动生成 | 从源码或正式 `.d.ts` 生成 `/api/types`，避免手写类型漂移。 |
| 更真实的交互录屏 | 为框选、测量、右键菜单补短视频或 GIF。 |
| 多数据源实时示例 | 增加 WebSocket mock，展示高频帧合并前后的差异。 |
| 主题化案例 | 按行业主题提供一套完整模板、图标、特效和校验规则。 |
| 自动化截图验证 | 对每个 `LiveScenario variant` 做 Playwright 截图，避免预览空白。 |

## 预览实现说明

当前文档站通过 `LiveScenario` 和 `InteractiveScenario` 复用同一套离线瓦片和模型图标资源：

```md
<ClientOnly>
  <LiveScenario variant="effects" />
</ClientOnly>

<ClientOnly>
  <InteractiveScenario />
</ClientOnly>
```

`variant` 决定加载哪组示例场景。新增示例页时，优先在 `docs/.vitepress/theme/components/LiveScenario.vue` 中补一个 variant，再在 Markdown 中嵌入预览。
