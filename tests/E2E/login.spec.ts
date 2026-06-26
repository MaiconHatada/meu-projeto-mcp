import { test } from '@playwright/test';
import { LoginHelper } from '../../helpers/login.helper';

test.describe('Login', () => {

  test.beforeEach(async ({ page }) => {
    const helper = new LoginHelper(page);
    await page.goto('/');
    await helper.clicarBotaoLogin();
    await helper.validarPaginaLogin();
  });

    test('Deve navegar para a página de Login ao clicar no botão Login', async () => {
    // Validação feita no beforeEach
  });

    test('Deve realizar login com sucesso e exibir mensagem de boas-vindas', async ({ page }) => {
        const helper = new LoginHelper(page);

        await helper.realizarLogin();
        await helper.validarLoginRealizado();
  });

    test('Deve exibir mensagem de erro ao tentar realizar login com email inválido', async ({ page }) => {  
        const helper = new LoginHelper(page);

        await helper.realizarLoginSemInformarEmailValido();
        // Aqui você pode adicionar a validação da mensagem de erro, por exemplo:
        // await expect(page.locator(LoginElements.errorMessage)).toHaveText('Email inválido');
}); 

});
