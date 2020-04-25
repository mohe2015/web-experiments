export async function createAsymmetricKeyPair() {
  return await window.crypto.subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-521"
    },
    true,
    ["sign", "verify"]
  );
}

export async function storeNewAsymmetricKeyPair() {
  let keyPair: CryptoKeyPair = await createAsymmetricKeyPair();
  let exportedPublicKey = await window.crypto.subtle.exportKey("jwk", keyPair.publicKey)
  let exportedPrivateKey = await window.crypto.subtle.exportKey("jwk", keyPair.privateKey)
  window.localStorage.setItem("publicSigningKey", JSON.stringify(exportedPublicKey))
  window.localStorage.setItem("privateSigningKey", JSON.stringify(exportedPrivateKey))
}

export async function importAsyncPublicKey(test: Uint8Array) {
  return await window.crypto.subtle.importKey("jwk", test,
    {
      name: "ECDSA",
      namedCurve: "P-521"
    } as EcKeyImportParams,
    true,
    ["verify"]
  )
}

export async function importAsyncPrivateKey(test: Uint8Array) {
  return await window.crypto.subtle.importKey("jwk", test,
    {
      name: "ECDSA",
      namedCurve: "P-521"
    } as EcKeyImportParams,
    true,
    ["sign"]
  )
}

export async function getAsymmetricPublicKey() {
  let storedKey = window.localStorage.getItem("publicSigningKey")
  if (!storedKey) {
    storeNewAsymmetricKeyPair()
  }
  return await importAsyncPublicKey(JSON.parse(window.localStorage.getItem("publicSigningKey") as string))
}

export async function getAsymmetricPrivateKey() {
  let storedKey = window.localStorage.getItem("privateSigningKey")
  if (!storedKey) {
    storeNewAsymmetricKeyPair()
  }
  return await importAsyncPrivateKey(JSON.parse(window.localStorage.getItem("privateSigningKey") as string))
}