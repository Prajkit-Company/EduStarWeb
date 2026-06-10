import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Bell, Users, Image, BookOpen, MessageSquare,
  Calendar, Phone, LogOut, Eye, Edit, Trash2, Plus, TrendingUp,
  Search, X, Check, Clock, GraduationCap, UserCheck
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
  new: 'bg-blue-100 text-blue-700',
  replied: 'bg-green-100 text-green-700',
  pending: 'bg-amber-100 text-amber-700',
};

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'notices', label: 'Notices', icon: Bell },
  { id: 'faculty', label: 'Faculty', icon: Users },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'programs', label: 'Programs', icon: BookOpen },
  { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'contact', label: 'Contact Info', icon: Phone },
];

export function AdminDashboard({ onLogout, onBack }: Props) {
  const [activeTab, setActiveTab] = useState('dashboard');

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

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0c2340] text-white fixed h-full flex flex-col z-10">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#c9a962] rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-serif font-semibold text-sm">Admin Panel</h2>
              <p className="text-xs text-gray-400">St. Augustine's</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm ${
                activeTab === tab.id ? 'bg-[#c9a962] text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5 shrink-0" />
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-1">
          <button onClick={onBack} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-lg transition-all text-sm">
            <Eye className="w-5 h-5" /><span>View Website</span>
          </button>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-lg transition-all text-sm">
            <LogOut className="w-5 h-5" /><span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-serif font-semibold text-[#0c2340] capitalize">
              {tabs.find((t) => t.id === activeTab)?.label || activeTab}
            </h1>
            <p className="text-gray-500 text-sm mt-1">Administrator Portal</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c9a962] w-64" placeholder="Search..." />
            </div>
            <div className="w-10 h-10 bg-[#0c2340] rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-semibold">A</span>
            </div>
          </div>
        </div>

        {/* ===== DASHBOARD ===== */}
        {activeTab === 'dashboard' && (
          <>
            <div className="grid grid-cols-4 gap-6 mb-8">
              {[
                { title: 'Total Notices', value: notices.length.toString(), change: '-', icon: Bell, color: 'bg-blue-600' },
                { title: 'Faculty Members', value: faculty.length.toString(), change: '-', icon: Users, color: 'bg-purple-600' },
                { title: 'Gallery Images', value: gallery.length.toString(), change: '-', icon: Image, color: 'bg-emerald-600' },
                { title: 'New Inquiries', value: inquiries.filter((i) => i.status === 'new').length.toString(), change: '-', icon: MessageSquare, color: 'bg-amber-600' },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center`}>
                      <s.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-emerald-600 text-sm font-medium flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />{s.change}
                    </span>
                  </div>
                  <div className="text-2xl font-serif font-bold text-[#0c2340]">{s.value}</div>
                  <div className="text-gray-500 text-sm mt-1">{s.title}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-[#0c2340]">Recent Inquiries</h3>
                  <button onClick={() => setActiveTab('inquiries')} className="text-[#c9a962] text-sm hover:underline">View all</button>
                </div>
                {inquiries.length === 0 ? (
                  <p className="text-gray-400 text-sm">No inquiries yet.</p>
                ) : (
                  <div className="space-y-4">
                    {inquiries.slice(0, 5).map((q) => (
                      <div key={q.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                        <div>
                          <p className="font-medium text-[#0c2340] text-sm">{q.studentName}</p>
                          <p className="text-gray-400 text-xs mt-0.5">{q.programOfInterest} &middot; {new Date(q.submittedAt).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[q.status]}`}>{q.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-[#0c2340] mb-6">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Add Notice', icon: Bell, color: 'bg-blue-50 text-blue-600', tab: 'notices' },
                    { label: 'Add Faculty', icon: UserCheck, color: 'bg-purple-50 text-purple-600', tab: 'faculty' },
                    { label: 'Add Event', icon: Calendar, color: 'bg-emerald-50 text-emerald-600', tab: 'calendar' },
                    { label: 'View Inquiries', icon: MessageSquare, color: 'bg-amber-50 text-amber-600', tab: 'inquiries' },
                  ].map((a, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab(a.tab)}
                      className={`flex items-center gap-3 p-4 rounded-xl ${a.color} hover:opacity-80 transition-opacity text-sm font-medium`}
                    >
                      <a.icon className="w-5 h-5" />{a.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ===== NOTICES ===== */}
        {activeTab === 'notices' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="font-semibold text-[#0c2340]">All Notices</h3>
              <button
                onClick={() => { setShowNoticeForm(!showNoticeForm); setEditNoticeId(null); setNoticeForm({ title: '', content: '', date: '', category: 'General' }); }}
                className="flex items-center gap-2 px-4 py-2 bg-[#0c2340] text-white rounded-lg text-sm hover:bg-[#1a3a5c] transition-colors"
              >
                <Plus className="w-4 h-4" /> {showNoticeForm ? 'Cancel' : 'Add Notice'}
              </button>
            </div>

            {showNoticeForm && (
              <div className="p-6 border-b border-gray-100 bg-gray-50">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input value={noticeForm.title} onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })} placeholder="Title *" className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c9a962]" />
                  <input value={noticeForm.date} onChange={(e) => setNoticeForm({ ...noticeForm, date: e.target.value })} type="date" className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c9a962]" />
                </div>
                <textarea value={noticeForm.content} onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })} placeholder="Content *" rows={3} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c9a962] mb-4" />
                <div className="flex items-center gap-4">
                  <select value={noticeForm.category} onChange={(e) => setNoticeForm({ ...noticeForm, category: e.target.value })} className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c9a962]">
                    {['General', 'Academic', 'Admission', 'Event', 'Exam'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <button onClick={handleAddNotice} className="flex items-center gap-2 px-4 py-2.5 bg-[#c9a962] text-white rounded-lg text-sm font-medium hover:bg-[#b8984e] transition-colors">
                    {editNoticeId ? <><Check className="w-4 h-4" /> Update</> : <><Plus className="w-4 h-4" /> Add</>}
                  </button>
                </div>
              </div>
            )}

            {notices.length === 0 ? (
              <div className="p-12 text-center text-gray-400">No notices found.</div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {['Title', 'Date', 'Category', 'Actions'].map((h) => (
                      <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {notices.map((n) => (
                    <tr key={n.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-[#0c2340] text-sm">{n.title}</td>
                      <td className="px-6 py-4 text-gray-500 text-sm">{n.date}</td>
                      <td className="px-6 py-4"><span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">{n.category}</span></td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleEditNotice(n)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => handleDeleteNotice(n.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ===== FACULTY ===== */}
        {activeTab === 'faculty' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="font-semibold text-[#0c2340]">All Faculty</h3>
              <button
                onClick={() => { setShowFacultyForm(!showFacultyForm); setEditFacultyId(null); setFacultyForm({ name: '', photoUrl: '', designation: '', qualification: '', subject: '', bio: '', category: 'teacher' }); }}
                className="flex items-center gap-2 px-4 py-2 bg-[#0c2340] text-white rounded-lg text-sm hover:bg-[#1a3a5c] transition-colors"
              >
                <Plus className="w-4 h-4" /> {showFacultyForm ? 'Cancel' : 'Add Faculty'}
              </button>
            </div>

            {showFacultyForm && (
              <div className="p-6 border-b border-gray-100 bg-gray-50">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <input value={facultyForm.name} onChange={(e) => setFacultyForm({ ...facultyForm, name: e.target.value })} placeholder="Name *" className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c9a962]" />
                  <input value={facultyForm.photoUrl} onChange={(e) => setFacultyForm({ ...facultyForm, photoUrl: e.target.value })} placeholder="Photo URL" className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c9a962]" />
                  <input value={facultyForm.designation} onChange={(e) => setFacultyForm({ ...facultyForm, designation: e.target.value })} placeholder="Designation" className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c9a962]" />
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <input value={facultyForm.qualification} onChange={(e) => setFacultyForm({ ...facultyForm, qualification: e.target.value })} placeholder="Qualification" className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c9a962]" />
                  <input value={facultyForm.subject} onChange={(e) => setFacultyForm({ ...facultyForm, subject: e.target.value })} placeholder="Subject" className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c9a962]" />
                  <select value={facultyForm.category} onChange={(e) => setFacultyForm({ ...facultyForm, category: e.target.value as FacultyMember['category'] })} className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c9a962]">
                    {['principal', 'vice-principal', 'head', 'teacher', 'admin'].map((c) => (
                      <option key={c} value={c}>{c.replace('-', ' ')}</option>
                    ))}
                  </select>
                </div>
                <textarea value={facultyForm.bio} onChange={(e) => setFacultyForm({ ...facultyForm, bio: e.target.value })} placeholder="Bio" rows={2} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c9a962] mb-4" />
                <button onClick={handleAddFaculty} className="flex items-center gap-2 px-4 py-2.5 bg-[#c9a962] text-white rounded-lg text-sm font-medium hover:bg-[#b8984e] transition-colors">
                  {editFacultyId ? <><Check className="w-4 h-4" /> Update</> : <><Plus className="w-4 h-4" /> Add</>}
                </button>
              </div>
            )}

            {faculty.length === 0 ? (
              <div className="p-12 text-center text-gray-400">No faculty members found.</div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {['Name', 'Designation', 'Qualification', 'Category', 'Actions'].map((h) => (
                      <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {faculty.map((f) => (
                    <tr key={f.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img src={f.photoUrl} alt={f.name} className="w-8 h-8 rounded-full object-cover" />
                        <span className="font-medium text-[#0c2340] text-sm">{f.name}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">{f.designation}</td>
                      <td className="px-6 py-4 text-gray-500 text-sm">{f.qualification}</td>
                      <td className="px-6 py-4"><span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium capitalize">{f.category}</span></td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleEditFaculty(f)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => handleDeleteFaculty(f.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ===== GALLERY ===== */}
        {activeTab === 'gallery' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="font-semibold text-[#0c2340]">Gallery Images</h3>
              <button
                onClick={() => setShowGalleryForm(!showGalleryForm)}
                className="flex items-center gap-2 px-4 py-2 bg-[#0c2340] text-white rounded-lg text-sm hover:bg-[#1a3a5c] transition-colors"
              >
                <Plus className="w-4 h-4" /> {showGalleryForm ? 'Cancel' : 'Add Image'}
              </button>
            </div>

            {showGalleryForm && (
              <div className="p-6 border-b border-gray-100 bg-gray-50">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <input value={galleryForm.url} onChange={(e) => setGalleryForm({ ...galleryForm, url: e.target.value })} placeholder="Image URL *" className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c9a962]" />
                  <input value={galleryForm.caption} onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })} placeholder="Caption" className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c9a962]" />
                  <select value={galleryForm.category} onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })} className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c9a962]">
                    {['Campus', 'Events', 'Sports', 'Other'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <button onClick={handleAddGallery} className="flex items-center gap-2 px-4 py-2.5 bg-[#c9a962] text-white rounded-lg text-sm font-medium hover:bg-[#b8984e] transition-colors">
                  <Plus className="w-4 h-4" /> Add Image
                </button>
              </div>
            )}

            {gallery.length === 0 ? (
              <div className="p-12 text-center text-gray-400">No gallery images found.</div>
            ) : (
              <div className="p-6 grid grid-cols-4 gap-4">
                {gallery.map((img) => (
                  <div key={img.id} className="group relative rounded-lg overflow-hidden bg-gray-100 aspect-video">
                    <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex flex-col items-center justify-center gap-2">
                      <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity text-center px-2">{img.caption}</p>
                      <span className="text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">{img.category}</span>
                      <button onClick={() => handleDeleteGallery(img.id)} className="p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== PROGRAMS ===== */}
        {activeTab === 'programs' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="font-semibold text-[#0c2340]">All Programs</h3>
            </div>
            {programs.length === 0 ? (
              <div className="p-12 text-center text-gray-400">No programs found.</div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {['Program', 'Duration', 'Eligibility', 'Level', 'Category', 'Actions'].map((h) => (
                      <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {programs.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      {editProgramId === p.id ? (
                        <>
                          <td className="px-6 py-4">
                            <input value={programEditData.name} onChange={(e) => setProgramEditData({ ...programEditData, name: e.target.value })} className="w-32 px-2 py-1 border border-gray-200 rounded text-sm" />
                          </td>
                          <td className="px-6 py-4">
                            <input value={programEditData.duration} onChange={(e) => setProgramEditData({ ...programEditData, duration: e.target.value })} className="w-24 px-2 py-1 border border-gray-200 rounded text-sm" />
                          </td>
                          <td className="px-6 py-4">
                            <input value={programEditData.eligibility} onChange={(e) => setProgramEditData({ ...programEditData, eligibility: e.target.value })} className="w-40 px-2 py-1 border border-gray-200 rounded text-sm" />
                          </td>
                          <td className="px-6 py-4">
                            <input value={programEditData.level} onChange={(e) => setProgramEditData({ ...programEditData, level: e.target.value })} className="w-28 px-2 py-1 border border-gray-200 rounded text-sm" />
                          </td>
                          <td className="px-6 py-4">
                            <input value={programEditData.category} onChange={(e) => setProgramEditData({ ...programEditData, category: e.target.value })} className="w-28 px-2 py-1 border border-gray-200 rounded text-sm" />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button onClick={() => handleSaveProgram(p.id)} className="p-1.5 text-green-500 hover:bg-green-50 rounded-lg transition-colors"><Check className="w-4 h-4" /></button>
                              <button onClick={() => setEditProgramId(null)} className="p-1.5 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors"><X className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4 font-medium text-[#0c2340] text-sm">{p.name}</td>
                          <td className="px-6 py-4 text-gray-500 text-sm">{p.duration}</td>
                          <td className="px-6 py-4 text-gray-500 text-sm">{p.eligibility}</td>
                          <td className="px-6 py-4"><span className="px-2.5 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">{p.level}</span></td>
                          <td className="px-6 py-4"><span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">{p.category}</span></td>
                          <td className="px-6 py-4">
                            <button onClick={() => handleEditProgram(p)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ===== INQUIRIES ===== */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="font-semibold text-[#0c2340]">All Inquiries</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c9a962] w-64"
                  placeholder="Search by name..."
                />
              </div>
            </div>
            {filteredInquiries.length === 0 ? (
              <div className="p-12 text-center text-gray-400">No inquiries found.</div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {['Name', 'Email', 'Phone', 'Program', 'Date', 'Status', 'Actions'].map((h) => (
                      <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-[#0c2340] text-sm">{inq.studentName}</td>
                      <td className="px-6 py-4 text-gray-500 text-sm">{inq.email}</td>
                      <td className="px-6 py-4 text-gray-500 text-sm">{inq.phone}</td>
                      <td className="px-6 py-4 text-gray-500 text-sm">{inq.programOfInterest}</td>
                      <td className="px-6 py-4 text-gray-400 text-sm flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(inq.submittedAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <select
                          value={inq.status}
                          onChange={(e) => handleStatusChange(inq.id, e.target.value as AdmissionInquiry['status'])}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${statusStyles[inq.status]}`}
                        >
                          <option value="new">New</option>
                          <option value="replied">Replied</option>
                          <option value="pending">Pending</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleDeleteInquiry(inq.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ===== CALENDAR ===== */}
        {activeTab === 'calendar' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="font-semibold text-[#0c2340]">Calendar Events</h3>
              <button
                onClick={() => setShowEventForm(!showEventForm)}
                className="flex items-center gap-2 px-4 py-2 bg-[#0c2340] text-white rounded-lg text-sm hover:bg-[#1a3a5c] transition-colors"
              >
                <Plus className="w-4 h-4" /> {showEventForm ? 'Cancel' : 'Add Event'}
              </button>
            </div>

            {showEventForm && (
              <div className="p-6 border-b border-gray-100 bg-gray-50">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <input value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} placeholder="Event Title *" className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c9a962]" />
                  <input value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} type="date" className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c9a962]" />
                  <select value={eventForm.type} onChange={(e) => setEventForm({ ...eventForm, type: e.target.value as CalendarEvent['type'] })} className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c9a962]">
                    <option value="academic">Academic</option>
                    <option value="holiday">Holiday</option>
                    <option value="event">Event</option>
                  </select>
                </div>
                <button onClick={handleAddEvent} className="flex items-center gap-2 px-4 py-2.5 bg-[#c9a962] text-white rounded-lg text-sm font-medium hover:bg-[#b8984e] transition-colors">
                  <Plus className="w-4 h-4" /> Add Event
                </button>
              </div>
            )}

            {events.length === 0 ? (
              <div className="p-12 text-center text-gray-400">No events found.</div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {['Title', 'Date', 'Type', 'Actions'].map((h) => (
                      <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {events.map((e) => (
                    <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-[#0c2340] text-sm">{e.title}</td>
                      <td className="px-6 py-4 text-gray-500 text-sm">{e.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          e.type === 'academic' ? 'bg-blue-100 text-blue-600' :
                          e.type === 'holiday' ? 'bg-amber-100 text-amber-600' :
                          'bg-green-100 text-green-600'
                        }`}>{e.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleDeleteEvent(e.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ===== CONTACT INFO ===== */}
        {activeTab === 'contact' && contact && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-2xl">
            <h3 className="font-semibold text-[#0c2340] mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
                <input value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c9a962]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                <input value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c9a962]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Address</label>
                <textarea value={contactForm.address} onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })} rows={2} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c9a962]" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Working Hours</label>
                <input value={contactForm.workingHours} onChange={(e) => setContactForm({ ...contactForm, workingHours: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c9a962]" />
              </div>
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium text-[#0c2340] mb-4">Social Links</h4>
                <div className="grid grid-cols-2 gap-4">
                  {(['facebook', 'instagram', 'youtube', 'twitter'] as const).map((platform) => (
                    <div key={platform}>
                      <label className="block text-xs font-medium text-gray-500 mb-1 capitalize">{platform}</label>
                      <input value={contactForm.socialLinks[platform]} onChange={(e) => setContactForm({ ...contactForm, socialLinks: { ...contactForm.socialLinks, [platform]: e.target.value } })} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#c9a962]" />
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={handleSaveContact} className="flex items-center gap-2 px-6 py-2.5 bg-[#c9a962] text-white rounded-lg text-sm font-medium hover:bg-[#b8984e] transition-colors mt-4">
                <Check className="w-4 h-4" /> Save Contact Info
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
