import { SpecHelper } from './support/spec.helper';
import { HomePage } from './pages/home.po';

describe('homepage', () => {
  let homePage: HomePage;
  let specHelper: SpecHelper;

  beforeEach(() => {
    specHelper = new SpecHelper();
    homePage = new HomePage();
  });

  it('displays welcome text', () => {
    specHelper.navigateTo(homePage);

    expect(homePage.navBar.appTitle.getText()).toEqual('Comic Search');
    expect(homePage.searchText.getText()).toEqual('Search for your favorite comic book character');
  });
});
