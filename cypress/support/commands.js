// Comando para cadastrar e autenticar um usuário via API, retornando o token
Cypress.Commands.add('loginViaApi', (email, password) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/login`,
    body: { email, password },
    failOnStatusCode: false,
  }).then((res) => {
    if (res.status === 200) {
      window.localStorage.setItem('serverest/userEmail', email)
      window.localStorage.setItem('serverest/userToken', res.body.authorization)
      return res.body.authorization
    }
    return null
  })
})

// Comando para criar um usuário administrador via API
Cypress.Commands.add('criarUsuarioAdmin', (nome, email, password) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/usuarios`,
    body: { nome, email, password, administrador: 'true' },
    failOnStatusCode: false,
  })
})

// Comando para obter token de autenticação via API
Cypress.Commands.add('obterToken', (email, password) => {
  return cy
    .request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/login`,
      body: { email, password },
    })
    .its('body.authorization')
})
