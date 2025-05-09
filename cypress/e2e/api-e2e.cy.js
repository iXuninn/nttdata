describe('NTT Desafio Cypress', () => {
  const baseUrl = 'https://serverest.dev';
  let adminToken;
  let userId;
  let productId;
  let cartId;

  const productData = {
    nome: `GTA 6 Deluxe Editon ${Date.now()}`,
    preco: 100,
    descricao: 'Produto criado para teste',
    quantidade: 1
  };

  const userData = {
    nome: `Reinaldo Pereira ${Date.now()}`,
    email: `reinaldo${Date.now()}@qa.com.br`,
    password: '123456',
    administrador: 'false'
  };

  before(() => {
    // Login como admin
    cy.request('POST', `${baseUrl}/login`, {
      email: 'fulano@qa.com',
      password: 'teste'
    }).then((response) => {
      expect(response.status).to.eq(200);
      adminToken = response.body.authorization;
    });
  });

  it('Deve cadastrar um novo produto', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/produtos`,
      headers: { Authorization: adminToken },
      body: productData
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      productId = response.body._id;
    });
  });

  it('Deve cadastrar um novo usuário', () => {
    cy.request('POST', `${baseUrl}/usuarios`, userData)
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq('Cadastro realizado com sucesso');
        userId = response.body._id;
      });
  });

  it('Deve logar com o novo usuário', () => {
    cy.request('POST', `${baseUrl}/login`, {
      email: userData.email,
      password: userData.password
    }).then((response) => {
      expect(response.status).to.eq(200);
      userData.token = response.body.authorization;
    });
  });

  it('Deve criar um carrinho com o produto', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/carrinhos`,
      headers: { Authorization: userData.token },
      body: {
        produtos: [
          {
            idProduto: productId,
            quantidade: 1
          }
        ]
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      cartId = response.body._id;
    });
  });

  it('Deve concluir a compra (excluir o carrinho)', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/carrinhos/concluir-compra`,
      headers: { Authorization: userData.token }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Registro excluído com sucesso');
    });
  });

  it('Deve excluir o produto criado', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/produtos/${productId}`,
      headers: { Authorization: adminToken }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Registro excluído com sucesso');
    });
  });

  it('Deve excluir o usuário criado', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/usuarios/${userId}`
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Registro excluído com sucesso');
    });
  });
});
