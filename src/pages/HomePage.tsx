import { useState, type CSSProperties, type ReactNode } from 'react';
import heroImage from '../image/hero_image.jpg';
import researchLaboratoryImage from '../image/research_laboratory.jpg';
import smartClassroomImage from '../image/smart_classroom.jpg';
import libraryImage from '../image/library.jpg';
import modernCampusImage from '../image/modern_campus.jpg';
import sportActivitiesImage from '../image/sport_activities.jpg';
import sportWellbeingImage from '../image/sport_wellbeing.jpg';
import campusFestivalImage from '../image/campus_festival.jpg';
import convocationImage from '../image/convocation.jpg';
import libraryActivityImage from '../image/library_activity.jpg';
import collegeSectionImage from '../image/colllege_section.jpg';
import microscopeImage from '../image/microscope.png';
import commerceImage from '../image/commerce.png';
import computerApplicationImage from '../image/computer_application.png';
import masterOfScienceImage from '../image/master_of_science.png';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Building2,
  GraduationCap,
  Library,
  MapPin,
  Microscope,
  Monitor,
  Quote,
  Trophy,
} from 'lucide-react';
import { CallToAction } from '../components/CallToAction';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

type HeroTileBase = {
  left: number;
  top: number;
  width: number;
  height: number;
  radius: string;
  z?: number;
};

type HeroTile =
  | (HeroTileBase & {
      kind: 'photo';
      priority?: boolean;
    })
  | (HeroTileBase & {
      kind: 'info';
      content?: ReactNode;
      /** Show the same shared hero image through this box (masked to coordinates) with a pale-blue tint. */
      showImage?: boolean;
    });

/**
 * ONLY photographic source: src/image/hero_image.jpg (874×642, landscape).
 * Tune this single shared focus to align the subject across all clipped windows.
 * All photo tiles use identical coordinate math + the same object position.
 */
const heroPortraitFocus = '50% 22%';

function photoMaskStyle(tile: HeroTileBase): CSSProperties {
  return {
    position: 'absolute',
    left: `${(-tile.left * 100) / tile.width}%`,
    top: `${(-tile.top * 100) / tile.height}%`,
    width: `${10000 / tile.width}%`,
    height: `${10000 / tile.height}%`,
    maxWidth: 'none',
    maxHeight: 'none',
    objectFit: 'cover',
    objectPosition: heroPortraitFocus,
    transform: 'scale(1.02)',
    transformOrigin: heroPortraitFocus,
    display: 'block',
    userSelect: 'none',
    pointerEvents: 'none',
  };
}

function CoralEightPointStar({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="#FF5733">
      <path d="M12 1.8l2.05 5.06 5.45.28-4.25 3.43 1.42 5.27L12 12.9l-4.67 2.94 1.42-5.27-4.25-3.43 5.45-.28L12 1.8z" />
      <path d="M12 1.8l.84 5.4 5.36-1.03-3.68 4.03 3.68 4.03-5.36-1.03L12 17.23l-.84-5.4-5.36 1.03 3.68-4.03-3.68-4.03 5.36 1.03L12 1.8z" opacity="0.92" />
    </svg>
  );
}

/**
 * Geometric hero composition (reference-proportioned, 1240×930 coordinate system)
 * implemented with the existing hero_image.jpg as the ONLY photo source.
 *
 * Top row: pale-blue rounded square (doc icon) | tall rounded photo (upper subject) | pale-blue rounded square (cap icon)
 * Middle row: pale-blue arch info tile | prominent rounded portrait (focus) | pale-blue arch info tile + Login pill
 * Bottom row: wide curved photo (lower portion of same image)
 *
 * All photo windows share one coordinate system (identical scaling/position/focus) so the
 * photograph reads as continuous behind white gutters.
 */
