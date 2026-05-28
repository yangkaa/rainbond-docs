import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './styles.module.css';

type Pos = { x: number; y: number };

type GhostCursorProps = {
  /** 目标坐标（相对 demo frame 容器） */
  target: Pos | null;
  /** 是否显示 */
  visible: boolean;
  /** 是否到达后做点击波纹（如：要触发自动点击前一刻） */
  showClickPulse?: boolean;
};

/**
 * 假鼠标：在演示末段从右下角滑到主按钮位置，做出"AI 引导用户点击"的效果。
 * 仅装饰，不拦截事件（pointer-events: none）。
 */
export default function GhostCursor({ target, visible, showClickPulse }: GhostCursorProps) {
  const show = visible && target != null;
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.ghostCursor}
          initial={{
            opacity: 0,
            x: (target?.x ?? 0) + 60,
            y: (target?.y ?? 0) + 80,
            scale: 0.85,
          }}
          animate={{
            opacity: 1,
            x: target!.x,
            y: target!.y,
            scale: 1,
          }}
          exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.25 } }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        >
          {showClickPulse && <span className={styles.ghostRipple} />}
          <svg viewBox="0 0 24 24" width="22" height="22" className={styles.ghostCursorSvg}>
            <path
              d="M5.5 3.5 L5.5 17 L9 13.5 L11.4 18.5 L13.4 17.6 L11 12.6 L16 12.6 Z"
              fill="#fff"
              stroke="#0f172a"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
