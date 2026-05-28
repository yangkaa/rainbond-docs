export type ToolResultLine = {
  label: string;
  value: string;
  tone?: 'ok' | 'warn' | 'error';
};

export type ToolResult = {
  summary?: string;
  lines: ToolResultLine[];
};

export type QuickActionItem = {
  label: string;
  primary?: boolean;
  icon?: string;
  /** 点击该按钮后切到哪条分支 timeline；缺省则按钮无效（占位） */
  branch?: BranchId;
};

export type TimelineEvent =
  | { id: string; at: number; kind: 'panel-enter' }
  | { id: string; at: number; kind: 'message'; role: 'user' | 'ai'; text: string; typeMs?: number }
  | { id: string; at: number; kind: 'thinking'; durationMs: number }
  | {
      id: string;
      at: number;
      kind: 'tool-call';
      tool: string;
      durationMs: number;
      result: ToolResult;
    }
  | {
      id: string;
      at: number;
      kind: 'quick-actions';
      items: QuickActionItem[];
    };

export type BranchId = 'scale-up' | 'view-monitor' | 'cancel';

// =====================================================================
// 主时间线：排查 OOMKilled
// =====================================================================

export const troubleshootTimeline: TimelineEvent[] = [
  { id: 'panel', at: 0, kind: 'panel-enter' },

  {
    id: 'ai-hello',
    at: 350,
    kind: 'message',
    role: 'ai',
    text: '你好 👋  当前你正在查看应用 314 的概览页面。有什么我可以帮你的吗？',
    typeMs: 1100,
  },

  {
    id: 'user-1',
    at: 2200,
    kind: 'message',
    role: 'user',
    text: 'api 组件最近频繁重启，帮我排查一下原因',
    typeMs: 900,
  },

  { id: 'thinking-1', at: 3400, kind: 'thinking', durationMs: 600 },

  {
    id: 'ai-1',
    at: 4100,
    kind: 'message',
    role: 'ai',
    text: '好的，先看一下 api 组件的当前状态。',
    typeMs: 900,
  },

  {
    id: 'tool-1',
    at: 5200,
    kind: 'tool-call',
    tool: 'rainbond_get_component_summary',
    durationMs: 1200,
    result: {
      summary: 'api 组件状态正常',
      lines: [
        { label: '状态', value: '运行中', tone: 'ok' },
        { label: '已运行', value: '5h 14m' },
        { label: '内存配额', value: '512 MB' },
        { label: '最近构建', value: '成功 (10 分钟前)', tone: 'ok' },
      ],
    },
  },

  {
    id: 'ai-2',
    at: 7000,
    kind: 'message',
    role: 'ai',
    text: '基本指标正常。继续看下最近 1 小时的运行日志，确认有没有异常退出。',
    typeMs: 1300,
  },

  {
    id: 'tool-2',
    at: 8700,
    kind: 'tool-call',
    tool: 'rainbond_get_component_logs',
    durationMs: 1300,
    result: {
      summary: '检测到 3 次 OOMKilled',
      lines: [
        { label: '时间窗口', value: '过去 60 分钟' },
        { label: '错误类型', value: 'OOMKilled', tone: 'error' },
        { label: '触发次数', value: '3 次', tone: 'warn' },
        { label: '建议', value: '内存配额不足，需扩容' },
      ],
    },
  },

  {
    id: 'ai-3',
    at: 10500,
    kind: 'message',
    role: 'ai',
    text: '原因找到了 —— 内存不够导致进程被 OOM 杀掉。建议把配额从 512 MB 提升到 1 GB，要不要我直接执行扩容？',
    typeMs: 1600,
  },

  {
    id: 'actions',
    at: 12400,
    kind: 'quick-actions',
    items: [
      { label: '执行扩容到 1 GB', primary: true, icon: '🚀', branch: 'scale-up' },
      { label: '查看监控', branch: 'view-monitor' },
      { label: '取消', branch: 'cancel' },
    ],
  },
];

// 主 timeline 总时长（最后一个事件 + 留白）
export const MAIN_TIMELINE_DURATION_MS = 17000;
// 主 timeline 跑完后停顿多久回到开头（无人点击时）
export const MAIN_LOOP_GAP_MS = 1200;

// 假鼠标在主 timeline 的第几毫秒出现并滑向主按钮
export const GHOST_CURSOR_AT_MS = 13800;
// 假鼠标到达后等多久还没人点 → 模拟自动点击
export const GHOST_AUTO_CLICK_AFTER_MS = 2400;

// =====================================================================
// 分支时间线
// =====================================================================

export const scaleUpBranch: TimelineEvent[] = [
  { id: 'sb-user', at: 0, kind: 'message', role: 'user', text: '执行扩容到 1 GB', typeMs: 500 },
  { id: 'sb-think', at: 700, kind: 'thinking', durationMs: 400 },
  {
    id: 'sb-tool',
    at: 1200,
    kind: 'tool-call',
    tool: 'rainbond_vertical_scale_component',
    durationMs: 1600,
    result: {
      summary: '扩容成功',
      lines: [
        { label: '内存', value: '512 MB → 1024 MB', tone: 'ok' },
        { label: '触发方式', value: '滚动重启' },
        { label: '完成耗时', value: '8.2 秒', tone: 'ok' },
      ],
    },
  },
  {
    id: 'sb-ai',
    at: 3100,
    kind: 'message',
    role: 'ai',
    text: '扩容完成 ✅  新配额已生效，会持续盯着 OOM 指标，如再次出现会主动告警。',
    typeMs: 1500,
  },
];

export const viewMonitorBranch: TimelineEvent[] = [
  { id: 'vm-user', at: 0, kind: 'message', role: 'user', text: '先看下监控', typeMs: 500 },
  { id: 'vm-think', at: 600, kind: 'thinking', durationMs: 400 },
  {
    id: 'vm-tool',
    at: 1100,
    kind: 'tool-call',
    tool: 'rainbond_query_app_monitor_range',
    durationMs: 1500,
    result: {
      summary: '过去 1h 内存指标',
      lines: [
        { label: '峰值占用', value: '98%', tone: 'error' },
        { label: '平均占用', value: '85%', tone: 'warn' },
        { label: '触顶次数', value: '3 次' },
      ],
    },
  },
  {
    id: 'vm-ai',
    at: 2900,
    kind: 'message',
    role: 'ai',
    text: '数据印证了 OOM 的原因 —— 内存长期顶在 85% 以上。仍建议立即扩容到 1 GB。',
    typeMs: 1600,
  },
];

export const cancelBranch: TimelineEvent[] = [
  { id: 'cb-user', at: 0, kind: 'message', role: 'user', text: '先不操作', typeMs: 500 },
  {
    id: 'cb-ai',
    at: 700,
    kind: 'message',
    role: 'ai',
    text: '好的。我会继续在后台监控 api 组件，如再次出现 OOMKilled 会主动提醒你。',
    typeMs: 1900,
  },
];

export const branchTimelines: Record<BranchId, TimelineEvent[]> = {
  'scale-up': scaleUpBranch,
  'view-monitor': viewMonitorBranch,
  cancel: cancelBranch,
};

export const branchDurationsMs: Record<BranchId, number> = {
  'scale-up': 5500,
  'view-monitor': 5400,
  cancel: 3500,
};

// 分支播完后停顿多久回到主 timeline
export const BRANCH_TAIL_GAP_MS = 1800;
