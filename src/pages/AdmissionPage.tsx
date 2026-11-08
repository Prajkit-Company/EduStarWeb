import {
  CheckCircle,
  ClipboardCheck,
  CalendarDays,
  ArrowUpRight,
  Award,
  FileCheck,
  ScrollText,
  CircleDollarSign,
  BookOpen,
} from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { CallToAction } from '../components/CallToAction';

interface AdmissionPageProps {
  setCurrentPage: (page: string) => void;
}

const processSteps = [
  {
    icon: ClipboardCheck,
    title: 'Submit application',
    description:
      'Fill out the online admission inquiry form with accurate personal and academic details.',
  },
  {
    icon: FileCheck,
    title: 'Document verification',
    description:
      'Upload and submit required documents for verification by the admission committee.',
  },
  {
    icon: BookOpen,
    title: 'Entrance exam / interview',
    description: 'Appear for the entrance examination and personal interview as per the schedule.',
  },
  {
    icon: ScrollText,
    title: 'Merit list publication',
    description:
      'Qualified candidates are listed on the merit board based on academic performance and test scores.',
  },
  {
    icon: CheckCircle,
    title: 'Fee payment & enrolment',
    description: 'Complete the fee payment and confirm your enrollment to secure your seat.',
  },
];

const importantDates = [
  { event: 'Application start date', date: 'March 1, 2025' },
  { event: 'Application deadline', date: 'June 30, 2025' },
  { event: 'Entrance examination', date: 'July 15, 2025' },
  { event: 'Merit list release', date: 'July 25, 2025' },
  { event: 'Counseling & interview', date: 'August 1 - 10, 2025' },
  { event: 'Classes begin', date: 'September 1, 2025' },
];

const feeStructure = [
  { program: 'B.Sc', tuition: '45,000', labFee: '8,000', total: '53,000' },
  { program: 'B.Com', tuition: '35,000', labFee: '3,000', total: '38,000' },
  { program: 'BCA', tuition: '50,000', labFee: '10,000', total: '60,000' },
  { program: 'B.A', tuition: '30,000', labFee: '2,000', total: '32,000' },
  { program: 'BBA', tuition: '55,000', labFee: '5,000', total: '60,000' },
  { program: 'M.Sc', tuition: '60,000', labFee: '10,000', total: '70,000' },
  { program: 'M.Com', tuition: '45,000', labFee: '4,000', total: '49,000' },
  { program: 'MCA', tuition: '70,000', labFee: '12,000', total: '82,000' },
];

const requiredDocuments = [
  '10th Standard Marksheet & Certificate',
  '12th Standard Marksheet & Certificate',
  'Transfer Certificate (TC) from previous institution',
  'Migration Certificate (if applicable)',
  'Character Certificate from previous institution',
  'Passport size photographs (6 copies)',
  'Government ID proof (Aadhaar / Passport / DL)',
  'Caste / Category Certificate (if applicable)',
  'Income Certificate (for fee concession)',
  'Previous academic year mark sheets (for PG applicants)',
];

