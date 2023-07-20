const express = require('express');
const { createProxyMiddleware, responseInterceptor} = require('http-proxy-middleware');
const pino = require('pino');
const cors = require('cors')
const https = require('https');
const app = express();

var corsOptions = {
    origin: '*',
    allowedHeaders: '*',
   /// credentials: true
}

app.use(cors(corsOptions))

const logger = pino({level: 'debug'});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Report-To', '{}');
    res.setHeader("connection", "keep-alive");
    next();
});

app.use(
    '/bridge/*',
    createProxyMiddleware({
        target: 'https://bridge.tonapi.io',
        changeOrigin: true,
        compress: false,
        agent: new https.Agent({ rejectUnauthorized: false }), //

        logger,
        on: {
            proxyRes: (proxyRes, req, res) => {
                /* handle proxyRes */
                proxyRes.headers['report-to'] = '{}'; // add new header to response
                delete proxyRes.headers['Report-To']; // remove header from response


            },
            proxyReq: (proxyReq, req, res) => {
                /* handle proxyReq */
                proxyReq.headers['Report-To'] = '{}'; // add new header to response
            },
        },

    })
);

app.use(
    '/connect/*',
    createProxyMiddleware({
        target: 'https://connect.tonhubapi.com',
        changeOrigin: true,
        compress: false,
        agent: new https.Agent({ rejectUnauthorized: false }), //

        logger,
        on: {
            proxyRes: responseInterceptor( async (responseBuffer, proxyRes, req, res) => {
                const exchange = `[DEBUG] ${req.method} ${req.path} -> ${proxyRes.req.protocol}//${proxyRes.req.host}${proxyRes.req.path} [${proxyRes.statusCode}]`;
                console.log(exchange); // [DEBUG] GET / -> http://www.example.com [200]

                res.end();

                // const response = responseBuffer; // convert buffer to string
                return responseBuffer; // manipulate response and return the result

            }),

        },

    })
);

app.use(
    '/ticker',
    createProxyMiddleware({
        target: 'https://monkfish-app-9uhwr.ondigitalocean.app',
        changeOrigin: true,
        compress: false,
        agent: new https.Agent({ rejectUnauthorized: false }), //

        logger,
        on: {
            proxyRes: responseInterceptor( async (responseBuffer, proxyRes, req, res) => {
                const exchange = `[DEBUG] ${req.method} ${req.path} -> ${proxyRes.req.protocol}//${proxyRes.req.host}${proxyRes.req.path} [${proxyRes.statusCode}]`;
                console.log(exchange); // [DEBUG] GET / -> http://www.example.com [200]

                res.end();

                // const response = responseBuffer; // convert buffer to string
                return responseBuffer; // manipulate response and return the result

            }),

        },

    })
);


app.listen(3007, ()=>{
    console.log(123456)
});





const express = require('express');
const { createProxyMiddleware, responseInterceptor} = require('http-proxy-middleware');
const pino = require('pino');
const cors = require('cors')
const https = require('https');
const app = express();

var corsOptions = {
    origin: '*',
    allowedHeaders: '*',
    /// credentials: true
}

app.use(cors(corsOptions))

const logger = pino({level: 'debug'});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Report-To', '{}');
    res.setHeader("connection", "keep-alive");
    next();
});

app.use(
    '/bridge/*',
    createProxyMiddleware({
        target: 'https://bridge.tonapi.io',
        changeOrigin: true,
        compress: false,
        agent: new https.Agent({ rejectUnauthorized: false }), //

        logger,
        on: {
            proxyRes: (proxyRes, req, res) => {
                /* handle proxyRes */
                proxyRes.headers['report-to'] = '{}'; // add new header to response
                delete proxyRes.headers['Report-To']; // remove header from response


            },
            proxyReq: (proxyReq, req, res) => {
                /* handle proxyReq */
                proxyReq.headers['Report-To'] = '{}'; // add new header to response
            },
        },

    })
);


app.listen(3007, ()=>{
    console.log(123456)
});
