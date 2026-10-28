# Matriz de cenários

| ID | Objetivo | Pré-condições | Passos | Resultado esperado |
|---|---|---|---|---|
| AUTH-01 | Validar login válido | Usuário deslogado; credenciais demo disponíveis | Abrir `/`; preencher e-mail e senha válidos; enviar | Painel “Minhas tarefas” visível |
| AUTH-02 | Rejeitar senha incorreta | Usuário deslogado | Abrir `/`; preencher e-mail válido e senha incorreta; enviar | Mensagem “E-mail ou senha inválidos.”; login permanece visível |
| AUTH-03 | Validar obrigatoriedade do login | Usuário deslogado | Abrir `/`; enviar formulário vazio | Mensagem “Preencha todos os campos.” |
| AUTH-04 | Bloquear página protegida sem login | Usuário deslogado | Abrir `/protected` diretamente | Redireciona para `/`, mostra login e informa que é necessário entrar |
| TASK-01 | Cadastrar tarefa válida e validar sucesso | Usuário autenticado | Informar título e descrição; adicionar | Tarefa aparece com mensagem de sucesso |
| TASK-02 | Rejeitar tarefa sem título | Usuário autenticado; lista vazia | Enviar formulário sem título | Erro de título obrigatório; lista permanece vazia |
| TASK-03 | Editar tarefa | Usuário autenticado; tarefa original criada | Editar título; salvar alterações | Novo título aparece, antigo deixa de aparecer e mensagem de sucesso é mostrada |
| TASK-04 | Excluir com confirmação | Usuário autenticado; tarefa criada | Acionar excluir; aceitar diálogo do browser | Tarefa removida e mensagem de sucesso exibida |
| TASK-05 | Pesquisar e filtrar tarefas | Usuário autenticado; duas tarefas criadas | Pesquisar título; concluir uma tarefa; filtrar pendente e concluída | Pesquisa limita resultados; cada filtro retorna a tarefa/status correspondente |
| TASK-06 | Rejeitar título composto por espaços | Usuário autenticado; lista vazia | Enviar título com espaços | Erro de título obrigatório; lista permanece vazia |
