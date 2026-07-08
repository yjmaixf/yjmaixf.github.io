# 性能配置

性能配置用于控制动画刷新频率和动画步长，适合高频态势数据刷新。

```js
await editor.setDisplayConfig({
  performance: {
    level: "balanced"
  }
});
```

## 建议

- 编辑态：优先响应交互。
- 态势显示：优先稳定刷新。
- 高频数据：业务层先做帧合并，再调用 `applySituationFrame()` 或批量更新 API。
- 大量特效：按需关闭不可见类型，减少动画负载。
