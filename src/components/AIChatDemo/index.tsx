import React, { useCallback, useEffect, useRef, useState } from 'react';
import ChatPanel from './ChatPanel';
import GhostCursor from './GhostCursor';
import {
  troubleshootTimeline,
  branchTimelines,
  branchDurationsMs,
  MAIN_TIMELINE_DURATION_MS,
  MAIN_LOOP_GAP_MS,
  GHOST_CURSOR_AT_MS,
  GHOST_AUTO_CLICK_AFTER_MS,
  BRANCH_TAIL_GAP_MS,
  type BranchId,
} from './timeline';
import { useTimeline, useInView, useDocumentVisible } from './useTimeline';
import styles from './styles.module.css';

type ActiveId = 'main' | BranchId;

export default function AIChatDemo() {
  const [active, setActive] = useState<ActiveId>('main');
  const [sessionCounter, setSessionCounter] = useState(0);
  const [primaryBtnEl, setPrimaryBtnEl] = useState<HTMLButtonElement | null>(null);
  const [ghostTarget, setGhostTarget] = useState<{ x: number; y: number } | null>(null);

  const frameRef = useRef<HTMLDivElement | null>(null);
  const [containerRef, inView] = useInView<HTMLDivElement>(0.2);
  const docVisible = useDocumentVisible();
  const paused = !(inView && docVisible);

  const isMain = active === 'main';
  const activeEvents = isMain ? troubleshootTimeline : branchTimelines[active];
  const activeDuration = isMain ? MAIN_TIMELINE_DURATION_MS : branchDurationsMs[active];

  // 切 timeline 的统一入口；同步触发 reset 保证 RAF 重启
  const resetRef = useRef<() => void>(() => {});
  const goTo = useCallback((id: ActiveId) => {
    setActive(id);
    setSessionCounter((c) => c + 1);
    setPrimaryBtnEl(null);
    setGhostTarget(null);
    resetRef.current();
  }, []);

  // onComplete 兜底：主 timeline 没被切走就回主重播；分支播完则回主
  const completeRef = useRef<() => void>(() => {});
  completeRef.current = () => {
    const gap = isMain ? MAIN_LOOP_GAP_MS : BRANCH_TAIL_GAP_MS;
    setTimeout(() => goTo('main'), gap);
  };

  const { currentMs, reset } = useTimeline({
    totalDurationMs: activeDuration,
    paused,
    onComplete: () => completeRef.current(),
  });
  resetRef.current = reset;

  const ghostVisible = isMain && currentMs >= GHOST_CURSOR_AT_MS;

  // 算主按钮在 frame 内的位置 (光标指尖落在按钮左 18% / 上 55%)
  useEffect(() => {
    if (!ghostVisible || !primaryBtnEl || !frameRef.current) return;
    const btnRect = primaryBtnEl.getBoundingClientRect();
    const frameRect = frameRef.current.getBoundingClientRect();
    setGhostTarget({
      x: btnRect.left - frameRect.left + btnRect.width * 0.18,
      y: btnRect.top - frameRect.top + btnRect.height * 0.55,
    });
  }, [ghostVisible, primaryBtnEl]);

  // 自动点击：ghost 出现后等 GHOST_AUTO_CLICK_AFTER_MS 没人点 → 自动走主按钮分支
  const autoClickedRef = useRef(false);
  useEffect(() => {
    if (isMain) return;
    autoClickedRef.current = false;
  }, [active, isMain]);

  useEffect(() => {
    if (!isMain || autoClickedRef.current) return;
    const autoAt = GHOST_CURSOR_AT_MS + GHOST_AUTO_CLICK_AFTER_MS;
    if (currentMs < autoAt) return;
    const actionEvt = troubleshootTimeline.find((e) => e.kind === 'quick-actions');
    if (actionEvt && actionEvt.kind === 'quick-actions') {
      const primaryBranch = actionEvt.items.find((i) => i.primary)?.branch;
      if (primaryBranch) {
        autoClickedRef.current = true;
        goTo(primaryBranch);
      }
    }
  }, [isMain, currentMs, goTo]);

  const handleBranchClick = useCallback((branch: BranchId) => goTo(branch), [goTo]);
  const showClickPulse = ghostVisible && currentMs >= GHOST_CURSOR_AT_MS + 700;

  return (
    <div ref={containerRef} className={styles.shell}>
      <div ref={frameRef} className={styles.frame}>
        <BackgroundMock />
        <ChatPanel
          events={activeEvents}
          currentMs={currentMs}
          sessionId={sessionCounter}
          onBranchClick={handleBranchClick}
          primaryButtonRef={isMain ? setPrimaryBtnEl : undefined}
        />
        <GhostCursor target={ghostTarget} visible={ghostVisible} showClickPulse={showClickPulse} />
      </div>
      <div className={styles.controls}>
        <button type="button" className={styles.controlBtn} onClick={() => goTo('main')}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          重新播放
        </button>
        <span className={styles.controlsHint}>
          滚动离开或切换标签页会自动暂停 · 点击按钮可走分支剧情
        </span>
      </div>
    </div>
  );
}

