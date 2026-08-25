import type { DictionaryEntry, StudyCard, TutorInput, TutorResponse } from '@/domain/types';

export interface TutorProvider {
  sendMessage(input: TutorInput): Promise<TutorResponse>;
  analyzeStudyImage(input: { name: string; type: string; size: number }): Promise<{ focus: string; prompt: string }>;
  generateStudyCards(input: { subject: string; topic: string; quantity: 3 | 5 | 10 }): Promise<StudyCard[]>;
  defineWord(input: { word: string }): Promise<DictionaryEntry | null>;
}
