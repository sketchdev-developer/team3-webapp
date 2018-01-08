import { browser, by, element } from 'protractor';

import { HtmlServer, API_SERVER_PORT } from './html.server';

HtmlServer.start();

type HTTP_METHODS = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'OPTIONS' | 'HEAD';

interface IStubRestRequestResponse {
  code: number;
  data: any;
}

interface IStubRestRequestOptions {
  url: string;
  method: HTTP_METHODS;
  response: IStubRestRequestResponse;
}

export class StubRestRequest {
  url: string;
  method: HTTP_METHODS;
  response: any;

  constructor(private options: IStubRestRequestOptions) {
    this.url = options.url;
    this.method = options.method;
    this.response = options.response;
  }
}

export class SpecHelper {
  stubbedRequests: StubRestRequest[] = [];

  navigateTo(page) {
    return browser.get(page.url);
  }

  stubApiRequest(options: IStubRestRequestOptions) {
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
