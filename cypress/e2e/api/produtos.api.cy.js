/**
 * CA03 — CRUD de Produtos (/produtos) — requer autenticação de admin
 */

import { ProdutosApi }   from '../../support/api/ProdutosApi'
import { LoginApi }      from '../../support/api/LoginApi'
import { UsuariosApi }   from '../../support/api/UsuariosApi'
import { usuarioFactory } from '../../factories/usuarioFactory'
import { produtoFactory } from '../../factories/produtoFactory'
import { API_MESSAGES }  from '../../constants/messages'

describe('CA03 - CRUD de Produtos via API', () => {
  let token

  before(() => {
    const admin = usuarioFactory.admin()
    UsuariosApi.criar(admin).then(() => {
      LoginApi.obterToken(admin.email, admin.password).then((t) => { token = t })
    })
  })

  it('CA03-01: POST /produtos autenticado deve retornar 201 e _id',
    { tags: ['@smoke', '@regression'] },
    () => {
      const produto = produtoFactory.valido()

      ProdutosApi.criar(token, produto).then((res) => {
        expect(res.status).to.eq(201)
        expect(res.body.message).to.eq(API_MESSAGES.PRODUTO_CRIADO)
        expect(res.body._id).to.be.a('string').and.not.be.empty
      })
    })

  it('CA03-02: POST /produtos sem autenticação deve retornar 401',
    { tags: ['@critical', '@regression'] },
    () => {
      ProdutosApi.criarSemAutenticacao(produtoFactory.valido()).then((res) => {
        expect(res.status).to.eq(401)
        expect(res.body.message).to.eq(API_MESSAGES.TOKEN_INVALIDO)
      })
    })

  it('CA03-03: GET /produtos deve retornar lista com schema correto',
    { tags: ['@regression'] },
    () => {
      ProdutosApi.listar().then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body).to.have.property('quantidade').that.is.a('number')
        expect(res.body).to.have.property('produtos').that.is.an('array')
        expect(res.body.produtos.length).to.eq(res.body.quantidade)
      })
    })

  it('CA03-04: GET /produtos/{id} deve retornar os dados exatos do produto',
    { tags: ['@regression'] },
    () => {
      const produto = produtoFactory.valido()

      ProdutosApi.criar(token, produto).then((post) => {
        ProdutosApi.buscarPorId(post.body._id).then((res) => {
          expect(res.status).to.eq(200)
          expect(res.body._id).to.eq(post.body._id)
          expect(res.body.nome).to.eq(produto.nome)
          expect(res.body.preco).to.eq(produto.preco)
          expect(res.body.descricao).to.eq(produto.descricao)
          expect(res.body.quantidade).to.eq(produto.quantidade)
        })
      })
    })

  it('CA03-05: DELETE /produtos/{id} autenticado deve retornar 200',
    { tags: ['@regression'] },
    () => {
      ProdutosApi.criar(token, produtoFactory.valido()).then((post) => {
        ProdutosApi.excluir(token, post.body._id).then((res) => {
          expect(res.status).to.eq(200)
          expect(res.body.message).to.eq(API_MESSAGES.PRODUTO_EXCLUIDO)
        })
      })
    })
})
