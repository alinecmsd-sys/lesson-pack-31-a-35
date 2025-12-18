
export type Voice = 'Kore' | 'Puck' | 'Zephyr';

export interface VocabItem {
  id: string;
  word: string;
  translation: string;
  example?: string;
}

export interface SentenceItem {
  id: string;
  english: string;
  portuguese: string;
}

export interface DialogueItem {
  id: string;
  speaker: string;
  text: string;
  translation: string;
}

export interface ExerciseItem {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  audioPrompt?: string; // Sentence to be read for listening exercises
}

export interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  vocabulary: VocabItem[];
  sentences: SentenceItem[];
  dialogues: {
    title: string;
    parts: DialogueItem[];
  }[];
  exercises: ExerciseItem[];
}
