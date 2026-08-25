const personalDataPatterns = [
  /\b\d{9}\b/,
  /\b(?:morada|telefone|telemóvel|escola|endereço)\b/i,
];

const sensitivePatterns = [
  /\b(?:matar|suicídio|suicidar|auto[- ]?mutilação)\b/i,
  /\b(?:diagnóstico|medicação)\b/i,
];

export function inspectInput(text: string) {
  if (personalDataPatterns.some((pattern) => pattern.test(text))) {
    return { allowed: false, message: 'Para te proteger, não partilhes dados pessoais. Podemos continuar sem nomes, contactos ou escola.' };
  }
  if (sensitivePatterns.some((pattern) => pattern.test(text))) {
    return { allowed: false, message: 'Este tema precisa da ajuda de um adulto de confiança. Fala com um adulto que esteja perto de ti. Eu posso continuar a ajudar-te com uma atividade escolar.' };
  }
  return { allowed: true as const };
}

export function normalizeSafeOutput(text: string) {
  return text.replace(/\bAPI\b|HTTP\s?\d{3}|JSON/gi, 'serviço');
}
