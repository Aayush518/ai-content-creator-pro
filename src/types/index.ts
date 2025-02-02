import { DivideIcon as LucideIcon } from 'lucide-react';

export interface MemeTemplate {
  name: string;
  url: string;
  context: string;
}

export interface ContentType {
  id: string;
  icon: LucideIcon;
  name: string;
  prompt: string;
}

export interface Recipe {
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  tips: string[];
}

export interface Story {
  title: string;
  genre: string;
  summary: string;
  chapters: Chapter[];
  themes: string[];
  mood: string;
}

export interface Chapter {
  title: string;
  content: string;
}

export interface Poem {
  title: string;
  type: string;
  content: string[];
  analysis: string;
  mood: string;
}

export interface Speech {
  title: string;
  purpose: string;
  introduction: string;
  mainPoints: string[];
  conclusion: string;
  keywords: string[];
}

export interface ArtPrompt {
  title: string;
  description: string;
  style: string;
  elements: string[];
  colors: string[];
  mood: string;
}

export interface MindMap {
  centralTopic: string;
  branches: Branch[];
}

export interface Branch {
  topic: string;
  subtopics: string[];
}

export type Emotion = 'funny' | 'serious' | 'sarcastic' | 'inspirational' | 'dramatic';

export type ContentTypeId = 'meme' | 'story' | 'recipe' | 'poetry' | 'speech' | 'caption' | 'lyrics' | 'art' | 'post' | 'mindmap';