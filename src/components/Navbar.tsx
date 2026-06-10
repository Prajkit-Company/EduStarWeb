import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, GraduationCap, LayoutDashboard, LogIn } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onDashboardClick: () => void;
}

export function Navbar({ currentPage, setCurrentPage, isLoggedIn, onLoginClick, onDashboardClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', page: 'home' },
    { name: 'About', page: 'about' },
    { name: 'Academics', page: 'courses' },
    { name: 'Admission', page: 'admission' },
    { name: 'Faculty', page: 'faculty' },
    { name: 'Campus Life', page: 'campus-life' },
    { name: 'Contact', page: 'contact' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#0c2340] text-white py-2.5 hidden lg:block">
        <div className="container mx-auto px-6 flex justify-between items-center text-sm">
          <div className="flex items-center gap-8">
            <a href="tel:+1234567890" className="flex items-center gap-2 text-gray-300 hover:text-[#c9a962] transition-colors duration-300">
              <Phone className="w-4 h-4" />
              <span>+1 (234) 567-890</span>
            </a>
            <a href="mailto:info@staugustines.edu" className="flex items-center gap-2 text-gray-300 hover:text-[#c9a962] transition-colors duration-300">
              <Mail className="w-4 h-4" />
              <span>info@staugustines.edu</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <button
                onClick={onLoginClick}
                className="flex items-center gap-2 px-5 py-1.5 bg-[#c9a962] text-white rounded-full text-xs font-semibold tracking-wide hover:bg-[#b8994d] transition-all duration-300 shadow-md shadow-[#c9a962]/20"
              >
                <LogIn className="w-3.5 h-3.5" />
                Login
              </button>
            ) : (
              <button
                onClick={onDashboardClick}
                className="flex items-center gap-2 px-5 py-1.5 bg-white/10 text-white rounded-full text-xs font-semibold tracking-wide hover:bg-white/20 transition-all duration-300"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Admin Panel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white shadow-lg py-3' : 'bg-white/95 backdrop-blur-sm py-5'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <button onClick={() => setCurrentPage('home')} className="flex items-center gap-4 group">
              <div className="relative">
                <div className="w-14 h-14 bg-[#0c2340] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <GraduationCap className="w-7 h-7 text-[#c9a962]" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#c9a962] rounded-full flex items-center justify-center">
                  <span className="text-[8px] font-bold text-white">Est.</span>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-serif font-semibold text-[#0c2340] tracking-tight">St. Augustine's</h1>
                <p className="text-xs text-[#8b7355] tracking-widest uppercase">College of Excellence</p>
              </div>
            </button>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => setCurrentPage(link.page)}
                  className={`relative px-5 py-2.5 font-medium text-sm transition-all duration-300 ${
                    currentPage === link.page ? 'text-[#c9a962]' : 'text-[#0c2340] hover:text-[#c9a962]'
                  }`}
                >
                  {link.name}
                  {currentPage === link.page && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#c9a962] rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => setCurrentPage('admission')}
                className="btn-primary px-6 py-3 text-white rounded-lg font-medium text-sm tracking-wide"
              >
                Apply Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              {isOpen ? <X className="w-6 h-6 text-[#0c2340]" /> : <Menu className="w-6 h-6 text-[#0c2340]" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="py-6 space-y-1 border-t border-gray-100 mt-4">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => { setCurrentPage(link.page); setIsOpen(false); }}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    currentPage === link.page ? 'bg-[#0c2340] text-white' : 'text-[#0c2340] hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-4 space-y-2 border-t border-gray-100">
                {isLoggedIn ? (
                  <button
                    onClick={() => { onDashboardClick(); setIsOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-[#0c2340] text-[#0c2340] rounded-lg font-medium text-sm"
                  >
                    <LayoutDashboard className="w-4 h-4" /> Admin Panel
                  </button>
                ) : (
                  <button
                    onClick={() => { onLoginClick(); setIsOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#c9a962] text-white rounded-lg font-semibold text-sm"
                  >
                    <LogIn className="w-4 h-4" /> Login
                  </button>
                )}
                <button
                  onClick={() => { setCurrentPage('admission'); setIsOpen(false); }}
                  className="w-full py-3 bg-[#0c2340] text-white rounded-lg font-medium text-sm"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
