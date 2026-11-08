import type { ReactNode } from 'react';
import { ArrowUpRight, Phone } from 'lucide-react';
import contactBanner from '../image/contact_banner.jpg';

interface CallToActionProps {
  title: ReactNode;
  description: string;
  image?: string;
  imageAlt?: string;
  eyebrow?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimary: () => void;
  onSecondary: () => void;
}

export function CallToAction({
  title,
  description,
  image = contactBanner,
  imageAlt = "Students on the St. Augustine's College campus",
  eyebrow = 'Admissions are open',
  primaryLabel = 'Begin your application',
  secondaryLabel = 'Talk to our team',
  onPrimary,
  onSecondary,
}: CallToActionProps) {
  return (
    <section className="pb-20 lg:pb-28">
      <div className="container">
        <div className="relative overflow-hidden rounded-[34px] border border-white/40 bg-coral-orange/15 glass--coral px-6 py-12 text-primary-text shadow-[0_32px_70px_-46px_rgba(17,17,17,0.28)] backdrop-blur-xl sm:px-10 lg:px-14 lg:py-16">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-coral-orange/12 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-pale-blue/45 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <p className="eyebrow">{eyebrow}</p>
              <h2 className="mt-4 max-w-[16ch] text-primary-text">{title}</h2>
              <p className="mt-5 max-w-[48ch] text-[16px] leading-[1.75] text-secondary-text">{description}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button type="button" onClick={onPrimary} className="btn btn--primary">
                  {primaryLabel}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button type="button" onClick={onSecondary} className="btn btn--outline bg-white-surface/35 backdrop-blur-sm">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {secondaryLabel}
                </button>
              </div>

              <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.16em] text-secondary-text">
                123 University Avenue · Academic District, AD 12345
              </p>
            </div>

            <div className="group relative flex items-center justify-center overflow-hidden lg:h-full">
              <img
                src={image}
                alt={imageAlt}
                className="h-auto w-full max-h-[320px] object-contain transition-transform duration-500 group-hover:scale-[1.03] sm:max-h-[380px] lg:max-h-[440px]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
