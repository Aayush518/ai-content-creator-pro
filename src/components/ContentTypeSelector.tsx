import React from 'react';
import { CONTENT_TYPES } from '../constants/contentTypes';
import { ContentTypeId } from '../types';
import { motion } from 'framer-motion';

interface ContentTypeSelectorProps {
  activeTab: ContentTypeId;
  onSelect: (type: ContentTypeId) => void;
}

export const ContentTypeSelector: React.FC<ContentTypeSelectorProps> = ({ activeTab, onSelect }) => {
  return (
    <div className="mb-12 overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-max px-4 md:px-0 md:justify-center perspective-1000">
        {CONTENT_TYPES.map((type) => {
          const Icon = type.icon;
          const isActive = activeTab === type.id;
          
          return (
            <motion.button
              key={type.id}
              onClick={() => onSelect(type.id as ContentTypeId)}
              className={`group relative flex items-center gap-3 px-6 py-4 rounded-2xl font-medium transition-all duration-500 overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Icon className={`w-5 h-5 ${isActive ? 'text-purple-400' : 'text-white/60 group-hover:text-white'}`} />
              <span className={`whitespace-nowrap ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                {type.name}
              </span>
              {isActive && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"
                  layoutId="activeTab"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};