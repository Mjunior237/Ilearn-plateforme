'use client';

import Link from 'next/link';
import { Menu, X, BookOpen, Search, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import app from 'next/app';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLevelsOpen, setIsLevelsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', labelFr: 'Accueil' },
    { 
      href: '#', 
      label: 'Levels', 
      labelFr: 'Niveaux',
      hasDropdown: true,
      submenu: [
        { href: '/primaire', label: 'Primary', labelFr: 'Primaire' },
        { href: '/college', label: 'Middle School', labelFr: 'Collège' },
        { href: '/lycee', label: 'High School', labelFr: 'Lycée' },
        { href: '/school', label: 'University', labelFr: 'Supérieur' },
      ]
    },
    { href: '/courses', label: 'Courses', labelFr: 'Cours' },
    { href: '..//resource', label: 'Resources', labelFr: 'Ressources' },
    { href: '../../app/about', label: 'About', labelFr: 'À propos' },
    { href: '../../app/contact', label: 'Contact', labelFr: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/90 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                i-Learn
              </h1>
              <p className="text-xs text-gray-600">Smart Learning Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <div key={index} className="relative group">
                {link.hasDropdown ? (
                  <>
                    <button
                      onMouseEnter={() => setIsLevelsOpen(true)}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 flex items-center gap-1"
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {isLevelsOpen && (
                      <div 
                        onMouseEnter={() => setIsLevelsOpen(true)}
                        onMouseLeave={() => setIsLevelsOpen(false)}
                        className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-fade-in"
                      >
                        {link.submenu?.map((sublink, subIndex) => (
                          <Link
                            key={subIndex}
                            href={sublink.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            <div className="font-medium">{sublink.label}</div>
                            <div className="text-xs text-gray-500">{sublink.labelFr}</div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search Button */}
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>

            {/* Login Button */}
            <Link 
              href="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="text-sm font-medium">Login</span>
            </Link>

            {/* Sign Up Button */}
            <Link 
              href="/register"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Sign Up Free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-2 animate-slide-up border-t">
            {navLinks.map((link, index) => (
              <div key={index}>
                {link.hasDropdown ? (
                  <div>
                    <div className="px-4 py-3 text-sm font-semibold text-gray-500 uppercase">
                      {link.label}
                    </div>
                    {link.submenu?.map((sublink, subIndex) => (
                      <Link
                        key={subIndex}
                        href={sublink.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex justify-between items-center px-6 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
                      >
                        <span className="font-medium">{sublink.label}</span>
                        <span className="text-sm text-gray-500">{sublink.labelFr}</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex justify-between items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
                  >
                    <span className="font-medium">{link.label}</span>
                    <span className="text-sm text-gray-500">{link.labelFr}</span>
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile Actions */}
            <div className="pt-4 px-4 space-y-2 border-t">
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                <User className="w-5 h-5" />
                Login
              </Link>
              <Link
                href="/register"
                className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Sign Up Free
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}