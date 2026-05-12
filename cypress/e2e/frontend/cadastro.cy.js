/**
 * Cenário E2E 02 — Cadastro de novo usuário no frontend
 */

import CadastroPage from '../../pages/CadastroPage'

const API = Cypress.env('apiUrl')

describe('CE02 - Cadastro de novo usuário', () => {
  it('CE02-01: deve cadastrar usuário válido, fazer login automático e ir para a home', () => {
    CadastroPage.cadastrar({
      nome:     'Novo Usuario Cypress',
      email:    `usuario.${Date.now()}@qa.com`,
      password: 'Senha@123',
    })
    CadastroPage.deveRedirecionarParaHomeStore()
  })

  it('CE02-02: deve exibir erro ao cadastrar com e-mail já existente', () => {
    const emailFixo = `duplicado.${Date.now()}@qa.com`

    cy.request({
      method: 'POST',
      url: `${API}/usuarios`,
      body: { nome: 'Usuario Duplicado', email: emailFixo, password: 'Senha@123', administrador: 'false' },
    })

    CadastroPage.cadastrar({ nome: 'Usuario Duplicado 2', email: emailFixo, password: 'Senha@123' })
    CadastroPage.deveExibirErroEmailDuplicado()
  })

  it('CE02-03: deve exibir validações customizadas ao submeter formulário vazio', () => {
    CadastroPage.visitar().submeter()
    CadastroPage.deveExibirValidacaoObrigatoria()
  })
})
