# Bugs fictícios para exercício de portfólio

Os relatos abaixo são exemplos didáticos e não representam falhas encontradas na aplicação ou na execução dos testes.

## BUG-001 — Remover tarefa sem confirmação

- **Severidade:** Alta
- **Prioridade:** P1
- **Pré-condição:** Usuário autenticado e com uma tarefa existente.
- **Passos para reproduzir:** 1. Abrir a lista. 2. Clicar em “Excluir” em uma tarefa. 3. Observar a lista sem confirmar a ação.
- **Resultado atual:** A tarefa desaparece imediatamente.
- **Resultado esperado:** Exibir confirmação antes de excluir; remover somente após aceite.

## BUG-002 — Busca diferencia maiúsculas e minúsculas

- **Severidade:** Baixa
- **Prioridade:** P3
- **Pré-condição:** Usuário autenticado e com a tarefa “Revisar relatório” cadastrada.
- **Passos para reproduzir:** 1. Pesquisar `REVISAR`. 2. Observar os resultados.
- **Resultado atual:** Nenhuma tarefa é encontrada por causa da diferença de caixa.
- **Resultado esperado:** A pesquisa encontra títulos sem diferenciar maiúsculas/minúsculas.

## BUG-003 — Acesso direto ao painel sem autenticação

- **Severidade:** Crítica
- **Prioridade:** P0
- **Pré-condição:** Usuário deslogado.
- **Passos para reproduzir:** 1. Abrir `/protected` diretamente em uma nova sessão. 2. Observar o conteúdo exibido.
- **Resultado atual:** O painel e dados de tarefas aparecem sem autenticação.
- **Resultado esperado:** Redirecionar para login e não expor conteúdo protegido.
