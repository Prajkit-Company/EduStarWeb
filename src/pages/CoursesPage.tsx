import { useState } from 'react';
import {
  Search,
  Clock,
  Users,
  BookOpen,
  GraduationCap,
  ArrowUpRight,
  CheckCircle,
  ChevronDown,
  Award,
  Star,
  X,
  Download,
} from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { CallToAction } from '../components/CallToAction';

interface CoursesPageProps {
  setCurrentPage: (page: string) => void;
}

const categories = ['All', 'Undergraduate', 'Postgraduate', 'Science', 'Commerce', 'Arts', 'Computer Science'];

const courses = [
  {
    id: 1,
    title: 'Bachelor of Science (B.Sc)',
    category: 'Science',
    level: 'Undergraduate',
    duration: '3 Years (6 Semesters)',
    students: '350+',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=900&q=80',
    description:
      'A rigorous program offering specializations in Physics, Chemistry, Biology, and Mathematics, preparing students for careers in research, education, and industry.',
    subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Environmental Science', 'Research Methodology'],
    eligibility: '10+2 with Science stream, minimum 50% aggregate marks',
    careers: ['Research Scientist', 'Laboratory Analyst', 'Educator', 'Environmental Consultant'],
  },
  {
    id: 2,
    title: 'Bachelor of Commerce (B.Com)',
    category: 'Commerce',
    level: 'Undergraduate',
    duration: '3 Years (6 Semesters)',
    students: '400+',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80',
    description:
      'Comprehensive commerce education covering accounting, finance, taxation, and business management with practical industry exposure.',
    subjects: ['Financial Accounting', 'Business Economics', 'Corporate Law', 'Taxation', 'Cost Accounting', 'Business Statistics'],
    eligibility: '10+2 with Commerce stream, minimum 45% aggregate marks',
    careers: ['Chartered Accountant', 'Financial Analyst', 'Tax Consultant', 'Banking Professional'],
  },
  {
    id: 3,
    title: 'Bachelor of Computer Applications (BCA)',
    category: 'Computer Science',
    level: 'Undergraduate',
    duration: '3 Years (6 Semesters)',
    students: '300+',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=80',
    description:
      'Industry-aligned program focusing on programming, software development, database management, and emerging technologies.',
    subjects: ['Programming in C/C++/Java', 'Data Structures', 'Database Management', 'Web Technologies', 'Software Engineering', 'Networking'],
    eligibility: '10+2 with Mathematics, minimum 50% aggregate marks',
    careers: ['Software Developer', 'Web Developer', 'System Analyst', 'Database Administrator'],
  },
  {
    id: 4,
    title: 'Bachelor of Arts (B.A)',
    category: 'Arts',
    level: 'Undergraduate',
    duration: '3 Years (6 Semesters)',
    students: '250+',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=900&q=80',
    description:
      'A liberal arts program offering diverse specializations in humanities and social sciences, developing critical thinking and communication skills.',
    subjects: ['English Literature', 'History', 'Political Science', 'Psychology', 'Sociology', 'Economics'],
    eligibility: '10+2 any stream, minimum 45% aggregate marks',
    careers: ['Civil Services', 'Journalism', 'Social Work', 'Content Development'],
  },
  {
    id: 5,
    title: 'Bachelor of Business Administration (BBA)',
    category: 'Commerce',
    level: 'Undergraduate',
    duration: '3 Years (6 Semesters)',
    students: '200+',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=80',
    description:
      'Professional management education covering business fundamentals, marketing, finance, human resources, and entrepreneurship.',
    subjects: ['Management Principles', 'Marketing Management', 'Financial Management', 'Human Resource Management', 'Business Communication', 'Entrepreneurship'],
    eligibility: '10+2 any stream, minimum 50% aggregate marks',
    careers: ['Business Analyst', 'Marketing Manager', 'HR Professional', 'Entrepreneur'],
  },
  {
    id: 6,
    title: 'Master of Science (M.Sc)',
    category: 'Science',
    level: 'Postgraduate',
    duration: '2 Years (4 Semesters)',
    students: '150+',
    image: 'https://images.unsplash.com/photo-1576319155264-99536e0be1ee?w=900&q=80',
    imagePosition: 'center 35%',
    description:
      'Advanced scientific studies with emphasis on research methodology, specialized coursework, and dissertation work in chosen discipline.',
    subjects: ['Advanced Core Subjects', 'Research Methodology', 'Specialized Electives', 'Dissertation', 'Laboratory Research', 'Scientific Writing'],
    eligibility: 'B.Sc in relevant discipline, minimum 55% aggregate marks',
    careers: ['Research Scientist', 'University Professor', 'Scientific Consultant', 'R&D Manager'],
  },
  {
    id: 7,
    title: 'Master of Commerce (M.Com)',
    category: 'Commerce',
    level: 'Postgraduate',
    duration: '2 Years (4 Semesters)',
    students: '180+',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80',
    description:
      'Advanced commerce program with specializations in Accounting, Finance, or Business Management, preparing students for leadership roles.',
    subjects: ['Advanced Accounting', 'Corporate Finance', 'Strategic Management', 'Research Methods', 'International Business', 'Dissertation'],
    eligibility: 'B.Com with minimum 50% aggregate marks',
    careers: ['Finance Director', 'Chartered Accountant', 'Management Consultant', 'Academic Faculty'],
  },
  {
    id: 8,
    title: 'Master of Computer Applications (MCA)',
    category: 'Computer Science',
    level: 'Postgraduate',
    duration: '2 Years (4 Semesters)',
    students: '120+',
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=900&q=80',
    description:
      'Advanced computer science program with focus on software engineering, data science, artificial intelligence, and project development.',
    subjects: ['Advanced Algorithms', 'Machine Learning', 'Cloud Computing', 'Cyber Security', 'Big Data Analytics', 'Project Work'],
    eligibility: 'BCA/B.Sc with Mathematics, minimum 55% aggregate marks',
    careers: ['Software Architect', 'Data Scientist', 'AI/ML Engineer', 'Technical Lead'],
  },
];