function ModularHeroPortrait({
  src,
  alt,
  priority = false,
  setCurrentPage,
  onLogin,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  setCurrentPage: (page: string) => void;
  onLogin?: () => void;
}) {
  // Reference composition: 1240 (w) × 930 (h) — converted to % for responsive scaling.
  const W = 1240;
  const H = 930;
  const p = (x: number, base: number) => (x / base) * 100;

  // Balanced gutters derived from spec sizes (keeps shapes/proportions faithful).
  const g = 14; // px gutter
  const topY = 0;
  const topHLeft = 265;
  const topHCenter = 280;
  const topHRight = 265;
  const topWLeft = 290;
  const topWCenter = 390;
  const topWRight = 290;
  const topTotal = topWLeft + g + topWCenter + g + topWRight; // 998
  const topX = (W - topTotal) / 2; // 121

  const midY = 292; // below tallest top tile + gutter
  const midH = 425;
  const midWLeft = 400;
  const midWCenter = 425;
  const midWRight = 390;
  const midG = (W - (midWLeft + midWCenter + midWRight)) / 2; // 12.5
  const midXLeft = 0;
  const midXCenter = midWLeft + midG; // 412.5
  const midXRight = midXCenter + midWCenter + midG; // 850

  const botY = 729;
  const botW = 1150;
  const botH = 201; // fits within 930
  const botX = (W - botW) / 2; // 45

  const rSquare = '30px';
  const rPhoto = '32px';
  const rArch = '999px 999px 34px 34px';
  const rBottom = '140px 140px 44px 44px / 92px 92px 44px 44px';

  const tiles: HeroTile[] = [
    // TOP ROW
    {
      kind: 'info',
      showImage: true,
      left: p(topX, W),
      top: p(topY, H),
      width: p(topWLeft, W),
      height: p(topHLeft, H),
      radius: rSquare,
      content: (
        <div className="flex h-full w-full items-center justify-center">
          <BookOpen className="h-[34%] w-[34%] text-white drop-shadow-[0_1px_8px_rgba(17,17,17,0.45)]" strokeWidth={1.75} aria-hidden="true" />
        </div>
      ),
    },
    {
      kind: 'photo',
      left: p(topX + topWLeft + g, W),
      top: p(topY, H),
      width: p(topWCenter, W),
      height: p(topHCenter, H),
      radius: rPhoto,
    },
    {
      kind: 'info',
      showImage: true,
      left: p(topX + topWLeft + g + topWCenter + g, W),
      top: p(topY, H),
      width: p(topWRight, W),
      height: p(topHRight, H),
      radius: rSquare,
      content: (
        <div className="flex h-full w-full items-center justify-center">
          <GraduationCap className="h-[36%] w-[36%] text-white drop-shadow-[0_1px_8px_rgba(17,17,17,0.45)]" strokeWidth={1.75} aria-hidden="true" />
        </div>
      ),
    },

    // MIDDLE ROW
    {
      kind: 'info',
      showImage: true,
      left: p(midXLeft, W),
      top: p(midY, H),
      width: p(midWLeft, W),
      height: p(midH, H),
      radius: rArch,
      content: (
        <div className="relative h-full w-full">
          <div className="absolute inset-x-0 top-0 flex h-full items-center">
            <p
              className="px-[11%] pt-[6%] font-sans text-[clamp(13px,1.55vw,22px)] font-semibold leading-[1.18] tracking-[-0.02em] text-[#111827]"
            >
              Your Journey to
              <br />
              Excellence Begins
              <br />
              Here.
            </p>
          </div>
          <CoralEightPointStar className="absolute bottom-[11%] left-[13%] h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]" />
        </div>
      ),
    },
    {
      kind: 'photo',
      priority: true,
      left: p(midXCenter, W),
      top: p(midY, H),
      width: p(midWCenter, W),
      height: p(midH, H),
      radius: rPhoto,
      z: 2,
    },
    {
      kind: 'info',
      showImage: true,
      left: p(midXRight, W),
      top: p(midY, H),
      width: p(midWRight, W),
      height: p(midH, H),
      radius: rArch,
      content: (
        <div className="relative h-full w-full">
          <div className="absolute inset-x-0 top-0 flex h-full items-center justify-end">
            <p className="px-[11%] pt-[4%] text-right font-sans text-[clamp(13px,1.45vw,21px)] font-semibold leading-[1.2] tracking-[-0.02em] text-[#111827]">
              Education Beyond
              <br />
              Boundaries
            </p>
          </div>
          <button
            type="button"
            onClick={onLogin ?? (() => setCurrentPage('login'))}
            className="absolute bottom-[12%] right-[12%] inline-flex items-center gap-1.5 rounded-full border border-[#FF5733] bg-transparent px-3 py-1 font-sans text-[11px] font-semibold text-[#FF5733] transition-colors duration-200 hover:bg-[#FF5733] hover:text-white sm:px-3.5 sm:text-[12px]"
          >
            Login
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      ),
    },

    // BOTTOM ROW — wide shallow curved photo (lower portion of SAME image)
    {
      kind: 'photo',
      left: p(botX, W),
      top: p(botY, H),
      width: p(botW, W),
      height: p(botH, H),
      radius: rBottom,
    },
  ];

  return (
    <div
      className="relative mx-auto w-full max-w-[1240px] bg-white"
      style={{ aspectRatio: '1240 / 930' }}
      role="img"
      aria-label={alt}
    >
      {tiles.map((tile, index) => {
        const commonStyle: CSSProperties = {
          position: 'absolute',
          left: `${tile.left}%`,
          top: `${tile.top}%`,
          width: `${tile.width}%`,
          height: `${tile.height}%`,
          borderRadius: tile.radius,
          overflow: 'hidden',
          zIndex: tile.z ?? 1,
        };

        if (tile.kind === 'info') {
          return (
            <div
              key={`info-${index}`}
              style={{ ...commonStyle, backgroundColor: tile.showImage ? 'transparent' : '#FFFFFF' }}
              aria-hidden={tile.content ? undefined : true}
            >
              {tile.showImage && (
                <img
                  src={src}
                  alt=""
                  aria-hidden="true"
                  style={photoMaskStyle(tile)}
                  loading={priority ? 'eager' : 'lazy'}
                  decoding="async"
                  draggable={false}
                />
              )}
              <div className="relative z-[1] h-full w-full">{tile.content}</div>
            </div>
          );
        }

        const isPrimaryPhoto = tile.priority === true;

        return (
          <div key={`photo-${index}`} style={{ ...commonStyle, backgroundColor: '#ffffff' }}>
            <img
              src={src}
              alt={isPrimaryPhoto ? alt : ''}
              aria-hidden={isPrimaryPhoto ? undefined : true}
              style={photoMaskStyle(tile)}
              loading={priority || tile.priority ? 'eager' : 'lazy'}
              fetchPriority={priority && isPrimaryPhoto ? 'high' : 'auto'}
              decoding="async"
              draggable={false}
            />
          </div>
        );
      })}
    </div>
  );
}

