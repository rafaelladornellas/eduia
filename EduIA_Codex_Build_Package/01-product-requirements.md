# 01 — Product Requirements

## Product statement
EduIA é um companheiro de aprendizagem com IA para crianças do 5.º ano em Portugal.

## Problema inicial
A transição para o 5.º ano aumenta disciplinas, professores, trabalhos, testes e responsabilidades. Algumas crianças podem precisar de apoio para compreender matérias e estudar com maior autonomia.

## Navegação principal
- Início
- Disciplinas
- Dúvidas
- Revisão
- Dicionário
- Cartões de Estudo
- Meu Progresso
- Definições

## Disciplinas
Ler `data/subjects.json`.

## Dúvidas
Abrir Tutor EduIA com contextos:
- Tenho uma dúvida
- Estou a fazer o TPC
- Quero perceber uma matéria

## Revisão
Permitir upload/fotografia de teste, prova, ficha, trabalho ou exercício.
Fluxo:
1. receber imagem;
2. identificar ponto a rever;
3. não entregar correção imediatamente;
4. iniciar orientação socrática;
5. ajudar a criança a compreender o erro.

A integração vision pode começar mockada.

## Dicionário
Mostrar:
- significado simples;
- exemplo;
- sinónimo quando aplicável;
- antónimo quando aplicável;
- convite para a criança criar uma frase.

## Cartões de Estudo
Escolher disciplina, tema e 3/5/10 cartões.
Cada cartão:
- pergunta;
- tentativa;
- pista opcional;
- explicação;
- próximo cartão.

## Meu Progresso
Preferir:
- temas estudados;
- sessões concluídas;
- exercícios resolvidos após orientação;
- nível de ajuda necessário.

Evitar streaks, rankings e métricas compulsivas.

## Fora do escopo V0
- app nativa
- integração com escolas
- pagamentos
- vários agentes
- RAG curricular completo
- dashboard parental avançado
