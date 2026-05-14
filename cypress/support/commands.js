import { ENDPOINTS } from '../constants/endpoints'

// Cria um usuário via API e retorna o body da resposta
Cypress.Commands.add('criarUsuario', (body) =>
  cy.request({ method: 'POST', url: ENDPOINTS.USUARIOS(), body, failOnStatusCode: false })
    .its('body'),
)

// Autentica via API e retorna o token Bearer
Cypress.Commands.add('obterToken', (email, password) =>
  cy.request({ method: 'POST', url: ENDPOINTS.LOGIN(), body: { email, password } })
    .its('body.authorization'),
)

// Cria usuário admin e retorna o token — shortcut para setup de testes de produto
Cypress.Commands.add('criarAdminEObterToken', (usuario) =>
  cy.criarUsuario(usuario).then(() =>
    cy.obterToken(usuario.email, usuario.password),
  ),
)
