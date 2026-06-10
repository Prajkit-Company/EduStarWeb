import { useState, useEffect } from 'react';
import {
  Camera, Play, Building2, Bus, BookOpen, Clock,
  Shield, Wifi, ScrollText, Image, PartyPopper,
  X, ChevronLeft, ChevronRight, ArrowRight
} from 'lucide-react';
import { getGalleryImages } from '../lib/cms';
import type { GalleryImage } from '../types';

interface CampusLifePageProps {
  setCurrentPage: (page: string) => void;
}

export function CampusLifePage({ setCurrentPage }: CampusLifePageProps) {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [activeFilter, setActiveFilter] = useState('All');
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    setGalleryImages(getGalleryImages());
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft' && lightboxIndex !== null) {
        setLightboxIndex((prev) => (prev! - 1 + filteredImages.length) % filteredImages.length);
      }
      if (e.key === 'ArrowRight' && lightboxIndex !== null) {
        setLightboxIndex((prev) => (prev! + 1) % filteredImages.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, galleryImages, activeFilter]);

  const filters = ['All', 'Campus', 'Events', 'Sports'];

  const filteredImages = activeFilter === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeFilter);

  const hostelFacilities = [
    { icon: Shield, label: '24/7 Security', desc: 'CCTV surveillance and security personnel round the clock' },
    { icon: Wifi, label: 'High-Speed Wi-Fi', desc: 'Dedicated internet connectivity across all hostels' },
    { icon: Building2, label: 'Separate Hostels', desc: 'Well-furnished separate accommodations for boys and girls' },
    { icon: BookOpen, label: 'Study Rooms', desc: 'Quiet study areas with reference library access' },
  ];

  const transportRoutes = [
    { icon: Bus, label: 'City Routes', desc: 'Extensive network covering all major city areas' },
    { icon: Shield, label: 'GPS Tracked', desc: 'All buses equipped with GPS tracking for safety' },
    { icon: Clock, label: 'Punctual Service', desc: 'Strict adherence to schedule for timely commutes' },
    { icon: Wifi, label: 'Online Tracking', desc: 'Real-time bus tracking through mobile app' },
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

  return (
    <div className="bg-[#fafaf8]">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=75"
            alt="Campus Life"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c2340]/95 via-[#0c2340]/85 to-[#0c2340]/70" />
        </div>
        <div className="relative z-10 h-full container mx-auto px-6 flex items-center">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#c9a962]/20 border border-[#c9a962]/30 rounded-full text-[#c9a962] text-sm font-medium mb-6">
              <PartyPopper className="w-4 h-4" />
              Vibrant Campus Community
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-white mb-6 leading-tight animate-slide-up">
              Campus Life
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed animate-slide-up delay-100 max-w-2xl">
              Discover a vibrant community where academics, culture, sports, and personal growth 
              come together to create an unforgettable college experience.
            </p>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section id="photo-gallery" data-animate className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className={`text-center max-w-3xl mx-auto mb-12 ${isVisible['photo-gallery'] ? 'animate-slide-up' : 'opacity-0'}`}>
            <span className="inline-block text-[#c9a962] text-sm font-semibold tracking-widest uppercase mb-4">
              <Camera className="w-4 h-4 inline mr-2" />
              Photo Gallery
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-[#0c2340] mb-6">
              Moments at Campus
            </h2>
            <div className="w-16 h-1 bg-[#c9a962] rounded mx-auto mb-6" />
            <p className="text-gray-600 text-lg">
              A visual journey through campus life — from academic achievements to cultural celebrations.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className={`flex flex-wrap justify-center gap-3 mb-12 ${isVisible['photo-gallery'] ? 'animate-fade-in delay-200' : 'opacity-0'}`}>
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-[#0c2340] text-white shadow-lg shadow-[#0c2340]/20'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter === 'All' ? <Image className="w-4 h-4 inline mr-1.5" /> : null}
                {filter}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          {filteredImages.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
              {filteredImages.map((img, index) => (
                <div
                  key={img.id}
                  className={`break-inside-avoid overflow-hidden rounded-2xl cursor-pointer group relative ${
                    isVisible['photo-gallery'] ? 'animate-scale-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => setLightboxIndex(filteredImages.indexOf(img))}
                >
                  <div className="img-hover">
                    <img
                      src={img.url}
                      alt={img.caption}
                      className="w-full object-cover rounded-2xl"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c2340]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl flex items-end p-6">
                    <div>
                      <span className="inline-block px-3 py-1 bg-[#c9a962]/90 text-white text-xs font-medium rounded-full mb-2">
                        {img.category}
                      </span>
                      <p className="text-white font-medium text-sm">{img.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <Image className="w-16 h-16 mx-auto mb-4 opacity-40" />
              <p className="text-lg font-medium">No images available in this category</p>
              <p className="text-sm mt-1">Add images through the admin panel</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20 z-10"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {filteredImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev! - 1 + filteredImages.length) % filteredImages.length);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20 z-10"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev! + 1) % filteredImages.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20 z-10"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}

          <div
            className="max-w-5xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredImages[lightboxIndex].url}
              alt={filteredImages[lightboxIndex].caption}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            <div className="text-center mt-6">
              <span className="inline-block px-4 py-1.5 bg-[#c9a962] text-white text-xs font-medium rounded-full mb-3">
                {filteredImages[lightboxIndex].category}
              </span>
              <p className="text-white text-lg font-medium">
                {filteredImages[lightboxIndex].caption}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {lightboxIndex + 1} / {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Video Gallery Section */}
      <section id="video-gallery" data-animate className="py-24 bg-[#fafaf8]">
        <div className="container mx-auto px-6">
          <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible['video-gallery'] ? 'animate-slide-up' : 'opacity-0'}`}>
            <span className="inline-block text-[#c9a962] text-sm font-semibold tracking-widest uppercase mb-4">
              <Play className="w-4 h-4 inline mr-2" />
              Video Gallery
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-[#0c2340] mb-6">
              Campus in Motion
            </h2>
            <div className="w-16 h-1 bg-[#c9a962] rounded mx-auto mb-6" />
            <p className="text-gray-600 text-lg">
              Take a virtual tour and experience the vibrant campus life through our videos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Campus Tour 2024', desc: 'A walkthrough of our beautiful campus and state-of-the-art facilities', videoId: 'dQw4w9WgXcQ' },
              { title: 'Annual Cultural Fest', desc: 'Highlights from our spectacular cultural festival celebration', videoId: 'dQw4w9WgXcQ' },
              { title: 'Sports & Athletics', desc: 'Our students in action at various inter-college sports events', videoId: 'dQw4w9WgXcQ' },
            ].map((video, index) => (
              <div
                key={index}
                className={`card overflow-hidden hover-lift ${isVisible['video-gallery'] ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
              >
                <div className="relative aspect-video bg-[#0c2340] group cursor-pointer">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.videoId}?autoplay=0&rel=0`}
                    title={video.title}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#0c2340]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="w-16 h-16 bg-[#c9a962] rounded-full flex items-center justify-center shadow-xl">
                      <Play className="w-7 h-7 text-white ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Play className="w-5 h-5 text-[#c9a962]" />
                    <h3 className="text-lg font-serif font-semibold text-[#0c2340]">{video.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{video.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={`text-center mt-12 ${isVisible['video-gallery'] ? 'animate-fade-in delay-500' : 'opacity-0'}`}>
            <button
              onClick={() => setCurrentPage('gallery')}
              className="btn-primary px-8 py-4 text-white rounded-lg font-medium inline-flex items-center gap-3"
            >
              View Full Gallery <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Hostel & Transport Section */}
      <section id="hostel-transport" data-animate className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible['hostel-transport'] ? 'animate-slide-up' : 'opacity-0'}`}>
            <span className="inline-block text-[#c9a962] text-sm font-semibold tracking-widest uppercase mb-4">
              Facilities
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-[#0c2340] mb-6">
              Hostel & Transport
            </h2>
            <div className="w-16 h-1 bg-[#c9a962] rounded mx-auto mb-6" />
            <p className="text-gray-600 text-lg">
              Comfortable accommodation and reliable transportation services for all students.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Hostel Info */}
            <div className={isVisible['hostel-transport'] ? 'animate-slide-left' : 'opacity-0'}>
              <div className="bg-[#0c2340] rounded-2xl p-8 lg:p-10 text-white">
                <div className="w-16 h-16 bg-[#c9a962]/20 rounded-2xl flex items-center justify-center mb-6">
                  <Building2 className="w-8 h-8 text-[#c9a962]" />
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-2">Hostel Accommodation</h3>
                <p className="text-gray-300 text-sm mb-8 leading-relaxed">
                  Our hostels provide a safe, comfortable, and conducive environment for students 
                  with modern amenities and round-the-clock support staff.
                </p>
                <div className="grid sm:grid-cols-2 gap-5">
                  {hostelFacilities.map((facility, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0 mt-1">
                        <facility.icon className="w-5 h-5 text-[#c9a962]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{facility.label}</h4>
                        <p className="text-gray-400 text-xs leading-relaxed mt-1">{facility.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Transport Info */}
            <div className={isVisible['hostel-transport'] ? 'animate-slide-right delay-200' : 'opacity-0'}>
              <div className="bg-[#c9a962] rounded-2xl p-8 lg:p-10 text-white">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <Bus className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-2">Transport Services</h3>
                <p className="text-white/80 text-sm mb-8 leading-relaxed">
                  Our fleet of modern buses ensures safe and comfortable transportation for students 
                  and staff across the city with real-time tracking.
                </p>
                <div className="grid sm:grid-cols-2 gap-5">
                  {transportRoutes.map((route, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0 mt-1">
                        <route.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{route.label}</h4>
                        <p className="text-white/70 text-xs leading-relaxed mt-1">{route.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Library Section */}
      <section id="library" data-animate className="py-24 bg-[#fafaf8]">
        <div className="container mx-auto px-6">
          <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible['library'] ? 'animate-slide-up' : 'opacity-0'}`}>
            <span className="inline-block text-[#c9a962] text-sm font-semibold tracking-widest uppercase mb-4">
              <BookOpen className="w-4 h-4 inline mr-2" />
              Library
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-[#0c2340] mb-6">
              Central Library
            </h2>
            <div className="w-16 h-1 bg-[#c9a962] rounded mx-auto mb-6" />
            <p className="text-gray-600 text-lg">
              A treasure trove of knowledge with an extensive collection of books, journals, and digital resources.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Resources */}
            <div className={`card p-8 hover-lift ${isVisible['library'] ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <div className="w-14 h-14 bg-[#0c2340] rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7 text-[#c9a962]" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-[#0c2340] mb-6">Resources</h3>
              <ul className="space-y-3">
                {libraryInfo.resources.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-600 text-sm">
                    <div className="w-1.5 h-1.5 bg-[#c9a962] rounded-full mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Timing */}
            <div className={`card p-8 hover-lift ${isVisible['library'] ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              <div className="w-14 h-14 bg-[#0c2340] rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-[#c9a962]" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-[#0c2340] mb-6">Library Timing</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-800 font-medium">Monday - Saturday</span>
                  <span className="text-[#c9a962] font-semibold">{libraryInfo.timing.weekdays}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-800 font-medium">Sunday</span>
                  <span className="text-[#c9a962] font-semibold">{libraryInfo.timing.weekends}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 font-medium">Public Holidays</span>
                  <span className="text-[#8b7355] font-semibold">{libraryInfo.timing.holidays}</span>
                </div>
              </div>
              <div className="mt-8 p-4 bg-[#0c2340]/5 rounded-xl">
                <p className="text-sm text-gray-600 text-center">
                  Digital resources available 24/7 through the student portal
                </p>
              </div>
            </div>

            {/* Rules */}
            <div className={`card p-8 hover-lift ${isVisible['library'] ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <div className="w-14 h-14 bg-[#0c2340] rounded-xl flex items-center justify-center mb-6">
                <ScrollText className="w-7 h-7 text-[#c9a962]" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-[#0c2340] mb-6">Library Rules</h3>
              <ul className="space-y-3">
                {libraryInfo.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-600 text-sm">
                    <div className="w-5 h-5 bg-[#c9a962]/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[#c9a962] text-xs font-bold">{index + 1}</span>
                    </div>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0c2340] to-[#1a3a5c] relative overflow-hidden">
        <div className="absolute inset-0 pattern-bg opacity-30" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-white mb-6">
            Experience Campus Life
          </h2>
          <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Ready to become part of our vibrant community? Schedule a campus visit and see 
            everything St. Augustine's has to offer.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setCurrentPage('contact')}
              className="btn-secondary px-10 py-4 text-white rounded-lg font-medium inline-flex items-center gap-3"
            >
              Schedule a Visit <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="px-10 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-300"
            >
              Download Prospectus
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
