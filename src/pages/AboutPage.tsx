import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Target,
  Eye,
  Heart,
  Award,
  Building2,
  Microscope,
  Monitor,
  Library,
  Wrench,
  FlaskConical,
  ArrowUpRight,
  Quote,
  Star,
} from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { CallToAction } from '../components/CallToAction';

gsap.registerPlugin(ScrollTrigger);

interface AboutPageProps {
  setCurrentPage: (page: string) => void;
}

const timeline = [
  {
    year: '1985',
    title: 'Foundation',
    description:
      "St. Augustine's College was established with a vision to provide quality higher education rooted in academic excellence and moral values.",
  },
  {
    year: '1995',
    title: 'Expansion',
    description:
      'Introduction of new departments including Commerce, Computer Science, and expansion of science programs.',
  },
  {
    year: '2005',
    title: 'Infrastructure development',
    description:
      'Major campus expansion with new academic blocks, modern laboratories, and a state-of-the-art library.',
  },
  {
    year: '2015',
    title: 'Digital transformation',
    description:
      'Implementation of smart classrooms, digital learning resources, and online academic management systems.',
  },
  {
    year: '2020',
    title: 'NAAC A+ accreditation',
    description:
      'Received the highest accreditation grade, recognizing our commitment to quality education.',
  },
  {
    year: '2024',
    title: 'Continuing excellence',
    description:
      'Celebrating 39 years of academic distinction with 1,200+ students and 50+ distinguished faculty members.',
  },
];

const leadership = [
  {
    name: 'Dr. Robert J. Anderson',
    role: 'Principal',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80',
    qualifications: 'Ph.D. (Education), M.Phil., 32 years experience',
    message:
      'Our mission is to nurture not just scholars, but compassionate leaders who will shape a better tomorrow.',
  },
  {
    name: 'Prof. Maria S. Garcia',
    role: 'Vice Principal',
    image: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=500&q=80',
    qualifications: 'M.Phil., MBA, 28 years experience',
    message:
      "Education at St. Augustine's transcends textbooks—it transforms lives.",
  },
  {
    name: 'Dr. James K. Wilson',
    role: 'Dean of Academics',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80',
    qualifications: 'Ph.D. (Computer Science), 22 years experience',
    message: 'We prepare students to excel in a rapidly evolving technological landscape.',
  },
  {
    name: 'Mrs. Priya R. Sharma',
    role: 'Chief Administrative Officer',
    image: 'https://www.tapmi.edu.in/wp-content/uploads/2025/09/PRIYA-SHARMA.jpg',
    qualifications: 'MBA (Administration), 20 years experience',
    message: 'Operational excellence ensures every student receives the support they deserve.',
  },
];

const facilities = [
  {
    icon: Microscope,
    title: 'Science laboratories',
    description: 'Physics, Chemistry, and Biology labs with modern research equipment.',
  },
  {
    icon: Monitor,
    title: 'Computer centres',
    description: '200+ workstations with latest software and high-speed connectivity.',
  },
  {
    icon: Library,
    title: 'Central library',
    description: '50,000+ volumes, digital resources, and dedicated reading halls.',
  },
  {
    icon: Building2,
    title: 'Smart classrooms',
    description: '45+ digitally-enabled interactive learning spaces.',
  },
  {
    icon: Wrench,
    title: 'Technical workshop',
    description: 'Fully-equipped facilities for practical engineering education.',
  },
  {
    icon: FlaskConical,
    title: 'Research centre',
    description: 'Dedicated research facilities for faculty and postgraduate students.',
  },
];

const values = [
  { icon: Target, title: 'Our mission', tone: 'dark' as const },
  { icon: Eye, title: 'Our vision', tone: 'cream' as const },
  { icon: Heart, title: 'Our values', tone: 'ochre' as const },
];

const valueCopy: Record<string, string> = {
  'Our mission':
    'To provide accessible, transformative education that empowers students with knowledge, skills, and ethical values necessary to succeed and contribute meaningfully to society.',
  'Our vision':
    'To be a globally recognized institution of higher learning, distinguished for academic excellence, innovative research, and producing responsible leaders who drive positive change.',
  'Our values':
    'Integrity, Excellence, Innovation, Inclusivity, and Social Responsibility—the foundational principles that guide every aspect of our institutional culture and educational practice.',
};

