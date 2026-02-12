'use client';

import Link from 'next/link';
import { Mail, Heart, Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">i-Learn</h3>
            <p className="text-gray-300 text-sm">
              Your complete smart learning platform.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-blue-300">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/primaire" className="text-gray-300 hover:text-blue-400">Primary</Link></li>
              <li><Link href="/college" className="text-gray-300 hover:text-blue-400">Middle School</Link></li>
              <li><Link href="/lycee" className="text-gray-300 hover:text-blue-400">High School</Link></li>
              <li><Link href="/superieur" className="text-gray-300 hover:text-blue-400">University</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-blue-300">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/courses" className="text-gray-300 hover:text-orange-400">Courses</Link></li>
              <li><Link href="/exercises" className="text-gray-300 hover:text-orange-400">Exercises</Link></li>
              <li><Link href="/exams" className="text-gray-300 hover:text-orange-400">Exams</Link></li>
              <li><Link href="/videos" className="text-gray-300 hover:text-orange-400">Videos</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-blue-300">Contact</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contact@ilearn.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+237 688113676</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© {currentYear} i-Learn. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}