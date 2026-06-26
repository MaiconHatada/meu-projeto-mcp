/**
 * ELEMENTS — Login
 * Seletores da página de Login do Qazando Shop.
 */
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
} as const;

export default LoginElements;
