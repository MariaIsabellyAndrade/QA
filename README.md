# QA Portfolio Lab

Projeto de portfólio para demonstrar testes E2E com Playwright e TypeScript em uma aplicação de gestão de tarefas. A aplicação de demonstração roda localmente e guarda usuário e tarefas no `localStorage` do navegador; os dados são isolados pelo contexto novo que o Playwright cria para cada teste.

## Requisitos

- Node.js 20 ou superior e npm.
- Git.
- Chromium do Playwright (instalado no primeiro setup).

## Instalação e execução local

```bash
npm install
npx playwright install chromium
npm run dev
```

Abra `http://127.0.0.1:5173`. Credenciais da demo: `qa@demo.com` / `Playwright123`. É uma autenticação simulada no cliente, sem finalidade de segurança ou uso em produção.

Em outro terminal, execute os testes:

```bash
npm run test:e2e
```

Abrir a interface interativa do Playwright:

```bash
npm run test:e2e:ui
```

Gerar/abrir o relatório HTML mais recente:

```bash
npm run report
```

O comando de testes já gera o relatório HTML em `playwright-report/`. Screenshots, traces e vídeos são guardados em `test-results/` para falhas; os diretórios de saída não são versionados. Para inspecionar um trace: `npx playwright show-trace test-results/<pasta-do-teste>/trace.zip`.

## Estrutura

```text
src/                   Aplicação demo (TypeScript e CSS)
tests/pages/           Page Objects de login e tarefas
tests/fixtures/        Fixtures compartilhadas
tests/*.spec.ts        Cenários E2E
docs/                  Matriz de cenários e bugs fictícios
.github/workflows/     Pipeline GitHub Actions
playwright.config.ts   Navegador, servidor, reporter e evidências
```

## Cobertura

A matriz completa está em [`docs/matriz-cenarios.md`](docs/matriz-cenarios.md) e os bugs fictícios em [`docs/bugs-ficticios.md`](docs/bugs-ficticios.md). A suíte cobre login válido/inválido, campos obrigatórios, criação válida/inválida, edição, exclusão com confirmação, pesquisa, filtros por status, acesso protegido e mensagens de erro/sucesso.

Os testes usam locators acessíveis por papel/rótulo e test IDs apenas para a coleção de tarefas. `fullyParallel` está habilitado; cada teste recebe um contexto/browser storage independente. Não há retries configurados. O servidor é iniciado automaticamente pelo Playwright.

## CI

GitHub Actions executa `npm ci`, instala Chromium, compila a aplicação e roda a suíte em push e pull request. O relatório HTML e `test-results/` são publicados como artefato mesmo quando houver falha. Para reproduzir localmente, use os comandos acima.

## Decisões e limitações

- Aplicação e autenticação são fictícias, client-side e sem API, banco de dados ou autorização real. A rota `/protected` serve para validar o fluxo de interface, não para demonstrar segurança.
- O armazenamento é `localStorage`, útil para uma demo sem backend; não representa persistência entre navegadores ou usuários reais.
- A confirmação de exclusão usa o diálogo nativo do browser.
- A suíte roda no Chromium para manter a configuração pequena. Outros navegadores podem ser incluídos adicionando projetos ao `playwright.config.ts`.
- A matriz documenta resultados esperados. Bugs em `docs/bugs-ficticios.md` são exemplos hipotéticos e não indicam defeitos encontrados na execução da suíte.

## Evidências

O relatório HTML é evidência gerada diretamente pelo Playwright após cada execução. Consulte `playwright-report/index.html` localmente; no GitHub Actions, baixe o artefato `playwright-report` associado à execução. O registro da execução feita durante a preparação deste portfólio fica em [`docs/evidencias-execucao.md`](docs/evidencias-execucao.md) e será atualizado somente com resultados observados.