export function AdmissionPage({ setCurrentPage }: AdmissionPageProps) {
  return (
    <div className="bg-main-bg">
      <PageHero
        eyebrow="Admissions 2025–26"
        title={
          <>
            Begin your journey at <span className="highlight">St. Augustine&rsquo;s</span>
          </>
        }
        description="Take the first step toward a transformative educational experience. Explore our programs, understand the admission process, and apply today."
        setCurrentPage={setCurrentPage}
        facts={[
          { value: '8', label: 'Programs' },
          { value: 'Jun 30', label: 'Deadline' },
          { value: '95%', label: 'Placement' },
        ]}
        badge={{ value: 'Open', label: 'Applications' }}
        primaryLabel="Start your inquiry"
        primaryPage="admission"
        secondaryLabel="Explore programs"
        secondaryPage="courses"
        onPrimary={() => setCurrentPage('admission-inquiry')}
      />

      {/* Process */}
      <section className="pb-20 lg:pb-28">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Admission process"
              title={
                <>
                  How to <span className="highlight highlight--outline">apply</span>
                </>
              }
              description="Follow these simple steps to complete your admission application at St. Augustine's College."
              action={
                <button type="button" onClick={() => setCurrentPage('admission-inquiry')} className="btn btn--primary">
                  Start an inquiry
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              }
            />
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.title} delay={index * 60}>
                  <article className="group relative flex h-full flex-col rounded-[22px] border border-rule bg-main-bg p-5 transition-colors hover:border-rule-2 hover:bg-main-bg/35">
                    <div className="flex items-start justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-main-bg text-coral-orange transition-all duration-300 ease-out group-hover:scale-105 group-hover:bg-coral-orange group-hover:text-white group-hover:shadow-[0_10px_22px_-12px_rgba(255,86,56,0.65)] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                        <Icon className="h-5 w-5 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6 motion-reduce:transition-none motion-reduce:group-hover:transform-none" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.12em] text-coral-orange">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h2 className="mt-5 font-serif text-[19px] leading-tight text-primary-text">{step.title}</h2>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-primary-text-2">{step.description}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dates */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-4">
              <SectionHeading
                eyebrow="Important dates"
                title={
                  <>
                    The admission <span className="highlight">timeline</span>
                  </>
                }
                description="Mark these key dates to ensure you do not miss any part of the admission process."
              />
              <div className="mt-7 rounded-[22px] border border-rule bg-main-bg/60 p-5">
                <CalendarDays className="h-5 w-5 text-coral-orange" aria-hidden="true" />
                <p className="mt-3 font-serif text-[19px] leading-tight text-primary-text">
                  Deadline: June 30, 2025
                </p>
                <p className="mt-2 text-[12.5px] leading-relaxed text-primary-text-2">
                  Applications received after the deadline are considered only against vacant seats.
                </p>
                <button type="button" onClick={() => setCurrentPage('admission-inquiry')} className="btn btn--primary mt-4 !min-h-[44px] !px-5 !text-[12px]">
                  Apply before the deadline
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-8">
              <div className="overflow-hidden rounded-[24px] border border-rule bg-main-bg">
                <table className="data-table">
                  <caption className="visually-hidden">Admission timeline for 2025–26</caption>
                  <thead>
                    <tr>
                      <th scope="col">Event</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {importantDates.map((item) => (
                      <tr key={item.event}>
                        <th scope="row" className="px-5 py-4 text-left font-medium">
                          <span className="flex items-center gap-2.5 text-[13px] text-primary-text">
                            <CalendarDays className="h-3.5 w-3.5 shrink-0 text-coral-orange" aria-hidden="true" />
                            {item.event}
                          </span>
                        </th>
                        <td className="whitespace-nowrap px-5 py-4 text-[13px]">{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="border-y border-rule bg-main-bg/45 py-20 lg:py-28">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Fee structure"
              title={
                <>
                  Program fees, <span className="highlight highlight--ochre">clearly stated</span>
                </>
              }
              description="Competitive fee structure designed to make quality education accessible. All amounts in INR."
              action={
                <button type="button" onClick={() => setCurrentPage('contact')} className="btn btn--outline">
                  Ask about concessions
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              }
            />
          </Reveal>

          <Reveal>
            <div className="mt-9 overflow-hidden rounded-[24px] border border-rule bg-main-bg">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <caption className="visually-hidden">Annual program fees in Indian rupees</caption>
                  <thead>
                    <tr>
                      <th scope="col">Program</th>
                      <th scope="col">Tuition fee</th>
                      <th scope="col">Lab fee</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeStructure.map((item) => (
                      <tr key={item.program}>
                        <th scope="row" className="px-5 py-4 text-left">
                          <span className="flex items-center gap-2.5 font-serif text-[15px] font-medium text-primary-text">
                            <CircleDollarSign className="h-4 w-4 shrink-0 text-coral-orange" aria-hidden="true" />
                            {item.program}
                          </span>
                        </th>
                        <td className="whitespace-nowrap px-5 py-4 text-[13px]">₹{item.tuition}</td>
                        <td className="whitespace-nowrap px-5 py-4 text-[13px]">₹{item.labFee}</td>
                        <td className="whitespace-nowrap px-5 py-4 text-[13px] font-semibold text-coral-orange">
                          ₹{item.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="mt-3 text-[11.5px] text-secondary-text">
              * Fees are subject to revision. Additional charges for special programs may apply.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Documents */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-4">
              <SectionHeading
                eyebrow="Documents required"
                title={
                  <>
                    What you need to <span className="highlight">submit</span>
                  </>
                }
                description="Ensure you have the following documents ready before applying for admission."
              />
              <div className="mt-7 flex items-start gap-3 rounded-[22px] border border-rule bg-main-bg p-5">
                <Award className="mt-0.5 h-5 w-5 shrink-0 text-coral-orange" aria-hidden="true" />
                <p className="text-[12.5px] leading-relaxed text-primary-text-2">
                  Original documents must be produced for verification at the time of counselling.
                  Keep a scanned copy of each.
                </p>
              </div>
            </Reveal>

            <div className="lg:col-span-8">
              <div className="grid gap-3 sm:grid-cols-2">
                {requiredDocuments.map((document, index) => (
                  <Reveal key={document} delay={(index % 4) * 40}>
                    <div className="flex h-full items-start gap-3 rounded-2xl border border-rule bg-main-bg/35 p-4 transition-colors hover:border-rule-2 hover:bg-main-bg/65">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-main-bg text-coral-orange">
                        <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <span className="text-[12.5px] font-medium leading-relaxed text-primary-text">
                        {document}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToAction
        title={
          <>
            Ready to take the <span className="italic text-[#FF5638]">next step</span>?
          </>
        }
        description="Join thousands of successful alumni who began their journey at St. Augustine's College. Apply today and shape your future."
        image="https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?auto=format&fit=crop&w=900&q=80"
        onPrimary={() => setCurrentPage('admission-inquiry')}
        onSecondary={() => setCurrentPage('contact')}
        primaryLabel="Start your application"
        secondaryLabel="Contact admissions"
      />
    </div>
  );
}
