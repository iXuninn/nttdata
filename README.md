# Projeto de Testes E2E com Cypress

Este projeto contém testes de ponta a ponta (End-to-End - E2E) desenvolvidos com o framework Cypress para validar a funcionalidade da aplicação Serverest (https://serverest.dev).

**Observação Importante:** Devido a instabilidades, bugs e funcionalidades incompletas encontradas no website da aplicação Serverest durante a criação destes testes, a estrutura dos testes pode não seguir as melhores práticas de organização em todos os cenários. O foco principal foi garantir a cobertura das funcionalidades disponíveis e identificar os problemas existentes.

## Estrutura dos Testes

O projeto possui dois arquivos de teste principais:

### `teste_e2e.cy.js`

Este arquivo contém testes que interagem com a interface web da aplicação Serverest, simulando o comportamento de um usuário administrador. Os seguintes cenários são testados:

* **Cadastro de usuário comum:** Valida o processo de criação de um novo usuário.
* **Cadastro de produto:** Verifica a criação de um novo produto, incluindo o upload de uma imagem (localizada em `cypress/fixtures/imagens/gta6.png`).
* **Exclusão de produto:** Testa a funcionalidade de remover um produto existente.
* **Exclusão de usuário:** Valida a capacidade de excluir um usuário cadastrado.

### `NTT_Desafio_Cypress.cy.js`

Este arquivo contém testes que interagem com a API da aplicação Serverest, cobrindo um fluxo completo de interação:

* **Login como administrador:** Obtém um token de autenticação para um usuário administrador.
* **Cadastro de um novo produto:** Cria um novo produto através da API.
* **Cadastro de um novo usuário:** Registra um novo usuário na aplicação via API.
* **Login com o novo usuário:** Obtém um token de autenticação para o usuário recém-criado.
* **Criação de um carrinho com o produto:** Adiciona o produto criado ao carrinho do novo usuário.
* **Conclusão da compra (exclusão do carrinho):** Simula a finalização da compra, excluindo o carrinho.
* **Exclusão do produto criado:** Remove o produto criado através da API (utilizando o token de administrador).
* **Exclusão do usuário criado:** Remove o usuário criado através da API.

## Configuração do Cypress (`cypress.config.js`)

O arquivo `cypress.config.js` contém as configurações gerais para o Cypress neste projeto.