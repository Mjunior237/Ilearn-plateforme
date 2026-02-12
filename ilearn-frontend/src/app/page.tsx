'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { 
  GraduationCap, 
  BookOpen, 
  School, 
  Building2, 
  Star, 
  Users, 
  Award, 
  TrendingUp, 
  FileText, 
  Video, 
  Download, 
  MessageCircle, 
  Trophy,
  CheckCircle,
  PlayCircle,
  Calendar,
  Target,
  Sparkles,
  ArrowRight,
  BookMarked,
  Brain,
  Clock,
  Shield,
 
} from 'lucide-react';

export default function HomePage() {
  // Niveaux scolaires basés sur votre backend (School.model.ts)
  const levels = [
    {
      title: 'Primary School',
      titleAr: 'École Primaire',
      description: 'Fondamentaux scolaires - De la 1ère à la 6ème année',
      icon: School,
      href: '/primaire',
      gradient: 'from-blue-500 to-cyan-500',
      iconEmoji: '👧',
      subjects: [
        { name: 'Mathematics', nameAr: 'Mathématiques', icon: '🔢' },
        { name: 'English', nameAr: 'Anglais', icon: '🇬🇧' },
        { name: 'French', nameAr: 'Français', icon: '🇫🇷' },
        { name: 'Science', nameAr: 'Sciences', icon: '🔬' },
      ],
    },
    {
      title: 'Middle School',
      titleAr: 'Collège',
      description: 'Préparation Brevet - Approfondissement des connaissances',
      icon: BookOpen,
      href: '/college',
      gradient: 'from-green-500 to-emerald-500',
      iconEmoji: '📚',
      subjects: [
        { name: 'Mathematics', nameAr: 'Mathématiques', icon: '📐' },
        { name: 'Physics', nameAr: 'Physique', icon: '⚗️' },
        { name: 'Computer Science', nameAr: 'Informatique', icon: '💻' },
        { name: 'English', nameAr: 'Anglais', icon: '🇬🇧' },
      ],
    },
    {
      title: 'High School',
      titleAr: 'Lycée',
      description: 'Préparation Bac - Excellence académique',
      icon: GraduationCap,
      href: '/lycee',
      gradient: 'from-purple-500 to-pink-500',
      iconEmoji: '🎓',
      subjects: [
        { name: 'Advanced Math', nameAr: 'Maths Avancées', icon: '∑' },
        { name: 'Sciences', nameAr: 'Sciences', icon: '⚛️' },
        { name: 'Literature', nameAr: 'Littérature', icon: '📚' },
        { name: 'Economics', nameAr: 'Économie', icon: '💼' },
      ],
    },
    {
      title: 'Higher Education',
      titleAr: 'Études Supérieures',
      description: 'Cours avancés - Préparation universitaire',
      icon: Building2,
      href: '/superieur',
      gradient: 'from-orange-500 to-red-500',
      iconEmoji: '⚡',
      subjects: [
        { name: 'Engineering', nameAr: 'Ingénierie', icon: '🔧' },
        { name: 'Computer Science', nameAr: 'Informatique', icon: '💾' },
        { name: 'Mathematics', nameAr: 'Mathématiques', icon: '∞' },
        { name: 'Physics', nameAr: 'Physique', icon: '🔭' },
      ],
    },
  ];

  // Statistiques
  const stats = [
    { icon: Users, value: '10,000+', label: 'Active Students', labelAr: 'Étudiants Actifs', color: 'text-blue-300' },
    { icon: Users, value: '500+', label: 'Teachers', labelAr: 'Enseignants', color: 'text-green-300' },
    { icon: TrendingUp, value: '98%', label: 'Success Rate', labelAr: 'Taux de Réussite', color: 'text-yellow-300' },
    { icon: Clock, value: '24/7', label: 'Available', labelAr: 'Disponible', color: 'text-pink-300' },
  ];

  // Services/Fonctionnalités basés sur vos modèles backend
  const features = [
    {
      title: 'HD Video Courses',
      titleAr: 'Cours Vidéo HD',
      description: 'Thousands of courses with subtitles and interactive content',
      icon: Video,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      title: 'Interactive Exercises',
      titleAr: 'Exercices Interactifs',
      description: 'Automatic quizzes and assessments with instant feedback',
      icon: FileText,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600'
    },
    {
      title: 'Personalized Tracking',
      titleAr: 'Suivi Personnalisé',
      description: 'Progress dashboard and performance analytics',
      icon: Target,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      title: 'PDF Resources',
      titleAr: 'Ressources PDF',
      description: 'Downloadable worksheets and study materials',
      icon: Download,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600'
    },
    {
      title: 'Community Forum',
      titleAr: 'Forum Communautaire',
      description: 'Exchange with teachers and other students',
      icon: MessageCircle,
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-100',
      textColor: 'text-indigo-600'
    },
    {
      title: 'Certifications',
      titleAr: 'Certifications',
      description: 'Recognized diplomas and certificates',
      icon: Award,
      color: 'from-yellow-500 to-amber-500',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600'
    },
  ];

  // Points forts
  const highlights = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      titleAr: 'Apprentissage Intelligent',
      description: 'Adaptive courses that adjust to your level'
    },
    {
      icon: Shield,
      title: 'Quality Content',
      titleAr: 'Contenu de Qualité',
      description: 'Validated by educational experts'
    },
    {
      icon: Clock,
      title: 'Learn Anytime',
      titleAr: 'Apprenez à Tout Moment',
      description: 'Access 24/7 on all devices'
    },
  ];

  return (
    <div className="overflow-hidden">
      <Header />

      {/* ========== HERO SECTION ========== */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-6 animate-fade-in">
              <Star className="w-4 h-4 fill-current" />
              <span>#1 Smart Learning Platform</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
              La Plateforme Éducative{' '}
              <span className="text-yellow-300">Intelligente</span>
            </h1>
            
            <p className="text-xl mb-8 opacity-90 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Adaptive courses, interactive resources and personalized support
              for all levels: Primary, Secondary and Higher Education.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link href="/register">
              <button className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-emerald-700 transition text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2">
                <PlayCircle className="w-5 h-5" />
                Start Learning Free
              </button>
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition flex items-center justify-center gap-2">
                <Video className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 text-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>5000+ Exercises</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>1000+ Videos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>No Credit Card Required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== HIGHLIGHTS SECTION ========== */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <highlight.icon className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{highlight.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">{highlight.titleAr}</p>
                  <p className="text-sm text-gray-500">{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== LEVELS SECTION ========== */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              <GraduationCap className="w-4 h-4" />
              <span>All Academic Levels</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Pour Tous les Niveaux
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From primary school to university - complete educational program
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {levels.map((level, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all border cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`bg-gradient-to-br ${level.gradient} w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  {level.iconEmoji}
                </div>
                <h3 className="text-xl font-bold mb-2">{level.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{level.titleAr}</p>
                <p className="text-gray-500 text-sm mb-4">{level.description}</p>
                
                {/* Subjects preview */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {level.subjects.slice(0, 3).map((subject, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {subject.icon}
                    </span>
                  ))}
                </div>

                <a href={level.href} className="text-blue-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Discover <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Advanced Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Fonctionnalités Avancées
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to succeed in your academic journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border group animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.textColor}`} />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{feature.titleAr}</p>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section className="py-16 bg-gradient-to-r from-blue-800 via-purple-800 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <stat.icon className="w-10 h-10 mx-auto mb-3 opacity-80" />
                <div className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
                <div className="text-gray-400 text-sm">{stat.labelAr}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
            What Our Students Say
          </h2>
          <p className="text-center text-gray-600 mb-12">Ce Que Disent Nos Apprenants</p>
          
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-xl">
            <div className="flex mb-4 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <div className="text-gray-700 italic text-lg mb-6">
              "Thanks to i-Learn, my daughter improved her grades by 3 points in just 2 months. 
              The courses are clear and the exercises very useful."
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                MD
              </div>
              <div className="ml-4">
                <div className="font-bold">Kuete Jean</div>
                <div className="text-gray-600">Parent - Douala, Cameroun</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-16 bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-500 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-6">
            <Trophy className="w-4 h-4" />
            <span>Join 10,000+ Successful Students</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl md:text-2xl mb-3 opacity-90">
            Prêt à Transformer Votre Apprentissage ?
          </p>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of learners who have already revolutionized their educational journey
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Create Free Account
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-emerald-600 transition flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              View Pricing
            </button>
          </div>

          <p className="text-sm opacity-80 flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            No credit card required • 30-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}