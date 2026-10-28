import './style.css';

type Task = { id: string; title: string; description: string; status: 'Pendente' | 'Concluída' };
const app = document.querySelector<HTMLDivElement>('#app')!;
const userKey = 'qa-lab-user';
const tasksKey = 'qa-lab-tasks';
const user = () => localStorage.getItem(userKey);
const tasks = (): Task[] => JSON.parse(localStorage.getItem(tasksKey) ?? '[]') as Task[];
const saveTasks = (items: Task[]) => localStorage.setItem(tasksKey, JSON.stringify(items));

function showLogin(message = '') {
  app.innerHTML = `<main class="auth-shell"><section class="card auth-card" aria-labelledby="login-title">
    <p class="eyebrow">QA PORTFOLIO LAB</p><h1 id="login-title">Entre na sua conta</h1><p class="muted">Acesse o painel de tarefas TaskFlow.</p>
    <form id="login-form" novalidate><label for="email">E-mail</label><input id="email" name="email" type="email" autocomplete="username" required placeholder="qa@demo.com" />
    <label for="password">Senha</label><input id="password" name="password" type="password" autocomplete="current-password" required placeholder="Sua senha" />
    <button type="submit">Entrar</button><p class="hint">Credenciais de demonstração: qa@demo.com / Playwright123</p>
    <p id="form-message" class="message" role="alert" aria-live="polite">${message}</p></form></section></main>`;
  document.querySelector<HTMLFormElement>('#login-form')!.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const email = String(data.get('email') ?? '').trim();
    const password = String(data.get('password') ?? '');
    const message = document.querySelector<HTMLElement>('#form-message')!;
    if (!email || !password) { message.textContent = 'Preencha todos os campos.'; return; }
    if (email === 'qa@demo.com' && password === 'Playwright123') { localStorage.setItem(userKey, email); render(); return; }
    message.textContent = 'E-mail ou senha inválidos.';
  });
}

function showDashboard() {
  app.innerHTML = `<header class="topbar"><div class="brand"><span class="brand-mark">✓</span><span>TaskFlow <small>QA Portfolio Lab</small></span></div>
    <div class="user-menu"><span>Olá, <strong>${escapeHtml(user() ?? '')}</strong></span><button id="logout" class="button-quiet">Sair</button></div></header>
    <main class="layout"><div class="page-heading"><div><p class="eyebrow">SEU ESPAÇO DE TRABALHO</p><h1>Minhas tarefas</h1><p class="muted">Organize seu dia, uma tarefa de cada vez.</p></div><span class="avatar" aria-hidden="true">QA</span></div>
    <section class="card task-card"><div class="section-heading"><div><h2>Lista de tarefas</h2><p class="muted">Cadastre, edite e acompanhe suas atividades.</p></div></div>
      <form id="task-form" novalidate><input type="hidden" id="task-id" /><div class="form-grid"><div class="field"><label for="task-title">Título</label><input id="task-title" name="title" required maxlength="80" placeholder="Ex.: Revisar cenários de login" /></div>
      <div class="field"><label for="task-description">Descrição</label><input id="task-description" name="description" maxlength="200" placeholder="Adicione alguns detalhes" /></div></div>
      <div class="form-actions"><p id="task-message" class="message" role="alert" aria-live="polite"></p><button id="save-task" type="submit">Adicionar tarefa</button></div></form>
      <div class="toolbar"><label class="search-field" for="search"><span aria-hidden="true">⌕</span><input id="search" type="search" placeholder="Pesquisar tarefas" aria-label="Pesquisar tarefas" /></label>
      <label class="filter-field" for="filter-status"><span class="sr-only">Filtrar por status</span><select id="filter-status" aria-label="Filtrar por status"><option value="Todas">Todas</option><option value="Pendente">Pendentes</option><option value="Concluída">Concluídas</option></select></label></div>
      <div id="task-list" class="task-list" aria-live="polite"></div><p id="empty-state" class="empty-state">Nenhuma tarefa por aqui. Adicione a primeira acima.</p>
    </section><footer>Uma aplicação de demonstração para praticar automação de testes.</footer></main>`;
  document.querySelector<HTMLButtonElement>('#logout')!.addEventListener('click', () => { localStorage.removeItem(userKey); render(); });
  document.querySelector<HTMLFormElement>('#task-form')!.addEventListener('submit', (event) => {
    event.preventDefault();
    const titleInput = document.querySelector<HTMLInputElement>('#task-title')!;
    const description = document.querySelector<HTMLInputElement>('#task-description')!;
    const idInput = document.querySelector<HTMLInputElement>('#task-id')!;
    const message = document.querySelector<HTMLElement>('#task-message')!;
    const title = titleInput.value.trim();
    if (!title) { message.textContent = 'O título é obrigatório.'; titleInput.focus(); return; }
    const items = tasks();
    if (idInput.value) {
      saveTasks(items.map((task) => task.id === idInput.value ? { ...task, title, description: description.value.trim() } : task));
      message.textContent = 'Tarefa atualizada com sucesso.';
    } else {
      saveTasks([...items, { id: crypto.randomUUID(), title, description: description.value.trim(), status: 'Pendente' }]);
      message.textContent = 'Tarefa adicionada com sucesso.';
    }
    document.querySelector<HTMLFormElement>('#task-form')!.reset(); idInput.value = ''; document.querySelector<HTMLButtonElement>('#save-task')!.textContent = 'Adicionar tarefa'; renderTasks();
  });
  document.querySelector<HTMLInputElement>('#search')!.addEventListener('input', renderTasks);
  document.querySelector<HTMLSelectElement>('#filter-status')!.addEventListener('change', renderTasks);
  renderTasks();
}

