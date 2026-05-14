const ts = () => Date.now()

export const produtoFactory = {
  valido: (overrides = {}) => ({
    nome:       `Produto QA ${ts()}`,
    preco:      299,
    descricao:  'Produto criado via automação Cypress',
    quantidade: 50,
    ...overrides,
  }),
}
