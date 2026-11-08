import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  CheckCircle,
  User,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  MessageSquare,
  FileText,
  Send,
  Clock,
} from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal } from '../components/Reveal';
import { addInquiry } from '../lib/cms';

interface InquiryPageProps {
  setCurrentPage: (page: string) => void;
}

const programs = ['B.Sc', 'B.Com', 'BCA', 'B.A', 'BBA', 'M.Sc', 'M.Com', 'MCA'] as const;

const inquirySchema = z.object({
  studentName: z.string().min(1, 'Student name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  programOfInterest: z.string().min(1, 'Please select a program'),
  previousEducation: z.string().min(1, 'Previous academic details are required'),
  message: z.string().min(1, 'Message is required'),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

export function InquiryPage(_props: InquiryPageProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
  });

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);
    try {
      addInquiry({
        studentName: data.studentName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        programOfInterest: data.programOfInterest,
        previousEducation: data.previousEducation,
        message: data.message,
      });
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 7000);
    } catch {
      // submission failed silently
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-main-bg">
      <section id="inquiry" className="border-y border-rule bg-main-bg/45 py-20 lg:py-28">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-4">
              <SectionHeading
                eyebrow="Inquiry form"
                title={
                  <>
                    Tell us about <span className="highlight">you</span>
                  </>
                }
                description="Fill out the form and our admissions team will contact you with further guidance."
              />

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3 rounded-2xl border border-rule bg-main-bg p-4">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-coral-orange" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-secondary-text">
                      Admissions office
                    </p>
                    <a
                      href="tel:+1234567890"
                      className="mt-1 block text-[13.5px] font-semibold text-primary-text transition-colors hover:text-coral-orange"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-rule bg-main-bg p-4">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-coral-orange" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-secondary-text">
                      Email
                    </p>
                    <a
                      href="mailto:admissions@staugustines.edu"
                      className="mt-1 block break-all text-[13.5px] font-semibold text-primary-text transition-colors hover:text-coral-orange"
                    >
                      admissions@staugustines.edu
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-rule bg-main-bg p-4">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-coral-orange" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-secondary-text">
                      Office hours
                    </p>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-primary-text">
                      Mon–Fri: 8:00 AM – 5:00 PM
                      <br />
                      Sat: 9:00 AM – 1:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-6 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-secondary-text">
                Your details are used only to respond to your admission inquiry.
              </p>
            </Reveal>

            <Reveal delay={100} className="lg:col-span-8">
              <div className="rounded-[28px] border border-rule bg-main-bg p-6 shadow-[0_30px_60px_-50px_rgba(42,22,27,0.4)] sm:p-8 lg:p-10">
                {isSubmitted ? (
                  <div className="flex flex-col items-center py-16 text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-main-bg text-coral-orange">
                      <CheckCircle className="h-8 w-8" aria-hidden="true" />
                    </span>
                    <h2 className="mt-5 font-serif text-[28px] text-primary-text">Inquiry submitted</h2>
                    <p className="mt-2 max-w-[44ch] text-[14px] leading-relaxed text-primary-text-2">
                      Thank you for your interest. Our admissions team will reach out to you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="btn btn--outline mt-6"
                    >
                      Send another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label htmlFor="studentName" className="field-label">
                          Student name *
                        </label>
                        <div className="relative">
                          <User
                            className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-secondary-text"
                            aria-hidden="true"
                          />
                          <input
                            id="studentName"
                            type="text"
                            placeholder="Full name"
                            {...register('studentName')}
                            aria-invalid={errors.studentName ? 'true' : 'false'}
                            aria-describedby={errors.studentName ? 'studentName-error' : undefined}
                            className="field field--icon"
                          />
                        </div>
                        {errors.studentName && (
                          <p id="studentName-error" className="field-error">
                            {errors.studentName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="field-label">
                          Email address *
                        </label>
                        <div className="relative">
                          <Mail
                            className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-secondary-text"
                            aria-hidden="true"
                          />
                          <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            {...register('email')}
                            aria-invalid={errors.email ? 'true' : 'false'}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                            className="field field--icon"
                          />
                        </div>
                        {errors.email && (
                          <p id="email-error" className="field-error">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label htmlFor="phone" className="field-label">
                          Phone number *
                        </label>
                        <div className="relative">
                          <Phone
                            className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-secondary-text"
                            aria-hidden="true"
                          />
                          <input
                            id="phone"
                            type="tel"
                            placeholder="+1 (234) 567-890"
                            {...register('phone')}
                            aria-invalid={errors.phone ? 'true' : 'false'}
                            aria-describedby={errors.phone ? 'phone-error' : undefined}
                            className="field field--icon"
                          />
                        </div>
                        {errors.phone && (
                          <p id="phone-error" className="field-error">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="programOfInterest" className="field-label">
                          Program of interest *
                        </label>
                        <div className="relative">
                          <BookOpen
                            className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-secondary-text"
                            aria-hidden="true"
                          />
                          <select
                            id="programOfInterest"
                            defaultValue=""
                            {...register('programOfInterest')}
                            aria-invalid={errors.programOfInterest ? 'true' : 'false'}
                            aria-describedby={
                              errors.programOfInterest ? 'programOfInterest-error' : undefined
                            }
                            className="field field--icon appearance-none pr-10"
                          >
                            <option value="" disabled>
                              Select a program
                            </option>
                            {programs.map((program) => (
                              <option key={program} value={program}>
                                {program}
                              </option>
                            ))}
                          </select>
                        </div>
                        {errors.programOfInterest && (
                          <p id="programOfInterest-error" className="field-error">
                            {errors.programOfInterest.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="address" className="field-label">
                        Address *
                      </label>
                      <div className="relative">
                        <MapPin
                          className="pointer-events-none absolute left-4 top-4 z-10 h-4 w-4 text-secondary-text"
                          aria-hidden="true"
                        />
                        <textarea
                          id="address"
                          rows={3}
                          placeholder="Your postal address"
                          {...register('address')}
                          aria-invalid={errors.address ? 'true' : 'false'}
                          aria-describedby={errors.address ? 'address-error' : undefined}
                          className="field field--icon resize-none"
                        />
                      </div>
                      {errors.address && (
                        <p id="address-error" className="field-error">
                          {errors.address.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="previousEducation" className="field-label">
                        Previous academic details *
                      </label>
                      <div className="relative">
                        <FileText
                          className="pointer-events-none absolute left-4 top-4 z-10 h-4 w-4 text-secondary-text"
                          aria-hidden="true"
                        />
                        <textarea
                          id="previousEducation"
                          rows={3}
                          placeholder="School, board, subjects and results"
                          {...register('previousEducation')}
                          aria-invalid={errors.previousEducation ? 'true' : 'false'}
                          aria-describedby={
                            errors.previousEducation ? 'previousEducation-error' : undefined
                          }
                          className="field field--icon resize-none"
                        />
                      </div>
                      {errors.previousEducation && (
                        <p id="previousEducation-error" className="field-error">
                          {errors.previousEducation.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="field-label">
                        Message / inquiry *
                      </label>
                      <div className="relative">
                        <MessageSquare
                          className="pointer-events-none absolute left-4 top-4 z-10 h-4 w-4 text-secondary-text"
                          aria-hidden="true"
                        />
                        <textarea
                          id="message"
                          rows={4}
                          placeholder="What would you like to know?"
                          {...register('message')}
                          aria-invalid={errors.message ? 'true' : 'false'}
                          aria-describedby={errors.message ? 'message-error' : undefined}
                          className="field field--icon resize-none"
                        />
                      </div>
                      {errors.message && (
                        <p id="message-error" className="field-error">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-3 border-t border-rule pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <p className="max-w-[38ch] text-[11px] leading-relaxed text-secondary-text">
                        Fields marked * are required. We will respond within two working days.
                      </p>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        aria-busy={isSubmitting}
                        className="btn btn--primary min-w-[190px]"
                      >
                        {isSubmitting ? (
                          <>
                            <span
                              className="h-4 w-4 animate-spin rounded-full border-2 border-paper/40 border-t-cream"
                              aria-hidden="true"
                            />
                            Submitting…
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" aria-hidden="true" />
                            Submit inquiry
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
