import { useState, useEffect } from 'react';
import {
  Camera,
  Play,
  Building2,
  Bus,
  BookOpen,
  Clock,
  Shield,
  Wifi,
  ScrollText,
  Image,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { CallToAction } from '../components/CallToAction';
import { getGalleryImages, seedIfEmpty } from '../lib/cms';
import type { GalleryImage } from '../types';

interface CampusLifePageProps {
  setCurrentPage: (page: string) => void;
}

const filters = ['All', 'Campus', 'Events', 'Sports'];

const hostelFacilities = [
  {
    icon: Shield,
    label: '24/7 security',
    desc: 'CCTV surveillance and security personnel round the clock',
  },
  {
    icon: Wifi,
    label: 'High-speed Wi-Fi',
    desc: 'Dedicated internet connectivity across all hostels',
  },
  {
    icon: Building2,
    label: 'Separate hostels',
    desc: 'Well-furnished separate accommodations for boys and girls',
  },
  {
    icon: BookOpen,
    label: 'Study rooms',
    desc: 'Quiet study areas with reference library access',
  },
];

const transportRoutes = [
  { icon: Bus, label: 'City routes', desc: 'Extensive network covering all major city areas' },
  { icon: Shield, label: 'GPS tracked', desc: 'All buses equipped with GPS tracking for safety' },
  { icon: Clock, label: 'Punctual service', desc: 'Strict adherence to schedule for timely commutes' },
  { icon: Wifi, label: 'Online tracking', desc: 'Real-time bus tracking through mobile app' },
];

const libraryInfo = {
  resources: [
    '50,000+ Printed Books & Journals',
    'Online Research Databases',
    'Digital Archives & E-Books',
    'National & International Periodicals',
    'Reference & Thesis Collections',
    'Multimedia Learning Resources',
  ],
  timing: {
    weekdays: '8:00 AM - 8:00 PM',
    weekends: '9:00 AM - 5:00 PM',
    holidays: 'Closed',
  },
  rules: [
    'Silence must be maintained in all reading areas',
    'Books can be issued for 14 days with renewal option',
    'Reference books and periodicals are not for issue',
    'Library card must be presented for borrowing',
    'Digital resources accessible 24/7 through portal',
    'Fine of Rs. 5/day for overdue books',
  ],
};

const videos = [
  {
    title: 'Campus Tour 2024',
    desc: 'A walkthrough of our beautiful campus and state-of-the-art facilities',
    videoId: 'dQw4w9WgXcQ',
    poster: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Annual Cultural Fest',
    desc: 'Highlights from our spectacular cultural festival celebration',
    videoId: 'dQw4w9WgXcQ',
    poster: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Sports & Athletics',
    desc: 'Our students in action at various inter-college sports events',
    videoId: 'dQw4w9WgXcQ',
    poster: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80',
  },
];

export function CampusLifePage({ setCurrentPage }: CampusLifePageProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  useEffect(() => {
    seedIfEmpty();
    setGalleryImages(getGalleryImages());
  }, []);

  const filteredImages =
    activeFilter === 'All'
      ? galleryImages
      : galleryImages.filter((image) => image.category === activeFilter);

  useEffect(() => {
    if (lightboxIndex === null && activeVideo === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxIndex(null);
        setActiveVideo(null);
      }
      if (lightboxIndex !== null && filteredImages.length > 0) {
        if (event.key === 'ArrowLeft') {
          setLightboxIndex((prev) => ((prev ?? 0) - 1 + filteredImages.length) % filteredImages.length);
        }
        if (event.key === 'ArrowRight') {
          setLightboxIndex((prev) => ((prev ?? 0) + 1) % filteredImages.length);
        }
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, activeVideo, filteredImages.length]);

  const currentLightboxImage =
    lightboxIndex !== null ? filteredImages[lightboxIndex] : undefined;

  return (
    <div className="bg-main-bg">
      <PageHero
        eyebrow="Vibrant campus community"
        title={
          <>
            Life at <span className="highlight">St. Augustine&rsquo;s</span>
          </>
        }
        description="Discover a vibrant community where academics, culture, sports and personal growth come together to create an unforgettable college experience."
        setCurrentPage={setCurrentPage}
        facts={[
          { value: '30+', label: 'Clubs' },
          { value: '50 acre', label: 'Campus' },
          { value: '24/7', label: 'Support' },
        ]}
        badge={{ value: 'Live', label: 'Campus life' }}
        primaryLabel="Plan a campus visit"
        primaryPage="contact"
        secondaryLabel="View the gallery"
        secondaryPage="gallery"
      />

      {/* Gallery */}
      <section className="pb-20 lg:pb-28">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Photo gallery"
              title={
                <>
                  Moments from <span className="highlight highlight--outline">campus</span>
                </>
              }
              description="A visual journey through campus life — from academic achievements to cultural celebrations."
              action={
                <button
                  type="button"
                  onClick={() => setCurrentPage('gallery')}
                  className="btn btn--outline"
                >
                  Full gallery
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              }
            />
          </Reveal>

          <div className="mt-7 flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => {
                  setActiveFilter(filter);
                  setLightboxIndex(null);
                }}
                aria-pressed={activeFilter === filter}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[11.5px] font-semibold transition-colors ${
                  activeFilter === filter
                    ? 'border-coral-orange bg-coral-orange text-white-surface'
                    : 'border-rule bg-main-bg text-primary-text-2 hover:border-rule-2 hover:text-coral-orange'
                }`}
              >
                {filter === 'All' && <Image className="h-3.5 w-3.5" aria-hidden="true" />}
                {filter}
              </button>
            ))}
          </div>

          {filteredImages.length > 0 ? (
            <div className="mt-7 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
              {filteredImages.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className="group relative block w-full break-inside-avoid overflow-hidden rounded-[20px] border border-rule text-left"
                  aria-label={`Open image: ${image.caption}`}
                >
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="inline-block rounded-full border border-white-surface/30 bg-white-surface/18 px-2.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.1em] text-white-surface shadow-sm backdrop-blur-md">
                      {image.category}
                    </span>
                    <p className="mt-2 text-[13px] font-medium text-white-surface">{image.caption}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-7 rounded-[24px] border border-rule bg-main-bg/45 px-6 py-16 text-center">
              <Camera className="mx-auto h-8 w-8 text-coral-orange" aria-hidden="true" />
              <p className="mt-4 font-serif text-[24px] text-primary-text">No images in this category yet</p>
              <p className="mt-2 text-[13px] text-primary-text-2">
                Add images through the admin panel, or explore another category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {currentLightboxImage && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${lightboxIndex + 1} of ${filteredImages.length}: ${currentLightboxImage.caption}`}
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-paper/25 bg-main-bg/10 text-white-surface backdrop-blur transition-colors hover:bg-main-bg/20"
            aria-label="Close image viewer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          {filteredImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setLightboxIndex(
                    (lightboxIndex - 1 + filteredImages.length) % filteredImages.length
                  );
                }}
                className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-paper/25 bg-main-bg/10 text-white-surface backdrop-blur transition-colors hover:bg-main-bg/20"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
                }}
                className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-paper/25 bg-main-bg/10 text-white-surface backdrop-blur transition-colors hover:bg-main-bg/20"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </>
          )}

          <div className="max-h-[90vh] max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <img
              src={currentLightboxImage.url}
              alt={currentLightboxImage.caption}
              className="max-h-[76vh] w-auto rounded-[18px] object-contain shadow-2xl"
            />
            <div className="mt-5 text-center">
              <span className="inline-block rounded-full border border-white-surface/30 bg-white-surface/18 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white-surface shadow-sm backdrop-blur-md">
                {currentLightboxImage.category}
              </span>
              <p className="mt-2.5 font-serif text-[20px] text-white-surface">{currentLightboxImage.caption}</p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.12em] text-white-surface/60">
                {lightboxIndex + 1} / {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Video gallery */}
      <section className="relative overflow-hidden bg-coral-orange py-20 text-white-surface lg:py-28">
        <div className="pattern-bg pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden="true" />
        <div className="container relative">
          <Reveal>
            <SectionHeading
              eyebrow="Video gallery"
              title={
                <>
                  Campus in <span className="italic text-soft-coral">motion</span>
                </>
              }
              description="Take a virtual tour and experience the vibrant campus life through our videos."
              tone="dark"
            />
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {videos.map((video, index) => (
              <Reveal key={video.title} delay={index * 60}>
                <button
                  type="button"
                  onClick={() => setActiveVideo(index)}
                  className="group block w-full overflow-hidden rounded-[24px] border border-paper/15 bg-main-bg/[0.06] text-left transition-colors hover:bg-main-bg/[0.11]"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={video.poster}
                      alt={video.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A161B]/80 via-[#2A161B]/20 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-white-surface/30 bg-white-surface/18 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white-surface shadow-sm backdrop-blur-md">
                      Film 0{index + 1}
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white-surface/35 bg-white-surface/20 text-white-surface shadow-xl backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                        <Play className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden="true" />
                      </span>
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-[19px] leading-tight text-white-surface">{video.title}</h3>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-white-surface/70">{video.desc}</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Video modal */}
      {activeVideo !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={videos[activeVideo].title}
          onClick={() => setActiveVideo(null)}
        >
          <div className="w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#FF5638]">
                  Campus film 0{activeVideo + 1}
                </p>
                <h2 className="mt-1 font-serif text-[24px] text-white-surface">{videos[activeVideo].title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-paper/25 bg-main-bg/10 text-white-surface transition-colors hover:bg-main-bg/20"
                aria-label="Close video"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="aspect-video overflow-hidden rounded-[18px] border border-paper/20 bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${videos[activeVideo].videoId}?autoplay=1&rel=0`}
                title={videos[activeVideo].title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="mt-3 text-[13px] text-white-surface/70">{videos[activeVideo].desc}</p>
          </div>
        </div>
      )}

      {/* Hostel & transport */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Facilities"
              title={
                <>
                  Hostel &amp; <span className="highlight">transport</span>
                </>
              }
              description="Comfortable accommodation and reliable transportation services for all students."
              align="center"
            />
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="relative h-full overflow-hidden rounded-[28px] bg-coral-orange p-7 text-white-surface sm:p-9">
                <div className="pattern-bg pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden="true" />
                <div className="relative">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white-surface/30 bg-white-surface/18 text-white-surface shadow-sm backdrop-blur-md">
                    <Building2 className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 font-serif text-[30px] leading-tight text-white-surface">
                    Hostel accommodation
                  </h2>
                  <p className="mt-2 max-w-[44ch] text-[13px] leading-relaxed text-white-surface/70">
                    Our hostels provide a safe, comfortable and conducive environment for students with
                    modern amenities and round-the-clock support staff.
                  </p>
                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    {hostelFacilities.map((facility) => {
                      const Icon = facility.icon;
                      return (
                        <div
                          key={facility.label}
                          className="group flex h-full min-h-[96px] items-start gap-3.5 rounded-2xl border border-white-surface/25 bg-white-surface/10 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white-surface/45 hover:bg-white-surface/18 hover:shadow-[0_14px_28px_-18px_rgba(17,17,17,0.28),inset_0_1px_0_rgba(255,255,255,0.28)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                        >
                          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white-surface/35 bg-white-surface/16 text-white-surface shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-md transition-all duration-300 group-hover:scale-[1.03] group-hover:border-white-surface/55 group-hover:bg-white-surface/24 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-[13.5px] font-semibold leading-snug text-white-surface">{facility.label}</h3>
                            <p className="mt-1.5 text-[12px] leading-[1.55] text-white-surface/72">{facility.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="relative h-full overflow-hidden rounded-[28px] border border-white-surface/45 bg-white-surface/28 p-7 text-primary-text shadow-[0_24px_60px_-34px_rgba(17,17,17,0.28)] backdrop-blur-xl sm:p-9">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.42),rgba(255,255,255,0.12)_48%,rgba(255,255,255,0.22))]" aria-hidden="true" />
                <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white-surface/20 blur-2xl" aria-hidden="true" />
                <div className="relative">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white-surface/55 bg-white-surface/35 text-primary-text shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-md">
                    <Bus className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 font-serif text-[30px] leading-tight text-primary-text">Transport services</h2>
                  <p className="mt-2 max-w-[44ch] text-[13px] leading-relaxed text-primary-text/75">
                    Our fleet of modern buses ensures safe and comfortable transportation for students and
                    staff across the city with real-time tracking.
                  </p>
                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    {transportRoutes.map((route) => {
                      const Icon = route.icon;
                      return (
                        <div
                          key={route.label}
                          className="group flex h-full min-h-[96px] items-start gap-3.5 rounded-2xl border border-white-surface/40 bg-white-surface/16 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white-surface/60 hover:bg-white-surface/28 hover:shadow-[0_14px_28px_-18px_rgba(17,17,17,0.22),inset_0_1px_0_rgba(255,255,255,0.45)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                        >
                          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white-surface/55 bg-white-surface/30 text-primary-text shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-md transition-all duration-300 group-hover:scale-[1.03] group-hover:border-white-surface/70 group-hover:bg-white-surface/42 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-[13.5px] font-semibold leading-snug text-primary-text">{route.label}</h3>
                            <p className="mt-1.5 text-[12px] leading-[1.55] text-primary-text/72">{route.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Library */}
      <section className="border-y border-rule bg-main-bg/45 py-20 lg:py-28">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Library"
              title={
                <>
                  The central <span className="highlight highlight--outline">library</span>
                </>
              }
              description="A treasure trove of knowledge with an extensive collection of books, journals and digital resources."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <Reveal>
              <div className="h-full rounded-[24px] bg-coral-orange p-6 text-white-surface sm:p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white-surface/30 bg-white-surface/18 text-white-surface shadow-sm backdrop-blur-md">
                  <BookOpen className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-serif text-[22px] text-white-surface">Resources</h2>
                <ul className="mt-4 space-y-2.5">
                  {libraryInfo.resources.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-white-surface/75">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white-surface/70" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="h-full rounded-[24px] border border-rule bg-main-bg p-6 sm:p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-main-bg text-coral-orange">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-serif text-[22px] text-primary-text">Library timing</h2>
                <dl className="mt-4 space-y-3">
                  <div className="flex items-center justify-between gap-4 border-b border-rule pb-3">
                    <dt className="text-[12px] text-primary-text-2">Monday – Saturday</dt>
                    <dd className="text-right text-[11.5px] font-semibold text-coral-orange">{libraryInfo.timing.weekdays}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-rule pb-3">
                    <dt className="text-[12px] text-primary-text-2">Sunday</dt>
                    <dd className="text-right text-[11.5px] font-semibold text-coral-orange">{libraryInfo.timing.weekends}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-[12px] text-primary-text-2">Public holidays</dt>
                    <dd className="text-right text-[11.5px] font-semibold text-secondary-text">{libraryInfo.timing.holidays}</dd>
                  </div>
                </dl>
                <p className="mt-5 rounded-xl bg-main-bg/70 px-4 py-3 text-[11.5px] leading-relaxed text-primary-text-2">
                  Digital resources available 24/7 through the student portal.
                </p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="h-full rounded-[24px] border border-rule bg-main-bg p-6 sm:p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-main-bg text-coral-orange">
                  <ScrollText className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-5 font-serif text-[22px] text-primary-text">Library rules</h2>
                <ol className="mt-4 space-y-2.5">
                  {libraryInfo.rules.map((rule, index) => (
                    <li key={rule} className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-primary-text-2">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-main-bg font-mono text-[9px] font-semibold text-coral-orange">
                        {index + 1}
                      </span>
                      {rule}
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="pt-20 lg:pt-28">
        <CallToAction
          title={
            <>
              Experience <span className="italic text-[#FF5638]">campus life</span>
            </>
          }
          description="Ready to become part of our vibrant community? Schedule a campus visit and see everything St. Augustine's has to offer."
          image="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=900&q=80"
          onPrimary={() => setCurrentPage('contact')}
          onSecondary={() => setCurrentPage('admission')}
          primaryLabel="Schedule a visit"
          secondaryLabel="Apply now"
        />
      </div>
    </div>
  );
}
