// I think block editing that's not 100% wysiwyg is better than an arbitrary editor
// easier to convert and not so much unexpected things
// also more user friendly?
// possible to create page builder
// yjs
// just get inspired by them
// maybe custom elements may help or so
// editor.js
// gutenberg
// USE https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type

// node node_modules/y-webrtc/bin/server.js

import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'

const ydoc = new Y.Doc()
// clients connected to the same room-name share document updates
const provider = new WebrtcProvider('your-room-name', ydoc)
const yarray = ydoc.get('array', Y.Array)

console.log(provider)
console.log(yarray)