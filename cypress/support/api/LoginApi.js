import { ENDPOINTS } from '../../constants/endpoints'

export const LoginApi = {
  autenticar: (email, password) =>
    cy.request({ method: 'POST', url: ENDPOINTS.LOGIN(), body: { email, password } }),

  autenticarComErro: (email, password) =>
    cy.request({ method: 'POST', url: ENDPOINTS.LOGIN(), body: { email, password }, failOnStatusCode: false }),

  obterToken: (email, password) =>
    LoginApi.autenticar(email, password).its('body.authorization'),
}
