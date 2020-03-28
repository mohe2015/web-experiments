all:
	wat2wasm add.wat -v -o add.wasm
	python3 -m http.server
