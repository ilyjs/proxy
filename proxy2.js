var proxy = require('express-http-proxy');
var app = require('express')();
//"https://bridge.tonapi.io/bridge/
app.use('/bridge', proxy('https://bridge.tonapi.io', {
    userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
        console.log(12345);
        console.log("proxyRes",proxyRes)
        // data = JSON.parse(proxyResData.toString('utf8'));
        // data.newProperty = 'exciting data';
        return proxyResData;
    }
}));

app.listen(3006);