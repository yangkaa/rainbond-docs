# AIChatDemo

RainAgent 首页对话流动画 —— **可看、可玩**。模拟用户与 AI 助手的完整对话（提问 → 思考 → 工具调用 → 结果 → 快捷操作），快捷按钮真正可点击；如果用户不操作，假鼠标会自动滑过去引导点击。整套流程循环播放。

参考思路来自 Railway 官网首页（Theatre.js 时间线编排 + Framer Motion 渲染），本组件用 **纯数据驱动 + Framer Motion** 复刻，不依赖任何第三方编辑器或美术资源（全部 SVG/CSS）。

## 在线预览

```bash
yarn start
# 访问 http://localhost:3000/ai-demo
```

## 文件结构

```
AIChatDemo/
├── index.tsx              入口容器 + 状态机 + 左侧 Rainbond 工作台 mock (SVG)
├── ChatPanel.tsx          右侧聊天面板 + 4 种事件渲染器
├── GhostCursor.tsx        假鼠标 + 点击波纹
├── timeline.ts            ★ 主时间线 + 3 条分支 + 时间常量（改对话只动这）
├── useTimeline.ts         RAF 调度（受控 onComplete 模式） + 视口/标签页检测
├── styles.module.css      全部样式
└── README.md              本文档
```

预览路由：`src/pages/ai-demo/index.tsx`

## 核心抽象

整个演示是一个 **状态机**：

```
[主时间线 main]
   ├─ 0s → ... → 12.4s 出 quick-actions 按钮
   ├─ 13.8s 假鼠标出现 → 滑到主按钮
   ├─ 14.5s 主按钮上出现点击波纹（视觉引导）
   ├─ 16.2s 仍无人点 → 自动模拟点击主按钮 ─┐
   └─ 17s   兜底超时（理论上不会到这里）─────┤
                                              ▼
                                    ┌─────────┴──────┐
   ┌─────────────────────  用户点击  ─────────┐
   │                                                  │
   ▼                                                  ▼
[分支 scale-up / view-monitor / cancel]   [分支 ...]
   │ 播完
   │ 等 1.8s
   ▼
[回到主时间线，从头播]  ←── ↻
```

实现要点：
- `useTimeline` 是**受控**的：跑完 totalDuration 后调用 `onComplete` 然后停住；不自动循环
- `index.tsx` 持有 `active: 'main' | BranchId` 状态，切换时调 `reset()` 重新从 0 跑
- 每次切换 `sessionCounter++`，作为 ChatPanel 的 React key，强制旧消息全部卸载、新消息从 `initial` 状态入场
- 假鼠标位置 = primary 按钮的 `getBoundingClientRect` 相对 `frame` 容器的差值，在 ghost 出现时算一次（按钮位置稳定时算，不需要每帧重算）

## 改对话内容

### 主时间线：编辑 `troubleshootTimeline`

```ts
{
  id: 'ai-followup',           // 唯一 key
  at: 8500,                    // 何时出现（绝对毫秒）
  kind: 'message',
  role: 'ai',
  text: '需要我把内存改为 1024 MB 吗？',
  typeMs: 1000,                // 打字机时长；省略则瞬间显示
}
```

加完别忘了顺手调 `MAIN_TIMELINE_DURATION_MS`（默认 17000）保证最后事件有播放时间。

### 加一条分支：编辑 `branchTimelines`

```ts
// 1) 在 BranchId 类型上加一个新值
export type BranchId = 'scale-up' | 'view-monitor' | 'cancel' | 'restart-pod';

// 2) 写分支 timeline
export const restartPodBranch: TimelineEvent[] = [
  { id: 'rp-user', at: 0, kind: 'message', role: 'user', text: '先重启一下试试', typeMs: 500 },
  { id: 'rp-tool', at: 700, kind: 'tool-call', tool: 'rainbond_operate_app', durationMs: 1500, result: { ... } },
  { id: 'rp-ai', at: 2400, kind: 'message', role: 'ai', text: '已重启完成 ✅', typeMs: 1000 },
];

// 3) 登记到映射 + 时长
export const branchTimelines = {
  ...,
  'restart-pod': restartPodBranch,
};
export const branchDurationsMs = {
  ...,
  'restart-pod': 3800,
};

// 4) 在主时间线的 quick-actions 里挂上去
items: [
  { label: '执行扩容', primary: true, branch: 'scale-up' },
  { label: '先重启试试', branch: 'restart-pod' },
  ...
]
```

### 调引导节奏

`timeline.ts` 顶部三个常量控制假鼠标行为：

| 常量                          | 默认值 | 作用                                |
|-------------------------------|--------|-------------------------------------|
| `GHOST_CURSOR_AT_MS`          | 13800  | 假鼠标在主 timeline 第几毫秒出现     |
| `GHOST_AUTO_CLICK_AFTER_MS`   | 2400   | 出现后多久没人点 → 自动模拟点击      |
| `BRANCH_TAIL_GAP_MS`          | 1800   | 分支播完后停顿多久回到主时间线        |

## 样式定制

主要颜色：

| 用途              | class                                   | 默认值                  |
|------------------|----------------------------------------|------------------------|
| 面板蓝紫渐变       | `chatHeader`                            | `#4f6bff → #6e3ad9`   |
| AI 名字色         | `msgAiName`                             | `#6e3ad9`              |
| 用户气泡          | `msgBubbleUser`                         | `#3b82f6`              |
| 主按钮（quick）    | `quickBtnPrimary`                       | 蓝紫渐变                |
| 假鼠标波纹圈       | `ghostRipple`                           | `rgba(110, 58, 217)`   |
| OK / Warn / Error | `toneOk` / `toneWarn` / `toneError`    | 绿 / 橙 / 红            |
| 组件运行卡片       | `bgStatusCard`                          | 浅绿渐变                |

