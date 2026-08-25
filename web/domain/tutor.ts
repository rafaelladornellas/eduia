import type { TutorInput, TutorResponse } from './types';

function isShortcutRequest(text: string) {
  return /(?:diz|dá|mostra).{0,18}(?:resposta|resultado)|só a resposta/i.test(text);
}

function isFractionExample(text: string) {
  return /3\s*\/\s*4|1\s*\/\s*2|fraç/i.test(text);
}

export function nextTutorResponse(input: TutorInput): TutorResponse {
  if (input.action === 'independent') {
    return { message: 'Combinado. Tenta ao teu ritmo. Quando estiveres pronto, escreve aqui o teu raciocínio.', stage: input.stage, attemptCount: input.attemptCount, completed: false, helpUsed: 0 };
  }

  if (isShortcutRequest(input.message)) {
    return { message: 'Posso ajudar-te a chegar lá, mas não vou saltar os passos por ti. Qual é a primeira coisa que já sabes sobre o exercício?', stage: 'first-hint', attemptCount: input.attemptCount, completed: false, helpUsed: 1 };
  }

  if (input.stage === 'intake') {
    const message = isFractionExample(input.message)
      ? 'Boa pergunta! Vamos descobrir juntos 🙂 Para somarmos frações, primeiro olhamos para os denominadores. Que números aparecem em baixo?'
      : 'Boa pergunta! Vamos por partes 🙂 O que já sabes e qual é o passo onde ficaste com dúvidas?';
    return { message, stage: 'first-hint', attemptCount: 0, completed: false, helpUsed: 1 };
  }

  if (input.action === 'rephrase') {
    return { message: 'Imagina que explicavas o exercício a um colega. Que dados tens? E o que precisas de descobrir primeiro?', stage: input.stage, attemptCount: input.attemptCount, completed: false, helpUsed: 1 };
  }

  if (input.action === 'hint') {
    const message = isFractionExample(input.message)
      ? 'Uma pista: transforma 1/2 numa fração com denominador 4. Por quanto multiplicas o 2?'
      : 'Pista pequena: sublinha mentalmente os dados importantes e escolhe apenas uma operação ou ideia para testar primeiro.';
    return { message, stage: 'second-hint', attemptCount: input.attemptCount, completed: false, helpUsed: 1 };
  }

  if (input.attemptCount === 0) {
    const message = isFractionExample(input.message)
      ? 'Estás a avançar. Se multiplicares numerador e denominador de 1/2 por 2, obténs 2/4. Agora, quanto é 3/4 + 2/4?'
      : 'Boa tentativa. Confirma cada passo: usaste todos os dados e a operação responde mesmo ao que foi perguntado? Faz uma segunda tentativa.';
    return { message, stage: 'second-hint', attemptCount: 1, completed: false, helpUsed: 1 };
  }

  if (input.stage === 'practice') {
    return { message: 'Muito bem por teres tentado. Resume numa frase o que aprendeste e fica concluído.', stage: 'summary', attemptCount: input.attemptCount, completed: true, helpUsed: 0 };
  }

  const message = isFractionExample(input.message)
    ? 'Vamos organizar: 1/2 equivale a 2/4. Com denominadores iguais, somamos os numeradores: 3/4 + 2/4 = 5/4, ou 1 e 1/4. Agora experimenta 1/3 + 1/6: qual é o denominador comum?'
    : 'Depois de duas tentativas, vemos o método completo: identifica os dados, escolhe a regra, aplica-a passo a passo e verifica se o resultado responde à pergunta. Agora tenta o mesmo método num exemplo semelhante.';
  return { message, stage: 'practice', attemptCount: 2, completed: false, helpUsed: 0 };
}
