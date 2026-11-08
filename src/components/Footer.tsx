import {
  ArrowUpRight,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from 'lucide-react';
import schoolLogo from '../image/logo.png';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

const exploreLinks = [
  { name: 'About the college', page: 'about' },
  { name: 'Academic programs', page: 'courses' },
  { name: 'Admissions', page: 'admission' },
  { name: 'Faculty & staff', page: 'faculty' },
  { name: 'Campus life', page: 'campus-life' },
  { name: 'Gallery', page: 'gallery' },
  { name: 'Achievements', page: 'achievements' },
];

const programLinks = [
  'Bachelor of Science',
  'Bachelor of Commerce',
  'Computer Applications',
  'Bachelor of Arts',
  'Business Administration',
  'Postgraduate studies',
];

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/staugustines' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/staugustines' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/staugustines' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/school/staugustines' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/staugustines' },
];

export function Footer({ setCurrentPage }: FooterProps) {
  return (
    <footer className="relative overflow-hidden border-t border-rule bg-coral-orange/70 glass--coral text-primary-text backdrop-blur-xl">
      <div className="container">
        {/* Masthead */}
        <div className="relative">
          <div
            className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-coral-orange/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-10 left-0 h-48 w-48 rounded-full bg-pale-blue/40 blur-2xl"
            aria-hidden="true"
          />
        </div>
        <div className="flex flex-col justify-between gap-8 border-b border-ink/10 py-14 lg:flex-row lg:items-end lg:py-20">
          <div className="flex items-center gap-6">
            <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-[3px] border-white/50 shadow-sm">
              <img
                src={schoolLogo}
                alt="St. Augustine's College logo"
                className="w-full h-full object-contain p-1"
                loading="eager"
                decoding="async"
              />
            </span>
            <div>
              <p className="eyebrow">St. Augustine&rsquo;s College</p>
              <p className="mt-5 max-w-[17ch] font-serif text-[clamp(2.4rem,5vw,4.2rem)] font-medium leading-[0.98] tracking-[-0.03em] text-primary-text">
                A place to become <span className="italic text-coral-orange">someone</span>.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setCurrentPage('contact')}
            className="btn btn--primary shrink-0 self-start lg:self-auto"
          >
            Plan your visit
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Directory */}
        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-16">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-[3px] border-white/50 shadow-sm backdrop-blur-sm">
                <img
                  src={schoolLogo}
                  alt="St. Augustine's College logo"
                  className="w-full h-full object-contain p-1"
                  loading="eager"
                  decoding="async"
                />
              </span>
              <div>
                <p className="font-serif text-xl leading-none text-primary-text">St. Augustine&rsquo;s</p>
                <p className="mt-1.5 font-mono text-[8.5px] uppercase tracking-[0.2em] text-secondary-text">
                  College of Excellence
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-[38ch] text-[14px] leading-[1.75] text-secondary-text">
              A distinguished community of scholars, practitioners and leaders, formed by a liberal
              education and a commitment to the common good. Established in 1985.
            </p>

            <div className="mt-6 flex gap-2">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`St. Augustine's College on ${label}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white-surface/35 text-secondary-text backdrop-blur-sm transition-all duration-200 hover:border-coral-orange/30 hover:bg-white-surface/70 hover:text-coral-orange"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer — explore" className="lg:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-secondary-text">Explore</p>
            <ul className="mt-5 list-none space-y-2.5 p-0">
              {exploreLinks.map((link) => (
                <li key={link.page}>
                  <button
                    type="button"
                    onClick={() => setCurrentPage(link.page)}
                    className="text-left text-[13.5px] text-secondary-text transition-colors duration-200 hover:text-coral-orange"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — programs" className="lg:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-secondary-text">Programs</p>
            <ul className="mt-5 list-none space-y-2.5 p-0">
              {programLinks.map((program) => (
                <li key={program}>
                  <button
                    type="button"
                    onClick={() => setCurrentPage('courses')}
                    className="text-left text-[13.5px] text-secondary-text transition-colors duration-200 hover:text-coral-orange"
                  >
                    {program}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-secondary-text">Find us</p>
            <ul className="mt-5 list-none space-y-4 p-0">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-coral-orange" aria-hidden="true" />
                <span className="text-[13.5px] leading-relaxed text-secondary-text">
                  123 University Avenue,
                  <br />
                  Academic District, AD 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-coral-orange" aria-hidden="true" />
                <a
                  href="tel:+1234567890"
                  className="text-[13.5px] text-secondary-text transition-colors hover:text-coral-orange"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-coral-orange" aria-hidden="true" />
                <a
                  href="mailto:admissions@staugustines.edu"
                  className="break-all text-[13.5px] text-secondary-text transition-colors hover:text-coral-orange"
                >
                  admissions@staugustines.edu
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-coral-orange" aria-hidden="true" />
                <span className="text-[13.5px] leading-relaxed text-secondary-text">
                  Mon&ndash;Fri: 8:00 AM &ndash; 5:00 PM
                  <br />
                  Sat: 9:00 AM &ndash; 1:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Baseline */}
        <div className="flex flex-col gap-3 border-t border-ink/10 py-6 font-mono text-[10px] tracking-[0.04em] text-secondary-text md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 St. Augustine&rsquo;s College of Excellence. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="https://prajkitcompany.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-coral-orange underline decoration-coral-orange/35 underline-offset-4 transition-colors hover:text-primary-text hover:decoration-coral-orange"
              aria-label="Powered by Prajkit (opens in a new tab)"
            >
              Powered by Prajkit
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
