import { test, expect } from './fixtures/test';

test.describe('Autenticação e acesso', () => {
  test('AUTH-01 realiza login válido', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login();
    await loginPage.expectDashboard();
  });

  test('AUTH-02 mostra erro para senha incorreta', async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.login('qa@demo.com', 'senha-incorreta');
    await expect(loginPage.message).toHaveText('E-mail ou senha inválidos.');
    await expect(page.getByRole('heading', { name: 'Entre na sua conta' })).toBeVisible();
  });

  test('AUTH-03 valida campos obrigatórios', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.submit.click();
    await expect(loginPage.message).toHaveText('Preencha todos os campos.');
  });

  test('AUTH-04 bloqueia acesso direto à página protegida', async ({ loginPage, page }) => {
    await loginPage.open('/protected');
    await expect(page.getByRole('heading', { name: 'Entre na sua conta' })).toBeVisible();
    await expect(loginPage.message).toHaveText('Faça login para acessar esta página.');
    await expect(page).toHaveURL(/\/$/);
  });
});
