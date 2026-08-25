import { nextTutorResponse } from '@/domain/tutor';
import type { DictionaryEntry, StudyCard, TutorInput } from '@/domain/types';
import type { TutorProvider } from '../tutor-provider';

const dictionary: Record<string, DictionaryEntry> = {
  autonomia: { word: 'autonomia', meaning: 'Capacidade de fazer escolhas e realizar tarefas por ti, com responsabilidade.', example: 'A Leonor mostrou autonomia ao organizar o seu estudo.', synonym: 'independência', antonym: 'dependência' },
  compreender: { word: 'compreender', meaning: 'Perceber o significado ou a razão de alguma coisa.', example: 'O Rui fez uma pergunta para compreender o problema.', synonym: 'entender' },
  explorar: { word: 'explorar', meaning: 'Observar ou investigar algo para aprender mais.', example: 'Vamos explorar uma nova ideia em Ciências.', synonym: 'investigar' },
};

export class MockTutorProvider implements TutorProvider {
  async sendMessage(input: TutorInput) { return nextTutorResponse(input); }

  async analyzeStudyImage(_input: { name: string; type: string; size: number }) {
    void _input;
    return { focus: 'Rever o raciocínio passo a passo', prompt: 'Este é um exemplo de análise. Como chegaste ao resultado que queres rever?' };
  }

  async generateStudyCards({ quantity }: { subject: string; topic: string; quantity: 3 | 5 | 10 }): Promise<StudyCard[]> {
    const templates = [
      ['O que já sabes sobre este tema?', 'Pensa numa ideia ou palavra-chave.', 'Começar pelo que já sabemos ajuda a ligar novas ideias.'],
      ['Como explicarias este tema a um colega?', 'Usa frases curtas e um exemplo.', 'Explicar por palavras nossas ajuda a perceber o que falta compreender.'],
      ['Que pergunta gostarias de conseguir responder?', 'Começa por: “Como…?” ou “Porquê…?”', 'Uma boa pergunta orienta o estudo.'],
      ['Qual é a ideia mais importante?', 'Escolhe apenas uma ideia.', 'Distinguir o essencial ajuda a organizar a memória.'],
      ['Que exemplo podes criar?', 'Liga o tema a uma situação conhecida.', 'Criar exemplos mostra se compreendemos uma ideia.'],
    ];
    return Array.from({ length: quantity }, (_, index) => {
      const item = templates[index % templates.length];
      return { id: `mock-${index + 1}`, question: item[0], hint: item[1], explanation: item[2] };
    });
  }

  async defineWord({ word }: { word: string }) { return dictionary[word.trim().toLocaleLowerCase('pt-PT')] ?? null; }
}
