import { useState, type ChangeEvent, type FormEvent } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  User,
  AtSign,
  FileText,
  Building2,
  ArrowUpRight,
  MessageSquare,
} from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';

interface ContactPageProps {
  setCurrentPage: (page: string) => void;
}

const contactInfo = [
  {
    icon: MapPin,
    title: 'Campus address',
    details: ['123 University Avenue,', 'Academic District, AD 12345'],
  },
  {
    icon: Phone,
    title: 'Phone',
    details: ['+1 (234) 567-890', '+1 (234) 567-891'],
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['info@staugustines.edu', 'admissions@staugustines.edu'],
  },
  {
    icon: Clock,
    title: 'Office hours',
    details: ['Mon – Fri: 8:00 AM – 5:00 PM', 'Sat: 9:00 AM – 1:00 PM'],
  },
];

const subjects = [
  'General Inquiry',
  'Admission Information',
  'Program Details',
  'Fee Structure',
  'Scholarship Inquiry',
  'Campus Visit Request',
  'Career Guidance',
  'Feedback / Suggestion',
  'Other',
];

const departments = [
  { name: 'Admissions Office', email: 'admissions@staugustines.edu', phone: '+1 (234) 567-892' },
  { name: 'Academic Affairs', email: 'academics@staugustines.edu', phone: '+1 (234) 567-893' },
  { name: 'Student Services', email: 'students@staugustines.edu', phone: '+1 (234) 567-894' },
  { name: 'Examinations', email: 'exams@staugustines.edu', phone: '+1 (234) 567-895' },
];

const faqs = [
  {
    q: 'What are the admission requirements?',
    a: 'Admission requirements vary by program. Generally, you need to have completed 10+2 with relevant subjects and minimum required percentage. Please refer to specific program pages or contact our admissions office for detailed requirements.',
  },
  {
    q: 'What is the fee structure?',
    a: 'Fee structure varies by course and program level. We offer competitive tuition with various payment plans and financial aid options. Please contact our admissions office for detailed fee information.',
  },
  {
    q: 'Are scholarships available?',
    a: 'Yes, we offer merit-based scholarships, need-based financial aid, sports scholarships, and special scholarships for exceptional achievements in various fields.',
  },
  {
    q: 'What hostel facilities are available?',
    a: 'We provide separate hostel facilities for male and female students with modern amenities, mess facilities, Wi-Fi, and 24/7 security within the campus.',
  },
  {
    q: 'How can I schedule a campus visit?',
    a: 'You can schedule a campus visit by contacting our admissions office or filling out the contact form above. We conduct guided campus tours on weekdays.',
  },
];

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/staugustines' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/staugustines' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/staugustines' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/school/staugustines' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/staugustines' },
];

