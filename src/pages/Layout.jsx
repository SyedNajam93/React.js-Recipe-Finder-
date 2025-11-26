
import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { ChefHat, Github, Heart } from 'lucide-react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 backdrop-blur-lg bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to={createPageUrl('Home')} 
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                RecipeFinder
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link 
                to={createPageUrl('Home')} 
                className="text-gray-600 hover:text-orange-600 transition-colors font-medium"
              >
                Home
              </Link>
              <a 
                href="https://www.themealdb.com/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-orange-600 transition-colors font-medium"
              >
                API
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                <ChefHat className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">RecipeFinder</span>
            </div>
            
            <p className="text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using TheMealDB API
            </p>

            <p className="text-sm">
              © {new Date().getFullYear()} All recipes from TheMealDB
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
