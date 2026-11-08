import type { ReactNode } from 'react';
import { ArrowUpRight, CalendarDays, Star } from 'lucide-react';

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  /** Omit to render a text-only hero (no photo). hero_image.jpg must only be used on the Home page. */
  image?: string;
  imageAlt?: string;
  setCurrentPage: (page: string) => void;
  facts?: { value: string; label: string }[];
  badge?: { value: string; label: string };
  primaryLabel?: string;
  primaryPage?: string;
  secondaryLabel?: string;
  secondaryPage?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  imagePosition?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = '',
  setCurrentPage,
  facts,
  badge = { value: '1985', label: 'Since' },
  primaryLabel = 'Begin your application',
  primaryPage = 'admission',
  secondaryLabel = 'Book a campus visit',
  secondaryPage = 'contact',
  onPrimary,
  onSecondary,
  imagePosition = 'center',
}: PageHeroProps) {
  const showImage = Boolean(image);

  return (
    <section className="relative overflow-hidden pb-16 pt-10 sm:pb-20 lg:pb-24 lg:pt-16">
      <div
        className="pointer-events-none absolute -right-28 top-8 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,86,56,0.16),transparent_66%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(255,86,56,0.10),transparent_66%)]"
        aria-hidden="true"
      />

      <div className="container relative">
        <div className={showImage ? 'grid items-center gap-14 lg:grid-cols-12 lg:gap-10' : 'mx-auto max-w-[980px]'}>
          <div className={showImage ? 'lg:col-span-6' : 'text-center'}>
            <p className={`eyebrow ${showImage ? '' : 'justify-center'}`}>{eyebrow}</p>

            <h1 className={`mt-5 max-w-[17ch] text-balance text-primary-text ${showImage ? '' : 'mx-auto'}`}>{title}</h1>

            <p className={`mt-6 max-w-[48ch] text-[16px] leading-[1.75] text-primary-text-2 sm:text-[17px] ${showImage ? '' : 'mx-auto'}`}>
              {description}
            </p>

            <div className={`mt-8 flex flex-wrap items-center gap-3 ${showImage ? '' : 'justify-center'}`}>
              <button
                type="button"
                onClick={onPrimary ?? (() => setCurrentPage(primaryPage))}
                className="btn btn--primary"
              >
                {primaryLabel}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onSecondary ?? (() => setCurrentPage(secondaryPage))}
                className="btn btn--outline"
              >
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                {secondaryLabel}
              </button>
            </div>

            {facts && facts.length > 0 && (
              <dl className={`mt-10 grid grid-cols-3 gap-4 border-t border-rule pt-6 ${showImage ? '' : 'mx-auto max-w-[760px]'}`}>
                {facts.map((fact) => (
                  <div key={fact.label} className={`border-l border-rule pl-4 first:border-0 first:pl-0 ${showImage ? '' : 'text-center'}`}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-secondary-text">{fact.label}</dt>
                    <dd className="mt-1 font-serif text-[26px] leading-none text-coral-orange sm:text-[30px]">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {showImage && (
            <div className="lg:col-span-6">
              <div className="relative mx-auto w-full max-w-[500px] pb-10 lg:mr-0">
                <div
                  className="deco-ring pointer-events-none absolute -inset-4 hidden rounded-[260px_260px_40px_40px] sm:block"
                  aria-hidden="true"
                />

                <div className="arch relative overflow-hidden border-[6px] border-white/80 shadow-[0_36px_70px_-42px_rgba(17,17,17,0.5)]">
                  <img
                    src={image}
                    alt={imageAlt}
                    className="h-[360px] w-full object-cover sm:h-[440px] lg:h-[510px]"
                    style={{ objectPosition: imagePosition }}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
                </div>

                <div className="absolute -bottom-1 left-2 rounded-2xl border border-rule bg-main-bg/95 px-5 py-4 shadow-[0_18px_38px_-24px_rgba(17,17,17,0.45)] backdrop-blur sm:left-6">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-secondary-text">{badge.label}</p>
                  <p className="mt-1 font-serif text-3xl leading-none text-coral-orange">{badge.value}</p>
                </div>

                <div className="absolute -top-4 right-1 flex h-[86px] w-[86px] flex-col items-center justify-center rounded-full bg-coral-orange text-center text-primary-text shadow-[0_14px_28px_-14px_rgba(17,17,17,0.45)] sm:-top-5 sm:right-4 sm:h-[96px] sm:w-[96px]">
                  <Star className="h-4 w-4" fill="currentColor" aria-hidden="true" />
                  <p className="mt-1 font-mono text-[8px] font-medium uppercase leading-tight tracking-[0.12em]">
                    A college
                    <br />
                    of distinction
                  </p>
                </div>

                <p className="absolute -right-7 bottom-28 hidden font-mono text-[9px] uppercase tracking-[0.24em] text-secondary-text [writing-mode:vertical-rl] lg:block">
                  St. Augustine&rsquo;s College
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
