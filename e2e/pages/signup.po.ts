import { $, $$ } from 'protractor';

export class SignupPage {
  url = '/signup';

  header = $('h1');

  emailInput = $('#input-email');
  passwordInput = $('#input-password');

  errorMessages = $('.alert.error-messages');

  signupButton = $('.signup-button');
}
