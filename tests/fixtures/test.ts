import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { TasksPage } from '../pages/tasks-page';

type Fixtures = { loginPage: LoginPage; tasksPage: TasksPage };

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  tasksPage: async ({ page }, use) => { await use(new TasksPage(page)); },
});

export { expect };
