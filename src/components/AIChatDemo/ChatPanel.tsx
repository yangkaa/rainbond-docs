import React, { useEffect, useMemo, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './styles.module.css';
import type { BranchId, QuickActionItem, TimelineEvent, ToolResult } from './timeline';

type ChatPanelProps = {
  events: TimelineEvent[];
  currentMs: number;
  /** 整体 session 标识，变化时整个 chatBody 强制重建 */
  sessionId: string | number;
  /** 点击 quick-action 按钮时回调 */
  onBranchClick?: (branch: BranchId) => void;
  /** 用于让外部拿到 primary 按钮 DOM 节点（GhostCursor 定位用） */
  primaryButtonRef?: (el: HTMLButtonElement | null) => void;
};

export default function ChatPanel({
  events,
  currentMs,
  sessionId,
  onBranchClick,
  primaryButtonRef,
}: ChatPanelProps) {
  const panelEnter = events.find((e) => e.kind === 'panel-enter');
  const panelVisible = !panelEnter || currentMs >= panelEnter.at;
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // 内容增长时贴着底部，避免主按钮被卷出视图
  useEffect(() => {
    const body = chatBodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [currentMs, sessionId]);

  const visibleEvents = useMemo(
    () => events.filter((e) => e.kind !== 'panel-enter' && currentMs >= e.at),
    [events, currentMs]
  );

  return (
    <motion.div
      className={styles.chatPanel}
      initial={{ opacity: 0, x: 24 }}
      animate={panelVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className={styles.chatHeader}>
        <div className={styles.chatHeaderLeft}>
          <div className={styles.chatAvatar}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <span className={styles.chatTitle}>RainAgent</span>
          <span className={styles.chatBetaTag}>Beta</span>
        </div>
        <div className={styles.chatHeaderRight}>
          <ChatHeaderIcon path="M3 12a9 9 0 1 0 9-9M3 12V5M3 12h7" />
          <ChatHeaderIcon path="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.04a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.04a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.04a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          <ChatHeaderIcon path="M18 6L6 18M6 6l12 12" />
        </div>
      </div>

      <div ref={chatBodyRef} className={styles.chatBody} key={`session-${sessionId}`}>
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleEvents.map((evt) => (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              layout
              className={styles.eventRow}
            >
              {renderEvent(evt, currentMs, onBranchClick, primaryButtonRef)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className={styles.chatInput}>
        <div className={styles.chatInputBox}>
          <span className={styles.chatInputPlaceholder}>请输入命令</span>
        </div>
        <div className={styles.chatInputFooter}>
          <span className={styles.chatInputClear}>
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            </svg>
            清空对话
          </span>
          <button className={styles.chatSendBtn} type="button">
            发送
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function renderEvent(
  evt: TimelineEvent,
  currentMs: number,
  onBranchClick?: (b: BranchId) => void,
  primaryButtonRef?: (el: HTMLButtonElement | null) => void
) {
  if (evt.kind === 'message') {
    const elapsed = currentMs - evt.at;
    return (
      <MessageBubble
        role={evt.role}
        text={evt.text}
        typeMs={evt.typeMs ?? 0}
        elapsed={elapsed}
      />
    );
  }
  if (evt.kind === 'thinking') {
    return <ThinkingDots />;
  }
  if (evt.kind === 'tool-call') {
    return (
      <ToolCallCard
        tool={evt.tool}
        durationMs={evt.durationMs}
        elapsed={currentMs - evt.at}
        result={evt.result}
      />
    );
  }
  if (evt.kind === 'quick-actions') {
    return (
      <QuickActions
        items={evt.items}
        onBranchClick={onBranchClick}
        primaryButtonRef={primaryButtonRef}
      />
    );
  }
  return null;
}

function MessageBubble({
  role,
  text,
  typeMs,
  elapsed,
}: {
  role: 'user' | 'ai';
  text: string;
  typeMs: number;
  elapsed: number;
}) {
  const visible = useMemo(() => {
    if (typeMs <= 0) return text;
    const progress = Math.min(1, Math.max(0, elapsed / typeMs));
    const len = Math.floor(progress * text.length);
    return text.slice(0, len);
  }, [elapsed, text, typeMs]);

  const showCaret = typeMs > 0 && elapsed < typeMs;

  if (role === 'user') {
    return (
      <div className={styles.msgRowUser}>
        <div className={styles.msgUserMeta}>
          <span>我</span>
          <span className={styles.msgTime}>{getDemoTime(0)}</span>
        </div>
        <div className={styles.msgBubbleUser}>{visible || ' '}</div>
      </div>
    );
  }

  return (
    <div className={styles.msgRowAi}>
      <div className={styles.msgAiMeta}>
        <span className={styles.msgAiName}>AI</span>
        <span className={styles.msgTime}>{getDemoTime(1)}</span>
      </div>
      <div className={styles.msgBubbleAi}>
        {visible}
        {showCaret && <span className={styles.caret} />}
      </div>
    </div>
  );
}

function ThinkingDots() {
  return (
    <div className={styles.msgRowAi}>
      <div className={styles.thinkingBubble}>
        <span className={styles.thinkingDot} />
        <span className={styles.thinkingDot} />
        <span className={styles.thinkingDot} />
      </div>
    </div>
  );
}

function ToolCallCard({
  tool,
  durationMs,
  elapsed,
  result,
}: {
  tool: string;
  durationMs: number;
  elapsed: number;
  result: ToolResult;
}) {
  const ready = elapsed >= durationMs;
  return (
    <div className={styles.toolCard}>
      <div className={styles.toolHeader}>
        <div className={styles.toolHeaderLeft}>
          <span className={styles.toolBadge}>
            {ready ? (
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <span className={styles.toolSpinner} />
            )}
          </span>
          <span className={styles.toolName}>{tool}</span>
        </div>
        <span className={ready ? styles.toolStatusOk : styles.toolStatusRunning}>
          {ready ? '已完成' : '调用中…'}
        </span>
      </div>

      <AnimatePresence initial={false} mode="wait">
        {ready ? (
          <motion.div
            key="result"
            className={styles.toolBody}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {result.summary && <div className={styles.toolSummary}>{result.summary}</div>}
            <div className={styles.toolGrid}>
              {result.lines.map((line) => (
                <div key={line.label} className={styles.toolGridRow}>
                  <span className={styles.toolGridKey}>{line.label}</span>
                  <span className={`${styles.toolGridVal} ${toneClass(line.tone)}`}>
                    {line.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            className={styles.toolLoadingRow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.skelLine} />
            <div className={styles.skelLineShort} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function QuickActions({
  items,
  onBranchClick,
  primaryButtonRef,
}: {
  items: QuickActionItem[];
  onBranchClick?: (branch: BranchId) => void;
  primaryButtonRef?: (el: HTMLButtonElement | null) => void;
}) {
  return (
    <div className={styles.quickActions}>
      {items.map((it, i) => {
        const handleClick = () => {
          if (it.branch && onBranchClick) onBranchClick(it.branch);
        };
        const isPrimary = !!it.primary;
        return (
          <motion.button
            key={it.label}
            type="button"
            ref={isPrimary && primaryButtonRef ? primaryButtonRef : undefined}
            data-quick-action={isPrimary ? 'primary' : undefined}
            className={`${styles.quickBtn} ${isPrimary ? styles.quickBtnPrimary : ''}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut', delay: i * 0.08 }}
            onClick={handleClick}
            disabled={!it.branch}
          >
            {it.icon && <span className={styles.quickBtnIcon}>{it.icon}</span>}
            {it.label}
          </motion.button>
        );
      })}
    </div>
  );
}

function ChatHeaderIcon({ path }: { path: string }) {
  return (
    <span className={styles.chatHeaderIcon}>
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={path} />
      </svg>
    </span>
  );
}

function toneClass(tone?: 'ok' | 'warn' | 'error') {
  if (tone === 'ok') return styles.toneOk;
  if (tone === 'warn') return styles.toneWarn;
  if (tone === 'error') return styles.toneError;
  return '';
}

function getDemoTime(offsetMin: number) {
  const base = 19 * 60 + 30;
  const total = base + offsetMin;
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  const hh = h > 12 ? h - 12 : h === 0 ? 12 : h;
  const period = h >= 12 ? 'PM' : 'AM';
  return `${String(hh).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
}
