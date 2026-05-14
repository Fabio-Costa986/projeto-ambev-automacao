import { ENDPOINTS } from '../../constants/endpoints'

export const ProdutosApi = {
  listar: () =>
    cy.request({ method: 'GET', url: ENDPOINTS.PRODUTOS() }),

  buscarPorId: (id) =>
    cy.request({ method: 'GET', url: ENDPOINTS.PRODUTO(id) }),

  criar: (token, body) =>
    cy.request({ method: 'POST', url: ENDPOINTS.PRODUTOS(), headers: { Authorization: token }, body }),

  criarSemAutenticacao: (body) =>
    cy.request({ method: 'POST', url: ENDPOINTS.PRODUTOS(), body, failOnStatusCode: false }),

  excluir: (token, id) =>
    cy.request({ method: 'DELETE', url: ENDPOINTS.PRODUTO(id), headers: { Authorization: token } }),
}
