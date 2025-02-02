import React, { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import { Header } from './components/Header';
import { ContentTypeSelector } from './components/ContentTypeSelector';
import { ContentCreator } from './components/ContentCreator';
import { Preview } from './components/Preview';
import { MEME_TEMPLATES } from './constants/templates';
import { generateAIContent } from './services/ai';
import { ContentTypeId, MemeTemplate, Recipe, Emotion } from './types';
import { EmotionSelector } from './components/EmotionSelector';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate>(MEME_TEMPLATES[0]);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<ContentTypeId>('meme');
  const [generatedContent, setGeneratedContent] = useState('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion>('funny');
  const memeRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async (prompt: string) => {
    if (!prompt) return;
    
    setIsGenerating(true);
    try {
      const content = await generateAIContent(prompt, activeTab, selectedEmotion, selectedTemplate);
      
      if (activeTab === 'meme') {
        const text = content as string;
        const topMatch = text.match(/TOP TEXT:\s*([^\n]+)/i);
        const bottomMatch = text.match(/BOTTOM TEXT:\s*([^\n]+)/i);
        if (topMatch && bottomMatch) {
          setTopText(topMatch[1].trim().toUpperCase());
          setBottomText(bottomMatch[1].trim().toUpperCase());
        }
      } else if (activeTab === 'recipe') {
        setRecipe(content as Recipe);
      } else {
        setGeneratedContent(content as string);
      }
    } catch (error) {
      console.error('Error generating content:', error);
      alert('Failed to generate content. Please try again!');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (memeRef.current) {
      const dataUrl = await htmlToImage.toPng(memeRef.current);
      const link = document.createElement('a');
      link.download = 'meme.png';
      link.href = dataUrl;
      link.click();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    alert('Content copied to clipboard!');
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden pb-20">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ContentTypeSelector activeTab={activeTab} onSelect={setActiveTab} />
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="space-y-6">
            <EmotionSelector selectedEmotion={selectedEmotion} onSelect={setSelectedEmotion} />
            <ContentCreator
              activeTab={activeTab}
              selectedTemplate={selectedTemplate}
              onTemplateSelect={setSelectedTemplate}
              isGenerating={isGenerating}
              onGenerate={handleGenerate}
              topText={topText}
              bottomText={bottomText}
              generatedContent={generatedContent}
              onCopy={handleCopy}
            />
          </div>
          
          <div className="xl:sticky xl:top-8 h-fit">
            <Preview
              activeTab={activeTab}
              memeRef={memeRef}
              templateUrl={selectedTemplate.url}
              topText={topText}
              bottomText={bottomText}
              onDownload={handleDownload}
              recipe={recipe}
              generatedContent={generatedContent}
              onCopy={handleCopy}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;