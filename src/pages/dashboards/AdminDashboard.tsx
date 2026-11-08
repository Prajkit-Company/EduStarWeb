import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Bell, Users, Image, BookOpen, MessageSquare,
  Calendar, Phone, LogOut, Eye, Edit, Trash2, Plus,
  Search, X, Check, Clock, UserCheck,
  Menu, ArrowUpRight, Inbox,
} from 'lucide-react';
import {
  getNotices, addNotice, updateNotice, deleteNotice,
  getFaculty, addFaculty, updateFaculty, deleteFaculty,
  getGalleryImages, addGalleryImage, deleteGalleryImage,
  getPrograms, updateProgram,
  getInquiries, updateInquiryStatus, deleteInquiry,
  getContactInfo, saveContactInfo,
  getCalendarEvents, addCalendarEvent, deleteCalendarEvent,
  seedIfEmpty
} from '../../lib/cms';
import type {
  Notice, FacultyMember, GalleryImage, Program,
  AdmissionInquiry, ContactInfo, CalendarEvent
} from '../../types';

interface Props { onLogout: () => void; onBack: () => void; }

const statusStyles: Record<string, string> = {
  new: 'bg-coral-orange/10 text-[#a1212f]',
  replied: 'bg-coral-orange/25 text-[#6b5c06]',
  pending: 'bg-ochre/10 text-coral-orange',
};

const eventStyles: Record<string, string> = {
  academic: 'bg-coral-orange/10 text-coral-orange',
  holiday: 'bg-ochre/10 text-coral-orange',
  event: 'bg-coral-orange/25 text-[#6b5c06]',
};

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'notices', label: 'Notices', icon: Bell },
  { id: 'faculty', label: 'Faculty', icon: Users },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'programs', label: 'Programs', icon: BookOpen },
  { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'contact', label: 'Contact info', icon: Phone },
];

const compactField = 'field !min-h-[46px] !rounded-xl !py-2.5 !text-[13px]';
const thClass =
  'px-5 py-3.5 text-left font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-secondary-text';
const tdClass = 'px-5 py-4 align-middle';

