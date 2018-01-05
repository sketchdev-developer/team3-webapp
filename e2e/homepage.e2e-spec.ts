import { SpecHelper } from './support/spec.helper';
import { HomePage } from './pages/home.po';
import { LoginPage } from './pages/login.po';

describe('homepage', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let specHelper: SpecHelper;

  beforeEach(() => {
    specHelper = new SpecHelper();
    homePage = new HomePage();
    loginPage = new LoginPage();
  });

  it('displays welcome text', () => {
    specHelper.navigateTo(homePage);

    expect(homePage.introHeader.getText()).toEqual('Bootstrap starter template');
    expect(homePage.introText.getText()).toContain('Use this document as a way to quickly start any new project.');
    expect(homePage.introText.getText()).toContain('All you get is this text and a mostly barebones HTML document.');
  });

  it('can visit login page', () => {
    specHelper.navigateTo(homePage);

    homePage.navBar.loginLink.click();

    expect(loginPage.header.getText()).toEqual('Log In');
  });
});
