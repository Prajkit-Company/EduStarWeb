import { useState } from 'react';
import { Info, X } from 'lucide-react';

export function StandardBadge() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border border-rule bg-main-bg/90 glass px-3.5 py-2 text-[11px] font-semibold text-coral-orange shadow-[0_10px_24px_-16px_rgba(17,17,17,0.45)] backdrop-blur transition-colors hover:border-rule-2 hover:bg-main-bg"
        aria-expanded={open}
      >
        <Info className="h-3.5 w-3.5 text-coral-orange" aria-hidden="true" />
        <span>Standard package demo</span>
      </button>

      {open && (
        <div className="absolute bottom-full left-0 mb-3 w-72 rounded-2xl border border-rule bg-main-bg p-5 text-sm shadow-2xl">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-3 top-3 rounded-full p-1 text-secondary-text transition-colors hover:bg-main-bg hover:text-primary-text"
            aria-label="Close package information"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-coral-orange">
              <Info className="h-4 w-4 text-white-surface" aria-hidden="true" />
            </div>
            <div>
              <h4 className="mb-1 font-serif text-base font-medium text-primary-text">Standard package demo</h4>
              <p className="text-[12px] leading-relaxed text-primary-text-2">
                This demo represents the Standard Website Package (₹40,000&ndash;50,000 NPR). Upgrade to
                Pro or Elite for advanced features like online payment, student portals,
                auto-timetable, and more.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
