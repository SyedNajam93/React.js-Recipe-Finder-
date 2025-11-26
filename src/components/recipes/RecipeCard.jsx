import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, ChefHat, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function RecipeCard({ recipe, index, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Floating action button */}
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <ArrowRight className="w-5 h-5 text-orange-600" />
          </div>
        </motion.div>

        {/* Category Badge */}
        {recipe.strCategory && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white shadow-sm px-3 py-1">
              {recipe.strCategory}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {recipe.strMeal}
        </h3>
        
        {recipe.strArea && (
          <p className="text-sm text-gray-500 mb-4 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center">
              <ChefHat className="w-3 h-3 text-orange-600" />
            </span>
            {recipe.strArea} Cuisine
          </p>
        )}

        <div className="flex items-center gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>30 min</span>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
            <Users className="w-3.5 h-3.5 text-gray-400" />
            <span>4 servings</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}