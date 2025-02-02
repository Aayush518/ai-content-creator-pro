import React from 'react';
import { Clock, Users, ChefHat, Lightbulb } from 'lucide-react';
import { Recipe } from '../types';
import { motion } from 'framer-motion';

interface RecipeDisplayProps {
  recipe: Recipe | null;
}

export const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe }) => {
  if (!recipe) {
    return (
      <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 h-full flex items-center justify-center text-white/40">
        Your recipe will appear here...
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 h-full overflow-auto"
    >
      <motion.h2 
        variants={item}
        className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text"
      >
        {recipe.title}
      </motion.h2>
      
      <motion.p 
        variants={item}
        className="text-white/70 mb-8"
      >
        {recipe.description}
      </motion.p>

      <motion.div 
        variants={item}
        className="grid grid-cols-3 gap-4 mb-8"
      >
        <div className="flex items-center gap-2 bg-white/5 rounded-xl p-4">
          <Clock className="w-5 h-5 text-purple-400" />
          <div>
            <p className="text-sm text-white/60">Prep Time</p>
            <p className="font-medium">{recipe.prepTime}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/5 rounded-xl p-4">
          <ChefHat className="w-5 h-5 text-pink-400" />
          <div>
            <p className="text-sm text-white/60">Cook Time</p>
            <p className="font-medium">{recipe.cookTime}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/5 rounded-xl p-4">
          <Users className="w-5 h-5 text-blue-400" />
          <div>
            <p className="text-sm text-white/60">Servings</p>
            <p className="font-medium">{recipe.servings}</p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <ChefHat className="w-5 h-5" />
          </span>
          Ingredients
        </h3>
        <ul className="space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <motion.li
              key={index}
              variants={item}
              className="flex items-center gap-3 bg-white/5 rounded-xl p-3"
            >
              <span className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-sm">
                {index + 1}
              </span>
              {ingredient}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div variants={item} className="mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <ChefHat className="w-5 h-5" />
          </span>
          Instructions
        </h3>
        <div className="space-y-4">
          {recipe.instructions.map((instruction, index) => (
            <motion.div
              key={index}
              variants={item}
              className="flex gap-4 bg-white/5 rounded-xl p-4"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center">
                {index + 1}
              </div>
              <p className="text-white/80">{instruction}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item}>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
            <Lightbulb className="w-5 h-5" />
          </span>
          Chef's Tips
        </h3>
        <ul className="space-y-2">
          {recipe.tips.map((tip, index) => (
            <motion.li
              key={index}
              variants={item}
              className="bg-white/5 rounded-xl p-4 text-white/80"
            >
              {tip}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};