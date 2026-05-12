class LoginPage {
  // Selectors
  get emailInput()    { return cy.get('[data-testid="email"]') }
  get senhaInput()    { return cy.get('[data-testid="senha"]') }
  get entrarButton()  { return cy.get('[data-testid="entrar"]') }
  get erroMessage()   { return cy.contains('Email e/ou senha inválidos') }
  get validacaoObrig(){ return cy.contains('é obrigatório') }

  // Actions
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
    cy.contains('Bem Vindo').should('be.visible')
  }

  deveExibirErroDeCredenciais() {
    this.erroMessage.should('be.visible')
    cy.url().should('include', '/login')
  }

  deveExibirValidacaoObrigatoria() {
    this.validacaoObrig.should('be.visible')
  }
}

export default new LoginPage()
