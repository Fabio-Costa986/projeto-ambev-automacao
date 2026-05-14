/**
 * CA01 — CRUD de Usuários (/usuarios)
 */

import { UsuariosApi }   from '../../support/api/UsuariosApi'
import { usuarioFactory } from '../../factories/usuarioFactory'
import { API_MESSAGES }  from '../../constants/messages'

describe('CA01 - CRUD de Usuários via API', () => {

  it('CA01-01: POST /usuarios com dados válidos deve retornar 201 e _id',
    { tags: ['@smoke', '@regression'] },
    () => {
      const usuario = usuarioFactory.comum()

      UsuariosApi.criar(usuario).then((res) => {
        expect(res.status).to.eq(201)
        expect(res.body.message).to.eq(API_MESSAGES.USUARIO_CRIADO)
        expect(res.body._id).to.be.a('string').and.not.be.empty
      })
    })

  it('CA01-02: POST /usuarios com e-mail duplicado deve retornar 400',
    { tags: ['@regression'] },
    () => {
      const usuario = usuarioFactory.comum()

      UsuariosApi.criar(usuario).then(() => {
        UsuariosApi.criarIgnorandoErro(usuario).then((res) => {
          expect(res.status).to.eq(400)
          expect(res.body.message).to.eq(API_MESSAGES.EMAIL_JA_USADO)
        })
      })
    })

  it('CA01-03: GET /usuarios/{id} deve retornar o usuário com todos os campos',
    { tags: ['@regression'] },
    () => {
      const usuario = usuarioFactory.comum()

      UsuariosApi.criar(usuario).then((post) => {
        UsuariosApi.buscarPorId(post.body._id).then((res) => {
          expect(res.status).to.eq(200)
          expect(res.body._id).to.eq(post.body._id)
          expect(res.body.nome).to.eq(usuario.nome)
          expect(res.body.email).to.eq(usuario.email)
          expect(res.body.administrador).to.eq(usuario.administrador)
          // A API ServeRest retorna password no GET — comportamento intencional da API de estudos
          expect(res.body).to.have.keys('_id', 'nome', 'email', 'password', 'administrador')
        })
      })
    })

  it('CA01-04: GET /usuarios/{id} com ID inexistente deve retornar 400',
    { tags: ['@regression'] },
    () => {
      // ServeRest usa IDs de 16 caracteres alfanuméricos — este ID não existe na base
      UsuariosApi.buscarPorIdInexistente('0000000000000001').then((res) => {
        expect(res.status).to.eq(400)
        expect(res.body.message).to.eq(API_MESSAGES.USUARIO_NAO_ENCONTRADO)
      })
    })

  it('CA01-05: PUT /usuarios/{id} deve atualizar o usuário e retornar 200',
    { tags: ['@regression'] },
    () => {
      const usuario    = usuarioFactory.comum()
      const atualizado = usuarioFactory.comum({ nome: 'Nome Atualizado QA' })

      UsuariosApi.criar(usuario).then((post) => {
        UsuariosApi.atualizar(post.body._id, atualizado).then((res) => {
          expect(res.status).to.eq(200)
          expect(res.body.message).to.eq(API_MESSAGES.USUARIO_ATUALIZADO)
        })
      })
    })

  it('CA01-06: DELETE /usuarios/{id} deve excluir o usuário e retornar 200',
    { tags: ['@regression'] },
    () => {
      const usuario = usuarioFactory.comum()

      UsuariosApi.criar(usuario).then((post) => {
        UsuariosApi.excluir(post.body._id).then((res) => {
          expect(res.status).to.eq(200)
          expect(res.body.message).to.eq(API_MESSAGES.USUARIO_EXCLUIDO)
        })
      })
    })
})
