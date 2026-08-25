import type { Subject } from '@/domain/types';
import Image from 'next/image';
import Link from 'next/link';

const quickActions = [
  {
    label: 'Fazer uma pergunta',
    detail: 'Partilha uma dúvida e recebe pistas para encontrares o caminho.',
    href: '/duvidas',
    icon: '?',
  },
  {
    label: 'Rever um exercício',
    detail: 'Olha de novo para os passos e percebe onde podes melhorar.',
    href: '/revisao',
    icon: '✓',
  },
  {
    label: 'Criar cartões de estudo',
    detail: 'Prepara perguntas curtas para praticares uma ideia de cada vez.',
    href: '/cartoes',
    icon: '◇',
  },
  {
    label: 'Consultar o dicionário',
    detail: 'Descobre o significado de uma palavra e aprende a usá-la.',
    href: '/dicionario',
    icon: 'Aa',
  },
] as const;

const quickAccess = [
  { label: 'Revisão', detail: 'Voltar a um exercício', href: '/revisao', icon: '✓' },
  { label: 'Dicionário', detail: 'Explorar uma palavra', href: '/dicionario', icon: 'Aa' },
  { label: 'Cartões de Estudo', detail: 'Praticar com cartões', href: '/cartoes', icon: '◇' },
] as const;

const progressMetrics = [
  { label: 'Disciplinas exploradas', value: 4, icon: '◫' },
  { label: 'Dúvidas trabalhadas', value: 7, icon: '?' },
  { label: 'Cartões estudados', value: 12, icon: '◇' },
  { label: 'Sessões concluídas', value: 5, icon: '✓' },
] as const;

const groupPresentation: Record<string, { icon: string; description: string }> = {
  Línguas: {
    icon: 'Aa',
    description: 'Comunica, lê e descobre novas formas de expressão.',
  },
  'Ciências Humanas': {
    icon: '⌂',
    description: 'Compreende pessoas, lugares e histórias.',
  },
  Cidadania: {
    icon: '♡',
    description: 'Aprende a participar e a cuidar da comunidade.',
  },
  'Matemática e Ciências': {
    icon: '∑',
    description: 'Observa, questiona e resolve problemas passo a passo.',
  },
  Expressões: {
    icon: '✦',
    description: 'Cria, experimenta e aprende através da expressão.',
  },
  Tecnologia: {
    icon: '</>',
    description: 'Explora ferramentas e ideias do mundo digital.',
  },
};

const defaultPresentation = {
  icon: '•',
  description: 'Explora esta disciplina e aprende ao teu ritmo.',
};

