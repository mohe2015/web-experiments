import { createServer } from 'http';
import WebSocket from 'ws';
const server = createServer();
const wss = new WebSocket.Server({ server: server });
wss.on('connection', function (socket, request) {
    console.log('wss.on(\'connection\'');
    const ip = request.connection.remoteAddress;
    console.log('connection from ' + ip);
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
console.log("jo");
server.listen(1337);
//# sourceMappingURL=server.js.map