export function AdminDashboard({ onLogout, onBack }: Props) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // --- Data states ---
  const [notices, setNotices] = useState<Notice[]>([]);
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [inquiries, setInquiries] = useState<AdmissionInquiry[]>([]);
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // --- Form states ---
  const [noticeForm, setNoticeForm] = useState({ title: '', content: '', date: '', category: 'General' });
  const [editNoticeId, setEditNoticeId] = useState<string | null>(null);
  const [showNoticeForm, setShowNoticeForm] = useState(false);

  const [facultyForm, setFacultyForm] = useState({ name: '', photoUrl: '', designation: '', qualification: '', subject: '', bio: '', category: 'teacher' as FacultyMember['category'] });
  const [editFacultyId, setEditFacultyId] = useState<string | null>(null);
  const [showFacultyForm, setShowFacultyForm] = useState(false);

  const [galleryForm, setGalleryForm] = useState({ url: '', caption: '', category: 'Campus' });
  const [showGalleryForm, setShowGalleryForm] = useState(false);

  const [editProgramId, setEditProgramId] = useState<string | null>(null);
  const [programEditData, setProgramEditData] = useState({ name: '', duration: '', eligibility: '', level: '', category: '' });

  const [inquirySearch, setInquirySearch] = useState('');

  const [contactForm, setContactForm] = useState<ContactInfo>({ phone: '', email: '', address: '', workingHours: '', socialLinks: { facebook: '', instagram: '', youtube: '', twitter: '' } });

  const [eventForm, setEventForm] = useState({ title: '', date: '', type: 'academic' as CalendarEvent['type'] });
  const [showEventForm, setShowEventForm] = useState(false);

  // --- Loaders ---
  const loadAll = () => {
    setNotices(getNotices());
    setFaculty(getFaculty());
    setGallery(getGalleryImages());
    setPrograms(getPrograms());
    setInquiries(getInquiries());
    setContact(getContactInfo());
    setEvents(getCalendarEvents());
  };

  useEffect(() => {
    seedIfEmpty();
    loadAll();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [activeTab]);

  // --- Handlers ---
  const reload = () => loadAll();

  // Notices
  const handleAddNotice = () => {
    if (!noticeForm.title || !noticeForm.content || !noticeForm.date) return;
    if (editNoticeId) {
      updateNotice(editNoticeId, noticeForm);
      setEditNoticeId(null);
    } else {
      addNotice(noticeForm);
    }
    setNoticeForm({ title: '', content: '', date: '', category: 'General' });
    setShowNoticeForm(false);
    reload();
  };
  const handleEditNotice = (n: Notice) => {
    setNoticeForm({ title: n.title, content: n.content, date: n.date, category: n.category });
    setEditNoticeId(n.id);
    setShowNoticeForm(true);
  };
  const handleDeleteNotice = (id: string) => {
    if (confirm('Delete this notice?')) {
      deleteNotice(id);
      reload();
    }
  };

  // Faculty
  const handleAddFaculty = () => {
    if (!facultyForm.name) return;
    if (editFacultyId) {
      updateFaculty(editFacultyId, facultyForm);
      setEditFacultyId(null);
    } else {
      addFaculty(facultyForm);
    }
    setFacultyForm({ name: '', photoUrl: '', designation: '', qualification: '', subject: '', bio: '', category: 'teacher' });
    setShowFacultyForm(false);
    reload();
  };
  const handleEditFaculty = (f: FacultyMember) => {
    setFacultyForm({ name: f.name, photoUrl: f.photoUrl, designation: f.designation, qualification: f.qualification, subject: f.subject, bio: f.bio, category: f.category });
    setEditFacultyId(f.id);
    setShowFacultyForm(true);
  };
  const handleDeleteFaculty = (id: string) => {
    if (confirm('Delete this faculty member?')) {
      deleteFaculty(id);
      reload();
    }
  };

  // Gallery
  const handleAddGallery = () => {
    if (!galleryForm.url) return;
    addGalleryImage(galleryForm);
    setGalleryForm({ url: '', caption: '', category: 'Campus' });
    setShowGalleryForm(false);
    reload();
  };
  const handleDeleteGallery = (id: string) => {
    if (confirm('Delete this image?')) {
      deleteGalleryImage(id);
      reload();
    }
  };

  // Programs
  const handleEditProgram = (p: Program) => {
    setEditProgramId(p.id);
    setProgramEditData({ name: p.name, duration: p.duration, eligibility: p.eligibility, level: p.level, category: p.category });
  };
  const handleSaveProgram = (id: string) => {
    updateProgram(id, programEditData);
    setEditProgramId(null);
    reload();
  };

  // Inquiries
  const handleStatusChange = (id: string, status: AdmissionInquiry['status']) => {
    updateInquiryStatus(id, status);
    reload();
  };
  const handleDeleteInquiry = (id: string) => {
    if (confirm('Delete this inquiry?')) {
      deleteInquiry(id);
      reload();
    }
  };
  const filteredInquiries = inquiries.filter((i) =>
    i.studentName.toLowerCase().includes(inquirySearch.toLowerCase())
  );

  // Contact
  const handleSaveContact = () => {
    saveContactInfo(contactForm);
    alert('Contact information saved!');
  };

  // Calendar
  const handleAddEvent = () => {
    if (!eventForm.title || !eventForm.date) return;
    addCalendarEvent(eventForm);
    setEventForm({ title: '', date: '', type: 'academic' });
    setShowEventForm(false);
    reload();
  };
  const handleDeleteEvent = (id: string) => {
    if (confirm('Delete this event?')) {
      deleteCalendarEvent(id);
      reload();
    }
  };

  const selectTab = (tabId: string) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  const currentTab = tabs.find((t) => t.id === activeTab);
  const newInquiries = inquiries.filter((i) => i.status === 'new').length;

  return (
    <div className="min-h-screen bg-main-bg text-primary-text-2">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-ink/45 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[272px] flex-col overflow-hidden bg-coral-orange text-white-surface transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="pattern-bg pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden="true" />
        <div className="relative flex items-center gap-3 border-b border-paper/12 px-6 py-6">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-main-bg text-coral-orange">
            <span className="font-serif text-[16px] font-semibold tracking-[-0.04em]">SA</span>
          </span>
          <div className="min-w-0">
            <p className="truncate font-serif text-[17px] leading-none text-white-surface">St. Augustine&rsquo;s</p>
            <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.2em] text-white-surface/55">
              Content studio
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-white-surface/60 transition-colors hover:bg-main-bg/10 hover:text-white-surface lg:hidden"
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <nav className="relative flex-1 overflow-y-auto px-4 py-5" aria-label="Admin sections">
          <p className="mb-3 px-3 font-mono text-[8.5px] uppercase tracking-[0.18em] text-white-surface/40">
            Workspace
          </p>
          <div className="space-y-1">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => selectTab(tab.id)}
                  aria-current={active ? 'page' : undefined}
                  className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-[13px] font-medium transition-colors ${
                    active
                      ? 'bg-main-bg text-coral-orange shadow-[0_10px_24px_-18px_rgba(42,22,27,0.7)]'
                      : 'text-white-surface/70 hover:bg-main-bg/10 hover:text-white-surface'
                  }`}
                >
                  <tab.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="flex-1">{tab.label}</span>
                  {tab.id === 'inquiries' && newInquiries > 0 && (
                    <span
                      className={`rounded-full px-1.5 py-0.5 font-mono text-[9px] font-semibold ${
                        active ? 'bg-coral-orange text-white-surface' : 'bg-coral-orange text-primary-text'
                      }`}
                    >
                      {newInquiries}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="relative border-t border-paper/12 p-4">
          <button
            type="button"
            onClick={onBack}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-white-surface/70 transition-colors hover:bg-main-bg/10 hover:text-white-surface"
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
            <span>View website</span>
            <ArrowUpRight className="ml-auto h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-white-surface/70 transition-colors hover:bg-coral-orange/20 hover:text-white-surface"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            <span>Sign out</span>
          </button>
          <p className="mt-4 px-3 font-mono text-[8px] uppercase tracking-[0.16em] text-white-surface/35">
            Authorised access only
          </p>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:ml-[272px]">
        <header className="sticky top-0 z-30 border-b border-rule bg-main-bg/95 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-rule bg-main-bg text-coral-orange transition-colors hover:border-rule-2 hover:bg-main-bg lg:hidden"
                aria-label="Open navigation"
                aria-expanded={sidebarOpen}
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
              <div>
                <p className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-secondary-text">
                  Administrator portal
                </p>
                <h1 className="mt-0.5 font-serif text-[24px] leading-tight text-primary-text sm:text-[28px]">
                  {currentTab?.label || activeTab}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden text-right sm:block">
                <p className="text-[12px] font-semibold text-primary-text">Administrator</p>
                <p className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-secondary-text">
                  Full access
                </p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-coral-orange text-[13px] font-semibold text-white-surface">
                A
              </span>
              <button
                type="button"
                onClick={onBack}
                className="btn btn--outline !min-h-[42px] !px-4 !text-[11.5px]"
              >
                <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">View website</span>
                <span className="sm:hidden">Site</span>
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          {/* ===== DASHBOARD ===== */}
          {activeTab === 'dashboard' && (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { title: 'Total notices', value: notices.length, icon: Bell, tone: 'cream' },
                  { title: 'Faculty members', value: faculty.length, icon: Users, tone: 'cream' },
                  { title: 'Gallery images', value: gallery.length, icon: Image, tone: 'cream' },
                  { title: 'New inquiries', value: newInquiries, icon: MessageSquare, tone: 'dark' },
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  const dark = stat.tone === 'dark';
                  return (
                    <article
                      key={stat.title}
                      className={`relative overflow-hidden rounded-[24px] border p-5 sm:p-6 ${
                        dark
                          ? 'border-transparent bg-coral-orange text-white-surface'
                          : 'border-rule bg-main-bg'
                      }`}
                    >
                      {dark && (
                        <div
                          className="pattern-bg pointer-events-none absolute inset-0 opacity-[0.14]"
                          aria-hidden="true"
                        />
                      )}
                      <div className="relative flex items-start justify-between gap-3">
                        <span
                          className={`flex h-11 w-11 items-center justify-center rounded-full ${
                            dark ? 'bg-main-bg/12 text-[#FF5638]' : 'bg-main-bg text-coral-orange'
                          }`}
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span
                          className={`font-mono text-[9px] tracking-[0.14em] ${
                            dark ? 'text-white-surface/40' : 'text-secondary-text'
                          }`}
                        >
                          0{index + 1}
                        </span>
                      </div>
                      <p
                        className={`relative mt-5 font-serif text-[42px] leading-none ${
                          dark ? 'text-white-surface' : 'text-coral-orange'
                        }`}
                      >
                        {stat.value}
                      </p>
                      <p
                        className={`relative mt-2 text-[11px] font-semibold uppercase tracking-[0.08em] ${
                          dark ? 'text-white-surface/65' : 'text-primary-text-2'
                        }`}
                      >
                        {stat.title}
                      </p>
                    </article>
                  );
                })}
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-12">
                <section className="rounded-[26px] border border-rule bg-main-bg lg:col-span-7">
                  <div className="flex items-center justify-between gap-4 border-b border-rule px-5 py-4 sm:px-6">
                    <div>
                      <h2 className="font-serif text-[20px] text-primary-text">Recent inquiries</h2>
                      <p className="mt-0.5 font-mono text-[8.5px] uppercase tracking-[0.14em] text-secondary-text">
                        Latest five submissions
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => selectTab('inquiries')}
                      className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-coral-orange transition-colors hover:text-coral-orange"
                    >
                      View all
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="flex flex-col items-center px-6 py-14 text-center">
                      <Inbox className="h-7 w-7 text-coral-orange" aria-hidden="true" />
                      <p className="mt-3 font-serif text-[19px] text-primary-text">No inquiries yet</p>
                      <p className="mt-1 text-[12px] text-secondary-text">
                        New admission inquiries will appear here.
                      </p>
                    </div>
                  ) : (
                    <ul className="divide-y divide-rule">
                      {inquiries.slice(0, 5).map((q) => (
                        <li key={q.id} className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
                          <div className="min-w-0">
                            <p className="truncate text-[13px] font-semibold text-primary-text">{q.studentName}</p>
                            <p className="mt-0.5 text-[11.5px] text-secondary-text">
                              {q.programOfInterest} &middot;{' '}
                              {new Date(q.submittedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span
                            className={`shrink-0 rounded-full px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.06em] ${
                              statusStyles[q.status]
                            }`}
                          >
                            {q.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                <section className="rounded-[26px] border border-rule bg-main-bg/50 p-5 sm:p-6 lg:col-span-5">
                  <h2 className="font-serif text-[20px] text-primary-text">Quick actions</h2>
                  <p className="mt-0.5 font-mono text-[8.5px] uppercase tracking-[0.14em] text-secondary-text">
                    Jump straight to work
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {[
                      { label: 'Add notice', icon: Bell, tab: 'notices' },
                      { label: 'Add faculty', icon: UserCheck, tab: 'faculty' },
                      { label: 'Add event', icon: Calendar, tab: 'calendar' },
                      { label: 'View inquiries', icon: MessageSquare, tab: 'inquiries' },
                    ].map((action) => {
                      const Icon = action.icon;
                      return (
                        <button
                          key={action.label}
                          type="button"
                          onClick={() => selectTab(action.tab)}
                          className="group flex flex-col items-start gap-3 rounded-2xl border border-rule bg-main-bg p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-rule-2 hover:shadow-[0_18px_36px_-28px_rgba(42,22,27,0.4)]"
                        >
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-main-bg text-coral-orange transition-colors group-hover:bg-coral-orange group-hover:text-[#FF5638]">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <span className="text-[12px] font-semibold text-primary-text">{action.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </section>
              </div>
            </>
          )}

          {/* ===== NOTICES ===== */}
          {activeTab === 'notices' && (
            <section className="overflow-hidden rounded-[26px] border border-rule bg-main-bg">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule px-5 py-5 sm:px-6">
                <div>
                  <h2 className="font-serif text-[22px] text-primary-text">All notices</h2>
                  <p className="mt-1 text-[12px] text-secondary-text">
                    {notices.length} published {notices.length === 1 ? 'notice' : 'notices'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowNoticeForm(!showNoticeForm);
                    setEditNoticeId(null);
                    setNoticeForm({ title: '', content: '', date: '', category: 'General' });
                  }}
                  className="btn btn--primary !min-h-[44px] !px-5 !text-[12px]"
                  aria-expanded={showNoticeForm}
                >
                  {showNoticeForm ? <X className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
                  {showNoticeForm ? 'Cancel' : 'Add notice'}
                </button>
              </div>

              {showNoticeForm && (
                <div className="border-b border-rule bg-main-bg/45 px-5 py-5 sm:px-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="notice-title" className="field-label">Title *</label>
                      <input
                        id="notice-title"
                        value={noticeForm.title}
                        onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                        placeholder="Notice title"
                        className={compactField}
                      />
                    </div>
                    <div>
                      <label htmlFor="notice-date" className="field-label">Date *</label>
                      <input
                        id="notice-date"
                        value={noticeForm.date}
                        onChange={(e) => setNoticeForm({ ...noticeForm, date: e.target.value })}
                        type="date"
                        className={compactField}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="notice-content" className="field-label">Content *</label>
                    <textarea
                      id="notice-content"
                      value={noticeForm.content}
                      onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
                      placeholder="Write the notice content"
                      rows={3}
                      className={`${compactField} resize-none`}
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap items-end gap-4">
                    <div className="w-full sm:w-56">
                      <label htmlFor="notice-category" className="field-label">Category</label>
                      <select
                        id="notice-category"
                        value={noticeForm.category}
                        onChange={(e) => setNoticeForm({ ...noticeForm, category: e.target.value })}
                        className={`${compactField} appearance-none`}
                      >
                        {['General', 'Academic', 'Admission', 'Event', 'Exam'].map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddNotice}
                      className="btn btn--accent !min-h-[46px] !px-5 !text-[12px]"
                    >
                      {editNoticeId ? (
                        <>
                          <Check className="h-4 w-4" aria-hidden="true" /> Update notice
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" aria-hidden="true" /> Publish notice
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {notices.length === 0 ? (
                <EmptyState icon={Bell} title="No notices found" description="Publish the first notice to keep the campus informed." />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] text-left">
                    <thead className="bg-main-bg/60">
                      <tr>
                        {['Title', 'Date', 'Category', 'Actions'].map((heading) => (
                          <th key={heading} className={thClass}>{heading}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rule">
                      {notices.map((n) => (
                        <tr key={n.id} className="transition-colors hover:bg-main-bg/35">
                          <td className={`${tdClass} text-[13px] font-semibold text-primary-text`}>{n.title}</td>
                          <td className={`${tdClass} text-[12.5px] text-secondary-text`}>{n.date}</td>
                          <td className={tdClass}>
                            <span className="rounded-full bg-main-bg px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-primary-text-2">
                              {n.category}
                            </span>
                          </td>
                          <td className={tdClass}>
                            <div className="flex gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleEditNotice(n)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-coral-orange transition-colors hover:bg-main-bg"
                                aria-label={`Edit notice: ${n.title}`}
                              >
                                <Edit className="h-4 w-4" aria-hidden="true" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteNotice(n.id)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-coral-orange transition-colors hover:bg-coral-orange/10"
                                aria-label={`Delete notice: ${n.title}`}
                              >
                                <Trash2 className="h-4 w-4" aria-hidden="true" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* ===== FACULTY ===== */}
          {activeTab === 'faculty' && (
            <section className="overflow-hidden rounded-[26px] border border-rule bg-main-bg">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule px-5 py-5 sm:px-6">
                <div>
                  <h2 className="font-serif text-[22px] text-primary-text">All faculty</h2>
                  <p className="mt-1 text-[12px] text-secondary-text">
                    {faculty.length} {faculty.length === 1 ? 'member' : 'members'} on record
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowFacultyForm(!showFacultyForm);
                    setEditFacultyId(null);
                    setFacultyForm({ name: '', photoUrl: '', designation: '', qualification: '', subject: '', bio: '', category: 'teacher' });
                  }}
                  className="btn btn--primary !min-h-[44px] !px-5 !text-[12px]"
                  aria-expanded={showFacultyForm}
                >
                  {showFacultyForm ? <X className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
                  {showFacultyForm ? 'Cancel' : 'Add faculty'}
                </button>
              </div>

              {showFacultyForm && (
                <div className="border-b border-rule bg-main-bg/45 px-5 py-5 sm:px-6">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <label htmlFor="faculty-name" className="field-label">Name *</label>
                      <input id="faculty-name" value={facultyForm.name} onChange={(e) => setFacultyForm({ ...facultyForm, name: e.target.value })} placeholder="Full name" className={compactField} />
                    </div>
                    <div>
                      <label htmlFor="faculty-photo" className="field-label">Photo URL</label>
                      <input id="faculty-photo" value={facultyForm.photoUrl} onChange={(e) => setFacultyForm({ ...facultyForm, photoUrl: e.target.value })} placeholder="https://…" className={compactField} />
                    </div>
                    <div>
                      <label htmlFor="faculty-designation" className="field-label">Designation</label>
                      <input id="faculty-designation" value={facultyForm.designation} onChange={(e) => setFacultyForm({ ...facultyForm, designation: e.target.value })} placeholder="e.g. Professor" className={compactField} />
                    </div>
                    <div>
                      <label htmlFor="faculty-qualification" className="field-label">Qualification</label>
                      <input id="faculty-qualification" value={facultyForm.qualification} onChange={(e) => setFacultyForm({ ...facultyForm, qualification: e.target.value })} placeholder="e.g. Ph.D." className={compactField} />
                    </div>
                    <div>
                      <label htmlFor="faculty-subject" className="field-label">Subject</label>
                      <input id="faculty-subject" value={facultyForm.subject} onChange={(e) => setFacultyForm({ ...facultyForm, subject: e.target.value })} placeholder="e.g. Physics" className={compactField} />
                    </div>
                    <div>
                      <label htmlFor="faculty-category" className="field-label">Category</label>
                      <select
                        id="faculty-category"
                        value={facultyForm.category}
                        onChange={(e) => setFacultyForm({ ...facultyForm, category: e.target.value as FacultyMember['category'] })}
                        className={`${compactField} appearance-none capitalize`}
                      >
                        {['principal', 'vice-principal', 'head', 'teacher', 'admin'].map((c) => (
                          <option key={c} value={c}>{c.replace('-', ' ')}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="faculty-bio" className="field-label">Bio</label>
                    <textarea id="faculty-bio" value={facultyForm.bio} onChange={(e) => setFacultyForm({ ...facultyForm, bio: e.target.value })} placeholder="Short professional biography" rows={2} className={`${compactField} resize-none`} />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddFaculty}
                    className="btn btn--accent mt-4 !min-h-[46px] !px-5 !text-[12px]"
                  >
                    {editFacultyId ? (
                      <>
                        <Check className="h-4 w-4" aria-hidden="true" /> Update member
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" aria-hidden="true" /> Add member
                      </>
                    )}
                  </button>
                </div>
              )}

              {faculty.length === 0 ? (
                <EmptyState icon={Users} title="No faculty members found" description="Add the first faculty profile to build the directory." />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[820px] text-left">
                    <thead className="bg-main-bg/60">
                      <tr>
                        {['Name', 'Designation', 'Qualification', 'Category', 'Actions'].map((heading) => (
                          <th key={heading} className={thClass}>{heading}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rule">
                      {faculty.map((f) => (
                        <tr key={f.id} className="transition-colors hover:bg-main-bg/35">
                          <td className={tdClass}>
                            <div className="flex items-center gap-3">
                              {f.photoUrl ? (
                                <img src={f.photoUrl} alt="" className="h-9 w-9 rounded-full border border-rule object-cover object-top" />
                              ) : (
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-main-bg font-serif text-[13px] text-coral-orange">
                                  {f.name.charAt(0)}
                                </span>
                              )}
                              <span className="text-[13px] font-semibold text-primary-text">{f.name}</span>
                            </div>
                          </td>
                          <td className={`${tdClass} text-[12.5px]`}>{f.designation}</td>
                          <td className={`${tdClass} text-[12.5px]`}>{f.qualification}</td>
                          <td className={tdClass}>
                            <span className="rounded-full bg-main-bg px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-primary-text-2">
                              {f.category.replace('-', ' ')}
                            </span>
                          </td>
                          <td className={tdClass}>
                            <div className="flex gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleEditFaculty(f)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-coral-orange transition-colors hover:bg-main-bg"
                                aria-label={`Edit faculty: ${f.name}`}
                              >
                                <Edit className="h-4 w-4" aria-hidden="true" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteFaculty(f.id)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-coral-orange transition-colors hover:bg-coral-orange/10"
                                aria-label={`Delete faculty: ${f.name}`}
                              >
                                <Trash2 className="h-4 w-4" aria-hidden="true" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* ===== GALLERY ===== */}
          {activeTab === 'gallery' && (
            <section className="overflow-hidden rounded-[26px] border border-rule bg-main-bg">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule px-5 py-5 sm:px-6">
                <div>
                  <h2 className="font-serif text-[22px] text-primary-text">Gallery images</h2>
                  <p className="mt-1 text-[12px] text-secondary-text">
                    {gallery.length} {gallery.length === 1 ? 'image' : 'images'} in the library
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowGalleryForm(!showGalleryForm)}
                  className="btn btn--primary !min-h-[44px] !px-5 !text-[12px]"
                  aria-expanded={showGalleryForm}
                >
                  {showGalleryForm ? <X className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
                  {showGalleryForm ? 'Cancel' : 'Add image'}
                </button>
              </div>

              {showGalleryForm && (
                <div className="border-b border-rule bg-main-bg/45 px-5 py-5 sm:px-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label htmlFor="gallery-url" className="field-label">Image URL *</label>
                      <input id="gallery-url" value={galleryForm.url} onChange={(e) => setGalleryForm({ ...galleryForm, url: e.target.value })} placeholder="https://…" className={compactField} />
                    </div>
                    <div>
                      <label htmlFor="gallery-caption" className="field-label">Caption</label>
                      <input id="gallery-caption" value={galleryForm.caption} onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })} placeholder="Describe the moment" className={compactField} />
                    </div>
                    <div>
                      <label htmlFor="gallery-category" className="field-label">Category</label>
                      <select
                        id="gallery-category"
                        value={galleryForm.category}
                        onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                        className={`${compactField} appearance-none`}
                      >
                        {['Campus', 'Events', 'Sports', 'Other'].map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddGallery}
                    className="btn btn--accent mt-4 !min-h-[46px] !px-5 !text-[12px]"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    Add image
                  </button>
                </div>
              )}

              {gallery.length === 0 ? (
                <EmptyState icon={Image} title="No gallery images found" description="Add the first photograph to bring the campus story to life." />
              ) : (
                <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3 xl:grid-cols-4">
                  {gallery.map((img) => (
                    <figure key={img.id} className="group overflow-hidden rounded-[18px] border border-rule bg-main-bg">
                      <div className="relative aspect-[4/3] overflow-hidden bg-main-bg">
                        <img
                          src={img.url}
                          alt={img.caption || 'Gallery image'}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteGallery(img.id)}
                          className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-ink/70 text-white-surface backdrop-blur transition-colors hover:bg-coral-orange"
                          aria-label={`Delete image: ${img.caption || 'untitled'}`}
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                      <figcaption className="p-3">
                        <p className="line-clamp-1 text-[12px] font-semibold text-primary-text">
                          {img.caption || 'Untitled image'}
                        </p>
                        <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.12em] text-secondary-text">
                          {img.category}
                        </p>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ===== PROGRAMS ===== */}
          {activeTab === 'programs' && (
            <section className="overflow-hidden rounded-[26px] border border-rule bg-main-bg">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule px-5 py-5 sm:px-6">
                <div>
                  <h2 className="font-serif text-[22px] text-primary-text">All programs</h2>
                  <p className="mt-1 text-[12px] text-secondary-text">
                    {programs.length} {programs.length === 1 ? 'program' : 'programs'} available
                  </p>
                </div>
              </div>
              {programs.length === 0 ? (
                <EmptyState icon={BookOpen} title="No programs found" description="Programs seeded in the CMS will be listed here." />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[980px] text-left">
                    <thead className="bg-main-bg/60">
                      <tr>
                        {['Program', 'Duration', 'Eligibility', 'Level', 'Category', 'Actions'].map((heading) => (
                          <th key={heading} className={thClass}>{heading}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rule">
                      {programs.map((p) => (
                        <tr key={p.id} className="transition-colors hover:bg-main-bg/35">
                          {editProgramId === p.id ? (
                            <>
                              <td className={tdClass}>
                                <input aria-label="Program name" value={programEditData.name} onChange={(e) => setProgramEditData({ ...programEditData, name: e.target.value })} className={`${compactField} !min-h-[38px] !w-36 !rounded-lg !px-2.5 !py-1.5 !text-[12px]`} />
                              </td>
                              <td className={tdClass}>
                                <input aria-label="Program duration" value={programEditData.duration} onChange={(e) => setProgramEditData({ ...programEditData, duration: e.target.value })} className={`${compactField} !min-h-[38px] !w-28 !rounded-lg !px-2.5 !py-1.5 !text-[12px]`} />
                              </td>
                              <td className={tdClass}>
                                <input aria-label="Program eligibility" value={programEditData.eligibility} onChange={(e) => setProgramEditData({ ...programEditData, eligibility: e.target.value })} className={`${compactField} !min-h-[38px] !w-44 !rounded-lg !px-2.5 !py-1.5 !text-[12px]`} />
                              </td>
                              <td className={tdClass}>
                                <input aria-label="Program level" value={programEditData.level} onChange={(e) => setProgramEditData({ ...programEditData, level: e.target.value })} className={`${compactField} !min-h-[38px] !w-32 !rounded-lg !px-2.5 !py-1.5 !text-[12px]`} />
                              </td>
                              <td className={tdClass}>
                                <input aria-label="Program category" value={programEditData.category} onChange={(e) => setProgramEditData({ ...programEditData, category: e.target.value })} className={`${compactField} !min-h-[38px] !w-32 !rounded-lg !px-2.5 !py-1.5 !text-[12px]`} />
                              </td>
                              <td className={tdClass}>
                                <div className="flex gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleSaveProgram(p.id)}
                                    className="flex h-8 w-8 items-center justify-center rounded-full text-coral-orange transition-colors hover:bg-ochre/10"
                                    aria-label={`Save program: ${p.name}`}
                                  >
                                    <Check className="h-4 w-4" aria-hidden="true" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditProgramId(null)}
                                    className="flex h-8 w-8 items-center justify-center rounded-full text-secondary-text transition-colors hover:bg-main-bg"
                                    aria-label="Cancel editing"
                                  >
                                    <X className="h-4 w-4" aria-hidden="true" />
                                  </button>
                                </div>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className={`${tdClass} text-[13px] font-semibold text-primary-text`}>{p.name}</td>
                              <td className={`${tdClass} text-[12.5px]`}>{p.duration}</td>
                              <td className={`${tdClass} max-w-[240px] text-[12.5px]`}>{p.eligibility}</td>
                              <td className={tdClass}>
                                <span className="rounded-full bg-coral-orange/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-coral-orange">
                                  {p.level}
                                </span>
                              </td>
                              <td className={tdClass}>
                                <span className="rounded-full bg-main-bg px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-primary-text-2">
                                  {p.category}
                                </span>
                              </td>
                              <td className={tdClass}>
                                <button
                                  type="button"
                                  onClick={() => handleEditProgram(p)}
                                  className="flex h-8 w-8 items-center justify-center rounded-full text-coral-orange transition-colors hover:bg-main-bg"
                                  aria-label={`Edit program: ${p.name}`}
                                >
                                  <Edit className="h-4 w-4" aria-hidden="true" />
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* ===== INQUIRIES ===== */}
          {activeTab === 'inquiries' && (
            <section className="overflow-hidden rounded-[26px] border border-rule bg-main-bg">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule px-5 py-5 sm:px-6">
                <div>
                  <h2 className="font-serif text-[22px] text-primary-text">All inquiries</h2>
                  <p className="mt-1 text-[12px] text-secondary-text">
                    {filteredInquiries.length} of {inquiries.length} shown
                  </p>
                </div>
                <div className="relative w-full sm:w-72">
                  <label htmlFor="inquiry-search" className="visually-hidden">Search inquiries by student name</label>
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-text" aria-hidden="true" />
                  <input
                    id="inquiry-search"
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    className={`${compactField} field--icon !min-h-[44px]`}
                    placeholder="Search by name…"
                  />
                </div>
              </div>

              {filteredInquiries.length === 0 ? (
                <EmptyState icon={MessageSquare} title="No inquiries found" description="Try a different name, or wait for new submissions to arrive." />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1000px] text-left">
                    <thead className="bg-main-bg/60">
                      <tr>
                        {['Name', 'Email', 'Phone', 'Program', 'Date', 'Status', 'Actions'].map((heading) => (
                          <th key={heading} className={thClass}>{heading}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rule">
                      {filteredInquiries.map((inq) => (
                        <tr key={inq.id} className="transition-colors hover:bg-main-bg/35">
                          <td className={`${tdClass} text-[13px] font-semibold text-primary-text`}>{inq.studentName}</td>
                          <td className={`${tdClass} text-[12px]`}>{inq.email}</td>
                          <td className={`${tdClass} text-[12px]`}>{inq.phone}</td>
                          <td className={`${tdClass} text-[12.5px]`}>{inq.programOfInterest}</td>
                          <td className={`${tdClass} text-[12px] text-secondary-text`}>
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-3 w-3" aria-hidden="true" />
                              {new Date(inq.submittedAt).toLocaleDateString()}
                            </span>
                          </td>
                          <td className={tdClass}>
                            <select
                              value={inq.status}
                              onChange={(e) => handleStatusChange(inq.id, e.target.value as AdmissionInquiry['status'])}
                              aria-label={`Status for ${inq.studentName}`}
                              className={`cursor-pointer appearance-none rounded-full border-0 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.05em] outline-none ${statusStyles[inq.status]}`}
                            >
                              <option value="new">New</option>
                              <option value="replied">Replied</option>
                              <option value="pending">Pending</option>
                            </select>
                          </td>
                          <td className={tdClass}>
                            <button
                              type="button"
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="flex h-8 w-8 items-center justify-center rounded-full text-coral-orange transition-colors hover:bg-coral-orange/10"
                              aria-label={`Delete inquiry from ${inq.studentName}`}
                            >
                              <Trash2 className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* ===== CALENDAR ===== */}
          {activeTab === 'calendar' && (
            <section className="overflow-hidden rounded-[26px] border border-rule bg-main-bg">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule px-5 py-5 sm:px-6">
                <div>
                  <h2 className="font-serif text-[22px] text-primary-text">Calendar events</h2>
                  <p className="mt-1 text-[12px] text-secondary-text">
                    {events.length} {events.length === 1 ? 'event' : 'events'} scheduled
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowEventForm(!showEventForm)}
                  className="btn btn--primary !min-h-[44px] !px-5 !text-[12px]"
                  aria-expanded={showEventForm}
                >
                  {showEventForm ? <X className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
                  {showEventForm ? 'Cancel' : 'Add event'}
                </button>
              </div>

              {showEventForm && (
                <div className="border-b border-rule bg-main-bg/45 px-5 py-5 sm:px-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label htmlFor="event-title" className="field-label">Event title *</label>
                      <input id="event-title" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} placeholder="Event name" className={compactField} />
                    </div>
                    <div>
                      <label htmlFor="event-date" className="field-label">Date</label>
                      <input id="event-date" value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} type="date" className={compactField} />
                    </div>
                    <div>
                      <label htmlFor="event-type" className="field-label">Type</label>
                      <select
                        id="event-type"
                        value={eventForm.type}
                        onChange={(e) => setEventForm({ ...eventForm, type: e.target.value as CalendarEvent['type'] })}
                        className={`${compactField} appearance-none`}
                      >
                        <option value="academic">Academic</option>
                        <option value="holiday">Holiday</option>
                        <option value="event">Event</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddEvent}
                    className="btn btn--accent mt-4 !min-h-[46px] !px-5 !text-[12px]"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    Add event
                  </button>
                </div>
              )}

              {events.length === 0 ? (
                <EmptyState icon={Calendar} title="No events found" description="Add academic dates, holidays and campus events to the calendar." />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[620px] text-left">
                    <thead className="bg-main-bg/60">
                      <tr>
                        {['Title', 'Date', 'Type', 'Actions'].map((heading) => (
                          <th key={heading} className={thClass}>{heading}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rule">
                      {events.map((event) => (
                        <tr key={event.id} className="transition-colors hover:bg-main-bg/35">
                          <td className={`${tdClass} text-[13px] font-semibold text-primary-text`}>{event.title}</td>
                          <td className={`${tdClass} text-[12.5px] text-secondary-text`}>{event.date}</td>
                          <td className={tdClass}>
                            <span className={`rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] ${eventStyles[event.type]}`}>
                              {event.type}
                            </span>
                          </td>
                          <td className={tdClass}>
                            <button
                              type="button"
                              onClick={() => handleDeleteEvent(event.id)}
                              className="flex h-8 w-8 items-center justify-center rounded-full text-coral-orange transition-colors hover:bg-coral-orange/10"
                              aria-label={`Delete event: ${event.title}`}
                            >
                              <Trash2 className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* ===== CONTACT INFO ===== */}
          {activeTab === 'contact' && (
            <section className="max-w-3xl overflow-hidden rounded-[26px] border border-rule bg-main-bg">
              <div className="border-b border-rule px-5 py-5 sm:px-6">
                <h2 className="font-serif text-[22px] text-primary-text">Contact information</h2>
                <p className="mt-1 text-[12px] text-secondary-text">
                  Update the public contact details shown across the website.
                </p>
              </div>

              {contact ? (
                <div className="space-y-5 px-5 py-6 sm:px-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-phone" className="field-label">Phone</label>
                      <input id="contact-phone" value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} className={compactField} />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="field-label">Email</label>
                      <input id="contact-email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} className={compactField} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-address" className="field-label">Address</label>
                    <textarea id="contact-address" value={contactForm.address} onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })} rows={2} className={`${compactField} resize-none`} />
                  </div>
                  <div>
                    <label htmlFor="contact-hours" className="field-label">Working hours</label>
                    <input id="contact-hours" value={contactForm.workingHours} onChange={(e) => setContactForm({ ...contactForm, workingHours: e.target.value })} className={compactField} />
                  </div>

                  <div className="border-t border-rule pt-5">
                    <h3 className="font-serif text-[18px] text-primary-text">Social links</h3>
                    <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-secondary-text">
                      Leave blank to hide a platform
                    </p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      {(['facebook', 'instagram', 'youtube', 'twitter'] as const).map((platform) => (
                        <div key={platform}>
                          <label htmlFor={`contact-${platform}`} className="field-label capitalize">{platform}</label>
                          <input
                            id={`contact-${platform}`}
                            value={contactForm.socialLinks[platform]}
                            onChange={(e) => setContactForm({ ...contactForm, socialLinks: { ...contactForm.socialLinks, [platform]: e.target.value } })}
                            placeholder="https://…"
                            className={compactField}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-5">
                    <p className="max-w-[38ch] text-[11px] leading-relaxed text-secondary-text">
                      Changes are saved to this browser&rsquo;s local CMS store and appear on the website.
                    </p>
                    <button type="button" onClick={handleSaveContact} className="btn btn--primary !min-h-[46px] !px-5 !text-[12px]">
                      <Check className="h-4 w-4" aria-hidden="true" />
                      Save contact info
                    </button>
                  </div>
                </div>
              ) : (
                <EmptyState icon={Phone} title="Contact details unavailable" description="Seeded contact information will appear here once loaded." />
              )}
            </section>
          )}
        </main>

        <footer className="border-t border-rule px-5 py-5 sm:px-8 lg:px-10">
          <p className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-secondary-text">
            St. Augustine&rsquo;s College · Content management studio
          </p>
        </footer>
      </div>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Bell;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-main-bg text-coral-orange">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-serif text-[21px] text-primary-text">{title}</h3>
      <p className="mt-1.5 max-w-[42ch] text-[12.5px] leading-relaxed text-secondary-text">{description}</p>
    </div>
  );
}
