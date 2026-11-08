export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  photoUrl: string;
  designation: string;
  qualification: string;
  subject: string;
  bio: string;
  category: 'principal' | 'vice-principal' | 'head' | 'teacher' | 'admin';
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: string;
}

export interface Program {
  id: string;
  name: string;
  duration: string;
  eligibility: string;
  description: string;
  category: string;
  level: string;
}

export interface AdmissionInquiry {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  address: string;
  programOfInterest: string;
  previousEducation: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'replied' | 'pending';
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
    twitter: string;
  };
}

export interface Event {
  id: string;
  date: string;
  month: string;
  title: string;
  location: string;
  year: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'academic' | 'holiday' | 'event';
}
