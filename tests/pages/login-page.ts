import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly email: Locator;
  readonly password: Locator;
  readonly submit: Locator;
  readonly message: Locator;

  constructor(private readonly page: Page) {
    this.email = page.getByLabel('E-mail');
    this.password = page.getByLabel('Senha');
    this.submit = page.getByRole('button', { name: 'Entrar' });
    this.message = page.getByRole('alert');
  }

  async open(path = '/') { await this.page.goto(path); }
  async login(email = 'qa@demo.com', password = 'Playwright123') {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
  }
  async expectDashboard() { await expect(this.page.getByRole('heading', { name: 'Minhas tarefas' })).toBeVisible(); }
}
