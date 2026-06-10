import { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Send, CheckCircle, 
  Facebook, Twitter, Instagram, Linkedin, Youtube,
  MessageSquare, User, AtSign, FileText, Building2
} from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Campus Address',
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
      title: 'Office Hours',
      details: ['Mon - Fri: 8:00 AM - 5:00 PM', 'Sat: 9:00 AM - 1:00 PM'],
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
    'Other'
  ];

  const departments = [
    { name: 'Admissions Office', email: 'admissions@staugustines.edu', phone: '+1 (234) 567-892' },
    { name: 'Academic Affairs', email: 'academics@staugustines.edu', phone: '+1 (234) 567-893' },
    { name: 'Student Services', email: 'students@staugustines.edu', phone: '+1 (234) 567-894' },
    { name: 'Examinations', email: 'exams@staugustines.edu', phone: '+1 (234) 567-895' },
  ];

  return (
    <div className="bg-[#fafaf8]">
      {/* Hero Section */}
      <section className="relative h-[95vh] min-h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=1920&q=75" 
            alt="Contact Us"
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
              <MessageSquare className="w-4 h-4" />
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-white mb-6 leading-tight animate-slide-up">
              Contact Us
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed animate-slide-up delay-100">
              We're here to assist you. Reach out to us for any inquiries about admissions, 
              programs, or general information about St. Augustine's College.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white -mt-16 relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className="card p-6 text-center hover-lift"
              >
                <div className="w-14 h-14 mx-auto bg-[#0c2340] rounded-xl flex items-center justify-center mb-5">
                  <info.icon className="w-6 h-6 text-[#c9a962]" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-[#0c2340] mb-3">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-gray-600 text-sm">{detail}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card p-8 lg:p-10">
              <div className="mb-8">
                <span className="inline-block text-[#c9a962] text-sm font-semibold tracking-widest uppercase mb-4">
                  Send Message
                </span>
                <h2 className="text-3xl font-serif font-semibold text-[#0c2340]">
                  We'd Love to Hear From You
                </h2>
                <p className="text-gray-600 mt-2">
                  Fill out the form below and our team will respond within 24 hours.
                </p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-[#0c2340] mb-2">Message Sent Successfully</h3>
                  <p className="text-gray-600">Thank you for reaching out. We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name *"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg bg-white transition-all"
                      />
                    </div>
                    <div className="relative">
                      <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg bg-white transition-all"
                      />
                    </div>
                    <div className="relative">
                      <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg bg-white transition-all appearance-none"
                      >
                        <option value="">Select Subject *</option>
                        {subjects.map((subject, index) => (
                          <option key={index} value={subject}>{subject}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      name="message"
                      placeholder="Your Message *"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg bg-white transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 btn-primary text-white rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map */}
              <div className="card overflow-hidden h-[350px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.9503398796587!2d-73.99529492346792!3d40.71975627139053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1696001016453!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="College Location"
                />
              </div>

              {/* Social Media */}
              <div className="bg-[#0c2340] rounded-xl p-8">
                <h3 className="text-xl font-serif font-semibold text-white mb-4">Connect With Us</h3>
                <p className="text-gray-400 mb-6 text-sm">
                  Follow us on social media for the latest updates, news, and campus events.
                </p>
                <div className="flex gap-3">
                  {[
                    { icon: Facebook, label: 'Facebook' },
                    { icon: Twitter, label: 'Twitter' },
                    { icon: Instagram, label: 'Instagram' },
                    { icon: Linkedin, label: 'LinkedIn' },
                    { icon: Youtube, label: 'YouTube' },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className="w-11 h-11 bg-white/10 hover:bg-[#c9a962] rounded-lg flex items-center justify-center transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-white" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-[#c9a962] rounded-xl p-8">
                <h3 className="text-xl font-serif font-semibold text-white mb-4">Need Immediate Assistance?</h3>
                <p className="text-white/90 mb-6 text-sm">
                  For urgent queries, please contact our admission helpline directly.
                </p>
                <a 
                  href="tel:+1234567890"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-white text-[#0c2340] rounded-lg font-medium hover:bg-gray-100 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-[#c9a962] text-sm font-semibold tracking-widest uppercase mb-4">
              Department Contacts
            </span>
            <h2 className="text-4xl font-serif font-semibold text-[#0c2340] mb-6">
              Reach the Right Department
            </h2>
            <div className="w-16 h-1 bg-[#c9a962] rounded mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <div key={index} className="card p-6 hover-lift">
                <div className="w-12 h-12 bg-[#0c2340] rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-[#c9a962]" />
                </div>
                <h3 className="font-serif font-semibold text-[#0c2340] mb-3">{dept.name}</h3>
                <p className="text-gray-600 text-sm mb-1">{dept.email}</p>
                <p className="text-gray-600 text-sm">{dept.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#fafaf8]">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-[#c9a962] text-sm font-semibold tracking-widest uppercase mb-4">
              FAQ
            </span>
            <h2 className="text-4xl font-serif font-semibold text-[#0c2340]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: 'What are the admission requirements?', a: 'Admission requirements vary by program. Generally, you need to have completed 10+2 with relevant subjects and minimum required percentage. Please refer to specific program pages or contact our admissions office for detailed requirements.' },
              { q: 'What is the fee structure?', a: 'Fee structure varies by course and program level. We offer competitive tuition with various payment plans and financial aid options. Please contact our admissions office for detailed fee information.' },
              { q: 'Are scholarships available?', a: 'Yes, we offer merit-based scholarships, need-based financial aid, sports scholarships, and special scholarships for exceptional achievements in various fields.' },
              { q: 'What hostel facilities are available?', a: 'We provide separate hostel facilities for male and female students with modern amenities, mess facilities, Wi-Fi, and 24/7 security within the campus.' },
              { q: 'How can I schedule a campus visit?', a: 'You can schedule a campus visit by contacting our admissions office or filling out the contact form above. We conduct guided campus tours on weekdays.' },
            ].map((faq, index) => (
              <details 
                key={index}
                className="group card overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-medium text-[#0c2340] hover:bg-gray-50 transition-colors">
                  {faq.q}
                  <span className="w-8 h-8 bg-[#0c2340] text-white rounded-full flex items-center justify-center text-lg group-open:rotate-45 transition-transform duration-300">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
