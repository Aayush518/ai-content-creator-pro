import { Image, MessageSquare, Music, Layout, ChefHat, BookOpen, Feather, Mic, Palette, Brain } from 'lucide-react';
import { ContentType } from '../types';

export const CONTENT_TYPES: ContentType[] = [
  { id: 'meme', icon: Image, name: 'Meme Studio', prompt: 'Create a funny meme about' },
  { id: 'story', icon: BookOpen, name: 'Story Forge', prompt: 'Write a captivating story about' },
  { id: 'recipe', icon: ChefHat, name: 'Recipe Creator', prompt: 'Create a recipe for' },
  { id: 'poetry', icon: Feather, name: 'Poetry Weaver', prompt: 'Compose a poem about' },
  { id: 'speech', icon: Mic, name: 'Speech Crafter', prompt: 'Write a compelling speech about' },
  { id: 'caption', icon: MessageSquare, name: 'Caption Lab', prompt: 'Write a witty caption for' },
  { id: 'lyrics', icon: Music, name: 'Lyrics Factory', prompt: 'Generate song lyrics about' },
  { id: 'art', icon: Palette, name: 'Art Director', prompt: 'Describe visual art about' },
  { id: 'post', icon: Layout, name: 'Social Wizard', prompt: 'Create a viral social media post about' },
  { id: 'mindmap', icon: Brain, name: 'Mind Mapper', prompt: 'Generate a mind map about' }
];