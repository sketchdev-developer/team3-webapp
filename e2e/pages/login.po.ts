import { $, $$ } from 'protractor';

export class LoginPage {
  url = '/login';

  emailInput = $('.email-input');
  passwordInput = $('.password-input');

  errorMessages = $('.alert .error-messages');

  loginButton = $('.login-button');
}
