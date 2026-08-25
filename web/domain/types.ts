export type Subject = { id: string; name: string; group: string };
export type TutorContext = 'doubt' | 'homework' | 'understand' | 'review';
export type TutorAction = 'message' | 'hint' | 'rephrase' | 'independent';
export type TutorStage = 'intake' | 'first-hint' | 'second-hint' | 'explanation' | 'practice' | 'summary';

export type TutorInput = {
  context: TutorContext;
  message: string;
  action: TutorAction;
  attemptCount: number;
  stage: TutorStage;
};

export type TutorResponse = {
  message: string;
  stage: TutorStage;
  attemptCount: number;
  completed: boolean;
  helpUsed: number;
};

export type StudyCard = { id: string; question: string; hint: string; explanation: string };
export type DictionaryEntry = { word: string; meaning: string; example: string; synonym?: string; antonym?: string };
