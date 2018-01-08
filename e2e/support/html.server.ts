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

export class ApiServer {
  respondToApiRequest(req, res, next) {
    const body = req.body;

    if (body.email === 'valid@example.com' && body.password === 'ValidPassword123!') {
      res.json({ status: true });
    } else {
      res.status(422).json({ errors: 'Invalid email/password combination' });
    }
  }
}

const app = express();

const apiServer = new ApiServer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.all('*', apiServer.respondToApiRequest);
app.listen(API_SERVER_PORT);

console.log('Started Http Proxy Server');

