import http from 'http'
import WebSocket from 'ws'
 
const server = http.createServer();
const wss = new WebSocket.Server({ noServer: true });
 
wss.on('connection', function connection(ws, request, client) {
    const ip = request.connection.remoteAddress;
    console.log('request from ' + ip)
    ws.on('message', function message(data) {
      console.log(`Received message ${data} from user ${client}`);
    
      wss.clients.forEach(function each(client) {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data);
          }
        });

    });
});

function authenticate(request, callback) {
  request.userId = 'test';
  callback(null, request)
}

server.on('upgrade', function upgrade(request, socket, head) {
  authenticate(request, (err, client) => {
    if (err || !client) {
      socket.destroy();
      return;
    }
 
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request/*, client*/);
    });
  });
});
 
server.listen(8080);
console.log('listening on ws://localhost:8080')