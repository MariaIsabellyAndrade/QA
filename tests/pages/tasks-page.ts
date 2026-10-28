import { expect, type Locator, type Page } from '@playwright/test';

export class TasksPage {
  readonly title: Locator;
  readonly description: Locator;
  readonly saveButton: Locator;
  readonly message: Locator;
  readonly search: Locator;
  readonly statusFilter: Locator;
  readonly items: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByLabel('Título');
    this.description = page.getByLabel('Descrição');
    this.saveButton = page.getByRole('button', { name: 'Adicionar tarefa' });
    this.message = page.getByRole('alert');
    this.search = page.getByRole('searchbox', { name: 'Pesquisar tarefas' });
    this.statusFilter = page.getByLabel('Filtrar por status');
    this.items = page.getByTestId('task-item');
  }

  async create(title: string, description = '') {
    await this.title.fill(title);
    if (description) await this.description.fill(description);
    await this.saveButton.click();
  }
  async expectTask(title: string) { await expect(this.page.getByRole('heading', { name: title })).toBeVisible(); }
}
