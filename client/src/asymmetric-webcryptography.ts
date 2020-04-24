import { bufferToHex } from './utils'
import { setQRCodeData } from './qrcode-generator'

function getMessageEncoding1() {
  const messageBox = document.querySelector(".ecdsa #message") as HTMLInputElement;
  let message = messageBox.value;
  let enc = new TextEncoder();
  return enc.encode(message);
}

async function main() {
  let keyPair = await window.crypto.subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-384"
    },
    true,
    ["sign", "verify"]
  );

  let encoded = getMessageEncoding1();
  let signature = await window.crypto.subtle.sign(
    {
      name: "ECDSA",
      hash: {name: "SHA-384"},
    },
    keyPair.privateKey,
    encoded
  );
  console.log(bufferToHex(signature))

  let exportedPublicKey = await window.crypto.subtle.exportKey('jwk', keyPair.publicKey)
  console.log(exportedPublicKey)
  setQRCodeData("https://192.168.2.109/#"+JSON.stringify(exportedPublicKey))
  //setQRCodeData('HI')
}

main()