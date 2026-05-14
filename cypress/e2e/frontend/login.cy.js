/**
 * CE01 — Login de usuário no frontend
 */

import LoginPage          from '../../pages/LoginPage'
import { UsuariosApi }    from '../../support/api/UsuariosApi'
import { usuarioFactory } from '../../factories/usuarioFactory'

const ADMIN = usuarioFactory.admin()

describe('CE01 - Login de usuário', () => {
  before(() => { UsuariosApi.criarIgnorandoErro(ADMIN) })

  it('CE01-01: deve fazer login com credenciais válidas e ir para a home',
    { tags: ['@smoke', '@critical', '@regression'] },
    () => {
      LoginPage.login(ADMIN.email, ADMIN.password)
      LoginPage.deveEstarNaHome()
    })

  it('CE01-02: deve exibir mensagem de erro exata ao usar senha incorreta',
    { tags: ['@critical', '@regression'] },
    () => {
      LoginPage.login(ADMIN.email, 'senhaErrada999')
      LoginPage.deveExibirErroDeCredenciais()
    })

  it('CE01-03: deve exibir validação por campo ao submeter formulário vazio',
    { tags: ['@regression'] },
    () => {
      LoginPage.visitar().submeter()
      LoginPage.deveExibirValidacaoDeCampoObrigatorio()
    })
})
