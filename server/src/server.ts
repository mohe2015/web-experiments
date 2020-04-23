import http from 'http'
import WebSocket from 'ws'

const server: http.Server = http.createServer();
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', function connection(ws, request, client) {
  console.log('wss.on(\'connection\'')
  const ip = request.connection.remoteAddress;
  console.log('connection from ' + ip)
  ws.on('message', function message(data) {
    console.log(`Received message ${data} from user ${client.userId}`);

    // broadcasting for testing
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

async function authenticate(request) {
  return {
    userId: 'test'
  }
}

server.on('upgrade', async function upgrade(request, socket, head) {
  console.log('server.on(\'upgrade\'')
  let client = await authenticate(request);
  //socket.destroy();

  wss.handleUpgrade(request, socket, head, function done(ws) {
    console.log('wss.emit(\'connection\'')
    wss.emit('connection', ws, request, client);
  });
});

server.listen(1337)
console.log('server.listen(1337)')
