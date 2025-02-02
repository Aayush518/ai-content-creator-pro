import { GoogleGenerativeAI } from '@google/generative-ai';
import { ContentTypeId, MemeTemplate, Recipe, Story, Poem, Speech, ArtPrompt, MindMap, Emotion } from '../types';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const getEmotionPrompt = (emotion: Emotion) => {
  switch (emotion) {
    case 'funny':
      return 'Make it extremely humorous and witty';
    case 'serious':
      return 'Keep it professional and straightforward';
    case 'sarcastic':
      return 'Add clever sarcasm and irony';
    case 'inspirational':
      return 'Make it uplifting and motivational';
    case 'dramatic':
      return 'Add dramatic flair and intensity';
    default:
      return '';
  }
};

const parseJSONResponse = (text: string) => {
  try {
    // Remove any potential non-JSON text before or after the JSON object
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON object found in response');
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Failed to parse JSON response:', text);
    throw new Error('Invalid response format');
  }
};

export const generateAIContent = async (
  prompt: string,
  type: ContentTypeId,
  emotion: Emotion,
  template?: MemeTemplate
) => {
  if (!prompt) throw new Error('Prompt is required');
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const emotionPrompt = getEmotionPrompt(emotion);
    
    let contentPrompt = '';
    switch (type) {
      case 'story':
        contentPrompt = `Create a ${emotion} story about "${prompt}". Format as JSON:
{
  "title": "Story title",
  "genre": "Genre",
  "summary": "Brief summary",
  "chapters": [
    {
      "title": "Chapter title",
      "content": "Chapter content"
    }
  ],
  "themes": ["theme1", "theme2"],
  "mood": "Overall mood"
}`;
        const storyResult = await model.generateContent(contentPrompt);
        const storyText = await storyResult.response.text();
        return parseJSONResponse(storyText) as Story;

      case 'recipe':
        contentPrompt = `Create a detailed recipe for "${prompt}". Format as JSON:
{
  "title": "Recipe name",
  "description": "Brief description",
  "prepTime": "X mins",
  "cookTime": "X mins",
  "servings": number,
  "ingredients": ["ingredient1", "ingredient2"],
  "instructions": ["step1", "step2"],
  "tips": ["tip1", "tip2"]
}`;
        const recipeResult = await model.generateContent(contentPrompt);
        const recipeText = await recipeResult.response.text();
        return parseJSONResponse(recipeText) as Recipe;

      case 'poetry':
        contentPrompt = `Write a ${emotion} poem about "${prompt}". Format as JSON:
{
  "title": "Poem title",
  "type": "Type of poem",
  "content": ["line1", "line2"],
  "analysis": "Brief analysis",
  "mood": "Poem's mood"
}`;
        const poemResult = await model.generateContent(contentPrompt);
        const poemText = await poemResult.response.text();
        return parseJSONResponse(poemText) as Poem;

      case 'speech':
        contentPrompt = `Write a ${emotion} speech about "${prompt}". Format as JSON:
{
  "title": "Speech title",
  "purpose": "Speech purpose",
  "introduction": "Opening paragraph",
  "mainPoints": ["point1", "point2"],
  "conclusion": "Closing paragraph",
  "keywords": ["keyword1", "keyword2"]
}`;
        const speechResult = await model.generateContent(contentPrompt);
        const speechText = await speechResult.response.text();
        return parseJSONResponse(speechText) as Speech;

      case 'art':
        contentPrompt = `Create an art prompt about "${prompt}". Format as JSON:
{
  "title": "Artwork title",
  "description": "Detailed description",
  "style": "Art style",
  "elements": ["element1", "element2"],
  "colors": ["color1", "color2"],
  "mood": "Artwork mood"
}`;
        const artResult = await model.generateContent(contentPrompt);
        const artText = await artResult.response.text();
        return parseJSONResponse(artText) as ArtPrompt;

      case 'mindmap':
        contentPrompt = `Create a mind map about "${prompt}". Format as JSON:
{
  "centralTopic": "Main topic",
  "branches": [
    {
      "topic": "Branch topic",
      "subtopics": ["subtopic1", "subtopic2"]
    }
  ]
}`;
        const mindmapResult = await model.generateContent(contentPrompt);
        const mindmapText = await mindmapResult.response.text();
        return parseJSONResponse(mindmapText) as MindMap;

      case 'meme':
        contentPrompt = `Create a ${emotion} meme about "${prompt}" using this template: ${template?.context}.
Format EXACTLY like this:
TOP TEXT: [top text, max 5 words]
BOTTOM TEXT: [bottom text, max 5 words]
${emotionPrompt}. NO explanations, ONLY the formatted text.`;
        break;

      case 'caption':
        contentPrompt = `Write a ${emotion} Instagram caption about "${prompt}". 
${emotionPrompt}. Make it memorable and under 150 characters. Include relevant emojis.`;
        break;

      case 'lyrics':
        contentPrompt = `Write ${emotion} song lyrics about "${prompt}". 
${emotionPrompt}. Create a catchy chorus (4 lines) that's memorable and emotional.`;
        break;

      case 'post':
        contentPrompt = `Create a ${emotion} social media post about "${prompt}".
${emotionPrompt}. Make it engaging, shareable, and include trending hashtags. Max 280 characters.`;
        break;
    }

    if (['meme', 'caption', 'lyrics', 'post'].includes(type)) {
      const result = await model.generateContent(contentPrompt);
      const text = await result.response.text();
      if (!text) throw new Error('Empty response from AI');
      return text;
    }
  } catch (error) {
    console.error('Error generating content:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to generate content');
  }
};