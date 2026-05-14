import { FRONTEND_MESSAGES as MSG } from '../constants/messages'

class CadastroPage {
  get nomeInput()       { return cy.get('[data-testid="nome"]') }
  get emailInput()      { return cy.get('[data-testid="email"]') }
  get passwordInput()   { return cy.get('[data-testid="password"]') }
  get adminCheckbox()   { return cy.get('[data-testid="checkbox"]') }
  get cadastrarButton() { return cy.get('[data-testid="cadastrar"]') }

  visitar() {
    cy.visit('/cadastrarusuarios')
    return this
  }

  preencherNome(nome) {
    this.nomeInput.type(nome)
    return this
  }

  preencherEmail(email) {
    this.emailInput.type(email)
    return this
  }

  preencherPassword(password) {
    this.passwordInput.type(password)
    return this
  }

  marcarAdministrador() {
    this.adminCheckbox.check()
    return this
  }

  submeter() {
    this.cadastrarButton.click()
    return this
  }

  cadastrar({ nome, email, password }) {
    return this
      .visitar()
      .preencherNome(nome)
      .preencherEmail(email)
      .preencherPassword(password)
      .submeter()
  }

  // Assertions
  deveRedirecionarParaHomeStore() {
    cy.url().should('include', '/home')
    cy.contains(MSG.STORE_HOME).should('be.visible')
  }

  deveExibirErroEmailDuplicado() {
    cy.contains(MSG.EMAIL_JA_USADO).should('be.visible')
  }

  deveExibirValidacaoDeCamposObrigatorios() {
    cy.contains(MSG.NOME_OBRIGATORIO).should('be.visible')
    cy.contains(MSG.EMAIL_OBRIGATORIO).should('be.visible')
    cy.contains(MSG.PASSWORD_OBRIGATORIO).should('be.visible')
  }
}

export default new CadastroPage()
