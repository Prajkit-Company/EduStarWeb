import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  LayoutDashboard,
  Bell,
  Users,
  Image,
  BookOpen,
  MessageSquare,
  Calendar,
  Phone,
  LogOut,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  X,
  Check,
  Clock,
  UserCheck,
  Menu,
  ArrowUpRight,
  Inbox,
  ChevronDown,
  ChevronRight,
  Sparkles,
  TrendingUp,
  AlertCircle,
  SlidersHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import {
  getNotices,
  addNotice,
  updateNotice,
  deleteNotice,
  getFaculty,
  addFaculty,
  updateFaculty,
  deleteFaculty,
  getGalleryImages,
  addGalleryImage,
  deleteGalleryImage,
  getPrograms,
  updateProgram,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
  getContactInfo,
  saveContactInfo,
  getCalendarEvents,
  addCalendarEvent,
  deleteCalendarEvent,
  seedIfEmpty,
} from '../../lib/cms';
import type {
  Notice,
  FacultyMember,
  GalleryImage,
  Program,
  AdmissionInquiry,
  ContactInfo,
  CalendarEvent,
} from '../../types';
import { cn } from '../../utils/cn';
import schoolLogo from '../../image/logo.png';

interface Props {
  onLogout: () => void;
  onBack: () => void;
}

const statusStyles: Record<AdmissionInquiry['status'], string> = {
  new: 'bg-coral-orange/10 text-coral-orange ring-1 ring-inset ring-coral-orange/15',
  replied: 'bg-[#e44a2e]/10 text-[#b83b24] ring-1 ring-inset ring-[#e44a2e]/15',
  pending: 'bg-pale-blue text-primary-text-2 ring-1 ring-inset ring-rule-2/60',
};

const eventStyles: Record<CalendarEvent['type'], string> = {
  academic: 'bg-coral-orange/10 text-coral-orange ring-1 ring-inset ring-coral-orange/15',
  holiday: 'bg-gold/12 text-[#8a6a12] ring-1 ring-inset ring-gold/20',
  event: 'bg-pale-blue text-primary-text-2 ring-1 ring-inset ring-rule-2/60',
};

type TabId = 'dashboard' | 'notices' | 'faculty' | 'gallery' | 'programs' | 'inquiries' | 'calendar' | 'contact';
type TabItem = { id: TabId; label: string; icon: typeof LayoutDashboard };

