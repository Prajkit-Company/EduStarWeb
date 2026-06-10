import { useState } from 'react';
import { 
  LayoutDashboard, Users, BookOpen, MessageSquare, Settings, LogOut,
  Bell, Search, Eye, Edit, Trash2, Plus, ChevronRight,
  TrendingUp, UserCheck, Mail, Clock,
  GraduationCap, Award, BarChart3
} from 'lucide-react';

export function AdminPage({ isLoggedIn, onLogin, onLogout }: {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === 'admin' && loginData.password === 'admin123') {
      onLogin();
    } else {
      alert('Demo Credentials:\nUsername: admin\nPassword: admin123');
    }
  };

  const stats = [
    { title: 'Total Students', value: '1,247', change: '+12%', trend: 'up', icon: Users, color: 'bg-blue-600' },
    { title: 'Active Programs', value: '25', change: '+3', trend: 'up', icon: BookOpen, color: 'bg-emerald-600' },
    { title: 'New Inquiries', value: '48', change: '+8', trend: 'up', icon: MessageSquare, color: 'bg-amber-600' },
    { title: 'Faculty Members', value: '52', change: '+2', trend: 'up', icon: GraduationCap, color: 'bg-purple-600' },
  ];

  const recentInquiries = [
    { id: 1, name: 'John Smith', email: 'john.smith@email.com', subject: 'Admission Inquiry', date: '2 hours ago', status: 'New' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@email.com', subject: 'Program Details', date: '5 hours ago', status: 'Replied' },
    { id: 3, name: 'Michael Brown', email: 'michael.b@email.com', subject: 'Fee Structure', date: '1 day ago', status: 'Pending' },
    { id: 4, name: 'Emily Davis', email: 'emily.d@email.com', subject: 'Scholarship Info', date: '1 day ago', status: 'New' },
    { id: 5, name: 'Alex Wilson', email: 'alex.w@email.com', subject: 'Campus Visit', date: '2 days ago', status: 'Replied' },
  ];

  const courses = [
    { id: 1, name: 'Bachelor of Science', students: 350, status: 'Active', duration: '3 Years' },
    { id: 2, name: 'Bachelor of Commerce', students: 400, status: 'Active', duration: '3 Years' },
    { id: 3, name: 'Bachelor of Computer Applications', students: 300, status: 'Active', duration: '3 Years' },
    { id: 4, name: 'Bachelor of Arts', students: 250, status: 'Active', duration: '3 Years' },
    { id: 5, name: 'Bachelor of Business Administration', students: 200, status: 'Active', duration: '3 Years' },
    { id: 6, name: 'Master of Science', students: 150, status: 'Active', duration: '2 Years' },
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'courses', label: 'Programs', icon: BookOpen },
    { id: 'inquiries', label: 'Inquiries', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0c2340] via-[#1a3a5c] to-[#0c2340] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10">
          <div className="text-center mb-10">
            <div className="w-20 h-20 mx-auto bg-[#0c2340] rounded-full flex items-center justify-center mb-6">
              <GraduationCap className="w-10 h-10 text-[#c9a962]" />
            </div>
            <h1 className="text-2xl font-serif font-semibold text-[#0c2340]">Admin Portal</h1>
            <p className="text-gray-500 mt-2">St. Augustine's College</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#c9a962]"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#c9a962]"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-[#0c2340] text-white rounded-lg font-medium hover:bg-[#1a3a5c] transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 p-4 bg-[#fafaf8] rounded-lg border border-gray-100">
            <p className="text-sm text-gray-600 text-center">
              <strong>Demo Credentials:</strong><br />
              Username: <code className="bg-white px-2 py-0.5 rounded">admin</code><br />
              Password: <code className="bg-white px-2 py-0.5 rounded">admin123</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0c2340] text-white fixed h-full flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#c9a962] rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-serif font-semibold">Admin Panel</h2>
              <p className="text-xs text-gray-400">St. Augustine's</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'bg-white/15 text-[#c9a962]'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {activeTab === item.id && <ChevronRight className="w-4 h-4 ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => onLogout()}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-lg transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-serif font-semibold text-[#0c2340]">
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'students' && 'Student Management'}
              {activeTab === 'courses' && 'Program Management'}
              {activeTab === 'inquiries' && 'Contact Inquiries'}
              {activeTab === 'settings' && 'System Settings'}
            </h1>
            <p className="text-gray-500 mt-1">Welcome back, Administrator</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg w-64 bg-white"
              />
            </div>
            <button className="relative p-2.5 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="w-10 h-10 bg-[#0c2340] rounded-full flex items-center justify-center text-white font-medium">
                A
              </div>
              <div>
                <p className="font-medium text-[#0c2340] text-sm">Admin User</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="flex items-center gap-1 text-sm font-medium text-emerald-600">
                      <TrendingUp className="w-4 h-4" />
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-3xl font-serif font-semibold text-[#0c2340]">{stat.value}</h3>
                  <p className="text-gray-500 text-sm mt-1">{stat.title}</p>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-serif font-semibold text-[#0c2340]">Enrollment Trend</h3>
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>
                <div className="h-64 flex items-end gap-3 px-4">
                  {[60, 75, 55, 85, 70, 90, 80, 95, 85, 100, 90, 110].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-gradient-to-t from-[#0c2340] to-[#1a3a5c] rounded-t transition-all hover:from-[#c9a962] hover:to-[#8b7355]"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-xs text-gray-400">
                        {['J','F','M','A','M','J','J','A','S','O','N','D'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-serif font-semibold text-[#0c2340]">Program Distribution</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Science Programs', value: 35, color: 'bg-[#0c2340]' },
                    { label: 'Commerce Programs', value: 30, color: 'bg-[#c9a962]' },
                    { label: 'Arts Programs', value: 20, color: 'bg-[#8b7355]' },
                    { label: 'Computer Science', value: 15, color: 'bg-emerald-600' },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">{item.label}</span>
                        <span className="font-medium text-[#0c2340]">{item.value}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full transition-all`} style={{ width: `${item.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Inquiries */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-serif font-semibold text-[#0c2340]">Recent Inquiries</h3>
                <button className="text-[#c9a962] font-medium text-sm hover:text-[#8b7355] transition-colors">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Name</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Email</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Subject</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Date</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentInquiries.map((inquiry) => (
                      <tr key={inquiry.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-[#0c2340]">{inquiry.name}</td>
                        <td className="px-6 py-4 text-gray-600">{inquiry.email}</td>
                        <td className="px-6 py-4 text-gray-600">{inquiry.subject}</td>
                        <td className="px-6 py-4 text-gray-500 text-sm">{inquiry.date}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            inquiry.status === 'New' ? 'bg-blue-100 text-blue-700' :
                            inquiry.status === 'Replied' ? 'bg-emerald-100 text-emerald-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {inquiry.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
                              <Mail className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Programs Tab */}
        {activeTab === 'courses' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-serif font-semibold text-[#0c2340]">All Programs</h3>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0c2340] text-white rounded-lg hover:bg-[#1a3a5c] transition-colors">
                <Plus className="w-4 h-4" /> Add Program
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Program Name</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Duration</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Students</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-[#0c2340]">{course.name}</td>
                      <td className="px-6 py-4 text-gray-600">{course.duration}</td>
                      <td className="px-6 py-4 text-gray-600">{course.students}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                          {course.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-serif font-semibold text-[#0c2340]">Contact Inquiries</h3>
              <select className="px-4 py-2 border border-gray-200 rounded-lg bg-white">
                <option>All Status</option>
                <option>New</option>
                <option>Pending</option>
                <option>Replied</option>
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Name</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Email</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Subject</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Date</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentInquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-[#0c2340]">{inquiry.name}</td>
                      <td className="px-6 py-4 text-gray-600">{inquiry.email}</td>
                      <td className="px-6 py-4 text-gray-600">{inquiry.subject}</td>
                      <td className="px-6 py-4 text-gray-500 text-sm">{inquiry.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          inquiry.status === 'New' ? 'bg-blue-100 text-blue-700' :
                          inquiry.status === 'Replied' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {inquiry.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg text-emerald-600 transition-colors">
                            <Mail className="w-4 h-4" />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-serif font-semibold text-[#0c2340]">Student Database</h3>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0c2340] text-white rounded-lg hover:bg-[#1a3a5c] transition-colors">
                <Plus className="w-4 h-4" /> Add Student
              </button>
            </div>
            <div className="p-12 text-center">
              <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h4 className="text-xl font-serif font-semibold text-[#0c2340] mb-2">Student Management</h4>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Complete student database management including enrollment records, academic tracking, and performance analytics.
              </p>
              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <UserCheck className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                  <p className="text-sm font-medium text-blue-900">Active</p>
                  <p className="text-lg font-serif font-semibold text-blue-600">1,180</p>
                </div>
                <div className="p-4 bg-amber-50 rounded-xl">
                  <Clock className="w-8 h-8 mx-auto text-amber-600 mb-2" />
                  <p className="text-sm font-medium text-amber-900">Pending</p>
                  <p className="text-lg font-serif font-semibold text-amber-600">47</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl">
                  <Award className="w-8 h-8 mx-auto text-emerald-600 mb-2" />
                  <p className="text-sm font-medium text-emerald-900">Alumni</p>
                  <p className="text-lg font-serif font-semibold text-emerald-600">5,000+</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-serif font-semibold text-[#0c2340] mb-6">General Settings</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Institution Name</label>
                  <input
                    type="text"
                    defaultValue="St. Augustine's College of Excellence"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                  <input
                    type="email"
                    defaultValue="info@staugustines.edu"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue="+1 (234) 567-890"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    defaultValue="123 University Avenue, Academic District"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>
              <button className="mt-6 px-6 py-3 bg-[#0c2340] text-white rounded-lg font-medium hover:bg-[#1a3a5c] transition-colors">
                Save Changes
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-serif font-semibold text-[#0c2340] mb-6">Notification Settings</h3>
              <div className="space-y-4">
                {[
                  { label: 'New inquiry notifications', checked: true },
                  { label: 'Daily summary reports', checked: true },
                  { label: 'Student enrollment alerts', checked: false },
                  { label: 'System updates', checked: true },
                ].map((item, i) => (
                  <label key={i} className="flex items-center gap-4 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={item.checked}
                      className="w-5 h-5 rounded border-gray-300 text-[#0c2340] focus:ring-[#c9a962]"
                    />
                    <span className="text-gray-700">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
