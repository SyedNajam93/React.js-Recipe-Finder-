import React from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Clock, 
  Users, 
  ChefHat, 
  MapPin, 
  Play,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function RecipeModal({ recipe, onClose }) {
  // Extract ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure });
    }
  }

  // Split instructions into steps
  const instructions = recipe.strInstructions
    ?.split(/\r\n|\n/)
    .filter(step => step.trim())
    .map(step => step.trim());

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl my-8"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Left Column - Image */}
          <div className="lg:w-2/5 relative">
            <div className="aspect-square lg:aspect-auto lg:h-full">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden" />
            </div>
            
            {/* Mobile title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:hidden">
              <h1 className="text-2xl font-bold text-white">{recipe.strMeal}</h1>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:w-3/5 flex flex-col max-h-[80vh]">
            {/* Header */}
            <div className="p-6 pb-4 border-b border-gray-100">
              <div className="hidden lg:block">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  {recipe.strMeal}
                </h1>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {recipe.strCategory && (
                  <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                    {recipe.strCategory}
                  </Badge>
                )}
                {recipe.strArea && (
                  <Badge variant="outline" className="border-gray-200">
                    <MapPin className="w-3 h-3 mr-1" />
                    {recipe.strArea}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span>30 minutes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-orange-500" />
                  <span>4 servings</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ChefHat className="w-4 h-4 text-orange-500" />
                  <span>Medium</span>
                </div>
              </div>

              {recipe.strYoutube && (
                <a
                  href={recipe.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Watch Video
                </a>
              )}
            </div>

            {/* Scrollable Content */}
            <ScrollArea className="flex-1 p-6">
              {/* Ingredients */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    🥘
                  </span>
                  Ingredients
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ingredients.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors group"
                    >
                      <div className="w-2 h-2 rounded-full bg-orange-400 group-hover:scale-125 transition-transform" />
                      <span className="text-gray-700">
                        <span className="font-medium text-orange-600">{item.measure}</span>{' '}
                        {item.ingredient}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    📝
                  </span>
                  Cooking Instructions
                </h2>
                <div className="space-y-4">
                  {instructions?.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4 group"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-orange-500/20">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-gray-700 leading-relaxed">{step}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Source Link */}
              {recipe.strSource && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <a
                    href={recipe.strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Original Recipe
                  </a>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}