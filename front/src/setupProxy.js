const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/ticker',
        createProxyMiddleware({
            target: 'http://0.0.0.0:8080',
            changeOrigin: true,
            secure: false
        })
    );
};

//"_sort=-name_field"