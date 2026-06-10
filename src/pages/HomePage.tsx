import { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, Users, BookOpen, Trophy, Award,
  ArrowRight, Play, ChevronLeft, ChevronRight,
  Microscope, Monitor, Library, Building2, Quote,
  MapPin
} from 'lucide-react';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

export function HomePage({ setCurrentPage }: HomePageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const statsRef = useRef<HTMLDivElement>(null);

  const heroSlides = [
    {
      title: "Excellence in Education",
      subtitle: "Since 1985",
      description: "Nurturing minds, building character, and shaping the leaders of tomorrow through academic rigor and holistic development.",
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1920&q=75"
    },
    {
      title: "World-Class Infrastructure",
      subtitle: "State-of-the-Art Facilities",
      description: "Modern laboratories, smart classrooms, and comprehensive libraries designed to foster innovation and discovery.",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=75"
    },
    {
      title: "A Legacy of Achievement",
      subtitle: "1200+ Success Stories",
      description: "Join a distinguished community of scholars, professionals, and leaders who began their journey here.",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1920&q=75"
    }
  ];

  const stats = [
    { icon: Users, value: 1200, suffix: '+', label: 'Students Enrolled' },
    { icon: GraduationCap, value: 50, suffix: '+', label: 'Expert Faculty' },
    { icon: BookOpen, value: 25, suffix: '+', label: 'Academic Programs' },
    { icon: Trophy, value: 150, suffix: '+', label: 'Awards & Honors' },
  ];

  const facilities = [
    { 
      icon: Microscope, 
      title: 'Research Laboratories', 
      description: 'Cutting-edge physics, chemistry, and biology labs equipped with modern instruments for hands-on research.',
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&q=80'
    },
    { 
      icon: Monitor, 
      title: 'Smart Classrooms', 
      description: 'Interactive digital learning environments with advanced audiovisual systems and collaborative tools.',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80'
    },
    { 
      icon: Library, 
      title: 'Central Library', 
      description: 'Over 50,000 volumes, digital archives, and quiet study spaces conducive to scholarly pursuit.',
      image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80'
    },
    { 
      icon: Building2, 
      title: 'Modern Campus', 
      description: 'Sprawling 50-acre campus with landscaped gardens, sports facilities, and sustainable infrastructure.',
      image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=600&q=80'
    },
  ];

  const programs = [
    { name: 'Bachelor of Science', duration: '3 Years', students: '350+', category: 'Undergraduate' },
    { name: 'Bachelor of Commerce', duration: '3 Years', students: '400+', category: 'Undergraduate' },
    { name: 'Bachelor of Computer Applications', duration: '3 Years', students: '300+', category: 'Undergraduate' },
    { name: 'Master of Science', duration: '2 Years', students: '150+', category: 'Postgraduate' },
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
      role: 'Parent & Medical Professional',
      text: 'The academic rigor combined with genuine care for student wellbeing sets St. Augustine\'s apart. My daughter has flourished here in ways I couldn\'t have imagined.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80',
      rating: 5
    },
    {
      name: 'Rajesh Kumar',
      role: 'Alumni, Class of 2020',
      text: 'The foundation I built at St. Augustine\'s opened doors to opportunities I never thought possible. The faculty\'s mentorship was invaluable to my success.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
      rating: 5
    },
    {
      name: 'Prof. Elizabeth Chen',
      role: 'Faculty, Department of Sciences',
      text: 'Teaching here is a privilege. The students\' curiosity and dedication inspire me daily to push the boundaries of academic excellence.',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&q=80',
      rating: 5
    },
    {
      name: 'Michael Thompson',
      role: 'Alumni, Software Engineer at Google',
      text: 'The practical exposure and industry-relevant curriculum at St. Augustine\'s prepared me exceptionally well for my career in technology.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
      rating: 5
    },
    {
      name: 'Dr. Priya Sharma',
      role: 'Parent & University Professor',
      text: 'The holistic approach to education here develops not just academic excellence but also character and leadership qualities in students.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80',
      rating: 5
    },
    {
      name: 'James Anderson',
      role: 'Alumni, Class of 2018',
      text: 'The mentorship I received from the faculty was transformative. They genuinely care about each student\'s growth and success.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
      rating: 5
    },
    {
      name: 'Dr. Amanda Foster',
      role: 'Corporate Recruiter, Fortune 500',
      text: 'St. Augustine\'s graduates consistently demonstrate exceptional skills, professionalism, and work ethic. They are always our top candidates.',
      image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=150&q=80',
      rating: 5
    },
    {
      name: 'Robert Williams',
      role: 'Alumni, Medical Doctor',
      text: 'The science laboratories and research opportunities at St. Augustine\'s gave me the foundation I needed for medical school success.',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&q=80',
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
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

  return (
    <div className="bg-[#fafaf8]">
      {/* Hero Section */}
      <section className="relative h-[95vh] min-h-[700px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'low'}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c2340]/95 via-[#0c2340]/75 to-[#0c2340]/50" />
          </div>
        ))}
        
        <div className="relative z-10 h-full container mx-auto px-6 flex items-center">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#c9a962]/20 border border-[#c9a962]/30 rounded-full text-[#c9a962] text-sm font-medium mb-8 animate-slide-up">
              <Award className="w-4 h-4" />
              {heroSlides[currentSlide].subtitle}
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-semibold text-white mb-6 leading-tight text-shadow animate-slide-up delay-100">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl animate-slide-up delay-200">
              {heroSlides[currentSlide].description}
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up delay-300">
              <button 
                onClick={() => setCurrentPage('courses')}
                className="btn-primary px-8 py-4 text-white rounded-lg font-medium inline-flex items-center gap-3"
              >
                Explore Programs <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-300 inline-flex items-center gap-3">
                <Play className="w-5 h-5" /> Campus Tour
              </button>
            </div>
          </div>
        </div>

        {/* Slide Navigation */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
          <button 
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-500 rounded-full ${
                  currentSlide === index 
                    ? 'w-10 h-2 bg-[#c9a962]' 
                    : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
          <button 
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="relative -mt-24 z-20 pb-20">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 mx-auto bg-[#0c2340] rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#c9a962] transition-colors duration-500 shadow-lg">
                    <stat.icon className="w-7 h-7 text-[#c9a962] group-hover:text-white transition-colors duration-500" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-serif font-semibold text-[#0c2340] mb-2 counter">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-[#8b7355] text-sm font-medium tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section id="about-preview" data-animate className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`relative ${isVisible['about-preview'] ? 'animate-slide-left' : 'opacity-0'}`}>
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=75" 
                  alt="Campus"
                  className="w-full h-[550px] object-cover rounded-2xl shadow-2xl"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-[#c9a962]/10 rounded-2xl -z-10" />
              <div className="absolute -top-8 -left-8 w-48 h-48 bg-[#0c2340]/5 rounded-2xl -z-10" />
              
              {/* Experience Badge */}
              <div className="absolute bottom-8 left-8 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#0c2340] rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-serif font-bold text-[#c9a962]">39</span>
                  </div>
                  <div>
                    <p className="text-[#0c2340] font-semibold">Years of</p>
                    <p className="text-[#8b7355]">Academic Excellence</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={isVisible['about-preview'] ? 'animate-slide-right delay-200' : 'opacity-0'}>
              <span className="inline-block text-[#c9a962] text-sm font-semibold tracking-widest uppercase mb-4">
                About Our Institution
              </span>
              <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-[#0c2340] mb-6 leading-tight">
                A Distinguished Legacy of Academic Excellence
              </h2>
              <div className="w-16 h-1 bg-[#c9a962] rounded mb-8" />
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Founded in 1985, St. Augustine's College has stood as a pillar of educational excellence for nearly four decades. 
                Our institution has consistently produced scholars, professionals, and leaders who have made significant contributions 
                to society across various fields.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                With a distinguished faculty of over 50 educators, state-of-the-art infrastructure, and a commitment to 
                holistic development, we continue to uphold our founding vision of nurturing excellence in every student.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-10">
                {[
                  'NAAC A+ Accredited',
                  'Distinguished Faculty',
                  'Modern Infrastructure',
                  'Industry Partnerships'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#c9a962] rounded-full" />
                    <span className="text-[#0c2340] font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setCurrentPage('about')}
                className="btn-primary px-8 py-4 text-white rounded-lg font-medium inline-flex items-center gap-3"
              >
                Learn More <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section id="facilities" data-animate className="py-24 bg-[#fafaf8] pattern-bg">
        <div className="container mx-auto px-6">
          <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible['facilities'] ? 'animate-slide-up' : 'opacity-0'}`}>
            <span className="inline-block text-[#c9a962] text-sm font-semibold tracking-widest uppercase mb-4">
              Our Infrastructure
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-[#0c2340] mb-6">
              World-Class Facilities
            </h2>
            <div className="w-16 h-1 bg-[#c9a962] rounded mx-auto mb-6" />
            <p className="text-gray-600 text-lg">
              Our campus is equipped with modern facilities designed to provide the optimal environment for learning, research, and personal growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {facilities.map((facility, index) => (
              <div 
                key={index}
                className={`card overflow-hidden hover-lift ${isVisible['facilities'] ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
              >
                <div className="img-hover h-48">
                  <img 
                    src={facility.image} 
                    alt={facility.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-[#0c2340] rounded-xl flex items-center justify-center -mt-12 mb-4 relative z-10 shadow-lg">
                    <facility.icon className="w-6 h-6 text-[#c9a962]" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-[#0c2340] mb-3">{facility.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{facility.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" data-animate className="py-24 bg-[#0c2340]">
        <div className="container mx-auto px-6">
          <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16 ${isVisible['programs'] ? 'animate-slide-up' : 'opacity-0'}`}>
            <div>
              <span className="inline-block text-[#c9a962] text-sm font-semibold tracking-widest uppercase mb-4">
                Academic Excellence
              </span>
              <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-white">
                Our Programs
              </h2>
            </div>
            <button 
              onClick={() => setCurrentPage('courses')}
              className="btn-secondary px-6 py-3 text-white rounded-lg font-medium inline-flex items-center gap-2"
            >
              View All Programs <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, index) => (
              <div 
                key={index}
                className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-500 group cursor-pointer ${isVisible['programs'] ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
                onClick={() => setCurrentPage('courses')}
              >
                <span className="inline-block px-3 py-1 bg-[#c9a962]/20 text-[#c9a962] text-xs font-medium rounded-full mb-4">
                  {program.category}
                </span>
                <h3 className="text-xl font-serif font-semibold text-white mb-4 group-hover:text-[#c9a962] transition-colors">
                  {program.name}
                </h3>
                <div className="flex items-center justify-between text-gray-400 text-sm">
                  <span>{program.duration}</span>
                  <span>{program.students} Students</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="events" data-animate className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible['events'] ? 'animate-slide-up' : 'opacity-0'}`}>
            <span className="inline-block text-[#c9a962] text-sm font-semibold tracking-widest uppercase mb-4">
              Campus Life
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-[#0c2340] mb-6">
              Upcoming Events
            </h2>
            <div className="w-16 h-1 bg-[#c9a962] rounded mx-auto mb-6" />
            <p className="text-gray-600 text-lg">
              Beyond academics, our vibrant campus life offers numerous opportunities for personal growth, 
              cultural enrichment, and community engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event, index) => (
              <div 
                key={index}
                className={`bg-white border border-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 group cursor-pointer hover:-translate-y-2 ${isVisible['events'] ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0c2340] to-[#1a3a5c] rounded-xl flex flex-col items-center justify-center shrink-0 group-hover:from-[#c9a962] group-hover:to-[#b8994d] transition-all duration-500 shadow-lg">
                    <span className="text-2xl font-serif font-bold text-white">{event.date}</span>
                    <span className="text-[10px] text-[#c9a962] group-hover:text-white uppercase font-semibold tracking-wider">{event.month}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#0c2340] text-sm leading-tight mb-1 group-hover:text-[#c9a962] transition-colors">{event.title}</h4>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-gray-500 text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#c9a962]" />
                    {event.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Continuous Horizontal Sliding */}
      <section id="testimonials" data-animate className="py-24 bg-gradient-to-b from-[#f8f7f4] to-[#fafaf8] overflow-hidden">
        <div className="container mx-auto px-6 mb-12">
          <div className={`text-center max-w-3xl mx-auto ${isVisible['testimonials'] ? 'animate-slide-up' : 'opacity-0'}`}>
            <span className="inline-block text-[#c9a962] text-sm font-semibold tracking-widest uppercase mb-4">
              Testimonials
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-[#0c2340] mb-6">
              Voices of Our Community
            </h2>
            <div className="w-16 h-1 bg-[#c9a962] rounded mx-auto mb-6" />
            <p className="text-gray-600 text-lg">
              Hear from our students, parents, alumni, and faculty about their experiences at St. Augustine's College.
            </p>
          </div>
        </div>

        {/* Continuous Scrolling Testimonials */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#f8f7f4] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#f8f7f4] to-transparent z-10 pointer-events-none" />
          
          {/* First Row - Scrolling Left */}
          <div className="flex gap-6 mb-6 animate-scroll-left hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div 
                key={`row1-${index}`}
                className="flex-shrink-0 w-[380px] md:w-[440px] bg-white rounded-2xl p-8 shadow-lg border border-gray-100/80 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="relative">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#c9a962]/30 shadow-md"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#c9a962] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[#0c2340] text-base truncate">{testimonial.name}</h4>
                    <p className="text-sm text-[#8b7355] truncate">{testimonial.role}</p>
                    <div className="flex gap-0.5 mt-1.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 text-[#c9a962] fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                  <Quote className="w-10 h-10 text-[#c9a962]/15 flex-shrink-0" />
                </div>
                <p className="text-gray-600 leading-relaxed text-[15px] line-clamp-4">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>

          {/* Second Row - Scrolling Right */}
          <div className="flex gap-6 animate-scroll-right hover:[animation-play-state:paused]">
            {[...testimonials.slice(4), ...testimonials.slice(0, 4), ...testimonials.slice(4), ...testimonials.slice(0, 4)].map((testimonial, index) => (
              <div 
                key={`row2-${index}`}
                className="flex-shrink-0 w-[380px] md:w-[440px] bg-white rounded-2xl p-8 shadow-lg border border-gray-100/80 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="relative">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#c9a962]/30 shadow-md"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#c9a962] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[#0c2340] text-base truncate">{testimonial.name}</h4>
                    <p className="text-sm text-[#8b7355] truncate">{testimonial.role}</p>
                    <div className="flex gap-0.5 mt-1.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 text-[#c9a962] fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                  <Quote className="w-10 h-10 text-[#c9a962]/15 flex-shrink-0" />
                </div>
                <p className="text-gray-600 leading-relaxed text-[15px] line-clamp-4">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#0c2340] to-[#1a3a5c] relative overflow-hidden">
        <div className="absolute inset-0 pattern-bg opacity-30" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-white mb-6">
            Begin Your Journey With Us
          </h2>
          <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Join a distinguished community of scholars and embark on a transformative educational experience 
            that will shape your future.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setCurrentPage('contact')}
              className="btn-secondary px-10 py-4 text-white rounded-lg font-medium inline-flex items-center gap-3"
            >
              Apply for Admission <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setCurrentPage('admission')}
              className="px-10 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-300"
            >
              Request Information
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
