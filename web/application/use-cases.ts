import { inspectInput, normalizeSafeOutput } from '@/domain/safety';
import type { TutorInput } from '@/domain/types';
import type { TutorProvider } from '@/providers/tutor-provider';

export async function sendTutorMessage(provider: TutorProvider, input: TutorInput) {
  const safety = inspectInput(input.message);
  if (!safety.allowed) return { message: safety.message, stage: input.stage, attemptCount: input.attemptCount, completed: false, helpUsed: 0 };
  const result = await provider.sendMessage(input);
  return { ...result, message: normalizeSafeOutput(result.message) };
}
