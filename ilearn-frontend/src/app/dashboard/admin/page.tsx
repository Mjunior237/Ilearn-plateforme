'use client';

import { useState, useEffect } from 'react';


import {
  Upload,
  BookOpen,
  FileText,
  Users,
  Video,
  Archive,
  Article,
  Link  as LinkIcon,
  Download,
  Trash2,
  Edit,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Loader2,
  Eye,
  FileUp,
  Globe,
  Lock
} from 'lucide-react';
type ResourceType = 'VIDEO' | 'DOCUMENT' | 'SIMULATION' | 'ARCHIVE' | 'ARTICLE' | 'LINK';
type TargetLevel = 'PRIMARY' | 'SECONDARY' | 'SUPERIOR' | 'ALL';
interface Resource {
  id: number;
  title: string;
  description?: string;
  type:  ResourceType; 
  targetLevel: TargetLevel;
  subject?: string;
  author?: string;
  url?: string;
  filePath?: string;
  isPublic: boolean;
  viewsCount: number;
  createdAt: string;
}

interface UserStats {
  total: number;
  students: number;
  teachers: number;
  admins: number;
}

const API_URL = 'http://localhost:5000/api';

export default function AdminDashboard() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    total: 0,
    students: 0,
    teachers: 0,
    admins: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'DOCUMENT' as 'DOCUMENT' | 'VIDEO' | 'SIMULATION' | 'ARCHIVE' | 'ARTICLE' | 'LINK',
    targetLevel: 'ALL' as 'PRIMARY' | 'SECONDARY' | 'SUPERIOR' | 'ALL',
    subject: '',
    author: '',
    source: '',
    url: '',
    isPublic: true
  });

  // ✅ Fetch data from backend - CORRIGÉ
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      
      console.log('🔍 Fetching resources...');
      
      // Fetch resources
      const resourcesRes = await fetch(`${API_URL}/resources`, {
        headers: {
          'Authorization': `Bearer ${token || ''}`
        }
      });
      
      if (!resourcesRes.ok) {
        console.error('Failed to fetch resources:', resourcesRes.status);
      }
      
      const resourcesData = await resourcesRes.json();
      
      console.log('📦 Raw data from backend:', resourcesData);
      
      // Adjust based on your API response structure
      const resourcesList = Array.isArray(resourcesData) ? resourcesData : 
                           (resourcesData.data || []);
      
      console.log('✅ Resources loaded:', resourcesList.length);
      setResources(resourcesList);
      
      // Fetch user stats (optional endpoint)
      try {
        const statsRes = await fetch(`${API_URL}/users/stats`, {
          headers: {
            'Authorization': `Bearer ${token || ''}`
          }
        });
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setUserStats(statsData);
        }
      } catch (error) {
        console.log('⚠️ User stats not available yet');
      }
      
    } catch (error) {
      console.error('❌ Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // ✅ Handle upload - CORRIGÉ
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation pour LINK type
    if (formData.type === 'LINK' && !formData.url) {
      alert('Please provide a URL for link type resources');
      return;
    }
    
    // Validation pour autres types
    if (formData.type !== 'LINK' && !selectedFile) {
      alert('Please select a file');
      return;
    }

    const formDataToSend = new FormData();
    
    // Ajouter le fichier seulement si ce n'est pas un LINK
    if (selectedFile && formData.type !== 'LINK') {
      formDataToSend.append('file', selectedFile);
    }
    
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('type', formData.type);
    formDataToSend.append('targetLevel', formData.targetLevel);
    formDataToSend.append('subject', formData.subject);
    formDataToSend.append('author', formData.author);
    formDataToSend.append('source', formData.source);
    formDataToSend.append('url', formData.url);
    formDataToSend.append('isPublic', String(formData.isPublic));

    console.log('📤 Uploading with data:', {
      title: formData.title,
      type: formData.type,
      targetLevel: formData.targetLevel,
      subject: formData.subject,
      hasFile: !!selectedFile
    });

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('You must be logged in to upload');
        return;
      }

      const response = await fetch(`${API_URL}/resources/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('❌ Upload failed:', data);
        throw new Error(data.error || 'Upload failed');
      }

      console.log('✅ Upload success:', data);
      alert('Resource uploaded successfully!');
      setShowUploadModal(false);
      resetForm();
      fetchData(); // ✅ Recharger les données
    } catch (error: any) {
      console.error('❌ Error uploading:', error);
      alert(`Upload failed: ${error.message}`);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/resources/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token || ''}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        alert('Resource deleted successfully!');
        fetchData();
      } else {
        const result = await response.json();
        alert(result.error || 'Delete failed!');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Delete failed!');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'DOCUMENT',
      targetLevel: 'ALL',
      subject: '',
      author: '',
      source: '',
      url: '',
      isPublic: true
    });
    setSelectedFile(null);
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (resource.subject?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (resource.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesLevel = filterLevel === 'all' || resource.targetLevel === filterLevel;
    const matchesType = filterType === 'all' || resource.type === filterType;
    
    return matchesSearch && matchesLevel && matchesType;
  });

  // Helper function to get icon for resource type
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

  // Helper function to get color for resource type
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'VIDEO': return 'bg-red-100 text-red-700';
      case 'DOCUMENT': return 'bg-blue-100 text-blue-700';
      case 'ARTICLE': return 'bg-green-100 text-green-700';
      case 'ARCHIVE': return 'bg-yellow-100 text-yellow-700';
      case 'LINK': return 'bg-purple-100 text-purple-700';
      case 'SIMULATION': return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Helper function to get color for level
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'PRIMARY': return 'bg-blue-100 text-blue-700';
      case 'SECONDARY': return 'bg-green-100 text-green-700';
      case 'SUPERIOR': return 'bg-purple-100 text-purple-700';
      case 'ALL': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Calculate stats
  const totalResources = resources.length;
  const totalDocuments = resources.filter(r => r.type === 'DOCUMENT').length;
  const totalVideos = resources.filter(r => r.type === 'VIDEO').length;
  const totalViews = resources.reduce((sum, r) => sum + (r.viewsCount || 0), 0);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      {/* ✅ DASHBOARD HEADER */}
    

      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-xl opacity-90">Manage Resources & Users</p>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Resources */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Resources</p>
                <p className="text-3xl font-bold text-blue-600">{totalResources}</p>
                <p className="text-sm text-gray-500 mt-1">{totalViews.toLocaleString()} total views</p>
              </div>
              <BookOpen className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Documents</p>
                <p className="text-3xl font-bold text-green-600">{totalDocuments}</p>
                <p className="text-sm text-gray-500 mt-1">PDF, DOC, PPT, etc.</p>
              </div>
              <FileText className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>

          {/* Videos */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Videos</p>
                <p className="text-3xl font-bold text-red-600">{totalVideos}</p>
                <p className="text-sm text-gray-500 mt-1">MP4, AVI, etc.</p>
              </div>
              <Video className="w-12 h-12 text-red-600 opacity-20" />
            </div>
          </div>

          {/* Users */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-purple-600">{userStats.total}</p>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {userStats.students} Students
                  </span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    {userStats.teachers} Teachers
                  </span>
                </div>
              </div>
              <Users className="w-12 h-12 text-purple-600 opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Actions & Filters */}
      <section className="max-w-7xl mx-auto px-4 py-8 flex-1">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources by title, subject, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 w-full md:w-auto">
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Levels</option>
                <option value="PRIMARY">Primary</option>
                <option value="SECONDARY">Secondary</option>
                <option value="SUPERIOR">Superior</option>
                <option value="ALL">All</option>
              </select>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="DOCUMENT">Document</option>
                <option value="VIDEO">Video</option>
                <option value="ARTICLE">Article</option>
                <option value="ARCHIVE">Archive</option>
                <option value="LINK">Link</option>
                <option value="SIMULATION">Simulation</option>
              </select>

              {/* Upload Button */}
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <Upload className="w-5 h-5" />
                Upload Resource
              </button>
            </div>
          </div>
        </div>

        {/* Resources List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              All Resources ({filteredResources.length})
            </h2>
            <div className="text-sm text-gray-500">
              Showing {filteredResources.length} of {resources.length} resources
            </div>
          </div>

          {isLoading ? (
            <div className="p-12 text-center">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading resources...</p>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">No resources found</p>
              <p className="text-sm text-gray-500">
                {resources.length === 0 
                  ? "Upload your first resource to get started!" 
                  : "Try changing your search or filter criteria"}
              </p>
              <button
                onClick={() => setShowUploadModal(true)}
                className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <Upload className="w-4 h-4 inline mr-2" />
                Upload Resource
              </button>
            </div>
          ) : (
            <div className="divide-y">
              {filteredResources.map((resource) => (
                <div key={resource.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(resource.type)}
                          <h3 className="text-lg font-bold text-gray-800">{resource.title}</h3>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(resource.targetLevel)}`}>
                          {resource.targetLevel}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(resource.type)}`}>
                          {resource.type}
                        </span>
                        {resource.isPublic ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            Public
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            Private
                          </span>
                        )}
                      </div>
                      
                      {resource.description && (
                        <p className="text-gray-600 mb-3">{resource.description}</p>
                      )}
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        {resource.subject && (
                          <span className="flex items-center gap-1">
                            <span className="font-medium">Subject:</span> {resource.subject}
                          </span>
                        )}
                        
                        {resource.author && (
                          <span className="flex items-center gap-1">
                            <span className="font-medium">Author:</span> {resource.author}
                          </span>
                        )}
                        
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {(resource.viewsCount || 0) > 0 && resource.viewsCount.toLocaleString()} views
                        </span>
                        
                        <span className="flex items-center gap-1">
                          <span className="font-medium">Uploaded:</span> 
                          {new Date(resource.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      {(resource.filePath || resource.url) && (
                        <button
                          onClick={() => {
                            if (resource.filePath) {
                              window.open(`http://localhost:5000${resource.filePath}`, '_blank');
                            } else if (resource.url) {
                              window.open(resource.url, '_blank');
                            }
                          }}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                          title="View/Download"
                        >
                          <Download className="w-5 h-5 text-blue-600" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleDelete(resource.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-2xl font-bold">Upload New Resource</h2>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  resetForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resource Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Introduction to Algebra"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of the resource..."
                />
              </div>

              {/* Level & Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Level *
                  </label>
                  <select
                    required
                    value={formData.targetLevel}
                    onChange={(e) => setFormData({
                      ...formData, 
                      targetLevel: e.target.value as typeof formData.targetLevel
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ALL">All Levels</option>
                    <option value="PRIMARY">Primary</option>
                    <option value="SECONDARY">Secondary</option>
                    <option value="SUPERIOR">Superior</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resource Type *
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({
                      ...formData, 
                      type: e.target.value as typeof formData.type
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="DOCUMENT">Document</option>
                    <option value="VIDEO">Video</option>
                    <option value="ARTICLE">Article</option>
                    <option value="ARCHIVE">Archive</option>
                    <option value="SIMULATION">Simulation</option>
                    <option value="LINK">External Link</option>
                  </select>
                </div>
              </div>

              {/* Subject & Author */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Mathematics, Physics"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Author name"
                  />
                </div>
              </div>

              {/* Source & URL */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Source
                  </label>
                  <input
                    type="text"
                    value={formData.source}
                    onChange={(e) => setFormData({...formData, source: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Source (e.g., Publisher)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL {formData.type === 'LINK' && '*'}
                  </label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({...formData, url: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com"
                    required={formData.type === 'LINK'}
                  />
                </div>
              </div>

              {/* File Upload */}
              {formData.type !== 'LINK' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload File *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      onChange={handleFileSelect}
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.avi,.mov,.zip,.rar,.txt"
                      className="hidden"
                      id="file-upload"
                      required={formData.type !== 'LINK'}
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <FileUp className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-700 font-medium mb-1">
                        {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-sm text-gray-500">
                        PDF, DOC, PPT, Video, Archive (Max 100MB)
                      </p>
                    </label>
                  </div>
                  {selectedFile && (
                    <p className="text-sm text-gray-600 mt-2">
                      Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>
              )}

              {/* Visibility */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isPublic" className="ml-2 text-sm text-gray-700 flex items-center gap-1">
                  {formData.isPublic ? (
                    <>
                      <Globe className="w-4 h-4 text-green-600" />
                      Make this resource public (visible to all users)
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-red-600" />
                      Make this resource private (admin only)
                    </>
                  )}
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Upload Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ✅ FOOTER */}
      
    </div>
  );
}