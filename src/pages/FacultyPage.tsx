import { useState, useEffect, useMemo } from 'react';
import { Users, GraduationCap, BookOpen, Award, Search, X } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { CallToAction } from '../components/CallToAction';
import { getFaculty, seedIfEmpty } from '../lib/cms';
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

const categoryBadgeGlass =
  'border border-white-surface/30 bg-white-surface/18 text-white-surface shadow-sm backdrop-blur-md';

const categoryStyles: Record<string, string> = {
  principal: categoryBadgeGlass,
  'vice-principal': categoryBadgeGlass,
  head: categoryBadgeGlass,
  teacher: categoryBadgeGlass,
  admin: categoryBadgeGlass,
};

const categoryLabels: Record<string, string> = {
  principal: 'Principal',
  'vice-principal': 'Vice Principal',
  head: 'Department Head',
  teacher: 'Teacher',
  admin: 'Admin Staff',
};

const fallbackPhoto =
  'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=500&q=80';

export function FacultyPage({ setCurrentPage }: FacultyPageProps) {
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [activeFilter, setActiveFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    seedIfEmpty();
    setFaculty(getFaculty());
  }, []);

  const filteredFaculty = useMemo(() => {
    let result = faculty;
    if (activeFilter) {
      result = result.filter((member) => member.category === activeFilter);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (member) =>
          member.name.toLowerCase().includes(query) ||
          member.designation.toLowerCase().includes(query) ||
          member.subject.toLowerCase().includes(query) ||
          member.bio.toLowerCase().includes(query)
      );
    }
    return result;
  }, [faculty, activeFilter, searchQuery]);

  const stats = useMemo(() => {
    const total = faculty.length;
    const phdHolders = faculty.filter((member) =>
      member.qualification.toLowerCase().includes('ph.d')
    ).length;
    const departments = new Set(faculty.map((member) => member.subject));
    const totalExp = faculty.reduce((sum, member) => {
      const match = member.bio.match(/(\d+)\s*years?/i);
      return sum + (match ? parseInt(match[1], 10) : 0);
    }, 0);
    return {
      total,
      phdHolders,
      avgExperience: total > 0 ? Math.round(totalExp / total) : 0,
      departments: departments.size,
    };
  }, [faculty]);

  const resetFilters = () => {
    setSearchQuery('');
    setActiveFilter('');
  };

  return (
    <div className="bg-main-bg">
      <PageHero
        eyebrow="Dedicated educators"
        title={
          <>
            Our faculty &amp; <span className="highlight">staff</span>
          </>
        }
        description="Meet the distinguished educators and dedicated professionals who inspire, mentor, and guide our students toward academic excellence and personal growth."
        setCurrentPage={setCurrentPage}
        badge={{ value: '1:24', label: 'Faculty ratio' }}
        primaryLabel="Explore programs"
        primaryPage="courses"
        secondaryLabel="Join our faculty"
        secondaryPage="contact"
      />

      {/* Stats */}
      <section className="pb-16 lg:pb-20">
        <div className="container">
          <Reveal>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] border border-rule bg-rule shadow-[0_24px_50px_-38px_rgba(42,22,27,0.35)] lg:grid-cols-4">
              {[
                { icon: Users, value: stats.total, label: 'Total faculty', suffix: '' },
                { icon: Award, value: stats.phdHolders, label: 'Ph.D. holders', suffix: '' },
                { icon: BookOpen, value: stats.avgExperience, label: 'Avg. experience', suffix: '+ yrs' },
                { icon: GraduationCap, value: stats.departments, label: 'Departments', suffix: '' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="bg-main-bg px-5 py-7 sm:px-7 sm:py-8">
                    <div className="flex items-start justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-main-bg text-coral-orange">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[9px] text-secondary-text">0{index + 1}</span>
                    </div>
                    <p className="mt-4 font-serif text-[36px] leading-none text-coral-orange sm:text-[42px]">
                      {item.value}
                      {item.suffix && (
                        <span className="ml-1 font-sans text-[13px] font-semibold text-coral-orange">
                          {item.suffix}
                        </span>
                      )}
                    </p>
                    <p className="mt-2 text-[11.5px] font-medium uppercase tracking-[0.07em] text-primary-text-2">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Directory */}
      <section className="pb-20 lg:pb-28">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="The directory"
              title={
                <>
                  Scholars who <span className="highlight highlight--outline">teach</span>
                </>
              }
              description="Browse our academic community by role, or search by name, subject or expertise."
              action={
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-secondary-text">
                    {filteredFaculty.length} shown
                  </span>
                </div>
              }
            />
          </Reveal>

          <Reveal>
            <div className="mt-8 flex flex-col gap-4 rounded-[22px] border border-rule bg-main-bg/45 p-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => setActiveFilter(category.value)}
                    aria-pressed={activeFilter === category.value}
                    className={`rounded-full border px-3.5 py-1.5 text-[11.5px] font-semibold transition-colors ${
                      activeFilter === category.value
                        ? 'border-coral-orange bg-coral-orange text-white-surface'
                        : 'border-rule bg-main-bg text-primary-text-2 hover:border-rule-2 hover:text-coral-orange'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full lg:max-w-[280px]">
                <label htmlFor="faculty-search" className="visually-hidden">
                  Search faculty
                </label>
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-text"
                  aria-hidden="true"
                />
                <input
                  id="faculty-search"
                  type="search"
                  placeholder="Search by name or subject…"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="field field--icon !min-h-[44px] !py-2 !text-[13px]"
                />
              </div>
            </div>
          </Reveal>

          {filteredFaculty.length > 0 ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredFaculty.map((member, index) => (
                <Reveal key={member.id} delay={(index % 4) * 50}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-rule bg-main-bg transition-all duration-500 hover:-translate-y-1 hover:border-rule-2 hover:shadow-[0_28px_56px_-38px_rgba(42,22,27,0.4)]">
                    <div className="relative h-[220px] overflow-hidden bg-main-bg">
                      <img
                        src={member.photoUrl || fallbackPhoto}
                        alt={member.name}
                        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
                      <span
                        className={`absolute left-3 top-3 rounded-full px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.1em] ${
                          categoryStyles[member.category] || categoryBadgeGlass
                        }`}
                      >
                        {categoryLabels[member.category] || member.category}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="font-serif text-[20px] leading-tight text-primary-text">{member.name}</h2>
                      <p className="mt-1 text-[12px] font-semibold text-coral-orange">{member.designation}</p>
                      <p className="mt-1 text-[11.5px] text-secondary-text">{member.qualification}</p>

                      <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-main-bg/80 px-2.5 py-1 text-[10.5px] font-medium text-coral-orange">
                        <BookOpen className="h-3 w-3" aria-hidden="true" />
                        {member.subject}
                      </span>

                      <p className="mt-3 line-clamp-4 text-[12px] leading-relaxed text-primary-text-2">
                        {member.bio}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-[26px] border border-rule bg-main-bg/50 px-6 py-16 text-center">
              <Users className="mx-auto h-8 w-8 text-coral-orange" aria-hidden="true" />
              <h2 className="mt-4 font-serif text-[26px] text-primary-text">No faculty members found</h2>
              <p className="mx-auto mt-2 max-w-[42ch] text-[13.5px] leading-relaxed text-primary-text-2">
                Try adjusting your search or filter criteria.
              </p>
              <button type="button" onClick={resetFilters} className="btn btn--primary mt-5">
                <X className="h-4 w-4" aria-hidden="true" />
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <CallToAction
        title={
          <>
            Join our esteemed <span className="italic text-[#FF5638]">faculty</span>
          </>
        }
        description="We are always looking for passionate educators and dedicated professionals to join our academic community."
        image="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=80"
        onPrimary={() => setCurrentPage('contact')}
        onSecondary={() => setCurrentPage('courses')}
        primaryLabel="Contact us today"
        secondaryLabel="Explore programs"
      />
    </div>
  );
}
