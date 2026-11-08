import { useState } from 'react';
import {
  LayoutDashboard, Users, BookOpen, Calendar, LogOut,
  Eye, GraduationCap, ClipboardList, Bell, CheckCircle2, Clock
} from 'lucide-react';

interface Props { onLogout: () => void; onBack: () => void; }

export function StaffDashboard({ onLogout, onBack }: Props) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const myClasses = [
    { subject: 'Advanced Mathematics', time: '9:00 AM', room: 'Room 201', students: 42 },
    { subject: 'Physics Lab', time: '11:00 AM', room: 'Lab 3', students: 28 },
    { subject: 'Calculus II', time: '2:00 PM', room: 'Room 105', students: 38 },
  ];

  const pendingTasks = [
    { task: 'Grade mid-term papers — Batch B', due: 'Today', priority: 'high' },
    { task: 'Submit attendance report for January', due: 'Tomorrow', priority: 'medium' },
    { task: 'Prepare lab manual for Physics', due: 'Jan 28', priority: 'low' },
    { task: 'Review student project proposals', due: 'Jan 30', priority: 'medium' },
  ];

  const announcements = [
    { title: 'Faculty Meeting', desc: 'Mandatory faculty meeting on Jan 25 at 3 PM in Conference Hall.', time: '2 hours ago' },
    { title: 'Exam Schedule Released', desc: 'Mid-term exam schedule has been published. Please review your invigilation duties.', time: '1 day ago' },
    { title: 'Workshop Registration', desc: 'Register for the upcoming pedagogy workshop by Jan 22.', time: '2 days ago' },
  ];

  const sidebar = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'classes', label: 'My Classes', icon: BookOpen },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'tasks', label: 'Tasks', icon: ClipboardList },
  ];

  const priorityColor: Record<string, string> = {
    high: 'bg-red-100 text-red-600',
    medium: 'bg-amber-100 text-amber-600',
    low: 'bg-green-100 text-green-600',
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex">
      <aside className="w-64 bg-[#e44a2e] text-white fixed h-full flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF5638] rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-serif font-semibold text-sm text-white">Staff Portal</h2>
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
            <h1 className="text-2xl font-serif font-semibold text-[#FF5638]">Welcome, Prof. Johnson</h1>
            <p className="text-gray-500 text-sm mt-1">Department of Sciences · Staff Portal</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-[#FF5638] transition-colors">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">2</span>
            </button>
            <div className="w-10 h-10 bg-[#e44a2e] rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-semibold">PJ</span>
            </div>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              {[
                { label: "Today's Classes", value: '3', icon: BookOpen, color: 'bg-blue-600' },
                { label: 'Total Students', value: '108', icon: Users, color: 'bg-emerald-600' },
                { label: 'Pending Tasks', value: '4', icon: ClipboardList, color: 'bg-amber-600' },
                { label: 'Attendance %', value: '94%', icon: CheckCircle2, color: 'bg-purple-600' },
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
              {/* Today's Classes */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-[#FF5638] mb-5">Today's Schedule</h3>
                <div className="space-y-4">
                  {myClasses.map((c, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 bg-[#e44a2e] rounded-xl flex items-center justify-center shrink-0">
                        <BookOpen className="w-5 h-5 text-[#FF5638]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[#FF5638] text-sm">{c.subject}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{c.room} · {c.students} students</p>
                      </div>
                      <span className="text-[#FF5638] text-sm font-medium">{c.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Tasks */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-[#FF5638] mb-5">Pending Tasks</h3>
                <div className="space-y-3">
                  {pendingTasks.map((t, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-[#FF5638]">{t.task}</p>
                        <p className="text-xs text-gray-400 mt-0.5">Due: {t.due}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${priorityColor[t.priority]}`}>{t.priority}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Announcements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
              <h3 className="font-semibold text-[#FF5638] mb-5">Announcements</h3>
              <div className="space-y-4">
                {announcements.map((a, i) => (
                  <div key={i} className="flex gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                    <div className="w-2 h-2 bg-[#FF5638] rounded-full mt-2 shrink-0" />
                    <div>
                      <p className="font-medium text-[#FF5638] text-sm">{a.title}</p>
                      <p className="text-gray-500 text-sm mt-0.5">{a.desc}</p>
                      <p className="text-gray-400 text-xs mt-1">{a.time}</p>
                    </div>
                  </div>
                ))}
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
