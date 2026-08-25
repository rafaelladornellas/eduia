import Link from 'next/link';

export function PageHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description: string }) {
  return <header className="mb-8 max-w-3xl">{eyebrow && <p className="text-sm font-extrabold uppercase tracking-[.12em] text-[#0b7f81]">{eyebrow}</p>}<h1 className="mt-1 text-3xl font-black tracking-[-.03em] text-[#0E2A55] sm:text-4xl">{title}</h1><p className="mt-3 text-base leading-7 text-[#52677c] sm:text-lg">{description}</p></header>;
}

export function Notice({ children, tone = 'info' }: { children: React.ReactNode; tone?: 'info' | 'warning' | 'success' }) {
  const tones = { info: 'border-[#aee5e6] bg-[#eefafa] text-[#195d68]', warning: 'border-[#f7d89f] bg-[#fff8ea] text-[#76511a]', success: 'border-[#a8dfc4] bg-[#edf9f3] text-[#245f43]' };
  return <div role="status" className={`rounded-2xl border p-4 text-sm font-semibold leading-6 ${tones[tone]}`}>{children}</div>;
}

export function ActionCard({ href, title, description, icon }: { href: string; title: string; description: string; icon: string }) {
  return <Link href={href} className="group flex min-h-36 flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#dcebed] transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#18B9B7]"><span className="grid size-12 place-items-center rounded-2xl bg-[#e4f8f8] text-xl font-black text-[#087679]" aria-hidden="true">{icon}</span><h2 className="mt-5 font-extrabold text-[#0E2A55]">{title}</h2><p className="mt-2 text-sm leading-6 text-[#617589]">{description}</p><span className="mt-auto pt-3 font-bold text-[#0b7f81]">Começar <span aria-hidden="true">→</span></span></Link>;
}

export function ErrorMessage({ children }: { children: React.ReactNode }) {
  return <p role="alert" className="rounded-2xl border border-[#f4c9c2] bg-[#fff4f2] p-4 text-sm font-semibold text-[#874135]">{children}</p>;
}
