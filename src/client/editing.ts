// I think block editing that's not 100% wysiwyg is better than an arbitrary editor
// maybe custom elements may help or so, editor.js
// node node_modules/y-webrtc/bin/server.js
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { IndexeddbPersistence } from 'y-indexeddb'

let countElement = document.getElementById('count') as HTMLHeadingElement

countElement.addEventListener('animationend', () => {
  if (countElement.classList.contains('fadeout-text')) {
    countElement.classList.remove('fadeout-text')
    countElement.innerText = countElement.dataset.newText as string;
    countElement.classList.add('fadein-text')
  } else if (countElement.classList.contains('fadein-text')) {
    countElement.classList.remove('fadein-text')
  }
});

function updateText(text: string) {
  countElement.dataset.newText = text;
  countElement.classList.add('fadeout-text')
}

async function abcde() {
  const ydoc = new Y.Doc()
  // this allows you to instantly get the (cached) documents data
  let idbP = new IndexeddbPersistence('count-demo', ydoc)
  await idbP.whenSynced
  
  // this will sync between clients in the background, may be replaced by any network provider
  let webP = new WebrtcProvider('count-demo', ydoc)
  webP.connect()
  // array of numbers which produce a sum
  const yarray = ydoc.getArray<number>('count')
  // add 1 to the sum
  yarray.push([1])
  // observe changes of the sum
  yarray.observe(event => {
    // this will print updates from the network
    let sum = yarray.toArray().reduce((a,b)=>(a+b))
    console.log("new sum: " + sum)
    updateText(sum.toString())
  })
  // print initial number (the cached one plus one)
  let sum = yarray.toArray().reduce((a,b)=>(a+b))
  console.log(sum)
  countElement.innerText = sum.toString();
}
abcde()