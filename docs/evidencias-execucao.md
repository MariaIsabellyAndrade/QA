# Evidências de execução

Esta página deve registrar apenas execuções observadas. O relatório detalhado do Playwright, screenshots, vídeos e traces são produzidos pelos comandos documentados no README.

## Preparação

- Data local: 28/10/2026
- `npm install`: concluído; 18 pacotes adicionados, auditoria npm reportou 0 vulnerabilidades.
- `npm run build`: passou.
- `npx tsc --noEmit`: passou.
- Chromium: instalado via Playwright.

## Suíte E2E

### Execução informada pelo usuário

- Data local: 28/10/2026
- Comando: `npm run test:e2e`
- Resultado: 9 aprovados e 1 reprovado (10 testes em 11,8 s).
- Falha: `TASK-05 filtra e pesquisa tarefas`; o seletor amplo `getByText('Concluída').first()` selecionou a opção do `<select>` que estava oculta, em vez do rótulo de status na tarefa.
- Evidências reais daquela execução: screenshot, vídeo e `trace.zip` em `test-results/tasks-Gerenciamento-de-tar-9b4e0-5-filtra-e-pesquisa-tarefas-chromium/`.
- Correção aplicada após essa execução: restringir a asserção ao primeiro item da tarefa e comparar o texto do status com correspondência exata.
- Estado após a correção: aguardando nova execução local para confirmar o resultado. Não marcar como aprovado até essa execução.

O relatório daquela execução está em `playwright-report/index.html`. Para gerar uma nova execução e relatório: `npm run test:e2e`; depois `npm run report`. A pipeline do GitHub também executa e publica os artefatos.
