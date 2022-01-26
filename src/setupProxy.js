const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (api) {
  api.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8000",
      pathRewrite: { "^/api": "" },
    })
  )
};
