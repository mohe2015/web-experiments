import { createServer, Server, IncomingMessage } from 'http'
import WebSocket from 'ws'
import { Crypto } from '@peculiar/webcrypto';
import btoa from 'btoa'

const crypto = new Crypto();

async function jjjj() {
  let keyPair = await crypto.subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-521"
    },
    true,
    ["sign", "verify"]
  );

  let test = await crypto.subtle.exportKey('raw', keyPair.publicKey)


  let test1 = btoa(String.fromCharCode(...new Uint8Array(test)))
  console.log("https://192.168.2.109/#"+test1)
}
jjjj()

const server: Server = createServer();
const wss: WebSocket.Server = new WebSocket.Server({ server: server });

wss.on('connection', function (socket: WebSocket, request: IncomingMessage) {
  console.log('wss.on(\'connection\'')
  const ip = request.connection.remoteAddress;
  console.log('connection from ' + ip)
  socket.on('message', function message(data) {
    console.log(`Received message ${data} from user`);

    // broadcasting for testing
    wss.clients.forEach(function each(client) {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

console.log("joa")

server.listen(1337)
