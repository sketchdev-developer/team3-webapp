import { SpecHelper } from './support/spec.helper';
import { HomePage } from './pages/home.po';

describe('homepage', () => {
  let homePage: HomePage;
  let specHelper: SpecHelper;

  beforeEach(() => {
    specHelper = new SpecHelper();
    homePage = new HomePage();
  });

  it('should display welcome message', () => {
    specHelper.navigateTo(homePage);

    expect(homePage.introHeader.getText()).toEqual('Bootstrap starter template');
    expect(homePage.introText.getText()).toContain('Use this document as a way to quickly start any new project.');
    expect(homePage.introText.getText()).toContain('All you get is this text and a mostly barebones HTML document.');
  });
});
