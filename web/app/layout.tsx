import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'EduIA — Aprender melhor, com mais autonomia',
  description: 'Companheiro de aprendizagem para o 5.º ano.',
  openGraph: {
    title: 'EduIA',
    description: 'Aprender melhor, com mais autonomia.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EduIA',
    description: 'Aprender melhor, com mais autonomia.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-PT"><body>{children}</body></html>;
}
