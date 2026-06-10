import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  GraduationCap, CheckCircle, ClipboardCheck, Calendar,
  DollarSign, FileText, User, Mail, Phone, MapPin,
  BookOpen, MessageSquare, ArrowRight, Award,
  FileCheck, ScrollText, Send
} from 'lucide-react';
import { addInquiry } from '../lib/cms';

interface AdmissionPageProps {
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

const processSteps = [
  {
    icon: ClipboardCheck,
    title: 'Submit Application',
    description: 'Fill out the online admission inquiry form with accurate personal and academic details.',
  },
  {
    icon: FileCheck,
    title: 'Document Verification',
    description: 'Upload and submit required documents for verification by the admission committee.',
  },
  {
    icon: BookOpen,
    title: 'Entrance Exam / Interview',
    description: 'Appear for the entrance examination and personal interview as per the schedule.',
  },
  {
    icon: ScrollText,
    title: 'Merit List Publication',
    description: 'Qualified candidates are listed on the merit board based on academic performance and test scores.',
  },
  {
    icon: CheckCircle,
    title: 'Fee Payment & Enrollment',
    description: 'Complete the fee payment and confirm your enrollment to secure your seat.',
  },
];

const importantDates = [
  { event: 'Application Start Date', date: 'March 1, 2025' },
  { event: 'Application Deadline', date: 'June 30, 2025' },
  { event: 'Entrance Examination', date: 'July 15, 2025' },
  { event: 'Merit List Release', date: 'July 25, 2025' },
  { event: 'Counseling & Interview', date: 'August 1 - 10, 2025' },
  { event: 'Classes Begin', date: 'September 1, 2025' },
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
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
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
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      // submission failed silently
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#fafaf8]">
      {/* Hero Section */}
      <section className="relative h-[95vh] min-h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c7f1?auto=format&fit=crop&w=1920&q=75"
            alt="Admissions"
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
              Admissions 2025-26
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-white mb-6 leading-tight animate-slide-up">
              Begin Your Journey at St. Augustine's
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed animate-slide-up delay-100">
              Take the first step toward a transformative educational experience. 
              Explore our programs, understand the admission process, and apply today.
            </p>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section id="process" data-animate className="py-20 bg-white -mt-16 relative z-20">
        <div className="container mx-auto px-6">
          <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible['process'] ? 'animate-slide-up' : 'opacity-0'}`}>
            <span className="inline-block text-[#c9a962] text-sm font-semibold tracking-widest uppercase mb-4">
              Admission Process
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-[#0c2340] mb-6">
              How to Apply
            </h2>
            <div className="w-16 h-1 bg-[#c9a962] rounded mx-auto mb-6" />
            <p className="text-gray-600 text-lg">
              Follow these simple steps to complete your admission application at St. Augustine's College.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#c9a962] via-[#0c2340] to-[#c9a962]" />

            {processSteps.map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col items-center text-center ${isVisible['process'] ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
              >
                <div className="relative z-10 w-16 h-16 bg-[#0c2340] rounded-2xl flex items-center justify-center mb-5 shadow-lg">
                  <step.icon className="w-8 h-8 text-[#c9a962]" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-[#c9a962] rounded-full flex items-center justify-center text-xs font-bold text-[#0c2340]">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-serif font-semibold text-[#0c2340] mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Inquiry Form */}
      <section id="inquiry" data-animate className="py-20 bg-[#fafaf8]">
        <div className="container mx-auto px-6">
          <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible['inquiry'] ? 'animate-slide-up' : 'opacity-0'}`}>
            <span className="inline-block text-[#c9a962] text-sm font-semibold tracking-widest uppercase mb-4">
              Inquiry Form
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-[#0c2340] mb-6">
              Submit Your Admission Inquiry
            </h2>
            <div className="w-16 h-1 bg-[#c9a962] rounded mx-auto mb-6" />
            <p className="text-gray-600 text-lg">
              Fill out the form below and our admissions team will contact you with further guidance.
            </p>
          </div>

          <div className={`max-w-4xl mx-auto ${isVisible['inquiry'] ? 'animate-slide-up delay-200' : 'opacity-0'}`}>
            <div className="card p-8 lg:p-10">
              {isSubmitted ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-[#0c2340] mb-2">Inquiry Submitted Successfully</h3>
                  <p className="text-gray-600">Thank you for your interest. Our admissions team will reach out to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Student Name *"
                          {...register('studentName')}
                          className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg bg-white transition-all"
                        />
                      </div>
                      {errors.studentName && (
                        <p className="text-red-500 text-sm mt-1 ml-2">{errors.studentName.message}</p>
                      )}
                    </div>
                    <div>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          placeholder="Email Address *"
                          {...register('email')}
                          className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg bg-white transition-all"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1 ml-2">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          placeholder="Phone Number *"
                          {...register('phone')}
                          className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg bg-white transition-all"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1 ml-2">{errors.phone.message}</p>
                      )}
                    </div>
                    <div>
                      <div className="relative">
                        <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          {...register('programOfInterest')}
                          className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg bg-white transition-all appearance-none"
                        >
                          <option value="">Select Program *</option>
                          {programs.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>
                      {errors.programOfInterest && (
                        <p className="text-red-500 text-sm mt-1 ml-2">{errors.programOfInterest.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                      <textarea
                        placeholder="Address *"
                        rows={3}
                        {...register('address')}
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg bg-white transition-all resize-none"
                      />
                    </div>
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1 ml-2">{errors.address.message}</p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <FileText className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                      <textarea
                        placeholder="Previous Academic Details *"
                        rows={3}
                        {...register('previousEducation')}
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg bg-white transition-all resize-none"
                      />
                    </div>
                    {errors.previousEducation && (
                      <p className="text-red-500 text-sm mt-1 ml-2">{errors.previousEducation.message}</p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                      <textarea
                        placeholder="Message / Inquiry *"
                        rows={4}
                        {...register('message')}
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg bg-white transition-all resize-none"
                      />
                    </div>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1 ml-2">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 btn-primary text-white rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit Inquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section id="dates" data-animate className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible['dates'] ? 'animate-slide-up' : 'opacity-0'}`}>
            <span className="inline-block text-[#c9a962] text-sm font-semibold tracking-widest uppercase mb-4">
              Important Dates
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-[#0c2340] mb-6">
              Admission Timeline
            </h2>
            <div className="w-16 h-1 bg-[#c9a962] rounded mx-auto mb-6" />
            <p className="text-gray-600 text-lg">
              Mark these key dates to ensure you don't miss any part of the admission process.
            </p>
          </div>

          <div className={`max-w-4xl mx-auto ${isVisible['dates'] ? 'animate-slide-up delay-200' : 'opacity-0'}`}>
            <div className="card overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#0c2340]">
                    <th className="text-left px-6 py-4 text-white font-serif font-semibold text-lg">Event</th>
                    <th className="text-left px-6 py-4 text-white font-serif font-semibold text-lg">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {importantDates.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-100 transition-colors hover:bg-[#fafaf8] ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                    >
                      <td className="px-6 py-4 text-[#0c2340] font-medium">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-[#c9a962] shrink-0" />
                          {item.event}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section id="fees" data-animate className="py-20 bg-[#fafaf8]">
        <div className="container mx-auto px-6">
          <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible['fees'] ? 'animate-slide-up' : 'opacity-0'}`}>
            <span className="inline-block text-[#c9a962] text-sm font-semibold tracking-widest uppercase mb-4">
              Fee Structure
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-[#0c2340] mb-6">
              Program Fees (Annual)
            </h2>
            <div className="w-16 h-1 bg-[#c9a962] rounded mx-auto mb-6" />
            <p className="text-gray-600 text-lg">
              Competitive fee structure designed to make quality education accessible. All amounts in INR.
            </p>
          </div>

          <div className={`max-w-5xl mx-auto ${isVisible['fees'] ? 'animate-slide-up delay-200' : 'opacity-0'}`}>
            <div className="card overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#0c2340]">
                    <th className="text-left px-6 py-4 text-white font-serif font-semibold text-lg">Program</th>
                    <th className="text-left px-6 py-4 text-white font-serif font-semibold text-lg">Tuition Fee</th>
                    <th className="text-left px-6 py-4 text-white font-serif font-semibold text-lg">Lab Fee</th>
                    <th className="text-left px-6 py-4 text-white font-serif font-semibold text-lg">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {feeStructure.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-100 transition-colors hover:bg-[#fafaf8] ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                    >
                      <td className="px-6 py-4 text-[#0c2340] font-medium">
                        <div className="flex items-center gap-3">
                          <DollarSign className="w-4 h-4 text-[#c9a962] shrink-0" />
                          {item.program}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">₹{item.tuition}</td>
                      <td className="px-6 py-4 text-gray-600">₹{item.labFee}</td>
                      <td className="px-6 py-4 font-semibold text-[#0c2340]">₹{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              * Fees are subject to revision. Additional charges for special programs may apply.
            </p>
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <section id="documents" data-animate className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible['documents'] ? 'animate-slide-up' : 'opacity-0'}`}>
            <span className="inline-block text-[#c9a962] text-sm font-semibold tracking-widest uppercase mb-4">
              Documents Required
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-[#0c2340] mb-6">
              What You Need to Submit
            </h2>
            <div className="w-16 h-1 bg-[#c9a962] rounded mx-auto mb-6" />
            <p className="text-gray-600 text-lg">
              Ensure you have the following documents ready before applying for admission.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className={`grid md:grid-cols-2 gap-4 ${isVisible['documents'] ? 'animate-slide-up delay-200' : 'opacity-0'}`}>
              {requiredDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-5 rounded-xl bg-[#fafaf8] border border-gray-100 hover:border-[#c9a962]/30 hover:shadow-md transition-all duration-300"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="w-10 h-10 bg-[#0c2340]/5 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-5 h-5 text-[#c9a962]" />
                  </div>
                  <span className="text-gray-700 font-medium">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#c9a962] to-[#8b7355]">
        <div className="container mx-auto px-6 text-center">
          <Award className="w-12 h-12 text-white mx-auto mb-6 opacity-80" />
          <h2 className="text-4xl font-serif font-semibold text-white mb-6">
            Ready to Take the Next Step?
          </h2>
          <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of successful alumni who began their journey at St. Augustine's College. 
            Apply today and shape your future.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#inquiry"
              className="px-10 py-4 bg-[#0c2340] text-white rounded-lg font-medium hover:bg-[#0a1c30] transition-all duration-300 inline-flex items-center gap-3 shadow-lg"
            >
              Apply Now <ArrowRight className="w-5 h-5" />
            </a>
            <button
              onClick={() => setCurrentPage('contact')}
              className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-lg font-medium hover:bg-white/20 transition-all duration-300 inline-flex items-center gap-3"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