export function ContactPage({ setCurrentPage }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 8000);
    }, 1200);
  };

  const focusForm = () => {
    const field = document.getElementById('contact-name');
    field?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    field?.focus({ preventScroll: true });
  };

  return (
    <div className="bg-main-bg">
      <PageHero
        eyebrow="Get in touch"
        title={
          <>
            Let&rsquo;s start a <span className="highlight">conversation</span>
          </>
        }
        description="We're here to assist you. Reach out for any inquiries about admissions, programs, or general information about St. Augustine's College."
        setCurrentPage={setCurrentPage}
        facts={[
          { value: '24 hrs', label: 'Response' },
          { value: 'Mon–Sat', label: 'Open' },
          { value: '+1', label: 'Call us' },
        ]}
        badge={{ value: 'Open', label: 'Admissions' }}
        primaryLabel="Send a message"
        primaryPage="contact"
        secondaryLabel="Apply for admission"
        secondaryPage="admission"
        onPrimary={focusForm}
      />

      {/* Contact information */}
      <section className="pb-16 lg:pb-20">
        <div className="container">
          <div className="grid gap-px overflow-hidden rounded-[28px] border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Reveal key={info.title} delay={index * 60}>
                  <div className="h-full bg-main-bg px-5 py-7 sm:px-6">
                    <div className="flex items-start justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-main-bg text-coral-orange">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[9px] text-secondary-text">0{index + 1}</span>
                    </div>
                    <h2 className="mt-4 font-serif text-[19px] leading-tight text-primary-text">{info.title}</h2>
                    <div className="mt-2 space-y-0.5">
                      {info.details.map((detail) => (
                        <p key={detail} className="text-[12.5px] leading-relaxed text-primary-text-2">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form and map */}
      <section className="pb-20 lg:pb-28">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <div className="h-full rounded-[28px] border border-rule bg-main-bg p-6 shadow-[0_30px_60px_-50px_rgba(42,22,27,0.4)] sm:p-8 lg:p-10">
                <p className="eyebrow">Send a message</p>
                <h2 className="mt-4 max-w-[18ch] text-balance">
                  We&rsquo;d love to <span className="highlight">hear</span> from you
                </h2>
                <p className="mt-4 text-[14px] leading-relaxed text-primary-text-2">
                  Fill out the form below and our team will respond within 24 hours.
                </p>

                {isSubmitted ? (
                  <div className="mt-10 flex flex-col items-center rounded-[22px] border border-rule bg-main-bg/50 px-6 py-14 text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-main-bg text-coral-orange">
                      <CheckCircle className="h-8 w-8" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-serif text-[28px] text-primary-text">Message sent</h3>
                    <p className="mt-2 max-w-[44ch] text-[14px] leading-relaxed text-primary-text-2">
                      Thank you for reaching out. We&rsquo;ll get back to you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="btn btn--outline mt-6"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label htmlFor="contact-name" className="field-label">
                          Full name *
                        </label>
                        <div className="relative">
                          <User
                            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-text"
                            aria-hidden="true"
                          />
                          <input
                            id="contact-name"
                            type="text"
                            name="name"
                            placeholder="Your name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="field field--icon"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="field-label">
                          Email address *
                        </label>
                        <div className="relative">
                          <AtSign
                            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-text"
                            aria-hidden="true"
                          />
                          <input
                            id="contact-email"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="field field--icon"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label htmlFor="contact-phone" className="field-label">
                          Phone number
                        </label>
                        <div className="relative">
                          <Phone
                            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-text"
                            aria-hidden="true"
                          />
                          <input
                            id="contact-phone"
                            type="tel"
                            name="phone"
                            placeholder="+1 (234) 567-890"
                            value={formData.phone}
                            onChange={handleChange}
                            className="field field--icon"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="contact-subject" className="field-label">
                          Subject *
                        </label>
                        <div className="relative">
                          <FileText
                            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-text"
                            aria-hidden="true"
                          />
                          <select
                            id="contact-subject"
                            name="subject"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            className="field field--icon appearance-none pr-9"
                          >
                            <option value="" disabled>
                              Select a subject
                            </option>
                            {subjects.map((subject) => (
                              <option key={subject} value={subject}>
                                {subject}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="field-label">
                        Your message *
                      </label>
                      <div className="relative">
                        <MessageSquare
                          className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-secondary-text"
                          aria-hidden="true"
                        />
                        <textarea
                          id="contact-message"
                          name="message"
                          required
                          rows={5}
                          placeholder="How can we help?"
                          value={formData.message}
                          onChange={handleChange}
                          className="field field--icon resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-rule pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <p className="max-w-[36ch] text-[11px] leading-relaxed text-secondary-text">
                        By sending this message you agree to be contacted about your inquiry.
                      </p>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        aria-busy={isSubmitting}
                        className="btn btn--primary min-w-[180px]"
                      >
                        {isSubmitting ? (
                          <>
                            <span
                              className="h-4 w-4 animate-spin rounded-full border-2 border-paper/40 border-t-cream"
                              aria-hidden="true"
                            />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" aria-hidden="true" />
                            Send message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>

            <div className="grid gap-5 lg:col-span-5">
              <Reveal delay={80}>
                <div className="overflow-hidden rounded-[26px] border border-rule bg-main-bg">
                  <div className="flex items-center justify-between gap-4 border-b border-rule px-5 py-4">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-secondary-text">
                        Find us
                      </p>
                      <p className="mt-1 font-serif text-[18px] text-primary-text">123 University Avenue</p>
                    </div>
                    <MapPin className="h-5 w-5 text-coral-orange" aria-hidden="true" />
                  </div>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.9503398796587!2d-73.99529492346792!3d40.71975627139053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1696001016453!5m2!1sen!2sus"
                    width="100%"
                    height="280"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="St. Augustine's College location on the map"
                  />
                </div>
              </Reveal>

              <Reveal delay={140}>
                <div className="relative overflow-hidden rounded-[26px] bg-coral-orange p-6 text-white-surface sm:p-7">
                  <div className="pattern-bg pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden="true" />
                  <div className="relative">
                    <p className="eyebrow eyebrow--on-dark">Connect with us</p>
                    <h2 className="mt-3 font-serif text-[24px] leading-tight text-white-surface">
                      Follow the life of the college
                    </h2>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-white-surface/70">
                      Follow us for the latest updates, news and campus events.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {socialLinks.map((social) => {
                        const Icon = social.icon;
                        return (
                          <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 text-white-surface/80 transition-colors hover:border-paper/50 hover:bg-main-bg/10 hover:text-white-surface"
                            aria-label={`St. Augustine's College on ${social.label}`}
                          >
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="relative overflow-hidden rounded-[26px] border border-white-surface/45 bg-white-surface/28 p-6 text-primary-text shadow-[0_24px_60px_-34px_rgba(17,17,17,0.28)] backdrop-blur-xl sm:p-7">
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.42),rgba(255,255,255,0.12)_48%,rgba(255,255,255,0.22))]" aria-hidden="true" />
                  <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white-surface/20 blur-2xl" aria-hidden="true" />
                  <div className="relative">
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary-text/70">
                      Immediate assistance
                    </p>
                    <h2 className="mt-3 font-serif text-[24px] leading-tight text-primary-text">
                      Need to speak to someone?
                    </h2>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-primary-text/75">
                      For urgent queries, contact our admission helpline directly.
                    </p>
                    <a
                      href="tel:+1234567890"
                      className="btn btn--primary mt-5 !min-h-[44px] !px-5 !text-[12px] shadow-[0_14px_28px_-16px_rgba(255,86,56,0.45)]"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="border-y border-rule bg-main-bg/45 py-20 lg:py-28">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Department contacts"
              title={
                <>
                  Reach the right <span className="highlight highlight--outline">department</span>
                </>
              }
              description="Direct lines to the offices that keep the college moving."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {departments.map((department, index) => (
              <Reveal key={department.name} delay={index * 60}>
                <article className="h-full rounded-[24px] border border-rule bg-main-bg p-6 transition-all duration-300 hover:-translate-y-1 hover:border-rule-2 hover:shadow-[0_24px_48px_-34px_rgba(42,22,27,0.35)]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-main-bg text-coral-orange">
                    <Building2 className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 font-serif text-[20px] leading-tight text-primary-text">{department.name}</h2>
                  <div className="mt-3 space-y-1.5">
                    <a
                      href={`mailto:${department.email}`}
                      className="block break-all text-[12px] text-primary-text-2 transition-colors hover:text-coral-orange"
                    >
                      {department.email}
                    </a>
                    <a
                      href={`tel:${department.phone.replace(/[^+\d]/g, '')}`}
                      className="block text-[12px] text-primary-text-2 transition-colors hover:text-coral-orange"
                    >
                      {department.phone}
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-4">
              <SectionHeading
                eyebrow="FAQ"
                title={
                  <>
                    Questions, <span className="highlight">answered</span>
                  </>
                }
                description="Still unsure about something? Send us a message and we will point you in the right direction."
              />
              <button
                type="button"
                onClick={focusForm}
                className="btn btn--primary mt-7"
              >
                Ask your question
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </Reveal>

            <div className="lg:col-span-8">
              <div className="overflow-hidden rounded-[24px] border border-rule bg-main-bg">
                {faqs.map((faq, index) => (
                  <Reveal key={faq.q} delay={index * 40}>
                    <details className="group border-b border-rule last:border-b-0">
                      <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-5 transition-colors hover:bg-main-bg/40 sm:px-6">
                        <span className="flex items-baseline gap-3">
                          <span className="font-mono text-[9px] text-coral-orange">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="font-serif text-[17px] leading-tight text-primary-text sm:text-[19px]">
                            {faq.q}
                          </span>
                        </span>
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-rule-2 text-coral-orange transition-transform duration-300 group-open:rotate-45">
                          <span className="text-base leading-none" aria-hidden="true">
                            +
                          </span>
                        </span>
                      </summary>
                      <div className="px-5 pb-6 pl-[46px] text-[13px] leading-[1.8] text-primary-text-2 sm:px-6 sm:pl-[58px]">
                        {faq.a}
                      </div>
                    </details>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
