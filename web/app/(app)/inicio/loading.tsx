function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-3xl bg-[#E2EEF0] ${className}`} aria-hidden="true" />;
}

export default function HomeLoading() {
  return (
    <div className="space-y-12 pb-4" role="status" aria-live="polite" aria-label="A carregar a página inicial">
      <SkeletonBlock className="h-72 bg-[#D8E5EA] sm:h-80" />
      <section aria-hidden="true">
        <SkeletonBlock className="h-4 w-24" />
        <SkeletonBlock className="mt-3 h-8 w-72 max-w-full" />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => <SkeletonBlock key={index} className="h-48" />)}
        </div>
      </section>
      <section aria-hidden="true">
        <SkeletonBlock className="h-8 w-60 max-w-full" />
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => <SkeletonBlock key={index} className="h-64" />)}
        </div>
      </section>
      <span className="sr-only">A preparar o teu espaço de aprendizagem…</span>
    </div>
  );
}
