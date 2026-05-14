import { ENDPOINTS } from '../../constants/endpoints'

export const UsuariosApi = {
  criar: (body) =>
    cy.request({ method: 'POST', url: ENDPOINTS.USUARIOS(), body }),

  criarIgnorandoErro: (body) =>
    cy.request({ method: 'POST', url: ENDPOINTS.USUARIOS(), body, failOnStatusCode: false }),

  buscarPorId: (id) =>
    cy.request({ method: 'GET', url: ENDPOINTS.USUARIO(id) }),

  buscarPorIdInexistente: (id) =>
    cy.request({ method: 'GET', url: ENDPOINTS.USUARIO(id), failOnStatusCode: false }),

  atualizar: (id, body) =>
    cy.request({ method: 'PUT', url: ENDPOINTS.USUARIO(id), body }),

  excluir: (id) =>
    cy.request({ method: 'DELETE', url: ENDPOINTS.USUARIO(id) }),
}
