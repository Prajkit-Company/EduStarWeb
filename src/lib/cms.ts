import type {
  Notice,
  FacultyMember,
  GalleryImage,
  Program,
  AdmissionInquiry,
  ContactInfo,
  CalendarEvent,
} from '../types';

const KEYS = {
  NOTICES: 'cms_notices',
  FACULTY: 'cms_faculty',
  GALLERY: 'cms_gallery',
  PROGRAMS: 'cms_programs',
  INQUIRIES: 'cms_inquiries',
  CONTACT: 'cms_contact',
  EVENTS: 'cms_events',
  CALENDAR: 'cms_calendar',
} as const;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

let idCounter = Date.now();
function uid(): string {
  return (++idCounter).toString(36);
}

// --- Notices ---
export function getNotices(): Notice[] {
  return read<Notice[]>(KEYS.NOTICES, []);
}
export function addNotice(data: Omit<Notice, 'id'>): Notice {
  const list = getNotices();
  const item: Notice = { id: uid(), ...data };
  list.unshift(item);
  write(KEYS.NOTICES, list);
  return item;
}
export function updateNotice(id: string, data: Partial<Notice>): Notice | null {
  const list = getNotices();
  const idx = list.findIndex((n) => n.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...data };
  write(KEYS.NOTICES, list);
  return list[idx];
}
export function deleteNotice(id: string): void {
  write(KEYS.NOTICES, getNotices().filter((n) => n.id !== id));
}

// --- Faculty ---
export function getFaculty(): FacultyMember[] {
  return read<FacultyMember[]>(KEYS.FACULTY, []);
}
export function addFaculty(data: Omit<FacultyMember, 'id'>): FacultyMember {
  const list = getFaculty();
  const item: FacultyMember = { id: uid(), ...data };
  list.push(item);
  write(KEYS.FACULTY, list);
  return item;
}
export function updateFaculty(id: string, data: Partial<FacultyMember>): FacultyMember | null {
  const list = getFaculty();
  const idx = list.findIndex((f) => f.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...data };
  write(KEYS.FACULTY, list);
  return list[idx];
}
export function deleteFaculty(id: string): void {
  write(KEYS.FACULTY, getFaculty().filter((f) => f.id !== id));
}

// --- Gallery ---
export function getGalleryImages(): GalleryImage[] {
  return read<GalleryImage[]>(KEYS.GALLERY, []);
}
export function addGalleryImage(data: Omit<GalleryImage, 'id'>): GalleryImage {
  const list = getGalleryImages();
  const item: GalleryImage = { id: uid(), ...data };
  list.push(item);
  write(KEYS.GALLERY, list);
  return item;
}
export function deleteGalleryImage(id: string): void {
  write(KEYS.GALLERY, getGalleryImages().filter((g) => g.id !== id));
}

// --- Programs ---
export function getPrograms(): Program[] {
  return read<Program[]>(KEYS.PROGRAMS, []);
}
export function updateProgram(id: string, data: Partial<Program>): Program | null {
  const list = getPrograms();
  const idx = list.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...data };
  write(KEYS.PROGRAMS, list);
  return list[idx];
}

// --- Inquiries ---
export function getInquiries(): AdmissionInquiry[] {
  return read<AdmissionInquiry[]>(KEYS.INQUIRIES, []);
}
export function addInquiry(data: Omit<AdmissionInquiry, 'id' | 'submittedAt' | 'status'>): AdmissionInquiry {
  const list = getInquiries();
  const item: AdmissionInquiry = {
    id: uid(),
    ...data,
    submittedAt: new Date().toISOString(),
    status: 'new',
  };
  list.unshift(item);
  write(KEYS.INQUIRIES, list);
  return item;
}
export function updateInquiryStatus(id: string, status: AdmissionInquiry['status']): void {
  const list = getInquiries();
  const item = list.find((i) => i.id === id);
  if (item) {
    item.status = status;
    write(KEYS.INQUIRIES, list);
  }
}
export function deleteInquiry(id: string): void {
  write(KEYS.INQUIRIES, getInquiries().filter((i) => i.id !== id));
}

// --- Contact Info ---
export function getContactInfo(): ContactInfo {
  return read<ContactInfo>(KEYS.CONTACT, {
    phone: '+1 (234) 567-890',
    email: 'info@staugustines.edu',
    address: '123 University Avenue, Academic District, AD 12345',
    workingHours: 'Mon - Sat: 8:00 AM - 5:00 PM',
    socialLinks: {
      facebook: '#',
      instagram: '#',
      youtube: '#',
      twitter: '#',
    },
  });
}
export function saveContactInfo(data: ContactInfo): void {
  write(KEYS.CONTACT, data);
}

// --- Calendar Events ---
export function getCalendarEvents(): CalendarEvent[] {
  return read<CalendarEvent[]>(KEYS.CALENDAR, []);
}
export function addCalendarEvent(data: Omit<CalendarEvent, 'id'>): CalendarEvent {
  const list = getCalendarEvents();
  const item: CalendarEvent = { id: uid(), ...data };
  list.push(item);
  write(KEYS.CALENDAR, list);
  return item;
}
export function deleteCalendarEvent(id: string): void {
  write(KEYS.CALENDAR, getCalendarEvents().filter((e) => e.id !== id));
}

