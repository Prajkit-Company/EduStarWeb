import { useEffect, useState } from 'react';
import schoolLogo from '../image/logo.png';
import {
  ArrowUpRight,
  Facebook,
  Instagram,
  LayoutDashboard,
  LogIn,
  Mail,
  Menu,
  Phone,
  X,
} from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onDashboardClick: () => void;
}

const navLinks = [
  { name: 'About', page: 'about' },
  { name: 'Academics', page: 'courses' },
  { name: 'Admission', page: 'admission' },
  { name: 'Faculty', page: 'faculty' },
  { name: 'Campus Life', page: 'campus-life' },
  { name: 'Contact', page: 'contact' },
];

const utilityLinks = [
  { name: 'Gallery', page: 'gallery' },
  { name: 'Achievements', page: 'achievements' },
];

export function Navbar({
  currentPage,
  setCurrentPage,
  isLoggedIn,
  onLoginClick,
  onDashboardClick,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [currentPage]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const goTo = (page: string) => {
    setCurrentPage(page);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Slim utility strip */}
      <div
        className={`hidden overflow-hidden bg-coral-orange text-white-surface transition-all duration-300 lg:block ${
          isScrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
        }`}
      >
        <div className="container flex h-9 items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 text-[11px] font-medium tracking-wide text-white-surface/80 transition-colors hover:text-white-surface"
            >
              <Phone className="h-3 w-3" aria-hidden="true" />
              +1 (234) 567-890
            </a>
            <a
              href="mailto:admissions@staugustines.edu"
              className="hidden items-center gap-2 text-[11px] font-medium tracking-wide text-white-surface/80 transition-colors hover:text-white-surface xl:flex"
            >
              <Mail className="h-3 w-3" aria-hidden="true" />
              admissions@staugustines.edu
            </a>
          </div>

          <div className="flex items-center gap-5">
            {utilityLinks.map((link) => (
              <button
                key={link.page}
                type="button"
                onClick={() => goTo(link.page)}
                className="text-[11px] font-medium tracking-wide text-white-surface/80 transition-colors hover:text-white-surface"
              >
                {link.name}
              </button>
            ))}
            <a
              href="https://facebook.com/staugustines"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white-surface/70 transition-colors hover:text-white-surface"
              aria-label="St. Augustine's College on Facebook"
            >
              <Facebook className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href="https://instagram.com/staugustines"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white-surface/70 transition-colors hover:text-white-surface"
              aria-label="St. Augustine's College on Instagram"
            >
              <Instagram className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <span className="h-3 w-px bg-main-bg/25" aria-hidden="true" />
            <button
              type="button"
              onClick={isLoggedIn ? onDashboardClick : onLoginClick}
              className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-white-surface/90 transition-colors hover:text-white-surface"
            >
              {isLoggedIn ? (
                <>
                  <LayoutDashboard className="h-3 w-3" aria-hidden="true" />
                  Admin panel
                </>
              ) : (
                <>
                  <LogIn className="h-3 w-3" aria-hidden="true" />
                  Login Portal
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div
        className={`border-b transition-all duration-300 ${
          isScrolled
            ? 'border-rule bg-main-bg/90 glass shadow-[0_10px_30px_-24px_rgba(17,17,17,0.4)] backdrop-blur-xl'
            : 'border-transparent bg-main-bg/80 glass backdrop-blur-md'
        }`}
      >
        <div className="container">
          <div
            className={`flex items-center justify-between gap-4 transition-all duration-300 ${
              isScrolled ? 'h-[68px]' : 'h-[78px]'
            }`}
          >
            {/* Brand */}
            <button
              type="button"
              onClick={() => goTo('home')}
              className="group flex min-w-0 items-center gap-2.5 text-left sm:gap-3"
              aria-label="St. Augustine's College — home"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-[4px] border-white bg-white-surface shadow-[0_10px_20px_-12px_rgba(17,17,17,0.18)] transition-transform duration-300 group-hover:-rotate-3 sm:h-11 sm:w-11">
                <img
                  src={schoolLogo}
                  alt="St. Augustine's College logo"
                  className="h-full w-full object-contain p-1"
                  loading="eager"
                  decoding="async"
                />
              </span>
              <span className="min-w-0 leading-none">
                <span className="block truncate font-serif text-[17px] font-medium tracking-[-0.025em] text-primary-text sm:text-[20px]">
                  St. Augustine&rsquo;s
                </span>
                <span className="mt-1 block truncate font-mono text-[8px] uppercase tracking-[0.16em] text-secondary-text sm:text-[8.5px] sm:tracking-[0.2em]">
                  College of Excellence
                </span>
              </span>
            </button>

            {/* Desktop links */}
            <nav aria-label="Primary navigation" className="hidden items-center gap-0.5 lg:flex">
              {navLinks.map((link) => {
                const active = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    type="button"
                    onClick={() => goTo(link.page)}
                    aria-current={active ? 'page' : undefined}
                    className={`group relative px-3 py-2 text-[13px] font-semibold transition-colors duration-200 xl:px-4 ${
                      active ? 'text-coral-orange' : 'text-primary-text-2 hover:text-coral-orange'
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute bottom-0 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-coral-orange transition-all duration-300 ${
                        active ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => goTo('admission')}
                className="btn btn--primary hidden !min-h-[42px] !px-5 !text-[12px] sm:inline-flex"
              >
                Apply now
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-rule-2 text-primary-text transition-colors hover:border-coral-orange hover:text-coral-orange lg:hidden"
                aria-label="Open menu"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[70] lg:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!isOpen}
      >
        <div
          className={`absolute inset-0 bg-ink/35 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`absolute inset-y-0 right-0 flex w-full max-w-[430px] flex-col bg-main-bg shadow-2xl transition-transform duration-500 ease-[var(--ease-out)] ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ maxHeight: '100dvh' }}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-rule px-5 sm:px-6">
            <button type="button" onClick={() => goTo('home')} className="flex items-center gap-3 text-left">
              <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-[3px] border-white bg-white-surface shadow-[0_6px_12px_-4px_rgba(17,17,17,0.14)]">
                <img
                  src={schoolLogo}
                  alt="St. Augustine's College logo"
                  className="h-full w-full object-contain p-1"
                  loading="eager"
                  decoding="async"
                />
              </span>
              <span>
                <span className="block font-serif text-[17px] font-medium text-primary-text">St. Augustine&rsquo;s</span>
                <span className="block font-mono text-[8px] uppercase tracking-[0.18em] text-secondary-text">
                  College of Excellence
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-rule-2 text-primary-text transition-colors hover:border-coral-orange hover:text-coral-orange"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-6 sm:py-8">
            <nav aria-label="Mobile navigation" className="flex flex-col">
              {navLinks.map((link, index) => {
                const active = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    type="button"
                    onClick={() => goTo(link.page)}
                    className="group flex items-baseline gap-3 border-b border-rule py-3.5 text-left sm:gap-4 sm:py-4"
                  >
                    <span className="font-mono text-[10px] tracking-[0.1em] text-coral-orange">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-serif text-[24px] leading-none tracking-[-0.025em] transition-colors sm:text-[28px] ${
                        active ? 'text-coral-orange' : 'text-primary-text group-hover:text-coral-orange'
                      }`}
                    >
                      {link.name}
                    </span>
                    {active && <span className="ml-auto h-2 w-2 shrink-0 self-center rounded-full bg-coral-orange" aria-hidden="true" />}
                  </button>
                );
              })}
            </nav>

            <div className="mt-7 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 sm:mt-8">
              {utilityLinks.map((link) => (
                <button
                  key={link.page}
                  type="button"
                  onClick={() => goTo(link.page)}
                  className="rounded-2xl border border-rule bg-main-bg/50 px-4 py-4 text-left transition-colors hover:border-rule-2 hover:bg-main-bg"
                >
                  <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-secondary-text">Discover</span>
                  <span className="mt-1 block font-serif text-lg text-primary-text">{link.name}</span>
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-coral-orange p-5 text-white-surface">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white-surface/60">Admissions</p>
              <p className="mt-2 font-serif text-[22px] leading-tight text-white-surface">
                Applications are open for the 2025&ndash;26 session.
              </p>
              <button
                type="button"
                onClick={() => goTo('admission')}
                className="btn btn--light mt-4 !min-h-[44px] !px-5 !text-[12px]"
              >
                Apply now
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-8 space-y-3 border-t border-rule pt-6">
              <a href="tel:+1234567890" className="flex items-center gap-3 text-sm text-primary-text-2">
                <Phone className="h-4 w-4 text-coral-orange" aria-hidden="true" />
                +1 (234) 567-890
              </a>
              <a href="mailto:admissions@staugustines.edu" className="flex min-w-0 items-center gap-3 text-sm text-primary-text-2">
                <Mail className="h-4 w-4 shrink-0 text-coral-orange" aria-hidden="true" />
                <span className="truncate">admissions@staugustines.edu</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  isLoggedIn ? onDashboardClick() : onLoginClick();
                }}
                className="flex items-center gap-3 pt-1 text-sm font-semibold text-coral-orange"
              >
                {isLoggedIn ? (
                  <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <LogIn className="h-4 w-4" aria-hidden="true" />
                )}
                {isLoggedIn ? 'Open admin panel' : 'Login Portal'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
