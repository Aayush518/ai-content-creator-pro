import React from 'react';
import { PenTool, Wand2 } from 'lucide-react';
import { ContentTypeId, Story, Poem, Speech, ArtPrompt, MindMap } from '../types';
import { CONTENT_TYPES } from '../constants/contentTypes';
import { TemplateSelector } from './TemplateSelector';
import { MemeTemplate } from '../types';

interface ContentCreatorProps {
  activeTab: ContentTypeId;
  selectedTemplate: MemeTemplate;
  onTemplateSelect: (template: MemeTemplate) => void;
  isGenerating: boolean;
  onGenerate: (prompt: string) => void;
  topText?: string;
  bottomText?: string;
  generatedContent?: any;
  onCopy: () => void;
}

export const ContentCreator: React.FC<ContentCreatorProps> = ({
  activeTab,
  selectedTemplate,
  onTemplateSelect,
  isGenerating,
  onGenerate,
  topText,
  bottomText,
  generatedContent,
  onCopy,
}) => {
  const renderGeneratedContent = () => {
    if (!generatedContent) return 'AI will generate content here...';

    if (typeof generatedContent === 'string') {
      return generatedContent;
    }

    switch (activeTab) {
      case 'story': {
        const story = generatedContent as Story;
        if (!story.title || !story.summary) return 'Invalid story format';
        return `${story.title}\n\n${story.summary}`;
      }
      case 'poetry': {
        const poem = generatedContent as Poem;
        if (!poem.content) return 'Invalid poem format';
        return poem.content.join('\n');
      }
      case 'speech': {
        const speech = generatedContent as Speech;
        if (!speech.title || !speech.introduction) return 'Invalid speech format';
        return `${speech.title}\n\n${speech.introduction}`;
      }
      case 'art': {
        const art = generatedContent as ArtPrompt;
        if (!art.description) return 'Invalid art prompt format';
        return art.description;
      }
      case 'mindmap': {
        const mindmap = generatedContent as MindMap;
        if (!mindmap.centralTopic || !mindmap.branches) return 'Invalid mindmap format';
        return `${mindmap.centralTopic}\n\n${mindmap.branches.map(b => `• ${b.topic}`).join('\n')}`;
      }
      default:
        return typeof generatedContent === 'string' ? generatedContent : 'Content generated successfully!';
    }
  };

  return (
    <div className="glass-card rounded-3xl p-8 shadow-2xl">
      <div className="flex items-center gap-2 mb-8">
        <PenTool className="w-6 h-6 text-indigo-400" />
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
          Content Creator
        </h2>
      </div>
      
      {activeTab === 'meme' && (
        <TemplateSelector
          selectedTemplate={selectedTemplate}
          onSelect={onTemplateSelect}
        />
      )}

      <div className="mb-8">
        <label className="block text-slate-300 mb-3 font-medium">
          Generate with AI
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={`${CONTENT_TYPES.find(t => t.id === activeTab)?.prompt}...`}
            className="input-primary"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onGenerate((e.target as HTMLInputElement).value);
              }
            }}
          />
          <button
            onClick={() => {
              const input = document.querySelector('input') as HTMLInputElement;
              onGenerate(input.value);
            }}
            className={`btn-primary whitespace-nowrap ${
              isGenerating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isGenerating}
          >
            <Wand2 className="w-4 h-4 mr-2 inline-block" />
            {isGenerating ? 'Creating...' : 'Create'}
          </button>
        </div>
      </div>

      {activeTab === 'meme' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-slate-300 mb-2 font-medium">
              Top Text
            </label>
            <div className="glass-card rounded-xl p-3 min-h-[40px]">
              {topText || 'AI will generate text here...'}
            </div>
          </div>
          <div>
            <label className="block text-slate-300 mb-2 font-medium">
              Bottom Text
            </label>
            <div className="glass-card rounded-xl p-3 min-h-[40px]">
              {bottomText || 'AI will generate text here...'}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <label className="block text-slate-300 mb-2 font-medium">
            Generated Content
          </label>
          <div className="glass-card rounded-xl p-4 min-h-[200px] whitespace-pre-wrap">
            {renderGeneratedContent()}
          </div>
          {generatedContent && (
            <button
              onClick={onCopy}
              className="btn-secondary w-full"
            >
              Copy to Clipboard
            </button>
          )}
        </div>
      )}
    </div>
  );
};