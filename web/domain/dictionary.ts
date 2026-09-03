import type { DictionaryEntry } from './types';

export type DictionarySourceEntry = DictionaryEntry & {
  aliases?: readonly string[];
};

export function normalizeDictionaryWord(word: string) {
  return word.trim().normalize('NFC').toLocaleLowerCase('pt-PT');
}

export function createDictionary(entries: readonly DictionarySourceEntry[]) {
  const dictionary = new Map<string, DictionaryEntry>();

  for (const { aliases = [], ...entry } of entries) {
    for (const lookupWord of [entry.word, ...aliases]) {
      const key = normalizeDictionaryWord(lookupWord);
      if (dictionary.has(key)) throw new Error(`Entrada de dicionário repetida: ${lookupWord}`);
      dictionary.set(key, entry);
    }
  }

  return dictionary;
}

export function findDictionaryEntry(dictionary: ReadonlyMap<string, DictionaryEntry>, word: string) {
  return dictionary.get(normalizeDictionaryWord(word)) ?? null;
}
