import Link from 'next/link';

export default function NotFound() { return <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center ring-1 ring-[#dcebed]"><p className="text-5xl" aria-hidden="true">🤔</p><h1 className="mt-5 text-2xl font-black text-[#0E2A55]">Não encontrámos esta página</h1><p className="mt-3 leading-7 text-[#5d7184]">Talvez o caminho tenha mudado. Volta ao início e escolhe outra atividade.</p><Link href="/inicio" className="mt-6 inline-flex rounded-2xl bg-[#0E2A55] px-5 py-3 font-bold text-white">Voltar ao início</Link></div>; }
