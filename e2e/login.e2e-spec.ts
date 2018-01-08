import { SpecHelper } from './support/spec.helper';
import { LoginPage } from './pages/login.po';
import { DashboardPage } from './pages/dashboard.po';

describe('logging in', () => {
  let specHelper: SpecHelper;
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  let email: string;
  let password: string;

  beforeEach(() => {
    specHelper = new SpecHelper();
    loginPage = new LoginPage();
    dashboardPage = new DashboardPage();
  });

  describe('valid credentials', () => {
    beforeEach(() => {
      email = 'valid@example.com';
      password = 'ValidPassword123!';

      specHelper.stubApiRequest({
        url: '/sessions',
        method: 'POST',
        response: {
          code: 201,
          data: {
            token: 'something',
            user: {
              id: 100,
              email: email,
            }
          }
        }
      });
    });

    it('redirects to protected page', () => {
      specHelper.navigateTo(loginPage);

      loginPage.emailInput.sendKeys(email);
      loginPage.passwordInput.sendKeys(password);

      loginPage.loginButton.click();

      expect(dashboardPage.header.getText()).toEqual('Dashboard');

      expect(specHelper.getCurrentUrl()).toEqual('/dashboard');
    });
  });

  describe('invalid credentials', () => {
    beforeEach(() => {
      email = 'invalid@example.com';
      password = 'wrongPassword!';

      specHelper.stubApiRequest({
        url: '/sessions',
        method: 'POST',
        response: {
          code: 422,
          data: {
            errors: 'Invalid email/password combination'
          }
        }
      });
    });

    it('shows error on login page', () => {
      specHelper.navigateTo(loginPage);

      loginPage.emailInput.sendKeys(email);
      loginPage.passwordInput.sendKeys(password);

      loginPage.loginButton.click();

      expect(loginPage.errorMessages.getText()).toEqual('Invalid email/password combination');
    });
  });
});
