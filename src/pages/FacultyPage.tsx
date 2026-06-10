import { useState, useEffect, useMemo } from 'react';
import {
  Users, GraduationCap, BookOpen, Award, Search
} from 'lucide-react';
import { getFaculty } from '../lib/cms';
import type { FacultyMember } from '../types';

interface FacultyPageProps {
  setCurrentPage: (page: string) => void;
}

const categories = [
  { label: 'All', value: '' },
  { label: 'Principal', value: 'principal' },
  { label: 'Vice Principal', value: 'vice-principal' },
  { label: 'Department Heads', value: 'head' },
  { label: 'Teachers', value: 'teacher' },
  { label: 'Admin Staff', value: 'admin' },
];

const categoryColors: Record<string, string> = {
  principal: 'bg-purple-100 text-purple-800',
  'vice-principal': 'bg-blue-100 text-blue-800',
  head: 'bg-amber-100 text-amber-800',
  teacher: 'bg-green-100 text-green-800',
  admin: 'bg-slate-100 text-slate-800',
};

const categoryLabels: Record<string, string> = {
  principal: 'Principal',
  'vice-principal': 'Vice Principal',
  head: 'Department Head',
  teacher: 'Teacher',
  admin: 'Admin Staff',
};

export function FacultyPage({ setCurrentPage }: FacultyPageProps) {
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [activeFilter, setActiveFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setFaculty(getFaculty());
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
  }, [faculty]);

  const filteredFaculty = useMemo(() => {
    let result = faculty;
    if (activeFilter) {
      result = result.filter((f) => f.category === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.designation.toLowerCase().includes(q) ||
          f.subject.toLowerCase().includes(q) ||
          f.bio.toLowerCase().includes(q)
      );
    }
    return result;
  }, [faculty, activeFilter, searchQuery]);

  const stats = useMemo(() => {
    const total = faculty.length;
    const phdHolders = faculty.filter((f) =>
      f.qualification.toLowerCase().includes('ph.d')
    ).length;
    const departments = new Set(faculty.map((f) => f.subject));
    const totalExp = faculty.reduce((sum, f) => {
      const match = f.bio.match(/(\d+)\s*years?/i);
      return sum + (match ? parseInt(match[1]) : 0);
    }, 0);
    return {
      total,
      phdHolders,
      avgExperience: total > 0 ? Math.round(totalExp / total) : 0,
      departments: departments.size,
    };
  }, [faculty]);

  const heroImage =
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1920&q=75';

  return (
    <div className="bg-[#fafaf8]">
      {/* Hero Section */}
      <section className="relative h-[95vh] min-h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Our Faculty & Staff"
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
              <GraduationCap className="w-4 h-4" />
              Dedicated Educators
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-white mb-6 leading-tight animate-slide-up">
              Our Faculty & Staff
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed animate-slide-up delay-100">
              Meet the distinguished educators and dedicated professionals who
              inspire, mentor, and guide our students toward academic excellence
              and personal growth.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white -mt-16 relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6 text-center hover-lift">
              <div className="w-12 h-12 bg-[#0c2340] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-[#c9a962]" />
              </div>
              <div className="text-3xl font-serif font-bold text-[#0c2340] mb-1">
                {stats.total}
              </div>
              <div className="text-sm text-gray-600">Total Faculty</div>
            </div>
            <div className="card p-6 text-center hover-lift">
              <div className="w-12 h-12 bg-[#0c2340] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-[#c9a962]" />
              </div>
              <div className="text-3xl font-serif font-bold text-[#0c2340] mb-1">
                {stats.phdHolders}
              </div>
              <div className="text-sm text-gray-600">Ph.D. Holders</div>
            </div>
            <div className="card p-6 text-center hover-lift">
              <div className="w-12 h-12 bg-[#0c2340] rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-[#c9a962]" />
              </div>
              <div className="text-3xl font-serif font-bold text-[#0c2340] mb-1">
                {stats.avgExperience}+
              </div>
              <div className="text-sm text-gray-600">Avg. Experience (Years)</div>
            </div>
            <div className="card p-6 text-center hover-lift">
              <div className="w-12 h-12 bg-[#0c2340] rounded-xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-6 h-6 text-[#c9a962]" />
              </div>
              <div className="text-3xl font-serif font-bold text-[#0c2340] mb-1">
                {stats.departments}
              </div>
              <div className="text-sm text-gray-600">Departments</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-12 bg-[#fafaf8]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveFilter(cat.value)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeFilter === cat.value
                      ? 'bg-[#0c2340] text-white shadow-lg'
                      : 'bg-white text-[#0c2340] border border-gray-200 hover:border-[#c9a962] hover:text-[#c9a962]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search faculty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:border-[#c9a962] focus:ring-2 focus:ring-[#c9a962]/20 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Directory Grid */}
      <section id="faculty-directory" data-animate className="pb-24 bg-[#fafaf8]">
        <div className="container mx-auto px-6">
          {filteredFaculty.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredFaculty.map((member, index) => (
                <div
                  key={member.id}
                  className={`card overflow-hidden hover-lift ${
                    isVisible['faculty-directory'] ? 'animate-slide-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.05 + 0.1}s` }}
                >
                  <div className="p-6 text-center">
                    <div className="w-28 h-28 rounded-full mx-auto mb-4 overflow-hidden border-4 border-[#c9a962]/20">
                      <img
                        src={member.photoUrl || `https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=200&q=80`}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                        categoryColors[member.category] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {categoryLabels[member.category] || member.category}
                    </span>
                    <h3 className="text-lg font-serif font-semibold text-[#0c2340] mb-1">
                      {member.name}
                    </h3>
                    <p className="text-[#c9a962] font-medium text-sm mb-1">
                      {member.designation}
                    </p>
                    <p className="text-gray-500 text-xs mb-3">
                      {member.qualification}
                    </p>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0c2340]/5 rounded-full text-xs text-[#0c2340] font-medium mb-3">
                      <BookOpen className="w-3 h-3" />
                      {member.subject}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-semibold text-[#0c2340] mb-2">
                No faculty members found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#c9a962] to-[#8b7355]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif font-semibold text-white mb-6">
            Join Our Esteemed Faculty
          </h2>
          <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
            We are always looking for passionate educators and dedicated
            professionals to join our academic community.
          </p>
          <button
            onClick={() => setCurrentPage('contact')}
            className="px-10 py-4 bg-[#0c2340] text-white rounded-lg font-medium hover:bg-[#0a1c30] transition-all duration-300 inline-flex items-center gap-3 shadow-lg"
          >
            Contact Us Today <Award className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
