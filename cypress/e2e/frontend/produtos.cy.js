/**
 * CE03 — Gestão de produtos no frontend (área administrativa)
 */

import LoginPage           from '../../pages/LoginPage'
import NavBar              from '../../pages/NavBar'
import CadastroProdutoPage from '../../pages/CadastroProdutoPage'
import ListaProdutosPage   from '../../pages/ListaProdutosPage'
import { UsuariosApi }     from '../../support/api/UsuariosApi'
import { LoginApi }        from '../../support/api/LoginApi'
import { ProdutosApi }     from '../../support/api/ProdutosApi'
import { usuarioFactory }  from '../../factories/usuarioFactory'
import { produtoFactory }  from '../../factories/produtoFactory'

const ADMIN = usuarioFactory.admin()

// Produto fixo para os testes de listagem/exclusão — criado via API no before()
const PRODUTO_PERSISTENTE = produtoFactory.valido({ nome: `Produto Persistente QA ${Date.now()}` })

describe('CE03 - Gestão de produtos (admin)', () => {
  before(() => {
    // Garante que o admin existe e cria o produto via API — sem depender da UI
    UsuariosApi.criarIgnorandoErro(ADMIN).then(() => {
      LoginApi.obterToken(ADMIN.email, ADMIN.password).then((token) => {
        ProdutosApi.criar(token, PRODUTO_PERSISTENTE)
      })
    })
  })

  beforeEach(() => {
    LoginPage.login(ADMIN.email, ADMIN.password)
    LoginPage.deveEstarNaHome()
  })

  it('CE03-01: deve cadastrar um novo produto via UI e aparecer na listagem',
    { tags: ['@smoke', '@regression'] },
    () => {
      // Produto exclusivo deste teste — gerado aqui para ser autossuficiente
      const produtoUi = produtoFactory.valido()

      NavBar.irParaCadastrarProdutos()
      CadastroProdutoPage.cadastrar(produtoUi)
      CadastroProdutoPage.deveTerRedirecionadoComProduto(produtoUi.nome)
    })

  it('CE03-02: produto criado via API deve aparecer na listagem após login',
    { tags: ['@regression'] },
    () => {
      NavBar.irParaListarProdutos()
      ListaProdutosPage.deveExibirProduto(PRODUTO_PERSISTENTE.nome)
    })

  it('CE03-03: administrador deve conseguir excluir um produto e ele sair da listagem',
    { tags: ['@regression'] },
    () => {
      NavBar.irParaListarProdutos()
      ListaProdutosPage.excluirProduto(PRODUTO_PERSISTENTE.nome)
      ListaProdutosPage.naoDeveExibirProduto(PRODUTO_PERSISTENTE.nome)
    })
})
