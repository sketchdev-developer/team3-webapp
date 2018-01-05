import { $, $$ } from 'protractor';

export class LoginPage {
  url = '/login';

  header = $('h1');

  emailInput = $('#input-email');
  passwordInput = $('#input-password');

  errorMessages = $('.alert.error-messages');

  loginButton = $('.login-button');
}
