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
  console.log(signature)

  let test = await window.crypto.subtle.exportKey('spki', keyPair.publicKey)

  let test1 = btoa(String.fromCharCode(...new Uint8Array(test)))

 setQRCodeData("https://moritz.local/#"+test1)
}

main()