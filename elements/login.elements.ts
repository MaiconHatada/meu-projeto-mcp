/**
 * ELEMENTS — Login
 * Seletores da página de Login do Qazando Shop.
 */

import { Page } from '@playwright/test';
    
const LoginElements = {
  // Header (página inicial)
  loginLink: 'a[href="/login"]:not(#item4)',

  // Formulário de Login
  emailInput:    '#user',
  passwordInput: '#password',
  loginButton:   '#btnLogin',

  // Modal de sucesso (SweetAlert2)
  successTitle:    '.swal2-title',
  successMessage:  '.swal2-html-container',
  successOkButton: '.swal2-confirm',

  // Modal de erro (texto de erro exibido na página)
  msg_email_invalido:   (page: Page, email: string) => page.getByText(email)


} as const;

export default LoginElements;
