'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AppIcon } from './icons';

const navigation = [
  { href: '/inicio', label: 'Início', icon: 'home' },
  { href: '/disciplinas', label: 'Disciplinas', icon: 'subjects' },
  { href: '/duvidas', label: 'Dúvidas', icon: 'doubts' },
  { href: '/revisao', label: 'Revisão', icon: 'review' },
  { href: '/dicionario', label: 'Dicionário', icon: 'dictionary' },
  { href: '/cartoes', label: 'Cartões de Estudo', icon: 'cards' },
  { href: '/progresso', label: 'Meu Progresso', icon: 'progress' },
  { href: '/definicoes', label: 'Definições', icon: 'settings' },
] as const;

function NavLink({ item, onClick }: { item: (typeof navigation)[number]; onClick?: () => void }) {
  const pathname = usePathname();
  const active = pathname === item.href || (item.href !== '/inicio' && pathname.startsWith(`${item.href}/`));
  return (
    <Link href={item.href} onClick={onClick} aria-current={active ? 'page' : undefined} className={`flex min-h-12 items-center rounded-2xl px-3 text-[15px] font-bold transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#18B9B7] ${active ? 'bg-[#e5f8f8] text-[#0b7375]' : 'text-[#50657a] hover:bg-[#f1f8f9]'}`}>
      <AppIcon name={item.icon} className={active ? 'bg-white text-[#0b7375]' : 'bg-[#f1f6f7] text-[#50657a]'} />
      <span className="ml-3">{item.label}</span>
    </Link>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [moreOpen, setMoreOpen] = useState(false);
  const primary = [navigation[0], navigation[2], navigation[3]];
  return (
    <div className="min-h-screen bg-[#F7FBFC] text-[#12243C]">
      <a href="#conteudo" className="fixed left-4 top-4 z-50 -translate-y-24 rounded-xl bg-[#0E2A55] px-4 py-3 font-bold text-white focus:translate-y-0">Saltar para o conteúdo</a>
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[264px_1fr]">
        <aside className="hidden border-r border-[#dcebed] bg-white px-6 py-7 lg:block">
          <Link href="/inicio"><Image src="/eduia-logo.png" alt="EduIA — Aprender melhor, com mais autonomia" width={1254} height={1254} className="h-auto w-32 object-contain" priority /></Link>
          <nav aria-label="Navegação principal" className="mt-10 space-y-1.5">{navigation.map((item) => <NavLink key={item.href} item={item} />)}</nav>
          <div className="mt-10 rounded-2xl bg-[#f3fafb] p-4 text-xs leading-5 text-[#536a7e]"><strong className="block text-[#0E2A55]">Modo de demonstração</strong>O EduIA usa respostas preparadas e não guarda conversas.</div>
        </aside>
        <div className="min-w-0">
          <header className="flex min-h-20 items-center justify-between border-b border-[#e0ecee] bg-white/90 px-5 backdrop-blur sm:px-8 lg:justify-end">
            <Link href="/inicio" className="lg:hidden"><Image src="/eduia-logo.png" alt="EduIA — Aprender melhor, com mais autonomia" width={1254} height={1254} className="size-14 object-contain" priority /></Link>
            <div className="flex items-center gap-3 rounded-full bg-[#f5fafb] px-4 py-2 text-sm font-bold ring-1 ring-[#dcebed]"><span className="size-2.5 rounded-full bg-[#18B9B7]" aria-hidden="true" />Perfil de teste</div>
          </header>
          <main id="conteudo" className="mx-auto max-w-7xl px-5 pb-28 pt-8 sm:px-8 lg:px-10 lg:pb-12">{children}</main>
        </div>
      </div>
      <nav aria-label="Navegação principal" className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-4 rounded-2xl bg-white p-2 shadow-[0_10px_40px_rgba(14,42,85,.18)] ring-1 ring-[#dcebed] lg:hidden">
        {primary.map((item) => <NavLink key={item.href} item={item} />)}
        <button type="button" aria-expanded={moreOpen} onClick={() => setMoreOpen((value) => !value)} className="min-h-12 rounded-xl px-2 text-xs font-bold text-[#50657a] focus-visible:outline focus-visible:outline-4 focus-visible:outline-[#18B9B7]"><span aria-hidden="true" className="block text-xl">☰</span>Mais</button>
      </nav>
      {moreOpen && <div className="fixed inset-0 z-30 bg-[#0E2A55]/25 lg:hidden" onClick={() => setMoreOpen(false)}><div role="dialog" aria-label="Mais opções" className="absolute inset-x-3 bottom-24 rounded-3xl bg-white p-4 shadow-2xl" onClick={(event) => event.stopPropagation()}>{navigation.filter((item) => !primary.some((primaryItem) => primaryItem.href === item.href)).map((item) => <NavLink key={item.href} item={item} onClick={() => setMoreOpen(false)} />)}</div></div>}
    </div>
  );
}
