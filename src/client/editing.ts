// I think block editing that's not 100% wysiwyg is better than an arbitrary editor
// maybe custom elements may help or so, editor.js
// node node_modules/y-webrtc/bin/server.js
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'

const ydoc = new Y.Doc()
new WebrtcProvider('your-room-name', ydoc)
const yarray = ydoc.getArray('array')
// TODO update first

console.log(yarray)
yarray.push(["a", "b", "c"])

yarray.forEach(e => console.log(e))