字体跟随 Docusaurus 全局 `var(--font-family-base)`，不要硬编码。

## 集成到首页

`src/pages/ai-demo/index.tsx` 已经是独立预览页。挂到首页 Hero 旁边，把这段从 `ai-demo/index.tsx` 抠到 `components/HomePage/Hero/index.tsx`：

```tsx
import BrowserOnly from '@docusaurus/BrowserOnly';

<BrowserOnly fallback={<div style={{ minHeight: 540 }} />}>
  {() => {
    const AIChatDemo = require('@src/components/AIChatDemo').default;
    return <AIChatDemo />;
  }}
</BrowserOnly>
```

**必须用 `BrowserOnly`**：组件依赖 `requestAnimationFrame` / `IntersectionObserver` / `getBoundingClientRect`，SSR 阶段都没有。

## 性能与体验注意

- 时间线 hook 每帧 `setState(currentMs)`，约 60fps，约 17 秒一轮主时间线 + 3-6 秒一轮分支。当前有 5-15 个消息，CPU 占用无感。事件超过 30 时建议用 `React.memo` + 子组件订阅式打字机。
- **离开视口 / 切走标签页自动暂停**（`useInView` + `useDocumentVisible`），不会一直消耗 CPU。
- 移动端断点 880px / 600px：880px 隐藏中间画布，600px 上下堆叠。
- 假鼠标用 `pointer-events: none`，不会拦截用户真鼠标。
- 假鼠标目标位置基于按钮当前 DOM 位置，因此 `chatBody` 设了 `scroll-to-bottom`，确保按钮始终可见。

## 已知扩展方向

下面是设计过但本次没做的扩展点：

### 1. 联动左侧 Mock（"AI 操作工作台"）

让 AI 调用工具时左侧 api 节点开始橙色脉动；AI 切到日志 tab 时左侧也跟着切。让 demo 像"AI 真的在操控工作台"。

实现要点：
- 给 `TimelineEvent` 加新类型：`ui-highlight` / `ui-switch-tab` / `ui-stat-change`
- 用 `UiStateContext` 把当前 UI 状态广播下去
- 左侧 Mock 内部用 `useContext + AnimatePresence` 响应
- 写一个 `reduceUiEvents(events, currentMs)` 把累积事件压缩成当前状态

### 2. 多场景 Tab 切换（Railway 风格）

像 Railway 那样顶部几个 Tab：排查 / 部署 / 扩容 / 监控，切换播放不同场景。

实现要点：
- `timeline.ts` 拆成 `scenes/troubleshoot.ts` / `scenes/deploy.ts` / `scenes/scale.ts`
- `index.tsx` 顶部加 Tab UI，state 控制 `activeScene`
- 每个 scene 自带它的 `branchTimelines`

### 3. 用户真鼠标移动后自动隐藏假鼠标

现在假鼠标始终显示。要做"用户接手则让位"，加：

```tsx
const [userMoved, setUserMoved] = useState(false);
<div onMouseMove={() => setUserMoved(true)}>
  ...
  <GhostCursor visible={ghostVisible && !userMoved} ... />
</div>
```

没做的原因是首次加载时浏览器若残留鼠标位置，会立即触发误判。要做的话建议加 200ms 防抖。

### 4. 录制 GIF / 视频

`yarn start` 后用 [Screen Studio](https://screen.studio/)（推荐）或 CleanShot X 录窗口区域。
建议录 1.5 轮（约 35s），包含一次主流程 + 一次分支演示。

## 技术栈对照

| 能力              | 用了什么                                | 备注                         |
|------------------|----------------------------------------|------------------------------|
| 时间线推进         | `requestAnimationFrame` + `performance.now()` | 60fps                |
| 入场 / 退场       | `framer-motion` 11 的 `AnimatePresence` | 仓库已装                     |
| 视口触发          | `IntersectionObserver`                  | 离开视口自动暂停              |
| 打字机           | `text.slice(0, progress * length)` 算法 | 配 CSS 闪烁光标              |
| 工具卡片状态切换    | `AnimatePresence mode="wait"` + height auto | loading → 结果           |
| 快捷按钮交错入场    | `delay: index * 0.08`                  | framer-motion delay 属性     |
| 假鼠标            | `motion.div` + cubic-bezier ease       | `pointer-events: none`       |
| 点击波纹          | CSS `@keyframes` scale + opacity       | 1.6s 循环                   |
| 背景 mock        | 纯 SVG + CSS Module                    | 不用任何图片资源              |

## 调试技巧

- **盯帧排查**：在 `useTimeline.ts` 推进逻辑里加 `console.log({currentMs})`，控制台会刷出每帧时间
- **跳到某个时刻**：临时把 `useTimeline` 改成 `useState(8000)` 固定 8s，反复刷新检查那一帧
- **直接试某条分支**：把 `useState<ActiveId>('main')` 改成 `useState<ActiveId>('scale-up')`，刷新即从该分支开始
- **关掉自动点击**：把 `GHOST_AUTO_CLICK_AFTER_MS` 设成 99999，假鼠标会一直停在按钮上，用于手动调位置

## License

随主仓库 LICENSE。