const advantages = [
  {
    icon: GraduationCap,
    title: 'Expert faculty',
    description: '50+ distinguished educators with extensive academic and industry experience.',
  },
  {
    icon: BookOpen,
    title: 'Updated curriculum',
    description: 'Industry-aligned syllabus revised regularly to meet current demands.',
  },
  {
    icon: Users,
    title: 'Personalized learning',
    description: 'Optimal student-faculty ratio ensuring individual attention.',
  },
  {
    icon: Award,
    title: 'Placement excellence',
    description: '95% placement rate with partnerships with leading organisations.',
  },
];

function downloadProspectus() {
  const lines = [
    "ST. AUGUSTINE'S COLLEGE — ACADEMIC PROSPECTUS",
    'Excellence since 1985 · NAAC A+ accredited',
    '',
    '123 University Avenue, Academic District, AD 12345',
    '+1 (234) 567-890 · admissions@staugustines.edu',
    '',
    'PROGRAMS',
    '========',
    '',
    ...courses.flatMap((course) => [
      `${course.title}`,
      `${course.level} · ${course.category} · ${course.duration} · ${course.students} students`,
      `${course.description}`,
      `Core subjects: ${course.subjects.join(', ')}`,
      `Eligibility: ${course.eligibility}`,
      `Careers: ${course.careers.join(', ')}`,
      '',
    ]),
    'ADMISSIONS',
    '==========',
    'Applications are open for the upcoming academic year.',
    'Visit the admissions page or contact the admissions office to apply.',
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'St-Augustines-College-Prospectus.txt';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function CoursesPage({ setCurrentPage }: CoursesPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' ||
      course.category === selectedCategory ||
      course.level === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
  };

  return (
    <div className="bg-main-bg">
      <PageHero
        eyebrow="Academic programs"
        title={
          <>
            Study with <span className="highlight">purpose</span>, graduate with direction
          </>
        }
        description="Comprehensive undergraduate and postgraduate programs designed to prepare you for academic excellence and professional success."
        setCurrentPage={setCurrentPage}
        facts={[
          { value: '25+', label: 'Programs' },
          { value: '8', label: 'Departments' },
          { value: '95%', label: 'Placement' },
        ]}
        badge={{ value: '8', label: 'Programs listed' }}
        primaryLabel="Apply for admission"
        secondaryLabel="Talk to admissions"
        secondaryPage="contact"
      />

      {/* Search & filter */}
      <div className="sticky top-[68px] z-30 border-y border-rule bg-main-bg/95 backdrop-blur-xl">
        <div className="container py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-[340px]">
              <label htmlFor="program-search" className="visually-hidden">
                Search academic programs
              </label>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-text"
                aria-hidden="true"
              />
              <input
                id="program-search"
                type="search"
                placeholder="Search programs, subjects…"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="field field--icon !min-h-[46px] !py-2.5 !text-[13.5px]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={selectedCategory === category}
                  className={`rounded-full border px-3.5 py-1.5 text-[11.5px] font-semibold transition-colors ${
                    selectedCategory === category
                      ? 'border-coral-orange bg-coral-orange text-white-surface'
                      : 'border-rule bg-main-bg text-primary-text-2 hover:border-rule-2 hover:text-coral-orange'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Listing */}
      <section className="pb-20 pt-12 lg:pb-28 lg:pt-16">
        <div className="container">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[13px] text-secondary-text">
              Showing <span className="font-semibold text-coral-orange">{filteredCourses.length}</span>{' '}
              {filteredCourses.length === 1 ? 'program' : 'programs'}
              {selectedCategory !== 'All' && (
                <span>
                  {' '}
                  in <span className="font-semibold text-primary-text">{selectedCategory}</span>
                </span>
              )}
            </p>
            {(searchTerm || selectedCategory !== 'All') && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-coral-orange transition-colors hover:text-coral-orange"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                Clear filters
              </button>
            )}
          </div>

          {filteredCourses.length === 0 ? (
            <div className="rounded-[26px] border border-rule bg-main-bg/50 px-6 py-16 text-center">
              <BookOpen className="mx-auto h-8 w-8 text-coral-orange" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-[26px] text-primary-text">No programs match that search</h2>
              <p className="mx-auto mt-3 max-w-[42ch] text-[14px] leading-relaxed text-primary-text-2">
                Try a broader subject or reset the filters to view all eight programs.
              </p>
              <button type="button" onClick={resetFilters} className="btn btn--primary mt-6">
                Show all programs
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {filteredCourses.map((course, index) => {
                const expanded = expandedCourse === course.id;
                return (
                  <Reveal key={course.id} delay={(index % 3) * 40}>
                    <article className="overflow-hidden rounded-[26px] border border-rule bg-main-bg transition-all duration-500 hover:border-rule-2 hover:shadow-[0_28px_60px_-42px_rgba(42,22,27,0.38)]">
                      <div className="lg:flex">
                        <div className="relative group h-[240px] overflow-hidden lg:h-auto lg:w-[34%] lg:min-h-[300px]">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                            style={'imagePosition' in course && course.imagePosition ? { objectPosition: course.imagePosition } : undefined}
                            loading={index < 2 ? 'eager' : 'lazy'}
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink/10" />
                          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                            <span className="rounded-full bg-main-bg/95 px-3 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-coral-orange shadow-sm backdrop-blur">
                              {course.level}
                            </span>
                            <span className="rounded-full bg-coral-orange px-3 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-white-surface shadow-sm">
                              {course.category}
                            </span>
                          </div>
                          <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white-surface/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {String(index + 1).padStart(2, '0')} / {String(filteredCourses.length).padStart(2, '0')}
                          </span>
                        </div>

                        <div className="p-6 sm:p-8 lg:w-[66%]">
                          <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                              <h2 className="max-w-[26ch] font-serif text-[24px] leading-[1.1] text-primary-text sm:text-[28px]">
                                {course.title}
                              </h2>
                              <p className="mt-2 flex items-center gap-1.5 text-coral-orange" aria-label="Five star program">
                                {[0, 1, 2, 3, 4].map((star) => (
                                  <Star
                                    key={star}
                                    className="h-3.5 w-3.5"
                                    fill="currentColor"
                                    aria-hidden="true"
                                  />
                                ))}
                              </p>
                            </div>
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-rule-2 text-coral-orange">
                              <GraduationCap className="h-4 w-4" aria-hidden="true" />
                            </span>
                          </div>

                          <p className="mt-4 max-w-[62ch] text-[14px] leading-[1.75] text-primary-text-2">
                            {course.description}
                          </p>

                          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-secondary-text">
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 text-coral-orange" aria-hidden="true" />
                              {course.duration}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Users className="h-3.5 w-3.5 text-coral-orange" aria-hidden="true" />
                              {course.students} students
                            </span>
                            <span className="flex items-center gap-1.5">
                              <BookOpen className="h-3.5 w-3.5 text-coral-orange" aria-hidden="true" />
                              {course.level}
                            </span>
                          </div>

                          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-5">
                            <button
                              type="button"
                              onClick={() => setExpandedCourse(expanded ? null : course.id)}
                              aria-expanded={expanded}
                              aria-controls={`course-details-${course.id}`}
                              className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-coral-orange transition-colors hover:text-coral-orange"
                            >
                              {expanded ? 'Show less' : 'View full details'}
                              <ChevronDown
                                className={`h-4 w-4 transition-transform duration-300 ${
                                  expanded ? 'rotate-180' : ''
                                }`}
                                aria-hidden="true"
                              />
                            </button>
                            <button
                              type="button"
                              onClick={() => setCurrentPage('admission')}
                              className="btn btn--primary !min-h-[44px] !px-5 !text-[12px]"
                            >
                              Apply now
                              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>
                          </div>

                          <div
                            id={`course-details-${course.id}`}
                            className={`overflow-hidden transition-all duration-500 ${
                              expanded ? 'mt-6 max-h-[900px] border-t border-rule pt-6 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                            aria-hidden={!expanded}
                          >
                            <div className="grid gap-7 md:grid-cols-2">
                              <div>
                                <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-secondary-text">
                                  Core subjects
                                </h3>
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {course.subjects.map((subject) => (
                                    <span
                                      key={subject}
                                      className="rounded-full bg-main-bg/80 px-3 py-1.5 text-[11.5px] text-primary-text-2"
                                    >
                                      {subject}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-secondary-text">
                                  Career opportunities
                                </h3>
                                <ul className="mt-3 space-y-2">
                                  {course.careers.map((career) => (
                                    <li
                                      key={career}
                                      className="flex items-center gap-2 text-[12.5px] text-primary-text-2"
                                    >
                                      <CheckCircle className="h-3.5 w-3.5 shrink-0 text-coral-orange" aria-hidden="true" />
                                      {career}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="md:col-span-2">
                                <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-secondary-text">
                                  Eligibility
                                </h3>
                                <p className="mt-2 text-[13px] leading-relaxed text-primary-text-2">
                                  {course.eligibility}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Why choose */}
      <section className="relative overflow-hidden bg-[#E44A2E] py-20 text-white-surface lg:py-24">
        <div className="pattern-bg pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden="true" />
        <div className="container relative">
          <Reveal>
            <SectionHeading
              eyebrow="Academic excellence"
              title={
                <>
                  Why choose our <span className="italic text-soft-coral">programs</span>
                </>
              }
              description="A curriculum built around depth, mentorship and the practical confidence to put knowledge to work."
              tone="dark"
            />
          </Reveal>

          <div className="mt-10 grid overflow-hidden rounded-[26px] border border-white-surface/20 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((item, index) => {
              const Icon = item.icon;
              const dividerClass =
                index === 0
                  ? ''
                  : index === 2
                    ? 'sm:border-t lg:border-t-0 lg:border-l border-white-surface/20'
                    : index === 3
                      ? 'sm:border-t sm:border-l lg:border-t-0 border-white-surface/20'
                      : 'sm:border-l border-white-surface/20'; // index 1
              return (
                <Reveal key={item.title} delay={index * 60} className="h-full">
                  <div className={`h-full bg-[#E44A2E] px-6 py-8 ${dividerClass}`}>
                    <div className="flex items-start justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white-surface/20 text-white-surface ring-1 ring-white-surface/25">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[10px] text-white-surface/35">0{index + 1}</span>
                    </div>
                    <h3 className="mt-5 font-serif text-[20px] leading-tight text-white-surface">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-white-surface/70">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <TimetableSection />
      <ProspectusPanel onDownload={downloadProspectus} onApply={() => setCurrentPage('admission')} />

      <div className="pt-20 lg:pt-24">
        <CallToAction
          title={
            <>
              Ready to begin your <span className="italic text-[#FF5638]">academic journey</span>?
            </>
          }
          description="Admissions are now open for the upcoming academic year. Take the first step toward your future."
          image="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80"
          onPrimary={() => setCurrentPage('admission')}
          onSecondary={() => setCurrentPage('contact')}
        />
      </div>
    </div>
  );
}

const timetableSchedules = [
  {
    grade: 'Science (Grade 11)',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    periods: [
      ['Physics', 'Chemistry', 'Math', 'Biology', 'English'],
      ['Chemistry', 'Math', 'Physics', 'English', 'Biology'],
      ['Math', 'Physics', 'Chemistry', 'Biology', 'English'],
      ['Biology', 'Math', 'Chemistry', 'Physics', 'English'],
      ['English', 'Physics', 'Math', 'Chemistry', 'Biology'],
    ],
  },
  {
    grade: 'Commerce (Grade 11)',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    periods: [
      ['Accounts', 'Economics', 'B. Studies', 'Math', 'English'],
      ['Economics', 'Accounts', 'Math', 'B. Studies', 'English'],
      ['B. Studies', 'Math', 'Accounts', 'Economics', 'English'],
      ['Math', 'Accounts', 'Economics', 'B. Studies', 'English'],
      ['English', 'B. Studies', 'Math', 'Accounts', 'Economics'],
    ],
  },
  {
    grade: 'B.Sc (Year 1)',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    periods: [
      ['Physics', 'Chemistry', 'Math', 'Lab', 'Envi. Sci'],
      ['Chemistry', 'Math', 'Physics', 'Lab', 'English'],
      ['Math', 'Physics', 'Chemistry', 'Lab', 'Envi. Sci'],
      ['Physics', 'Chemistry', 'Math', 'Lab', 'English'],
      ['Envi. Sci', 'Math', 'Physics', 'Chemistry', 'English'],
    ],
  },
  {
    grade: 'B.Com (Year 1)',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    periods: [
      ['F. Accounting', 'Economics', 'B. Law', 'Math/Stats', 'English'],
      ['Economics', 'F. Accounting', 'B. Law', 'Math/Stats', 'English'],
      ['B. Law', 'Math/Stats', 'F. Accounting', 'Economics', 'English'],
      ['Math/Stats', 'B. Law', 'Economics', 'F. Accounting', 'English'],
      ['English', 'F. Accounting', 'Economics', 'B. Law', 'Math/Stats'],
    ],
  },
  {
    grade: 'BCA (Year 1)',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    periods: [
      ['C Programming', 'Math', 'D. Logic', 'C Lab', 'English'],
      ['Math', 'C Programming', 'D. Logic', 'Web Lab', 'English'],
      ['D. Logic', 'C Programming', 'Math', 'C Lab', 'English'],
      ['C Programming', 'Math', 'D. Logic', 'Web Lab', 'English'],
      ['English', 'D. Logic', 'C Programming', 'Math', 'C Lab'],
    ],
  },
];

function TimetableSection() {
  const [selected, setSelected] = useState(timetableSchedules[0].grade);

  const current = timetableSchedules.find((schedule) => schedule.grade === selected) || timetableSchedules[0];

  return (
    <section className="border-y border-rule bg-main-bg/45 py-20 lg:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Schedule"
            title={
              <>
                Weekly class <span className="highlight highlight--outline">timetable</span>
              </>
            }
            description="View weekly class schedules by program. Timetables may be adjusted each semester."
            align="center"
          />
        </Reveal>

        <Reveal>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {timetableSchedules.map((schedule) => (
              <button
                key={schedule.grade}
                type="button"
                onClick={() => setSelected(schedule.grade)}
                aria-pressed={selected === schedule.grade}
                className={`rounded-full border px-4 py-2 text-[11.5px] font-semibold transition-colors ${
                  selected === schedule.grade
                    ? 'border-coral-orange bg-coral-orange text-white-surface'
                    : 'border-rule bg-main-bg text-primary-text-2 hover:border-rule-2 hover:text-coral-orange'
                }`}
              >
                {schedule.grade}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-[22px] border border-rule bg-main-bg shadow-[0_24px_50px_-40px_rgba(42,22,27,0.35)]">
            <div className="overflow-x-auto">
              <table className="data-table">
                <caption className="visually-hidden">
                  Weekly timetable for {current.grade}
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Day</th>
                    {[1, 2, 3, 4, 5].map((period) => (
                      <th key={period} scope="col" className="text-center">
                        Period {period}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {current.days.map((day, dayIndex) => (
                    <tr key={day}>
                      <th scope="row" className="whitespace-nowrap px-4 py-3 text-left font-serif text-[15px] font-medium text-coral-orange">
                        {day}
                      </th>
                      {current.periods[dayIndex].map((subject, subjectIndex) => (
                        <td key={`${day}-${subjectIndex}`} className="px-3 py-3 text-center text-[12.5px]">
                          {subject}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProspectusPanel({ onDownload, onApply }: { onDownload: () => void; onApply: () => void }) {
  return (
    <section className="py-16 lg:py-20">
      <div className="container">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 rounded-[26px] border border-rule bg-main-bg/60 px-6 py-7 sm:px-8 lg:flex-row lg:items-center">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-coral-orange text-[#FF5638]">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-serif text-[22px] leading-tight text-primary-text">
                  Take the prospectus with you
                </h2>
                <p className="mt-1.5 max-w-[52ch] text-[13px] leading-relaxed text-primary-text-2">
                  A complete overview of programs, eligibility and career pathways — ready to read
                  offline or share with your family.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={onDownload} className="btn btn--outline">
                <Download className="h-4 w-4" aria-hidden="true" />
                Download prospectus
              </button>
              <button type="button" onClick={onApply} className="btn btn--primary">
                Apply now
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
