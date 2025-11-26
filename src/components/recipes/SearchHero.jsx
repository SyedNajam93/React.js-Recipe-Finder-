import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SearchHero({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const suggestions = ['Pasta', 'Chicken', 'Salad', 'Dessert', 'Soup'];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl" />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 text-6xl opacity-20"
        >
          🍕
        </motion.div>
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 text-5xl opacity-20"
        >
          🥗
        </motion.div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Discover delicious recipes
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Find Your Next
            <span className="block text-amber-200">Favorite Meal</span>
          </h1>
          
          <p className="text-lg text-orange-100 mb-10 max-w-2xl mx-auto">
            Search thousands of recipes from around the world. Get ingredients, 
            step-by-step instructions, and cooking inspiration.
          </p>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-white rounded-2xl blur-xl opacity-30 group-hover:opacity-40 transition-opacity" />
              <div className="relative flex gap-2 bg-white p-2 rounded-2xl shadow-2xl shadow-orange-900/20">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search for recipes, ingredients..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <Button 
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 h-auto rounded-xl font-semibold shadow-lg shadow-orange-500/30 transition-all hover:scale-105"
                >
                  Search
                </Button>
              </div>
            </div>
          </form>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <span className="text-orange-200 text-sm">Popular:</span>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setQuery(suggestion);
                  onSearch(suggestion);
                }}
                className="text-sm text-white bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-full transition-colors backdrop-blur-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}