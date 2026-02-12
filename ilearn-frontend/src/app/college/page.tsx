'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { BookOpen, ArrowRight, GraduationCap, Users, Clock, Award } from 'lucide-react';

export default function CollegePage() {
  const grades = [
    {
      id: 1,
      name: '7th Grade',
      nameFr: '1ère Année Collège',
      students: '98 students',
      subjects: [
        { name: 'Mathematics', nameFr: 'Mathématiques', icon: '📐', color: 'bg-blue-100 text-blue-600' },
        { name: 'Physics', nameFr: 'Physique', icon: '⚗️', color: 'bg-purple-100 text-purple-600' },
        { name: 'Life Sciences', nameFr: 'SVT', icon: '🌱', color: 'bg-green-100 text-green-600' },
        { name: 'French', nameFr: 'Français', icon: '🇫🇷', color: 'bg-pink-100 text-pink-600' },
        { name: 'English', nameFr: 'Anglais', icon: '🇬🇧', color: 'bg-red-100 text-red-600' },
        { name: 'History', nameFr: 'Histoire', icon: '📜', color: 'bg-orange-100 text-orange-600' },
      ]
    },
    {
      id: 2,
      name: '8th Grade',
      nameFr: '2ème Année Collège',
      students: '105 students',
      subjects: [
        { name: 'Mathematics', nameFr: 'Mathématiques', icon: '📐', color: 'bg-blue-100 text-blue-600' },
        { name: 'Physics-Chemistry', nameFr: 'Physique-Chimie', icon: '⚗️', color: 'bg-purple-100 text-purple-600' },
        { name: 'Life Sciences', nameFr: 'SVT', icon: '🌱', color: 'bg-green-100 text-green-600' },
        { name: 'French', nameFr: 'Français', icon: '🇫🇷', color: 'bg-pink-100 text-pink-600' },
        { name: 'English', nameFr: 'Anglais', icon: '🇬🇧', color: 'bg-red-100 text-red-600' },
        { name: 'Computer Science', nameFr: 'Informatique', icon: '💻', color: 'bg-indigo-100 text-indigo-600' },
      ]
    },
    {
      id: 3,
      name: '9th Grade',
      nameFr: '3ème Année Collège',
      students: '112 students',
      subjects: [
        { name: 'Mathematics', nameFr: 'Mathématiques', icon: '📐', color: 'bg-blue-100 text-blue-600' },
        { name: 'Physics-Chemistry', nameFr: 'Physique-Chimie', icon: '⚗️', color: 'bg-purple-100 text-purple-600' },
        { name: 'Life Sciences', nameFr: 'SVT', icon: '🌱', color: 'bg-green-100 text-green-600' },
        { name: 'French', nameFr: 'Français', icon: '🇫🇷', color: 'bg-pink-100 text-pink-600' },
        { name: 'English', nameFr: 'Anglais', icon: '🇬🇧', color: 'bg-red-100 text-red-600' },
        { name: 'Computer Science', nameFr: 'Informatique', icon: '💻', color: 'bg-indigo-100 text-indigo-600' },
      ]
    },
  ];

  const stats = [
    { icon: Users, value: '315', label: 'Total Students', labelFr: 'Étudiants' },
    { icon: BookOpen, value: '18', label: 'Subjects', labelFr: 'Matières' },
    { icon: Clock, value: '3', label: 'Grade Levels', labelFr: 'Niveaux' },
    { icon: Award, value: '92%', label: 'Success Rate', labelFr: 'Taux de Réussite' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-12 h-12" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Middle School</h1>
              <p className="text-xl opacity-90">Collège</p>
            </div>
          </div>
          <p className="text-lg opacity-90 max-w-3xl">
            Deepening knowledge and critical thinking - Grades 7 to 9
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <stat.icon className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.labelFr}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Grades List */}
      <section className="max-w-7xl mx-auto px-4 py-12 flex-1">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">All Grade Levels</h2>
          <p className="text-gray-600">Tous les Niveaux - Cliquez pour voir les matières</p>
        </div>

        <div className="space-y-8">
          {grades.map((grade) => (
            <div key={grade.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{grade.name}</h3>
                    <p className="opacity-90">{grade.nameFr}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      <span className="font-semibold">{grade.students}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h4 className="font-semibold text-gray-700 mb-4">Available Subjects:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {grade.subjects.map((subject, idx) => (
                    <Link 
                      key={idx} 
                      href={`/college/${grade.id}/${subject.name.toLowerCase()}`}
                      className="group"
                    >
                      <div className={`${subject.color} p-4 rounded-lg hover:shadow-md transition-all cursor-pointer`}>
                        <div className="text-3xl mb-2">{subject.icon}</div>
                        <div className="font-semibold">{subject.name}</div>
                        <div className="text-xs opacity-80">{subject.nameFr}</div>
                        <div className="flex items-center gap-1 mt-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>View</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}