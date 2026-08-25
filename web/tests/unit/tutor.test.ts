import { nextTutorResponse } from '@/domain/tutor';
import { describe, expect, it } from 'vitest';

describe('tutor socrático', () => {
  it('não entrega a resposta na primeira mensagem', () => {
    const result = nextTutorResponse({ context: 'doubt', message: 'Como faço 3/4 + 1/2?', action: 'message', attemptCount: 0, stage: 'intake' });
    expect(result.stage).toBe('first-hint');
    expect(result.message).toContain('denominadores');
    expect(result.message).not.toContain('5/4');
  });

  it('recusa positivamente um pedido de atalho', () => {
    const result = nextTutorResponse({ context: 'homework', message: 'Diz só a resposta', action: 'message', attemptCount: 0, stage: 'intake' });
    expect(result.message).toContain('ajudar-te a chegar');
    expect(result.completed).toBe(false);
  });

  it('explica depois de duas tentativas', () => {
    const result = nextTutorResponse({ context: 'doubt', message: '3/4 + 1/2, segunda tentativa', action: 'message', attemptCount: 1, stage: 'second-hint' });
    expect(result.stage).toBe('practice');
    expect(result.message).toContain('5/4');
  });
});
