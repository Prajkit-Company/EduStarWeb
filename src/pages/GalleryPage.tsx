import { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Image,
  Building2,
  Users,
  Trophy,
  PartyPopper,
} from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { CallToAction } from '../components/CallToAction';

interface GalleryPageProps {
  setCurrentPage: (page: string) => void;
}

const categories = [
  { name: 'All', icon: Image },
  { name: 'Campus', icon: Building2 },
  { name: 'Events', icon: PartyPopper },
  { name: 'Academics', icon: Users },
  { name: 'Achievements', icon: Trophy },
];

const galleryItems = [
  { id: 1, category: 'Campus', title: 'Main Academic Block', description: 'The iconic main building housing administrative offices and lecture halls', image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b38?w=1000&q=80' },
  { id: 2, category: 'Campus', title: 'Central Library', description: 'Our state-of-the-art library with over 50,000 volumes', image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1000&q=80' },
  { id: 3, category: 'Campus', title: 'Computer Center', description: 'Modern computing facilities for students', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&q=80' },
  { id: 4, category: 'Campus', title: 'Science Laboratory', description: 'Well-equipped labs for practical learning', image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1000&q=80' },
  { id: 5, category: 'Campus', title: 'Sports Complex', description: 'Multi-sport facilities for athletics and recreation', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&q=80' },
  { id: 6, category: 'Campus', title: 'Auditorium', description: 'State-of-the-art venue for events and conferences', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&q=80' },
  { id: 7, category: 'Events', title: 'Annual Convocation 2024', description: 'Celebrating the achievements of our graduating class', image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1000&q=80' },
  { id: 8, category: 'Events', title: 'Science Exhibition', description: 'Students showcasing innovative research projects', image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=1000&q=80' },
  { id: 9, category: 'Events', title: 'Cultural Festival', description: 'Annual celebration of arts and heritage', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&q=80' },
  { id: 10, category: 'Events', title: 'Guest Lecture Series', description: 'Distinguished speakers sharing insights with students', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1000&q=80' },
  { id: 11, category: 'Academics', title: 'Classroom Learning', description: 'Interactive sessions in our smart classrooms', image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1000&q=80' },
  { id: 12, category: 'Academics', title: 'Collaborative Study', description: 'Students engaged in group discussions', image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1000&q=80' },
  { id: 13, category: 'Academics', title: 'Laboratory Practice', description: 'Hands-on learning in our research labs', image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1000&q=80' },
  { id: 14, category: 'Academics', title: 'Faculty Interaction', description: 'Personalized guidance from expert educators', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1000&q=80' },
  { id: 15, category: 'Achievements', title: 'Award Ceremony', description: 'Recognizing academic and extracurricular excellence', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1000&q=80' },
  { id: 16, category: 'Achievements', title: 'Sports Champions', description: 'Our athletes celebrating victory', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1000&q=80' },
  { id: 17, category: 'Achievements', title: 'Academic Excellence', description: 'Toppers receiving recognition for their achievements', image: 'https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?w=1000&q=80' },
  { id: 18, category: 'Campus', title: 'Green Campus', description: 'Our eco-friendly and sustainable environment', image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=1000&q=80' },
];

export function GalleryPage({ setCurrentPage }: GalleryPageProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems =
    selectedCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const currentIndex = filteredItems.findIndex((item) => item.id === selectedImage);
  const currentImage = currentIndex >= 0 ? filteredItems[currentIndex] : undefined;

  useEffect(() => {
    if (selectedImage === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedImage(null);
      if (event.key === 'ArrowLeft') {
        setSelectedImage((previous) => {
          const index = filteredItems.findIndex((item) => item.id === previous);
          return filteredItems[(index - 1 + filteredItems.length) % filteredItems.length].id;
        });
      }
      if (event.key === 'ArrowRight') {
        setSelectedImage((previous) => {
          const index = filteredItems.findIndex((item) => item.id === previous);
          return filteredItems[(index + 1) % filteredItems.length].id;
        });
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage, filteredItems]);

  const handlePrev = () => {
    if (currentIndex < 0) return;
    setSelectedImage(filteredItems[(currentIndex - 1 + filteredItems.length) % filteredItems.length].id);
  };

  const handleNext = () => {
    if (currentIndex < 0) return;
    setSelectedImage(filteredItems[(currentIndex + 1) % filteredItems.length].id);
  };

  return (
    <div className="bg-main-bg">
      <PageHero
        eyebrow="Visual journey"
        title={
          <>
            Campus <span className="highlight">gallery</span>
          </>
        }
        description="Explore the vibrant life at St. Augustine's through our collection of memorable moments, campus views and achievements."
        setCurrentPage={setCurrentPage}
        facts={[
          { value: '18', label: 'Moments' },
          { value: '50 acre', label: 'Campus' },
          { value: '5,000+', label: 'Archive' },
        ]}
        badge={{ value: 'Live', label: 'Campus life' }}
        primaryLabel="Plan a visit"
        primaryPage="contact"
        secondaryLabel="Campus life"
        secondaryPage="campus-life"
      />

      {/* Category filter */}
      <div className="sticky top-[68px] z-30 border-y border-rule bg-main-bg/95 backdrop-blur-xl">
        <div className="container py-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category.name);
                    setSelectedImage(null);
                  }}
                  aria-pressed={selectedCategory === category.name}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[11.5px] font-semibold transition-colors ${
                    selectedCategory === category.name
                      ? 'border-coral-orange bg-coral-orange text-white-surface'
                      : 'border-rule bg-main-bg text-primary-text-2 hover:border-rule-2 hover:text-coral-orange'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {category.name}
                </button>
              );
            })}
            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-secondary-text">
              {filteredItems.length} photographs
            </span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="pb-20 pt-12 lg:pb-28 lg:pt-16">
        <div className="container">
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            {filteredItems.map((item, index) => (
              <Reveal key={item.id} delay={(index % 6) * 40} className="break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setSelectedImage(item.id)}
                  className="group relative block w-full overflow-hidden rounded-[20px] border border-rule text-left"
                  aria-label={`Open image: ${item.title}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading={index < 6 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="inline-block rounded-full bg-coral-orange px-2.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.1em] text-primary-text">
                      {item.category}
                    </span>
                    <p className="mt-2 font-serif text-[17px] text-white-surface">{item.title}</p>
                    <p className="mt-0.5 line-clamp-1 text-[11.5px] text-white-surface/70">{item.description}</p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual tour */}
      <section className="pb-20 lg:pb-28">
        <div className="container">
          <Reveal>
            <div className="relative overflow-hidden rounded-[34px]">
              <img
                src="https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1600&q=80"
                alt="Aerial view of the St. Augustine's College campus"
                className="h-[420px] w-full object-cover sm:h-[480px]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-#e44a2e/95 via-#e44a2e/80 to-#e44a2e/30" />
              <div className="pattern-bg pointer-events-none absolute inset-0 opacity-[0.14]" aria-hidden="true" />
              <div className="absolute inset-0 flex items-center">
                <div className="px-6 sm:px-10 lg:px-14">
                  <p className="eyebrow eyebrow--on-dark">Experience our campus</p>
                  <h2 className="mt-4 max-w-[16ch] text-white-surface">
                    Take a <span className="italic text-[#FF5638]">virtual tour</span>
                  </h2>
                  <p className="mt-4 max-w-[48ch] text-[14px] leading-[1.75] text-white-surface/75">
                    Unable to visit in person? Experience our 50-acre campus through our immersive
                    360° virtual tour. Explore academic buildings, laboratories, the library, sports
                    facilities and more.
                  </p>
                  <button
                    type="button"
                    onClick={() => setCurrentPage('campus-life')}
                    className="btn btn--light mt-7"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-coral-orange/10">
                      <Play className="ml-0.5 h-3 w-3" fill="currentColor" aria-hidden="true" />
                    </span>
                    Start virtual tour
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Campus stats */}
      <section className="relative overflow-hidden bg-coral-orange py-14 text-white-surface lg:py-16">
        <div className="pattern-bg pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden="true" />
        <div className="container relative">
          <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
            {[
              { value: '50', suffix: ' acres', label: 'Campus area' },
              { value: '15', suffix: '+', label: 'Academic buildings' },
              { value: '100', suffix: '+', label: 'Annual events' },
              { value: '5,000', suffix: '+', label: 'Photo archive' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-[38px] leading-none text-[#FF5638] sm:text-[46px]">
                  {stat.value}
                  <span className="text-[20px] sm:text-[24px]">{stat.suffix}</span>
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white-surface/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {currentImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${currentIndex + 1} of ${filteredItems.length}: ${currentImage.title}`}
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-paper/25 bg-main-bg/10 text-white-surface backdrop-blur transition-colors hover:bg-main-bg/20"
            aria-label="Close image viewer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handlePrev();
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
              handleNext();
            }}
            className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-paper/25 bg-main-bg/10 text-white-surface backdrop-blur transition-colors hover:bg-main-bg/20"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <img
              src={currentImage.image}
              alt={currentImage.title}
              className="mx-auto max-h-[74vh] w-auto rounded-[18px] object-contain shadow-2xl"
            />
            <div className="mt-5 text-center">
              <span className="inline-block rounded-full bg-coral-orange px-3 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-primary-text">
                {currentImage.category}
              </span>
              <h2 className="mt-2.5 font-serif text-[24px] text-white-surface">{currentImage.title}</h2>
              <p className="mx-auto mt-1 max-w-[52ch] text-[13px] text-white-surface/70">{currentImage.description}</p>
              <p className="mt-2 font-mono text-[10px] tracking-[0.12em] text-white-surface/50">
                {currentIndex + 1} / {filteredItems.length}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="pb-20 lg:pb-28">
        <CallToAction
          title={
            <>
              See it for <span className="italic text-[#FF5638]">yourself</span>
            </>
          }
          description="Photographs only tell part of the story. Book a guided campus visit and meet the community behind them."
          image="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80"
          onPrimary={() => setCurrentPage('contact')}
          onSecondary={() => setCurrentPage('admission')}
          primaryLabel="Book a campus visit"
          secondaryLabel="Apply now"
        />
      </div>
    </div>
  );
}
