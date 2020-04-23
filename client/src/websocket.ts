import getIdentifier from './identifier'
// The bootstrapNodes listen on websocket protocol and are only needed to connect.

const bootstrapNodes = ['ws://localhost:1337'];

let webSocket = new WebSocket(bootstrapNodes[0]);
webSocket.addEventListener('open', event => {
    webSocket.send(getIdentifier())
})
webSocket.addEventListener('error', event => {
    alert('Connection to bootstrap node failed')
})
webSocket.addEventListener('message', event => {
    console.log(event)
})
webSocket.addEventListener('close', event => {
    console.log('connection closed')
})