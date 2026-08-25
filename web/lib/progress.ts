'use client';

export type ProgressSnapshot = {
  version: 1;
  sessionsCompleted: number;
  exercisesPractised: number;
  hintsUsed: number;
  topics: Record<string, number>;
};

const key = 'eduia.progress.v1';
const empty: ProgressSnapshot = { version: 1, sessionsCompleted: 0, exercisesPractised: 0, hintsUsed: 0, topics: {} };

export function readProgress(): ProgressSnapshot {
  if (typeof window === 'undefined') return empty;
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? 'null') as ProgressSnapshot | null;
    return value?.version === 1 ? value : empty;
  } catch { return empty; }
}

export function recordProgress(input: { topic?: string; exercises?: number; hints?: number }) {
  const current = readProgress();
  const next: ProgressSnapshot = {
    ...current,
    sessionsCompleted: current.sessionsCompleted + 1,
    exercisesPractised: current.exercisesPractised + (input.exercises ?? 1),
    hintsUsed: current.hintsUsed + (input.hints ?? 0),
    topics: input.topic ? { ...current.topics, [input.topic]: (current.topics[input.topic] ?? 0) + 1 } : current.topics,
  };
  localStorage.setItem(key, JSON.stringify(next));
  window.dispatchEvent(new Event('eduia-progress'));
}

export function resetProgress() {
  localStorage.removeItem(key);
  window.dispatchEvent(new Event('eduia-progress'));
}
