/**
 * Cenário E2E 01 — Login de usuário no frontend
 */

import LoginPage from '../../pages/LoginPage'

const API = Cypress.env('apiUrl')

const ADMIN = {
  nome:          'Admin E2E Login',
  email:         `admin.login.${Date.now()}@qa.com`,
  password:      'Senha@123',
  administrador: 'true',
}

describe('CE01 - Login de usuário', () => {
  before(() => {
    cy.request({ method: 'POST', url: `${API}/usuarios`, body: ADMIN, failOnStatusCode: false })
  })

  it('CE01-01: deve fazer login com credenciais válidas e ir para a home', () => {
    LoginPage.login(ADMIN.email, ADMIN.password)
    LoginPage.deveEstarNaHome()
  })

  it('CE01-02: deve exibir mensagem de erro ao usar senha incorreta', () => {
    LoginPage.login(ADMIN.email, 'senhaErrada999')
    LoginPage.deveExibirErroDeCredenciais()
  })

  it('CE01-03: deve exibir validação customizada ao tentar submeter com campos vazios', () => {
    LoginPage.visitar().submeter()
    LoginPage.deveExibirValidacaoObrigatoria()
  })
})
