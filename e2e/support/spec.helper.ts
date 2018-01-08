import { browser, by, element } from 'protractor';

var bs = require("browser-sync").create();
var app = require('express')();

var bodyParser = require('body-parser');
var proxy = require('http-proxy-middleware');

const LOCAL_BROWSER_PORT = 4201;
const LOCAL_BROWSER_URL = `http://localhost:${LOCAL_BROWSER_PORT}`;

export const API_SERVER_PORT = 3000;
const API_SERVER_URL = `http://localhost:${API_SERVER_PORT}`;

var fallback = require('connect-history-api-fallback');
//var log = require('connect-logger');
var url = require('url');

var ETAG_NUMBER = 123456

const BS_CONFIG = {
  port: LOCAL_BROWSER_PORT,
  open: false,
  notify: false,
  minify: false,
  logLevel: "silent",
  codeSync: false,
  ghostMode: false,
  injectChanges: false,
  //files: [
    //"./dist/**/*.{html,htm,css,js}"
  //],
  watchOptions: {
    ignored: 'node_modules'
  },
  server: {
    baseDir: "./dist",
    middleware: [
      //upload.any(),
      proxy('/api', {
        target: API_SERVER_URL,
        //ws: true,
        pathRewrite: { '^/api/' : '/' },
        logLevel: 'error'
      }),
      fallback({
        index: '/index.html',
        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'] // systemjs workaround
      }),
      (req, res, next) => {
        var path = decodeURI((url.parse(req.url)).pathname);

        if (path === '/index.html') {
          //res.setHeader('cache-control', 'public, max-age=0');
          res.setHeader('Cache-Control', 'no-cache');
          res.setHeader('Expires', '-1');
          res.setHeader('Etag', ETAG_NUMBER += 1);
          //res.setHeader('Last-Modified', (new Date()).toUTCString());
        }
        next();
      }
    ]
  },
  //rewriteRules: [
    //{
      //match: /<\/head>/g,
      //fn: function (match) {
        //return indexedDbStubber.injectState() + "</head>";
      //}
    //}
  //]
}

export class HtmlServer {
  stubbedRequests: any[] = [];

  start() {
    bs.init(BS_CONFIG);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    //app.all('*', setAllRequestHeaders);
    //app.options('*', respondToOptionsRequest);
    app.all('*', this.respondToApiRequest);
    app.listen(API_SERVER_PORT);
  }

  resetRequests() {
    this.stubbedRequests = [];
  }

  stubRequests(requests: any[]) {
    this.stubbedRequests = requests;
  }

  setStorageState(state: any) {
    //indexedDbStubber.setState(state);
  }

  findStubbedRequest(req) {
    let foundRequest;

    for (let request of this.stubbedRequests) {
      if (request.method === req.method) {
        if (request.url === req.path) {
          foundRequest = request;
          break;
        }
      }
    }

    return foundRequest;
  }

  respondToApiRequest = (req, res, next) => {
    res.set('Cache-Control', 'max-age=0, private, must-revalidate');
    res.set('Vary', 'Origin');

    const foundRequest = this.findStubbedRequest(req);

    if (foundRequest) {
      res.status(foundRequest.response.code).json(foundRequest.response.data);
    } else {
      res.status(500).json({ errors: 'request not stubbed!' });
    }
  }
}

const htmlServer = new HtmlServer();
htmlServer.start();

console.log('Started Http Proxy Server');

export class SpecHelper {
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
    htmlServer.resetRequests();
    htmlServer.stubRequests(this.stubbedRequests);
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
}
