var bs = require("browser-sync").create();

var bodyParser = require('body-parser');
var proxy = require('http-proxy-middleware');

import * as express from 'express';

const LOCAL_BROWSER_PORT = 4201;
const LOCAL_BROWSER_URL = `http://localhost:${LOCAL_BROWSER_PORT}`;

export const API_SERVER_PORT = 3001;
const API_SERVER_URL = `http://localhost:${API_SERVER_PORT}`;

const jsonPlaceholderProxy = proxy('/api', {
  target: API_SERVER_URL,
  //ws: true,
  pathRewrite: { '^/api/' : '/' },
  logLevel: 'error'
});

var fallback = require('connect-history-api-fallback');
var log = require('connect-logger');
var url = require('url');

var ETAG_NUMBER = 123456

const respondToIndexHtmlRequest = (req, res, next) => {
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

//const indexedDbStubber = new IndexedDbStubber();

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
      jsonPlaceholderProxy,
      //{
        //route: "/api",
        //handle: interceptApiRequest
      //},
      //log({ format: '%date %status %method %url' }),
      fallback({
        index: '/index.html',
        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'] // systemjs workaround
      }),
      respondToIndexHtmlRequest
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
  static start() {
    // .init starts the server
    bs.init(BS_CONFIG);
  }

  static setStorageState(state: any) {
    //indexedDbStubber.setState(state);
  }
}

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

export class ApiServer {
  static stubbedRequests: StubRestRequest[] = [];

  static stubApiRequest(options: IStubRestRequestOptions) {
    const request = new StubRestRequest(options);
    ApiServer.stubbedRequests.push(request);
    return request;
  }

  static resetRequests(newRequests: StubRestRequest[] = []) {
    ApiServer.stubbedRequests = newRequests;
  }

  static respondToApiRequest(req, res, next) {
    let foundRequest;

    for (let stubbedRequest of ApiServer.stubbedRequests) {
      if (req.method === stubbedRequest.method && req.path === stubbedRequest.url) {
        foundRequest = stubbedRequest;
      }
    }

    if (foundRequest) {
      res.status(foundRequest.response.code).json(foundRequest.response.data);
    } else {
      console.error('didnt find request!', req.method, req.path);
    }
  }
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.all('*', ApiServer.respondToApiRequest);
app.listen(API_SERVER_PORT);

console.log('Started Http Proxy Server');

