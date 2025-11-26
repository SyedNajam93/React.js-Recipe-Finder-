import React from 'react';
import { motion } from 'framer-motion';
import { 
  Beef, 
  Fish, 
  Salad, 
  Cake, 
  Soup, 
  Pizza,
  Sandwich,
  Egg
} from 'lucide-react';

const categories = [
  { name: 'Beef', icon: Beef, color: 'from-red-500 to-rose-600' },
  { name: 'Seafood', icon: Fish, color: 'from-blue-500 to-cyan-600' },
  { name: 'Vegetarian', icon: Salad, color: 'from-green-500 to-emerald-600' },
  { name: 'Dessert', icon: Cake, color: 'from-pink-500 to-rose-500' },
  { name: 'Breakfast', icon: Egg, color: 'from-amber-500 to-yellow-500' },
  { name: 'Chicken', icon: Sandwich, color: 'from-orange-500 to-amber-600' },
  { name: 'Pasta', icon: Pizza, color: 'from-yellow-500 to-orange-500' },
  { name: 'Starter', icon: Soup, color: 'from-purple-500 to-violet-600' },
];

export default function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Browse by Category
      </h2>
      
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
        {categories.map((category, index) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.name;
          
          return (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelectCategory(category.name)}
              className={`group relative flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 ${
                isSelected 
                  ? 'bg-gradient-to-br ' + category.color + ' text-white shadow-lg scale-105' 
                  : 'bg-white hover:bg-gray-50 text-gray-700 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1'
              }`}
            >
              <div className={`p-2 rounded-xl ${
                isSelected 
                  ? 'bg-white/20' 
                  : 'bg-gradient-to-br ' + category.color + ' bg-opacity-10'
              }`}>
                <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-white'}`} />
              </div>
              <span className="text-xs font-medium whitespace-nowrap">
                {category.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}