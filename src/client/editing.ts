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

  const yPosts = ydoc.getArray('posts')
  yPosts.observe(event => {
    let table = document.getElementById('posts') as HTMLTableElement
    let node = table.querySelector('tbody') as HTMLTableSectionElement
    var tbody = node.cloneNode(false);
    (node.parentNode as HTMLElement).replaceChild(tbody, node);

    yPosts.forEach((originalElement) => {
      let element = originalElement as Y.Map<string>
      let tr = document.createElement('tr')

      let tdTitle = document.createElement('td')
      tdTitle.appendChild(document.createTextNode(element.get('title') as string))

      let tdAuthors = document.createElement('td')
      tdAuthors.appendChild(document.createTextNode(element.get('author') as string))

      let tdContent = document.createElement('td')
      tdContent.appendChild(document.createTextNode(element.get('content') as string))

      let tdCreatedAt = document.createElement('td')
      tdCreatedAt.appendChild(document.createTextNode(element.get('createdAt') as string))

      let tdUpdatedAt = document.createElement('td')
      tdUpdatedAt.appendChild(document.createTextNode(element.get('updatedAt') as string))

      tr.appendChild(tdTitle)
      tr.appendChild(tdAuthors)
      tr.appendChild(tdContent)
      tr.appendChild(tdCreatedAt)
      tr.appendChild(tdUpdatedAt)

      tbody.appendChild(tr)
    })
  })

  const yPost = new Y.Map()
  yPost.set("title", "Teeest")
  yPost.set("author", "mohe2015")
  yPost.set("content", "hi")
  yPost.set("createdAt", "10.12.2001")
  yPost.set("updatedAt", "27.04.2020")

  yPosts.push([yPost])
}
abcde()