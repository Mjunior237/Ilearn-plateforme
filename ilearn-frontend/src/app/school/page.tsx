'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Building2, MapPin, Users, Award, CheckCircle, Star, Globe, Phone, Mail } from 'lucide-react';

export default function SchoolsPage() {
  const schools = [
    {
      id: 1,
      name: 'International School of Excellence',
      nameFr: 'École Internationale d\'Excellence',
      city: 'Paris',
      country: 'France',
      logo: '🏫',
      students: 1200,
      level: 'Primary - High School',
      rating: 4.8,
      established: 2010,
      description: 'Leading institution focused on international education and digital learning.',
      features: ['Smart Classrooms', 'Virtual Labs', 'AI Learning Tools', 'Online Library'],
      contact: {
        phone: '+33 1 23 45 67 89',
        email: 'contact@ise-paris.edu',
        website: 'www.ise-paris.edu'
      }
    },
    {
      id: 2,
      name: 'Academy of Science & Technology',
      nameFr: 'Académie des Sciences et Technologies',
      city: 'Lyon',
      country: 'France',
      logo: '🎓',
      students: 850,
      level: 'Middle - High School',
      rating: 4.7,
      established: 2015,
      description: 'Specialized in STEM education with advanced virtual learning environment.',
      features: ['VLE Platform', '3D Simulations', 'Coding Labs', 'Robotics Club'],
      contact: {
        phone: '+33 4 78 90 12 34',
        email: 'info@ast-lyon.edu',
        website: 'www.ast-lyon.edu'
      }
    },
    {
      id: 3,
      name: 'Global Learning Center',
      nameFr: 'Centre d\'Apprentissage Global',
      city: 'Marseille',
      country: 'France',
      logo: '🌍',
      students: 950,
      level: 'Primary - University',
      rating: 4.9,
      established: 2008,
      description: 'Comprehensive education from primary to university with i-Learn platform.',
      features: ['Full Integration', 'Bilingual Program', 'Online Resources', 'Parent Portal'],
      contact: {
        phone: '+33 4 91 23 45 67',
        email: 'hello@glc-marseille.edu',
        website: 'www.glc-marseille.edu'
      }
    },
    {
      id: 4,
      name: 'Future Leaders Academy',
      nameFr: 'Académie des Futurs Leaders',
      city: 'Toulouse',
      country: 'France',
      logo: '🚀',
      students: 720,
      level: 'High School',
      rating: 4.6,
      established: 2018,
      description: 'Preparing tomorrow\'s leaders with cutting-edge digital education.',
      features: ['Leadership Program', 'Virtual Mentoring', 'Digital Portfolio', 'Career Guidance'],
      contact: {
        phone: '+33 5 61 12 34 56',
        email: 'admin@fla-toulouse.edu',
        website: 'www.fla-toulouse.edu'
      }
    },
    {
      id: 5,
      name: 'Smart Education Institute',
      nameFr: 'Institut d\'Éducation Intelligente',
      city: 'Nice',
      country: 'France',
      logo: '💡',
      students: 680,
      level: 'Primary - Middle School',
      rating: 4.7,
      established: 2012,
      description: 'Innovation-focused school using AI and VLE for personalized learning.',
      features: ['AI Tutoring', 'Adaptive Learning', 'Gamification', 'Progress Analytics'],
      contact: {
        phone: '+33 4 93 45 67 89',
        email: 'contact@sei-nice.edu',
        website: 'www.sei-nice.edu'
      }
    },
    {
      id: 6,
      name: 'Green Valley School',
      nameFr: 'École de la Vallée Verte',
      city: 'Bordeaux',
      country: 'France',
      logo: '🌳',
      students: 540,
      level: 'Primary - High School',
      rating: 4.5,
      established: 2016,
      description: 'Eco-friendly campus with comprehensive digital learning infrastructure.',
      features: ['Eco Campus', 'Digital Library', 'Virtual Field Trips', 'Green Projects'],
      contact: {
        phone: '+33 5 56 78 90 12',
        email: 'info@gvs-bordeaux.edu',
        website: 'www.gvs-bordeaux.edu'
      }
    },
  ];

  const stats = [
    { icon: Building2, value: '50+', label: 'Partner Schools', labelFr: 'Écoles Partenaires' },
    { icon: Users, value: '15,000+', label: 'Total Students', labelFr: 'Étudiants' },
    { icon: Globe, value: '12', label: 'Countries', labelFr: 'Pays' },
    { icon: Award, value: '98%', label: 'Satisfaction', labelFr: 'Satisfaction' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-12 h-12" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Partner Schools</h1>
              <p className="text-xl opacity-90">Établissements Partenaires</p>
            </div>
          </div>
          <p className="text-lg opacity-90 max-w-3xl">
            Leading educational institutions using i-Learn to deliver world-class education
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <stat.icon className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.labelFr}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Schools Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12 flex-1">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Partner Institutions</h2>
          <p className="text-gray-600">Nos Établissements Partenaires</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {schools.map((school) => (
            <div key={school.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group">
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-6">
                <div className="text-5xl mb-3">{school.logo}</div>
                <h3 className="text-xl font-bold mb-1">{school.name}</h3>
                <p className="text-sm opacity-90">{school.nameFr}</p>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Location */}
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{school.city}, {school.country}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-gray-800">{school.rating}</span>
                  <span className="text-sm text-gray-500">/ 5.0</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-orange-600">{school.students}</div>
                    <div className="text-xs text-gray-600">Students</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-lg font-bold text-orange-600">{school.established}</div>
                    <div className="text-xs text-gray-600">Established</div>
                  </div>
                </div>

                {/* Level */}
                <div className="mb-4">
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                    {school.level}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {school.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-2 text-sm">Key Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {school.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                        <CheckCircle className="w-3 h-3" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{school.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{school.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-600">
                    <Globe className="w-4 h-4" />
                    <a href={`https://${school.contact.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {school.contact.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Want Your School to Join i-Learn?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Rejoignez notre réseau d'établissements partenaires
          </p>
          <button className="px-8 py-4 bg-white text-orange-600 rounded-lg font-bold hover:shadow-xl transition-all">
            Become a Partner School
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
