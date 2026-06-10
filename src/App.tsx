import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { NoticeBar } from './components/NoticeBar';
import { StandardBadge } from './components/StandardBadge';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CoursesPage } from './pages/CoursesPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { AdmissionPage } from './pages/AdmissionPage';
import { FacultyPage } from './pages/FacultyPage';
import { CampusLifePage } from './pages/CampusLifePage';
import { AdminDashboard } from './pages/dashboards/AdminDashboard';
import { seedIfEmpty } from './lib/cms';
import { Phone, MessageCircle, Mail, ChevronUp, X, Plus } from 'lucide-react';

export function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  const goToDashboard = () => setCurrentPage('dashboard');
  const goToWebsite = () => setCurrentPage('home');

  // Seed demo data on first load
  useEffect(() => {
    seedIfEmpty();
  }, []);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Login page
  if (currentPage === 'login') {
    return <LoginPage onLogin={handleLogin} onBack={goToWebsite} />;
  }

  // Admin Dashboard (no navbar/footer)
  if (currentPage === 'dashboard' && isLoggedIn) {
    return <AdminDashboard onLogout={handleLogout} onBack={goToWebsite} />;
  }

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <NoticeBar />
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setCurrentPage('login')}
        onDashboardClick={goToDashboard}
      />
      
      <main>
        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === 'about' && <AboutPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'courses' && <CoursesPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'admission' && <AdmissionPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'faculty' && <FacultyPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'campus-life' && <CampusLifePage setCurrentPage={setCurrentPage} />}
      </main>

      <Footer setCurrentPage={setCurrentPage} />

      {/* Back to Top Button */}
      <BackToTopButton />

      {/* Floating Action Buttons */}
      <FloatingActions setCurrentPage={setCurrentPage} />

      {/* Standard Package Badge */}
      <StandardBadge />
    </div>
  );
}

function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-24 right-6 w-12 h-12 bg-[#0c2340] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#1a3a5c] transition-all duration-300 z-50 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
}

function FloatingActions({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Action Buttons */}
      <div className={`flex flex-col gap-3 mb-3 transition-all duration-500 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        <a
          href="tel:+1234567890"
          className="w-12 h-12 bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-emerald-700 transition-colors"
          title="Call Us"
        >
          <Phone className="w-5 h-5" />
        </a>
        <a
          href="https://wa.me/1234567890"
          className="w-12 h-12 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-colors"
          title="WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
        <button
          onClick={() => {
            setCurrentPage('contact');
            setIsOpen(false);
          }}
          className="w-12 h-12 bg-[#c9a962] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#8b7355] transition-colors"
          title="Contact"
        >
          <Mail className="w-5 h-5" />
        </button>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 bg-[#0c2340] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#1a3a5c] transition-all duration-300 ${
          isOpen ? 'rotate-45' : ''
        }`}
        aria-label="Quick actions"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </button>
    </div>
  );
}
