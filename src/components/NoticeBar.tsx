import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Megaphone, X } from 'lucide-react';
import { getNotices } from '../lib/cms';

function NoticePrefix({ notice }: { notice: { category?: string; title: string } }) {
  return (
    <span className="shrink-0 whitespace-nowrap text-[12px] font-medium leading-snug">
      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] opacity-70">
        {notice.category || 'News'}
      </span>
      <span className="mx-2 opacity-40" aria-hidden="true">
        /
      </span>
      <strong className="font-bold">{notice.title}:</strong>
    </span>
  );
}

export function NoticeBar() {
  const [visible, setVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<'enter' | 'show' | 'exit'>('enter');
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [cycleDuration, setCycleDuration] = useState(10);
  const contentViewportRef = useRef<HTMLDivElement>(null);
  const contentMeasureRef = useRef<HTMLSpanElement>(null);
  const timersRef = useRef<number[]>([]);
  const notices = useMemo(() => getNotices(), []);

  const notice = notices[activeIndex] ?? notices[0];

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  }, []);

  const queue = useCallback((fn: () => void, ms: number) => {
    timersRef.current.push(window.setTimeout(fn, ms));
  }, []);

  const advance = useCallback(() => {
    if (notices.length <= 1) return;
    setPhase('exit');
    queue(() => {
      setActiveIndex((i) => (i + 1) % notices.length);
      setPhase('enter');
    }, 360);
  }, [notices.length, queue]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  useLayoutEffect(() => {
    if (!visible || !notice) return;
    clearTimers();
    setPhase('enter');

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const setup = () => {
      const viewport = contentViewportRef.current;
      const measure = contentMeasureRef.current;
      if (!viewport || !measure) return;

      const overflow = measure.scrollWidth > viewport.clientWidth + 4;
      setIsOverflowing(overflow && !reduced);
      const pxPerSecond = 48;
      const gap = 56;
      const distance = measure.scrollWidth + gap;
      setCycleDuration(Math.max(6, distance / pxPerSecond));
      setPhase('show');

      if (notices.length > 1) {
        // One by one: fixed prefix stays; content continuously slides until a full cycle completes, then next
        const hold = reduced || !overflow ? 4500 : Math.round((Math.max(6, distance / pxPerSecond) + 0.4) * 1000);
        queue(advance, hold);
      }
    };

    queue(setup, 60);
    return clearTimers;
  }, [activeIndex, visible, notice, notices.length, advance, clearTimers, queue]);

  if (!visible || !notice) return null;

  const containerTransition =
    phase === 'enter'
      ? 'translate-y-1.5 opacity-0'
      : phase === 'exit'
        ? '-translate-y-1.5 opacity-0'
        : 'translate-y-0 opacity-100';

  return (
    <div className="relative z-[55] overflow-hidden bg-coral-orange/90 glass text-primary-text">
      <style>{`
        @keyframes notice-content-slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .notice-content-track { animation: none !important; transform: none !important; }
        }
      `}</style>
      <div className="container flex items-center gap-3 py-2.5">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-coral-orange/10">
          <Megaphone className="h-3.5 w-3.5" aria-hidden="true" />
        </span>

        <div
          className={`relative flex min-h-[20px] min-w-0 flex-1 items-center gap-1 overflow-hidden transition-all duration-300 ease-out ${containerTransition}`}
          aria-live="polite"
          aria-atomic="true"
          aria-label="News and announcements"
        >
          {/* Fixed: category / title (before ":") */}
          <NoticePrefix notice={notice} />

          {/* Sliding: only content after ":" */}
          <div ref={contentViewportRef} className="relative min-w-0 flex-1 overflow-hidden">
            <span
              ref={contentMeasureRef}
              className="pointer-events-none invisible absolute left-0 top-0 whitespace-nowrap pl-1 text-[12px] font-medium leading-snug"
              aria-hidden="true"
            >
              {notice.content}
            </span>

            {isOverflowing ? (
              <div
                key={`content-${notice.id ?? notice.title}-${activeIndex}`}
                className="notice-content-track flex w-max items-center whitespace-nowrap will-change-transform"
                style={{ animation: `notice-content-slide ${cycleDuration}s linear infinite` }}
              >
                <span className="shrink-0 pl-1 pr-14 text-[12px] font-medium leading-snug">{notice.content}</span>
                <span className="shrink-0 pl-1 pr-14 text-[12px] font-medium leading-snug" aria-hidden="true">
                  {notice.content}
                </span>
              </div>
            ) : (
              <p
                key={`content-static-${notice.id ?? notice.title}-${activeIndex}`}
                className="truncate whitespace-nowrap pl-1 text-[12px] font-medium leading-snug"
              >
                {notice.content}
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setVisible(false)}
          className="shrink-0 rounded-full p-1.5 transition-colors hover:bg-coral-orange/10"
          aria-label="Dismiss notice"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
