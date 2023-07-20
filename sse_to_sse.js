// this is just to demo the concept of SSE, not intended for production usage.

const http = require("http");
var os = require("os");
const EventSource = require("eventsource")
const host = "0.0.0.0";
const port = 3007;


// A simple dataSource that changes over time
let dataSource = 0;
const updateDataSource = () => {
    const delta = Math.random();
    dataSource += delta;
}


const requestListener = function (req, res) {
    if (req.url.includes('/bridge')) {
        res.statusCode = 200;
       // console.log("res.statusCode", res.statusCode)
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "*");
        res.setHeader("Access-Control-Allow-Methods", "*");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("connection", "keep-alive");
        res.setHeader("Access-Control-Allow-Credentials", true);

        res.setHeader("Content-Type", "text/event-stream");
        res.write('heartbeat\n\r');
        res.write('\n');

        const ev = new EventSource("https://bridge.tonapi.io"+req.url);
        console.log("https://bridge.tonapi.io"+req.url)
        ev.onopen = function () {
            console.log("open");
        }

        ev.onmessage = (e) => {
            console.log('message',e, e.data, e.lastEventId);
          //  res.write(e.lastEventId);
            res.write(`id: ${e.lastEventId}\ndata: ${e.data}\n\n`);
        };

        ev.onerror =  function (err) {
            if (err) {
                console.log("err", err)
                res.end();
            }

        }
        // res.end();

    } else {
        res.statusCode = 404;
        res.end("resource does not exist");
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`server running at http://${host}:${port}`);
});
