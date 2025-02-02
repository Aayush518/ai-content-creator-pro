import React from 'react';
import { motion } from 'framer-motion';
import { ContentTypeId, Story, Poem, Speech, ArtPrompt, MindMap } from '../types';
import { Music, MessageSquare, Layout, BookOpen, Feather, Mic, Palette, Brain } from 'lucide-react';

interface ContentDisplayProps {
  type: ContentTypeId;
  content: any;
  onCopy: () => void;
}

export const ContentDisplay: React.FC<ContentDisplayProps> = ({ type, content, onCopy }) => {
  const getIcon = () => {
    switch (type) {
      case 'story': return BookOpen;
      case 'poetry': return Feather;
      case 'speech': return Mic;
      case 'lyrics': return Music;
      case 'caption': return MessageSquare;
      case 'art': return Palette;
      case 'post': return Layout;
      case 'mindmap': return Brain;
      default: return MessageSquare;
    }
  };

  const Icon = getIcon();

  const getBackground = () => {
    switch (type) {
      case 'story': return 'from-blue-500 to-indigo-500';
      case 'poetry': return 'from-pink-500 to-rose-500';
      case 'speech': return 'from-amber-500 to-orange-500';
      case 'lyrics': return 'from-blue-500 to-purple-500';
      case 'caption': return 'from-pink-500 to-rose-500';
      case 'art': return 'from-emerald-500 to-teal-500';
      case 'post': return 'from-green-500 to-emerald-500';
      case 'mindmap': return 'from-violet-500 to-purple-500';
      default: return 'from-purple-500 to-pink-500';
    }
  };

  const renderContent = () => {
    if (!content) {
      return (
        <div className="bg-white/5 rounded-xl p-6 text-white/60">
          Your content will appear here...
        </div>
      );
    }

    // Handle string content types
    if (typeof content === 'string') {
      return (
        <div className="bg-white/5 rounded-xl p-6 whitespace-pre-wrap">
          {content}
        </div>
      );
    }

    switch (type) {
      case 'story': {
        const story = content as Story;
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">{story.title}</h3>
              <p className="text-white/60">{story.genre} • {story.mood}</p>
              <p className="text-lg">{story.summary}</p>
            </div>
            <div className="space-y-4">
              {story.chapters?.map((chapter, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-6">
                  <h4 className="text-xl font-semibold mb-3">{chapter.title}</h4>
                  <p className="leading-relaxed">{chapter.content}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {story.themes?.map((theme, index) => (
                <span key={index} className="px-3 py-1 rounded-full bg-white/10 text-sm">
                  {theme}
                </span>
              ))}
            </div>
          </div>
        );
      }

      case 'poetry': {
        const poem = content as Poem;
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">{poem.title}</h3>
              <p className="text-white/60">{poem.type} • {poem.mood}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 space-y-2">
              {poem.content?.map((line, index) => (
                <p key={index} className="text-lg italic">{line}</p>
              ))}
            </div>
            {poem.analysis && (
              <div className="bg-white/5 rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-2">Analysis</h4>
                <p>{poem.analysis}</p>
              </div>
            )}
          </div>
        );
      }

      case 'speech': {
        const speech = content as Speech;
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">{speech.title}</h3>
              <p className="text-white/60">{speech.purpose}</p>
            </div>
            <div className="space-y-4">
              {speech.introduction && (
                <div className="bg-white/5 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-2">Introduction</h4>
                  <p>{speech.introduction}</p>
                </div>
              )}
              {speech.mainPoints && speech.mainPoints.length > 0 && (
                <div className="bg-white/5 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-2">Main Points</h4>
                  <ul className="list-disc list-inside space-y-2">
                    {speech.mainPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
              {speech.conclusion && (
                <div className="bg-white/5 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-2">Conclusion</h4>
                  <p>{speech.conclusion}</p>
                </div>
              )}
            </div>
            {speech.keywords && speech.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {speech.keywords.map((keyword, index) => (
                  <span key={index} className="px-3 py-1 rounded-full bg-white/10 text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      }

      case 'art': {
        const art = content as ArtPrompt;
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">{art.title}</h3>
              <p className="text-white/60">{art.style} • {art.mood}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <p className="text-lg">{art.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {art.elements && art.elements.length > 0 && (
                <div className="bg-white/5 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-2">Elements</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {art.elements.map((element, index) => (
                      <li key={index}>{element}</li>
                    ))}
                  </ul>
                </div>
              )}
              {art.colors && art.colors.length > 0 && (
                <div className="bg-white/5 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-2">Colors</h4>
                  <div className="flex flex-wrap gap-2">
                    {art.colors.map((color, index) => (
                      <span key={index} className="px-3 py-1 rounded-full bg-white/10 text-sm">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      }

      case 'mindmap': {
        const mindmap = content as MindMap;
        return (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <h3 className="text-2xl font-bold">{mindmap.centralTopic}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mindmap.branches?.map((branch, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-3">{branch.topic}</h4>
                  <ul className="list-disc list-inside space-y-2">
                    {branch.subtopics?.map((subtopic, idx) => (
                      <li key={idx}>{subtopic}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
      }

      default:
        return (
          <div className="bg-white/5 rounded-xl p-6 whitespace-pre-wrap">
            {JSON.stringify(content, null, 2)}
          </div>
        );
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 h-full overflow-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${getBackground()} flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold">
            {type.charAt(0).toUpperCase() + type.slice(1)} Preview
          </h3>
          <p className="text-white/60 text-sm">Your generated content</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        {renderContent()}
      </motion.div>

      {content && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onCopy}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/50 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Copy to Clipboard
        </motion.button>
      )}
    </div>
  );
};