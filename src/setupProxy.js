const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Change from "/evaluation-service" to "/api"
    createProxyMiddleware({
      target: 'http://20.244.56.144',
      changeOrigin: true,
      pathRewrite: { '^/api': '/evaluation-service' }, // Rewrite "/api" -> "/evaluation-service"
    })
  );
};
