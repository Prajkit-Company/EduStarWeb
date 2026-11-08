import { Trophy, Medal, Star, Award, TrendingUp, ArrowUpRight } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { CallToAction } from '../components/CallToAction';

interface AchievementsPageProps {
  setCurrentPage: (page: string) => void;
}

const toppers = [
  {
    name: 'Priya Sharma',
    batch: '2024',
    course: 'B.Sc Physics',
    percentage: '98.5%',
    rank: 'University Gold Medalist',
    achievement: "Chancellor's Award for Academic Excellence",
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80',
  },
  {
    name: 'Rahul Verma',
    batch: '2024',
    course: 'BCA',
    percentage: '97.8%',
    rank: '2nd in University',
    achievement: 'Best Final Year Project Award',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80',
  },
  {
    name: 'Ananya Singh',
    batch: '2024',
    course: 'B.Com Honours',
    percentage: '96.9%',
    rank: '3rd in University',
    achievement: 'Commerce Excellence Award',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80',
  },
  {
    name: 'Vikram Patel',
    batch: '2023',
    course: 'M.Sc Chemistry',
    percentage: '98.2%',
    rank: 'University Topper',
    achievement: 'Best Research Publication Award',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80',
  },
  {
    name: 'Sneha Reddy',
    batch: '2023',
    course: 'BBA',
    percentage: '95.7%',
    rank: 'College Topper',
    achievement: 'Young Entrepreneur Award',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=80',
  },
  {
    name: 'Arjun Kumar',
    batch: '2023',
    course: 'B.A English',
    percentage: '94.5%',
    rank: 'College Topper',
    achievement: 'Best Literary Contribution Award',
    image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=500&q=80',
  },
];

const institutionalAchievements = [
  {
    year: '2024',
    title: 'Best College Award',
    organization: 'State Higher Education Council',
    description:
      'Recognized as the leading institution in the state for academic excellence and holistic education.',
  },
  {
    year: '2023',
    title: 'NAAC A+ Accreditation',
    organization: 'National Assessment and Accreditation Council',
    description:
      'Awarded the highest accreditation grade for our commitment to quality education and institutional standards.',
  },
  {
    year: '2023',
    title: 'Green Campus Certification',
    organization: 'Ministry of Environment',
    description:
      'Certified for sustainable practices, eco-friendly initiatives, and environmental responsibility.',
  },
  {
    year: '2022',
    title: 'Excellence in Digital Education',
    organization: 'National Education Technology Forum',
    description:
      'Recognized for innovative implementation of digital learning solutions and smart classroom technology.',
  },
  {
    year: '2022',
    title: 'Inter-University Sports Championship',
    organization: 'University Sports Federation',
    description: 'Overall champions in the regional inter-university sports competition.',
  },
  {
    year: '2021',
    title: 'Research Excellence Award',
    organization: 'National Research Council',
    description:
      'Honored for outstanding contributions to academic research and scholarly publications.',
  },
];

const notableAlumni = [
  {
    name: 'Dr. Meera Krishnan',
    batch: '1995',
    role: 'Chief Scientific Officer, NASA',
    achievement: 'Leading space research initiatives',
    image: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=500&q=80',
  },
  {
    name: 'Rajesh Malhotra',
    batch: '2000',
    role: 'CEO, Fortune 500 Technology Company',
    achievement: 'Pioneer in AI-driven enterprise solutions',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80',
  },
  {
    name: 'Dr. Sunita Rao',
    batch: '2005',
    role: 'Award-winning Author & Professor',
    achievement: 'Booker Prize nominee',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500&q=80',
  },
  {
    name: 'Amit Sharma',
    batch: '2008',
    role: 'Olympic Medalist - Athletics',
    achievement: 'National sports icon',
    image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&q=80',
  },
];

const records = [
  { value: '15', label: 'University toppers', icon: Trophy },
  { value: '150+', label: 'Awards & honors', icon: Medal },
  { value: '95%', label: 'Placement rate', icon: TrendingUp },
  { value: '500+', label: 'Research papers', icon: Star },
];

const milestones = [
  { year: '2024', record: 'Three students ranked in University Top 5 — an unprecedented achievement' },
  { year: '2023', record: '100% pass result across all postgraduate programs' },
  { year: '2022', record: 'Record 25 research papers published in international journals' },
  { year: '2021', record: 'First institution in the region to achieve Green Campus Certification' },
  { year: '2020', record: 'Highest placement package of ₹28 LPA secured by a Computer Science graduate' },
];

