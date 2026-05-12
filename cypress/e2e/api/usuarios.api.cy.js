/**
 * Cenário API 01 — CRUD de Usuários
 *
 * Cobre:
 *  1. POST /usuarios — criar usuário com dados válidos retorna 201
 *  2. GET  /usuarios/{id} — buscar usuário criado retorna dados corretos
 *  3. PUT  /usuarios/{id} — atualizar nome do usuário retorna 200
 *  4. DELETE /usuarios/{id} — excluir usuário retorna 200
 */

const API = 'https://serverest.dev'

describe('CA01 - CRUD de Usuários via API', () => {
  const usuario = {
    nome:          `Usuario API ${Date.now()}`,
    email:         `usuario.api.${Date.now()}@qa.com`,
    password:      'Senha@123',
    administrador: 'false',
  }

  let userId

  it('CA01-01: POST /usuarios deve criar usuário e retornar 201', () => {
    cy.request({
      method: 'POST',
      url:    `${API}/usuarios`,
      body:   usuario,
    }).then((res) => {
      expect(res.status).to.eq(201)
      expect(res.body).to.have.property('message', 'Cadastro realizado com sucesso')
      expect(res.body).to.have.property('_id').and.not.be.empty

      userId = res.body._id
    })
  })

  it('CA01-02: GET /usuarios/{id} deve retornar os dados do usuário criado', () => {
    // Cria o usuário e captura o ID
    cy.request('POST', `${API}/usuarios`, {
      ...usuario,
      email: `get.${Date.now()}@qa.com`,
    }).then((post) => {
      const id = post.body._id

      cy.request({
        method: 'GET',
        url:    `${API}/usuarios/${id}`,
      }).then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body).to.have.property('_id', id)
        expect(res.body).to.have.property('administrador', 'false')
      })
    })
  })

  it('CA01-03: PUT /usuarios/{id} deve atualizar o nome do usuário e retornar 200', () => {
    cy.request('POST', `${API}/usuarios`, {
      ...usuario,
      email: `put.${Date.now()}@qa.com`,
    }).then((post) => {
      const id = post.body._id

      cy.request({
        method: 'PUT',
        url:    `${API}/usuarios/${id}`,
        body: {
          nome:          'Nome Atualizado Cypress',
          email:         `atualizado.${Date.now()}@qa.com`,
          password:      'Senha@456',
          administrador: 'false',
        },
      }).then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body.message).to.include('sucesso')
      })
    })
  })

  it('CA01-04: DELETE /usuarios/{id} deve excluir o usuário e retornar 200', () => {
    cy.request('POST', `${API}/usuarios`, {
      ...usuario,
      email: `delete.${Date.now()}@qa.com`,
    }).then((post) => {
      const id = post.body._id

      cy.request({
        method: 'DELETE',
        url:    `${API}/usuarios/${id}`,
      }).then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body.message).to.include('sucesso')
      })
    })
  })
})
