import type { Subject } from '@/domain/types';
import Link from 'next/link';

const labels: Record<string, string> = { portugues: 'PT', ingles: 'EN', hgp: 'HGP', educacao_cidadania: '♡', matematica: '÷', ciencias_naturais: '⌁', educacao_tecnologica: '⚒', educacao_visual: '△', educacao_musical: '♫', tic: '</>', educacao_fisica: '○' };

export function SubjectCard({ subject }: { subject: Subject }) {
  return <Link href={`/disciplinas/${subject.id}`} className="group flex min-h-48 flex-col rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#dcebed] transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#18B9B7]"><span className="grid size-12 place-items-center rounded-2xl bg-[#e4f8f8] text-sm font-black text-[#087679]" aria-hidden="true">{labels[subject.id] ?? '•'}</span><p className="mt-5 text-xs font-extrabold uppercase tracking-[.1em] text-[#759]">{subject.group}</p><h2 className="mt-2 font-extrabold leading-6 text-[#0E2A55]">{subject.name}</h2><span className="mt-auto pt-4 text-sm font-bold text-[#0b7f81]">Explorar <span aria-hidden="true">→</span></span></Link>;
}