const navGroups: { label: string; items: TabItem[] }[] = [
  {
    label: 'Overview',
    items: [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    label: 'Content',
    items: [
      { id: 'notices', label: 'Notices', icon: Bell },
      { id: 'faculty', label: 'Faculty', icon: Users },
      { id: 'gallery', label: 'Gallery', icon: Image },
      { id: 'programs', label: 'Programs', icon: BookOpen },
    ],
  },
  {
    label: 'Operations',
    items: [
      { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
      { id: 'calendar', label: 'Calendar', icon: Calendar },
      { id: 'contact', label: 'Contact info', icon: Phone },
    ],
  },
];

const tabs: TabItem[] = navGroups.flatMap((group) => group.items);

const compactField =
  'w-full min-h-[46px] rounded-xl border border-rule bg-white-surface px-3.5 py-2.5 text-[13px] text-primary-text outline-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-secondary-text/80 hover:border-rule-2 focus:border-coral-orange focus:shadow-[0_0_0_4px_color-mix(in_srgb,#FF5638_10%,transparent)]';
const thClass =
  'px-5 py-3.5 text-left font-mono text-[9.5px] font-medium uppercase tracking-[0.14em] text-secondary-text';
const tdClass = 'px-5 py-4 align-middle';

export function AdminDashboard({ onLogout, onBack }: Props) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

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

  const [facultyForm, setFacultyForm] = useState({
    name: '',
    photoUrl: '',
    designation: '',
    qualification: '',
    subject: '',
    bio: '',
    category: 'teacher' as FacultyMember['category'],
  });
  const [editFacultyId, setEditFacultyId] = useState<string | null>(null);
  const [showFacultyForm, setShowFacultyForm] = useState(false);

  const [galleryForm, setGalleryForm] = useState({ url: '', caption: '', category: 'Campus' });
  const [showGalleryForm, setShowGalleryForm] = useState(false);

  const [editProgramId, setEditProgramId] = useState<string | null>(null);
  const [programEditData, setProgramEditData] = useState({
    name: '',
    duration: '',
    eligibility: '',
    level: '',
    category: '',
  });

  const [inquirySearch, setInquirySearch] = useState('');

  const [contactForm, setContactForm] = useState<ContactInfo>({
    phone: '',
    email: '',
    address: '',
    workingHours: '',
    socialLinks: { facebook: '', instagram: '', youtube: '', twitter: '' },
  });

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

  const contactHydrated = useMemo(() => ({ done: false }), []);
  useEffect(() => {
    if (contact && !contactHydrated.done) {
      setContactForm(contact);
      contactHydrated.done = true;
    }
  }, [contact, contactHydrated]);

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
    setFacultyForm({
      name: f.name,
      photoUrl: f.photoUrl,
      designation: f.designation,
      qualification: f.qualification,
      subject: f.subject,
      bio: f.bio,
      category: f.category,
    });
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
    setProgramEditData({
      name: p.name,
      duration: p.duration,
      eligibility: p.eligibility,
      level: p.level,
      category: p.category,
    });
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
    i.studentName.toLowerCase().includes(inquirySearch.toLowerCase()),
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
    setProfileOpen(false);
    setNotifOpen(false);
  };

  const handleGlobalSearch = (value: string) => {
    setGlobalSearch(value);
    const q = value.trim().toLowerCase();
    if (!q) return;
    // functional jump: if query suggests inquiries/people, move to inquiries and apply filter
    const inquiryHit = inquiries.some(
      (i) =>
        i.studentName.toLowerCase().includes(q) ||
        i.email.toLowerCase().includes(q) ||
        i.programOfInterest.toLowerCase().includes(q),
    );
    if (inquiryHit) {
      setInquirySearch(value);
      setActiveTab('inquiries');
      return;
    }
    const facultyHit = faculty.some((f) => f.name.toLowerCase().includes(q) || f.subject.toLowerCase().includes(q));
    if (facultyHit) setActiveTab('faculty');
    const noticeHit = notices.some((n) => n.title.toLowerCase().includes(q));
    if (noticeHit) setActiveTab('notices');
  };

  const currentTab = tabs.find((t) => t.id === activeTab);
  const newInquiries = inquiries.filter((i) => i.status === 'new').length;
  const pendingInquiries = inquiries.filter((i) => i.status === 'pending').length;
  const todayLabel = new Date().toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const inquiryStatusData = useMemo(() => {
    const counts = { new: 0, pending: 0, replied: 0 } as Record<AdmissionInquiry['status'], number>;
    inquiries.forEach((i) => {
      counts[i.status] = (counts[i.status] || 0) + 1;
    });
    return [
      { key: 'new' as const, label: 'New', value: counts.new, color: '#FF5638' },
      { key: 'pending' as const, label: 'Pending', value: counts.pending, color: '#C9D6E0' },
      { key: 'replied' as const, label: 'Replied', value: counts.replied, color: '#e44a2e' },
    ];
  }, [inquiries]);

  const inquiryTrend = useMemo(() => {
    const now = new Date();
    const months: { key: string; label: string; value: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        key: `${d.getFullYear()}-${d.getMonth()}`,
        label: d.toLocaleString(undefined, { month: 'short' }),
        value: 0,
      });
    }
    inquiries.forEach((inq) => {
      const d = new Date(inq.submittedAt);
      if (Number.isNaN(d.getTime())) return;
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      const bucket = months.find((m) => m.key === key);
      if (bucket) bucket.value += 1;
    });
    return months;
  }, [inquiries]);

  const programLevelData = useMemo(() => {
    const map = new Map<string, number>();
    programs.forEach((p) => map.set(p.level || 'Other', (map.get(p.level || 'Other') || 0) + 1));
    return Array.from(map.entries()).map(([label, value]) => ({ label, value }));
  }, [programs]);

  const notifications = [
    ...(newInquiries > 0
      ? [{ title: `${newInquiries} new admission ${newInquiries === 1 ? 'inquiry' : 'inquiries'}`, meta: 'Needs review', tab: 'inquiries' }]
      : []),
    ...(pendingInquiries > 0
      ? [{ title: `${pendingInquiries} pending ${pendingInquiries === 1 ? 'inquiry' : 'inquiries'}`, meta: 'Awaiting response', tab: 'inquiries' }]
      : []),
    ...(notices[0] ? [{ title: `Latest notice: ${notices[0].title}`, meta: notices[0].date || 'Published', tab: 'notices' }] : []),
  ];

  const collapsed = sidebarCollapsed;

  return (
    <div className="min-h-screen bg-main-bg text-primary-text">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-ink/35 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col border-r border-rule bg-white-surface/95 shadow-[0_20px_50px_-40px_rgba(17,17,17,0.45)] backdrop-blur-xl transition-[transform,width] duration-300 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          collapsed ? 'lg:w-[88px]' : 'w-[284px]',
        )}
      >
        <div className={cn('flex items-center gap-3 border-b border-rule px-5 py-5', collapsed && 'lg:justify-center lg:px-3')}>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-rule bg-white-surface shadow-[0_10px_24px_-18px_rgba(17,17,17,0.18)] ring-1 ring-inset ring-coral-orange/10">
            <img src={schoolLogo} alt="St. Augustine's College logo" className="h-full w-full object-contain p-1.5" />
          </span>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate font-serif text-[18px] leading-none text-primary-text">St. Augustine&rsquo;s</p>
              <p className="mt-1.5 font-mono text-[8.5px] uppercase tracking-[0.18em] text-secondary-text">
                Admin workspace
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-xl border border-rule text-secondary-text transition-colors hover:border-rule-2 hover:text-primary-text lg:hidden"
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <nav className={cn('flex-1 overflow-y-auto px-3 py-4', collapsed && 'lg:px-2')} aria-label="Admin sections">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-5 last:mb-0">
              {!collapsed && (
                <p className="mb-2 px-3 font-mono text-[8.5px] uppercase tracking-[0.18em] text-secondary-text">
                  {group.label}
                </p>
              )}
              <div className="space-y-1">
                {group.items.map((tab) => {
                  const active = activeTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => selectTab(tab.id)}
                      aria-current={active ? 'page' : undefined}
                      title={collapsed ? tab.label : undefined}
                      className={cn(
                        'group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold transition-all duration-200',
                        collapsed && 'lg:justify-center lg:px-0',
                        active
                          ? 'bg-soft-coral text-coral-orange ring-1 ring-inset ring-coral-orange/12'
                          : 'text-primary-text-2 hover:bg-main-bg hover:text-primary-text',
                      )}
                    >
                      {active && (
                        <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-coral-orange" aria-hidden="true" />
                      )}
                      <Icon className={cn('h-[18px] w-[18px] shrink-0', active ? 'text-coral-orange' : 'text-secondary-text group-hover:text-primary-text')} aria-hidden="true" />
                      {!collapsed && <span className="flex-1 truncate">{tab.label}</span>}
                      {!collapsed && tab.id === 'inquiries' && newInquiries > 0 && (
                        <span className="rounded-full bg-coral-orange px-[7px] py-0.5 font-mono text-[9px] font-semibold text-white-surface">
                          {newInquiries}
                        </span>
                      )}
                      {collapsed && tab.id === 'inquiries' && newInquiries > 0 && (
                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-coral-orange" aria-hidden="true" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className={cn('border-t border-rule p-3', collapsed && 'lg:px-2')}>
          <button
            type="button"
            onClick={() => setSidebarCollapsed((v) => !v)}
            className={cn(
              'hidden w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-secondary-text transition-colors hover:bg-main-bg hover:text-primary-text lg:flex',
              collapsed && 'justify-center px-0',
            )}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <PanelLeftOpen className="h-[18px] w-[18px]" aria-hidden="true" /> : <PanelLeftClose className="h-[18px] w-[18px]" aria-hidden="true" />}
            {!collapsed && <span>{collapsed ? 'Expand' : 'Collapse'}</span>}
          </button>
          <button
            type="button"
            onClick={onBack}
            className={cn(
              'mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-secondary-text transition-colors hover:bg-main-bg hover:text-primary-text',
              collapsed && 'lg:justify-center lg:px-0',
            )}
            title={collapsed ? 'View website' : undefined}
          >
            <Eye className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">View website</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onLogout}
            className={cn(
              'mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-secondary-text transition-colors hover:bg-coral-orange/[0.06] hover:text-coral-orange',
              collapsed && 'lg:justify-center lg:px-0',
            )}
            title={collapsed ? 'Sign out' : undefined}
          >
            <LogOut className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
            {!collapsed && <span>Sign out</span>}
          </button>
        </div>
      </aside>

      <div className={cn('transition-[margin] duration-300', collapsed ? 'lg:ml-[88px]' : 'lg:ml-[284px]')}>
        <header className="sticky top-0 z-30 border-b border-rule bg-main-bg/85 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-rule bg-white-surface text-primary-text-2 transition-colors hover:border-rule-2 hover:text-primary-text lg:hidden"
                aria-label="Open navigation"
                aria-expanded={sidebarOpen}
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-secondary-text">
                  <span>Admin</span>
                  <ChevronRight className="h-3 w-3" aria-hidden="true" />
                  <span className="truncate text-primary-text-2">{currentTab?.label || activeTab}</span>
                </div>
                <h1 className="mt-0.5 truncate font-serif text-[22px] leading-tight tracking-[-0.02em] text-primary-text sm:text-[26px]">
                  {currentTab?.label || activeTab}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative hidden md:block">
                <label htmlFor="global-admin-search" className="visually-hidden">
                  Search admin workspace
                </label>
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-text" aria-hidden="true" />
                <input
                  id="global-admin-search"
                  value={globalSearch}
                  onChange={(e) => handleGlobalSearch(e.target.value)}
                  placeholder="Search inquiries, faculty, notices…"
                  className="h-10 w-[240px] rounded-xl border border-rule bg-white-surface pl-10 pr-3 text-[13px] text-primary-text outline-none transition-all placeholder:text-secondary-text/80 focus:w-[300px] focus:border-coral-orange focus:shadow-[0_0_0_4px_color-mix(in_srgb,#FF5638_10%,transparent)] lg:w-[280px]"
                />
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setNotifOpen((v) => !v);
                    setProfileOpen(false);
                  }}
                  className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-rule bg-white-surface text-primary-text-2 transition-colors hover:border-rule-2 hover:text-primary-text"
                  aria-label="Notifications"
                  aria-expanded={notifOpen}
                >
                  <Bell className="h-[18px] w-[18px]" aria-hidden="true" />
                  {newInquiries > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-coral-orange px-1 font-mono text-[9px] font-semibold text-white-surface">
                      {newInquiries}
                    </span>
                  )}
                </button>
                {notifOpen && (
                  <div className="absolute right-0 top-[calc(100%+8px)] w-[320px] overflow-hidden rounded-2xl border border-rule bg-white-surface shadow-[0_24px_50px_-30px_rgba(17,17,17,0.35)]">
                    <div className="border-b border-rule px-4 py-3">
                      <p className="text-[13px] font-semibold text-primary-text">Notifications</p>
                      <p className="mt-0.5 font-mono text-[8.5px] uppercase tracking-[0.14em] text-secondary-text">
                        Based on current CMS data
                      </p>
                    </div>
                    <div className="max-h-72 overflow-auto p-2">
                      {notifications.length === 0 ? (
                        <p className="px-2 py-6 text-center text-[12.5px] text-secondary-text">No new notifications.</p>
                      ) : (
                        notifications.map((n) => (
                          <button
                            key={n.title}
                            type="button"
                            onClick={() => selectTab(n.tab)}
                            className="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-main-bg"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral-orange" aria-hidden="true" />
                            <span className="min-w-0">
                              <span className="block truncate text-[12.5px] font-semibold text-primary-text">{n.title}</span>
                              <span className="mt-0.5 block font-mono text-[8.5px] uppercase tracking-[0.12em] text-secondary-text">
                                {n.meta}
                              </span>
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen((v) => !v);
                    setNotifOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-xl border border-rule bg-white-surface py-1.5 pl-1.5 pr-2.5 transition-colors hover:border-rule-2"
                  aria-expanded={profileOpen}
                  aria-label="Account menu"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral-orange text-[12px] font-semibold text-white-surface">
                    A
                  </span>
                  <span className="hidden text-left sm:block">
                    <span className="block text-[12px] font-semibold leading-none text-primary-text">Administrator</span>
                    <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.14em] leading-none text-secondary-text">
                      Full access
                    </span>
                  </span>
                  <ChevronDown className="hidden h-4 w-4 text-secondary-text sm:block" aria-hidden="true" />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 top-[calc(100%+8px)] w-52 overflow-hidden rounded-2xl border border-rule bg-white-surface p-1.5 shadow-[0_24px_50px_-30px_rgba(17,17,17,0.35)]">
                    <button type="button" onClick={onBack} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium text-primary-text-2 transition-colors hover:bg-main-bg hover:text-primary-text">
                      <Eye className="h-4 w-4" aria-hidden="true" /> View website
                    </button>
                    <button type="button" onClick={onLogout} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium text-coral-orange transition-colors hover:bg-coral-orange/[0.06]">
                      <LogOut className="h-4 w-4" aria-hidden="true" /> Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1480px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {/* ===== DASHBOARD ===== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <section className="relative overflow-hidden rounded-[24px] border border-rule bg-white-surface p-5 shadow-[0_1px_0_rgba(17,17,17,0.02)] sm:p-6">
                <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-coral-orange/[0.06]" aria-hidden="true" />
                <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-main-bg px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-secondary-text">
                      <Sparkles className="h-3.5 w-3.5 text-coral-orange" aria-hidden="true" />
                      {todayLabel}
                    </div>
                    <h2 className="mt-3 font-serif text-[28px] leading-tight tracking-[-0.03em] text-primary-text sm:text-[32px]">
                      Welcome back, <span className="text-coral-orange">Administrator</span>
                    </h2>
                    <p className="mt-2 max-w-[62ch] text-[13.5px] leading-relaxed text-secondary-text">
                      Manage notices, faculty, programs, gallery, inquiries, calendar, and contact details from one workspace. Metrics below reflect live data in this browser’s CMS store.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => selectTab('inquiries')} className="btn btn--primary !min-h-[42px] !px-4 !text-[12px]">
                      <MessageSquare className="h-4 w-4" aria-hidden="true" /> Review inquiries
                    </button>
                    <button type="button" onClick={() => selectTab('notices')} className="btn btn--outline !min-h-[42px] !px-4 !text-[12px]">
                      <Plus className="h-4 w-4" aria-hidden="true" /> New notice
                    </button>
                  </div>
                </div>
              </section>

              <section aria-label="Key metrics" className="grid gap-4 lg:grid-cols-12">
                <article className="relative overflow-hidden rounded-[24px] border border-coral-orange/15 bg-coral-orange p-5 text-white-surface shadow-[0_18px_40px_-24px_rgba(255,86,56,0.55)] sm:p-6 lg:col-span-5">
                  <div className="pattern-bg pointer-events-none absolute inset-0 opacity-[0.1]" aria-hidden="true" />
                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-white-surface/70">Primary attention</p>
                      <h3 className="mt-2 text-[14px] font-semibold text-white-surface/90">New admission inquiries</h3>
                      <p className="mt-4 font-serif text-[52px] leading-none tracking-[-0.04em] text-white-surface">{newInquiries}</p>
                      <p className="mt-3 max-w-[34ch] text-[12.5px] leading-relaxed text-white-surface/75">
                        {inquiries.length === 0
                          ? 'No inquiries submitted yet.'
                          : `${inquiries.length} total ${inquiries.length === 1 ? 'submission' : 'submissions'} · ${pendingInquiries} pending response.`}
                      </p>
                    </div>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white-surface/15 ring-1 ring-inset ring-white-surface/20">
                      <MessageSquare className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => selectTab('inquiries')}
                    className="relative mt-5 inline-flex items-center gap-1.5 rounded-xl bg-white-surface px-3.5 py-2 text-[12px] font-semibold text-coral-orange transition-colors hover:bg-soft-coral"
                  >
                    Open inquiries <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </article>

                <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
                  {[
                    { title: 'Published notices', value: notices.length, icon: Bell, meta: 'Announcements' },
                    { title: 'Faculty members', value: faculty.length, icon: Users, meta: 'Directory' },
                    { title: 'Gallery images', value: gallery.length, icon: Image, meta: 'Media library' },
                  ].map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <article key={stat.title} className="rounded-[22px] border border-rule bg-white-surface p-5 shadow-[0_1px_0_rgba(17,17,17,0.02)]">
                        <div className="flex items-start justify-between gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-soft-coral text-coral-orange ring-1 ring-inset ring-coral-orange/10">
                            <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                          </span>
                          <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-secondary-text">{stat.meta}</span>
                        </div>
                        <p className="mt-5 font-serif text-[36px] leading-none tracking-[-0.03em] text-primary-text">{stat.value}</p>
                        <p className="mt-2 text-[12px] font-semibold text-primary-text-2">{stat.title}</p>
                      </article>
                    );
                  })}
                </div>
              </section>

              <section className="grid gap-6 xl:grid-cols-12">
                <div className="space-y-6 xl:col-span-7">
                  <Panel
                    title="Inquiry activity"
                    description="Submissions by month (last 6 months, from real inquiry dates)"
                    action={
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-rule bg-main-bg px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.12em] text-secondary-text">
                        <TrendingUp className="h-3 w-3 text-coral-orange" aria-hidden="true" /> Local data
                      </span>
                    }
                  >
                    {inquiries.length === 0 ? (
                      <EmptyChart message="Inquiry trend will appear when submissions are received." />
                    ) : (
                      <MiniBarChart data={inquiryTrend} />
                    )}
                  </Panel>

                  <Panel title="Recent inquiries" description="Latest admission submissions" action={
                    <button type="button" onClick={() => selectTab('inquiries')} className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-coral-orange transition-colors hover:text-[#e44a2e]">
                      View all <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  }>
                    {inquiries.length === 0 ? (
                      <div className="flex flex-col items-center px-6 py-12 text-center">
                        <Inbox className="h-7 w-7 text-coral-orange/70" aria-hidden="true" />
                        <p className="mt-3 font-serif text-[19px] text-primary-text">No inquiries yet</p>
                        <p className="mt-1 text-[12.5px] text-secondary-text">New admission inquiries will appear here.</p>
                      </div>
                    ) : (
                      <ul className="divide-y divide-rule">
                        {inquiries.slice(0, 5).map((q) => (
                          <li key={q.id} className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
                            <div className="min-w-0">
                              <p className="truncate text-[13px] font-semibold text-primary-text">{q.studentName}</p>
                              <p className="mt-0.5 text-[12px] text-secondary-text">
                                {q.programOfInterest} · {new Date(q.submittedAt).toLocaleDateString()}
                              </p>
                            </div>
                            <span className={cn('shrink-0 rounded-full px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.06em]', statusStyles[q.status])}>
                              {q.status}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Panel>
                </div>

                <div className="space-y-6 xl:col-span-5">
                  <Panel title="Inquiry status" description="Current distribution across all inquiries">
                    {inquiries.length === 0 ? (
                      <EmptyChart message="Status breakdown will appear when inquiries exist." />
                    ) : (
                      <StatusBreakdown data={inquiryStatusData} total={inquiries.length} />
                    )}
                  </Panel>

                  <Panel title="Programs by level" description="From managed program records">
                    {programs.length === 0 ? (
                      <EmptyChart message="Program distribution will appear when programs are available." />
                    ) : (
                      <HorizontalBars
                        data={programLevelData}
                        colors={['#FF5638', '#e44a2e', '#C9D6E0', '#D5A63C']}
                      />
                    )}
                  </Panel>

                  <section className="rounded-[24px] border border-rule bg-white-surface p-5 shadow-[0_1px_0_rgba(17,17,17,0.02)] sm:p-6">
                    <h3 className="font-serif text-[20px] tracking-[-0.02em] text-primary-text">Quick actions</h3>
                    <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-secondary-text">Jump to common tasks</p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {[
                        { label: 'Add notice', icon: Bell, tab: 'notices' },
                        { label: 'Add faculty', icon: UserCheck, tab: 'faculty' },
                        { label: 'Add event', icon: Calendar, tab: 'calendar' },
                        { label: 'Contact info', icon: Phone, tab: 'contact' },
                      ].map((action) => {
                        const Icon = action.icon;
                        return (
                          <button
                            key={action.label}
                            type="button"
                            onClick={() => selectTab(action.tab)}
                            className="group flex flex-col items-start gap-3 rounded-2xl border border-rule bg-main-bg/50 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-rule-2 hover:bg-white-surface hover:shadow-[0_14px_30px_-24px_rgba(17,17,17,0.35)]"
                          >
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white-surface text-coral-orange ring-1 ring-inset ring-rule transition-colors group-hover:bg-coral-orange group-hover:text-white-surface group-hover:ring-coral-orange">
                              <Icon className="h-4 w-4" aria-hidden="true" />
                            </span>
                            <span className="text-[12.5px] font-semibold text-primary-text">{action.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                </div>
              </section>
            </div>
          )}

          {/* ===== NOTICES ===== */}
          {activeTab === 'notices' && (
            <SectionShell
              title="All notices"
              description={`${notices.length} published ${notices.length === 1 ? 'notice' : 'notices'}`}
              action={
                <button
                  type="button"
                  onClick={() => {
                    setShowNoticeForm(!showNoticeForm);
                    setEditNoticeId(null);
                    setNoticeForm({ title: '', content: '', date: '', category: 'General' });
                  }}
                  className="btn btn--primary !min-h-[42px] !px-4 !text-[12px]"
                  aria-expanded={showNoticeForm}
                >
                  {showNoticeForm ? <X className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
                  {showNoticeForm ? 'Cancel' : 'Add notice'}
                </button>
              }
            >
              {showNoticeForm && (
                <FormPanel>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Title *" htmlFor="notice-title">
                      <input
                        id="notice-title"
                        value={noticeForm.title}
                        onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                        placeholder="Notice title"
                        className={compactField}
                      />
                    </Field>
                    <Field label="Date *" htmlFor="notice-date">
                      <input
                        id="notice-date"
                        value={noticeForm.date}
                        onChange={(e) => setNoticeForm({ ...noticeForm, date: e.target.value })}
                        type="date"
                        className={compactField}
                      />
                    </Field>
                  </div>
                  <div className="mt-4">
                    <Field label="Content *" htmlFor="notice-content">
                      <textarea
                        id="notice-content"
                        value={noticeForm.content}
                        onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
                        placeholder="Write the notice content"
                        rows={3}
                        className={`${compactField} min-h-[96px] resize-y`}
                      />
                    </Field>
                  </div>
                  <div className="mt-4 flex flex-wrap items-end gap-4">
                    <div className="w-full sm:w-56">
                      <Field label="Category" htmlFor="notice-category">
                        <select
                          id="notice-category"
                          value={noticeForm.category}
                          onChange={(e) => setNoticeForm({ ...noticeForm, category: e.target.value })}
                          className={compactField}
                        >
                          {['General', 'Academic', 'Admission', 'Event', 'Exam'].map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </Field>
                    </div>
                    <button type="button" onClick={handleAddNotice} className="btn btn--primary !min-h-[46px] !px-5 !text-[12px]">
                      {editNoticeId ? <><Check className="h-4 w-4" aria-hidden="true" /> Update notice</> : <><Plus className="h-4 w-4" aria-hidden="true" /> Publish notice</>}
                    </button>
                  </div>
                </FormPanel>
              )}

              {notices.length === 0 ? (
                <EmptyState icon={Bell} title="No notices found" description="Publish the first notice to keep the campus informed." />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] text-left">
                    <thead className="border-y border-rule bg-main-bg/60">
                      <tr>
                        {['Title', 'Date', 'Category', 'Actions'].map((heading) => (
                          <th key={heading} className={thClass}>{heading}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rule">
                      {notices.map((n) => (
                        <tr key={n.id} className="transition-colors hover:bg-main-bg/45">
                          <td className={`${tdClass} text-[13px] font-semibold text-primary-text`}>{n.title}</td>
                          <td className={`${tdClass} text-[12.5px] text-secondary-text`}>{n.date}</td>
                          <td className={tdClass}>
                            <span className="inline-flex rounded-full border border-rule bg-main-bg px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-primary-text-2">
                              {n.category}
                            </span>
                          </td>
                          <td className={tdClass}>
                            <RowActions
                              onEdit={() => handleEditNotice(n)}
                              onDelete={() => handleDeleteNotice(n.id)}
                              editLabel={`Edit notice: ${n.title}`}
                              deleteLabel={`Delete notice: ${n.title}`}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </SectionShell>
          )}

          {/* ===== FACULTY ===== */}
          {activeTab === 'faculty' && (
            <SectionShell
              title="All faculty"
              description={`${faculty.length} ${faculty.length === 1 ? 'member' : 'members'} on record`}
              action={
                <button
                  type="button"
                  onClick={() => {
                    setShowFacultyForm(!showFacultyForm);
                    setEditFacultyId(null);
                    setFacultyForm({ name: '', photoUrl: '', designation: '', qualification: '', subject: '', bio: '', category: 'teacher' });
                  }}
                  className="btn btn--primary !min-h-[42px] !px-4 !text-[12px]"
                  aria-expanded={showFacultyForm}
                >
                  {showFacultyForm ? <X className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
                  {showFacultyForm ? 'Cancel' : 'Add faculty'}
                </button>
              }
            >
              {showFacultyForm && (
                <FormPanel>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Field label="Name *" htmlFor="faculty-name">
                      <input id="faculty-name" value={facultyForm.name} onChange={(e) => setFacultyForm({ ...facultyForm, name: e.target.value })} placeholder="Full name" className={compactField} />
                    </Field>
                    <Field label="Photo URL" htmlFor="faculty-photo">
                      <input id="faculty-photo" value={facultyForm.photoUrl} onChange={(e) => setFacultyForm({ ...facultyForm, photoUrl: e.target.value })} placeholder="https://…" className={compactField} />
                    </Field>
                    <Field label="Designation" htmlFor="faculty-designation">
                      <input id="faculty-designation" value={facultyForm.designation} onChange={(e) => setFacultyForm({ ...facultyForm, designation: e.target.value })} placeholder="e.g. Professor" className={compactField} />
                    </Field>
                    <Field label="Qualification" htmlFor="faculty-qualification">
                      <input id="faculty-qualification" value={facultyForm.qualification} onChange={(e) => setFacultyForm({ ...facultyForm, qualification: e.target.value })} placeholder="e.g. Ph.D." className={compactField} />
                    </Field>
                    <Field label="Subject" htmlFor="faculty-subject">
                      <input id="faculty-subject" value={facultyForm.subject} onChange={(e) => setFacultyForm({ ...facultyForm, subject: e.target.value })} placeholder="e.g. Physics" className={compactField} />
                    </Field>
                    <Field label="Category" htmlFor="faculty-category">
                      <select
                        id="faculty-category"
                        value={facultyForm.category}
                        onChange={(e) => setFacultyForm({ ...facultyForm, category: e.target.value as FacultyMember['category'] })}
                        className={`${compactField} capitalize`}
                      >
                        {['principal', 'vice-principal', 'head', 'teacher', 'admin'].map((c) => (
                          <option key={c} value={c}>{c.replace('-', ' ')}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <div className="mt-4">
                    <Field label="Bio" htmlFor="faculty-bio">
                      <textarea id="faculty-bio" value={facultyForm.bio} onChange={(e) => setFacultyForm({ ...facultyForm, bio: e.target.value })} placeholder="Short professional biography" rows={2} className={`${compactField} min-h-[84px] resize-y`} />
                    </Field>
                  </div>
                  <button type="button" onClick={handleAddFaculty} className="btn btn--primary mt-4 !min-h-[46px] !px-5 !text-[12px]">
                    {editFacultyId ? <><Check className="h-4 w-4" aria-hidden="true" /> Update member</> : <><Plus className="h-4 w-4" aria-hidden="true" /> Add member</>}
                  </button>
                </FormPanel>
              )}

              {faculty.length === 0 ? (
                <EmptyState icon={Users} title="No faculty members found" description="Add the first faculty profile to build the directory." />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[820px] text-left">
                    <thead className="border-y border-rule bg-main-bg/60">
                      <tr>
                        {['Name', 'Designation', 'Qualification', 'Category', 'Actions'].map((heading) => (
                          <th key={heading} className={thClass}>{heading}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rule">
                      {faculty.map((f) => (
                        <tr key={f.id} className="transition-colors hover:bg-main-bg/45">
                          <td className={tdClass}>
                            <div className="flex items-center gap-3">
                              {f.photoUrl ? (
                                <img src={f.photoUrl} alt="" className="h-9 w-9 rounded-xl border border-rule object-cover object-top" />
                              ) : (
                                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-soft-coral font-serif text-[13px] text-coral-orange ring-1 ring-inset ring-coral-orange/10">
                                  {f.name.charAt(0)}
                                </span>
                              )}
                              <span className="text-[13px] font-semibold text-primary-text">{f.name}</span>
                            </div>
                          </td>
                          <td className={`${tdClass} text-[12.5px] text-primary-text-2`}>{f.designation}</td>
                          <td className={`${tdClass} text-[12.5px] text-primary-text-2`}>{f.qualification}</td>
                          <td className={tdClass}>
                            <span className="inline-flex rounded-full border border-rule bg-main-bg px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-primary-text-2">
                              {f.category.replace('-', ' ')}
                            </span>
                          </td>
                          <td className={tdClass}>
                            <RowActions
                              onEdit={() => handleEditFaculty(f)}
                              onDelete={() => handleDeleteFaculty(f.id)}
                              editLabel={`Edit faculty: ${f.name}`}
                              deleteLabel={`Delete faculty: ${f.name}`}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </SectionShell>
          )}

          {/* ===== GALLERY ===== */}
          {activeTab === 'gallery' && (
            <SectionShell
              title="Gallery images"
              description={`${gallery.length} ${gallery.length === 1 ? 'image' : 'images'} in the library`}
              action={
                <button
                  type="button"
                  onClick={() => setShowGalleryForm(!showGalleryForm)}
                  className="btn btn--primary !min-h-[42px] !px-4 !text-[12px]"
                  aria-expanded={showGalleryForm}
                >
                  {showGalleryForm ? <X className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
                  {showGalleryForm ? 'Cancel' : 'Add image'}
                </button>
              }
            >
              {showGalleryForm && (
                <FormPanel>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Field label="Image URL *" htmlFor="gallery-url">
                      <input id="gallery-url" value={galleryForm.url} onChange={(e) => setGalleryForm({ ...galleryForm, url: e.target.value })} placeholder="https://…" className={compactField} />
                    </Field>
                    <Field label="Caption" htmlFor="gallery-caption">
                      <input id="gallery-caption" value={galleryForm.caption} onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })} placeholder="Describe the moment" className={compactField} />
                    </Field>
                    <Field label="Category" htmlFor="gallery-category">
                      <select id="gallery-category" value={galleryForm.category} onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })} className={compactField}>
                        {['Campus', 'Events', 'Sports', 'Other'].map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                  <button type="button" onClick={handleAddGallery} className="btn btn--primary mt-4 !min-h-[46px] !px-5 !text-[12px]">
                    <Plus className="h-4 w-4" aria-hidden="true" /> Add image
                  </button>
                </FormPanel>
              )}

              {gallery.length === 0 ? (
                <EmptyState icon={Image} title="No gallery images found" description="Add the first photograph to bring the campus story to life." />
              ) : (
                <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3 xl:grid-cols-4">
                  {gallery.map((img) => (
                    <figure key={img.id} className="group overflow-hidden rounded-2xl border border-rule bg-white-surface transition-shadow hover:shadow-[0_16px_34px_-26px_rgba(17,17,17,0.35)]">
                      <div className="relative aspect-[4/3] overflow-hidden bg-main-bg">
                        <img
                          src={img.url}
                          alt={img.caption || 'Gallery image'}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-2.5">
                          <span className="rounded-full border border-white-surface/30 bg-ink/45 px-2 py-1 font-mono text-[8.5px] uppercase tracking-[0.1em] text-white-surface backdrop-blur-sm">
                            {img.category}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteGallery(img.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-xl bg-white-surface/90 text-coral-orange shadow-sm backdrop-blur-sm transition-colors hover:bg-coral-orange hover:text-white-surface"
                            aria-label={`Delete image: ${img.caption || 'untitled'}`}
                          >
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <figcaption className="p-3.5">
                        <p className="line-clamp-1 text-[12.5px] font-semibold text-primary-text">
                          {img.caption || 'Untitled image'}
                        </p>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </SectionShell>
          )}

          {/* ===== PROGRAMS ===== */}
          {activeTab === 'programs' && (
            <SectionShell
              title="All programs"
              description={`${programs.length} ${programs.length === 1 ? 'program' : 'programs'} available · edit records inline`}
            >
              {programs.length === 0 ? (
                <EmptyState icon={BookOpen} title="No programs found" description="Programs seeded in the CMS will be listed here." />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[980px] text-left">
                    <thead className="border-y border-rule bg-main-bg/60">
                      <tr>
                        {['Program', 'Duration', 'Eligibility', 'Level', 'Category', 'Actions'].map((heading) => (
                          <th key={heading} className={thClass}>{heading}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rule">
                      {programs.map((p) => (
                        <tr key={p.id} className="transition-colors hover:bg-main-bg/45">
                          {editProgramId === p.id ? (
                            <>
                              <td className={tdClass}>
                                <input aria-label="Program name" value={programEditData.name} onChange={(e) => setProgramEditData({ ...programEditData, name: e.target.value })} className={`${compactField} !min-h-[38px] !w-40 !rounded-lg !px-2.5 !py-1.5 !text-[12px]`} />
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
                                  <button type="button" onClick={() => handleSaveProgram(p.id)} className="flex h-8 w-8 items-center justify-center rounded-lg text-coral-orange ring-1 ring-inset ring-coral-orange/15 transition-colors hover:bg-soft-coral" aria-label={`Save program: ${p.name}`}>
                                    <Check className="h-4 w-4" aria-hidden="true" />
                                  </button>
                                  <button type="button" onClick={() => setEditProgramId(null)} className="flex h-8 w-8 items-center justify-center rounded-lg text-secondary-text ring-1 ring-inset ring-rule transition-colors hover:bg-main-bg hover:text-primary-text" aria-label="Cancel editing">
                                    <X className="h-4 w-4" aria-hidden="true" />
                                  </button>
                                </div>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className={`${tdClass} text-[13px] font-semibold text-primary-text`}>{p.name}</td>
                              <td className={`${tdClass} text-[12.5px] text-primary-text-2`}>{p.duration}</td>
                              <td className={`${tdClass} max-w-[240px] text-[12.5px] text-primary-text-2`}>{p.eligibility}</td>
                              <td className={tdClass}>
                                <span className="inline-flex rounded-full bg-soft-coral px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-coral-orange ring-1 ring-inset ring-coral-orange/10">
                                  {p.level}
                                </span>
                              </td>
                              <td className={tdClass}>
                                <span className="inline-flex rounded-full border border-rule bg-main-bg px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-primary-text-2">
                                  {p.category}
                                </span>
                              </td>
                              <td className={tdClass}>
                                <button type="button" onClick={() => handleEditProgram(p)} className="flex h-8 w-8 items-center justify-center rounded-lg text-secondary-text ring-1 ring-inset ring-transparent transition-colors hover:bg-main-bg hover:text-coral-orange hover:ring-rule" aria-label={`Edit program: ${p.name}`}>
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
            </SectionShell>
          )}

          {/* ===== INQUIRIES ===== */}
          {activeTab === 'inquiries' && (
            <SectionShell
              title="All inquiries"
              description={`${filteredInquiries.length} of ${inquiries.length} shown`}
              action={
                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                  <div className="relative w-full sm:w-72">
                    <label htmlFor="inquiry-search" className="visually-hidden">Search inquiries by student name</label>
                    <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-text" aria-hidden="true" />
                    <input
                      id="inquiry-search"
                      value={inquirySearch}
                      onChange={(e) => setInquirySearch(e.target.value)}
                      className={`${compactField} !min-h-[42px] pl-10`}
                      placeholder="Search by name…"
                    />
                  </div>
                  {inquirySearch && (
                    <button type="button" onClick={() => setInquirySearch('')} className="btn btn--outline !min-h-[42px] !px-3.5 !text-[12px]">
                      Clear
                    </button>
                  )}
                </div>
              }
            >
              {filteredInquiries.length === 0 ? (
                <EmptyState icon={MessageSquare} title="No inquiries found" description="Try a different name, or wait for new submissions to arrive." />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1000px] text-left">
                    <thead className="border-y border-rule bg-main-bg/60">
                      <tr>
                        {['Name', 'Email', 'Phone', 'Program', 'Date', 'Status', 'Actions'].map((heading) => (
                          <th key={heading} className={thClass}>{heading}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rule">
                      {filteredInquiries.map((inq) => (
                        <tr key={inq.id} className="transition-colors hover:bg-main-bg/45">
                          <td className={`${tdClass} text-[13px] font-semibold text-primary-text`}>{inq.studentName}</td>
                          <td className={`${tdClass} text-[12.5px] text-primary-text-2`}>{inq.email}</td>
                          <td className={`${tdClass} text-[12.5px] text-primary-text-2`}>{inq.phone}</td>
                          <td className={`${tdClass} text-[12.5px] text-primary-text-2`}>{inq.programOfInterest}</td>
                          <td className={`${tdClass} text-[12px] text-secondary-text`}>
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                              {new Date(inq.submittedAt).toLocaleDateString()}
                            </span>
                          </td>
                          <td className={tdClass}>
                            <select
                              value={inq.status}
                              onChange={(e) => handleStatusChange(inq.id, e.target.value as AdmissionInquiry['status'])}
                              aria-label={`Status for ${inq.studentName}`}
                              className={cn('cursor-pointer rounded-full border-0 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.05em] outline-none', statusStyles[inq.status])}
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
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-secondary-text ring-1 ring-inset ring-transparent transition-colors hover:bg-coral-orange/[0.06] hover:text-coral-orange hover:ring-coral-orange/15"
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
            </SectionShell>
          )}

          {/* ===== CALENDAR ===== */}
          {activeTab === 'calendar' && (
            <SectionShell
              title="Calendar events"
              description={`${events.length} ${events.length === 1 ? 'event' : 'events'} scheduled`}
              action={
                <button
                  type="button"
                  onClick={() => setShowEventForm(!showEventForm)}
                  className="btn btn--primary !min-h-[42px] !px-4 !text-[12px]"
                  aria-expanded={showEventForm}
                >
                  {showEventForm ? <X className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
                  {showEventForm ? 'Cancel' : 'Add event'}
                </button>
              }
            >
              {showEventForm && (
                <FormPanel>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Field label="Event title *" htmlFor="event-title">
                      <input id="event-title" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} placeholder="Event name" className={compactField} />
                    </Field>
                    <Field label="Date" htmlFor="event-date">
                      <input id="event-date" value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} type="date" className={compactField} />
                    </Field>
                    <Field label="Type" htmlFor="event-type">
                      <select id="event-type" value={eventForm.type} onChange={(e) => setEventForm({ ...eventForm, type: e.target.value as CalendarEvent['type'] })} className={compactField}>
                        <option value="academic">Academic</option>
                        <option value="holiday">Holiday</option>
                        <option value="event">Event</option>
                      </select>
                    </Field>
                  </div>
                  <button type="button" onClick={handleAddEvent} className="btn btn--primary mt-4 !min-h-[46px] !px-5 !text-[12px]">
                    <Plus className="h-4 w-4" aria-hidden="true" /> Add event
                  </button>
                </FormPanel>
              )}

              {events.length === 0 ? (
                <EmptyState icon={Calendar} title="No events found" description="Add academic dates, holidays and campus events to the calendar." />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[620px] text-left">
                    <thead className="border-y border-rule bg-main-bg/60">
                      <tr>
                        {['Title', 'Date', 'Type', 'Actions'].map((heading) => (
                          <th key={heading} className={thClass}>{heading}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rule">
                      {events.map((event) => (
                        <tr key={event.id} className="transition-colors hover:bg-main-bg/45">
                          <td className={`${tdClass} text-[13px] font-semibold text-primary-text`}>{event.title}</td>
                          <td className={`${tdClass} text-[12.5px] text-secondary-text`}>{event.date}</td>
                          <td className={tdClass}>
                            <span className={cn('inline-flex rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em]', eventStyles[event.type])}>
                              {event.type}
                            </span>
                          </td>
                          <td className={tdClass}>
                            <button
                              type="button"
                              onClick={() => handleDeleteEvent(event.id)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-secondary-text ring-1 ring-inset ring-transparent transition-colors hover:bg-coral-orange/[0.06] hover:text-coral-orange hover:ring-coral-orange/15"
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
            </SectionShell>
          )}

          {/* ===== CONTACT INFO ===== */}
          {activeTab === 'contact' && (
            <SectionShell
              title="Contact information"
              description="Update the public contact details shown across the website."
              className="max-w-4xl"
            >
              {contact ? (
                <div className="space-y-5 px-5 py-6 sm:px-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Phone" htmlFor="contact-phone">
                      <input id="contact-phone" value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} className={compactField} />
                    </Field>
                    <Field label="Email" htmlFor="contact-email">
                      <input id="contact-email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} className={compactField} />
                    </Field>
                  </div>
                  <Field label="Address" htmlFor="contact-address">
                    <textarea id="contact-address" value={contactForm.address} onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })} rows={2} className={`${compactField} min-h-[84px] resize-y`} />
                  </Field>
                  <Field label="Working hours" htmlFor="contact-hours">
                    <input id="contact-hours" value={contactForm.workingHours} onChange={(e) => setContactForm({ ...contactForm, workingHours: e.target.value })} className={compactField} />
                  </Field>

                  <div className="rounded-2xl border border-rule bg-main-bg/45 p-4 sm:p-5">
                    <h3 className="font-serif text-[18px] text-primary-text">Social links</h3>
                    <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-secondary-text">
                      Leave blank to hide a platform
                    </p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      {(['facebook', 'instagram', 'youtube', 'twitter'] as const).map((platform) => (
                        <Field key={platform} label={platform} htmlFor={`contact-${platform}`}>
                          <input
                            id={`contact-${platform}`}
                            value={contactForm.socialLinks[platform]}
                            onChange={(e) => setContactForm({ ...contactForm, socialLinks: { ...contactForm.socialLinks, [platform]: e.target.value } })}
                            placeholder="https://…"
                            className={`${compactField} capitalize`}
                          />
                        </Field>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-5">
                    <p className="max-w-[42ch] text-[12px] leading-relaxed text-secondary-text">
                      <AlertCircle className="mr-1.5 inline h-3.5 w-3.5 -translate-y-px text-coral-orange/70" aria-hidden="true" />
                      Changes are saved to this browser&rsquo;s local CMS store and appear on the website.
                    </p>
                    <button type="button" onClick={handleSaveContact} className="btn btn--primary !min-h-[46px] !px-5 !text-[12px]">
                      <Check className="h-4 w-4" aria-hidden="true" /> Save contact info
                    </button>
                  </div>
                </div>
              ) : (
                <EmptyState icon={Phone} title="Contact details unavailable" description="Seeded contact information will appear here once loaded." />
              )}
            </SectionShell>
          )}
        </main>

        <footer className="border-t border-rule px-4 py-4 sm:px-6 lg:px-8">
          <p className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-secondary-text">
            St. Augustine&rsquo;s College · Admin dashboard · Local CMS
          </p>
        </footer>
      </div>
    </div>
  );
}

function SectionShell({
  title,
  description,
  action,
  children,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('overflow-hidden rounded-[24px] border border-rule bg-white-surface shadow-[0_1px_0_rgba(17,17,17,0.02)]', className)}>
      <div className="flex flex-col gap-4 border-b border-rule px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className="font-serif text-[24px] tracking-[-0.02em] text-primary-text">{title}</h2>
          {description && <p className="mt-1 text-[12.5px] text-secondary-text">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function FormPanel({ children }: { children: ReactNode }) {
  return <div className="border-b border-rule bg-main-bg/45 px-5 py-5 sm:px-6">{children}</div>;
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-secondary-text">
        {label}
      </label>
      {children}
    </div>
  );
}

function RowActions({
  onEdit,
  onDelete,
  editLabel,
  deleteLabel,
}: {
  onEdit: () => void;
  onDelete: () => void;
  editLabel: string;
  deleteLabel: string;
}) {
  return (
    <div className="flex gap-1.5">
      <button
        type="button"
        onClick={onEdit}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-secondary-text ring-1 ring-inset ring-transparent transition-colors hover:bg-main-bg hover:text-coral-orange hover:ring-rule"
        aria-label={editLabel}
      >
        <Edit className="h-4 w-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-secondary-text ring-1 ring-inset ring-transparent transition-colors hover:bg-coral-orange/[0.06] hover:text-coral-orange hover:ring-coral-orange/15"
        aria-label={deleteLabel}
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

function Panel({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-[24px] border border-rule bg-white-surface shadow-[0_1px_0_rgba(17,17,17,0.02)]">
      <div className="flex items-start justify-between gap-4 border-b border-rule px-5 py-4 sm:px-6">
        <div>
          <h3 className="font-serif text-[20px] tracking-[-0.02em] text-primary-text">{title}</h3>
          {description && <p className="mt-1 text-[12px] text-secondary-text">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function EmptyChart({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <SlidersHorizontal className="h-5 w-5 text-coral-orange/60" aria-hidden="true" />
      <p className="mt-3 max-w-[38ch] text-[12.5px] leading-relaxed text-secondary-text">{message}</p>
    </div>
  );
}

function MiniBarChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className="px-5 py-5 sm:px-6">
      <div className="flex h-[180px] items-end gap-2 sm:gap-3">
        {data.map((d) => {
          const h = Math.max(6, Math.round((d.value / max) * 100));
          return (
            <div key={d.label} className="group flex min-w-0 flex-1 flex-col items-center gap-2">
              <span className="rounded-md bg-main-bg px-1.5 py-0.5 font-mono text-[9px] text-secondary-text opacity-0 transition-opacity group-hover:opacity-100">
                {d.value}
              </span>
              <div className="flex h-[140px] w-full items-end rounded-xl bg-main-bg p-1 ring-1 ring-inset ring-rule/60">
                <div
                  className="w-full rounded-lg bg-coral-orange transition-all duration-500 group-hover:bg-[#e44a2e]"
                  style={{ height: `${h}%` }}
                  title={`${d.label}: ${d.value}`}
                />
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-secondary-text">{d.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatusBreakdown({
  data,
  total,
}: {
  data: { key: string; label: string; value: number; color: string }[];
  total: number;
}) {
  return (
    <div className="px-5 py-5 sm:px-6">
      <div className="flex h-3 overflow-hidden rounded-full bg-main-bg ring-1 ring-inset ring-rule/60">
        {data.map((d) => (
          <div
            key={d.key}
            style={{ width: `${total ? (d.value / total) * 100 : 0}%`, backgroundColor: d.color }}
            title={`${d.label}: ${d.value}`}
          />
        ))}
      </div>
      <ul className="mt-4 space-y-2.5">
        {data.map((d) => (
          <li key={d.key} className="flex items-center justify-between gap-3 text-[12.5px]">
            <span className="flex items-center gap-2 text-primary-text-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} aria-hidden="true" />
              {d.label}
            </span>
            <span className="font-semibold tabular-nums text-primary-text">
              {d.value} <span className="font-normal text-secondary-text">({total ? Math.round((d.value / total) * 100) : 0}%)</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HorizontalBars({ data, colors }: { data: { label: string; value: number }[]; colors: string[] }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <ul className="space-y-3 px-5 py-5 sm:px-6">
      {data.map((d, i) => (
        <li key={d.label}>
          <div className="mb-1.5 flex items-center justify-between gap-3 text-[12.5px]">
            <span className="truncate font-medium text-primary-text-2">{d.label}</span>
            <span className="font-semibold tabular-nums text-primary-text">{d.value}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-main-bg ring-1 ring-inset ring-rule/60">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(d.value / max) * 100}%`, backgroundColor: colors[i % colors.length] }}
            />
          </div>
        </li>
      ))}
    </ul>
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
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-soft-coral text-coral-orange ring-1 ring-inset ring-coral-orange/10">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-serif text-[22px] tracking-[-0.02em] text-primary-text">{title}</h3>
      <p className="mt-1.5 max-w-[42ch] text-[12.5px] leading-relaxed text-secondary-text">{description}</p>
    </div>
  );
}
