import { sendTutorMessage } from '@/application/use-cases';
import { tutorProvider } from '@/lib/provider';
import { z } from 'zod';

const schema = z.object({
  context: z.enum(['doubt', 'homework', 'understand', 'review']),
  message: z.string().trim().min(1).max(1200),
  action: z.enum(['message', 'hint', 'rephrase', 'independent']),
  attemptCount: z.number().int().min(0).max(20),
  stage: z.enum(['intake', 'first-hint', 'second-hint', 'explanation', 'practice', 'summary']),
});

export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return Response.json({ message: 'Escreve uma pergunta curta para continuarmos.' }, { status: 400 });
    return Response.json(await sendTutorMessage(tutorProvider, parsed.data));
  } catch {
    return Response.json({ message: 'O EduIA não conseguiu responder agora. Tenta novamente dentro de instantes.' }, { status: 503 });
  }
}