function renderTasks() {
  const list = document.querySelector<HTMLDivElement>('#task-list');
  if (!list) return;
  const query = document.querySelector<HTMLInputElement>('#search')!.value.trim().toLowerCase();
  const filter = document.querySelector<HTMLSelectElement>('#filter-status')!.value;
  const visible = tasks().filter((task) => task.title.toLowerCase().includes(query) && (filter === 'Todas' || task.status === filter));
  document.querySelector<HTMLElement>('#empty-state')!.hidden = visible.length > 0;
  list.innerHTML = visible.map((task) => `<article class="task-row" data-testid="task-item" data-task-id="${task.id}"><div class="task-content"><h3>${escapeHtml(task.title)}</h3><p>${escapeHtml(task.description || 'Sem descrição')}</p><span class="status status-${task.status === 'Pendente' ? 'pending' : 'done'}">${task.status}</span></div><div class="task-actions"><button class="icon-button toggle-task" aria-label="${task.status === 'Pendente' ? 'Concluir' : 'Reabrir'} ${escapeHtml(task.title)}" data-id="${task.id}">${task.status === 'Pendente' ? 'Concluir' : 'Reabrir'}</button><button class="icon-button edit-task" aria-label="Editar ${escapeHtml(task.title)}" data-id="${task.id}">Editar</button><button class="icon-button delete-task" aria-label="Excluir ${escapeHtml(task.title)}" data-id="${task.id}">Excluir</button></div></article>`).join('');
  list.querySelectorAll<HTMLButtonElement>('.toggle-task').forEach((button) => button.addEventListener('click', () => {
    saveTasks(tasks().map((task) => task.id === button.dataset.id ? { ...task, status: task.status === 'Pendente' ? 'Concluída' : 'Pendente' } : task));
    renderTasks();
  }));
  list.querySelectorAll<HTMLButtonElement>('.edit-task').forEach((button) => button.addEventListener('click', () => {
    const task = tasks().find((item) => item.id === button.dataset.id)!;
    document.querySelector<HTMLInputElement>('#task-id')!.value = task.id; document.querySelector<HTMLInputElement>('#task-title')!.value = task.title; document.querySelector<HTMLInputElement>('#task-description')!.value = task.description; document.querySelector<HTMLButtonElement>('#save-task')!.textContent = 'Salvar alterações'; document.querySelector<HTMLInputElement>('#task-title')!.focus();
  }));
  list.querySelectorAll<HTMLButtonElement>('.delete-task').forEach((button) => button.addEventListener('click', () => {
    const task = tasks().find((item) => item.id === button.dataset.id)!;
    if (window.confirm(`Deseja excluir a tarefa "${task.title}"?`)) { saveTasks(tasks().filter((item) => item.id !== task.id)); document.querySelector<HTMLElement>('#task-message')!.textContent = 'Tarefa excluída com sucesso.'; renderTasks(); }
  }));
}

function escapeHtml(value: string) { return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!); }
function render() {
  if (!user()) {
    const protectedRoute = window.location.pathname === '/protected';
    if (protectedRoute) window.history.replaceState({}, '', '/');
    showLogin(protectedRoute ? 'Faça login para acessar esta página.' : '');
    return;
  }
  showDashboard();
}
render();
