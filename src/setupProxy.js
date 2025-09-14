const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://backend.jotish.in/backend_dev",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", 
      },
      secure: false,
    })
  );
};
