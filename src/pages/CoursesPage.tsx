import { useState, useEffect } from 'react';
import { 
  Search, Clock, Users, BookOpen, GraduationCap, 
  ArrowRight, CheckCircle, ChevronDown, Award, Star
} from 'lucide-react';

interface CoursesPageProps {
  setCurrentPage: (page: string) => void;
}

export function CoursesPage({ setCurrentPage }: CoursesPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);
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

  const categories = ['All', 'Undergraduate', 'Postgraduate', 'Science', 'Commerce', 'Arts', 'Computer Science'];

  const courses = [
    {
      id: 1,
      title: 'Bachelor of Science (B.Sc)',
      category: 'Science',
      level: 'Undergraduate',
      duration: '3 Years (6 Semesters)',
      students: '350+',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80',
      description: 'A rigorous program offering specializations in Physics, Chemistry, Biology, and Mathematics, preparing students for careers in research, education, and industry.',
      subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Environmental Science', 'Research Methodology'],
      eligibility: '10+2 with Science stream, minimum 50% aggregate marks',
      careers: ['Research Scientist', 'Laboratory Analyst', 'Educator', 'Environmental Consultant']
    },
    {
      id: 2,
      title: 'Bachelor of Commerce (B.Com)',
      category: 'Commerce',
      level: 'Undergraduate',
      duration: '3 Years (6 Semesters)',
      students: '400+',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
      description: 'Comprehensive commerce education covering accounting, finance, taxation, and business management with practical industry exposure.',
      subjects: ['Financial Accounting', 'Business Economics', 'Corporate Law', 'Taxation', 'Cost Accounting', 'Business Statistics'],
      eligibility: '10+2 with Commerce stream, minimum 45% aggregate marks',
      careers: ['Chartered Accountant', 'Financial Analyst', 'Tax Consultant', 'Banking Professional']
    },
    {
      id: 3,
      title: 'Bachelor of Computer Applications (BCA)',
      category: 'Computer Science',
      level: 'Undergraduate',
      duration: '3 Years (6 Semesters)',
      students: '300+',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80',
      description: 'Industry-aligned program focusing on programming, software development, database management, and emerging technologies.',
      subjects: ['Programming in C/C++/Java', 'Data Structures', 'Database Management', 'Web Technologies', 'Software Engineering', 'Networking'],
      eligibility: '10+2 with Mathematics, minimum 50% aggregate marks',
      careers: ['Software Developer', 'Web Developer', 'System Analyst', 'Database Administrator']
    },
    {
      id: 4,
      title: 'Bachelor of Arts (B.A)',
      category: 'Arts',
      level: 'Undergraduate',
      duration: '3 Years (6 Semesters)',
      students: '250+',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80',
      description: 'A liberal arts program offering diverse specializations in humanities and social sciences, developing critical thinking and communication skills.',
      subjects: ['English Literature', 'History', 'Political Science', 'Psychology', 'Sociology', 'Economics'],
      eligibility: '10+2 any stream, minimum 45% aggregate marks',
      careers: ['Civil Services', 'Journalism', 'Social Work', 'Content Development']
    },
    {
      id: 5,
      title: 'Bachelor of Business Administration (BBA)',
      category: 'Commerce',
      level: 'Undergraduate',
      duration: '3 Years (6 Semesters)',
      students: '200+',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80',
      description: 'Professional management education covering business fundamentals, marketing, finance, human resources, and entrepreneurship.',
      subjects: ['Management Principles', 'Marketing Management', 'Financial Management', 'Human Resource Management', 'Business Communication', 'Entrepreneurship'],
      eligibility: '10+2 any stream, minimum 50% aggregate marks',
      careers: ['Business Analyst', 'Marketing Manager', 'HR Professional', 'Entrepreneur']
    },
    {
      id: 6,
      title: 'Master of Science (M.Sc)',
      category: 'Science',
      level: 'Postgraduate',
      duration: '2 Years (4 Semesters)',
      students: '150+',
      image: 'https://images.unsplash.com/photo-1576319155264-99536e0be1ee?w=600&q=80',
      description: 'Advanced scientific studies with emphasis on research methodology, specialized coursework, and dissertation work in chosen discipline.',
      subjects: ['Advanced Core Subjects', 'Research Methodology', 'Specialized Electives', 'Dissertation', 'Laboratory Research', 'Scientific Writing'],
      eligibility: 'B.Sc in relevant discipline, minimum 55% aggregate marks',
      careers: ['Research Scientist', 'University Professor', 'Scientific Consultant', 'R&D Manager']
    },
    {
      id: 7,
      title: 'Master of Commerce (M.Com)',
      category: 'Commerce',
      level: 'Postgraduate',
      duration: '2 Years (4 Semesters)',
      students: '180+',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
      description: 'Advanced commerce program with specializations in Accounting, Finance, or Business Management, preparing students for leadership roles.',
      subjects: ['Advanced Accounting', 'Corporate Finance', 'Strategic Management', 'Research Methods', 'International Business', 'Dissertation'],
      eligibility: 'B.Com with minimum 50% aggregate marks',
      careers: ['Finance Director', 'Chartered Accountant', 'Management Consultant', 'Academic Faculty']
    },
    {
      id: 8,
      title: 'Master of Computer Applications (MCA)',
      category: 'Computer Science',
      level: 'Postgraduate',
      duration: '2 Years (4 Semesters)',
      students: '120+',
      image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&q=80',
      description: 'Advanced computer science program with focus on software engineering, data science, artificial intelligence, and project development.',
      subjects: ['Advanced Algorithms', 'Machine Learning', 'Cloud Computing', 'Cyber Security', 'Big Data Analytics', 'Project Work'],
      eligibility: 'BCA/B.Sc with Mathematics, minimum 55% aggregate marks',
      careers: ['Software Architect', 'Data Scientist', 'AI/ML Engineer', 'Technical Lead']
    },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
                           course.category === selectedCategory || 
                           course.level === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#fafaf8]">
      {/* Hero Section */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=75" 
            alt="Academic Programs"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c2340]/95 via-[#0c2340]/85 to-[#0c2340]/70" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#c9a962]/20 border border-[#c9a962]/30 rounded-full text-[#c9a962] text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              25+ Programs
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-white mb-6 leading-tight animate-slide-up">
              Academic Programs
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed animate-slide-up delay-100">
              Comprehensive undergraduate and postgraduate programs designed to prepare you 
              for academic excellence and professional success.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-white shadow-sm sticky top-[72px] z-30 border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:border-[#c9a962] transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-[#0c2340] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Listing */}
      <section id="courses" data-animate className="py-16">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-[#0c2340]">{filteredCourses.length}</span> programs
            </p>
          </div>

          <div className="space-y-6">
            {filteredCourses.map((course, index) => (
              <div 
                key={course.id}
                className={`card overflow-hidden ${isVisible['courses'] ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="lg:flex">
                  <div className="lg:w-1/3 h-64 lg:h-auto relative img-hover">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 bg-[#0c2340] text-white text-xs font-medium rounded-full">
                        {course.level}
                      </span>
                      <span className="px-3 py-1 bg-[#c9a962] text-white text-xs font-medium rounded-full">
                        {course.category}
                      </span>
                    </div>
                  </div>
                  <div className="lg:w-2/3 p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <h3 className="text-2xl font-serif font-semibold text-[#0c2340]">{course.title}</h3>
                      <div className="flex items-center gap-1 text-[#c9a962]">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed">{course.description}</p>
                    
                    <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-6">
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#c9a962]" /> {course.duration}
                      </span>
                      <span className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#c9a962]" /> {course.students} Students
                      </span>
                      <span className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-[#c9a962]" /> {course.level}
                      </span>
                    </div>

                    <button
                      onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                      className="text-[#0c2340] font-medium flex items-center gap-2 hover:text-[#c9a962] transition-colors"
                    >
                      {expandedCourse === course.id ? 'Show Less' : 'View Full Details'}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedCourse === course.id ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Expanded Details */}
                    <div className={`overflow-hidden transition-all duration-500 ${
                      expandedCourse === course.id ? 'max-h-[500px] mt-6 pt-6 border-t border-gray-100' : 'max-h-0'
                    }`}>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold text-[#0c2340] mb-3">Core Subjects</h4>
                          <div className="flex flex-wrap gap-2">
                            {course.subjects.map((subject, idx) => (
                              <span key={idx} className="px-3 py-1 bg-[#fafaf8] text-[#0c2340] text-sm rounded-lg">
                                {subject}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#0c2340] mb-3">Career Opportunities</h4>
                          <div className="space-y-2">
                            {course.careers.map((career, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-gray-600 text-sm">
                                <CheckCircle className="w-4 h-4 text-[#c9a962]" /> {career}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <h4 className="font-semibold text-[#0c2340] mb-2">Eligibility</h4>
                          <p className="text-gray-600 text-sm">{course.eligibility}</p>
                        </div>
                        <div className="md:col-span-2">
                          <button 
                            onClick={() => setCurrentPage('admission')}
                            className="btn-primary px-8 py-3 text-white rounded-lg font-medium inline-flex items-center gap-2"
                          >
                            Apply Now <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-[#c9a962] text-sm font-semibold tracking-widest uppercase mb-4">
              Academic Excellence
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-[#0c2340] mb-6">
              Why Choose Our Programs
            </h2>
            <div className="w-16 h-1 bg-[#c9a962] rounded mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: GraduationCap, title: 'Expert Faculty', desc: '50+ distinguished educators with extensive academic and industry experience' },
              { icon: BookOpen, title: 'Updated Curriculum', desc: 'Industry-aligned syllabus revised regularly to meet current demands' },
              { icon: Users, title: 'Personalized Learning', desc: 'Optimal student-faculty ratio ensuring individual attention' },
              { icon: Award, title: 'Placement Excellence', desc: '95% placement rate with partnerships with leading organizations' },
            ].map((item, index) => (
              <div key={index} className="text-center p-8 rounded-2xl hover:bg-[#fafaf8] transition-colors group">
                <div className="w-16 h-16 mx-auto bg-[#0c2340] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#c9a962] transition-colors duration-500 shadow-lg">
                  <item.icon className="w-8 h-8 text-[#c9a962] group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-[#0c2340] mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timetable Section */}
      <TimetableSection />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0c2340] to-[#1a3a5c]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif font-semibold text-white mb-6">
            Ready to Begin Your Academic Journey?
          </h2>
          <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto">
            Admissions are now open for the upcoming academic year. Take the first step toward your future.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setCurrentPage('admission')}
              className="btn-secondary px-10 py-4 text-white rounded-lg font-medium inline-flex items-center gap-3"
            >
              Apply for Admission <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-300">
              Download Prospectus
            </button>
          </div>
        </div>
      </section>
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

  const current = timetableSchedules.find((s) => s.grade === selected) || timetableSchedules[0];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-[#c9a962] text-sm font-semibold tracking-widest uppercase mb-4">
            Schedule
          </span>
          <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-[#0c2340] mb-6">
            Class Timetable
          </h2>
          <div className="w-16 h-1 bg-[#c9a962] rounded mx-auto mb-6" />
          <p className="text-gray-600 text-lg">
            View weekly class schedules by program. Timetables may be adjusted each semester.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {timetableSchedules.map((s) => (
            <button
              key={s.grade}
              onClick={() => setSelected(s.grade)}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                selected === s.grade
                  ? 'bg-[#0c2340] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {s.grade}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-100 max-w-4xl mx-auto">
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-[#0c2340]">
                <th className="px-4 py-3 text-left text-sm font-semibold text-white">Day</th>
                {[1,2,3,4,5].map((p) => (
                  <th key={p} className="px-3 py-3 text-center text-sm font-semibold text-white">
                    Period {p}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {current.days.map((day, i) => (
                <tr key={day} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="px-4 py-3 font-semibold text-[#0c2340] whitespace-nowrap">{day}</td>
                  {current.periods[i].map((subject, j) => (
                    <td key={j} className="px-3 py-3 text-center text-sm text-gray-700">
                      {subject}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
