import { importAsyncPublicKey } from '../../lib/src/asymmetric-webcryptography'

async function testttt() {
  if (window.location.hash) {
    let test = Uint8Array.from(atob(window.location.hash.substr(1)), c => c.charCodeAt(0))
    console.log("bbb" + test)
    let key = importAsyncPublicKey(test)
    console.log(key)
  }
}

testttt()