/**
 * Cenário API 02 — Autenticação (Login)
 *
 * Cobre:
 *  1. POST /login com credenciais válidas retorna 200 e token JWT
 *  2. POST /login com senha incorreta retorna 401
 *  3. POST /login com e-mail inexistente retorna 401
 *  4. Token retornado possui formato Bearer válido
 */

const API = 'https://serverest.dev'

describe('CA02 - Autenticação via API', () => {
  const usuario = {
    nome:          `Auth Tester ${Date.now()}`,
    email:         `auth.${Date.now()}@qa.com`,
    password:      'Senha@123',
    administrador: 'false',
  }

  before(() => {
    cy.request('POST', `${API}/usuarios`, usuario)
  })

  it('CA02-01: POST /login com credenciais válidas deve retornar 200 e token', () => {
    cy.request({
      method: 'POST',
      url:    `${API}/login`,
      body: {
        email:    usuario.email,
        password: usuario.password,
      },
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.have.property('message', 'Login realizado com sucesso')
      expect(res.body).to.have.property('authorization').and.not.be.empty
    })
  })

  it('CA02-02: POST /login com senha incorreta deve retornar 401', () => {
    cy.request({
      method:           'POST',
      url:              `${API}/login`,
      body: {
        email:    usuario.email,
        password: 'senhaErrada!',
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(401)
      expect(res.body).to.have.property('message', 'Email e/ou senha inválidos')
    })
  })

  it('CA02-03: POST /login com e-mail inexistente deve retornar 401', () => {
    cy.request({
      method:           'POST',
      url:              `${API}/login`,
      body: {
        email:    'naoexiste@inexistente.com',
        password: 'qualquer123',
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(401)
      expect(res.body.message).to.include('inválidos')
    })
  })

  it('CA02-04: token retornado deve ter formato Bearer válido', () => {
    cy.request({
      method: 'POST',
      url:    `${API}/login`,
      body: {
        email:    usuario.email,
        password: usuario.password,
      },
    }).then((res) => {
      const token = res.body.authorization
      expect(token).to.match(/^Bearer\s[\w-]+\.[\w-]+\.[\w-]+$/)
    })
  })
})
