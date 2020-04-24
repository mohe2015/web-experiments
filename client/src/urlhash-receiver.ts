async function testttt() {
  if (window.location.hash) {
    let test = Uint8Array.from(atob(window.location.hash.substr(1)), c => c.charCodeAt(0))
    console.log("bbb" + test)
    // @ts-ignore
    let key = await window.crypto.subtle.importKey("raw", test,
      {
        name: "ECDSA",
        namedCurve: "P-521"
      } as EcKeyImportParams,
      true,
      ["verify"]
    )
    console.log(key)
  }
}

testttt()