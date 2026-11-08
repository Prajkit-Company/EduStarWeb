import type { ReactNode } from 'react';
import { cn } from '../utils/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  action?: ReactNode;
  tone?: 'light' | 'dark';
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  action,
  tone = 'light',
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div className={cn('flex flex-col gap-6', centered && 'items-center text-center', className)}>
      <div className={cn('flex w-full flex-col gap-4', centered ? 'items-center' : 'md:flex-row md:items-end md:justify-between')}>
        <div className={cn(centered && 'max-w-3xl')}>
          {eyebrow && (
            <p className={cn('eyebrow', tone === 'dark' && 'eyebrow--on-dark', centered && 'eyebrow--center')}>
              {eyebrow}
            </p>
          )}
          <h2
            className={cn(
              'mt-4 max-w-[17ch] text-balance',
              tone === 'dark' ? 'text-white-surface' : 'text-primary-text',
              centered && 'mx-auto max-w-[22ch]'
            )}
          >
            {title}
          </h2>
          {description && (
            <p
              className={cn(
                'mt-5 max-w-[56ch] text-[15px] leading-[1.75]',
                tone === 'dark' ? 'text-white-surface/80' : 'text-primary-text-2',
                centered && 'mx-auto'
              )}
            >
              {description}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}
