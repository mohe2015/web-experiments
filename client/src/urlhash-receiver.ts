

async function testttt() {
  if (window.location.hash) {
    alert(window.location.hash.substr(1))

    

    let test = Uint8Array.from(atob(window.location.hash.substr(1)), c => c.charCodeAt(0))
    console.log(test)
    alert(test)
    // @ts-ignore
    alert(await window.crypto.subtle.importKey("raw", test,
      {
        name: "ECDSA",
        namedCurve: "P-384"
      } as EcKeyImportParams,
      true,
      ["verify"]
    ))
  }
}

testttt()