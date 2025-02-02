import React from 'react';
import { Smile, AlertCircle, Coffee, Sparkles, Theater } from 'lucide-react';
import { Emotion } from '../types';
import { motion } from 'framer-motion';

interface EmotionSelectorProps {
  selectedEmotion: Emotion;
  onSelect: (emotion: Emotion) => void;
}

const EMOTIONS: { id: Emotion; icon: any; label: string; color: string }[] = [
  { id: 'funny', icon: Smile, label: 'Funny', color: 'from-yellow-400 to-orange-400' },
  { id: 'serious', icon: AlertCircle, label: 'Serious', color: 'from-blue-400 to-indigo-400' },
  { id: 'sarcastic', icon: Coffee, label: 'Sarcastic', color: 'from-purple-400 to-pink-400' },
  { id: 'inspirational', icon: Sparkles, label: 'Inspirational', color: 'from-green-400 to-emerald-400' },
  { id: 'dramatic', icon: Theater, label: 'Dramatic', color: 'from-red-400 to-pink-400' },
];

export const EmotionSelector: React.FC<EmotionSelectorProps> = ({ selectedEmotion, onSelect }) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-300 mb-3 font-medium">
        Select Tone
      </label>
      <div className="flex flex-wrap gap-2">
        {EMOTIONS.map(({ id, icon: Icon, label, color }) => (
          <motion.button
            key={id}
            onClick={() => onSelect(id)}
            className={`relative group flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              selectedEmotion === id
                ? `bg-gradient-to-r ${color}`
                : 'bg-white/5 hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className={`w-4 h-4 ${selectedEmotion === id ? 'text-white' : 'text-white/60'}`} />
            <span className={selectedEmotion === id ? 'text-white' : 'text-white/60'}>
              {label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};