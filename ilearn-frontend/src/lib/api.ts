const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = {
  // Auth endpoints
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    logout: `${API_BASE_URL}/auth/logout`,
    me: `${API_BASE_URL}/auth/me`,
  },
  
  // School endpoints
  schools: {
    list: `${API_BASE_URL}/schools`,
    byId: (id: string) => `${API_BASE_URL}/schools/${id}`,
  },
  
  // Class endpoints
  classes: {
    list: `${API_BASE_URL}/classes`,
    bySchool: (schoolId: string) => `${API_BASE_URL}/classes/school/${schoolId}`,
    byId: (id: string) => `${API_BASE_URL}/classes/${id}`,
  },
  
  // Course endpoints
  courses: {
    list: `${API_BASE_URL}/courses`,
    byClass: (classId: string) => `${API_BASE_URL}/courses/class/${classId}`,
    byId: (id: string) => `${API_BASE_URL}/courses/${id}`,
  },
  
  // Resource endpoints
  resources: {
    list: `${API_BASE_URL}/resources`,
    byCourse: (courseId: string) => `${API_BASE_URL}/resources/course/${courseId}`,
    byId: (id: string) => `${API_BASE_URL}/resources/${id}`,
  },
  
  // User endpoints
  users: {
    list: `${API_BASE_URL}/users`,
    byId: (id: string) => `${API_BASE_URL}/users/${id}`,
    update: (id: string) => `${API_BASE_URL}/users/${id}`,
  },
};

// Helper pour les requêtes avec token
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Une erreur est survenue' }));
    throw new Error(error.message || 'Erreur réseau');
  }

  return response.json();
}