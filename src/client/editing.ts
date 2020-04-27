// I think block editing that's not 100% wysiwyg is better than an arbitrary editor
// maybe custom elements may help or so, editor.js
// node node_modules/y-webrtc/bin/server.js
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { IndexeddbPersistence } from 'y-indexeddb'

async function abcde() {
  const ydoc: Y.Doc = new Y.Doc()

  let idbP = new IndexeddbPersistence('your-room-name', ydoc)

  // this allows you to instantly get the (cached) documents data
  await idbP.whenSynced

  const yarray = ydoc.getArray<number>('count')

  yarray.observe(event => {
    console.log("change: " + yarray.toArray().reduce((a,b)=>(a+b)))
  })

  let webP = new WebrtcProvider('your-room-name', ydoc)
  webP.connect()

  yarray.push([1])

  let sum = yarray.toArray().reduce((a,b)=>(a+b))

  console.log(sum)
}
abcde()