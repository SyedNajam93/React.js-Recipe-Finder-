import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchHero from '@/components/recipes/SearchHero';
import CategoryFilter from '@/components/recipes/CategoryFilter';
import RecipeGrid from '@/components/recipes/RecipeGrid';
import RecipeModal from '@/components/recipes/RecipeModal';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [featuredRecipes, setFeaturedRecipes] = useState([]);

  // Load featured recipes on mount
  useEffect(() => {
    loadFeaturedRecipes();
  }, []);

  const loadFeaturedRecipes = async () => {
    setLoading(true);
    const randomRecipes = [];
    for (let i = 0; i < 8; i++) {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await res.json();
      if (data.meals) randomRecipes.push(data.meals[0]);
    }
    setFeaturedRecipes(randomRecipes);
    setRecipes(randomRecipes);
    setLoading(false);
  };

  const searchRecipes = async (query) => {
    if (!query.trim()) {
      setRecipes(featuredRecipes);
      return;
    }
    setLoading(true);
    setSearchQuery(query);
    setSelectedCategory('');
    
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await res.json();
    setRecipes(data.meals || []);
    setLoading(false);
  };

  const filterByCategory = async (category) => {
    if (category === selectedCategory) {
      setSelectedCategory('');
      setRecipes(featuredRecipes);
      return;
    }
    
    setLoading(true);
    setSelectedCategory(category);
    setSearchQuery('');
    
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await res.json();
    setRecipes(data.meals || []);
    setLoading(false);
  };

  const openRecipeDetails = async (meal) => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
    const data = await res.json();
    if (data.meals) {
      setSelectedRecipe(data.meals[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-amber-50">
      <SearchHero onSearch={searchRecipes} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          onSelectCategory={filterByCategory} 
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          {searchQuery && (
            <p className="text-gray-600 mb-6">
              Showing results for "<span className="font-semibold text-orange-600">{searchQuery}</span>"
            </p>
          )}
          
          <RecipeGrid 
            recipes={recipes} 
            loading={loading} 
            onSelectRecipe={openRecipeDetails}
          />
          
          {!loading && recipes.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🍳</div>
              <h3 className="text-xl font-semibold text-gray-800">No recipes found</h3>
              <p className="text-gray-500 mt-2">Try searching for something else</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedRecipe && (
          <RecipeModal 
            recipe={selectedRecipe} 
            onClose={() => setSelectedRecipe(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}