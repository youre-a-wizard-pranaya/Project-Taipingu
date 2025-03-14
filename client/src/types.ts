export interface KeyboardKey {
  key: string;
  code: string;
  width?: string; // flex-1, flex-2, etc.
  display?: string; // Display text (e.g. "Shift" instead of "ShiftLeft")
}

export interface AnimeCharacter {
  id: number;
  name: string;
  imageUrl: string;
  animationDelay?: string;
}

export interface BackgroundImage {
  id: number;
  url: string;
  name: string;
  alt: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  imageUrl: string;
}

export interface TextExcerpt {
  id: number;
  bookId: number;
  content: string;
  difficulty: DifficultyLevel;
}

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface TypingStats {
  wpm: number;
  accuracy: number;
  time: string;
  totalChars: number;
  correctChars: number;
  incorrectChars: number;
  startTime: number | null;
}

export interface CharStatus {
  char: string;
  status: 'correct' | 'incorrect' | 'current' | 'upcoming';
}
