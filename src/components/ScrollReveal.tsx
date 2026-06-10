import { useEffect, useRef, useState } from 'react';
import { cn } from '../utils/cn';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: string;
  delay?: number;
}

export function ScrollReveal({ children, className, animation = 'animate-slide-up', delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(revealed ? animation : 'opacity-0', className)}
      style={revealed && delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
