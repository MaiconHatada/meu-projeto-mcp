/**
 * ELEMENTS — Login
 * Seletores da página de Login do Qazando Shop.
 *
 * Todos os seletores são funções (page) => Locator:
 *   - Preferência: role > label > text > ID semântico > atributo
 *   - IDs auto-gerados e classes de framework: evitados
 *   - Exceção aceita: classe de biblioteca estável (.swal2-html-container)
 */

import { Page, Locator } from '@playwright/test';

const LoginElements = {

  // Header (página inicial)
  // getByRole + .first() ignora o link duplicado no menu mobile
  loginLink: (page: Page): Locator =>
    page.getByRole('link', { name: 'Login' }).first(),

  // Formulário de Login
  // #user e input[type="password"] são IDs/atributos semânticos developer-defined
  // O site não usa <label for=""> nem data-testid, então ID semântico é o melhor disponível
  emailInput:    (page: Page): Locator => page.locator('#user'),
  passwordInput: (page: Page): Locator => page.locator('input[type="password"]'),
  loginButton:   (page: Page): Locator => page.getByRole('button', { name: 'login' }),

  // Modal de sucesso
  successTitle:    (page: Page): Locator => page.getByRole('heading', { name: 'Login realizado' }),
  successMessage:  (page: Page): Locator => page.locator('.swal2-html-container'), // container sem role semântico
  successOkButton: (page: Page): Locator => page.getByRole('button', { name: 'OK' }),

  // Mensagens de erro (busca pelo texto visível na tela)
  msgErro: (page: Page, texto: string): Locator => page.getByText(texto),

} as const;

export default LoginElements;
