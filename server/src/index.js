async function main() {
  const fooModule = await import('./server.ts');
  console.dir({foo: fooModule})
}
main()
