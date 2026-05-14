// Mensagens exatas retornadas pela API ServeRest
export const API_MESSAGES = {
  // Usuários
  USUARIO_CRIADO:       'Cadastro realizado com sucesso',
  USUARIO_ATUALIZADO:   'Registro alterado com sucesso',
  USUARIO_EXCLUIDO:     'Registro excluído com sucesso',
  USUARIO_NAO_ENCONTRADO: 'Usuário não encontrado',
  EMAIL_JA_USADO:       'Este email já está sendo usado',

  // Login
  LOGIN_SUCESSO:        'Login realizado com sucesso',
  LOGIN_INVALIDO:       'Email e/ou senha inválidos',

  // Produtos
  PRODUTO_CRIADO:       'Cadastro realizado com sucesso',
  PRODUTO_EXCLUIDO:     'Registro excluído com sucesso',
  PRODUTO_NAO_ENCONTRADO: 'Produto não encontrado',
  TOKEN_INVALIDO:       'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais',
}

// Mensagens exibidas no frontend ServeRest
export const FRONTEND_MESSAGES = {
  LOGIN_INVALIDO:       'Email e/ou senha inválidos',
  BEM_VINDO:            'Bem Vindo',
  STORE_HOME:           'Serverest Store',
  EMAIL_JA_USADO:       'Este email já está sendo usado',

  // Validações de campo obrigatório (por campo)
  NOME_OBRIGATORIO:     'Nome é obrigatório',
  EMAIL_OBRIGATORIO:    'Email é obrigatório',
  PASSWORD_OBRIGATORIO: 'Password é obrigatório',
  PASSWORD_LOGIN_OBRIG: 'Password é obrigatório',
}
