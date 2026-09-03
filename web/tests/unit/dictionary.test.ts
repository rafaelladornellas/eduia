import { ptPTDictionaryEntries } from '@/data/dictionary/pt-PT';
import { createDictionary, findDictionaryEntry, normalizeDictionaryWord } from '@/domain/dictionary';
import { describe, expect, it } from 'vitest';

const dictionary = createDictionary(ptPTDictionaryEntries);

describe('dicionário pt-PT', () => {
  it('normaliza espaços, maiúsculas e Unicode', () => {
    expect(normalizeDictionaryWord('  AUTONOMIA  ')).toBe('autonomia');
    expect(normalizeDictionaryWord('CONCLUSA\u0303O')).toBe('conclusão');
  });

  it('encontra palavras fora do conjunto inicial da demonstração', () => {
    expect(findDictionaryEntry(dictionary, 'ecossistema')).toMatchObject({
      word: 'ecossistema',
      meaning: expect.any(String),
      example: expect.any(String),
    });
  });

  it('mantém a distinção entre palavras acentuadas e não acentuadas', () => {
    expect(findDictionaryEntry(dictionary, 'sinónimo')?.word).toBe('sinónimo');
    expect(findDictionaryEntry(dictionary, 'sinonimo')).toBeNull();
  });

  it('devolve null para palavras desconhecidas', () => {
    expect(findDictionaryEntry(dictionary, 'palavra-inexistente')).toBeNull();
  });

  it('deteta chaves e aliases repetidos ao construir o índice', () => {
    expect(() => createDictionary([
      { word: 'teste', meaning: 'Primeira entrada.', example: 'Um teste.', aliases: ['ensaio'] },
      { word: 'ensaio', meaning: 'Segunda entrada.', example: 'Um ensaio.' },
    ])).toThrow('Entrada de dicionário repetida');
  });
});
