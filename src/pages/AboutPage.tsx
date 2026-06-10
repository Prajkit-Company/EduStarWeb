import { useState, useEffect } from 'react';
import { 
  Target, Eye, Heart, Award,
  Building2, Microscope, Monitor, Library, Wrench, FlaskConical,
  ArrowRight, Quote, CheckCircle
} from 'lucide-react';

interface AboutPageProps {
  setCurrentPage: (page: string) => void;
}

export function AboutPage({ setCurrentPage }: AboutPageProps) {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

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

  const timeline = [
    { year: '1985', title: 'Foundation', description: 'St. Augustine\'s College was established with a vision to provide quality higher education rooted in academic excellence and moral values.' },
    { year: '1995', title: 'Expansion', description: 'Introduction of new departments including Commerce, Computer Science, and expansion of science programs.' },
    { year: '2005', title: 'Infrastructure Development', description: 'Major campus expansion with new academic blocks, modern laboratories, and a state-of-the-art library.' },
    { year: '2015', title: 'Digital Transformation', description: 'Implementation of smart classrooms, digital learning resources, and online academic management systems.' },
    { year: '2020', title: 'NAAC A+ Accreditation', description: 'Received the highest accreditation grade, recognizing our commitment to quality education.' },
    { year: '2024', title: 'Continuing Excellence', description: 'Celebrating 39 years of academic distinction with 1,200+ students and 50+ distinguished faculty members.' },
  ];

  const leadership = [
    {
      name: 'Dr. Robert J. Anderson',
      role: 'Principal',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
      qualifications: 'Ph.D. (Education), M.Phil., 32 Years Experience',
      message: 'Our mission is to nurture not just scholars, but compassionate leaders who will shape a better tomorrow.'
    },
    {
      name: 'Prof. Maria S. Garcia',
      role: 'Vice Principal',
      image: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=400&q=80',
      qualifications: 'M.Phil., MBA, 28 Years Experience',
      message: 'Education at St. Augustine\'s transcends textbooks—it transforms lives.'
    },
    {
      name: 'Dr. James K. Wilson',
      role: 'Dean of Academics',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
      qualifications: 'Ph.D. (Computer Science), 22 Years Experience',
      message: 'We prepare students to excel in a rapidly evolving technological landscape.'
    },
    {
      name: 'Mrs. Priya R. Sharma',
      role: 'Chief Administrative Officer',
      image: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=400&q=80',
      qualifications: 'MBA (Administration), 20 Years Experience',
      message: 'Operational excellence ensures every student receives the support they deserve.'
    },
  ];

  const facilities = [
    { icon: Microscope, title: 'Science Laboratories', description: 'Physics, Chemistry, and Biology labs with modern research equipment' },
    { icon: Monitor, title: 'Computer Centers', description: '200+ workstations with latest software and high-speed connectivity' },
    { icon: Library, title: 'Central Library', description: '50,000+ volumes, digital resources, and dedicated reading halls' },
    { icon: Building2, title: 'Smart Classrooms', description: '45+ digitally-enabled interactive learning spaces' },
    { icon: Wrench, title: 'Technical Workshop', description: 'Fully-equipped facilities for practical engineering education' },
    { icon: FlaskConical, title: 'Research Center', description: 'Dedicated research facilities for faculty and postgraduate students' },
  ];

  const facultyStats = [
    { label: 'Ph.D. Holders', value: '35+' },
    { label: 'M.Phil. Holders', value: '15+' },
    { label: 'Avg. Experience', value: '18 Years' },
    { label: 'Research Papers', value: '500+' },
  ];

  return (
    <div className="bg-[#fafaf8]">
      {/* Hero Section */}
      <section className="relative h-[95vh] min-h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=75" 
            alt="St. Augustine's College Campus"
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
              <Award className="w-4 h-4" />
              Established 1985
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-white mb-6 leading-tight animate-slide-up">
              About St. Augustine's College
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed animate-slide-up delay-100">
              Nearly four decades of academic distinction, nurturing generations of scholars, 
              professionals, and leaders who have made their mark across the globe.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-white -mt-16 relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'Our Mission', color: 'bg-[#0c2340]', text: 'To provide accessible, transformative education that empowers students with knowledge, skills, and ethical values necessary to succeed and contribute meaningfully to society.' },
              { icon: Eye, title: 'Our Vision', color: 'bg-[#c9a962]', text: 'To be a globally recognized institution of higher learning, distinguished for academic excellence, innovative research, and producing responsible leaders who drive positive change.' },
              { icon: Heart, title: 'Our Values', color: 'bg-[#8b7355]', text: 'Integrity, Excellence, Innovation, Inclusivity, and Social Responsibility—the foundational principles that guide every aspect of our institutional culture and educational practice.' },
            ].map((item, index) => (
              <div key={index} className={`${item.color} rounded-2xl p-8 text-white hover-lift`}>
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-4">{item.title}</h3>
                <p className="text-white/80 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section id="principal" data-animate className="py-24 bg-[#fafaf8]">
        <div className="container mx-auto px-6">
          <div className={`grid lg:grid-cols-2 gap-16 items-center ${isVisible['principal'] ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80" 
                alt="Principal"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#c9a962]/10 rounded-2xl -z-10" />
            </div>
            <div>
              <span className="inline-block text-[#c9a962] text-sm font-semibold tracking-widest uppercase mb-4">
                From the Principal's Desk
              </span>
              <h2 className="text-4xl font-serif font-semibold text-[#0c2340] mb-6">
                A Message of Welcome
              </h2>
              <div className="w-16 h-1 bg-[#c9a962] rounded mb-8" />
              <Quote className="w-10 h-10 text-[#c9a962]/30 mb-4" />
              <p className="text-gray-600 text-lg leading-relaxed mb-6 italic">
                "At St. Augustine's College, we believe that education is not merely the acquisition of knowledge, 
                but the formation of character, the cultivation of wisdom, and the preparation for a life of purpose 
                and service. Our commitment to academic excellence is matched only by our dedication to nurturing 
                the whole person—intellectually, morally, and socially."
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                "As you explore our institution, I invite you to discover the vibrant community of scholars, 
                educators, and learners who call St. Augustine's home. Together, we continue to build upon 
                our proud legacy while embracing the opportunities of the future."
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <h4 className="font-semibold text-[#0c2340] text-lg">Dr. Robert J. Anderson</h4>
                  <p className="text-[#8b7355]">Principal, St. Augustine's College</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section id="history" data-animate className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible['history'] ? 'animate-slide-up' : 'opacity-0'}`}>
            <span className="inline-block text-[#c9a962] text-sm font-semibold tracking-widest uppercase mb-4">
              Our Journey
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-[#0c2340] mb-6">
              A Rich History
            </h2>
            <div className="w-16 h-1 bg-[#c9a962] rounded mx-auto mb-6" />
            <p className="text-gray-600 text-lg">
              From humble beginnings to becoming a premier institution, our journey reflects 
              an unwavering commitment to educational excellence.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-8 lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0c2340] via-[#c9a962] to-[#0c2340]" />
            
            {timeline.map((item, index) => (
              <div 
                key={index} 
                className={`relative flex items-start mb-12 lg:mb-16 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                <div className={`w-full lg:w-1/2 pl-20 lg:pl-0 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                  <div className={`card p-6 inline-block ${isVisible['history'] ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: `${index * 0.1}s` }}>
                    <span className="text-3xl font-serif font-bold text-[#c9a962]">{item.year}</span>
                    <h3 className="text-xl font-semibold text-[#0c2340] mt-2 mb-3">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
                <div className="absolute left-6 lg:left-1/2 lg:-translate-x-1/2 w-5 h-5 bg-[#0c2340] border-4 border-[#c9a962] rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" data-animate className="py-24 bg-[#0c2340]">
        <div className="container mx-auto px-6">
          <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible['leadership'] ? 'animate-slide-up' : 'opacity-0'}`}>
            <span className="inline-block text-[#c9a962] text-sm font-semibold tracking-widest uppercase mb-4">
              Our Leadership
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-white mb-6">
              Guiding Excellence
            </h2>
            <div className="w-16 h-1 bg-[#c9a962] rounded mx-auto mb-6" />
            <p className="text-gray-300 text-lg">
              Dedicated professionals committed to upholding our standards of academic excellence 
              and student success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, index) => (
              <div 
                key={index} 
                className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 group ${isVisible['leadership'] ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-semibold text-white mb-1">{leader.name}</h3>
                  <p className="text-[#c9a962] font-medium mb-2">{leader.role}</p>
                  <p className="text-gray-400 text-sm mb-4">{leader.qualifications}</p>
                  <p className="text-gray-300 text-sm italic">"{leader.message}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section id="faculty" data-animate className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={isVisible['faculty'] ? 'animate-slide-left' : 'opacity-0'}>
              <span className="inline-block text-[#c9a962] text-sm font-semibold tracking-widest uppercase mb-4">
                Our Faculty
              </span>
              <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-[#0c2340] mb-6">
                50+ Distinguished Educators
              </h2>
              <div className="w-16 h-1 bg-[#c9a962] rounded mb-8" />
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Our faculty comprises highly qualified academicians and industry experts who bring 
                a wealth of knowledge, research experience, and genuine passion for teaching to our classrooms.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                {facultyStats.map((stat, index) => (
                  <div key={index} className="bg-[#fafaf8] rounded-xl p-6 text-center">
                    <div className="text-3xl font-serif font-bold text-[#c9a962] mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {['Student-Centered Teaching Approach', 'Regular Professional Development', 'Industry & Research Collaboration', 'Mentorship Programs'].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#c9a962]" />
                    <span className="text-[#0c2340] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`grid grid-cols-2 gap-4 ${isVisible['faculty'] ? 'animate-slide-right delay-200' : 'opacity-0'}`}>
              <img 
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&q=80" 
                alt="Faculty teaching in classroom"
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&q=80" 
                alt="Professor during lecture"
                className="w-full h-64 object-cover rounded-xl shadow-lg mt-8"
              />
              <img 
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&q=80" 
                alt="Students in discussion"
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&q=80" 
                alt="Graduation ceremony"
                className="w-full h-64 object-cover rounded-xl shadow-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section id="infrastructure" data-animate className="py-24 bg-[#fafaf8]">
        <div className="container mx-auto px-6">
          <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible['infrastructure'] ? 'animate-slide-up' : 'opacity-0'}`}>
            <span className="inline-block text-[#c9a962] text-sm font-semibold tracking-widest uppercase mb-4">
              Infrastructure
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-[#0c2340] mb-6">
              World-Class Facilities
            </h2>
            <div className="w-16 h-1 bg-[#c9a962] rounded mx-auto mb-6" />
            <p className="text-gray-600 text-lg">
              Our campus is designed to provide the optimal environment for academic pursuit, 
              research, and holistic development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <div 
                key={index} 
                className={`card p-8 hover-lift ${isVisible['infrastructure'] ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
              >
                <div className="w-14 h-14 bg-[#0c2340] rounded-xl flex items-center justify-center mb-6">
                  <facility.icon className="w-7 h-7 text-[#c9a962]" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-[#0c2340] mb-3">{facility.title}</h3>
                <p className="text-gray-600 leading-relaxed">{facility.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#c9a962] to-[#8b7355]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif font-semibold text-white mb-6">
            Become Part of Our Legacy
          </h2>
          <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
            Join the St. Augustine's community and begin your journey toward academic excellence and personal growth.
          </p>
          <button 
            onClick={() => setCurrentPage('admission')}
            className="px-10 py-4 bg-[#0c2340] text-white rounded-lg font-medium hover:bg-[#0a1c30] transition-all duration-300 inline-flex items-center gap-3 shadow-lg"
          >
            Apply Now <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
