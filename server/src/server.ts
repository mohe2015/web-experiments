import { createServer, Server, IncomingMessage } from 'http'
import WebSocket from 'ws'

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