import { ActionCard, Notice, PageHeader } from '@/components/ui';
import subjects from '@/data/subjects.json';
import { notFound } from 'next/navigation';

export default async function SubjectPage({ params }: { params: Promise<{ subjectId: string }> }) {
  const { subjectId } = await params;
  const subject = subjects.find((item) => item.id === subjectId);
  if (!subject) notFound();
  const query = `subject=${encodeURIComponent(subject.id)}&topic=demonstracao`;
  return <><PageHeader eyebrow={subject.group} title={subject.name} description="Escolhe como queres trabalhar este tema." /><Notice tone="warning"><strong>Tema de demonstração.</strong> Ainda não representa o currículo oficial.</Notice><section className="mt-6 rounded-3xl bg-white p-6 ring-1 ring-[#dcebed]"><p className="text-xs font-extrabold uppercase tracking-[.12em] text-[#0b7f81]">Tema</p><h2 className="mt-2 text-xl font-black text-[#0E2A55]">Tema de demonstração</h2></section><div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><ActionCard href={`/duvidas/tutor?${query}`} title="Tirar uma dúvida" description="Recebe pistas passo a passo." icon="?" /><ActionCard href={`/duvidas/tutor?${query}&context=understand`} title="Praticar" description="Experimenta e explica o raciocínio." icon="✎" /><ActionCard href={`/cartoes?${query}`} title="Criar cartões" description="Recorda uma ideia de cada vez." icon="◇" /><ActionCard href={`/revisao?${query}`} title="Rever matéria" description="Usa uma imagem de um exercício." icon="✓" /></div></>;
}
