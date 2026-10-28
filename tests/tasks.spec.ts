import { test, expect } from './fixtures/test';

test.describe('Gerenciamento de tarefas', () => {
  test.beforeEach(async ({ loginPage }) => { await loginPage.open(); await loginPage.login(); });

  test('TASK-01 cadastra tarefa com dados válidos e confirma sucesso', async ({ tasksPage }) => {
    await tasksPage.create('Validar fluxo de login', 'Cenário positivo do laboratório');
    await expect(tasksPage.message).toHaveText('Tarefa adicionada com sucesso.');
    await tasksPage.expectTask('Validar fluxo de login');
  });

  test('TASK-02 rejeita cadastro sem título', async ({ tasksPage }) => {
    await tasksPage.saveButton.click();
    await expect(tasksPage.message).toHaveText('O título é obrigatório.');
    await expect(tasksPage.items).toHaveCount(0);
  });

  test('TASK-03 edita uma tarefa existente', async ({ tasksPage, page }) => {
    await tasksPage.create('Tarefa original');
    await page.getByRole('button', { name: 'Editar Tarefa original' }).click();
    await tasksPage.title.fill('Tarefa atualizada');
    await page.getByRole('button', { name: 'Salvar alterações' }).click();
    await expect(tasksPage.message).toHaveText('Tarefa atualizada com sucesso.');
    await tasksPage.expectTask('Tarefa atualizada');
    await expect(page.getByRole('heading', { name: 'Tarefa original' })).toHaveCount(0);
  });

  test('TASK-04 exclui tarefa após confirmação', async ({ tasksPage, page }) => {
    await tasksPage.create('Tarefa para excluir');
    page.once('dialog', async (dialog) => { expect(dialog.message()).toContain('Tarefa para excluir'); await dialog.accept(); });
    await page.getByRole('button', { name: 'Excluir Tarefa para excluir' }).click();
    await expect(tasksPage.message).toHaveText('Tarefa excluída com sucesso.');
    await expect(tasksPage.items).toHaveCount(0);
  });

  test('TASK-05 filtra e pesquisa tarefas', async ({ tasksPage, page }) => {
    await tasksPage.create('Revisar login');
    await tasksPage.create('Preparar relatório');
    await tasksPage.search.fill('login');
    await expect(tasksPage.items).toHaveCount(1);
    await tasksPage.expectTask('Revisar login');
    await tasksPage.search.clear();
    await page.getByRole('button', { name: 'Concluir Revisar login' }).click();
    await tasksPage.statusFilter.selectOption('Pendente');
    await expect(tasksPage.items).toHaveCount(1);
    await tasksPage.expectTask('Preparar relatório');
    await tasksPage.statusFilter.selectOption('Concluída');
    await expect(tasksPage.items).toHaveCount(1);
    await tasksPage.expectTask('Revisar login');
    await expect(tasksPage.items.first().getByText('Concluída', { exact: true })).toBeVisible();
  });

  test('TASK-06 título só com espaços é dado inválido', async ({ tasksPage }) => {
    await tasksPage.create('   ');
    await expect(tasksPage.message).toHaveText('O título é obrigatório.');
    await expect(tasksPage.items).toHaveCount(0);
  });
});
