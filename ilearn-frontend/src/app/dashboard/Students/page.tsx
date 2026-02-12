'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import {
  BookOpen,
  FileText,
  TrendingUp,
  Clock,
  Award,
  PlayCircle,
  Download,
  MessageCircle
} from 'lucide-react';

export default function StudentDashboard() {

  const stats = [
    {
      title: 'Courses Enrolled',
      value: '6',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Completed Lessons',
      value: '24',
      icon: Award,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Progress',
      value: '68%',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Study Time',
      value: '12h',
      icon: Clock,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const services = [
    {
      title: 'My Courses',
      description: 'Continue your learning',
      icon: PlayCircle
    },
    {
      title: 'Exercises',
      description: 'Practice and quizzes',
      icon: FileText
    },
    {
      title: 'Resources',
      description: 'Download PDFs',
      icon: Download
    },
    {
      title: 'Messages',
      description: 'Chat with teachers',
      icon: MessageCircle
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      {/* HERO DASHBOARD */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            Student Dashboard
          </h1>
          <p className="opacity-90 mt-2">
            Welcome back, continue your learning journey.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4`}>
                <stat.icon />
              </div>
              <h3 className="text-gray-500 text-sm">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">My Learning</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
              <service.icon className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold">{service.title}</h3>
              <p className="text-sm text-gray-500">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COURSES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6">Continue Learning</h2>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-gray-500">
            Your enrolled courses will appear here.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
