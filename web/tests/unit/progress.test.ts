import { readProgress, recordProgress, resetProgress } from '@/lib/progress';
import { beforeEach, describe, expect, it } from 'vitest';

describe('progresso local', () => {
  beforeEach(() => localStorage.clear());
  it('guarda apenas métricas agregadas', () => {
    recordProgress({ topic: 'Matemática', exercises: 1, hints: 2 });
    expect(readProgress()).toMatchObject({ sessionsCompleted: 1, exercisesPractised: 1, hintsUsed: 2, topics: { Matemática: 1 } });
    expect(localStorage.getItem('eduia.progress.v1')).not.toContain('message');
  });
  it('apaga o progresso', () => {
    recordProgress({ exercises: 1 }); resetProgress();
    expect(readProgress().sessionsCompleted).toBe(0);
  });
});
