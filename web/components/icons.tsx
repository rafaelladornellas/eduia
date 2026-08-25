const glyphs: Record<string, string> = {
  home: '⌂', subjects: '▦', doubts: '?', review: '✓', dictionary: 'Aa', cards: '◇', progress: '↗', settings: '⚙',
};

export function AppIcon({ name, className = '' }: { name: keyof typeof glyphs; className?: string }) {
  return <span aria-hidden="true" className={`grid size-8 shrink-0 place-items-center rounded-xl text-sm font-black ${className}`}>{glyphs[name]}</span>;
}
