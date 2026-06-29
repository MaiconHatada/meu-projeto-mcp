import { test as base } from '@playwright/test'; // 1. Pega o 'test' original do Playwright
import { LoginHelper } from '../helpers/login.helper'; // 2. Importa teu Helper

// 3. CONTRATO: "Olha Playwright, meus testes vão receber isso aqui"
type AppFixtures = {
  loginHelper: LoginHelper; // 4. Declara: "Vai existir um objeto chamado loginHelper"
};


// 5. A MÁGICA: Tu "estende" o test do Playwright
export const test = base.extend<AppFixtures>({
  // 6. REGRA: "Toda vez que alguém pedir { loginHelper }, faz isso:"
  loginHelper: async ({ page }, use) => { // 7. Playwright te dá o 'page' aqui
    await page.goto(process.env.BASE_URL!); // carrega a aplicação
    const helper = new LoginHelper(page); // 8. Tu dá o 'new' SÓ UMA VEZ AQUI DENTRO
    await use(helper); // 9. "Toma Playwright, entrega isso pro teste"
    // 10. [Teardown] Aqui dentro tu poderia fazer 'await helper.logout()' depois do teste
  },
});

export { expect } from '@playwright/test'; // 11. Reexporta pra não quebrar import