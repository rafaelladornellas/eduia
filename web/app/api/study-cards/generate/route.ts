import { tutorProvider } from '@/lib/provider';
import { z } from 'zod';

const schema = z.object({
  subject: z.string().min(1).max(80),
  topic: z.string().min(1).max(80),
  quantity: z.union([z.literal(3), z.literal(5), z.literal(10)]),
});

export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return Response.json({ message: 'Escolhe a disciplina, o tema e a quantidade.' }, { status: 400 });
    return Response.json({ cards: await tutorProvider.generateStudyCards(parsed.data) });
  } catch {
    return Response.json({ message: 'Não foi possível criar os cartões agora. Tenta novamente.' }, { status: 503 });
  }
}
