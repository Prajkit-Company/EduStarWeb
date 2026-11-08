import { useState } from 'react';
import {
  LayoutDashboard, BookOpen, Calendar, LogOut,
  Eye, GraduationCap, Bell, Award, TrendingUp,
  ClipboardList, Clock, CheckCircle2, AlertCircle
} from 'lucide-react';

interface Props { onLogout: () => void; onBack: () => void; }

export function StudentDashboard({ onLogout, onBack }: Props) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const subjects = [
    { name: 'Advanced Mathematics', grade: 'A', marks: 88, total: 100, attendance: 92 },
    { name: 'Physics', grade: 'B+', marks: 79, total: 100, attendance: 88 },
    { name: 'Computer Science', grade: 'A+', marks: 95, total: 100, attendance: 97 },
    { name: 'English Literature', grade: 'B', marks: 74, total: 100, attendance: 85 },
    { name: 'Chemistry', grade: 'A', marks: 84, total: 100, attendance: 90 },
  ];

  const upcoming = [
    { title: 'Mathematics Mid-Term', date: 'Jan 25', type: 'Exam', urgent: true },
    { title: 'Physics Lab Report', date: 'Jan 27', type: 'Assignment', urgent: false },
    { title: 'CS Project Submission', date: 'Jan 30', type: 'Project', urgent: false },
    { title: 'English Essay', date: 'Feb 2', type: 'Assignment', urgent: false },
  ];

  const timetable = [
    { time: '9:00 AM', subject: 'Mathematics', room: 'Room 201' },
    { time: '11:00 AM', subject: 'Physics Lab', room: 'Lab 3' },
    { time: '1:00 PM', subject: 'Lunch Break', room: '' },
    { time: '2:00 PM', subject: 'Computer Science', room: 'Room 105' },
    { time: '4:00 PM', subject: 'English', room: 'Room 302' },
  ];

  const sidebar = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'subjects', label: 'My Subjects', icon: BookOpen },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'assignments', label: 'Assignments', icon: ClipboardList },
    { id: 'results', label: 'Results', icon: Award },
  ];

  const gradeColor: Record<string, string> = {
    'A+': 'text-emerald-600', A: 'text-emerald-500', 'B+': 'text-blue-600', B: 'text-blue-500', C: 'text-amber-500',
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      <aside className="w-64 bg-[#FF5638] text-white fixed h-full flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF5638] rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-serif font-semibold text-sm text-white">Student Portal</h2>
              <p className="text-xs text-white/70">St. Augustine's</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebar.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm ${
                activeTab === item.id ? 'bg-[#FF5638] text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />{item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-1">
          <button onClick={onBack} className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 hover:text-white rounded-lg transition-all text-sm">
            <Eye className="w-5 h-5" /><span>View Website</span>
          </button>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/5 hover:text-white rounded-lg transition-all text-sm">
            <LogOut className="w-5 h-5" /><span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="ml-64 flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-serif font-semibold text-[#FF5638]">Welcome, Alex</h1>
            <p className="text-gray-500 text-sm mt-1">B.Sc. Computer Science · Semester 4 · Roll No. CS2021042</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-[#FF5638] transition-colors">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">1</span>
            </button>
            <div className="w-10 h-10 bg-[#FF5638] rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-semibold">AK</span>
            </div>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <>
            <div className="grid grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Overall GPA', value: '3.7', icon: TrendingUp, color: 'bg-emerald-600' },
                { label: 'Attendance', value: '90%', icon: CheckCircle2, color: 'bg-blue-600' },
                { label: 'Pending Tasks', value: '4', icon: AlertCircle, color: 'bg-amber-600' },
                { label: 'Credits Earned', value: '72', icon: Award, color: 'bg-purple-600' },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center mb-4`}>
                    <s.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-serif font-bold text-[#FF5638]">{s.value}</div>
                  <div className="text-gray-500 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Subjects */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-[#FF5638] mb-5">Subject Performance</h3>
                <div className="space-y-4">
                  {subjects.map((s, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-[#FF5638] font-medium">{s.name}</span>
                        <span className={`text-sm font-bold ${gradeColor[s.grade] ?? 'text-gray-600'}`}>{s.grade}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className="bg-[#FF5638] h-1.5 rounded-full" style={{ width: `${s.marks}%` }} />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{s.marks}/{s.total} marks · {s.attendance}% attendance</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {/* Upcoming */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-semibold text-[#FF5638] mb-4">Upcoming Deadlines</h3>
                  <div className="space-y-3">
                    {upcoming.map((u, i) => (
                      <div key={i} className="flex items-center gap-3">
                        {u.urgent
                          ? <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                          : <Clock className="w-4 h-4 text-gray-400 shrink-0" />}
                        <div className="flex-1">
                          <p className="text-sm text-[#FF5638]">{u.title}</p>
                          <p className="text-xs text-gray-400">{u.type} · {u.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Today's timetable */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-semibold text-[#FF5638] mb-4">Today's Classes</h3>
                  <div className="space-y-2">
                    {timetable.map((t, i) => (
                      <div key={i} className={`flex items-center gap-3 p-2.5 rounded-lg ${t.room ? 'hover:bg-gray-50' : 'opacity-40'}`}>
                        <span className="text-xs text-[#FF5638] font-medium w-16 shrink-0">{t.time}</span>
                        <span className="text-sm text-[#FF5638]">{t.subject}</span>
                        {t.room && <span className="text-xs text-gray-400 ml-auto">{t.room}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab !== 'dashboard' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400 font-medium capitalize">{activeTab} section coming soon</p>
          </div>
        )}
      </main>
    </div>
  );
}
