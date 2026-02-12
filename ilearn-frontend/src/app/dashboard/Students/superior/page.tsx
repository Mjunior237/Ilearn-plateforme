'use client';

import { useState, useEffect } from 'react';

import {
  BookOpen,
  FileText,
  PlayCircle,
  Download,
  MessageCircle,
  Video,
  Archive,
  Article,
  Link as LinkIcon,
  Search,
  Eye,
  Loader2,
  Filter
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

export default function StudentSuperiorDashboard() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');

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
      
      // Filtrer pour le niveau SUPERIOR
      const superiorResources = resourcesList.filter((r: Resource) => 
        r.isPublic && (r.targetLevel === 'SUPERIOR' || r.targetLevel === 'ALL')
      );
      
      setResources(superiorResources);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openResource = (resource: Resource) => {
    if (resource.type === 'LINK' && resource.url) {
      window.open(resource.url, '_blank');
    } else if (resource.filePath) {
      window.open(`${API_URL}${resource.filePath}`, '_blank');
    }
    
    // Incrémenter le compteur de vues
    fetch(`${API_URL}/resources/${resource.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      }
    }).catch(err => console.error('Error incrementing views:', err));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'VIDEO': return <Video className="w-5 h-5" />;
      case 'DOCUMENT': return <FileText className="w-5 h-5" />;
      case 'ARTICLE': return <Article className="w-5 h-5" />;
      case 'ARCHIVE': return <Archive className="w-5 h-5" />;
      case 'LINK': return <LinkIcon className="w-5 h-5" />;
      case 'SIMULATION': return <PlayCircle className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  // ✅ SOLUTION: Extraire les sujets sans utiliser Set (compatible ES5)
  const getUniqueSubjects = () => {
    const subjects: string[] = ['all'];
    
    resources.forEach(resource => {
      if (resource.subject && !subjects.includes(resource.subject)) {
        subjects.push(resource.subject);
      }
    });
    
    return subjects;
  };

  const subjects = getUniqueSubjects();

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (resource.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (resource.subject?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesSubject = filterSubject === 'all' || resource.subject === filterSubject;
    
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-white to-red-50">
      

      {/* HERO */}
      <section className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Superior Student Dashboard</h1>
          <p className="opacity-90 mt-2">Access your academic resources and courses.</p>
        </div>
      </section>

      {/* SERVICES CARDS */}
      <section className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <p className="text-gray-500 text-sm">Active Courses</p>
            <p className="text-2xl font-bold">4</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <p className="text-gray-500 text-sm">Assignments</p>
            <p className="text-2xl font-bold">6</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white mb-4">
              <Download className="w-6 h-6" />
            </div>
            <p className="text-gray-500 text-sm">Resources</p>
            <p className="text-2xl font-bold">{resources.length}</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white mb-4">
              <Eye className="w-6 h-6" />
            </div>
            <p className="text-gray-500 text-sm">Total Views</p>
            <p className="text-2xl font-bold">
              {resources.reduce((sum, r) => sum + (r.viewsCount || 0), 0).toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      {/* RECHERCHE ET FILTRES */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-orange-600" />
            Academic Resources
          </h2>
          
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources by title, description or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            {/* Subject Filter */}
            <div className="relative min-w-[200px]">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
              >
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject === 'all' ? '📚 All Subjects' : `📘 ${subject}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* LISTE DES RESSOURCES */}
      <section className="max-w-7xl mx-auto px-4 pb-12 flex-1">
        {isLoading ? (
          <div className="text-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-orange-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading resources...</p>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-2">No resources available</p>
            <p className="text-sm text-gray-500">
              {searchTerm || filterSubject !== 'all' 
                ? "Try adjusting your search or filters" 
                : "Check back later for new academic materials"}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div 
                key={resource.id} 
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer"
                onClick={() => openResource(resource)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      {getTypeIcon(resource.type)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 line-clamp-2">
                        {resource.title}
                      </h3>
                      {resource.author && (
                        <p className="text-sm text-gray-500">By {resource.author}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {resource.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {resource.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    {resource.subject && (
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                        {resource.subject}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Eye className="w-3 h-3" />
                      {(resource.viewsCount || 0).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openResource(resource);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Access
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