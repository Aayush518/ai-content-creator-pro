import React from 'react';
import { MEME_TEMPLATES } from '../constants/templates';
import { MemeTemplate } from '../types';

interface TemplateSelectorProps {
  selectedTemplate: MemeTemplate;
  onSelect: (template: MemeTemplate) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedTemplate, onSelect }) => {
  return (
    <div className="mb-8">
      <label className="block text-gray-300 mb-3 font-medium">
        Choose Your Template
      </label>
      <div className="grid grid-cols-2 gap-4 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
        {MEME_TEMPLATES.map((template) => (
          <div
            key={template.name}
            className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 ${
              selectedTemplate.name === template.name
                ? 'border-purple-500 ring-2 ring-purple-500/50'
                : 'border-white/10 hover:border-purple-400/50'
            }`}
            onClick={() => onSelect(template)}
          >
            <img
              src={template.url}
              alt={template.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-2 bg-black/50 backdrop-blur-sm">
              <p className="text-sm font-medium text-gray-200">{template.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};