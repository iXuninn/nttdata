describe('NTT Data | Teste E2E', () => {
    beforeEach(() => {
      cy.visit('https://front.serverest.dev/login'); // Acessa ambiente de teste como ADM

      cy.get('[data-testid="email"]').should('be.visible').type('fulano@qa.com'); // Informa login
      cy.get('[data-testid="senha"]').should('be.visible').type('teste'); // Informa senha
      cy.get('[data-testid="entrar"]').should('be.visible').click(); // Clica no botão entrar
    });

    it('Validar cadastro de usuário comum', () => {
        // Castro de usuário
        cy.get('[data-testid="cadastrarUsuarios"]').should('be.visible').click(); // Clica em botão cadastrar usuário
        cy.get('[data-testid="nome"]').should('be.visible').type('Reinaldo Pereira'); // Preenche nome de usuário
        cy.get('[data-testid="email"]').should('be.visible').type('reinaldotesteqa@gmail.com'); // Preenche email de usuário
        cy.get('[data-testid="password"]').should('be.visible').type('teste123'); // Preenche senha
        cy.get('[data-testid="cadastrarUsuario"]').should('be.visible').click(); // Clica em botão cadastrar
        cy.get('table').find('tr').contains('td', 'Reinaldo Pereira').should('exist'); // Busca usuário para validar se o mesmo foi criado
    });
  
    it('Validar cadastro de produto', () => {
      // Cadastro de produto
      cy.get('[data-testid="cadastrarProdutos"]').should('be.visible').click(); // Clica em cadastrar produto
      cy.get('[data-testid="nome"]').should('be.visible').type('GTA 6 Premium'); // Digita o nome do produto
      cy.get('[data-testid="preco"]').should('be.visible').type('299'); // Define preço do produto
      cy.get('[data-testid="descricao"]').should('be.visible').type('Jogo para maiores de 18 anos'); // Preenche descrição
      cy.get('[data-testid="quantity"]').should('be.visible').type('500'); // Define quantidade de itens em estoque
      cy.get('[data-testid="imagem"]').selectFile('cypress/fixtures/imagens/gta6.png', { force: true }); // Upload de imagem do produto
      cy.get('[data-testid="cadastarProdutos"]').should('be.visible').click(); // Clica em botão cadastrar
      cy.get('table').find('tr').contains('td', 'GTA 6 Premium').should('exist'); // Busca produto para validar se o mesmo foi criado 
    });
  
    it('Validar excluir produto', () => {
        cy.get('[data-testid="listarProdutos"]').should('be.visible').click(); // Clica em Listar produtos
        cy.contains('td', 'GTA 6 Premium').parent().find('button.btn-danger').click(); // Clicar no botão excluir
        cy.get('table').find('tr').contains('td', 'GTA 6 Premium').should('exist'); // Valida se o produto foi excluido com sucesso
    });

    it('Validar excluir usuário', () => {
      cy.get('[data-testid="listar-usuarios"]').should('be.visible').click(); // Clica em Listar usuário
      cy.contains('td', 'Reinaldo Pereira').parent().find('button.btn-danger').click(); // Clicar no botão excluir
      cy.get('table').find('tr').contains('td', 'Reinaldo Pereira').should('exist'); // Valida se o produto foi excluido com sucesso
    });
});
  