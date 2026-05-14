/**
 * CE02 — Cadastro de novo usuário no frontend
 */

import CadastroPage       from '../../pages/CadastroPage'
import { UsuariosApi }    from '../../support/api/UsuariosApi'
import { usuarioFactory } from '../../factories/usuarioFactory'

describe('CE02 - Cadastro de novo usuário', () => {

  it('CE02-01: deve cadastrar usuário válido, fazer login automático e ir para a home',
    { tags: ['@smoke', '@regression'] },
    () => {
      CadastroPage.cadastrar(usuarioFactory.comum())
      CadastroPage.deveRedirecionarParaHomeStore()
    })

  it('CE02-02: deve exibir erro exato ao cadastrar com e-mail já existente',
    { tags: ['@regression'] },
    () => {
      const usuario = usuarioFactory.comum()

      UsuariosApi.criar(usuario).then(() => {
        CadastroPage.cadastrar(usuario)
        CadastroPage.deveExibirErroEmailDuplicado()
      })
    })

  it('CE02-03: deve exibir validação por campo ao submeter formulário vazio',
    { tags: ['@regression'] },
    () => {
      CadastroPage.visitar().submeter()
      CadastroPage.deveExibirValidacaoDeCamposObrigatorios()
    })
})
