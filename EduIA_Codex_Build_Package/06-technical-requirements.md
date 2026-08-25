# 06 — Technical Requirements

## Stack sugerida
Preferência inicial:
- Next.js
- TypeScript strict
- Tailwind CSS
- Zod
- testes unitários + e2e
- PostgreSQL/Supabase apenas quando persistência real for necessária

## Arquitetura
UI → Application layer → Tutor service → AI provider adapter → Safety → Persistence

Nunca chamar provider de IA diretamente do browser.

## Interface
Criar `TutorProvider` com:
- `sendMessage()`
- `analyzeStudyImage()`
- `generateStudyCards()`
- `defineWord()`

Começar com mocks.

## Upload
- validar tipo/tamanho
- preview local
- não armazenar por defeito
- adapter de vision posterior

## Segurança
- secrets server-side
- `.env.example`
- rate limiting
- validação de input
- tratamento de erros
- sem keys no git

## PWA
Não implementar inicialmente.
