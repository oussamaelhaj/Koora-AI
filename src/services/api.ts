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
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching stories:', error);
    throw error;
  }
}

/**
 * Ask the AI assistant a football question
 */
export async function askAI(question: string): Promise<AIResponse> {
  try {
    const response = await fetch(API_ENDPOINTS.askAI, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error asking AI:', error);
    throw error;
  }
}
