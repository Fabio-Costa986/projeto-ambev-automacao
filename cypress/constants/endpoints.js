const base = () => Cypress.env('apiUrl')

export const ENDPOINTS = {
  USUARIOS:   () => `${base()}/usuarios`,
  USUARIO:    (id) => `${base()}/usuarios/${id}`,
  LOGIN:      () => `${base()}/login`,
  PRODUTOS:   () => `${base()}/produtos`,
  PRODUTO:    (id) => `${base()}/produtos/${id}`,
}
