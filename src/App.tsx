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
import { GalleryPage } from './pages/GalleryPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { InquiryPage } from './pages/InquiryPage';
import { AdminDashboard } from './pages/dashboards/AdminDashboard';
import { seedIfEmpty } from './lib/cms';
import { Phone, MessageCircle, Mail, ChevronUp } from 'lucide-react';

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
    window.scrollTo({ top: 0, behavior: 'auto' });
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
    <div className="min-h-screen bg-main-bg">
      <NoticeBar />
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setCurrentPage('login')}
        onDashboardClick={goToDashboard}
      />
      
      <main key={currentPage} className="page-enter">
        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === 'about' && <AboutPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'courses' && <CoursesPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'contact' && <ContactPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'admission' && <AdmissionPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'admission-inquiry' && <InquiryPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'faculty' && <FacultyPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'campus-life' && <CampusLifePage setCurrentPage={setCurrentPage} />}
        {currentPage === 'gallery' && <GalleryPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'achievements' && <AchievementsPage setCurrentPage={setCurrentPage} />}
      </main>

      <Footer setCurrentPage={setCurrentPage} />

      {/* Floating Action Buttons */}
      <FloatingActions setCurrentPage={setCurrentPage} />

      {/* Standard Package Badge */}
      <StandardBadge />
    </div>
  );
}

function FloatingActions({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      {/* Action Buttons */}
      <div className={`flex flex-col gap-3 mb-3 transition-all duration-500 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        <a
          href="tel:+1234567890"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-coral-orange text-white-surface shadow-lg transition-colors hover:bg-[#e44a2e]"
          title="Call us"
          aria-label="Call St. Augustine's College"
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
        </a>
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-coral-orange text-white-surface shadow-lg transition-colors hover:bg-[#b89234]"
          title="WhatsApp"
          aria-label="Message St. Augustine's College on WhatsApp"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        </a>
        <button
          type="button"
          onClick={() => {
            setCurrentPage('contact');
            setIsOpen(false);
          }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-coral-orange text-white-surface shadow-lg transition-colors hover:bg-[#c25d3e]"
          title="Contact"
          aria-label="Open the contact page"
        >
          <Mail className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-rule bg-main-bg text-coral-orange shadow-[0_12px_28px_-16px_rgba(17,17,17,0.5)] transition-all duration-300 hover:border-rule-2 hover:bg-main-bg ${
          isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
        aria-label="Back to top"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </div>
  );
}
