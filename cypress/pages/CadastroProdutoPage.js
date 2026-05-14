class CadastroProdutoPage {
  get nomeInput()       { return cy.get('[data-testid="nome"]') }
  get precoInput()      { return cy.get('[data-testid="preco"]') }
  get descricaoInput()  { return cy.get('[data-testid="descricao"]') }
  get quantidadeInput() { return cy.get('[data-testid="quantity"]') }
  get cadastrarButton() { return cy.get('[data-testid="cadastarProdutos"]') }

  preencherNome(nome) {
    this.nomeInput.type(nome)
    return this
  }

  preencherPreco(preco) {
    this.precoInput.type(String(preco))
    return this
  }

  preencherDescricao(descricao) {
    this.descricaoInput.type(descricao)
    return this
  }

  preencherQuantidade(quantidade) {
    this.quantidadeInput.type(String(quantidade))
    return this
  }

  submeter() {
    this.cadastrarButton.click()
    return this
  }

  cadastrar({ nome, preco, descricao, quantidade }) {
    return this
      .preencherNome(nome)
      .preencherPreco(preco)
      .preencherDescricao(descricao)
      .preencherQuantidade(quantidade)
      .submeter()
  }

  // Assertions
  deveTerRedirecionadoComProduto(nomeProduto) {
    cy.url().should('include', '/admin/listarprodutos')
    cy.contains(nomeProduto).should('be.visible')
  }
}

export default new CadastroProdutoPage()
