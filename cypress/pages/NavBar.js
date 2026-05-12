class NavBar {
  get cadastrarProdutosLink() { return cy.get('[data-testid="cadastrarProdutos"]') }
  get listarProdutosLink()    { return cy.get('[data-testid="listarProdutos"]') }
  get logoutButton()          { return cy.get('[data-testid="logout"]') }

  irParaCadastrarProdutos() {
    this.cadastrarProdutosLink.click()
    return this
  }

  irParaListarProdutos() {
    this.listarProdutosLink.click()
    return this
  }

  sair() {
    this.logoutButton.click()
    return this
  }
}

export default new NavBar()
