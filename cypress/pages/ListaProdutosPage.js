class ListaProdutosPage {
  // Assertions
  deveExibirProduto(nomeProduto) {
    cy.url().should('include', '/admin/listarprodutos')
    cy.contains(nomeProduto).should('be.visible')
  }

  // Actions
  excluirProduto(nomeProduto) {
    cy.contains('td', nomeProduto)
      .closest('tr')
      .contains('button', 'Excluir')
      .click()
    return this
  }

  // Assertions
  naoDeveExibirProduto(nomeProduto) {
    cy.contains(nomeProduto).should('not.exist')
  }
}

export default new ListaProdutosPage()
