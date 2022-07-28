const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://dev-eduvanz.ind2s.sfdc-y37hzm.force.com/services/apexrest/HerokuFileUpload',
      changeOrigin: true,
    })
  );
  app.use(
    '/uploadpdf',
    createProxyMiddleware({
      target: 'http://s-edvnz-bank-api.sg-s1.cloudhub.io/api/bank/statement/',
      changeOrigin: true,
    })
  );
};