import { inspectInput, normalizeSafeOutput } from '@/domain/safety';
import { describe, expect, it } from 'vitest';

describe('safety', () => {
  it('interrompe a partilha evidente de dados pessoais', () => {
    expect(inspectInput('A minha escola é a Escola X').allowed).toBe(false);
  });
  it('mantém perguntas educativas normais', () => {
    expect(inspectInput('Como somo duas frações?').allowed).toBe(true);
  });
  it('remove mensagens técnicas da resposta', () => {
    expect(normalizeSafeOutput('HTTP 500 API JSON')).not.toMatch(/HTTP|API|JSON/);
  });
});
