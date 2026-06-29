//import { test } from '@playwright/test';
//import { LoginHelper } from '../../helpers/login.helper';
import { test } from '../../fixture'; // 1. IMPORTA DO FIXTURE, NÃO DO PLAYWRIGHT


test.describe('Login', () => {

  test.beforeEach(async ({ loginHelper }) => { // 2. PLAYWRIGHT JÁ INJETA PRA TI
    await loginHelper.clicarBotaoLogin(); // 3. Só usa. Sem 'new', sem 'let'
  });

    test('Deve navegar para a página de Login ao clicar no botão Login', async () => {
    // Validação feita no beforeEach
  });

    test('Deve realizar login com sucesso e exibir mensagem de boas-vindas', async ({ loginHelper }) => {
        await loginHelper.realizarLogin();
        await loginHelper.validarLoginRealizado();
  });

    test('Deve exibir mensagem de erro ao tentar realizar login com email inválido', async ({ loginHelper }) => {  
        await loginHelper.realizarLoginSemInformarEmailValido();
        // Aqui você pode adicionar a validação da mensagem de erro, por exemplo:
        // await expect(page.locator(LoginElements.errorMessage)).toHaveText('Email inválido');
  }); 

});