function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return (
    <div>
      <p className="text-sm font-extrabold uppercase tracking-[.12em] text-[#0B7476]">{eyebrow}</p>
      <h2 id={id} className="mt-1 text-2xl font-black tracking-[-.02em] text-[#0E2A55] sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

function SubjectGrid({ subjects }: { subjects: Subject[] }) {
  if (subjects.length === 0) {
    return (
      <div className="mt-5 rounded-3xl border border-dashed border-[#A8CBCE] bg-white px-6 py-10 text-center" role="status">
        <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-[#E7F8F8] font-black text-[#0B7476]" aria-hidden="true">
          ◫
        </span>
        <h3 className="mt-4 text-lg font-extrabold text-[#0E2A55]">Ainda não há disciplinas para mostrar</h3>
        <p className="mx-auto mt-2 max-w-md leading-6 text-[#526B7E]">Volta a tentar mais tarde. Assim que estiverem disponíveis, vais encontrá-las aqui.</p>
      </div>
    );
  }

  return (
    <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {subjects.map((subject) => {
        const presentation = groupPresentation[subject.group] ?? defaultPresentation;

        return (
          <article key={subject.id} className="flex min-h-64 flex-col rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-[#D8E8EA] sm:p-6">
            <span className="grid size-12 place-items-center rounded-2xl bg-[#E5F8F8] text-sm font-black text-[#086F72]" aria-hidden="true">
              {presentation.icon}
            </span>
            <p className="mt-5 text-xs font-extrabold uppercase tracking-[.1em] text-[#5B7183]">{subject.group}</p>
            <h3 className="mt-2 text-lg font-extrabold leading-6 text-[#0E2A55]">{subject.name}</h3>
            <p className="mt-2 text-sm leading-6 text-[#526B7E]">{presentation.description}</p>
            <Link
              href={`/disciplinas/${subject.id}`}
              className="mt-auto inline-flex min-h-11 items-center self-start pt-4 font-extrabold text-[#086F72] underline-offset-4 hover:underline focus-visible:rounded-lg focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#18B9B7]"
              aria-label={`Explorar ${subject.name}`}
            >
              Explorar <span className="ml-2" aria-hidden="true">→</span>
            </Link>
          </article>
        );
      })}
    </div>
  );
}

export function HomeDashboard({ subjects }: { subjects: Subject[] }) {
  return (
    <div className="space-y-12 pb-4 sm:space-y-14">
      <section className="relative isolate overflow-hidden rounded-[34px] bg-[#0E2A55] px-6 py-8 text-white shadow-[0_24px_70px_rgba(14,42,85,.16)] sm:px-10 sm:py-11 lg:px-12">
        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="max-w-3xl">
            <p className="text-base font-extrabold text-[#91EEEA]">Olá! <span aria-hidden="true">👋</span></p>
            <h1 className="mt-2 text-3xl font-black leading-tight tracking-[-.035em] sm:text-5xl">Bem-vindo ao EduIA</h1>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white sm:text-lg">O teu companheiro de aprendizagem com IA para o 5.º ano em Portugal.</p>
            <p className="mt-3 max-w-2xl leading-7 text-[#D7E8F3]">Aprende com autonomia, pratica com confiança e cresce todos os dias.</p>
          </div>
          <div className="hidden w-full max-w-[220px] justify-self-center rounded-[28px] bg-white p-4 shadow-xl ring-1 ring-white/30 lg:block">
            <Image src="/eduia-logo.png" alt="EduIA — Aprender melhor, com mais autonomia" width={1254} height={1254} className="h-auto w-full object-contain" priority />
          </div>
        </div>
        <div className="absolute -bottom-20 -right-16 -z-0 size-64 rounded-full border-[42px] border-[#18B9B7]/25 sm:size-80" aria-hidden="true" />
        <div className="absolute -left-8 -top-10 -z-0 size-32 rounded-full bg-[#3FC4D6]/10" aria-hidden="true" />
      </section>

      <section aria-labelledby="quick-actions-title">
        <SectionHeading eyebrow="Começar" title="O que vamos aprender hoje?" id="quick-actions-title" />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group flex min-h-48 flex-col rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-[#D8E8EA] transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#18B9B7]"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-[#E5F8F8] font-black text-[#086F72]" aria-hidden="true">{action.icon}</span>
              <strong className="mt-5 text-lg leading-6 text-[#0E2A55]">{action.label}</strong>
              <span className="mt-2 text-sm leading-6 text-[#526B7E]">{action.detail}</span>
              <span className="mt-auto pt-4 text-sm font-extrabold text-[#086F72]" aria-hidden="true">Começar →</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section aria-labelledby="subjects-title">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Explorar" title="As tuas disciplinas" id="subjects-title" />
            <Link href="/disciplinas" className="inline-flex min-h-11 items-center rounded-xl px-2 font-extrabold text-[#086F72] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#18B9B7]">
              Ver todas <span className="ml-2" aria-hidden="true">→</span>
            </Link>
          </div>
          <SubjectGrid subjects={subjects} />
        </section>

        <aside className="rounded-[32px] bg-[#E6F8F8] p-6 ring-1 ring-[#BBDDDD] sm:p-7 xl:sticky xl:top-8" aria-labelledby="tutor-title">
          <div className="flex items-center gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#0E2A55] text-xl font-black text-white" aria-hidden="true">E</span>
            <div>
              <p className="text-sm font-extrabold text-[#086F72]">Olá! <span aria-hidden="true">👋</span></p>
              <h2 id="tutor-title" className="text-xl font-black text-[#0E2A55]">Fala com o teu tutor</h2>
            </div>
          </div>
          <p className="mt-5 leading-7 text-[#29475C]">Sou o EduIA, o teu tutor socrático. Estou aqui para te ajudar a pensar, compreender e aprender por ti.</p>
          <ul className="mt-5 space-y-3 text-sm font-semibold leading-6 text-[#29475C]">
            {[
              'Explica sem dar a resposta',
              'Faz perguntas que ajudam a pensar',
              'Adapta-se ao teu ritmo',
              'Incentiva a autonomia',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-white text-xs font-black text-[#086F72]" aria-hidden="true">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link href="/duvidas/tutor?context=doubt" className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-[#0E2A55] px-5 py-3 font-extrabold text-white shadow-sm transition hover:bg-[#173A6D] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#18B9B7]">
            Abrir conversa <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </aside>
      </div>

      <section aria-labelledby="quick-access-title">
        <SectionHeading eyebrow="Atalhos" title="Acesso rápido" id="quick-access-title" />
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {quickAccess.map((item) => (
            <Link key={item.href} href={item.href} className="flex min-h-24 items-center gap-4 rounded-3xl bg-white p-5 ring-1 ring-[#D8E8EA] transition hover:shadow-md focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#18B9B7]">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#E5F8F8] text-sm font-black text-[#086F72]" aria-hidden="true">{item.icon}</span>
              <span>
                <strong className="block text-[#0E2A55]">{item.label}</strong>
                <span className="mt-1 block text-sm text-[#526B7E]">{item.detail}</span>
              </span>
              <span className="ml-auto font-black text-[#086F72]" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="progress-title">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <SectionHeading eyebrow="O teu caminho" title="Meu progresso" id="progress-title" />
          <p className="rounded-full bg-[#E5F8F8] px-3 py-1.5 text-xs font-extrabold text-[#086F72]">Dados de demonstração</p>
        </div>
        <p className="mt-3 max-w-2xl leading-7 text-[#526B7E]">Pequenos sinais do que já exploraste. O objetivo é ganhares autonomia e precisares cada vez menos de ajuda.</p>
        <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {progressMetrics.map((metric) => (
            <article key={metric.label} className="rounded-[26px] bg-white p-5 ring-1 ring-[#D8E8EA] sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <strong className="text-3xl font-black tracking-[-.04em] text-[#0E2A55]">{metric.value}</strong>
                <span className="grid size-10 place-items-center rounded-xl bg-[#E5F8F8] text-sm font-black text-[#086F72]" aria-hidden="true">{metric.icon}</span>
              </div>
              <p className="mt-4 text-sm font-bold leading-5 text-[#415E72]">{metric.label}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="rounded-[30px] border border-[#D8E8EA] bg-white px-6 py-7 text-center sm:px-8">
        <p className="font-black text-[#0E2A55]">Aprendizagem com propósito.</p>
        <p className="mx-auto mt-2 max-w-2xl leading-7 text-[#526B7E]">O EduIA não faz o trabalho por ti. Ajuda-te a pensar, tentar e aprender.</p>
      </footer>
    </div>
  );
}
