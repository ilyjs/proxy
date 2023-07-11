const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const winston = require('winston');
const { format, transports } = require('winston');
const pino = require('pino');


const app = express();
// const logger = winston.createLogger({
//     format: format.combine(format.splat(), format.simple()),
//     transports: [new transports.Console()],
// });
const logger = pino({level: 'debug'});

// app.use('/ton-blockchain/*', createProxyMiddleware({ target: 'https://raw.githubusercontent.com',         changeOrigin: true,
//         logger,
//         logLevel:"info",
//         compress: false
// }));

// const simpleRequestLogger = (proxyServer, options) => {
//     proxyServer.on('proxyReq', (proxyReq, req, res) => {
//         console.log(`[HPM] [${req.method}] ${req.url}`); // outputs: [HPM] GET /users
//     });

app.use(
    '/bridge/*',
    createProxyMiddleware({
        target: 'https://bridge.tonapi.io',
        changeOrigin: true,
        compress: false,
        logger,
        on: {
            proxyReq: (proxyReq, req, res) => {
                /* handle proxyReq */
                console.log(1234)
            },
            proxyRes: (proxyRes, req, res) => {
                /* handle proxyRes */
                console.log(5678)
            },
            error: (err, req, res) => {
                console.log(910)
                /* handle error */
            },
        },
        // plugins: [simpleRequestLogger],

    })
);

// app.use('/ton-connect/*', createProxyMiddleware({ target: 'https://app.tonkeeper.com',         changeOrigin: true,
//         logger,
//         logLevel:"info",
//         compress: false
// }));
//
// app.use('/mngr/*', createProxyMiddleware({ target: 'https://ton.access.orbs.network',         changeOrigin: true,
//         logger,
//         logLevel:"info",
//         compress: false
// }));




app.listen(3005);
//https://app.tonkeeper.com/