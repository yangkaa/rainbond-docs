import { useCallback, useEffect, useRef, useState } from 'react';

type UseTimelineOptions = {
  totalDurationMs: number;
  paused?: boolean;
  onComplete?: () => void;
};

/**
 * 受控时间线推进器。
 * 0 → totalDurationMs 跑完后调用 onComplete，然后停住；
 * 外部决定下一步播什么，调 reset() 重新从 0 跑。
 */
export function useTimeline({ totalDurationMs, paused = false, onComplete }: UseTimelineOptions) {
  const [currentMs, setCurrentMs] = useState(0);
  const [resetTick, setResetTick] = useState(0);
  const startedAtRef = useRef<number | null>(null);
  const pausedElapsedRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  // 保持回调引用新鲜，避免每次重建副作用
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (paused) {
      if (startedAtRef.current != null) {
        pausedElapsedRef.current = performance.now() - startedAtRef.current;
        startedAtRef.current = null;
      }
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    if (completedRef.current) return;

    startedAtRef.current = performance.now() - pausedElapsedRef.current;

    const tick = () => {
      if (startedAtRef.current == null) return;
      const elapsed = performance.now() - startedAtRef.current;
      if (elapsed >= totalDurationMs) {
        setCurrentMs(totalDurationMs);
        completedRef.current = true;
        rafRef.current = null;
        onCompleteRef.current?.();
        return;
      }
      setCurrentMs(elapsed);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    // 加 resetTick：reset() 改 tick 即可触发 effect 重启 RAF
  }, [paused, totalDurationMs, resetTick]);

  const reset = useCallback(() => {
    pausedElapsedRef.current = 0;
    startedAtRef.current = null;
    completedRef.current = false;
    setCurrentMs(0);
    setResetTick((v) => v + 1);
  }, []);

  return { currentMs, reset };
}

export function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  // 默认 true：SSR / 无 IntersectionObserver 时直接播，避免卡死
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

export function useDocumentVisible() {
  // 默认 true，避免 headless / 后台预渲染时被误判 hidden
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const onChange = () => setVisible(document.visibilityState !== 'hidden');
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);
  return visible;
}
