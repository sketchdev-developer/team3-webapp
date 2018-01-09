var proxy = require('http-proxy-middleware');

var apiProxy = proxy('/api', {
  target: 'http://localhost:3000',
  pathRewrite: { '^/api/' : '/' },
  //changeOrigin: true,
  //logLevel: 'debug'
});

module.exports = {
  bind: '0.0.0.0',
  ghostMode: false,
  port: 4200,
  open: false,
  notify: false,
  minify: false,
  ui: false,
  files: [
    "./dist/**/*.{html,htm,css,js}"
  ],
  server: {
    baseDir: "./dist",
    middleware: [apiProxy]
  }
}
