'use client';

import subjects from '@/data/subjects.json';
import type { StudyCard } from '@/domain/types';
import { recordProgress } from '@/lib/progress';
import { useHydrated } from '@/lib/use-hydrated';
import { FormEvent, useState } from 'react';
import { ErrorMessage, Notice } from './ui';

export function StudyCards() {
  const hydrated = useHydrated();
  const [subject, setSubject] = useState(subjects[0].id);
  const [quantity, setQuantity] = useState<3 | 5 | 10>(3);
  const [cards, setCards] = useState<StudyCard[]>([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [hint, setHint] = useState(false);
  const [explanation, setExplanation] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function create(event: FormEvent) { event.preventDefault(); setLoading(true); setError(''); try { const response = await fetch('/api/study-cards/generate', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ subject, topic: 'Tema de demonstração', quantity }) }); const data = await response.json() as { cards?: StudyCard[]; message?: string }; if (!response.ok || !data.cards) throw new Error(data.message ?? 'Não foi possível criar os cartões.'); setCards(data.cards); setIndex(0); setDone(false); } catch (cause) { setError(cause instanceof Error ? cause.message : 'Não foi possível criar os cartões.'); } finally { setLoading(false); } }
  function next() { if (!answer.trim() || !explanation) return; if (index === cards.length - 1) { setDone(true); recordProgress({ topic: 'Cartões de estudo', exercises: cards.length, hints: hint ? 1 : 0 }); return; } setIndex((value)=>value+1); setAnswer(''); setHint(false); setExplanation(false); }
  if (cards.length === 0) return <><Notice tone="warning">Conteúdo de demonstração: estes cartões praticam estratégias de estudo e não representam o currículo oficial.</Notice><form onSubmit={create} className="mt-5 grid gap-5 rounded-3xl bg-white p-6 ring-1 ring-[#dcebed] md:grid-cols-3"><label className="font-bold text-[#0E2A55]">Disciplina<select value={subject} disabled={!hydrated || loading} onChange={(event)=>setSubject(event.target.value)} className="mt-2 min-h-14 w-full rounded-2xl border border-[#bfd8dc] bg-white px-4 text-base">{subjects.map((item)=><option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label className="font-bold text-[#0E2A55]">Tema<input value="Tema de demonstração" readOnly className="mt-2 min-h-14 w-full rounded-2xl border border-[#bfd8dc] bg-[#f6f9fa] px-4 text-base" /></label><fieldset disabled={!hydrated || loading}><legend className="font-bold text-[#0E2A55]">Quantidade</legend><div className="mt-2 flex gap-2">{([3,5,10] as const).map((value)=><button key={value} type="button" aria-pressed={quantity===value} onClick={()=>setQuantity(value)} className={`min-h-14 flex-1 rounded-2xl font-black ${quantity===value?'bg-[#18B9B7] text-[#07364a]':'bg-[#f0f7f8] text-[#536a7e]'}`}>{value}</button>)}</div></fieldset><button disabled={!hydrated || loading} className="min-h-14 rounded-2xl bg-[#0E2A55] px-6 font-extrabold text-white disabled:opacity-50 md:col-span-3">{loading?'A preparar…':'Criar cartões'}</button>{error&&<div className="md:col-span-3"><ErrorMessage>{error}</ErrorMessage></div>}</form></>;
  if (done) return <div className="rounded-3xl bg-white p-8 text-center ring-1 ring-[#dcebed]"><span className="text-5xl" aria-hidden="true">✓</span><h2 className="mt-5 text-2xl font-black text-[#0E2A55]">Sessão concluída</h2><p className="mt-3 text-[#5d7184]">Respondeste a {cards.length} cartões ao teu ritmo.</p><button onClick={()=>setCards([])} className="mt-6 rounded-2xl bg-[#0E2A55] px-5 py-3 font-bold text-white">Criar outra sessão</button></div>;
  const card = cards[index];
  return <section className="mx-auto max-w-3xl"><div className="mb-3 flex items-center justify-between text-sm font-bold text-[#5f7487]"><span>Cartão {index+1} de {cards.length}</span><span>{Math.round(((index+1)/cards.length)*100)}%</span></div><div className="h-2 overflow-hidden rounded-full bg-[#dfecee]"><div className="h-full rounded-full bg-[#18B9B7]" style={{width:`${((index+1)/cards.length)*100}%`}} /></div><article className="mt-5 rounded-[32px] bg-white p-7 shadow-sm ring-1 ring-[#dcebed] sm:p-9"><p className="text-sm font-extrabold uppercase tracking-[.12em] text-[#0b7f81]">Pergunta</p><h2 className="mt-3 text-2xl font-black leading-9 text-[#0E2A55]">{card.question}</h2><label htmlFor="card-answer" className="mt-7 block font-bold text-[#0E2A55]">A tua resposta</label><textarea id="card-answer" value={answer} onChange={(event)=>setAnswer(event.target.value)} rows={3} className="mt-2 w-full rounded-2xl border border-[#bfd8dc] p-4 text-base outline-none focus:ring-4 focus:ring-[#18B9B7]/20" />{hint&&<div className="mt-4"><Notice><strong>Pista:</strong> {card.hint}</Notice></div>}{explanation&&<div className="mt-4"><Notice tone="success"><strong>Explicação:</strong> {card.explanation}</Notice></div>}<div className="mt-5 flex flex-wrap gap-3"><button type="button" onClick={()=>setHint(true)} className="chip-button">Ver uma pista</button><button type="button" disabled={!answer.trim()} onClick={()=>setExplanation(true)} className="chip-button disabled:opacity-40">Ver explicação</button><button type="button" disabled={!answer.trim()||!explanation} onClick={next} className="ml-auto rounded-2xl bg-[#0E2A55] px-5 py-3 font-extrabold text-white disabled:opacity-40">{index===cards.length-1?'Concluir':'Próximo cartão'}</button></div></article></section>;
}
