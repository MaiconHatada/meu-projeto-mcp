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

});
