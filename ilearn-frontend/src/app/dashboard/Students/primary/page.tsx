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
  Article,
  Search,
  Eye,
  Loader2
} from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

export default function StudentPrimaryDashboard() {
  const [resources, setResources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { title: 'Courses', value: '5', icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
    { title: 'Lessons Done', value: '18', icon: Award, color: 'from-green-500 to-emerald-500' },
    { title: 'Progress', value: '60%', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
    { title: 'Study Time', value: '8h', icon: Clock, color: 'from-orange-500 to-red-500' },
  ];

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await fetch(`${API_URL}/resources`);
      const data = await response.json();
      const resourcesList = Array.isArray(data) ? data : (data.data || []);
      
      // Filtrer pour le niveau PRIMARY
      const primaryResources = resourcesList.filter((r: any) => 
        r.isPublic && (r.targetLevel === 'PRIMARY' || r.targetLevel === 'ALL')
      );
      
      setResources(primaryResources);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openResource = (resource: any) => {
    if (resource.filePath) {
      window.open(`${API_URL}${resource.filePath}`, '_blank');
    } else if (resource.url) {
      window.open(resource.url, '_blank');
    }
  };

  const filteredResources = resources.filter(r =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      

      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Primary Student Dashboard</h1>
          <p className="opacity-90 mt-2">Welcome back, keep learning!</p>
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

      {/* RESSOURCES */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">📚 My Learning Resources</h2>
        
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Resources Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No resources available yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <h3 className="font-bold text-lg">{resource.title}</h3>
                </div>
                {resource.description && (
                  <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    <Eye className="w-4 h-4 inline mr-1" />
                    {(resource.viewsCount || 0).toLocaleString()} views
                  </span>
                  <button
                    onClick={() => openResource(resource)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Open
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      
    </div>
  );
}