// --- Seed (if empty) ---
export function seedIfEmpty(): void {
  if (getNotices().length > 0) return;

  addNotice({ title: 'Admissions Open for 2025-26 Academic Year', content: 'Applications are now being accepted for all undergraduate and postgraduate programs. Visit the Admission page for details and submit your application online.', date: '2025-01-15', category: 'Admission' });
  addNotice({ title: 'Annual Science Exhibition 2025', content: 'The Annual Science Exhibition will be held on March 15, 2025. Students are encouraged to register their projects by February 28.', date: '2025-01-10', category: 'Event' });
  addNotice({ title: 'Semester Examination Schedule', content: 'The final semester examination schedule for all programs has been published. Check the notice board for detailed timetables.', date: '2025-01-05', category: 'Academic' });
  addNotice({ title: 'New Library Resources Added', content: 'Our library has added 500+ new volumes and subscribed to 3 new online research databases for student access.', date: '2024-12-20', category: 'General' });
  addNotice({ title: 'Sports Meet Registration Open', content: 'Inter-college sports meet registration is open until February 10. Participate in athletics, basketball, football, and more.', date: '2024-12-15', category: 'Event' });

  // Faculty
  addFaculty({ name: 'Dr. Robert J. Anderson', photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80', designation: 'Principal', qualification: 'Ph.D. (Education), M.Phil.', subject: 'Education Leadership', bio: 'Over 32 years of academic leadership experience. Previously served as Dean at multiple prestigious institutions.', category: 'principal' });
  addFaculty({ name: 'Prof. Maria S. Garcia', photoUrl: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=400&q=80', designation: 'Vice Principal', qualification: 'M.Phil., MBA', subject: 'Business Administration', bio: '28 years of experience in academic administration and business education.', category: 'vice-principal' });
  addFaculty({ name: 'Dr. James K. Wilson', photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80', designation: 'Head - Computer Science', qualification: 'Ph.D. (Computer Science)', subject: 'Computer Science', bio: 'Specializes in AI, Machine Learning, and Data Science. Published 50+ research papers.', category: 'head' });
  addFaculty({ name: 'Prof. Sarah Mitchell', photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80', designation: 'Head - Sciences', qualification: 'Ph.D. (Physics), M.Sc.', subject: 'Physics', bio: 'Expert in quantum mechanics and material sciences. Awarded Young Scientist Award 2019.', category: 'head' });
  addFaculty({ name: 'Dr. Priya R. Sharma', photoUrl: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=400&q=80', designation: 'Senior Faculty', qualification: 'Ph.D. (Chemistry)', subject: 'Chemistry', bio: 'Research focus on organic chemistry and pharmaceutical compounds.', category: 'teacher' });
  addFaculty({ name: 'Prof. Michael Chen', photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', designation: 'Senior Faculty', qualification: 'M.Sc., M.Phil.', subject: 'Mathematics', bio: 'Expert in applied mathematics and statistics. 22 years of teaching experience.', category: 'teacher' });
  addFaculty({ name: 'Mrs. Emily Watson', photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80', designation: 'Faculty', qualification: 'M.A. (English Literature)', subject: 'English', bio: 'Specializes in modern literature and academic writing. Published author.', category: 'teacher' });
  addFaculty({ name: 'Mr. Rajesh Kumar', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', designation: 'Faculty', qualification: 'MBA, M.Com', subject: 'Commerce', bio: 'Industry expert turned academic with 15 years in corporate finance.', category: 'teacher' });
  addFaculty({ name: 'Dr. Anita Sharma', photoUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80', designation: 'Faculty', qualification: 'Ph.D. (Psychology)', subject: 'Psychology', bio: 'Expert in counseling psychology and behavioral studies.', category: 'teacher' });
  addFaculty({ name: 'Mrs. Lisa Thompson', photoUrl: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&q=80', designation: 'Admin Officer', qualification: 'MBA (Administration)', subject: 'Administration', bio: 'Manages student records, admissions, and administrative operations.', category: 'admin' });

  // Gallery
  const galleryBase = 'https://images.unsplash.com/photo-';
  const galleryItems = [
    { url: galleryBase + '1607237138185-eedd9c632b38?w=800&q=80', caption: 'Main Academic Building', category: 'Campus' },
    { url: galleryBase + '1507842217343-583bb7270b66?w=800&q=80', caption: 'Central Library Interior', category: 'Campus' },
    { url: galleryBase + '1516321318423-f06f85e504b3?w=800&q=80', caption: 'Computer Laboratory', category: 'Campus' },
    { url: galleryBase + '1582719471384-894fbb16e074?w=800&q=80', caption: 'Science Lab', category: 'Campus' },
    { url: galleryBase + '1534438327276-14e5300c3a48?w=800&q=80', caption: 'Sports Complex', category: 'Sports' },
    { url: galleryBase + '1540575467063-178a50c2df87?w=800&q=80', caption: 'College Auditorium', category: 'Campus' },
    { url: galleryBase + '1523580494863-6f3031224c94?w=800&q=80', caption: 'Annual Convocation 2024', category: 'Events' },
    { url: galleryBase + '1564981797816-1043664bf78d?w=800&q=80', caption: 'Science Exhibition', category: 'Events' },
    { url: galleryBase + '1511578314322-379afb476865?w=800&q=80', caption: 'Cultural Festival', category: 'Events' },
    { url: galleryBase + '1475721027785-f74eccf877e2?w=800&q=80', caption: 'Guest Lecture Session', category: 'Events' },
    { url: galleryBase + '1580582932707-520aed937b7b?w=800&q=80', caption: 'Smart Classroom', category: 'Campus' },
    { url: galleryBase + '1529070538774-1843cb3265df?w=800&q=80', caption: 'Students in Discussion', category: 'Events' },
    { url: galleryBase + '1532187863486-abf9dbad1b69?w=800&q=80', caption: 'Laboratory Research', category: 'Campus' },
    { url: galleryBase + '1627556704290-2b1f5853ff78?w=800&q=80', caption: 'Award Ceremony', category: 'Events' },
    { url: galleryBase + '1592280771190-3e2e4d571952?w=800&q=80', caption: 'Green Campus View', category: 'Campus' },
  ];
  galleryItems.forEach((g) => addGalleryImage(g));

  // Programs
  const programData = [
    { name: 'Bachelor of Science (B.Sc)', duration: '3 Years', eligibility: '10+2 with Science stream, 50% minimum', description: 'A rigorous program offering specializations in Physics, Chemistry, Biology, and Mathematics.', category: 'Science', level: 'Undergraduate' },
    { name: 'Bachelor of Commerce (B.Com)', duration: '3 Years', eligibility: '10+2 with Commerce stream, 45% minimum', description: 'Comprehensive commerce education covering accounting, finance, taxation, and business management.', category: 'Commerce', level: 'Undergraduate' },
    { name: 'Bachelor of Computer Applications (BCA)', duration: '3 Years', eligibility: '10+2 with Mathematics, 50% minimum', description: 'Industry-aligned program focusing on programming, software development, and database management.', category: 'Computer Science', level: 'Undergraduate' },
    { name: 'Bachelor of Arts (B.A)', duration: '3 Years', eligibility: '10+2 any stream, 45% minimum', description: 'A liberal arts program offering diverse specializations in humanities and social sciences.', category: 'Arts', level: 'Undergraduate' },
    { name: 'Bachelor of Business Administration (BBA)', duration: '3 Years', eligibility: '10+2 any stream, 50% minimum', description: 'Professional management education covering marketing, finance, HR, and entrepreneurship.', category: 'Commerce', level: 'Undergraduate' },
    { name: 'Master of Science (M.Sc)', duration: '2 Years', eligibility: 'B.Sc in relevant discipline, 55% minimum', description: 'Advanced scientific studies with emphasis on research methodology and specialized coursework.', category: 'Science', level: 'Postgraduate' },
    { name: 'Master of Commerce (M.Com)', duration: '2 Years', eligibility: 'B.Com with 50% minimum', description: 'Advanced commerce program with specializations in Accounting, Finance, or Business Management.', category: 'Commerce', level: 'Postgraduate' },
    { name: 'Master of Computer Applications (MCA)', duration: '2 Years', eligibility: 'BCA/B.Sc with Mathematics, 55% minimum', description: 'Advanced CS program with focus on software engineering, data science, and AI.', category: 'Computer Science', level: 'Postgraduate' },
  ];
  programData.forEach((p) => {
    const list = read<Program[]>(KEYS.PROGRAMS, []);
    if (!list.find((x) => x.name === p.name)) {
      list.push({ id: uid(), ...p });
      write(KEYS.PROGRAMS, list);
    }
  });

  // Calendar events
  const calEvents = [
    { title: 'Semester Begins', date: '2025-04-01', type: 'academic' as const },
    { title: 'Science Exhibition', date: '2025-03-15', type: 'event' as const },
    { title: 'Sports Meet', date: '2025-02-20', type: 'event' as const },
    { title: 'Cultural Festival', date: '2025-03-25', type: 'event' as const },
    { title: 'Final Examinations', date: '2025-05-10', type: 'academic' as const },
    { title: 'Summer Break', date: '2025-06-01', type: 'holiday' as const },
    { title: 'Admission Open Day', date: '2025-01-20', type: 'event' as const },
    { title: 'Parent-Teacher Meeting', date: '2025-02-10', type: 'event' as const },
  ];
  calEvents.forEach((e) => {
    const list = read<CalendarEvent[]>(KEYS.CALENDAR, []);
    if (!list.find((x) => x.title === e.title)) {
      list.push({ id: uid(), ...e });
      write(KEYS.CALENDAR, list);
    }
  });
}
