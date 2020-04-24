import { setQRCodeData } from './qrcode-generator'

async function main() {
  let keyPair = await window.crypto.subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-521"
    },
    true,
    ["sign", "verify"]
  );

  let test = await window.crypto.subtle.exportKey('raw', keyPair.publicKey)

  console.log("a")
  console.log(new Uint8Array(test))

  let test1 = btoa(String.fromCharCode(...new Uint8Array(test)))

  setQRCodeData("https://192.168.2.109/#Moritz Hedtke#"+test1)
  
  console.log(test1)
}

main()