function BackgroundMock() {
  return (
    <div className={styles.bgMock}>
      <div className={styles.bgTopbar}>
        <div className={styles.bgLogo} />
        <span className={styles.bgNavSlash}>/</span>
        <span className={styles.bgNavItem}>平台插件</span>
        <span className={styles.bgNavSlash}>/</span>
        <span className={styles.bgNavItem}>
          AI 助手
          <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
        <div className={styles.bgTopbarTabs}>
          <span className={`${styles.bgTab} ${styles.bgTabActive}`}>
            <span className={styles.bgTabDot} /> 工作空间
          </span>
          <span className={styles.bgTab}>应用市场</span>
          <span className={styles.bgTab}>平台管理</span>
        </div>
        <div className={styles.bgUserAvatar} />
      </div>

      <div className={styles.bgWorkspace}>
        <div className={styles.bgSidebar}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`${styles.bgSideIcon} ${i === 0 ? styles.bgSideIconActive : ''}`}
            />
          ))}
        </div>

        <div className={styles.bgCanvas}>
          <CanvasTopology />
        </div>

        <div className={styles.bgDetail}>
          <div className={styles.bgDetailHeader}>
            <div className={styles.bgDetailTitle}>
              <span className={styles.bgDetailIcon} />
              <strong>api</strong>
              <span className={styles.bgDetailTag}>amd64</span>
            </div>
            <div className={styles.bgDetailActions}>
              <span className={styles.bgDetailPrimaryBtn}>访问</span>
              <span className={styles.bgDetailBtn}>构建</span>
              <span className={styles.bgDetailBtn}>更多 ▾</span>
            </div>
          </div>
          <div className={styles.bgDetailSubtitle}>
            组件的各类参数配置，以及组件的启动、停止、重启、删除等操作
          </div>
          <div className={styles.bgTabsRow}>
            {['总览', '日志', '伸缩', '监控', '环境配置', '依赖', '高级设置', 'GPU管理'].map((t, i) => (
              <span
                key={t}
                className={`${styles.bgInnerTab} ${i === 0 ? styles.bgInnerTabActive : ''}`}
              >
                {t}
              </span>
            ))}
          </div>
          <div className={styles.bgStatusCard}>
            <div className={styles.bgStatusTitle}>运行中</div>
            <div className={styles.bgStatusGrid}>
              <span>运行</span><span>5h 14m 56s</span>
              <span>代码版本</span><span className={styles.bgMono}>e02c29a6</span>
              <span>分配</span><span>512 MB</span>
              <span>分支</span><span className={styles.bgMono}>main</span>
            </div>
          </div>
          <div className={styles.bgLogsCard}>
            <div className={styles.bgLogsTitle}>操作记录</div>
            {[
              ['10 分钟前', '滚动升级组件 成功', '1秒'],
              ['10 分钟前', '构建组件 成功', '21秒'],
              ['14 分钟前', '滚动升级组件 成功', '1秒'],
            ].map(([t, action, dur]) => (
              <div key={action + t} className={styles.bgLogRow}>
                <span className={styles.bgLogTime}>{t}</span>
                <span className={styles.bgLogAction}>{action}</span>
                <span className={styles.bgLogDur}>{dur}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CanvasTopology() {
  return (
    <svg viewBox="0 0 320 360" className={styles.canvasSvg} aria-hidden>
      <defs>
        <pattern id="ai-demo-dots" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#9aa6c2" fillOpacity="0.35" />
        </pattern>
        <linearGradient id="ai-demo-arrow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c5ad8" />
          <stop offset="100%" stopColor="#3d8bff" />
        </linearGradient>
        <radialGradient id="ai-demo-hex-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3a3" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#22d3a3" stopOpacity="0" />
        </radialGradient>
        <marker id="ai-demo-arrowhead" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#3d8bff" />
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="url(#ai-demo-dots)" />

      {/* gateway cloud */}
      <g transform="translate(50,90)">
        <circle r="38" fill="#fff" stroke="#cbd5e1" strokeDasharray="3 3" />
        <path
          d="M-18,4 a14,14 0 1,1 28,0 a10,10 0 1,1 4,16 h-32 a8,8 0 1,1 0,-16 z"
          fill="#eef2ff"
          stroke="#5b8def"
          strokeWidth="1.6"
        />
        <text x="0" y="62" textAnchor="middle" fontSize="11" fill="#475569" fontWeight="500">
          网关
        </text>
      </g>

      {/* arrow */}
      <path
        d="M100 110 L180 215"
        stroke="url(#ai-demo-arrow)"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#ai-demo-arrowhead)"
      />

      {/* api hex */}
      <g transform="translate(210,235)">
        <circle r="55" fill="url(#ai-demo-hex-glow)" />
        <polygon
          points="0,-38 33,-19 33,19 0,38 -33,19 -33,-19"
          fill="#fff"
          stroke="#22d3a3"
          strokeWidth="2"
        />
        <circle r="6" fill="#22d3a3" />
        <text x="0" y="58" textAnchor="middle" fontSize="11" fill="#475569" fontWeight="600">
          api
        </text>
      </g>
    </svg>
  );
}
