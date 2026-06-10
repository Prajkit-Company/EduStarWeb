import { GraduationCap, MapPin, Phone, Mail, Clock, ArrowRight, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export function Footer({ setCurrentPage }: FooterProps) {
  const quickLinks = [
    { name: 'About Us', page: 'about' },
    { name: 'Academic Programs', page: 'courses' },
    { name: 'Admission', page: 'admission' },
    { name: 'Faculty & Staff', page: 'faculty' },
    { name: 'Campus Life', page: 'campus-life' },
    { name: 'Contact Us', page: 'contact' },
  ];

  const programs = [
    'Bachelor of Science',
    'Bachelor of Commerce',
    'Bachelor of Arts',
    'Computer Applications',
    'Business Administration',
    'Postgraduate Studies',
  ];

  return (
    <footer className="bg-[#0c2340] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* About */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#c9a962] rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-[#0c2340]" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-semibold">St. Augustine's</h3>
                <p className="text-xs text-gray-400 tracking-wider uppercase">College of Excellence</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm">
              Established in 1985, St. Augustine's College has been a beacon of academic excellence, 
              nurturing generations of leaders with integrity, knowledge, and purpose.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a 
                  key={i}
                  href="#" 
                  className="w-9 h-9 bg-white/10 hover:bg-[#c9a962] rounded-lg flex items-center justify-center transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-[#c9a962]"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => setCurrentPage(link.page)}
                    className="text-gray-400 hover:text-[#c9a962] transition-colors duration-300 flex items-center gap-2 group text-sm"
                  >
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-[#c9a962]"></span>
              Programs
            </h4>
            <ul className="space-y-3">
              {programs.map((program, index) => (
                <li key={index}>
                  <button
                    onClick={() => setCurrentPage('courses')}
                    className="text-gray-400 hover:text-[#c9a962] transition-colors duration-300 flex items-center gap-2 group text-sm"
                  >
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                    {program}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-[#c9a962]"></span>
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#c9a962] mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">
                  123 University Avenue,<br />
                  Academic District, AD 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#c9a962] shrink-0" />
                <span className="text-gray-400 text-sm">+1 (234) 567-890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#c9a962] shrink-0" />
                <span className="text-gray-400 text-sm">info@staugustines.edu</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#c9a962] shrink-0" />
                <span className="text-gray-400 text-sm">Mon - Sat: 8:00 AM - 5:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-500">
              © 2025 St. Augustine's College of Excellence. All rights reserved. | Powered by Prajkit
            </p>
            <div className="flex gap-6 text-gray-500">
              <span className="flex items-center gap-1 text-gray-500">🔒 Secured with SSL</span>
              <a href="#" className="hover:text-[#c9a962] transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-[#c9a962] transition-colors duration-300">Terms of Service</a>
              <a href="#" className="hover:text-[#c9a962] transition-colors duration-300">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