export function AboutPage({ setCurrentPage }: AboutPageProps) {
  const journeySectionRef = useRef<HTMLElement>(null);
  const journeyItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const journeyPointRef = useRef<HTMLSpanElement>(null);
  const journeyLineRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = journeySectionRef.current;
    const items = journeyItemRefs.current.filter(Boolean) as HTMLDivElement[];
    const point = journeyPointRef.current;
    const line = journeyLineRef.current;
    if (!section || items.length === 0) return;

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      gsap.set(items, { opacity: 1, y: 0, clearProps: 'transform' });
      if (point && line) gsap.set(point, { y: Math.max(0, line.offsetHeight - point.offsetHeight) });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y: 22 });
      if (point) gsap.set(point, { y: 0 });

      const shown = new WeakSet<Element>();

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
        invalidateOnRefresh: true,
        onUpdate: () => {
          if (!point || !line) return;
          const viewportMiddleY = window.innerHeight / 2;
          const lineRect = line.getBoundingClientRect();
          const travel = Math.max(0, line.offsetHeight - point.offsetHeight);

          // Keep the point aligned to the viewport middle (clamped to the timeline line).
          const pointY = Math.min(
            travel,
            Math.max(0, viewportMiddleY - lineRect.top - point.offsetHeight / 2)
          );
          gsap.set(point, { y: pointY });

          const revealLineY = viewportMiddleY;

          items.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const itemCenterY = rect.top + rect.height / 2;
            const reached = itemCenterY <= revealLineY;

            if (reached && !shown.has(item)) {
              shown.add(item);
              gsap.to(item, {
                opacity: 1,
                y: 0,
                duration: 0.85,
                ease: 'sine.out',
                overwrite: 'auto',
              });
            } else if (!reached && shown.has(item)) {
              shown.delete(item);
              gsap.to(item, {
                opacity: 0,
                y: 22,
                duration: 0.5,
                ease: 'sine.inOut',
                overwrite: 'auto',
              });
            }
          });
        },
      });

      ScrollTrigger.addEventListener('refresh', () => st.update());
      st.update();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-main-bg">
      <PageHero
        eyebrow="About the college"
        title={
          <>
            A distinguished <span className="highlight">legacy</span>, a living community
          </>
        }
        description="Nearly four decades of academic distinction, nurturing generations of scholars, professionals and leaders who have made their mark across the globe."
        setCurrentPage={setCurrentPage}
        badge={{ value: 'A+', label: 'NAAC grade' }}
        primaryLabel="Begin your application"
        secondaryLabel="Meet our faculty"
        secondaryPage="faculty"
      />

      {/* Mission / vision / values */}
      <section className="pb-20 lg:pb-28">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Reveal key={value.title} delay={index * 80}>
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-white/55 bg-[linear-gradient(160deg,rgba(255,255,255,0.22),rgba(255,255,255,0.06)_42%,rgba(186,230,253,0.10))] p-7 text-primary-text shadow-[0_10px_36px_rgba(17,17,17,0.07),inset_0_1px_0_rgba(255,255,255,0.75)] ring-1 ring-white/25 backdrop-blur-[28px] backdrop-saturate-150 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-white/75 hover:shadow-[0_22px_48px_rgba(17,17,17,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] hover:ring-white/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8">
                    <div
                      className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/45 via-white/10 to-transparent transition-opacity duration-300 group-hover:opacity-100 group-hover:from-white/65"
                      aria-hidden="true"
                    />
                    <div
                      className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-100/20 blur-2xl transition-all duration-500 group-hover:-right-6 group-hover:-top-6 group-hover:bg-cyan-100/35"
                      aria-hidden="true"
                    />
                    <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/55 bg-white/30 text-coral-orange shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-white/75 group-hover:bg-white/45">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="relative mt-6 flex items-baseline justify-between gap-4">
                      <h2 className="text-[24px] leading-tight text-primary-text">{value.title}</h2>
                      <span className="font-mono text-[10px] tracking-[0.14em] text-primary-text/50">0{index + 1}</span>
                    </div>
                    <p className="relative mt-4 text-[14px] leading-[1.8] text-primary-text-2">{valueCopy[value.title]}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Principal's message */}
      <section className="pb-20 lg:pb-28">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <div className="group relative mx-auto max-w-[420px] lg:mx-0">
                <div className="relative overflow-hidden rounded-[28px] border-[6px] border-white/80 shadow-[0_36px_70px_-44px_rgba(42,22,27,0.55)]">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
                    alt="Dr. Robert J. Anderson, Principal"
                    className="block h-[400px] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05] sm:h-[480px]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="absolute -bottom-2 right-2 z-[2] rounded-2xl border border-white/45 bg-white/18 px-5 py-4 text-primary-text opacity-0 shadow-[0_10px_30px_rgba(17,17,17,0.12),inset_0_1px_0_rgba(255,255,255,0.55)] ring-1 ring-white/20 backdrop-blur-xl backdrop-saturate-150 transition-opacity duration-300 group-hover:opacity-100 sm:-right-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em]">In service</p>
                  <p className="mt-1 font-serif text-[30px] leading-none">32 years</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-7">
              <SectionHeading
                eyebrow="From the principal's desk"
                title={
                  <>
                    A message of <span className="highlight highlight--outline">welcome</span>
                  </>
                }
              />
              <Quote className="mt-7 h-9 w-9 text-coral-orange/40" aria-hidden="true" />
              <blockquote className="mt-3 font-serif text-[22px] leading-[1.5] text-primary-text sm:text-[26px]">
                “At St. Augustine&rsquo;s College, we believe that education is not merely the
                acquisition of knowledge, but the formation of character, the cultivation of wisdom,
                and the preparation for a life of purpose and service.”
              </blockquote>
              <p className="mt-5 text-[15px] leading-[1.8] text-primary-text-2">
                Our commitment to academic excellence is matched only by our dedication to nurturing
                the whole person—intellectually, morally, and socially. As you explore our
                institution, I invite you to discover the vibrant community of scholars, educators
                and learners who call St. Augustine&rsquo;s home.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6">
                <div>
                  <p className="font-serif text-[19px] text-primary-text">Dr. Robert J. Anderson</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-secondary-text">
                    Principal, St. Augustine&rsquo;s College
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentPage('faculty')}
                  className="btn btn--outline"
                >
                  Faculty & staff
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* History */}
      <section ref={journeySectionRef} className="border-y border-rule bg-main-bg/45 py-20 lg:py-28">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Our journey"
              title={
                <>
                  Four decades, <span className="highlight">one purpose</span>
                </>
              }
              description="From humble beginnings to becoming a premier institution, our journey reflects an unwavering commitment to educational excellence."
              align="center"
            />
          </Reveal>

          <div className="relative mx-auto mt-12 max-w-4xl lg:mt-16">
            <span
              ref={journeyLineRef}
              className="absolute bottom-0 left-[15px] top-2 w-px bg-rule-2 lg:left-1/2"
              aria-hidden="true"
            />
            <span
              ref={journeyPointRef}
              className="absolute left-[15px] top-2 z-[1] h-[11px] w-[11px] -translate-x-1/2 rounded-full bg-coral-orange shadow-[0_0_0_3px_rgba(255,86,56,0.16)] lg:left-1/2"
              aria-hidden="true"
            />
            <ol className="relative m-0 list-none space-y-8 p-0 lg:space-y-0">
              {timeline.map((item, index) => {
                const alignRight = index % 2 === 1;
                return (
                  <li key={item.year} className="relative lg:grid lg:grid-cols-2 lg:gap-14">
                    <div
                      ref={(el) => {
                        journeyItemRefs.current[index] = el;
                      }}
                      className={
                        alignRight
                          ? 'lg:col-start-2 lg:flex lg:items-center lg:py-12'
                          : 'lg:col-start-1 lg:flex lg:items-center lg:justify-end lg:py-12 lg:text-right'
                      }
                    >
                      <div className="relative w-full rounded-[22px] bg-main-bg p-6 shadow-[0_18px_36px_-32px_rgba(42,22,27,0.4)] lg:inline-block lg:max-w-[420px]">
                        <p className="font-serif text-[34px] leading-none text-coral-orange sm:text-[38px]">
                          {item.year}
                        </p>
                        <h3 className="mt-3 font-serif text-[20px] leading-tight text-primary-text">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-[13.5px] leading-[1.75] text-primary-text-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="relative overflow-hidden bg-coral-orange py-20 text-white-surface lg:py-28">
        <div className="pattern-bg pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden="true" />
        <div className="container relative">
          <Reveal>
            <SectionHeading
              eyebrow="Our leadership"
              title={
                <>
                  Guiding <span className="italic text-[#d5a63c]">excellence</span>
                </>
              }
              description="Dedicated professionals committed to upholding our standards of academic excellence and student success."
              action={
                <button
                  type="button"
                  onClick={() => setCurrentPage('contact')}
                  className="btn btn--on-dark"
                >
                  Contact the office
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              }
              tone="dark"
            />
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((leader, index) => (
              <Reveal key={leader.name} delay={index * 70}>
                <article className="group relative h-full overflow-hidden rounded-[24px] border border-white/40 bg-[linear-gradient(160deg,rgba(255,255,255,0.18),rgba(255,255,255,0.05)_45%,rgba(186,230,253,0.12))] shadow-[0_10px_36px_rgba(17,17,17,0.12),inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-white/15 backdrop-blur-[28px] backdrop-saturate-150 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-white/60 hover:shadow-[0_24px_52px_rgba(17,17,17,0.18),inset_0_1px_0_rgba(255,255,255,0.5)] hover:ring-white/25 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-28 bg-gradient-to-b from-white/25 via-white/5 to-transparent transition-opacity duration-300 group-hover:from-white/40" aria-hidden="true" />
                  <div className="pointer-events-none absolute -left-8 top-10 z-0 h-24 w-24 rounded-full bg-cyan-100/15 blur-2xl transition-all duration-500 group-hover:left-0 group-hover:bg-cyan-100/28" aria-hidden="true" />
                  <div className="img-hover relative z-[1] h-[260px] overflow-hidden">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#e44a2e]/80 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-coral-orange-deep/80 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[#d5a63c] backdrop-blur">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="relative z-[1] p-5">
                    <h3 className="font-serif text-[20px] leading-tight text-white-surface">
                      {leader.name}
                    </h3>
                    <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#d5a63c]">
                      {leader.role}
                    </p>
                    <p className="mt-2 text-[12px] leading-relaxed text-white-surface/60">
                      {leader.qualifications}
                    </p>
                    <p className="mt-4 border-t border-paper/15 pt-4 text-[13px] italic leading-relaxed text-white-surface/80">
                      “{leader.message}”
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="border-t border-rule bg-main-bg/45 py-20 lg:py-28">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Infrastructure"
              title={
                <>
                  Spaces built for <span className="highlight highlight--outline">discovery</span>
                </>
              }
              description="Our campus is designed to provide the optimal environment for academic pursuit, research and holistic development."
              action={
                <button
                  type="button"
                  onClick={() => setCurrentPage('campus-life')}
                  className="btn btn--outline"
                >
                  Campus life
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              }
            />
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility, index) => {
              const Icon = facility.icon;
              return (
                <Reveal key={facility.title} delay={(index % 3) * 70}>
                  <article className="group h-full rounded-[24px] border border-rule bg-main-bg p-6 transition-all duration-500 hover:-translate-y-1 hover:border-rule-2 hover:shadow-[0_26px_50px_-34px_rgba(42,22,27,0.4)] sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-main-bg text-coral-orange transition-all duration-300 ease-out group-hover:scale-105 group-hover:bg-coral-orange group-hover:text-white group-hover:shadow-[0_10px_22px_-12px_rgba(255,86,56,0.65)] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                        <Icon className="h-5 w-5 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6 motion-reduce:transition-none motion-reduce:group-hover:transform-none" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.12em] text-secondary-text">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 font-serif text-[20px] leading-tight text-primary-text">
                      {facility.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-[1.75] text-primary-text-2">
                      {facility.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-[22px] border border-rule bg-main-bg px-6 py-5">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-coral-orange" aria-hidden="true" />
                <p className="text-[13.5px] text-primary-text-2">
                  NAAC A+ accredited · Recognised by the State Higher Education Council
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-coral-orange" aria-label="Five star rating">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true" />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="pt-20 lg:pt-28">
        <CallToAction
          title={
            <>
              Become part of our <span className="italic text-[#d5a63c]">legacy</span>
            </>
          }
          description="Join the St. Augustine's community and begin your journey toward academic excellence and personal growth."
          onPrimary={() => setCurrentPage('admission')}
          onSecondary={() => setCurrentPage('contact')}
        />
      </div>
    </div>
  );
}
