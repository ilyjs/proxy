import { toNano } from 'ton-core';
import { Mo } from '../wrappers/Mo';
import { compile, NetworkProvider } from '@ton-community/blueprint';
import axios from "axios";
import {Readable} from "stream";
import * as http from "http";
import 'global-agent/bootstrap';



// import {
//     bootstrap, createGlobalProxyAgent
// } from 'global-agent';

//const globalProxyAgent = createGlobalProxyAgent();
//global.GLOBAL_AGENT.HTTP_PROXY
// Define the original destination you want to intercept
const originalDestination = 'https://bridge.tonapi.io';

// Define the new destination you want to override with
 const newDestination = 'http://localhost:3005';
 // nock.enableNetConnect(originalDestination);
// nock.enableNetConnect(
//     (host: any) => host.includes('https://bridge.tonapi.io') || host.includes('ton.access.orbs.network' || host.includes('https://app.tonkeeper.com'))
// )
const res = {
    writeHead: () => { },
    end: () => { },
};
//Intercept the request to the original destination

//new EventSource(originalDestination , {proxy: `${newDestination}`});

// const ev = new EventSource('https://bridge.tonapi.io');
//
// ev.onmessage = (e: any) => {
//     console.log("e", e);
// }
// process.on('message', function (data: any) {
//     console.log('First subscriber: ' + data);
// });

// self.addEventListener("message", (ev) => {
//     console.log("addEventListener",ev)
//
//     // self.postMessage({ data: ev.data, url: 'http://localhost:3005' });
//
// });

///https://bridge.tonapi.io/bridge/events?client_id=a1715dfd6c755084c51836b492a1b40f11d4bebdf48014b7e38c2d8e2c7d2228
// const getTon = async () => {
//    console.log("5444444")
//    const response = await axios.get(`https://bridge.tonapi.io/bridge/events?client_id=a1715dfd6c755084c51836b492a1b40f11d4bebdf48014b7e38c2d8e2c7d2228`);
//
// }
//
//  getTon();
// nock(originalDestination)
//     .persist()
//     .get(/.*/)
//     .reply( async function  (uri: string, requestBody: any)  {
//
//         // @ts-ignore
//         console.log("log", `${newDestination}${uri}`, JSON.stringify(this?.req?.headers))
//         // @ts-ignore
//         const response = await axios.get(`${newDestination}${uri}`, {headers: this?.req?.headers});
//         console.log("544");
//         return [response.status, response.data, response.headers];
//
//     }).options(/.*/).reply(200,async (uri: string, requestBody: any) => {
//
//     const response = await axios.get(`${newDestination}${uri}`);
//     return [response.status, response.data, response.headers];
//     // const stream = new Readable();
//     // stream.push(response.data);
//     //
//     //
//     // return [response, response, response];
//     //console.log('uri', uri)
//     // console.log("nock.passthrough",`${newDestination}${uri}`)
//     // console.log("requestBody", requestBody)
//     // try {
//     //     // Выполняем асинхронный запрос на новый адрес
//     //     const response = await axios.options(`${newDestination}${uri}`, {
//     //         headers:
//     //         // Передаем все заголовки исходного запроса
//     //         requestBody.headers,
//     //     });
//     //     return response;
//     // } catch (error) {
//     //     console.error(error + "  говно");
//     // }
//     // return nock.get(`${newDestination}${uri}`).reply();
//
// });

// nock(originalDestination)
//     .persist()
//     .get(/.*/)
//     .reply()



export async function run(provider: NetworkProvider) {
    const mo = provider.open(
        Mo.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('Mo')
        )
    );

    await mo.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(mo.address);

    console.log('ID', await mo.getID());
}
