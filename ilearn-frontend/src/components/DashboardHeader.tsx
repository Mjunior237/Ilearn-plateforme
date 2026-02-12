'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, LogOut, User, ChevronDown, Bell, Settings } from 'lucide-react';

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  educationLevel: string;
}

export default function DashboardHeader() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    // Récupérer les infos utilisateur du localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    // Supprimer les données de session
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Rediriger vers la page d'accueil
    router.push('/');
  };

  const getRoleLabel = (role: string) => {
    if (role.includes('STUDENT')) return 'Student';
    if (role.includes('TEACHER')) return 'Teacher';
    if (role.includes('PROFESSOR')) return 'Professor';
    if (role === 'ADMIN') return 'Administrator';
    return 'User';
  };

  const getLevelLabel = (level: string) => {
    if (level === 'PRIMARY') return 'Primary';
    if (level === 'SECONDARY') return 'Secondary';
    if (level === 'SUPERIOR') return 'University';
    return '';
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/90 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                i-Learn
              </h1>
              <p className="text-xs text-gray-600">Dashboard</p>
            </div>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {/* Avatar */}
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {user ? `${user.firstName[0]}${user.lastName[0]}` : 'U'}
                </div>

                {/* User Info */}
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-800">
                    {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user ? getRoleLabel(user.role) : ''}
                    {user?.educationLevel && ` - ${getLevelLabel(user.educationLevel)}`}
                  </p>
                </div>

                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in">
                  {/* User Info in Dropdown (Mobile) */}
                  <div className="md:hidden px-4 py-3 border-b border-gray-100">
                    <p className="font-semibold text-gray-800">
                      {user ? `${user.firstName} ${user.lastName}` : ''}
                    </p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {user ? getRoleLabel(user.role) : ''}
                      {user?.educationLevel && ` - ${getLevelLabel(user.educationLevel)}`}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">My Profile</span>
                  </Link>

                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Settings</span>
                  </Link>

                  <div className="border-t border-gray-100 my-2"></div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors w-full text-left text-red-600"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-semibold">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}