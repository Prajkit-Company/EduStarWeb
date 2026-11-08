import { useState, type FormEvent } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  ShieldCheck,
  User,
} from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
  onBack: () => void;
}

export function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      onLogin();
    } else {
      setError('Invalid credentials. Use the demo details below.');
    }
  };

  return (
    <div className="min-h-screen bg-main-bg lg:grid lg:grid-cols-12">
      {/* Editorial panel */}
      <aside className="relative hidden overflow-hidden bg-coral-orange p-10 text-white-surface lg:col-span-5 lg:flex lg:flex-col lg:justify-between xl:p-14">
        <div className="pattern-bg pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-24 top-1/4 h-80 w-80 rounded-full border border-paper/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-20 bottom-10 h-64 w-64 rounded-full border border-paper/10"
          aria-hidden="true"
        />

        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-main-bg text-coral-orange">
              <span className="font-serif text-[18px] font-semibold tracking-[-0.04em]">SA</span>
            </span>
            <div>
              <p className="font-serif text-[20px] leading-none text-white-surface">St. Augustine&rsquo;s</p>
              <p className="mt-1.5 font-mono text-[8.5px] uppercase tracking-[0.2em] text-white-surface/55">
                College of Excellence
              </p>
            </div>
          </div>

          <p className="eyebrow eyebrow--on-dark mt-16">Administration</p>
          <h1 className="mt-5 max-w-[12ch] text-[clamp(2.4rem,4vw,3.6rem)] leading-[0.98] text-white-surface">
            The college, <span className="italic text-[#FF5638]">curated</span>.
          </h1>
          <p className="mt-5 max-w-[36ch] text-[14px] leading-[1.8] text-white-surface/70">
            Manage notices, faculty, programs, gallery images and admissions inquiries from one
            considered workspace.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="grid grid-cols-2 gap-4 border-t border-paper/15 pt-6">
            <div>
              <p className="font-serif text-[30px] leading-none text-[#FF5638]">1,200+</p>
              <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white-surface/50">
                Students
              </p>
            </div>
            <div>
              <p className="font-serif text-[30px] leading-none text-[#FF5638]">50+</p>
              <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white-surface/50">
                Faculty
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="mt-8 inline-flex items-center gap-2 text-[12px] font-semibold text-white-surface/70 transition-colors hover:text-white-surface"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to the website
          </button>
        </div>
      </aside>

      {/* Form */}
      <main className="flex min-h-screen flex-col lg:col-span-7">
        <div className="flex items-center justify-between gap-4 border-b border-rule px-6 py-5 lg:hidden">
          <button type="button" onClick={onBack} className="flex items-center gap-2.5 text-left">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-coral-orange text-white-surface">
              <span className="font-serif text-[15px] font-semibold">SA</span>
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
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-coral-orange"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Website
          </button>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-10 lg:px-14">
          <div className="w-full max-w-[420px]">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-main-bg text-coral-orange">
              <GraduationCap className="h-6 w-6" aria-hidden="true" />
            </span>

            <p className="eyebrow mt-7">Student &amp; staff portal</p>
            <h1 className="mt-4 text-[clamp(2rem,3.4vw,2.75rem)] leading-[1.02] text-primary-text">
              Welcome <span className="highlight">back</span>
            </h1>
            <p className="mt-3 text-[13.5px] leading-relaxed text-primary-text-2">
              Sign in to the St. Augustine&rsquo;s College content management system.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="username" className="field-label">
                  Username
                </label>
                <div className="relative">
                  <User
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-text"
                    aria-hidden="true"
                  />
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(event) => {
                      setUsername(event.target.value);
                      setError('');
                    }}
                    className="field field--icon"
                    placeholder="Enter admin username"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <label htmlFor="password" className="field-label !mb-0">
                    Password
                  </label>
                  <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-secondary-text">
                    Demo access
                  </span>
                </div>
                <div className="relative">
                  <Lock
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-text"
                    aria-hidden="true"
                  />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setError('');
                    }}
                    className="field field--icon !pr-12"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-secondary-text transition-colors hover:bg-main-bg hover:text-coral-orange"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div
                  className="flex items-start gap-2 rounded-2xl border border-warmred/30 bg-coral-orange/[0.07] px-4 py-3"
                  role="alert"
                >
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-coral-orange" aria-hidden="true" />
                  <p className="text-[12px] font-medium leading-relaxed text-coral-orange">{error}</p>
                </div>
              )}

              <button type="submit" className="btn btn--primary w-full !min-h-[50px]">
                Sign in
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>

            <div className="mt-6 rounded-[20px] border border-rule bg-main-bg/50 p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-secondary-text">
                Demo credentials
              </p>
              <div className="mt-2.5 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.08em] text-secondary-text">Username</p>
                  <p className="mt-0.5 font-mono text-[13px] font-medium text-primary-text">admin</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.08em] text-secondary-text">Password</p>
                  <p className="mt-0.5 font-mono text-[13px] font-medium text-primary-text">admin123</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onBack}
              className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold text-secondary-text transition-colors hover:text-coral-orange lg:hidden"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Back to the website
            </button>
          </div>
        </div>

        <div className="border-t border-rule px-6 py-4 lg:px-14">
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-secondary-text">
            &copy; 2026 St. Augustine&rsquo;s College · Authorised access only
          </p>
        </div>
      </main>
    </div>
  );
}
