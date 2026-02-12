'use client';

import { useState, useEffect } from 'react';

import {
  BookOpen,
  FileText,
  TrendingUp,
  Clock,
  Award,
  PlayCircle,
  Download,
  MessageCircle,
  Monitor,
  Video,
  Archive,
  Article,
  Link as LinkIcon,
  Search,
  Eye,
  Globe,
  Loader2
} from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  description?: string;
  type: 'VIDEO' | 'DOCUMENT' | 'SIMULATION' | 'ARCHIVE' | 'ARTICLE' | 'LINK';
  targetLevel: 'PRIMARY' | 'SECONDARY' | 'SUPERIOR' | 'ALL';
  subject?: string;
  author?: string;
  url?: string;
  filePath?: string;
  isPublic: boolean;
  viewsCount: number;
  createdAt: string;
}

const API_URL = 'http://localhost:5000/api';

export default function StudentSecondaryDashboard() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const stats = [
    { title: 'Courses', value: '7', icon: BookOpen, color: 'from-green-500 to-emerald-500' },
    { title: 'Lessons Done', value: '42', icon: Award, color: 'from-blue-500 to-cyan-500' },
    { title: 'Progress', value: '78%', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
    { title: 'Study Time', value: '15h', icon: Clock, color: 'from-orange-500 to-red-500' },
  ];

  const services = [
    { title: 'My Courses', description: 'Continue learning', icon: PlayCircle },
    { title: 'Exercises', description: 'Practice quizzes', icon: FileText },
    { title: 'Resources', description: 'Download resources', icon: Download },
    { title: 'Messages', description: 'Chat with teachers', icon: MessageCircle },
    { title: 'Virtual Learning', description: 'Live classes', icon: Monitor },
  ];

  // ✅ FETCH RESOURCES pour le niveau SECONDARY
  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_URL}/resources`, {
        headers: {
          'Authorization': `Bearer ${token || ''}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch');
      
      const data = await response.json();
      const resourcesList = Array.isArray(data) ? data : (data.data || []);
      
      // ✅ Filtrer pour le niveau SECONDARY et PUBLIC
      const secondaryResources = resourcesList.filter((r: Resource) => 
        r.isPublic && (r.targetLevel === 'SECONDARY' || r.targetLevel === 'ALL')
      );
      
      setResources(secondaryResources);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Fonction pour ouvrir/télécharger une ressource
  const openResource = (resource: Resource) => {
    if (resource.filePath) {
      window.open(`${API_URL}${resource.filePath}`, '_blank');
    } else if (resource.url) {
      window.open(resource.url, '_blank');
    }
    
    // Incrémenter le compteur de vues (optionnel)
    fetch(`${API_URL}/resources/${resource.id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      }
    }).catch(err => console.error('Error incrementing views:', err));
  };

  // ✅ Icône selon le type de ressource
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'VIDEO': return <Video className="w-5 h-5" />;
      case 'DOCUMENT': return <FileText className="w-5 h-5" />;
      case 'ARTICLE': return <Article className="w-5 h-5" />;
      case 'ARCHIVE': return <Archive className="w-5 h-5" />;
      case 'LINK': return <LinkIcon className="w-5 h-5" />;
      case 'SIMULATION': return <Globe className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  // ✅ Filtrage des ressources
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (resource.subject?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || resource.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-emerald-50">
      

      {/* HERO */}
      <section className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Secondary Student Dashboard</h1>
          <p className="opacity-90 mt-2">Stay consistent, success is near.</p>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4`}>
                <stat.icon />
              </div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Learning Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
              <service.icon className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="font-bold">{service.title}</h3>
              <p className="text-sm text-gray-500">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 📚 SECTION RESSOURCES DISPONIBLES */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-green-600" />
              Available Resources for Secondary
            </h2>
          </div>

          {/* Barre de recherche et filtre */}
          <div className="p-4 border-b bg-gray-50">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Types</option>
                <option value="DOCUMENT">Documents</option>
                <option value="VIDEO">Videos</option>
                <option value="ARTICLE">Articles</option>
                <option value="LINK">Links</option>
              </select>
            </div>
          </div>

          {/* Liste des ressources */}
          {isLoading ? (
            <div className="p-12 text-center">
              <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading resources...</p>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="p-12 text-center">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No resources available yet</p>
              <p className="text-sm text-gray-500 mt-2">
                Check back later for new learning materials
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredResources.map((resource) => (
                <div key={resource.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(resource.type)}
                          <h3 className="text-lg font-bold text-gray-800">{resource.title}</h3>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          {resource.type}
                        </span>
                        {resource.subject && (
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                            {resource.subject}
                          </span>
                        )}
                      </div>
                      
                      {resource.description && (
                        <p className="text-gray-600 mb-3">{resource.description}</p>
                      )}
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        {resource.author && (
                          <span>By: {resource.author}</span>
                        )}
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {(resource.viewsCount || 0).toLocaleString()} views
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => openResource(resource)}
                      className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Access
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}