'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { BookOpen, ArrowRight, GraduationCap, Users, Clock, Award } from 'lucide-react';

export default function LyceePage() {
  const grades = [
    {
      id: 1,
      name: 'Tronc Commun',
      nameFr: 'Tronc Commun',
      students: '156 students',
      subjects: [
        { name: 'Mathematics', nameFr: 'Mathématiques', icon: '∑', color: 'bg-blue-100 text-blue-600' },
        { name: 'Physics-Chemistry', nameFr: 'Physique-Chimie', icon: '⚛️', color: 'bg-purple-100 text-purple-600' },
        { name: 'Life Sciences', nameFr: 'SVT', icon: '🧬', color: 'bg-green-100 text-green-600' },
        { name: 'French', nameFr: 'Français', icon: '🇫🇷', color: 'bg-pink-100 text-pink-600' },
        { name: 'English', nameFr: 'Anglais', icon: '🇬🇧', color: 'bg-red-100 text-red-600' },
        { name: 'Philosophy', nameFr: 'Philosophie', icon: '🤔', color: 'bg-yellow-100 text-yellow-600' },
      ]
    },
    {
      id: 2,
      name: '1st Bac',
      nameFr: '1ère Bac',
      students: '168 students',
      branches: [
        {
          name: 'Sciences Math',
          nameFr: 'Sciences Mathématiques',
          subjects: [
            { name: 'Advanced Math', nameFr: 'Maths Avancées', icon: '∞', color: 'bg-blue-100 text-blue-600' },
            { name: 'Physics', nameFr: 'Physique', icon: '⚛️', color: 'bg-purple-100 text-purple-600' },
            { name: 'Chemistry', nameFr: 'Chimie', icon: '🧪', color: 'bg-green-100 text-green-600' },
            { name: 'French', nameFr: 'Français', icon: '🇫🇷', color: 'bg-pink-100 text-pink-600' },
          ]
        },
        {
          name: 'Life Sciences',
          nameFr: 'Sciences de la Vie',
          subjects: [
            { name: 'Mathematics', nameFr: 'Mathématiques', icon: '📐', color: 'bg-blue-100 text-blue-600' },
            { name: 'Biology', nameFr: 'Biologie', icon: '🔬', color: 'bg-green-100 text-green-600' },
            { name: 'Geology', nameFr: 'Géologie', icon: '🌋', color: 'bg-orange-100 text-orange-600' },
            { name: 'Chemistry', nameFr: 'Chimie', icon: '🧪', color: 'bg-purple-100 text-purple-600' },
          ]
        },
        {
          name: 'Economics',
          nameFr: 'Sciences Économiques',
          subjects: [
            { name: 'Economics', nameFr: 'Économie', icon: '💼', color: 'bg-indigo-100 text-indigo-600' },
            { name: 'Accounting', nameFr: 'Comptabilité', icon: '📊', color: 'bg-blue-100 text-blue-600' },
            { name: 'Mathematics', nameFr: 'Mathématiques', icon: '📐', color: 'bg-green-100 text-green-600' },
            { name: 'Management', nameFr: 'Gestion', icon: '📈', color: 'bg-purple-100 text-purple-600' },
          ]
        },
      ]
    },
    {
      id: 3,
      name: '2nd Bac',
      nameFr: '2ème Bac',
      students: '172 students',
      branches: [
        {
          name: 'Sciences Math',
          nameFr: 'Sciences Mathématiques',
          subjects: [
            { name: 'Advanced Math', nameFr: 'Maths Avancées', icon: '∞', color: 'bg-blue-100 text-blue-600' },
            { name: 'Physics', nameFr: 'Physique', icon: '⚛️', color: 'bg-purple-100 text-purple-600' },
            { name: 'Chemistry', nameFr: 'Chimie', icon: '🧪', color: 'bg-green-100 text-green-600' },
            { name: 'Philosophy', nameFr: 'Philosophie', icon: '🤔', color: 'bg-yellow-100 text-yellow-600' },
          ]
        },
        {
          name: 'Physical Sciences',
          nameFr: 'Sciences Physiques',
          subjects: [
            { name: 'Mathematics', nameFr: 'Mathématiques', icon: '📐', color: 'bg-blue-100 text-blue-600' },
            { name: 'Physics', nameFr: 'Physique', icon: '⚛️', color: 'bg-purple-100 text-purple-600' },
            { name: 'Chemistry', nameFr: 'Chimie', icon: '🧪', color: 'bg-green-100 text-green-600' },
            { name: 'Engineering', nameFr: 'Sciences Ingénieur', icon: '🔧', color: 'bg-orange-100 text-orange-600' },
          ]
        },
        {
          name: 'Literature',
          nameFr: 'Lettres',
          subjects: [
            { name: 'French Literature', nameFr: 'Littérature Française', icon: '📚', color: 'bg-pink-100 text-pink-600' },
            { name: 'Philosophy', nameFr: 'Philosophie', icon: '🤔', color: 'bg-yellow-100 text-yellow-600' },
            { name: 'History', nameFr: 'Histoire', icon: '📜', color: 'bg-indigo-100 text-indigo-600' },
            { name: 'Geography', nameFr: 'Géographie', icon: '🌍', color: 'bg-green-100 text-green-600' },
          ]
        },
      ]
    },
  ];

  const stats = [
    { icon: Users, value: '496', label: 'Total Students', labelFr: 'Étudiants' },
    { icon: BookOpen, value: '45+', label: 'Subjects', labelFr: 'Matières' },
    { icon: Clock, value: '3', label: 'Grade Levels', labelFr: 'Niveaux' },
    { icon: Award, value: '97%', label: 'Success Rate', labelFr: 'Taux de Réussite' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-12 h-12" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">High School</h1>
              <p className="text-xl opacity-90">Lycée</p>
            </div>
          </div>
          <p className="text-lg opacity-90 max-w-3xl">
            Preparing for Baccalaureate and higher education excellence
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <stat.icon className="w-8 h-8 mx-auto mb-2 text-purple-600" />
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
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
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
                {/* Tronc Commun (pas de branches) */}
                {!grade.branches && (
                  <>
                    <h4 className="font-semibold text-gray-700 mb-4">Available Subjects:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {grade.subjects?.map((subject, idx) => (
                        <Link 
                          key={idx} 
                          href={`/lycee/${grade.id}/${subject.name.toLowerCase()}`}
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
                  </>
                )}

                {/* Avec branches (1ère et 2ème Bac) */}
                {grade.branches && (
                  <div className="space-y-6">
                    {grade.branches.map((branch, branchIdx) => (
                      <div key={branchIdx}>
                        <h4 className="font-bold text-gray-800 mb-3 text-lg">
                          {branch.name} - <span className="text-gray-600 text-base">{branch.nameFr}</span>
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {branch.subjects.map((subject, idx) => (
                            <Link 
                              key={idx} 
                              href={`/lycee/${grade.id}/${branch.name.toLowerCase()}/${subject.name.toLowerCase()}`}
                              className="group"
                            >
                              <div className={`${subject.color} p-4 rounded-lg hover:shadow-md transition-all cursor-pointer`}>
                                <div className="text-3xl mb-2">{subject.icon}</div>
                                <div className="font-semibold text-sm">{subject.name}</div>
                                <div className="text-xs opacity-80">{subject.nameFr}</div>
                                <div className="flex items-center gap-1 mt-2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                  <span>View</span>
                                  <ArrowRight className="w-3 h-3" />
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}