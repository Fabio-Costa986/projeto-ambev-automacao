/**
 * CA02 — Autenticação (POST /login)
 */

import { LoginApi }      from '../../support/api/LoginApi'
import { UsuariosApi }   from '../../support/api/UsuariosApi'
import { usuarioFactory } from '../../factories/usuarioFactory'
import { API_MESSAGES }  from '../../constants/messages'

describe('CA02 - Autenticação via API', () => {
  const usuario = usuarioFactory.comum()

  before(() => { UsuariosApi.criar(usuario) })

  it('CA02-01: credenciais válidas devem retornar 200, mensagem e token',
    { tags: ['@smoke', '@critical', '@regression'] },
    () => {
      LoginApi.autenticar(usuario.email, usuario.password).then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body.message).to.eq(API_MESSAGES.LOGIN_SUCESSO)
        expect(res.body.authorization).to.be.a('string').and.not.be.empty
      })
    })

  it('CA02-02: senha incorreta deve retornar 401 com mensagem de erro exata',
    { tags: ['@critical', '@regression'] },
    () => {
      LoginApi.autenticarComErro(usuario.email, 'senhaErrada!').then((res) => {
        expect(res.status).to.eq(401)
        expect(res.body.message).to.eq(API_MESSAGES.LOGIN_INVALIDO)
      })
    })

  it('CA02-03: e-mail inexistente deve retornar 401 com mensagem de erro exata',
    { tags: ['@regression'] },
    () => {
      LoginApi.autenticarComErro('naoexiste@inexistente.com', 'qualquer123').then((res) => {
        expect(res.status).to.eq(401)
        expect(res.body.message).to.eq(API_MESSAGES.LOGIN_INVALIDO)
      })
    })

  it('CA02-04: token retornado deve ter formato Bearer JWT válido',
    { tags: ['@regression'] },
    () => {
      LoginApi.autenticar(usuario.email, usuario.password).then((res) => {
        expect(res.body.authorization).to.match(/^Bearer\s[\w-]+\.[\w-]+\.[\w-]+$/)
      })
    })
})
