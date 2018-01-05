import { browser, by, element } from 'protractor';

export class SpecHelper {
  navigateTo(page) {
    return browser.get(page.url);
  }

  getCurrentUrl() {
    return browser.getCurrentUrl()
      .then(url => `/${url.split('/').slice(3).join('/')}`)
  }
}
