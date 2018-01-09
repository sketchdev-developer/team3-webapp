import { browser, by, element } from 'protractor';

import { HtmlServer, ApiServer, StubRestRequest } from './html.server';

HtmlServer.start();

export class SpecHelper {
  stubbedRequests: StubRestRequest[] = [];

  navigateTo(page) {
    ApiServer.resetRequests(this.stubbedRequests);
    return browser.get(page.url);
  }

  teardown() {
    this.resetRequests();
  }

  resetRequests() {
    ApiServer.resetRequests();
  }

  stubApiRequest(options) {
    const request = new StubRestRequest(options);
    this.stubbedRequests.push(request);
    return request;
  }

  getCurrentUrl() {
    return browser.getCurrentUrl()
      .then(url => `/${url.split('/').slice(3).join('/')}`)
  }

  sleep(ms: number = 10000) {
    browser.sleep(ms);
  }
}
