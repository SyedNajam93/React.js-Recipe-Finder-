import React from 'react';
import { motion } from 'framer-motion';
import RecipeCard from './RecipeCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function RecipeGrid({ recipes, loading, onSelectRecipe }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm">
            <Skeleton className="aspect-[4/3] w-full" />
            <div className="p-5">
              <Skeleton className="h-6 w-3/4 mb-3" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div 
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {recipes.map((recipe, index) => (
        <RecipeCard 
          key={recipe.idMeal} 
          recipe={recipe} 
          index={index}
          onClick={() => onSelectRecipe(recipe)}
        />
      ))}
    </motion.div>
  );
}