const ts = () => Date.now()

export const usuarioFactory = {
  comum: (overrides = {}) => ({
    nome:          `Usuario QA ${ts()}`,
    email:         `qa.${ts()}@test.com`,
    password:      'Senha@123',
    administrador: 'false',
    ...overrides,
  }),

  admin: (overrides = {}) => ({
    nome:          `Admin QA ${ts()}`,
    email:         `admin.${ts()}@test.com`,
    password:      'Senha@123',
    administrador: 'true',
    ...overrides,
  }),
}
