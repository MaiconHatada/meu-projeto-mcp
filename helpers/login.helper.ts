import { Page, expect } from '@playwright/test';
import LoginElements from '../elements/login.elements';

/**
 * HELPER — Login
 * Encapsula todas as ações do fluxo de Login do Qazando Shop.
 */
export class LoginHelper {
  constructor(private page: Page) {}

  /** Clica no botão Login do header e aguarda a navegação */
  async clicarBotaoLogin() {
    await LoginElements.loginLink(this.page).click();
    await this.page.waitForURL('**/login');
    await this.page.waitForLoadState('networkidle');
  }

  /** Valida que está na página de Login pela URL */
  async validarPaginaLogin() {
    await expect(this.page).toHaveURL(/\/login/);
  }

  /** Preenche as credenciais e submete o formulário */
  async realizarLogin(email = process.env.USER_EMAIL!, password = process.env.USER_PASSWORD!) {
   
    await LoginElements.emailInput(this.page).fill(email);
    await LoginElements.passwordInput(this.page).fill(password);
    await LoginElements.loginButton(this.page).click();

  }

  /** Valida o modal de sucesso e a mensagem de boas-vindas */
  async validarLoginRealizado(email = process.env.USER_EMAIL ?? '') {
    
    await expect(LoginElements.successTitle(this.page)).toBeVisible();

    await expect(LoginElements.successMessage(this.page)).toContainText(`Olá, ${email}`);

  }

  async realizarLoginSemInformarEmailValido(email_invalido = process.env.USER_EMAIL_INVALIDO ?? '',
    password_invalido = process.env.USER_PASSWORD_INVALIDO ?? '') {
   

    await LoginElements.emailInput(this.page).fill(email_invalido);
    await LoginElements.passwordInput(this.page).fill(password_invalido);
    await LoginElements.loginButton(this.page).click();

    await expect(LoginElements.msgErro(this.page, 'E-mail inválido.')).toBeVisible();
    
  }

}
