'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ErrorMessage, Notice } from './ui';
import { TutorChat } from './tutor-chat';
import { useHydrated } from '@/lib/use-hydrated';

const accepted = ['image/jpeg', 'image/png', 'image/webp'];
const maxSize = 10 * 1024 * 1024;

export function ImageReview() {
  const hydrated = useHydrated();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<{ focus: string; prompt: string; mock: boolean } | null>(null);

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  function select(selected?: File) {
    setAnalysis(null); setError('');
    if (!selected) { setFile(null); setPreview(''); return; }
    if (!accepted.includes(selected.type)) { setFile(null); setPreview(''); setError('Usa uma imagem JPEG, PNG ou WebP.'); return; }
    if (selected.size > maxSize) { setFile(null); setPreview(''); setError('A imagem deve ter menos de 10 MB.'); return; }
    setFile(selected); setPreview(URL.createObjectURL(selected));
  }

  async function analyze() {
    if (!file) { setError('Escolhe uma imagem para rever.'); return; }
    setLoading(true); setError('');
    try { const body = new FormData(); body.append('image', file); const response = await fetch('/api/review/analyze', { method: 'POST', body }); const data = await response.json() as { focus?: string; prompt?: string; mock?: boolean; message?: string }; if (!response.ok || !data.focus || !data.prompt) throw new Error(data.message ?? 'Não conseguimos analisar a imagem agora.'); setAnalysis({ focus: data.focus, prompt: data.prompt, mock: data.mock === true }); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Não conseguimos analisar a imagem agora.'); }
    finally { setLoading(false); }
  }

  if (analysis) return <div className="space-y-5"><Notice tone="warning"><strong>Análise simulada.</strong> A imagem não foi interpretada por OCR ou IA. Este resultado demonstra apenas o fluxo futuro.</Notice><section className="rounded-3xl bg-white p-6 ring-1 ring-[#dcebed]"><p className="text-xs font-extrabold uppercase tracking-[.12em] text-[#0b7f81]">Ponto a rever</p><h2 className="mt-2 text-xl font-black text-[#0E2A55]">{analysis.focus}</h2></section><TutorChat context="review" initialPrompt={analysis.prompt} topic="Revisão por imagem" /><button type="button" onClick={()=>{setAnalysis(null);setFile(null)}} className="chip-button">Rever outra imagem</button></div>;

  return <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]"><section className="rounded-3xl bg-white p-6 ring-1 ring-[#dcebed]"><label htmlFor="study-image" className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#9bcfd3] bg-[#f4fbfb] p-6 text-center focus-within:ring-4 focus-within:ring-[#18B9B7]/25"><span className="grid size-16 place-items-center rounded-3xl bg-white text-3xl text-[#0b7f81] shadow-sm" aria-hidden="true">↑</span><strong className="mt-5 text-[#0E2A55]">Escolher uma imagem</strong><span className="mt-2 max-w-xs text-sm leading-6 text-[#617589]">JPEG, PNG ou WebP, até 10 MB. No telemóvel, podes usar a câmara.</span><input id="study-image" type="file" accept="image/jpeg,image/png,image/webp" capture="environment" disabled={!hydrated || loading} className="sr-only" onChange={(event)=>select(event.target.files?.[0])} /></label><div className="mt-4"><Notice>A imagem é usada apenas nesta sessão e não é guardada.</Notice></div>{error&&<div className="mt-4"><ErrorMessage>{error}</ErrorMessage></div>}</section><section className="min-h-80 rounded-3xl bg-white p-6 ring-1 ring-[#dcebed]">{preview&&file?<><div className="flex items-center justify-between"><div><p className="text-xs font-extrabold uppercase tracking-[.12em] text-[#0b7f81]">Preview</p><p className="mt-1 max-w-[260px] truncate text-sm font-bold text-[#0E2A55]">{file.name}</p></div><button type="button" onClick={()=>{setFile(null);setPreview('')}} className="chip-button">Remover</button></div><Image src={preview} alt="Pré-visualização do exercício selecionado" width={900} height={600} unoptimized className="mt-5 max-h-80 w-full rounded-2xl bg-[#eef5f6] object-contain" /><button type="button" disabled={!hydrated || loading} onClick={()=>void analyze()} className="mt-5 min-h-14 w-full rounded-2xl bg-[#0E2A55] px-5 font-extrabold text-white disabled:opacity-50">{loading?'A preparar a revisão…':'Confirmar e analisar'}</button></>:<div className="grid min-h-64 place-items-center text-center"><div><span className="text-4xl text-[#a1bcc0]" aria-hidden="true">▧</span><h2 className="mt-4 font-black text-[#0E2A55]">A tua imagem aparece aqui</h2><p className="mt-2 text-sm text-[#687b8e]">Confirma que o exercício está legível e bem iluminado.</p></div></div>}</section></div>;
}
