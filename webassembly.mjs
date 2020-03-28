// https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format

export async function run() {
  let obj = await WebAssembly.instantiateStreaming(fetch('add.wasm'))
  console.log(obj.instance.exports.add(1, 2));  // "3"
}