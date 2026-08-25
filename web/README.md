# EduIA Web App

MVP responsivo do EduIA, um companheiro de aprendizagem socrático para crianças do 5.º ano em Portugal.

## Estado

Inclui os Milestones 0, 1, 2, 3, 4 e 6 do plano aprovado. Todos os serviços educativos usam mocks determinísticos. O Milestone 5, integração com IA real, permanece fora do MVP.

## Executar

Requer Node.js 22.13 ou superior.

```bash
npm install
npm run dev
```

Verificações:

```bash
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

## Arquitetura

`UI → Route Handlers → validação/use cases → safety → TutorProvider → mock provider`

- A UI nunca chama diretamente um fornecedor de IA.
- O provider mock implementa tutor, dicionário, cartões e revisão.
- As disciplinas vêm exclusivamente de `data/subjects.json`.
- Os temas são placeholders e não representam currículo oficial.
- Conversas, respostas livres e imagens permanecem apenas na sessão.
- O progresso guarda somente contagens agregadas no `localStorage` deste browser.

## Privacidade e segurança

A V0 não tem contas, perfis públicos, publicidade ou analytics externos. Não solicita nome, escola, morada, telefone ou localização. Uploads aceites: uma imagem JPEG, PNG ou WebP até 10 MB, processada em memória e descartada.

Qualquer piloto com crianças reais e qualquer provider de IA exigem revisão jurídica, RGPD/AI Act, avaliação de risco e política de retenção.
