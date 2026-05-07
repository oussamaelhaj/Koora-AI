// KOORAZONE FOOT - API Service Layer
import { API_ENDPOINTS } from '../constants/api';

export interface FootballStory {
  title: string;
  story: string;
}

export interface AIResponse {
  answer: string;
}

/**
 * Fetch football stories from the Render backend
 */
export async function fetchFootballStories(): Promise<FootballStory[]> {
  try {
    const response = await fetch(API_ENDPOINTS.footballStories, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn('Backend unavailable, using fallback stories:', error);
    return [
      {
        title: 'Le Miracle d\'Istanbul',
        story: 'En 2005, Liverpool remporte la Ligue des Champions après avoir été mené 3-0 à la mi-temps par l\'AC Milan.'
      },
      {
        title: 'Le Parcours du Maroc 2022',
        story: 'Le Maroc devient le premier pays africain de l\'histoire à atteindre les demi-finales de la Coupe du Monde au Qatar.'
      },
      {
        title: 'La Main de Dieu',
        story: 'Diego Maradona marque un but de la main contre l\'Angleterre lors de la Coupe du Monde 1986 au Mexique.'
      }
    ];
  }
}

const OPENROUTER_API_KEY = 'VOTRE_CLE_ICI'; // Remplacer par la clé réelle localement

/**
 * Ask the AI assistant a football question using OpenRouter (Llama 3.3)
 */
export async function askAI(question: string): Promise<AIResponse> {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://koorazone.com',
        'X-Title': 'KooraZone Foot',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        messages: [
          {
            role: 'system',
            content: 'Tu es un expert mondial en football. Réponds toujours en français, de manière concise et avec des émojis.'
          },
          {
            role: 'user',
            content: question
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return { answer: data.choices[0].message.content };
    
  } catch (error) {
    console.error('Error asking AI:', error);
    throw error;
  }
}
