import React from 'react';
import { Download } from 'lucide-react';
import { ContentTypeId, Recipe } from '../types';
import { RecipeDisplay } from './RecipeDisplay';
import { ContentDisplay } from './ContentDisplay';
import { motion } from 'framer-motion';

interface PreviewProps {
  activeTab: ContentTypeId;
  memeRef: React.RefObject<HTMLDivElement>;
  templateUrl: string;
  topText?: string;
  bottomText?: string;
  onDownload: () => void;
  recipe: Recipe | null;
  generatedContent: string;
  onCopy: () => void;
}

export const Preview: React.FC<PreviewProps> = ({
  activeTab,
  memeRef,
  templateUrl,
  topText,
  bottomText,
  onDownload,
  recipe,
  generatedContent,
  onCopy
}) => {
  if (activeTab === 'recipe') {
    return <RecipeDisplay recipe={recipe} />;
  }

  if (activeTab !== 'meme') {
    return <ContentDisplay type={activeTab} content={generatedContent} onCopy={onCopy} />;
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          ref={memeRef}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl shadow-2xl border border-white/10 aspect-square relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          <img
            src={templateUrl}
            alt="Meme template"
            className="w-full h-full object-contain relative z-10"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-between p-6 z-20">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white uppercase text-center break-words w-full text-stroke"
            >
              {topText}
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white uppercase text-center break-words w-full text-stroke"
            >
              {bottomText}
            </motion.h2>
          </div>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDownload}
          className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
        >
          <Download className="w-5 h-5 mr-2" />
          Download Meme
        </motion.button>
      </motion.div>
    </div>
  );
};