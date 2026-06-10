import { useState } from 'react';
import { GraduationCap, Lock, User } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
  onBack: () => void;
}

export function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      onLogin();
    } else {
      setError('Invalid credentials. Demo: admin / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c2340] via-[#1a3a5c] to-[#0c2340] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-[#0c2340] rounded-full flex items-center justify-center mb-4">
            <GraduationCap className="w-10 h-10 text-[#c9a962]" />
          </div>
          <h1 className="text-2xl font-serif font-semibold text-[#0c2340]">Admin Login</h1>
          <p className="text-gray-500 mt-1 text-sm">St. Augustine's College CMS</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(''); }}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#c9a962] transition-colors"
                placeholder="Enter admin username"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#c9a962] transition-colors"
                placeholder="Enter password"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</p>}

          <button
            type="submit"
            className="w-full py-3.5 bg-[#0c2340] text-white rounded-lg font-medium hover:bg-[#1a3a5c] transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 p-4 bg-[#fafaf8] rounded-lg border border-gray-100 text-xs text-gray-500 space-y-1">
          <p className="font-semibold text-gray-600 mb-1">Demo Credentials</p>
          <p><span className="font-medium">Username:</span> admin</p>
          <p><span className="font-medium">Password:</span> admin123</p>
        </div>

        <button onClick={onBack} className="mt-6 w-full text-center text-sm text-gray-400 hover:text-[#0c2340] transition-colors">
          ← Back to Website
        </button>
      </div>
    </div>
  );
}
