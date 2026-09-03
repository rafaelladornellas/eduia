import { tutorProvider } from '@/lib/provider';
import { z } from 'zod';

const schema = z.object({ word: z.string().trim().min(1).max(60).regex(/^[\p{L}-]+$/u) });

export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return Response.json({ message: 'Escreve apenas uma palavra.' }, { status: 400 });
    const entry = await tutorProvider.defineWord(parsed.data);
    if (!entry) return Response.json({ message: 'Ainda não temos essa palavra no dicionário. Confirma a ortografia ou experimenta outra palavra.' }, { status: 404 });
    return Response.json(entry);
  } catch {
    return Response.json({ message: 'O dicionário está indisponível agora. Tenta novamente.' }, { status: 503 });
  }
}
