const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});
http.createServer(function(req, res) {
    console.log('Request', req.method, req.url, req.hostname);
    proxy.web(req, res, { target: 'https://monkfish-app-9uhwr.ondigitalocean.app/ticker' });
}).listen(8000);