export function HomePage({ setCurrentPage }: HomePageProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const hero = {
    lead: 'Excellence in ',
    highlight: 'education',
    tail: ' since 1985',
    description:
      'Nurturing minds, building character, and shaping the leaders of tomorrow through academic rigor and holistic development.',
  };

  const stats = [
    { value: '1200+', label: 'Students enrolled' },
    { value: '50+', label: 'Expert faculty' },
    { value: '25+', label: 'Academic programs' },
    { value: '150+', label: 'Awards & honors' },
  ];

  const programs = [
    { name: 'Bachelor of Science', duration: '3 Years', students: '350+', category: 'Undergraduate' },
    { name: 'Bachelor of Commerce', duration: '3 Years', students: '400+', category: 'Undergraduate' },
    {
      name: 'Bachelor of Computer Applications',
      duration: '3 Years',
      students: '300+',
      category: 'Undergraduate',
    },
    { name: 'Master of Science', duration: '2 Years', students: '150+', category: 'Postgraduate' },
  ];

  const facilities = [
    {
      icon: Microscope,
      title: 'Research laboratories',
      description:
        'Physics, chemistry, and biology labs equipped with modern instruments for hands-on research.',
      image: researchLaboratoryImage,
    },
    {
      icon: Monitor,
      title: 'Smart classrooms',
      description:
        'Interactive digital learning environments with advanced audiovisual systems and collaborative tools.',
      image: smartClassroomImage,
    },
    {
      icon: Library,
      title: 'Central library',
      description:
        'Over 50,000 volumes, digital archives, and quiet study spaces conducive to scholarly pursuit.',
      image: libraryImage,
    },
    {
      icon: Building2,
      title: 'Modern campus',
      description:
        'Sprawling 50-acre campus with landscaped gardens, sports facilities, and sustainable infrastructure.',
      image: modernCampusImage,
    },
    {
      icon: Trophy,
      title: 'Sports complex',
      description:
        'Multi-sport facilities for athletics, recreation, and a healthy campus culture.',
      image: sportActivitiesImage,
    },
  ];

  const campusMoments = [
    {
      image:
        'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=900&q=80',
      title: 'Convocation',
      caption: 'Celebrating the class of 2024',
    },
    {
      image:
        'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=80',
      title: 'The library',
      caption: 'A quiet place to think',
    },
    {
      image:
        'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80',
      title: 'Campus festivals',
      caption: 'Arts, culture and community',
    },
    {
      image: sportWellbeingImage,
      title: 'Sport & wellbeing',
      caption: 'A healthy, active campus',
    },
  ];

  const events = [
    { date: '15', month: 'Jan', title: 'Annual Science Exhibition 2024', location: 'Main Auditorium' },
    { date: '22', month: 'Jan', title: 'Inter-College Sports Meet', location: 'Sports Complex' },
    { date: '05', month: 'Feb', title: 'Cultural Festival - Heritage Week', location: 'Campus-wide' },
    { date: '14', month: 'Feb', title: 'Career Guidance Symposium', location: 'Conference Hall' },
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Mitchell',
      role: 'Parent & medical professional',
      text: 'The academic rigor combined with genuine care for student wellbeing sets St. Augustine’s apart. My daughter has flourished here in ways I couldn’t have imagined.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
    },
    {
      name: 'Rajesh Kumar',
      role: 'Alumni, class of 2020',
      text: 'The foundation I built at St. Augustine’s opened doors to opportunities I never thought possible. The faculty’s mentorship was invaluable to my success.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    },
    {
      name: 'Prof. Elizabeth Chen',
      role: 'Faculty, department of sciences',
      text: 'Teaching here is a privilege. The students’ curiosity and dedication inspire me daily to push the boundaries of academic excellence.',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&q=80',
    },
    {
      name: 'Michael Thompson',
      role: 'Alumni, software engineer at Google',
      text: 'The practical exposure and industry-relevant curriculum at St. Augustine’s prepared me exceptionally well for my career in technology.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    },
  ];

  const activeQuote = testimonials[activeTestimonial];

  return (
    <div className="bg-main-bg text-primary-text-2">
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden pb-12 pt-8 sm:pt-12 lg:pb-20 lg:pt-14">
        {/* Pale blue geometric backdrop elements */}
        <div
          className="pointer-events-none absolute -right-24 top-[10%] h-[480px] w-[480px] rounded-[36px_36px_12px_12px] bg-[color-mix(in_srgb,#E6EEF6_22%,transparent)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-24 bottom-[8%] h-[380px] w-[380px] rounded-[28px_28px_10px_10px] bg-[color-mix(in_srgb,#E6EEF6_14%,transparent)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-[20%] left-1/2 h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-[color-mix(in_srgb,#FF5638_12%,transparent)] blur-[40px]"
          aria-hidden="true"
        />

        <div className="container relative">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6 xl:col-span-5">
              <p className="eyebrow">A college of excellence · since 1985</p>

              <h1 className="mt-6 text-[clamp(2.9rem,6.6vw,5.5rem)] font-medium leading-[0.96] tracking-[-0.035em] text-primary-text">
                {hero.lead}
                <span className="highlight highlight--coral">
                  {hero.highlight}
                </span>
                {hero.tail}
              </h1>

              <p className="mt-6 max-w-[43ch] text-[16px] leading-[1.75] text-primary-text-2 sm:text-[17px]">
                {hero.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentPage('admission')}
                  className="btn btn--primary"
                >
                  Begin your application
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage('courses')}
                  className="btn btn--ghost"
                >
                  Explore programs
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-9 flex items-center gap-4 border-t border-rule pt-6">
                <div className="flex -space-x-3">
                  {testimonials.slice(0, 3).map((person) => (
                    <img
                      key={person.name}
                      src={person.image}
                      alt=""
                      className="h-9 w-9 rounded-full border-2 border-paper object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-primary-text">1,200+ students, one community</p>
                  <p className="text-[12px] text-secondary-text">Curiosity, character and care — since 1985.</p>
                </div>
              </div>
            </div>

            {/* Hero visual composition — geometric image masking (single shared hero_image.jpg) */}
            <div className="lg:col-span-6 xl:col-span-7">
              <div className="mx-auto w-full max-w-[1240px] lg:mr-0">
                <ModularHeroPortrait
                  src={heroImage}
                  alt="Students at St. Augustine's College"
                  priority={true}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Figures ---------------- */}
      <section className="relative z-10 lg:-mt-2">
        <div className="container">
          <Reveal>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] border border-rule bg-rule shadow-[0_24px_50px_-38px_rgba(17,17,17,0.35)] lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="group bg-main-bg px-5 py-7 transition-colors duration-300 hover:bg-white-surface/60 sm:px-7 sm:py-9"
                >
                  <div className="flex items-start justify-between">
                    <p className="font-serif text-[38px] leading-none text-coral-orange sm:text-[46px]">
                      {stat.value}
                    </p>
                    <span className="mt-1 font-mono text-[9px] text-secondary-text">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="mt-3 text-[12px] font-medium uppercase tracking-[0.06em] text-primary-text-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- About ---------------- */}
      <section className="section">
        <div className="container grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              eyebrow="The college"
              title={
                <>
                  A distinguished <span className="highlight highlight--coral">legacy</span> of academic excellence
                </>
              }
            />
            <div className="mt-6 space-y-4">
              <p className="text-[15px] leading-[1.8] text-primary-text-2">
                Founded in 1985, St. Augustine’s College has stood as a pillar of educational
                excellence for nearly four decades. Our institution has consistently produced
                scholars, professionals, and leaders who have made significant contributions to
                society across various fields.
              </p>
              <p className="text-[15px] leading-[1.8] text-primary-text-2">
                With a distinguished faculty of over 50 educators, state-of-the-art infrastructure,
                and a commitment to holistic development, we continue to uphold our founding vision
                of nurturing excellence in every student.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setCurrentPage('about')}
              className="btn btn--ghost mt-6 border border-white/45 bg-white-surface/35 text-coral-orange shadow-[0_10px_24px_-18px_rgba(17,17,17,0.25)] backdrop-blur-md hover:bg-white-surface/55"
            >
              Our story
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <div className="relative pb-14 pl-0 sm:pl-8 lg:pl-14">
              <div className="img-hover overflow-hidden rounded-[32px]">
                <img
                  src={collegeSectionImage}
                  alt="St. Augustine's College campus"
                  className="h-[340px] w-full object-cover sm:h-[420px] lg:h-[470px]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Facilities ---------------- */}
      <section className="pb-20 lg:pb-28">
        <div className="container">
          <Reveal>
            <div className="relative overflow-hidden rounded-[36px] border border-white/40 bg-coral-orange/12 glass--coral px-5 py-12 text-primary-text shadow-[0_32px_70px_-46px_rgba(17,17,17,0.22)] backdrop-blur-xl sm:px-8 lg:px-14 lg:py-16">
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-coral-orange/10 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-pale-blue/45 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-4 lg:flex lg:flex-col lg:justify-center lg:h-full">
                  <p className="eyebrow">Teaching & research</p>
                  <h2 className="mt-4 max-w-[11ch] text-primary-text">
                    Spaces that make <span className="italic text-coral-orange">discovery</span> possible.
                  </h2>
                  <p className="mt-5 max-w-[38ch] text-[14.5px] leading-[1.75] text-secondary-text">
                    Purpose-built spaces where theory meets practice, from wet labs to networked
                    classrooms.
                  </p>
                  <button
                    type="button"
                    onClick={() => setCurrentPage('campus-life')}
                    className="btn btn--primary mt-7"
                  >
                    Explore campus life
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                <div className="lg:col-span-8">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {facilities.map((facility, index) => {
                      const Icon = facility.icon;
                      return (
                        <article
                          key={facility.title}
                          className={`group relative overflow-hidden rounded-[22px] border border-white/45 bg-white-surface/15 shadow-[0_16px_34px_-26px_rgba(17,17,17,0.35)] backdrop-blur-sm ${
                            index === 0 ? 'sm:col-span-2' : ''
                          }`}
                        >
                          <img
                            src={facility.image}
                            alt={facility.title}
                            className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${
                              index === 0 ? 'h-[220px]' : 'h-[180px]'
                            }`}
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute inset-x-0 bottom-0 p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex items-center gap-2.5">
                              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/35 bg-white-surface/20 text-white-surface backdrop-blur-sm">
                                <Icon className="h-4 w-4" aria-hidden="true" />
                              </span>
                              <h3 className="font-serif text-[19px] leading-tight text-white-surface">
                                {facility.title}
                              </h3>
                            </div>
                            <p className="mt-2 max-w-[46ch] text-[12.5px] leading-relaxed text-white-surface/80">
                              {facility.description}
                            </p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Programs ---------------- */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Academic programs"
              title={
                <>
                  Find your <span className="highlight highlight--outline">direction</span>
                </>
              }
              description="Undergraduate and postgraduate programs designed for depth, flexibility and a genuine intellectual challenge."
              action={
                <button
                  type="button"
                  onClick={() => setCurrentPage('courses')}
                  className="btn btn--outline"
                >
                  All programs
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              }
            />
          </Reveal>

          <div className="mt-10 border-t border-rule">
            {programs.map((program, index) => (
              <Reveal key={program.name} delay={index * 60}>
                <button
                  type="button"
                  onClick={() => setCurrentPage('courses')}
                  className="group relative grid w-full grid-cols-[2rem_1fr_2.75rem] items-center gap-x-3 gap-y-2 border-b border-rule py-5 text-left transition-colors duration-300 hover:bg-main-bg/40 sm:py-6 lg:grid-cols-12 lg:gap-x-6 lg:px-3"
                >
                  {program.name === 'Bachelor of Science' && (
                    <img
                      src={microscopeImage}
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute right-14 top-1/2 h-12 w-12 -translate-y-1/2 object-contain opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:right-16 sm:h-14 sm:w-14 lg:right-[20%]"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  {program.name === 'Bachelor of Commerce' && (
                    <img
                      src={commerceImage}
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute right-14 top-1/2 h-12 w-12 -translate-y-1/2 object-contain opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:right-16 sm:h-14 sm:w-14 lg:right-[20%]"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  {program.name === 'Bachelor of Computer Applications' && (
                    <img
                      src={computerApplicationImage}
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute right-14 top-1/2 h-12 w-12 -translate-y-1/2 object-contain opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:right-16 sm:h-14 sm:w-14 lg:right-[20%]"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  {program.name === 'Master of Science' && (
                    <img
                      src={masterOfScienceImage}
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute right-14 top-1/2 h-12 w-12 -translate-y-1/2 object-contain opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:right-16 sm:h-14 sm:w-14 lg:right-[20%]"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <span className="font-mono text-[10px] tracking-[0.1em] text-coral-orange">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="lg:col-span-5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-secondary-text">
                      {program.category}
                    </p>
                    <h3 className="mt-1 font-serif text-[21px] leading-tight text-primary-text transition-colors group-hover:text-coral-orange sm:text-[24px]">
                      {program.name}
                    </h3>
                    <p className="mt-1 text-[12px] text-secondary-text lg:hidden">
                      {program.duration} · {program.students} students
                    </p>
                  </div>

                  <div className="hidden lg:col-span-2 lg:block">
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-secondary-text">Duration</p>
                    <p className="mt-1 text-[14px] text-primary-text-2">{program.duration}</p>
                  </div>

                  <div className="hidden lg:col-span-2 lg:block">
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-secondary-text">Students</p>
                    <p className="mt-1 text-[14px] text-primary-text-2">{program.students}</p>
                  </div>

                  <div className="col-start-3 flex justify-end lg:col-span-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-rule-2 text-coral-orange transition-all duration-300 group-hover:border-coral-orange group-hover:bg-coral-orange group-hover:text-white-surface">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Campus life ---------------- */}
      <section className="bg-white-surface/40 py-20 lg:py-28">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Life at St. Augustine’s"
              title={
                <>
                  Beyond the <span className="highlight highlight--coral">lecture hall</span>
                </>
              }
              description="Clubs, sport, service and celebration. The college is a community you join, not just a campus you attend."
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

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Convocation - col 1-2, row 1 */}
            <Reveal className="sm:col-span-2 lg:col-span-2">
              <button
                type="button"
                onClick={() => setCurrentPage('gallery')}
                className="img-hover group relative block h-[220px] w-full overflow-hidden rounded-[28px] text-left sm:h-[260px] lg:h-[280px]"
              >
                <img
                  src={convocationImage}
                  alt={campusMoments[0].title}
                  className="h-full w-full object-cover group-hover:scale-[1.05]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-6">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-coral-orange/80">
                    {campusMoments[0].caption}
                  </p>
                  <p className="mt-1 font-serif text-[22px] text-white-surface sm:text-[26px]">{campusMoments[0].title}</p>
                </div>
              </button>
            </Reveal>

            {/* Library - col 3, row 1 */}
            <Reveal className="sm:col-span-1 lg:col-span-1">
              <button
                type="button"
                onClick={() => setCurrentPage('gallery')}
                className="img-hover group relative block h-[200px] w-full overflow-hidden rounded-[22px] text-left sm:h-[220px] lg:h-[280px]"
              >
                <img
                  src={libraryActivityImage}
                  alt={campusMoments[1].title}
                  className="h-full w-full object-cover group-hover:scale-[1.05]"
                  loading="lazy"
                  decoding="async"
                />
                <p className="absolute inset-x-0 bottom-0 p-4 font-serif text-[18px] text-white-surface opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {campusMoments[1].title}
                </p>
              </button>
            </Reveal>

            {/* Campus festivals - col 4, row 1 */}
            <Reveal className="sm:col-span-1 lg:col-span-1">
              <button
                type="button"
                onClick={() => setCurrentPage('gallery')}
                className="img-hover group relative block h-[200px] w-full overflow-hidden rounded-[22px] text-left sm:h-[220px] lg:h-[280px]"
              >
                <img
                  src={campusFestivalImage}
                  alt={campusMoments[2].title}
                  className="h-full w-full object-cover group-hover:scale-[1.05]"
                  loading="lazy"
                  decoding="async"
                />
                <p className="absolute inset-x-0 bottom-0 p-4 font-serif text-[18px] text-white-surface opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {campusMoments[2].title}
                </p>
              </button>
            </Reveal>

            {/* Sport & wellbeing - col 2-3, row 2 */}
            <Reveal className="sm:col-span-2 lg:col-span-2 lg:col-start-2 lg:row-start-2">
              <button
                type="button"
                onClick={() => setCurrentPage('gallery')}
                className="img-hover group relative block h-[220px] w-full overflow-hidden rounded-[22px] text-left sm:h-[240px] lg:h-[280px]"
              >
                <img
                  src={campusMoments[3].image}
                  alt={campusMoments[3].title}
                  className="h-full w-full object-cover group-hover:scale-[1.05]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                <p className="absolute inset-x-0 bottom-0 p-4 font-serif text-[18px] text-white-surface opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {campusMoments[3].title}
                </p>
              </button>
            </Reveal>

            {/* Text box - col 4, row 1-2 */}
            <Reveal delay={180} className="col-span-1 sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:col-start-4">
              <div className="flex h-full flex-col justify-between rounded-[26px] border border-white/45 bg-white-surface/55 glass--coral p-6 text-primary-text shadow-[0_18px_40px_-28px_rgba(17,17,17,0.22)] backdrop-blur-md sm:p-7">
                <div>
                  <p className="eyebrow text-secondary-text">The full experience</p>
                  <p className="mt-4 font-serif text-[25px] leading-[1.1] text-primary-text">
                    Find your people. Make your mark.
                  </p>
                  <ul className="mt-5 space-y-2.5 text-[13px] text-primary-text-2">
                    {['Clubs & societies', 'Sport & athletics', 'Arts & culture', 'Community service'].map(
                      (item) => (
                        <li key={item} className="flex items-center gap-2.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-coral-orange" aria-hidden="true" />
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentPage('campus-life')}
                  className="mt-6 inline-flex items-center gap-2 border-t border-rule pt-4 text-[12px] font-semibold text-coral-orange transition-colors hover:text-primary-text"
                >
                  Explore campus life
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Events ---------------- */}
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <SectionHeading
              eyebrow="On the calendar"
              title={
                <>
                  Upcoming <span className="highlight highlight--coral">events</span>
                </>
              }
              description="Public lectures, exhibitions, sport and celebration — the life of the college, open to our community."
            />
            <div className="mt-8 rounded-2xl border border-rule bg-main-bg/60 p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-secondary-text">Visit the campus</p>
              <p className="mt-2 text-[13px] leading-relaxed text-primary-text-2">
                Guided tours run on weekdays. Our admissions team will arrange a time that suits you.
              </p>
              <button
                type="button"
                onClick={() => setCurrentPage('contact')}
                className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold text-coral-orange transition-colors hover:text-coral-orange"
              >
                Arrange a visit
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </Reveal>

          <div className="lg:col-span-8">
            {events.map((event, index) => (
              <Reveal key={event.title} delay={index * 60}>
                <div className="group flex items-center gap-4 border-b border-rule py-5 transition-colors first:border-t sm:gap-6 sm:py-6">
                  <div className="flex h-[68px] w-[60px] shrink-0 flex-col items-center justify-center rounded-2xl bg-white-surface transition-colors group-hover:bg-coral-orange sm:h-[76px] sm:w-[68px]">
                    <span className="font-serif text-[27px] leading-none text-coral-orange group-hover:text-white-surface">
                      {event.date}
                    </span>
                    <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-coral-orange group-hover:text-primary-text/70">
                      {event.month}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-[19px] leading-tight text-primary-text sm:text-[21px]">
                      {event.title}
                    </h3>
                    <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-secondary-text">
                      <MapPin className="h-3 w-3 shrink-0 text-coral-orange" aria-hidden="true" />
                      {event.location}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="hidden h-5 w-5 shrink-0 text-rule-2 transition-colors group-hover:text-coral-orange sm:block"
                    aria-hidden="true"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Testimonials ---------------- */}
      <section className="pb-20 lg:pb-28">
        <div className="container">
          <Reveal>
            <div className="rounded-[34px] border border-rule bg-main-bg/70 px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
              <div className="flex flex-col justify-between gap-6 border-b border-rule pb-8 md:flex-row md:items-end">
                <SectionHeading
                  eyebrow="In their words"
                  title={
                    <>
                      Voices of our <span className="highlight highlight--coral">community</span>
                    </>
                  }
                />
                <p className="max-w-[34ch] text-[13px] leading-relaxed text-secondary-text md:text-right">
                  Students, alumni, families and faculty on what makes St. Augustine’s feel like home.
                </p>
              </div>

              <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-7">
                  <Quote className="h-9 w-9 text-coral-orange/40" aria-hidden="true" />
                  <blockquote
                    key={activeQuote.name}
                    className="mt-4 animate-fade-in font-serif text-[23px] leading-[1.45] text-primary-text sm:text-[28px]"
                  >
                    “{activeQuote.text}”
                  </blockquote>
                  <div className="mt-7 flex items-center gap-4">
                    <img
                      src={activeQuote.image}
                      alt={activeQuote.name}
                      className="h-12 w-12 rounded-full border-2 border-paper object-cover shadow-sm"
                      loading="lazy"
                      decoding="async"
                    />
                    <div>
                      <p className="text-[14px] font-semibold text-primary-text">{activeQuote.name}</p>
                      <p className="text-[12px] text-secondary-text">{activeQuote.role}</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-secondary-text">Read another story</p>
                  <div className="mt-4 border-t border-rule">
                    {testimonials.map((person, index) => (
                      <button
                        key={person.name}
                        type="button"
                        onClick={() => setActiveTestimonial(index)}
                        onMouseEnter={() => {
                          if (window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) {
                            setActiveTestimonial(index);
                          }
                        }}
                        onFocus={() => setActiveTestimonial(index)}
                        aria-pressed={activeTestimonial === index}
                        className={`group flex w-full items-center gap-3 border-b border-rule py-3.5 text-left transition-colors ${
                          activeTestimonial === index ? '' : 'hover:bg-white-surface/40'
                        }`}
                      >
                        <span
                          className={`font-mono text-[9px] ${
                            activeTestimonial === index ? 'text-coral-orange' : 'text-secondary-text'
                          }`}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <img
                          src={person.image}
                          alt=""
                          className={`h-8 w-8 rounded-full object-cover transition-all ${
                            activeTestimonial === index ? 'ring-2 ring-coral-orange ring-offset-1 ring-offset-main-bg' : 'opacity-70'
                          }`}
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="min-w-0 flex-1">
                          <span
                            className={`block truncate text-[13px] font-semibold ${
                              activeTestimonial === index ? 'text-coral-orange' : 'text-primary-text'
                            }`}
                          >
                            {person.name}
                          </span>
                          <span className="block truncate text-[11px] text-secondary-text">{person.role}</span>
                        </span>
                        <ArrowRight
                          className={`h-3.5 w-3.5 shrink-0 transition-all ${
                            activeTestimonial === index
                              ? 'translate-x-0 text-coral-orange opacity-100'
                              : '-translate-x-1 text-secondary-text opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Close ---------------- */}
      <CallToAction
        title={
          <>
            Begin your journey <span className="italic text-[#d5a63c]">with us</span>
          </>
        }
        description="Join a distinguished community of scholars and embark on a transformative educational experience that will shape your future."
        onPrimary={() => setCurrentPage('admission')}
        onSecondary={() => setCurrentPage('contact')}
      />
    </div>
  );
}
