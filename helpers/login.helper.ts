import { Page, expect } from '@playwright/test';
import LoginElements from '../elements/login.elements';

/**
 * HELPER — Login
 * Encapsula todas as ações do fluxo de Login do Qazando Shop.
 */
export class LoginHelper {
  constructor(private page: Page) {}

  /** Clica no botão Login do header e aguarda a navegação */
  async clicarBotaoLogin(): Promise<void> {
    await this.page.locator(LoginElements.loginLink).click();
    await this.page.waitForURL('**/login', { timeout: 10000 });
    await this.page.waitForLoadState('networkidle');
  }

  /** Valida que está na página de Login pela URL */
  async validarPaginaLogin(): Promise<void> {
    await expect(this.page).toHaveURL(/\/login/);
  }

  /** Preenche as credenciais e submete o formulário */
  async realizarLogin(): Promise<void> {
    const email    = process.env.USER_EMAIL    ?? '';
    const password = process.env.USER_PASSWORD ?? '';

    await this.page.locator(LoginElements.emailInput).fill(email);
    await this.page.locator(LoginElements.passwordInput).fill(password);
    await this.page.locator(LoginElements.loginButton).click();
  }

  /** Valida o modal de sucesso e a mensagem de boas-vindas */
  async validarLoginRealizado(): Promise<void> {
    const email = process.env.USER_EMAIL ?? '';

    await expect(this.page.locator(LoginElements.successTitle))
      .toHaveText('Login realizado', { timeout: 10000 });

    await expect(this.page.locator(LoginElements.successMessage))
      .toContainText(`Olá, ${email}`, { timeout: 5000 });
  }

  async realizarLoginSemInformarEmailValido(): Promise<void> {
    const email_invalido    = process.env.USER_EMAIL_INVALIDO ?? '';
    const password          = process.env.USER_PASSWORD ?? '';

    await this.page.locator(LoginElements.emailInput).fill(email_invalido);
    await this.page.locator(LoginElements.passwordInput).fill(password);
    await this.page.locator(LoginElements.loginButton).click();
  }

}
