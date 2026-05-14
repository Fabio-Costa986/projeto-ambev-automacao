# ServeRest — Automação de Testes com Cypress

Projeto de testes automatizados E2E (frontend) e de API para a aplicação [ServeRest](https://serverest.dev), utilizando **Cypress 12** e o padrão **Page Object Model (POM)**.

---

## Sumário

- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Executar](#como-executar)
- [Cenários de Teste](#cenários-de-teste)
  - [Frontend E2E](#frontend-e2e)
  - [API](#api)
- [Relatório](#relatório)
- [Padrões e Decisões de Projeto](#padrões-e-decisões-de-projeto)
- [Observações Importantes](#observações-importantes)

---

## Tecnologias

| Ferramenta | Versão | Finalidade |
|---|---|---|
| [Cypress](https://www.cypress.io/) | 12.17.4 | Framework de testes E2E e API |
| [cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter) | 4.0.2 | Geração de relatório HTML |
| [@faker-js/faker](https://fakerjs.dev/) | 10.x | Geração de dados dinâmicos |
| Node.js | ≥ 18 | Runtime |

---

## Pré-requisitos

- Node.js 18 ou superior instalado
- npm 8 ou superior
- Acesso à internet (os testes consomem APIs e frontend públicos)

---

## Instalação

```bash
# Clonar / entrar na pasta do projeto
cd cypress

# Instalar dependências
npm install
```

> O binário do Cypress é baixado automaticamente na primeira execução.

---

## Configuração

### `cypress.config.js`

```js
module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',   // pasta de saída do relatório
    charts: true,                   // gráficos de pizza no HTML
    embeddedScreenshots: true,      // screenshots embutidas inline
    inlineAssets: true,             // HTML totalmente portável (sem dependências externas)
  },
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,   // captura automática em caso de falha
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    env: {
      apiUrl: 'https://serverest.dev',  // URL base da API — acessível via Cypress.env('apiUrl')
    },
  },
})
```

### Variáveis de ambiente disponíveis

| Chave | Valor padrão | Descrição |
|---|---|---|
| `apiUrl` | `https://serverest.dev` | URL base da API ServeRest |

Para sobrescrever em tempo de execução:

```bash
npx cypress run --env apiUrl=https://outra-api.dev
```

### Problema conhecido no Windows com VS Code

O VS Code define `ELECTRON_RUN_AS_NODE=1`, o que impede o Cypress de iniciar. Todos os scripts do projeto já tratam isso. Ao rodar manualmente no terminal, utilize:

```powershell
$env:ELECTRON_RUN_AS_NODE = ""; npx cypress run
```

---

## Estrutura do Projeto

```
cypress/
├── cypress.config.js               # Configuração global do Cypress e reporter
├── package.json
│
└── cypress/
    ├── e2e/
    │   ├── api/                    # Testes de API (cy.request)
    │   │   ├── login.api.cy.js     # CA02 — Autenticação
    │   │   ├── produtos.api.cy.js  # CA03 — CRUD de Produtos
    │   │   └── usuarios.api.cy.js  # CA01 — CRUD de Usuários
    │   │
    │   └── frontend/               # Testes E2E (browser)
    │       ├── cadastro.cy.js      # CE02 — Cadastro de usuário
    │       ├── login.cy.js         # CE01 — Login
    │       └── produtos.cy.js      # CE03 — Gestão de produtos
    │
    ├── pages/                      # Page Objects (POM)
    │   ├── LoginPage.js            # Seletores e ações da tela de login
    │   ├── CadastroPage.js         # Seletores e ações do cadastro de usuário
    │   ├── NavBar.js               # Navegação pelo menu admin
    │   ├── CadastroProdutoPage.js  # Formulário de cadastro de produto
    │   └── ListaProdutosPage.js    # Tabela de listagem de produtos
    │
    ├── support/
    │   ├── commands.js             # Comandos customizados do Cypress
    │   └── e2e.js                  # Ponto de entrada do suporte (imports globais)
    │
    ├── fixtures/
    │   └── usuarios.json           # Massa de dados estática de referência
    │
    └── reports/                    # Relatório HTML gerado automaticamente
        └── index.html
```

---

## Como Executar

### Interface gráfica (modo interativo)

```bash
npm run cy:open
```

### Headless — todos os testes

```bash
npm run cy:run
# ou
npm run cy:report   # idêntico, com geração explícita do relatório
```

### Apenas testes de frontend

```bash
npm run cy:frontend
```

### Apenas testes de API

```bash
npm run cy:api
```

### Spec específico

```bash
npx cypress run --spec "cypress/e2e/api/login.api.cy.js"
```

### Resultado esperado

```
√  api/login.api.cy.js        4/4  ~1s
√  api/produtos.api.cy.js     4/4  ~2s
√  api/usuarios.api.cy.js     4/4  ~1s
√  frontend/cadastro.cy.js    3/3  ~14s
√  frontend/login.cy.js       3/3   ~6s
√  frontend/produtos.cy.js    3/3  ~12s
───────────────────────────────────────
   Total                      21/21  ~36s
```

---

## Cenários de Teste

### Frontend E2E

Os testes de frontend simulam o fluxo real do usuário no browser, utilizando o padrão **Page Object Model**.

---

#### CE01 — Login de usuário [`login.cy.js`](cypress/e2e/frontend/login.cy.js)

> Page Object: [`LoginPage.js`](cypress/pages/LoginPage.js)

| ID | Caso de Teste | Resultado Esperado |
|---|---|---|
| CE01-01 | Login com credenciais válidas | Redireciona para `/home` e exibe "Bem Vindo" |
| CE01-02 | Login com senha incorreta | Exibe "Email e/ou senha inválidos" e permanece em `/login` |
| CE01-03 | Submit com campos vazios | Exibe mensagem customizada "é obrigatório" |

**Pré-condição:** usuário administrador criado via API antes da suíte (`before`).

---

#### CE02 — Cadastro de usuário [`cadastro.cy.js`](cypress/e2e/frontend/cadastro.cy.js)

> Page Object: [`CadastroPage.js`](cypress/pages/CadastroPage.js)

| ID | Caso de Teste | Resultado Esperado |
|---|---|---|
| CE02-01 | Cadastro com dados válidos | Login automático e redirecionamento para `/home` (Serverest Store) |
| CE02-02 | Cadastro com e-mail já existente | Exibe "Este email já está sendo usado" |
| CE02-03 | Submit com campos vazios | Exibe mensagem customizada "é obrigatório" |

> **Comportamento observado:** após o cadastro bem-sucedido, o app realiza login automático e redireciona direto para a home da loja — não para a tela de login.

---

#### CE03 — Gestão de produtos [`produtos.cy.js`](cypress/e2e/frontend/produtos.cy.js)

> Page Objects: [`NavBar.js`](cypress/pages/NavBar.js), [`CadastroProdutoPage.js`](cypress/pages/CadastroProdutoPage.js), [`ListaProdutosPage.js`](cypress/pages/ListaProdutosPage.js)

| ID | Caso de Teste | Resultado Esperado |
|---|---|---|
| CE03-01 | Admin cadastra novo produto | Redireciona para listagem com o produto visível |
| CE03-02 | Produto cadastrado aparece na listagem | Produto encontrado na tabela `/admin/listarprodutos` |
| CE03-03 | Admin exclui produto da listagem | Produto removido da tabela |

**Pré-condição:** usuário administrador criado via API (`before`). Login realizado via UI no `beforeEach`.

---

### API

Os testes de API utilizam `cy.request()` diretamente, sem abrir o browser. Cada teste cria seus próprios dados com `Date.now()` para garantir isolamento entre execuções.

---

#### CA01 — CRUD de Usuários [`usuarios.api.cy.js`](cypress/e2e/api/usuarios.api.cy.js)

**Endpoint base:** `POST|GET|PUT|DELETE /usuarios`

| ID | Método | Endpoint | Resultado Esperado |
|---|---|---|---|
| CA01-01 | `POST` | `/usuarios` | Status 201 + `_id` no body |
| CA01-02 | `GET` | `/usuarios/{id}` | Status 200 + dados do usuário criado |
| CA01-03 | `PUT` | `/usuarios/{id}` | Status 200 + confirmação de atualização |
| CA01-04 | `DELETE` | `/usuarios/{id}` | Status 200 + confirmação de exclusão |

---

#### CA02 — Autenticação [`login.api.cy.js`](cypress/e2e/api/login.api.cy.js)

**Endpoint:** `POST /login`

| ID | Cenário | Status Esperado |
|---|---|---|
| CA02-01 | Credenciais válidas | 200 + `authorization` no body |
| CA02-02 | Senha incorreta | 401 + "Email e/ou senha inválidos" |
| CA02-03 | E-mail inexistente | 401 + "Email e/ou senha inválidos" |
| CA02-04 | Formato do token | Token no padrão `Bearer <header>.<payload>.<signature>` |

---

#### CA03 — CRUD de Produtos [`produtos.api.cy.js`](cypress/e2e/api/produtos.api.cy.js)

**Endpoint base:** `POST|GET|DELETE /produtos` (requer autenticação de administrador)

| ID | Método | Endpoint | Resultado Esperado |
|---|---|---|---|
| CA03-01 | `POST` | `/produtos` | Status 201 + `_id` no body |
| CA03-02 | `GET` | `/produtos` | Status 200 + `quantidade` (number) + `produtos` (array) |
| CA03-03 | `GET` | `/produtos/{id}` | Status 200 + `preco` e `quantidade` corretos |
| CA03-04 | `DELETE` | `/produtos/{id}` | Status 200 + confirmação de exclusão |

---

## Relatório

O relatório HTML é gerado automaticamente ao final de qualquer execução em modo headless, salvo em:

```
cypress/reports/index.html
```

É um arquivo **autossuficiente** (assets e screenshots embutidos) — pode ser aberto diretamente no browser ou compartilhado sem dependências externas.

Para abrir após a execução:

```powershell
# Windows
Start-Process "cypress\reports\index.html"
```

---

## Padrões e Decisões de Projeto

### Page Object Model (POM)

Os testes de frontend seguem o padrão POM. Cada Page Object expõe:

- **Getters** (`get emailInput()`) — retornam o elemento via `cy.get()`, avaliado sob demanda
- **Métodos de ação** — realizam interações e retornam `this` para encadeamento fluente
- **Métodos de asserção** (`deve...()`) — encapsulam asserções semânticas legíveis

```js
// Exemplo de uso nos specs — sem nenhum seletor exposto
LoginPage.login(email, senha)
LoginPage.deveEstarNaHome()
```

### Isolamento de dados

- Cada suíte cria seus próprios usuários/produtos via `cy.request()` no `before()`
- E-mails únicos são gerados com `Date.now()` — sem conflito entre execuções paralelas ou consecutivas

### `failOnStatusCode: false`

Usado exclusivamente em requisições onde o teste valida respostas de erro HTTP (4xx), para evitar que o Cypress interrompa o teste antes da asserção.

---

## Observações Importantes

| Comportamento | Descrição |
|---|---|
| Login automático pós-cadastro | Ao cadastrar um usuário comum, o app realiza login automático e redireciona para `/home` (loja), não para `/login` |
| `data-testid="quantity"` | O campo de quantidade no formulário de produto usa `quantity` (não `quantidade`) — typo presente no app |
| Botão "Excluir" sem `data-testid` | Na listagem de produtos, o botão Excluir não possui `data-testid`; localizado via `cy.contains('button', 'Excluir')` dentro da `<tr>` do produto |
| Validação customizada | Os formulários usam validação React, não validação nativa HTML5 — a mensagem "é obrigatório" é um elemento do DOM |
