/**
 * Cenário E2E 03 — Gestão de produtos no frontend (área administrativa)
 */

import LoginPage          from '../../pages/LoginPage'
import NavBar             from '../../pages/NavBar'
import CadastroProdutoPage from '../../pages/CadastroProdutoPage'
import ListaProdutosPage  from '../../pages/ListaProdutosPage'

const API = Cypress.env('apiUrl')

const ADMIN = {
  nome:          'Admin Produtos E2E',
  email:         `admin.produtos.${Date.now()}@qa.com`,
  password:      'Senha@123',
  administrador: 'true',
}

const nomeProduto = `Produto Cypress ${Date.now()}`

describe('CE03 - Gestão de produtos (admin)', () => {
  before(() => {
    cy.request({ method: 'POST', url: `${API}/usuarios`, body: ADMIN, failOnStatusCode: false })
  })

  beforeEach(() => {
    LoginPage.login(ADMIN.email, ADMIN.password)
    LoginPage.deveEstarNaHome()
  })

  it('CE03-01: deve cadastrar um novo produto com sucesso', () => {
    NavBar.irParaCadastrarProdutos()
    CadastroProdutoPage.cadastrar({ nome: nomeProduto, preco: '199', descricao: 'Produto gerado pelo Cypress', quantidade: '10' })
    CadastroProdutoPage.deveTerRedirecionadoComProduto(nomeProduto)
  })

  it('CE03-02: produto cadastrado deve aparecer na listagem', () => {
    NavBar.irParaListarProdutos()
    ListaProdutosPage.deveExibirProduto(nomeProduto)
  })

  it('CE03-03: administrador deve conseguir excluir um produto', () => {
    NavBar.irParaListarProdutos()
    ListaProdutosPage.excluirProduto(nomeProduto)
    ListaProdutosPage.naoDeveExibirProduto(nomeProduto)
  })
})