export function AchievementsPage({ setCurrentPage }: AchievementsPageProps) {
  return (
    <div className="bg-main-bg">
      <PageHero
        eyebrow="Our pride"
        title={
          <>
            Achievements &amp; <span className="highlight">recognition</span>
          </>
        }
        description="Celebrating excellence—our students and institution continue to set new benchmarks in academic, research and extracurricular achievement."
        setCurrentPage={setCurrentPage}
        facts={[
          { value: '15', label: 'Toppers' },
          { value: '150+', label: 'Honors' },
          { value: '95%', label: 'Placement' },
        ]}
        badge={{ value: 'A+', label: 'NAAC grade' }}
        primaryLabel="Explore programs"
        primaryPage="courses"
        secondaryLabel="Meet our toppers"
        secondaryPage="achievements"
      />

      {/* Records */}
      <section className="pb-20 lg:pb-24">
        <div className="container">
          <Reveal>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] border border-rule bg-rule shadow-[0_24px_50px_-38px_rgba(42,22,27,0.35)] lg:grid-cols-4">
              {records.map((record, index) => {
                const Icon = record.icon;
                return (
                  <div
                    key={record.label}
                    className="group bg-main-bg px-5 py-7 transition-colors duration-300 hover:bg-main-bg/55 sm:px-7 sm:py-8"
                  >
                    <div className="flex items-start justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-main-bg text-coral-orange transition-colors group-hover:bg-coral-orange group-hover:text-[#FF5638]">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[9px] text-secondary-text">0{index + 1}</span>
                    </div>
                    <p className="mt-4 font-serif text-[38px] leading-none text-coral-orange sm:text-[44px]">
                      {record.value}
                    </p>
                    <p className="mt-2 text-[11.5px] font-medium uppercase tracking-[0.07em] text-primary-text-2">
                      {record.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Toppers */}
      <section className="pb-20 lg:pb-28">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Academic excellence"
              title={
                <>
                  Our distinguished <span className="highlight highlight--outline">toppers</span>
                </>
              }
              description="Students who have achieved remarkable academic success and brought honour to our institution."
              action={
                <button
                  type="button"
                  onClick={() => setCurrentPage('courses')}
                  className="btn btn--outline"
                >
                  Academic programs
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              }
            />
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {toppers.map((topper, index) => (
              <Reveal key={topper.name} delay={(index % 3) * 70}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-rule bg-main-bg transition-all duration-500 hover:-translate-y-1 hover:border-rule-2 hover:shadow-[0_30px_60px_-38px_rgba(42,22,27,0.45)]">
                  <div className="relative h-[230px] overflow-hidden bg-coral-orange">
                    <img
                      src={topper.image}
                      alt={topper.name}
                      className="h-full w-full object-cover object-top opacity-90 transition-transform duration-700 group-hover:scale-[1.04]"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-#e44a2e/85 via-#e44a2e/10 to-transparent" />
                    <span className="absolute right-4 top-4 rounded-full bg-coral-orange px-3 py-1 font-mono text-[11px] font-semibold text-primary-text shadow">
                      {topper.percentage}
                    </span>
                    <div className="absolute inset-x-4 bottom-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-paper/25 bg-coral-orange-deep/60 px-3 py-1 text-[10.5px] font-semibold text-white-surface backdrop-blur">
                        <Trophy className="h-3 w-3 text-[#FF5638]" aria-hidden="true" />
                        {topper.rank}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-serif text-[22px] leading-tight text-primary-text">{topper.name}</h3>
                    <p className="mt-1 text-[13px] font-semibold text-coral-orange">{topper.course}</p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-secondary-text">
                      Class of {topper.batch}
                    </p>
                    <div className="mt-auto flex items-start gap-2 border-t border-rule pt-4 text-[12.5px] leading-relaxed text-primary-text-2">
                      <Award className="mt-0.5 h-4 w-4 shrink-0 text-coral-orange" aria-hidden="true" />
                      {topper.achievement}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional achievements */}
      <section className="relative overflow-hidden bg-coral-orange py-20 text-white-surface lg:py-28">
        <div className="pattern-bg pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full border border-paper/10"
          aria-hidden="true"
        />
        <div className="container relative">
          <Reveal>
            <SectionHeading
              eyebrow="Institutional glory"
              title={
                <>
                  A record of <span className="italic text-[#FF5638]">distinction</span>
                </>
              }
              description="Recognition earned through the discipline, curiosity and care of our whole community."
              tone="dark"
            />
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {institutionalAchievements.map((achievement, index) => (
              <Reveal key={achievement.title} delay={(index % 3) * 70}>
                <article className="group flex h-full gap-4 rounded-[22px] border border-paper/15 bg-main-bg/[0.06] p-5 backdrop-blur-sm transition-colors duration-300 hover:bg-main-bg/[0.11]">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-coral-orange text-primary-text">
                    <Trophy className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#FF5638]">
                      {achievement.year}
                    </p>
                    <h3 className="mt-1.5 font-serif text-[19px] leading-tight text-white-surface">
                      {achievement.title}
                    </h3>
                    <p className="mt-1 text-[11.5px] text-white-surface/55">{achievement.organization}</p>
                    <p className="mt-2.5 text-[12.5px] leading-relaxed text-white-surface/75">
                      {achievement.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Our pride"
              title={
                <>
                  Distinguished <span className="highlight">alumni</span>
                </>
              }
              description="Graduates who have achieved remarkable success and continue to inspire current students."
              align="center"
            />
          </Reveal>

          <div className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {notableAlumni.map((alumni, index) => (
              <Reveal key={alumni.name} delay={index * 70}>
                <article className="group text-center">
                  <div className="relative mx-auto w-[170px]">
                    <div className="arch-short overflow-hidden border-[5px] border-paper bg-main-bg shadow-[0_22px_44px_-30px_rgba(42,22,27,0.5)]">
                      <img
                        src={alumni.image}
                        alt={alumni.name}
                        className="h-[220px] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-coral-orange px-3 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-white-surface shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Class of {alumni.batch}
                    </span>
                  </div>
                  <h3 className="mt-7 font-serif text-[20px] leading-tight text-primary-text">{alumni.name}</h3>
                  <p className="mt-1.5 text-[12px] font-semibold text-coral-orange">{alumni.role}</p>
                  <p className="mx-auto mt-2 max-w-[26ch] text-[12.5px] leading-relaxed text-secondary-text">
                    {alumni.achievement}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="border-y border-rule bg-main-bg/45 py-20 lg:py-28">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Hall of records"
              title={
                <>
                  Historic <span className="highlight highlight--ochre">milestones</span>
                </>
              }
              description="The moments that mark our progress—and set the standard for the years ahead."
              action={
                <button
                  type="button"
                  onClick={() => setCurrentPage('about')}
                  className="btn btn--outline border-white/45 bg-white-surface/35 shadow-[0_10px_24px_-18px_rgba(17,17,17,0.2)] backdrop-blur-md hover:bg-white-surface/55"
                >
                  Our story
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              }
            />
          </Reveal>

          <div className="mt-10 overflow-hidden rounded-[24px] border border-rule bg-main-bg">
            {milestones.map((item, index) => (
              <Reveal key={item.year} delay={index * 50}>
                <div className="group flex items-center gap-4 border-b border-rule p-5 transition-colors last:border-b-0 hover:bg-main-bg/50 sm:gap-6 sm:p-6">
                  <div className="flex h-[64px] w-[64px] shrink-0 flex-col items-center justify-center rounded-2xl bg-main-bg transition-colors group-hover:bg-coral-orange sm:h-[70px] sm:w-[74px]">
                    <span className="font-serif text-[20px] leading-none text-coral-orange group-hover:text-primary-text">
                      {item.year}
                    </span>
                  </div>
                  <Star
                    className="hidden h-4 w-4 shrink-0 text-coral-orange sm:block"
                    fill="currentColor"
                    aria-hidden="true"
                  />
                  <p className="flex-1 text-[13.5px] leading-relaxed text-primary-text-2">{item.record}</p>
                  <span className="font-mono text-[10px] text-secondary-text">0{index + 1}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-20 lg:pt-28">
        <CallToAction
          title={
            <>
              Write your own <span className="italic text-[#FF5638]">success story</span>
            </>
          }
          description="Join St. Augustine's College and become part of our legacy of excellence."
          image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80"
          onPrimary={() => setCurrentPage('contact')}
          onSecondary={() => setCurrentPage('admission')}
          primaryLabel="Apply now"
          secondaryLabel="Visit the campus"
        />
      </div>
    </div>
  );
}
