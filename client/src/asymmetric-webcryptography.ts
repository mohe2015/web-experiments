import { setQRCodeData } from './qrcode-generator'

async function main() {
  let keyPair = await window.crypto.subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-384"
    },
    true,
    ["sign", "verify"]
  );

  let test = await window.crypto.subtle.exportKey('spki', keyPair.publicKey)

  let test1 = btoa(String.fromCharCode(...new Uint8Array(test)))

  setQRCodeData("https://moritz.local/#"+test1)
  
}

main()