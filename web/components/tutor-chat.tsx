'use client';

import type { TutorAction, TutorContext, TutorResponse, TutorStage } from '@/domain/types';
import { recordProgress } from '@/lib/progress';
import { useHydrated } from '@/lib/use-hydrated';
import { FormEvent, useState } from 'react';
import { ErrorMessage, Notice } from './ui';

type Message = { id: number; role: 'tutor' | 'child'; text: string };

const welcomes: Record<TutorContext, string> = {
  doubt: 'Conta-me a tua dúvida. Vamos descobrir a resposta passo a passo.',
  homework: 'Mostra-me onde paraste no TPC e o que já tentaste.',
  understand: 'Que matéria queres compreender melhor?',
  review: 'Vamos olhar para o teu raciocínio. Como chegaste ao resultado?',
};

export function TutorChat({ context = 'doubt', initialPrompt, topic = 'Tema de demonstração' }: { context?: TutorContext; initialPrompt?: string; topic?: string }) {
  const hydrated = useHydrated();
  const [messages, setMessages] = useState<Message[]>([{ id: 1, role: 'tutor', text: initialPrompt ?? welcomes[context] }]);
  const [input, setInput] = useState('');
  const [stage, setStage] = useState<TutorStage>('intake');
  const [attemptCount, setAttemptCount] = useState(0);
  const [helpUsed, setHelpUsed] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [completed, setCompleted] = useState(false);

  async function send(action: TutorAction, text = input) {
    const trimmed = text.trim();
    if (!trimmed && action === 'message') { setError('Escreve a tua pergunta ou tentativa para continuarmos.'); return; }
    setError(''); setLoading(true);
    if (action === 'message') { setMessages((current) => [...current, { id: Date.now(), role: 'child', text: trimmed }]); setInput(''); }
    try {
      const firstQuestion = messages.find((message) => message.role === 'child')?.text;
      const requestMessage = firstQuestion && stage !== 'intake' ? `${firstQuestion}\nTentativa atual: ${trimmed || action}` : trimmed || action;
      const response = await fetch('/api/tutor/messages', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ context, message: requestMessage, action, attemptCount, stage }) });
      const data = await response.json() as TutorResponse & { message: string };
      if (!response.ok) throw new Error(data.message);
      setMessages((current) => [...current, { id: Date.now() + 1, role: 'tutor', text: data.message }]);
      setStage(data.stage); setAttemptCount(data.attemptCount); setHelpUsed((value) => value + data.helpUsed);
      if (data.completed && !completed) { setCompleted(true); recordProgress({ topic, hints: helpUsed + data.helpUsed, exercises: 1 }); }
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'O EduIA não conseguiu responder agora. A tua tentativa ficou nesta sessão.'); }
    finally { setLoading(false); }
  }

  function submit(event: FormEvent) { event.preventDefault(); void send('message'); }

  return <section className="overflow-hidden rounded-[30px] bg-white shadow-sm ring-1 ring-[#dcebed]">
    <header className="flex items-center gap-4 border-b border-[#e1edef] p-5"><span className="grid size-12 place-items-center rounded-2xl border-2 border-[#18B9B7] bg-[#F7FBFC] font-black text-[#0E2A55]" aria-hidden="true">⌒‿⌒</span><div><h2 className="font-black text-[#0E2A55]">Tutor EduIA</h2><p className="text-sm text-[#617589]"><span className="mr-1.5 inline-block size-2 rounded-full bg-[#3BAE7A]" />Modo de demonstração</p></div></header>
    <div aria-live="polite" aria-label="Conversa com o Tutor EduIA" className="min-h-[360px] space-y-4 bg-[#f8fcfc] p-5 sm:p-7">{messages.map((message)=><div key={message.id} className={`flex ${message.role === 'child' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[86%] rounded-3xl px-5 py-4 text-[15px] leading-7 sm:max-w-[72%] ${message.role === 'child' ? 'rounded-br-lg bg-[#0E2A55] text-white' : 'rounded-bl-lg bg-white text-[#253b52] shadow-sm ring-1 ring-[#dcebed]'}`}>{message.text}</div></div>)}{loading && <div className="w-fit rounded-3xl bg-white px-5 py-4 text-sm text-[#5d7184] ring-1 ring-[#dcebed]">O EduIA está a pensar…</div>}</div>
    <div className="border-t border-[#e1edef] p-4 sm:p-5">
      {completed && <div className="mb-4"><Notice tone="success">Sessão concluída. O resumo foi acrescentado ao teu progresso neste dispositivo.</Notice></div>}
      {error && <div className="mb-4"><ErrorMessage>{error}</ErrorMessage></div>}
      <div className="mb-3 flex flex-wrap gap-2"><button type="button" onClick={() => void send('hint', 'Preciso de uma pista')} disabled={!hydrated || loading || completed} className="chip-button">Preciso de uma pista</button><button type="button" onClick={() => void send('rephrase', 'Explica de outra forma')} disabled={!hydrated || loading || completed} className="chip-button">Explica de outra forma</button><button type="button" onClick={() => void send('independent', 'Quero tentar sozinho')} disabled={!hydrated || loading || completed} className="chip-button">Quero tentar sozinho</button></div>
      <form onSubmit={submit} className="flex items-end gap-3"><label className="sr-only" htmlFor="tutor-input">A tua pergunta ou tentativa</label><textarea id="tutor-input" value={input} onChange={(event) => setInput(event.target.value)} maxLength={1200} rows={2} disabled={!hydrated || loading || completed} placeholder="Escreve a tua pergunta ou mostra a tua tentativa…" className="min-h-14 flex-1 resize-none rounded-2xl border border-[#bfd8dc] bg-white px-4 py-3 text-base outline-none focus:border-[#18B9B7] focus:ring-4 focus:ring-[#18B9B7]/20" /><button disabled={!hydrated || loading || completed} className="min-h-14 rounded-2xl bg-[#18B9B7] px-5 font-black text-[#072e43] disabled:cursor-not-allowed disabled:opacity-50">Enviar</button></form>
      <p className="mt-3 text-xs font-medium leading-5 text-[#596e82]">Não partilhes o teu nome completo, escola, morada ou contacto.</p>
    </div>
  </section>;
}
