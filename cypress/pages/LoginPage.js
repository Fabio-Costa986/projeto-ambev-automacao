import { FRONTEND_MESSAGES as MSG } from '../constants/messages'

class LoginPage {
  get emailInput()   { return cy.get('[data-testid="email"]') }
  get senhaInput()   { return cy.get('[data-testid="senha"]') }
  get entrarButton() { return cy.get('[data-testid="entrar"]') }

  visitar() {
    cy.visit('/login')
    return this
  }

  preencherEmail(email) {
    this.emailInput.type(email)
    return this
  }

  preencherSenha(senha) {
    this.senhaInput.type(senha)
    return this
  }

  submeter() {
    this.entrarButton.click()
    return this
  }

  login(email, senha) {
    return this.visitar().preencherEmail(email).preencherSenha(senha).submeter()
  }

  // Assertions
  deveEstarNaHome() {
    cy.url().should('include', '/home')
    cy.contains(MSG.BEM_VINDO).should('be.visible')
  }

  deveExibirErroDeCredenciais() {
    cy.contains(MSG.LOGIN_INVALIDO).should('be.visible')
    cy.url().should('include', '/login')
  }

  deveExibirValidacaoDeCampoObrigatorio() {
    cy.contains(MSG.EMAIL_OBRIGATORIO).should('be.visible')
    cy.contains(MSG.PASSWORD_LOGIN_OBRIG).should('be.visible')
  }
}

export default new LoginPage()
