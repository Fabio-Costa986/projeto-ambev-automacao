/**
 * Cenário API 03 — CRUD de Produtos (requer autenticação de admin)
 *
 * Cobre:
 *  1. POST /produtos — criar produto autenticado retorna 201
 *  2. GET  /produtos — listar todos os produtos retorna 200 com array
 *  3. GET  /produtos/{id} — buscar produto por ID retorna dados corretos
 *  4. DELETE /produtos/{id} — excluir produto autenticado retorna 200
 */

const API = 'https://serverest.dev'

describe('CA03 - CRUD de Produtos via API', () => {
  let token
  let produtoId

  const admin = {
    nome:          `Admin Produto API ${Date.now()}`,
    email:         `admin.prod.${Date.now()}@qa.com`,
    password:      'Senha@123',
    administrador: 'true',
  }

  const produto = {
    nome:        `Produto API ${Date.now()}`,
    preco:       299,
    descricao:   'Produto criado via Cypress API test',
    quantidade:  50,
  }

  before(() => {
    // Cria admin e autentica para obter token
    cy.request('POST', `${API}/usuarios`, admin).then(() => {
      cy.request({
        method: 'POST',
        url:    `${API}/login`,
        body: { email: admin.email, password: admin.password },
      }).then((res) => {
        token = res.body.authorization
      })
    })
  })

  it('CA03-01: POST /produtos deve criar produto autenticado e retornar 201', () => {
    cy.request({
      method:  'POST',
      url:     `${API}/produtos`,
      headers: { Authorization: token },
      body:    produto,
    }).then((res) => {
      expect(res.status).to.eq(201)
      expect(res.body).to.have.property('message', 'Cadastro realizado com sucesso')
      expect(res.body).to.have.property('_id').and.not.be.empty

      produtoId = res.body._id
    })
  })

  it('CA03-02: GET /produtos deve retornar lista com quantidade e array de produtos', () => {
    cy.request({
      method: 'GET',
      url:    `${API}/produtos`,
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.have.property('quantidade').and.be.a('number')
      expect(res.body).to.have.property('produtos').and.be.an('array')
      expect(res.body.produtos.length).to.be.greaterThan(0)
    })
  })

  it('CA03-03: GET /produtos/{id} deve retornar os dados do produto criado', () => {
    // Cria produto e busca por ID na sequência
    cy.request({
      method:  'POST',
      url:     `${API}/produtos`,
      headers: { Authorization: token },
      body: {
        ...produto,
        nome: `Busca ${Date.now()}`,
      },
    }).then((post) => {
      const id = post.body._id

      cy.request({
        method: 'GET',
        url:    `${API}/produtos/${id}`,
      }).then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body).to.have.property('_id', id)
        expect(res.body).to.have.property('preco', produto.preco)
        expect(res.body).to.have.property('quantidade', produto.quantidade)
      })
    })
  })

  it('CA03-04: DELETE /produtos/{id} deve excluir produto autenticado e retornar 200', () => {
    cy.request({
      method:  'POST',
      url:     `${API}/produtos`,
      headers: { Authorization: token },
      body: {
        ...produto,
        nome: `Delete ${Date.now()}`,
      },
    }).then((post) => {
      const id = post.body._id

      cy.request({
        method:  'DELETE',
        url:     `${API}/produtos/${id}`,
        headers: { Authorization: token },
      }).then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body.message).to.include('sucesso')
      })
    })
  })
})
