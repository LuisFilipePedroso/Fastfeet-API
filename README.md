# FastFeet - API

## Functional Requirements (Define the behavior and the functionality of the system)

-- O usuário deve se autenticar na aplicação usando um e-mail e senha.
-- Deve ser criado um usuário administrador por default.
-- Os dados devem ser validados antes de serem gravados.
-- Os destinatários devem ser cadastrados na aplicação apenas por usuários administradores. 

## Non Functional Requirements (Define the architecture of the system)

-- A autenticação deve ser feita utilizando JWT
-- A validação dos dados deve ser feita utilizando o YUP.
-- Deve ser criado uma seed para criar um usuário administrador. 
-- Deve-se utilizar o ORM Sequelize.
-- Deve-se fazer uso do ESLint + Prettier + EditorConfig para padronização do código.
