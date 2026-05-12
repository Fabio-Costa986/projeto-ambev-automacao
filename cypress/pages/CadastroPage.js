class CadastroPage {
  // Selectors
  get nomeInput()       { return cy.get('[data-testid="nome"]') }
  get emailInput()      { return cy.get('[data-testid="email"]') }
  get passwordInput()   { return cy.get('[data-testid="password"]') }
  get adminCheckbox()   { return cy.get('[data-testid="checkbox"]') }
  get cadastrarButton() { return cy.get('[data-testid="cadastrar"]') }
  get validacaoObrig()  { return cy.contains('é obrigatório') }
  get erroEmailDupl()   { return cy.contains('Este email já está sendo usado') }

  // Actions
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
    cy.contains('Serverest Store').should('be.visible')
  }

  deveExibirErroEmailDuplicado() {
    this.erroEmailDupl.should('be.visible')
  }

  deveExibirValidacaoObrigatoria() {
    this.validacaoObrig.should('be.visible')
  }
}

export default new CadastroPage()
