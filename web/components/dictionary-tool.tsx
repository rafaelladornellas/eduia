'use client';

import type { DictionaryEntry } from '@/domain/types';
import { recordProgress } from '@/lib/progress';
import { useHydrated } from '@/lib/use-hydrated';
import { FormEvent, useState } from 'react';
import { ErrorMessage, Notice } from './ui';

export function DictionaryTool() {
  const hydrated = useHydrated();
  const [word, setWord] = useState('');
  const [entry, setEntry] = useState<DictionaryEntry | null>(null);
  const [sentence, setSentence] = useState('');
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function search(event: FormEvent) {
    event.preventDefault(); setError(''); setFeedback(''); setEntry(null);
    if (!word.trim()) { setError('Escreve uma palavra para pesquisar.'); return; }
    setLoading(true);
    try { const response = await fetch('/api/dictionary/define', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ word }) }); const data = await response.json() as DictionaryEntry | { message: string }; if (!response.ok) throw new Error('message' in data ? data.message : 'Não foi possível procurar a palavra.'); setEntry(data as DictionaryEntry); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Não foi possível procurar a palavra.'); }
    finally { setLoading(false); }
  }

  function checkSentence(event: FormEvent) {
    event.preventDefault();
    if (!sentence.trim()) { setFeedback('Escreve uma frase para receberes feedback.'); return; }
    if (entry && sentence.toLocaleLowerCase('pt-PT').includes(entry.word)) { setFeedback('Boa! Usaste a palavra na tua frase. Agora verifica se a frase mostra o significado que aprendeste.'); recordProgress({ topic: 'Dicionário', exercises: 1 }); }
    else setFeedback(`Inclui a palavra “${entry?.word}” na frase e tenta novamente.`);
  }

  return <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
    <section className="rounded-3xl bg-white p-6 ring-1 ring-[#dcebed]"><form onSubmit={search}><label htmlFor="dictionary-word" className="block font-extrabold text-[#0E2A55]">Que palavra queres descobrir?</label><div className="mt-3 flex gap-3"><input id="dictionary-word" value={word} onChange={(event)=>setWord(event.target.value)} disabled={!hydrated || loading} maxLength={60} placeholder="Ex.: autonomia" className="min-h-14 min-w-0 flex-1 rounded-2xl border border-[#bfd8dc] px-4 text-base outline-none focus:border-[#18B9B7] focus:ring-4 focus:ring-[#18B9B7]/20 disabled:opacity-60" /><button disabled={!hydrated || loading} className="rounded-2xl bg-[#0E2A55] px-5 font-extrabold text-white disabled:opacity-50">{loading ? 'A procurar…' : 'Procurar'}</button></div></form>{error && <div className="mt-4"><ErrorMessage>{error}</ErrorMessage></div>}<p className="mt-4 text-sm leading-6 text-[#667b8e]">Pesquisa uma palavra de cada vez. Por exemplo: autonomia, ecossistema ou perímetro.</p></section>
    <section className="min-h-80 rounded-3xl bg-white p-6 ring-1 ring-[#dcebed]">{!entry ? <div className="grid h-full min-h-64 place-items-center text-center"><div><span className="text-4xl" aria-hidden="true">Aa</span><h2 className="mt-4 font-black text-[#0E2A55]">O significado aparece aqui</h2><p className="mt-2 text-sm text-[#687b8e]">Escreve uma palavra para começar.</p></div></div> : <div><p className="text-sm font-extrabold uppercase tracking-[.12em] text-[#0b7f81]">Palavra</p><h2 className="mt-1 text-4xl font-black text-[#0E2A55]">{entry.word}</h2><dl className="mt-6 grid gap-4 sm:grid-cols-2"><div className="sm:col-span-2"><dt className="text-xs font-extrabold uppercase tracking-wider text-[#6d8092]">Significado simples</dt><dd className="mt-1 leading-7 text-[#263e55]">{entry.meaning}</dd></div><div><dt className="text-xs font-extrabold uppercase tracking-wider text-[#6d8092]">Exemplo</dt><dd className="mt-1 leading-6 text-[#263e55]">{entry.example}</dd></div><div><dt className="text-xs font-extrabold uppercase tracking-wider text-[#6d8092]">Sinónimo / Antónimo</dt><dd className="mt-1 leading-6 text-[#263e55]">{entry.synonym ?? '—'} / {entry.antonym ?? 'Não aplicável'}</dd></div></dl><form onSubmit={checkSentence} className="mt-7 rounded-2xl bg-[#f1fafa] p-5"><label htmlFor="sentence" className="font-extrabold text-[#0E2A55]">Agora tenta tu 🙂</label><p className="mt-1 text-sm text-[#5f7487]">Cria uma frase usando esta palavra.</p><textarea id="sentence" value={sentence} onChange={(event)=>setSentence(event.target.value)} disabled={!hydrated} rows={2} className="mt-3 w-full rounded-2xl border border-[#bfd8dc] bg-white p-3 text-base outline-none focus:ring-4 focus:ring-[#18B9B7]/20" /><button disabled={!hydrated} className="mt-3 rounded-xl bg-[#18B9B7] px-4 py-3 font-extrabold text-[#08344a] disabled:opacity-50">Ver feedback</button>{feedback && <div className="mt-3"><Notice tone={feedback.startsWith('Boa') ? 'success' : 'info'}>{feedback}</Notice></div>}</form></div>}</section>
  </div>;
}
