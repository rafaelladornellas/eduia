import { TutorChat } from '@/components/tutor-chat';
import { Notice, PageHeader } from '@/components/ui';
import type { TutorContext } from '@/domain/types';

export default async function TutorPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const allowed = ['doubt', 'homework', 'understand', 'review'];
  const raw = typeof params.context === 'string' ? params.context : 'doubt';
  const context = (allowed.includes(raw) ? raw : 'doubt') as TutorContext;
  return <><PageHeader eyebrow="Dúvidas" title="Vamos pensar juntos" description="O EduIA dá-te pistas, espera pelas tuas tentativas e ajuda-te a compreender." /><div className="mb-5"><Notice>Para experimentar o fluxo completo, podes perguntar: <strong>“Como faço 3/4 + 1/2?”</strong></Notice></div><TutorChat context={context} topic={typeof params.topic === 'string' ? params.topic : undefined} /></>;
}
