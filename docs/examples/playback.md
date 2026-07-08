# 回放

回放模式适合按时间轴播放历史航迹和态势帧。

<div class="example-shell">
  <div class="example-shell__head">
    <strong>运行效果</strong>
    <span>打开页面后自动进入回放模式，展示航迹尾迹和模型运动。</span>
  </div>
  <ClientOnly>
    <LiveScenario variant="playback" auto-play />
  </ClientOnly>
</div>

## 切换模式

```js
await editor.setMode("playback");
```

## 设置回放参数

```js
editor.setPlaybackConfig({
  speed: 4,
  duration: 120,
  maxTrailPoints: 1200
});
```

## 播放控制

```js
editor.startPlayback();
editor.pausePlayback();
await editor.stopPlayback();
await editor.seekPlayback(0.5);
```

## 高频刷新建议

- 实时态势优先使用 `applySituationFrame()`。
- 高频更新时开启帧合并器，避免每帧完整重绘。
- 回放模式下把航路、速度和时间轴状态都放入场景快照，便于复现。
