'use client';

import {
  BookOpen,
  Upload,
  Users,
  Video,
  FileText,
  BarChart3,
  Calendar,
  Settings,
  MessageCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  PauseCircle
} from 'lucide-react';
import { useState } from 'react';
import DashboardHeader from '../../../components/DashboardHeader';  // ← AJOUTÉ
import Footer from '../../../components/Footer';  // ← AJOUTÉ
export default function TeacherDashboard() {
  const [vleStatus, setVleStatus] = useState<'active' | 'inactive'>('inactive');

  const stats = [
    { title: 'My Courses', value: '8', icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
    { title: 'Total Students', value: '156', icon: Users, color: 'from-green-500 to-emerald-500' },
    { title: 'Active Classes', value: '4', icon: Video, color: 'from-purple-500 to-pink-500' },
    { title: 'Pending Reviews', value: '12', icon: FileText, color: 'from-orange-500 to-red-500' },
  ];

  const quickActions = [
    { 
      title: 'Upload Course', 
      description: 'Add new lesson or material',
      icon: Upload,
      color: 'bg-blue-100 text-blue-600',
      action: 'upload'
    },
    { 
      title: 'Create Assignment', 
      description: 'New exercise or homework',
      icon: FileText,
      color: 'bg-green-100 text-green-600',
      action: 'assignment'
    },
    { 
      title: 'Schedule Class', 
      description: 'Plan virtual session',
      icon: Calendar,
      color: 'bg-purple-100 text-purple-600',
      action: 'schedule'
    },
    { 
      title: 'Student Reports', 
      description: 'View performance data',
      icon: BarChart3,
      color: 'bg-orange-100 text-orange-600',
      action: 'reports'
    },
  ];

  const recentCourses = [
    { name: 'Mathematics - Grade 5', students: 32, status: 'Active', progress: 75 },
    { name: 'Science - Grade 4', students: 28, status: 'Active', progress: 60 },
    { name: 'English - Grade 6', students: 35, status: 'Draft', progress: 30 },
  ];

  const upcomingClasses = [
    { subject: 'Mathematics', grade: '5th Grade', time: 'Today 10:00 AM', students: 32 },
    { subject: 'Science', grade: '4th Grade', time: 'Today 2:00 PM', students: 28 },
    { subject: 'English', grade: '6th Grade', time: 'Tomorrow 9:00 AM', students: 35 },
  ];

  const handleVLEToggle = () => {
    setVleStatus(vleStatus === 'active' ? 'inactive' : 'active');
  };

  return (
     <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
          {/* ✅ HEADER CONNECTÉ */}
          <DashboardHeader />
    
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Teacher Dashboard</h1>
              <p className="text-xl opacity-90">Manage your courses and students</p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm opacity-80">Virtual Learning Environment</p>
                <p className="font-semibold">Status: {vleStatus === 'active' ? 'Active' : 'Inactive'}</p>
              </div>
              <button
                onClick={handleVLEToggle}
                className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  vleStatus === 'active'
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {vleStatus === 'active' ? (
                  <>
                    <PauseCircle className="w-5 h-5" />
                    Stop VLE
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-5 h-5" />
                    Start VLE
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <p className="text-gray-500 text-sm mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Settings className="w-6 h-6 text-indigo-600" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">{action.title}</h3>
              <p className="text-sm text-gray-500">{action.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MAIN CONTENT GRID */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* MY COURSES */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                My Courses
              </h3>
              <button className="text-blue-600 text-sm font-semibold hover:underline">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentCourses.map((course, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{course.name}</h4>
                      <p className="text-sm text-gray-500">{course.students} students enrolled</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      course.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {course.status}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{course.progress}% Complete</p>
                </div>
              ))}
            </div>
          </div>

          {/* UPCOMING CLASSES */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                Upcoming Classes
              </h3>
              <button className="text-purple-600 text-sm font-semibold hover:underline">
                Schedule New
              </button>
            </div>
            <div className="space-y-4">
              {upcomingClasses.map((classItem, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">{classItem.subject}</h4>
                      <p className="text-sm text-gray-500">{classItem.grade}</p>
                    </div>
                    <Video className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{classItem.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{classItem.students} students</span>
                    </div>
                  </div>
                  <button className="mt-3 w-full px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-semibold hover:bg-purple-200 transition-colors">
                    Join Class
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NOTIFICATIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-orange-600" />
            Recent Notifications
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800">Course Published Successfully</p>
                <p className="text-sm text-gray-600">Mathematics - Grade 5 is now live for students</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800">12 New Assignments Submitted</p>
                <p className="text-sm text-gray-600">Students have submitted their Science homework</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800">Upcoming Class Reminder</p>
                <p className="text-sm text-gray-600">Mathematics class starts in 30 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </section>
       {/* ✅ FOOTER */}
            <Footer />
    </div>
  );
}
