'use client';

export default function HomeError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="grid min-h-[60vh] place-items-center" role="alert" aria-labelledby="home-error-title">
      <div className="w-full max-w-xl rounded-[32px] bg-white p-7 text-center shadow-sm ring-1 ring-[#D8E8EA] sm:p-10">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#E5F8F8] text-xl font-black text-[#086F72]" aria-hidden="true">!</span>
        <h1 id="home-error-title" className="mt-5 text-2xl font-black text-[#0E2A55]">Não conseguimos preparar a página</h1>
        <p className="mx-auto mt-3 max-w-md leading-7 text-[#526B7E]">Houve um pequeno imprevisto ao carregar as disciplinas. Tenta novamente daqui a um momento.</p>
        <button type="button" onClick={reset} className="mt-7 min-h-12 rounded-2xl bg-[#0E2A55] px-6 py-3 font-extrabold text-white hover:bg-[#173A6D] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#18B9B7]">
          Tentar novamente
        </button>
      </div>
    </section>
  );
}
