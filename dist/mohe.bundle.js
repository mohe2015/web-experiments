/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/client/editing.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/isomorphic.js/iso-browser.js":
/*!***************************************************!*\
  !*** ./node_modules/isomorphic.js/iso-browser.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* eslint-env browser */
const perf = typeof performance === 'undefined' ? null : performance

const isoCrypto = typeof crypto === 'undefined' ? null : crypto

/**
 * @type {function(number):ArrayBuffer}
 */
const cryptoRandomBuffer = isoCrypto !== null
  ? len => {
    // browser
    const arr = new Uint8Array(len)
    isoCrypto.getRandomValues(arr)
    return arr.buffer
  }
  : len => {
    // polyfill
    const arr = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
      arr[i] = Math.ceil((Math.random() * 0xFFFFFFFF) >>> 0)
    }
    return arr.buffer
  }

exports.performance = perf
exports.cryptoRandomBuffer = cryptoRandomBuffer


/***/ }),

/***/ "./node_modules/lib0/array.js":
/*!************************************!*\
  !*** ./node_modules/lib0/array.js ***!
  \************************************/
/*! exports provided: last, create, copy, appendTo, from, every, some, equalFlat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "last", function() { return last; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appendTo", function() { return appendTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "from", function() { return from; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "every", function() { return every; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "some", function() { return some; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equalFlat", function() { return equalFlat; });
/**
 * Utility module to work with Arrays.
 *
 * @module array
 */

/**
 * Return the last element of an array. The element must exist
 *
 * @template L
 * @param {Array<L>} arr
 * @return {L}
 */
const last = arr => arr[arr.length - 1]

/**
 * @template C
 * @return {Array<C>}
 */
const create = () => /** @type {Array<C>} */ ([])

/**
 * @template D
 * @param {Array<D>} a
 * @return {Array<D>}
 */
const copy = a => /** @type {Array<D>} */ (a.slice())

/**
 * Append elements from src to dest
 *
 * @template M
 * @param {Array<M>} dest
 * @param {Array<M>} src
 */
const appendTo = (dest, src) => {
  for (let i = 0; i < src.length; i++) {
    dest.push(src[i])
  }
}

/**
 * Transforms something array-like to an actual Array.
 *
 * @function
 * @template T
 * @param {ArrayLike<T>|Iterable<T>} arraylike
 * @return {T}
 */
const from = Array.from

/**
 * True iff condition holds on every element in the Array.
 *
 * @function
 * @template ITEM
 *
 * @param {Array<ITEM>} arr
 * @param {function(ITEM, number, Array<ITEM>):boolean} f
 * @return {boolean}
 */
const every = (arr, f) => arr.every(f)

/**
 * True iff condition holds on some element in the Array.
 *
 * @function
 * @template S
 * @param {Array<S>} arr
 * @param {function(S, number, Array<S>):boolean} f
 * @return {boolean}
 */
const some = (arr, f) => arr.some(f)

/**
 * @template ELEM
 *
 * @param {Array<ELEM>} a
 * @param {Array<ELEM>} b
 * @return {boolean}
 */
const equalFlat = (a, b) => a.length === b.length && every(a, (item, index) => item === b[index])


/***/ }),

/***/ "./node_modules/lib0/binary.js":
/*!*************************************!*\
  !*** ./node_modules/lib0/binary.js ***!
  \*************************************/
/*! exports provided: BIT1, BIT2, BIT3, BIT4, BIT5, BIT6, BIT7, BIT8, BIT9, BIT10, BIT11, BIT12, BIT13, BIT14, BIT15, BIT16, BIT17, BIT18, BIT19, BIT20, BIT21, BIT22, BIT23, BIT24, BIT25, BIT26, BIT27, BIT28, BIT29, BIT30, BIT31, BIT32, BITS0, BITS1, BITS2, BITS3, BITS4, BITS5, BITS6, BITS7, BITS8, BITS9, BITS10, BITS11, BITS12, BITS13, BITS14, BITS15, BITS16, BITS17, BITS18, BITS19, BITS20, BITS21, BITS22, BITS23, BITS24, BITS25, BITS26, BITS27, BITS28, BITS29, BITS30, BITS31, BITS32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT1", function() { return BIT1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT2", function() { return BIT2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT3", function() { return BIT3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT4", function() { return BIT4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT5", function() { return BIT5; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT6", function() { return BIT6; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT7", function() { return BIT7; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT8", function() { return BIT8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT9", function() { return BIT9; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT10", function() { return BIT10; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT11", function() { return BIT11; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT12", function() { return BIT12; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT13", function() { return BIT13; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT14", function() { return BIT14; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT15", function() { return BIT15; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT16", function() { return BIT16; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT17", function() { return BIT17; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT18", function() { return BIT18; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT19", function() { return BIT19; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT20", function() { return BIT20; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT21", function() { return BIT21; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT22", function() { return BIT22; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT23", function() { return BIT23; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT24", function() { return BIT24; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT25", function() { return BIT25; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT26", function() { return BIT26; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT27", function() { return BIT27; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT28", function() { return BIT28; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT29", function() { return BIT29; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT30", function() { return BIT30; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT31", function() { return BIT31; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIT32", function() { return BIT32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS0", function() { return BITS0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS1", function() { return BITS1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS2", function() { return BITS2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS3", function() { return BITS3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS4", function() { return BITS4; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS5", function() { return BITS5; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS6", function() { return BITS6; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS7", function() { return BITS7; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS8", function() { return BITS8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS9", function() { return BITS9; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS10", function() { return BITS10; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS11", function() { return BITS11; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS12", function() { return BITS12; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS13", function() { return BITS13; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS14", function() { return BITS14; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS15", function() { return BITS15; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS16", function() { return BITS16; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS17", function() { return BITS17; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS18", function() { return BITS18; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS19", function() { return BITS19; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS20", function() { return BITS20; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS21", function() { return BITS21; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS22", function() { return BITS22; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS23", function() { return BITS23; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS24", function() { return BITS24; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS25", function() { return BITS25; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS26", function() { return BITS26; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS27", function() { return BITS27; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS28", function() { return BITS28; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS29", function() { return BITS29; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS30", function() { return BITS30; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS31", function() { return BITS31; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BITS32", function() { return BITS32; });
/* eslint-env browser */

/**
 * Binary data constants.
 *
 * @module binary
 */

/**
 * n-th bit activated.
 *
 * @type {number}
 */
const BIT1 = 1
const BIT2 = 2
const BIT3 = 4
const BIT4 = 8
const BIT5 = 16
const BIT6 = 32
const BIT7 = 64
const BIT8 = 128
const BIT9 = 256
const BIT10 = 512
const BIT11 = 1024
const BIT12 = 2048
const BIT13 = 4096
const BIT14 = 8192
const BIT15 = 16384
const BIT16 = 32768
const BIT17 = 65536
const BIT18 = 1 << 17
const BIT19 = 1 << 18
const BIT20 = 1 << 19
const BIT21 = 1 << 20
const BIT22 = 1 << 21
const BIT23 = 1 << 22
const BIT24 = 1 << 23
const BIT25 = 1 << 24
const BIT26 = 1 << 25
const BIT27 = 1 << 26
const BIT28 = 1 << 27
const BIT29 = 1 << 28
const BIT30 = 1 << 29
const BIT31 = 1 << 30
const BIT32 = 1 << 31

/**
 * First n bits activated.
 *
 * @type {number}
 */
const BITS0 = 0
const BITS1 = 1
const BITS2 = 3
const BITS3 = 7
const BITS4 = 15
const BITS5 = 31
const BITS6 = 63
const BITS7 = 127
const BITS8 = 255
const BITS9 = 511
const BITS10 = 1023
const BITS11 = 2047
const BITS12 = 4095
const BITS13 = 8191
const BITS14 = 16383
const BITS15 = 32767
const BITS16 = 65535
const BITS17 = BIT18 - 1
const BITS18 = BIT19 - 1
const BITS19 = BIT20 - 1
const BITS20 = BIT21 - 1
const BITS21 = BIT22 - 1
const BITS22 = BIT23 - 1
const BITS23 = BIT24 - 1
const BITS24 = BIT25 - 1
const BITS25 = BIT26 - 1
const BITS26 = BIT27 - 1
const BITS27 = BIT28 - 1
const BITS28 = BIT29 - 1
const BITS29 = BIT30 - 1
const BITS30 = BIT31 - 1
const BITS31 = 0x7FFFFFFF
const BITS32 = 0xFFFFFFFF


/***/ }),

/***/ "./node_modules/lib0/broadcastchannel.js":
/*!***********************************************!*\
  !*** ./node_modules/lib0/broadcastchannel.js ***!
  \***********************************************/
/*! exports provided: subscribe, unsubscribe, publish */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribe", function() { return subscribe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unsubscribe", function() { return unsubscribe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "publish", function() { return publish; });
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.js */ "./node_modules/lib0/map.js");
/* harmony import */ var _buffer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buffer.js */ "./node_modules/lib0/buffer.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage.js */ "./node_modules/lib0/storage.js");
/* eslint-env browser */

/**
 * Helpers for cross-tab communication using broadcastchannel with LocalStorage fallback.
 *
 * ```js
 * // In browser window A:
 * broadcastchannel.subscribe('my events', data => console.log(data))
 * broadcastchannel.publish('my events', 'Hello world!') // => A: 'Hello world!' fires synchronously in same tab
 *
 * // In browser window B:
 * broadcastchannel.publish('my events', 'hello from tab B') // => A: 'hello from tab B'
 * ```
 *
 * @module broadcastchannel
 */

// @todo before next major: use Uint8Array instead as buffer object





/**
 * @typedef {Object} Channel
 * @property {Set<Function>} Channel.subs
 * @property {any} Channel.bc
 */

/**
 * @type {Map<string, Channel>}
 */
const channels = new Map()

class LocalStoragePolyfill {
  /**
   * @param {string} room
   */
  constructor (room) {
    this.room = room
    /**
     * @type {null|function({data:ArrayBuffer}):void}
     */
    this.onmessage = null
    addEventListener('storage', e => e.key === room && this.onmessage !== null && this.onmessage({ data: _buffer_js__WEBPACK_IMPORTED_MODULE_1__["fromBase64"](e.newValue || '') }))
  }

  /**
   * @param {ArrayBuffer} buf
   */
  postMessage (buf) {
    _storage_js__WEBPACK_IMPORTED_MODULE_2__["varStorage"].setItem(this.room, _buffer_js__WEBPACK_IMPORTED_MODULE_1__["toBase64"](_buffer_js__WEBPACK_IMPORTED_MODULE_1__["createUint8ArrayFromArrayBuffer"](buf)))
  }
}

// Use BroadcastChannel or Polyfill
const BC = typeof BroadcastChannel === 'undefined' ? LocalStoragePolyfill : BroadcastChannel

/**
 * @param {string} room
 * @return {Channel}
 */
const getChannel = room =>
  _map_js__WEBPACK_IMPORTED_MODULE_0__["setIfUndefined"](channels, room, () => {
    const subs = new Set()
    const bc = new BC(room)
    /**
     * @param {{data:ArrayBuffer}} e
     */
    bc.onmessage = e => subs.forEach(sub => sub(e.data))
    return {
      bc, subs
    }
  })

/**
 * Subscribe to global `publish` events.
 *
 * @function
 * @param {string} room
 * @param {function(any):any} f
 */
const subscribe = (room, f) => getChannel(room).subs.add(f)

/**
 * Unsubscribe from `publish` global events.
 *
 * @function
 * @param {string} room
 * @param {function(any):any} f
 */
const unsubscribe = (room, f) => getChannel(room).subs.delete(f)

/**
 * Publish data to all subscribers (including subscribers on this tab)
 *
 * @function
 * @param {string} room
 * @param {any} data
 */
const publish = (room, data) => {
  const c = getChannel(room)
  c.bc.postMessage(data)
  c.subs.forEach(sub => sub(data))
}


/***/ }),

/***/ "./node_modules/lib0/buffer.js":
/*!*************************************!*\
  !*** ./node_modules/lib0/buffer.js ***!
  \*************************************/
/*! exports provided: createUint8ArrayFromLen, createUint8ArrayViewFromArrayBuffer, createUint8ArrayFromArrayBuffer, toBase64, fromBase64, copyUint8Array */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUint8ArrayFromLen", function() { return createUint8ArrayFromLen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUint8ArrayViewFromArrayBuffer", function() { return createUint8ArrayViewFromArrayBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUint8ArrayFromArrayBuffer", function() { return createUint8ArrayFromArrayBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toBase64", function() { return toBase64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromBase64", function() { return fromBase64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copyUint8Array", function() { return copyUint8Array; });
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./string.js */ "./node_modules/lib0/string.js");
/* harmony import */ var _environment_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environment.js */ "./node_modules/lib0/environment.js");
/**
 * Utility functions to work with buffers (Uint8Array).
 *
 * @module buffer
 */




/**
 * @param {number} len
 */
const createUint8ArrayFromLen = len => new Uint8Array(len)

/**
 * Create Uint8Array with initial content from buffer
 *
 * @param {ArrayBuffer} buffer
 * @param {number} byteOffset
 * @param {number} length
 */
const createUint8ArrayViewFromArrayBuffer = (buffer, byteOffset, length) => new Uint8Array(buffer, byteOffset, length)

/**
 * Create Uint8Array with initial content from buffer
 *
 * @param {ArrayBuffer} buffer
 */
const createUint8ArrayFromArrayBuffer = buffer => new Uint8Array(buffer)

/* istanbul ignore next */
/**
 * @param {Uint8Array} bytes
 * @return {string}
 */
const toBase64Browser = bytes => {
  let s = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    s += _string_js__WEBPACK_IMPORTED_MODULE_0__["fromCharCode"](bytes[i])
  }
  // eslint-disable-next-line no-undef
  return btoa(s)
}

/**
 * @param {Uint8Array} bytes
 * @return {string}
 */
const toBase64Node = bytes => Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength).toString('base64')

/* istanbul ignore next */
/**
 * @param {string} s
 * @return {Uint8Array}
 */
const fromBase64Browser = s => {
  // eslint-disable-next-line no-undef
  const a = atob(s)
  const bytes = createUint8ArrayFromLen(a.length)
  for (let i = 0; i < a.length; i++) {
    bytes[i] = a.charCodeAt(i)
  }
  return bytes
}

/**
 * @param {string} s
 */
const fromBase64Node = s => new Uint8Array(Buffer.from(s, 'base64').buffer)

/* istanbul ignore next */
const toBase64 = _environment_js__WEBPACK_IMPORTED_MODULE_1__["isBrowser"] ? toBase64Browser : toBase64Node

/* istanbul ignore next */
const fromBase64 = _environment_js__WEBPACK_IMPORTED_MODULE_1__["isBrowser"] ? fromBase64Browser : fromBase64Node

/**
 * Copy the content of an Uint8Array view to a new ArrayBuffer.
 *
 * @param {Uint8Array} uint8Array
 * @return {Uint8Array}
 */
const copyUint8Array = uint8Array => {
  const newBuf = createUint8ArrayFromLen(uint8Array.byteLength)
  newBuf.set(uint8Array)
  return newBuf
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/lib0/conditions.js":
/*!*****************************************!*\
  !*** ./node_modules/lib0/conditions.js ***!
  \*****************************************/
/*! exports provided: undefinedToNull */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "undefinedToNull", function() { return undefinedToNull; });
/**
 * Often used conditions.
 *
 * @module conditions
 */

/**
 * @template T
 * @param {T|null|undefined} v
 * @return {T|null}
 */
/* istanbul ignore next */
const undefinedToNull = v => v === undefined ? null : v


/***/ }),

/***/ "./node_modules/lib0/decoding.js":
/*!***************************************!*\
  !*** ./node_modules/lib0/decoding.js ***!
  \***************************************/
/*! exports provided: Decoder, createDecoder, hasContent, clone, readUint8Array, readVarUint8Array, readTailAsUint8Array, skip8, readUint8, readUint16, readUint32, peekUint8, peekUint16, peekUint32, readVarUint, readVarInt, peekVarUint, peekVarInt, readVarString, peekVarString, readFromDataView, readFloat32, readFloat64, readBigInt64, readBigUint64, readAny */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Decoder", function() { return Decoder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDecoder", function() { return createDecoder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasContent", function() { return hasContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return clone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readUint8Array", function() { return readUint8Array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readVarUint8Array", function() { return readVarUint8Array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readTailAsUint8Array", function() { return readTailAsUint8Array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "skip8", function() { return skip8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readUint8", function() { return readUint8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readUint16", function() { return readUint16; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readUint32", function() { return readUint32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "peekUint8", function() { return peekUint8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "peekUint16", function() { return peekUint16; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "peekUint32", function() { return peekUint32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readVarUint", function() { return readVarUint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readVarInt", function() { return readVarInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "peekVarUint", function() { return peekVarUint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "peekVarInt", function() { return peekVarInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readVarString", function() { return readVarString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "peekVarString", function() { return peekVarString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readFromDataView", function() { return readFromDataView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readFloat32", function() { return readFloat32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readFloat64", function() { return readFloat64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readBigInt64", function() { return readBigInt64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readBigUint64", function() { return readBigUint64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readAny", function() { return readAny; });
/* harmony import */ var _buffer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buffer.js */ "./node_modules/lib0/buffer.js");
/* harmony import */ var _binary_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./binary.js */ "./node_modules/lib0/binary.js");
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./string.js */ "./node_modules/lib0/string.js");
/**
 * Efficient schema-less binary decoding with support for variable length encoding.
 *
 * Use [lib0/decoding] with [lib0/encoding]. Every encoding function has a corresponding decoding function.
 *
 * Encodes numbers in little-endian order (least to most significant byte order)
 * and is compatible with Golang's binary encoding (https://golang.org/pkg/encoding/binary/)
 * which is also used in Protocol Buffers.
 *
 * ```js
 * // encoding step
 * const encoder = new encoding.createEncoder()
 * encoding.writeVarUint(encoder, 256)
 * encoding.writeVarString(encoder, 'Hello world!')
 * const buf = encoding.toUint8Array(encoder)
 * ```
 *
 * ```js
 * // decoding step
 * const decoder = new decoding.createDecoder(buf)
 * decoding.readVarUint(decoder) // => 256
 * decoding.readVarString(decoder) // => 'Hello world!'
 * decoding.hasContent(decoder) // => false - all data is read
 * ```
 *
 * @module decoding
 */





/**
 * A Decoder handles the decoding of an Uint8Array.
 */
class Decoder {
  /**
   * @param {Uint8Array} uint8Array Binary data to decode
   */
  constructor (uint8Array) {
    /**
     * Decoding target.
     *
     * @type {Uint8Array}
     */
    this.arr = uint8Array
    /**
     * Current decoding position.
     *
     * @type {number}
     */
    this.pos = 0
  }
}

/**
 * @function
 * @param {Uint8Array} uint8Array
 * @return {Decoder}
 */
const createDecoder = uint8Array => new Decoder(uint8Array)

/**
 * @function
 * @param {Decoder} decoder
 * @return {boolean}
 */
const hasContent = decoder => decoder.pos !== decoder.arr.length

/**
 * Clone a decoder instance.
 * Optionally set a new position parameter.
 *
 * @function
 * @param {Decoder} decoder The decoder instance
 * @param {number} [newPos] Defaults to current position
 * @return {Decoder} A clone of `decoder`
 */
const clone = (decoder, newPos = decoder.pos) => {
  const _decoder = createDecoder(decoder.arr)
  _decoder.pos = newPos
  return _decoder
}

/**
 * Create an Uint8Array view of the next `len` bytes and advance the position by `len`.
 *
 * Important: The Uint8Array still points to the underlying ArrayBuffer. Make sure to discard the result as soon as possible to prevent any memory leaks.
 *            Use `buffer.copyUint8Array` to copy the result into a new Uint8Array.
 *
 * @function
 * @param {Decoder} decoder The decoder instance
 * @param {number} len The length of bytes to read
 * @return {Uint8Array}
 */
const readUint8Array = (decoder, len) => {
  const view = _buffer_js__WEBPACK_IMPORTED_MODULE_0__["createUint8ArrayViewFromArrayBuffer"](decoder.arr.buffer, decoder.pos + decoder.arr.byteOffset, len)
  decoder.pos += len
  return view
}

/**
 * Read variable length Uint8Array.
 *
 * Important: The Uint8Array still points to the underlying ArrayBuffer. Make sure to discard the result as soon as possible to prevent any memory leaks.
 *            Use `buffer.copyUint8Array` to copy the result into a new Uint8Array.
 *
 * @function
 * @param {Decoder} decoder
 * @return {Uint8Array}
 */
const readVarUint8Array = decoder => readUint8Array(decoder, readVarUint(decoder))

/**
 * Read the rest of the content as an ArrayBuffer
 * @function
 * @param {Decoder} decoder
 * @return {Uint8Array}
 */
const readTailAsUint8Array = decoder => readUint8Array(decoder, decoder.arr.length - decoder.pos)

/**
 * Skip one byte, jump to the next position.
 * @function
 * @param {Decoder} decoder The decoder instance
 * @return {number} The next position
 */
const skip8 = decoder => decoder.pos++

/**
 * Read one byte as unsigned integer.
 * @function
 * @param {Decoder} decoder The decoder instance
 * @return {number} Unsigned 8-bit integer
 */
const readUint8 = decoder => decoder.arr[decoder.pos++]

/**
 * Read 2 bytes as unsigned integer.
 *
 * @function
 * @param {Decoder} decoder
 * @return {number} An unsigned integer.
 */
const readUint16 = decoder => {
  const uint =
    decoder.arr[decoder.pos] +
    (decoder.arr[decoder.pos + 1] << 8)
  decoder.pos += 2
  return uint
}

/**
 * Read 4 bytes as unsigned integer.
 *
 * @function
 * @param {Decoder} decoder
 * @return {number} An unsigned integer.
 */
const readUint32 = decoder => {
  const uint =
    (decoder.arr[decoder.pos] +
    (decoder.arr[decoder.pos + 1] << 8) +
    (decoder.arr[decoder.pos + 2] << 16) +
    (decoder.arr[decoder.pos + 3] << 24)) >>> 0
  decoder.pos += 4
  return uint
}

/**
 * Look ahead without incrementing position.
 * to the next byte and read it as unsigned integer.
 *
 * @function
 * @param {Decoder} decoder
 * @return {number} An unsigned integer.
 */
const peekUint8 = decoder => decoder.arr[decoder.pos]

/**
 * Look ahead without incrementing position.
 * to the next byte and read it as unsigned integer.
 *
 * @function
 * @param {Decoder} decoder
 * @return {number} An unsigned integer.
 */
const peekUint16 = decoder =>
  decoder.arr[decoder.pos] +
  (decoder.arr[decoder.pos + 1] << 8)

/**
 * Look ahead without incrementing position.
 * to the next byte and read it as unsigned integer.
 *
 * @function
 * @param {Decoder} decoder
 * @return {number} An unsigned integer.
 */
const peekUint32 = decoder => (
  decoder.arr[decoder.pos] +
  (decoder.arr[decoder.pos + 1] << 8) +
  (decoder.arr[decoder.pos + 2] << 16) +
  (decoder.arr[decoder.pos + 3] << 24)
) >>> 0

/**
 * Read unsigned integer (32bit) with variable length.
 * 1/8th of the storage is used as encoding overhead.
 *  * numbers < 2^7 is stored in one bytlength
 *  * numbers < 2^14 is stored in two bylength
 *
 * @function
 * @param {Decoder} decoder
 * @return {number} An unsigned integer.length
 */
const readVarUint = decoder => {
  let num = 0
  let len = 0
  while (true) {
    const r = decoder.arr[decoder.pos++]
    num = num | ((r & _binary_js__WEBPACK_IMPORTED_MODULE_1__["BITS7"]) << len)
    len += 7
    if (r < _binary_js__WEBPACK_IMPORTED_MODULE_1__["BIT8"]) {
      return num >>> 0 // return unsigned number!
    }
    /* istanbul ignore if */
    if (len > 35) {
      throw new Error('Integer out of range!')
    }
  }
}

/**
 * Read signed integer (32bit) with variable length.
 * 1/8th of the storage is used as encoding overhead.
 *  * numbers < 2^7 is stored in one bytlength
 *  * numbers < 2^14 is stored in two bylength
 *
 * @function
 * @param {Decoder} decoder
 * @return {number} An unsigned integer.length
 */
const readVarInt = decoder => {
  let r = decoder.arr[decoder.pos++]
  let num = r & _binary_js__WEBPACK_IMPORTED_MODULE_1__["BITS6"]
  let len = 6
  const sign = (r & _binary_js__WEBPACK_IMPORTED_MODULE_1__["BIT7"]) > 0 ? -1 : 1
  if ((r & _binary_js__WEBPACK_IMPORTED_MODULE_1__["BIT8"]) === 0) {
    // don't continue reading
    return sign * num
  }
  while (true) {
    r = decoder.arr[decoder.pos++]
    num = num | ((r & _binary_js__WEBPACK_IMPORTED_MODULE_1__["BITS7"]) << len)
    len += 7
    if (r < _binary_js__WEBPACK_IMPORTED_MODULE_1__["BIT8"]) {
      return sign * num
    }
    /* istanbul ignore if */
    if (len > 41) {
      throw new Error('Integer out of range!')
    }
  }
}

/**
 * Look ahead and read varUint without incrementing position
 *
 * @function
 * @param {Decoder} decoder
 * @return {number}
 */
const peekVarUint = decoder => {
  const pos = decoder.pos
  const s = readVarUint(decoder)
  decoder.pos = pos
  return s
}

/**
 * Look ahead and read varUint without incrementing position
 *
 * @function
 * @param {Decoder} decoder
 * @return {number}
 */
const peekVarInt = decoder => {
  const pos = decoder.pos
  const s = readVarInt(decoder)
  decoder.pos = pos
  return s
}

/**
 * Read string of variable length
 * * varUint is used to store the length of the string
 *
 * Transforming utf8 to a string is pretty expensive. The code performs 10x better
 * when String.fromCodePoint is fed with all characters as arguments.
 * But most environments have a maximum number of arguments per functions.
 * For effiency reasons we apply a maximum of 10000 characters at once.
 *
 * @function
 * @param {Decoder} decoder
 * @return {String} The read String.
 */
const readVarString = decoder =>
  _string_js__WEBPACK_IMPORTED_MODULE_2__["decodeUtf8"](readVarUint8Array(decoder))

/**
 * Look ahead and read varString without incrementing position
 *
 * @function
 * @param {Decoder} decoder
 * @return {string}
 */
const peekVarString = decoder => {
  const pos = decoder.pos
  const s = readVarString(decoder)
  decoder.pos = pos
  return s
}

/**
 * @param {Decoder} decoder
 * @param {number} len
 * @return {DataView}
 */
const readFromDataView = (decoder, len) => {
  const dv = new DataView(decoder.arr.buffer, decoder.arr.byteOffset + decoder.pos, len)
  decoder.pos += len
  return dv
}

/**
 * @param {Decoder} decoder
 */
const readFloat32 = decoder => readFromDataView(decoder, 4).getFloat32(0)

/**
 * @param {Decoder} decoder
 */
const readFloat64 = decoder => readFromDataView(decoder, 8).getFloat64(0)

/**
 * @param {Decoder} decoder
 */
const readBigInt64 = decoder => /** @type {any} */ (readFromDataView(decoder, 8)).getBigInt64(0)

/**
 * @param {Decoder} decoder
 */
const readBigUint64 = decoder => /** @type {any} */ (readFromDataView(decoder, 8)).getBigUint64(0)

/**
 * @type {Array<function(Decoder):any>}
 */
const readAnyLookupTable = [
  decoder => undefined, // CASE 127: undefined
  decoder => null, // CASE 126: null
  readVarInt, // CASE 125: integer
  readFloat32, // CASE 124: float32
  readFloat64, // CASE 123: float64
  readBigInt64, // CASE 122: bigint
  decoder => false, // CASE 121: boolean (false)
  decoder => true, // CASE 120: boolean (true)
  readVarString, // CASE 119: string
  decoder => { // CASE 118: object<string,any>
    const len = readVarUint(decoder)
    /**
     * @type {Object<string,any>}
     */
    const obj = {}
    for (let i = 0; i < len; i++) {
      const key = readVarString(decoder)
      obj[key] = readAny(decoder)
    }
    return obj
  },
  decoder => { // CASE 117: array<any>
    const len = readVarUint(decoder)
    const arr = []
    for (let i = 0; i < len; i++) {
      arr.push(readAny(decoder))
    }
    return arr
  },
  readVarUint8Array // CASE 116: Uint8Array
]

/**
 * @param {Decoder} decoder
 */
const readAny = decoder => readAnyLookupTable[127 - readUint8(decoder)](decoder)


/***/ }),

/***/ "./node_modules/lib0/dom.js":
/*!**********************************!*\
  !*** ./node_modules/lib0/dom.js ***!
  \**********************************/
/*! exports provided: doc, createElement, createDocumentFragment, createTextNode, domParser, emitCustomEvent, setAttributes, setAttributesMap, fragment, append, remove, addEventListener, removeEventListener, addEventListeners, removeEventListeners, element, canvas, text, pairToStyleString, pairsToStyleString, mapToStyleString, querySelector, querySelectorAll, getElementById, parseFragment, parseElement, replaceWith, insertBefore, appendChild, ELEMENT_NODE, TEXT_NODE, CDATA_SECTION_NODE, COMMENT_NODE, DOCUMENT_NODE, DOCUMENT_TYPE_NODE, DOCUMENT_FRAGMENT_NODE, checkNodeType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "doc", function() { return doc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDocumentFragment", function() { return createDocumentFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTextNode", function() { return createTextNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "domParser", function() { return domParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emitCustomEvent", function() { return emitCustomEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAttributes", function() { return setAttributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAttributesMap", function() { return setAttributesMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fragment", function() { return fragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "append", function() { return append; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addEventListener", function() { return addEventListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeEventListener", function() { return removeEventListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addEventListeners", function() { return addEventListeners; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeEventListeners", function() { return removeEventListeners; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "element", function() { return element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvas", function() { return canvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "text", function() { return text; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pairToStyleString", function() { return pairToStyleString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pairsToStyleString", function() { return pairsToStyleString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapToStyleString", function() { return mapToStyleString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "querySelector", function() { return querySelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "querySelectorAll", function() { return querySelectorAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getElementById", function() { return getElementById; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseFragment", function() { return parseFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseElement", function() { return parseElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replaceWith", function() { return replaceWith; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertBefore", function() { return insertBefore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appendChild", function() { return appendChild; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ELEMENT_NODE", function() { return ELEMENT_NODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TEXT_NODE", function() { return TEXT_NODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CDATA_SECTION_NODE", function() { return CDATA_SECTION_NODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMMENT_NODE", function() { return COMMENT_NODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCUMENT_NODE", function() { return DOCUMENT_NODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCUMENT_TYPE_NODE", function() { return DOCUMENT_TYPE_NODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOCUMENT_FRAGMENT_NODE", function() { return DOCUMENT_FRAGMENT_NODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkNodeType", function() { return checkNodeType; });
/* harmony import */ var _pair_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pair.js */ "./node_modules/lib0/pair.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map.js */ "./node_modules/lib0/map.js");
/* eslint-env browser */

/**
 * Utility module to work with the DOM.
 *
 * @module dom
 */




/* istanbul ignore next */
/**
 * @type {Document}
 */
const doc = /** @type {Document} */ (typeof document !== 'undefined' ? document : {})

/**
 * @param {string} name
 * @return {HTMLElement}
 */
/* istanbul ignore next */
const createElement = name => doc.createElement(name)

/**
 * @return {DocumentFragment}
 */
/* istanbul ignore next */
const createDocumentFragment = () => doc.createDocumentFragment()

/**
 * @param {string} text
 * @return {Text}
 */
/* istanbul ignore next */
const createTextNode = text => doc.createTextNode(text)

/* istanbul ignore next */
const domParser = /** @type {DOMParser} */ (typeof DOMParser !== 'undefined' ? new DOMParser() : null)

/**
 * @param {HTMLElement} el
 * @param {string} name
 * @param {Object} opts
 */
/* istanbul ignore next */
const emitCustomEvent = (el, name, opts) => el.dispatchEvent(new CustomEvent(name, opts))

/**
 * @param {Element} el
 * @param {Array<pair.Pair<string,string|boolean>>} attrs Array of key-value pairs
 * @return {Element}
 */
/* istanbul ignore next */
const setAttributes = (el, attrs) => {
  _pair_js__WEBPACK_IMPORTED_MODULE_0__["forEach"](attrs, (key, value) => {
    if (value === false) {
      el.removeAttribute(key)
    } else if (value === true) {
      el.setAttribute(key, '')
    } else {
      // @ts-ignore
      el.setAttribute(key, value)
    }
  })
  return el
}

/**
 * @param {Element} el
 * @param {Map<string, string>} attrs Array of key-value pairs
 * @return {Element}
 */
/* istanbul ignore next */
const setAttributesMap = (el, attrs) => {
  _map_js__WEBPACK_IMPORTED_MODULE_1__["map"](attrs, (value, key) => el.setAttribute(key, value))
  return el
}

/**
 * @param {Array<Node>|HTMLCollection} children
 * @return {DocumentFragment}
 */
/* istanbul ignore next */
const fragment = children => {
  const fragment = createDocumentFragment()
  for (let i = 0; i < children.length; i++) {
    fragment.appendChild(children[i])
  }
  return fragment
}

/**
 * @param {Element} parent
 * @param {Array<Node>} nodes
 * @return {Element}
 */
/* istanbul ignore next */
const append = (parent, nodes) => {
  parent.appendChild(fragment(nodes))
  return parent
}

/**
 * @param {HTMLElement} el
 */
/* istanbul ignore next */
const remove = el => el.remove()

/**
 * @param {EventTarget} el
 * @param {string} name
 * @param {EventListener} f
 */
/* istanbul ignore next */
const addEventListener = (el, name, f) => el.addEventListener(name, f)

/**
 * @param {EventTarget} el
 * @param {string} name
 * @param {EventListener} f
 */
/* istanbul ignore next */
const removeEventListener = (el, name, f) => el.removeEventListener(name, f)

/**
 * @param {Node} node
 * @param {Array<pair.Pair<string,EventListener>>} listeners
 * @return {Node}
 */
/* istanbul ignore next */
const addEventListeners = (node, listeners) => {
  _pair_js__WEBPACK_IMPORTED_MODULE_0__["forEach"](listeners, (name, f) => addEventListener(node, name, f))
  return node
}

/**
 * @param {Node} node
 * @param {Array<pair.Pair<string,EventListener>>} listeners
 * @return {Node}
 */
/* istanbul ignore next */
const removeEventListeners = (node, listeners) => {
  _pair_js__WEBPACK_IMPORTED_MODULE_0__["forEach"](listeners, (name, f) => removeEventListener(node, name, f))
  return node
}

/**
 * @param {string} name
 * @param {Array<pair.Pair<string,string>|pair.Pair<string,boolean>>} attrs Array of key-value pairs
 * @param {Array<Node>} children
 * @return {Element}
 */
/* istanbul ignore next */
const element = (name, attrs = [], children = []) =>
  append(setAttributes(createElement(name), attrs), children)

/**
 * @param {number} width
 * @param {number} height
 */
/* istanbul ignore next */
const canvas = (width, height) => {
  const c = /** @type {HTMLCanvasElement} */ (createElement('canvas'))
  c.height = height
  c.width = width
  return c
}

/**
 * @param {string} t
 * @return {Text}
 */
/* istanbul ignore next */
const text = createTextNode

/**
 * @param {pair.Pair<string,string>} pair
 */
/* istanbul ignore next */
const pairToStyleString = pair => `${pair.left}:${pair.right};`

/**
 * @param {Array<pair.Pair<string,string>>} pairs
 * @return {string}
 */
/* istanbul ignore next */
const pairsToStyleString = pairs => pairs.map(pairToStyleString).join('')

/**
 * @param {Map<string,string>} m
 * @return {string}
 */
/* istanbul ignore next */
const mapToStyleString = m => _map_js__WEBPACK_IMPORTED_MODULE_1__["map"](m, (value, key) => `${key}:${value};`).join('')

/**
 * @todo should always query on a dom element
 *
 * @param {HTMLElement|ShadowRoot} el
 * @param {string} query
 * @return {HTMLElement | null}
 */
/* istanbul ignore next */
const querySelector = (el, query) => el.querySelector(query)

/**
 * @param {HTMLElement|ShadowRoot} el
 * @param {string} query
 * @return {NodeListOf<HTMLElement>}
 */
/* istanbul ignore next */
const querySelectorAll = (el, query) => el.querySelectorAll(query)

/**
 * @param {string} id
 * @return {HTMLElement}
 */
/* istanbul ignore next */
const getElementById = id => /** @type {HTMLElement} */ (doc.getElementById(id))

/**
 * @param {string} html
 * @return {HTMLElement}
 */
/* istanbul ignore next */
const _parse = html => domParser.parseFromString(`<html><body>${html}</body></html>`, 'text/html').body

/**
 * @param {string} html
 * @return {DocumentFragment}
 */
/* istanbul ignore next */
const parseFragment = html => fragment(/** @type {any} */ (_parse(html).childNodes))

/**
 * @param {string} html
 * @return {HTMLElement}
 */
/* istanbul ignore next */
const parseElement = html => /** @type HTMLElement */ (_parse(html).firstElementChild)

/**
 * @param {HTMLElement} oldEl
 * @param {HTMLElement|DocumentFragment} newEl
 */
/* istanbul ignore next */
const replaceWith = (oldEl, newEl) => oldEl.replaceWith(newEl)

/**
 * @param {HTMLElement} parent
 * @param {HTMLElement} el
 * @param {Node|null} ref
 * @return {HTMLElement}
 */
/* istanbul ignore next */
const insertBefore = (parent, el, ref) => parent.insertBefore(el, ref)

/**
 * @param {HTMLElement} parent
 * @param {HTMLElement|DocumentFragment} child
 * @return {HTMLElement|DocumentFragment}
 */
/* istanbul ignore next */
const appendChild = (parent, child) => parent.appendChild(child)

const ELEMENT_NODE = doc.ELEMENT_NODE
const TEXT_NODE = doc.TEXT_NODE
const CDATA_SECTION_NODE = doc.CDATA_SECTION_NODE
const COMMENT_NODE = doc.COMMENT_NODE
const DOCUMENT_NODE = doc.DOCUMENT_NODE
const DOCUMENT_TYPE_NODE = doc.DOCUMENT_TYPE_NODE
const DOCUMENT_FRAGMENT_NODE = doc.DOCUMENT_FRAGMENT_NODE

/**
 * @param {any} node
 * @param {number} type
 */
const checkNodeType = (node, type) => node.nodeType === type


/***/ }),

/***/ "./node_modules/lib0/encoding.js":
/*!***************************************!*\
  !*** ./node_modules/lib0/encoding.js ***!
  \***************************************/
/*! exports provided: Encoder, createEncoder, length, toUint8Array, write, set, writeUint8, setUint8, writeUint16, setUint16, writeUint32, setUint32, writeVarUint, writeVarInt, writeVarString, writeBinaryEncoder, writeUint8Array, writeVarUint8Array, writeOnDataView, writeFloat32, writeFloat64, writeBigInt64, writeBigUint64, writeAny */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Encoder", function() { return Encoder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEncoder", function() { return createEncoder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toUint8Array", function() { return toUint8Array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "write", function() { return write; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeUint8", function() { return writeUint8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setUint8", function() { return setUint8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeUint16", function() { return writeUint16; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setUint16", function() { return setUint16; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeUint32", function() { return writeUint32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setUint32", function() { return setUint32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeVarUint", function() { return writeVarUint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeVarInt", function() { return writeVarInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeVarString", function() { return writeVarString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeBinaryEncoder", function() { return writeBinaryEncoder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeUint8Array", function() { return writeUint8Array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeVarUint8Array", function() { return writeVarUint8Array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeOnDataView", function() { return writeOnDataView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeFloat32", function() { return writeFloat32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeFloat64", function() { return writeFloat64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeBigInt64", function() { return writeBigInt64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeBigUint64", function() { return writeBigUint64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeAny", function() { return writeAny; });
/* harmony import */ var _buffer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buffer.js */ "./node_modules/lib0/buffer.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math.js */ "./node_modules/lib0/math.js");
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./number.js */ "./node_modules/lib0/number.js");
/* harmony import */ var _binary_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./binary.js */ "./node_modules/lib0/binary.js");
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./string.js */ "./node_modules/lib0/string.js");
/**
 * Efficient schema-less binary encoding with support for variable length encoding.
 *
 * Use [lib0/encoding] with [lib0/decoding]. Every encoding function has a corresponding decoding function.
 *
 * Encodes numbers in little-endian order (least to most significant byte order)
 * and is compatible with Golang's binary encoding (https://golang.org/pkg/encoding/binary/)
 * which is also used in Protocol Buffers.
 *
 * ```js
 * // encoding step
 * const encoder = new encoding.createEncoder()
 * encoding.writeVarUint(encoder, 256)
 * encoding.writeVarString(encoder, 'Hello world!')
 * const buf = encoding.toUint8Array(encoder)
 * ```
 *
 * ```js
 * // decoding step
 * const decoder = new decoding.createDecoder(buf)
 * decoding.readVarUint(decoder) // => 256
 * decoding.readVarString(decoder) // => 'Hello world!'
 * decoding.hasContent(decoder) // => false - all data is read
 * ```
 *
 * @module encoding
 */







/**
 * A BinaryEncoder handles the encoding to an Uint8Array.
 */
class Encoder {
  constructor () {
    this.cpos = 0
    this.cbuf = new Uint8Array(100)
    /**
     * @type {Array<Uint8Array>}
     */
    this.bufs = []
  }
}

/**
 * @function
 * @return {Encoder}
 */
const createEncoder = () => new Encoder()

/**
 * The current length of the encoded data.
 *
 * @function
 * @param {Encoder} encoder
 * @return {number}
 */
const length = encoder => {
  let len = encoder.cpos
  for (let i = 0; i < encoder.bufs.length; i++) {
    len += encoder.bufs[i].length
  }
  return len
}

/**
 * Transform to Uint8Array.
 *
 * @function
 * @param {Encoder} encoder
 * @return {Uint8Array} The created ArrayBuffer.
 */
const toUint8Array = encoder => {
  const uint8arr = new Uint8Array(length(encoder))
  let curPos = 0
  for (let i = 0; i < encoder.bufs.length; i++) {
    const d = encoder.bufs[i]
    uint8arr.set(d, curPos)
    curPos += d.length
  }
  uint8arr.set(_buffer_js__WEBPACK_IMPORTED_MODULE_0__["createUint8ArrayViewFromArrayBuffer"](encoder.cbuf.buffer, 0, encoder.cpos), curPos)
  return uint8arr
}

/**
 * Verify that it is possible to write `len` bytes wtihout checking. If
 * necessary, a new Buffer with the required length is attached.
 *
 * @param {Encoder} encoder
 * @param {number} len
 */
const verifyLen = (encoder, len) => {
  const bufferLen = encoder.cbuf.length
  if (bufferLen - encoder.cpos < len) {
    encoder.bufs.push(_buffer_js__WEBPACK_IMPORTED_MODULE_0__["createUint8ArrayViewFromArrayBuffer"](encoder.cbuf.buffer, 0, encoder.cpos))
    encoder.cbuf = new Uint8Array(_math_js__WEBPACK_IMPORTED_MODULE_1__["max"](bufferLen, len) * 2)
    encoder.cpos = 0
  }
}

/**
 * Write one byte to the encoder.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The byte that is to be encoded.
 */
const write = (encoder, num) => {
  const bufferLen = encoder.cbuf.length
  if (encoder.cpos === bufferLen) {
    encoder.bufs.push(encoder.cbuf)
    encoder.cbuf = new Uint8Array(bufferLen * 2)
    encoder.cpos = 0
  }
  encoder.cbuf[encoder.cpos++] = num
}

/**
 * Write one byte at a specific position.
 * Position must already be written (i.e. encoder.length > pos)
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} pos Position to which to write data
 * @param {number} num Unsigned 8-bit integer
 */
const set = (encoder, pos, num) => {
  let buffer = null
  // iterate all buffers and adjust position
  for (let i = 0; i < encoder.bufs.length && buffer === null; i++) {
    const b = encoder.bufs[i]
    if (pos < b.length) {
      buffer = b // found buffer
    } else {
      pos -= b.length
    }
  }
  if (buffer === null) {
    // use current buffer
    buffer = encoder.cbuf
  }
  buffer[pos] = num
}

/**
 * Write one byte as an unsigned integer.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The number that is to be encoded.
 */
const writeUint8 = write

/**
 * Write one byte as an unsigned Integer at a specific location.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} pos The location where the data will be written.
 * @param {number} num The number that is to be encoded.
 */
const setUint8 = set

/**
 * Write two bytes as an unsigned integer.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The number that is to be encoded.
 */
const writeUint16 = (encoder, num) => {
  write(encoder, num & _binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS8"])
  write(encoder, (num >>> 8) & _binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS8"])
}
/**
 * Write two bytes as an unsigned integer at a specific location.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} pos The location where the data will be written.
 * @param {number} num The number that is to be encoded.
 */
const setUint16 = (encoder, pos, num) => {
  set(encoder, pos, num & _binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS8"])
  set(encoder, pos + 1, (num >>> 8) & _binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS8"])
}

/**
 * Write two bytes as an unsigned integer
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The number that is to be encoded.
 */
const writeUint32 = (encoder, num) => {
  for (let i = 0; i < 4; i++) {
    write(encoder, num & _binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS8"])
    num >>>= 8
  }
}

/**
 * Write two bytes as an unsigned integer at a specific location.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} pos The location where the data will be written.
 * @param {number} num The number that is to be encoded.
 */
const setUint32 = (encoder, pos, num) => {
  for (let i = 0; i < 4; i++) {
    set(encoder, pos + i, num & _binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS8"])
    num >>>= 8
  }
}

/**
 * Write a variable length unsigned integer.
 *
 * Encodes integers in the range from [0, 4294967295] / [0, 0xffffffff]. (max 32 bit unsigned integer)
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The number that is to be encoded.
 */
const writeVarUint = (encoder, num) => {
  while (num > _binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS7"]) {
    write(encoder, _binary_js__WEBPACK_IMPORTED_MODULE_3__["BIT8"] | (_binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS7"] & num))
    num >>>= 7
  }
  write(encoder, _binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS7"] & num)
}

/**
 * Write a variable length integer.
 *
 * Encodes integers in the range from [-2147483648, -2147483647].
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The number that is to be encoded.
 */
const writeVarInt = (encoder, num) => {
  let isNegative = false
  if (num < 0) {
    num = -num
    isNegative = true
  }
  //             |- whether to continue reading         |- whether is negative     |- number
  write(encoder, (num > _binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS6"] ? _binary_js__WEBPACK_IMPORTED_MODULE_3__["BIT8"] : 0) | (isNegative ? _binary_js__WEBPACK_IMPORTED_MODULE_3__["BIT7"] : 0) | (_binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS6"] & num))
  num >>>= 6
  // We don't need to consider the case of num === 0 so we can use a different
  // pattern here than above.
  while (num > 0) {
    write(encoder, (num > _binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS7"] ? _binary_js__WEBPACK_IMPORTED_MODULE_3__["BIT8"] : 0) | (_binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS7"] & num))
    num >>>= 7
  }
}

/**
 * Write a variable length string.
 *
 * @function
 * @param {Encoder} encoder
 * @param {String} str The string that is to be encoded.
 */
const writeVarString = (encoder, str) =>
  writeVarUint8Array(encoder, _string_js__WEBPACK_IMPORTED_MODULE_4__["encodeUtf8"](str))

/**
 * Write the content of another Encoder.
 *
 * TODO: can be improved!
 *
 * @function
 * @param {Encoder} encoder The enUint8Arr
 * @param {Encoder} append The BinaryEncoder to be written.
 */
const writeBinaryEncoder = (encoder, append) => writeUint8Array(encoder, toUint8Array(append))

/**
 * Append fixed-length Uint8Array to the encoder.
 *
 * @function
 * @param {Encoder} encoder
 * @param {Uint8Array} uint8Array
 */
const writeUint8Array = (encoder, uint8Array) => {
  const bufferLen = encoder.cbuf.length
  const cpos = encoder.cpos
  const leftCopyLen = _math_js__WEBPACK_IMPORTED_MODULE_1__["min"](bufferLen - cpos, uint8Array.length)
  const rightCopyLen = uint8Array.length - leftCopyLen
  encoder.cbuf.set(uint8Array.subarray(0, leftCopyLen), cpos)
  encoder.cpos += leftCopyLen
  if (rightCopyLen > 0) {
    // Still something to write, write right half..
    // Append new buffer
    encoder.bufs.push(encoder.cbuf)
    // must have at least size of remaining buffer
    encoder.cbuf = new Uint8Array(_math_js__WEBPACK_IMPORTED_MODULE_1__["max"](bufferLen * 2, rightCopyLen))
    // copy array
    encoder.cbuf.set(uint8Array.subarray(leftCopyLen))
    encoder.cpos = rightCopyLen
  }
}

/**
 * Append an Uint8Array to Encoder.
 *
 * @function
 * @param {Encoder} encoder
 * @param {Uint8Array} uint8Array
 */
const writeVarUint8Array = (encoder, uint8Array) => {
  writeVarUint(encoder, uint8Array.byteLength)
  writeUint8Array(encoder, uint8Array)
}

/**
 * Create an DataView of the next `len` bytes. Use it to write data after
 * calling this function.
 *
 * ```js
 * // write float32 using DataView
 * const dv = writeOnDataView(encoder, 4)
 * dv.setFloat32(0, 1.1)
 * // read float32 using DataView
 * const dv = readFromDataView(encoder, 4)
 * dv.getFloat32(0) // => 1.100000023841858 (leaving it to the reader to find out why this is the correct result)
 * ```
 *
 * @param {Encoder} encoder
 * @param {number} len
 * @return {DataView}
 */
const writeOnDataView = (encoder, len) => {
  verifyLen(encoder, len)
  const dview = new DataView(encoder.cbuf.buffer, encoder.cpos, len)
  encoder.cpos += len
  return dview
}

/**
 * @param {Encoder} encoder
 * @param {number} num
 */
const writeFloat32 = (encoder, num) => writeOnDataView(encoder, 4).setFloat32(0, num)

/**
 * @param {Encoder} encoder
 * @param {number} num
 */
const writeFloat64 = (encoder, num) => writeOnDataView(encoder, 8).setFloat64(0, num)

/**
 * @param {Encoder} encoder
 * @param {bigint} num
 */
const writeBigInt64 = (encoder, num) => /** @type {any} */ (writeOnDataView(encoder, 8)).setBigInt64(0, num)

/**
 * @param {Encoder} encoder
 * @param {bigint} num
 */
const writeBigUint64 = (encoder, num) => /** @type {any} */ (writeOnDataView(encoder, 8)).setBigUint64(0, num)

const floatTestBed = new DataView(new ArrayBuffer(4))
/**
 * Check if a number can be encoded as a 32 bit float.
 *
 * @param {number} num
 * @return {boolean}
 */
const isFloat32 = num => {
  floatTestBed.setFloat32(0, num)
  return floatTestBed.getFloat32(0) === num
}

/**
 * Encode data with efficient binary format.
 *
 * Differences to JSON:
 * • Transforms data to a binary format (not to a string)
 * • Encodes undefined, NaN, and ArrayBuffer (these can't be represented in JSON)
 * • Numbers are efficiently encoded either as a variable length integer, as a
 *   32 bit float, as a 64 bit float, or as a 64 bit bigint.
 *
 * Encoding table:
 *
 * | Data Type           | Prefix   | Encoding Method    | Comment |
 * | ------------------- | -------- | ------------------ | ------- |
 * | undefined           | 127      |                    | Functions, symbol, and everything that cannot be identified is encoded as undefined |
 * | null                | 126      |                    | |
 * | integer             | 125      | writeVarInt        | Only encodes 32 bit signed integers |
 * | float32             | 124      | writeFloat32       | |
 * | float64             | 123      | writeFloat64       | |
 * | bigint              | 122      | writeBigInt64      | |
 * | boolean (false)     | 121      |                    | True and false are different data types so we save the following byte |
 * | boolean (true)      | 120      |                    | - 0b01111000 so the last bit determines whether true or false |
 * | string              | 119      | writeVarString     | |
 * | object<string,any>  | 118      | custom             | Writes {length} then {length} key-value pairs |
 * | array<any>          | 117      | custom             | Writes {length} then {length} json values |
 * | Uint8Array          | 116      | writeVarUint8Array | We use Uint8Array for any kind of binary data |
 *
 * Reasons for the decreasing prefix:
 * We need the first bit for extendability (later we may want to encode the
 * prefix with writeVarUint). The remaining 7 bits are divided as follows:
 * [0-30]   the beginning of the data range is used for custom purposes
 *          (defined by the function that uses this library)
 * [31-127] the end of the data range is used for data encoding by
 *          lib0/encoding.js
 *
 * @param {Encoder} encoder
 * @param {undefined|null|number|bigint|boolean|string|Object<string,any>|Array<any>|Uint8Array} data
 */
const writeAny = (encoder, data) => {
  switch (typeof data) {
    case 'string':
      // TYPE 119: STRING
      write(encoder, 119)
      writeVarString(encoder, data)
      break
    case 'number':
      if (_number_js__WEBPACK_IMPORTED_MODULE_2__["isInteger"](data) && data <= _binary_js__WEBPACK_IMPORTED_MODULE_3__["BITS31"]) {
        // TYPE 125: INTEGER
        write(encoder, 125)
        writeVarInt(encoder, data)
      } else if (isFloat32(data)) {
        // TYPE 124: FLOAT32
        write(encoder, 124)
        writeFloat32(encoder, data)
      } else {
        // TYPE 123: FLOAT64
        write(encoder, 123)
        writeFloat64(encoder, data)
      }
      break
    case 'bigint':
      // TYPE 122: BigInt
      write(encoder, 122)
      writeBigInt64(encoder, data)
      break
    case 'object':
      if (data === null) {
        // TYPE 126: null
        write(encoder, 126)
      } else if (data instanceof Array) {
        // TYPE 117: Array
        write(encoder, 117)
        writeVarUint(encoder, data.length)
        for (let i = 0; i < data.length; i++) {
          writeAny(encoder, data[i])
        }
      } else if (data instanceof Uint8Array) {
        // TYPE 116: ArrayBuffer
        write(encoder, 116)
        writeVarUint8Array(encoder, data)
      } else {
        // TYPE 118: Object
        write(encoder, 118)
        const keys = Object.keys(data)
        writeVarUint(encoder, keys.length)
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i]
          writeVarString(encoder, key)
          writeAny(encoder, data[key])
        }
      }
      break
    case 'boolean':
      // TYPE 120/121: boolean (true/false)
      write(encoder, data ? 120 : 121)
      break
    default:
      // TYPE 127: undefined
      write(encoder, 127)
  }
}


/***/ }),

/***/ "./node_modules/lib0/environment.js":
/*!******************************************!*\
  !*** ./node_modules/lib0/environment.js ***!
  \******************************************/
/*! exports provided: isNode, isBrowser, isMac, hasParam, getParam, getVariable, getConf, hasConf, production */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNode", function() { return isNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBrowser", function() { return isBrowser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMac", function() { return isMac; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasParam", function() { return hasParam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParam", function() { return getParam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVariable", function() { return getVariable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConf", function() { return getConf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasConf", function() { return hasConf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "production", function() { return production; });
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.js */ "./node_modules/lib0/map.js");
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./string.js */ "./node_modules/lib0/string.js");
/* harmony import */ var _conditions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./conditions.js */ "./node_modules/lib0/conditions.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storage.js */ "./node_modules/lib0/storage.js");
/**
 * Isomorphic module to work access the environment (query params, env variables).
 *
 * @module map
 */






/* istanbul ignore next */
// @ts-ignore
const isNode = typeof process !== 'undefined' && process.release && /node|io\.js/.test(process.release.name)
/* istanbul ignore next */
const isBrowser = typeof window !== 'undefined' && !isNode
/* istanbul ignore next */
const isMac = typeof navigator !== 'undefined' ? /Mac/.test(navigator.platform) : false

/**
 * @type {Map<string,string>}
 */
let params
const args = []

/* istanbul ignore next */
const computeParams = () => {
  if (params === undefined) {
    if (isNode) {
      params = _map_js__WEBPACK_IMPORTED_MODULE_0__["create"]()
      const pargs = process.argv
      let currParamName = null
      /* istanbul ignore next */
      for (let i = 0; i < pargs.length; i++) {
        const parg = pargs[i]
        if (parg[0] === '-') {
          if (currParamName !== null) {
            params.set(currParamName, '')
          }
          currParamName = parg
        } else {
          if (currParamName !== null) {
            params.set(currParamName, parg)
            currParamName = null
          } else {
            args.push(parg)
          }
        }
      }
      if (currParamName !== null) {
        params.set(currParamName, '')
      }
    } else {
      params = _map_js__WEBPACK_IMPORTED_MODULE_0__["create"]()
      // eslint-disable-next-line no-undef
      ;(location.search || '?').slice(1).split('&').forEach(kv => {
        if (kv.length !== 0) {
          const [key, value] = kv.split('=')
          params.set(`--${_string_js__WEBPACK_IMPORTED_MODULE_1__["fromCamelCase"](key, '-')}`, value)
          params.set(`-${_string_js__WEBPACK_IMPORTED_MODULE_1__["fromCamelCase"](key, '-')}`, value)
        }
      })
    }
  }
  return params
}

/**
 * @param {string} name
 * @return {boolean}
 */
/* istanbul ignore next */
const hasParam = name => computeParams().has(name)

/**
 * @param {string} name
 * @param {string} defaultVal
 * @return {string}
 */
/* istanbul ignore next */
const getParam = (name, defaultVal) => computeParams().get(name) || defaultVal
// export const getArgs = name => computeParams() && args

/**
 * @param {string} name
 * @return {string|null}
 */
/* istanbul ignore next */
const getVariable = name => isNode ? _conditions_js__WEBPACK_IMPORTED_MODULE_2__["undefinedToNull"](process.env[name.toUpperCase()]) : _conditions_js__WEBPACK_IMPORTED_MODULE_2__["undefinedToNull"](_storage_js__WEBPACK_IMPORTED_MODULE_3__["varStorage"].getItem(name))

/**
 * @param {string} name
 * @return {string|null}
 */
const getConf = name => computeParams().get('--' + name) || getVariable(name)

/**
 * @param {string} name
 * @return {boolean}
 */
/* istanbul ignore next */
const hasConf = name => hasParam('--' + name) || getVariable(name) !== null

/* istanbul ignore next */
const production = hasConf('production')

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/lib0/error.js":
/*!************************************!*\
  !*** ./node_modules/lib0/error.js ***!
  \************************************/
/*! exports provided: create, methodUnimplemented, unexpectedCase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "methodUnimplemented", function() { return methodUnimplemented; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unexpectedCase", function() { return unexpectedCase; });
/**
 * Error helpers.
 *
 * @module error
 */

/**
 * @param {string} s
 * @return {Error}
 */
/* istanbul ignore next */
const create = s => new Error(s)

/**
 * @throws {Error}
 * @return {never}
 */
/* istanbul ignore next */
const methodUnimplemented = () => {
  throw create('Method unimplemented')
}

/**
 * @throws {Error}
 * @return {never}
 */
/* istanbul ignore next */
const unexpectedCase = () => {
  throw create('Unexpected case')
}


/***/ }),

/***/ "./node_modules/lib0/eventloop.js":
/*!****************************************!*\
  !*** ./node_modules/lib0/eventloop.js ***!
  \****************************************/
/*! exports provided: enqueue, timeout, interval, Animation, animationFrame, idleCallback */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enqueue", function() { return enqueue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeout", function() { return timeout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interval", function() { return interval; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Animation", function() { return Animation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animationFrame", function() { return animationFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "idleCallback", function() { return idleCallback; });
/* global requestIdleCallback, requestAnimationFrame, cancelIdleCallback, cancelAnimationFrame */

/**
 * Utility module to work with EcmaScript's event loop.
 *
 * @module eventloop
 */

/**
 * @type {Array<function>}
 */
let queue = []

const _runQueue = () => {
  for (let i = 0; i < queue.length; i++) {
    queue[i]()
  }
  queue = []
}

/**
 * @param {function():void} f
 */
const enqueue = f => {
  queue.push(f)
  if (queue.length === 1) {
    setTimeout(_runQueue, 0)
  }
}

/**
 * @typedef {Object} TimeoutObject
 * @property {function} TimeoutObject.destroy
 */

/**
 * @param {function(number):void} clearFunction
 */
const createTimeoutClass = clearFunction => class TT {
  /**
   * @param {number} timeoutId
   */
  constructor (timeoutId) {
    this._ = timeoutId
  }

  destroy () {
    clearFunction(this._)
  }
}

const Timeout = createTimeoutClass(clearTimeout)

/**
 * @param {number} timeout
 * @param {function} callback
 * @return {TimeoutObject}
 */
const timeout = (timeout, callback) => new Timeout(setTimeout(callback, timeout))

const Interval = createTimeoutClass(clearInterval)

/**
 * @param {number} timeout
 * @param {function} callback
 * @return {TimeoutObject}
 */
const interval = (timeout, callback) => new Interval(setInterval(callback, timeout))

/* istanbul ignore next */
const Animation = createTimeoutClass(arg => typeof requestAnimationFrame !== 'undefined' && cancelAnimationFrame(arg))

/* istanbul ignore next */
/**
 * @param {function(number):void} cb
 * @return {TimeoutObject}
 */
const animationFrame = cb => typeof requestAnimationFrame === 'undefined' ? timeout(0, cb) : new Animation(requestAnimationFrame(cb))

/* istanbul ignore next */
// @ts-ignore
const Idle = createTimeoutClass(arg => typeof cancelIdleCallback !== 'undefined' && cancelIdleCallback(arg))

/* istanbul ignore next */
/**
 * Note: this is experimental and is probably only useful in browsers.
 *
 * @param {function} cb
 * @return {TimeoutObject}
 */
// @ts-ignore
const idleCallback = cb => typeof requestIdleCallback !== 'undefined' ? new Idle(requestIdleCallback(cb)) : timeout(1000, cb)


/***/ }),

/***/ "./node_modules/lib0/function.js":
/*!***************************************!*\
  !*** ./node_modules/lib0/function.js ***!
  \***************************************/
/*! exports provided: callAll, nop, apply, id, equalityStrict, equalityFlat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "callAll", function() { return callAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nop", function() { return nop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "apply", function() { return apply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "id", function() { return id; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equalityStrict", function() { return equalityStrict; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equalityFlat", function() { return equalityFlat; });
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array.js */ "./node_modules/lib0/array.js");
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./object.js */ "./node_modules/lib0/object.js");
/**
 * Common functions and function call helpers.
 *
 * @module function
 */




/**
 * Calls all functions in `fs` with args. Only throws after all functions were called.
 *
 * @param {Array<function>} fs
 * @param {Array<any>} args
 */
const callAll = (fs, args, i = 0) => {
  try {
    for (; i < fs.length; i++) {
      fs[i](...args)
    }
  } finally {
    if (i < fs.length) {
      callAll(fs, args, i + 1)
    }
  }
}

const nop = () => {}

/**
 * @template T
 * @param {function():T} f
 * @return {T}
 */
const apply = f => f()

/**
 * @template A
 *
 * @param {A} a
 * @return {A}
 */
const id = a => a

/**
 * @template T
 *
 * @param {T} a
 * @param {T} b
 * @return {boolean}
 */
const equalityStrict = (a, b) => a === b

/**
 * @template T
 *
 * @param {Array<T>|object} a
 * @param {Array<T>|object} b
 * @return {boolean}
 */
const equalityFlat = (a, b) => a === b || (a != null && b != null && a.constructor === b.constructor && ((a instanceof Array && _array_js__WEBPACK_IMPORTED_MODULE_0__["equalFlat"](a, /** @type {Array<T>} */ (b))) || (typeof a === 'object' && _object_js__WEBPACK_IMPORTED_MODULE_1__["equalFlat"](a, b))))


/***/ }),

/***/ "./node_modules/lib0/isomorphic.js":
/*!*****************************************!*\
  !*** ./node_modules/lib0/isomorphic.js ***!
  \*****************************************/
/*! exports provided: performance, cryptoRandomBuffer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "performance", function() { return performance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cryptoRandomBuffer", function() { return cryptoRandomBuffer; });
/* harmony import */ var isomorphic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! isomorphic.js */ "./node_modules/isomorphic.js/iso-browser.js");
/* harmony import */ var isomorphic_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(isomorphic_js__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Isomorphic library exports from isomorphic.js.
 *
 * @module isomorphic
 */

// @ts-ignore


const performance = /** @type {any} */ (isomorphic_js__WEBPACK_IMPORTED_MODULE_0___default.a.performance)
const cryptoRandomBuffer = /** @type {any} */ (isomorphic_js__WEBPACK_IMPORTED_MODULE_0___default.a.cryptoRandomBuffer)


/***/ }),

/***/ "./node_modules/lib0/iterator.js":
/*!***************************************!*\
  !*** ./node_modules/lib0/iterator.js ***!
  \***************************************/
/*! exports provided: mapIterator, createIterator, iteratorFilter, iteratorMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapIterator", function() { return mapIterator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createIterator", function() { return createIterator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "iteratorFilter", function() { return iteratorFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "iteratorMap", function() { return iteratorMap; });
/**
 * Utility module to create and manipulate Iterators.
 *
 * @module iterator
 */

/**
 * @template T,R
 * @param {Iterator<T>} iterator
 * @param {function(T):R} f
 * @return {IterableIterator<R>}
 */
const mapIterator = (iterator, f) => ({
  /**
   * @param {function(T):R} f
   */
  [Symbol.iterator] () {
    return this
  },
  // @ts-ignore
  next () {
    const r = iterator.next()
    return { value: r.done ? undefined : f(r.value), done: r.done }
  }
})

/**
 * @template T
 * @param {function():IteratorResult<T>} next
 * @return {IterableIterator<T>}
 */
const createIterator = next => ({
  /**
   * @return {IterableIterator<T>}
   */
  [Symbol.iterator] () {
    return this
  },
  // @ts-ignore
  next
})

/**
 * @template T
 * @param {Iterator<T>} iterator
 * @param {function(T):boolean} filter
 */
const iteratorFilter = (iterator, filter) => createIterator(() => {
  let res
  do {
    res = iterator.next()
  } while (!res.done && !filter(res.value))
  return res
})

/**
 * @template T,M
 * @param {Iterator<T>} iterator
 * @param {function(T):M} fmap
 */
const iteratorMap = (iterator, fmap) => createIterator(() => {
  const { done, value } = iterator.next()
  return { done, value: done ? undefined : fmap(value) }
})


/***/ }),

/***/ "./node_modules/lib0/json.js":
/*!***********************************!*\
  !*** ./node_modules/lib0/json.js ***!
  \***********************************/
/*! exports provided: stringify, parse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringify", function() { return stringify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/**
 * JSON utility functions.
 *
 * @module json
 */

/**
 * Transform JavaScript object to JSON.
 *
 * @param {any} object
 * @return {string}
 */
const stringify = JSON.stringify

/**
 * Parse JSON object.
 *
 * @param {string} json
 * @return {any}
 */
const parse = JSON.parse


/***/ }),

/***/ "./node_modules/lib0/logging.js":
/*!**************************************!*\
  !*** ./node_modules/lib0/logging.js ***!
  \**************************************/
/*! exports provided: BOLD, UNBOLD, BLUE, GREY, GREEN, RED, PURPLE, ORANGE, UNCOLOR, print, warn, printError, printImg, printImgBase64, group, groupCollapsed, groupEnd, printDom, printCanvas, vconsoles, VConsole, createVConsole, createModuleLogger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BOLD", function() { return BOLD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNBOLD", function() { return UNBOLD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BLUE", function() { return BLUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GREY", function() { return GREY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GREEN", function() { return GREEN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RED", function() { return RED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PURPLE", function() { return PURPLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORANGE", function() { return ORANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNCOLOR", function() { return UNCOLOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "print", function() { return print; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "warn", function() { return warn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "printError", function() { return printError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "printImg", function() { return printImg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "printImgBase64", function() { return printImgBase64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "group", function() { return group; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "groupCollapsed", function() { return groupCollapsed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "groupEnd", function() { return groupEnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "printDom", function() { return printDom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "printCanvas", function() { return printCanvas; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vconsoles", function() { return vconsoles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VConsole", function() { return VConsole; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createVConsole", function() { return createVConsole; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createModuleLogger", function() { return createModuleLogger; });
/* harmony import */ var _environment_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./environment.js */ "./node_modules/lib0/environment.js");
/* harmony import */ var _symbol_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./symbol.js */ "./node_modules/lib0/symbol.js");
/* harmony import */ var _pair_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pair.js */ "./node_modules/lib0/pair.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom.js */ "./node_modules/lib0/dom.js");
/* harmony import */ var _json_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./json.js */ "./node_modules/lib0/json.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./map.js */ "./node_modules/lib0/map.js");
/* harmony import */ var _eventloop_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./eventloop.js */ "./node_modules/lib0/eventloop.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./math.js */ "./node_modules/lib0/math.js");
/* harmony import */ var _time_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./time.js */ "./node_modules/lib0/time.js");
/* harmony import */ var _function_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./function.js */ "./node_modules/lib0/function.js");
/**
 * Isomorphic logging module with support for colors!
 *
 * @module logging
 */












const BOLD = _symbol_js__WEBPACK_IMPORTED_MODULE_1__["create"]()
const UNBOLD = _symbol_js__WEBPACK_IMPORTED_MODULE_1__["create"]()
const BLUE = _symbol_js__WEBPACK_IMPORTED_MODULE_1__["create"]()
const GREY = _symbol_js__WEBPACK_IMPORTED_MODULE_1__["create"]()
const GREEN = _symbol_js__WEBPACK_IMPORTED_MODULE_1__["create"]()
const RED = _symbol_js__WEBPACK_IMPORTED_MODULE_1__["create"]()
const PURPLE = _symbol_js__WEBPACK_IMPORTED_MODULE_1__["create"]()
const ORANGE = _symbol_js__WEBPACK_IMPORTED_MODULE_1__["create"]()
const UNCOLOR = _symbol_js__WEBPACK_IMPORTED_MODULE_1__["create"]()

/**
 * @type {Object<Symbol,pair.Pair<string,string>>}
 */
const _browserStyleMap = {
  [BOLD]: _pair_js__WEBPACK_IMPORTED_MODULE_2__["create"]('font-weight', 'bold'),
  [UNBOLD]: _pair_js__WEBPACK_IMPORTED_MODULE_2__["create"]('font-weight', 'normal'),
  [BLUE]: _pair_js__WEBPACK_IMPORTED_MODULE_2__["create"]('color', 'blue'),
  [GREEN]: _pair_js__WEBPACK_IMPORTED_MODULE_2__["create"]('color', 'green'),
  [GREY]: _pair_js__WEBPACK_IMPORTED_MODULE_2__["create"]('color', 'grey'),
  [RED]: _pair_js__WEBPACK_IMPORTED_MODULE_2__["create"]('color', 'red'),
  [PURPLE]: _pair_js__WEBPACK_IMPORTED_MODULE_2__["create"]('color', 'purple'),
  [ORANGE]: _pair_js__WEBPACK_IMPORTED_MODULE_2__["create"]('color', 'orange'), // not well supported in chrome when debugging node with inspector - TODO: deprecate
  [UNCOLOR]: _pair_js__WEBPACK_IMPORTED_MODULE_2__["create"]('color', 'black')
}

const _nodeStyleMap = {
  [BOLD]: '\u001b[1m',
  [UNBOLD]: '\u001b[2m',
  [BLUE]: '\x1b[34m',
  [GREEN]: '\x1b[32m',
  [GREY]: '\u001b[37m',
  [RED]: '\x1b[31m',
  [PURPLE]: '\x1b[35m',
  [ORANGE]: '\x1b[38;5;208m',
  [UNCOLOR]: '\x1b[0m'
}

/* istanbul ignore next */
/**
 * @param {Array<string|Symbol|Object|number>} args
 * @return {Array<string|object|number>}
 */
const computeBrowserLoggingArgs = args => {
  const strBuilder = []
  const styles = []
  const currentStyle = _map_js__WEBPACK_IMPORTED_MODULE_5__["create"]()
  /**
   * @type {Array<string|Object|number>}
   */
  let logArgs = []
  // try with formatting until we find something unsupported
  let i = 0

  for (; i < args.length; i++) {
    const arg = args[i]
    // @ts-ignore
    const style = _browserStyleMap[arg]
    if (style !== undefined) {
      currentStyle.set(style.left, style.right)
    } else {
      if (arg.constructor === String || arg.constructor === Number) {
        const style = _dom_js__WEBPACK_IMPORTED_MODULE_3__["mapToStyleString"](currentStyle)
        if (i > 0 || style.length > 0) {
          strBuilder.push('%c' + arg)
          styles.push(style)
        } else {
          strBuilder.push(arg)
        }
      } else {
        break
      }
    }
  }

  if (i > 0) {
    // create logArgs with what we have so far
    logArgs = styles
    logArgs.unshift(strBuilder.join(''))
  }
  // append the rest
  for (; i < args.length; i++) {
    const arg = args[i]
    if (!(arg instanceof Symbol)) {
      logArgs.push(arg)
    }
  }
  return logArgs
}

/**
 * @param {Array<string|Symbol|Object|number>} args
 * @return {Array<string|object|number>}
 */
const computeNodeLoggingArgs = args => {
  const strBuilder = []
  const logArgs = []

  // try with formatting until we find something unsupported
  let i = 0

  for (; i < args.length; i++) {
    const arg = args[i]
    // @ts-ignore
    const style = _nodeStyleMap[arg]
    if (style !== undefined) {
      strBuilder.push(style)
    } else {
      if (arg.constructor === String || arg.constructor === Number) {
        strBuilder.push(arg)
      } else {
        break
      }
    }
  }
  if (i > 0) {
    // create logArgs with what we have so far
    strBuilder.push('\x1b[0m')
    logArgs.push(strBuilder.join(''))
  }
  // append the rest
  for (; i < args.length; i++) {
    const arg = args[i]
    /* istanbul ignore else */
    if (!(arg instanceof Symbol)) {
      logArgs.push(arg)
    }
  }
  return logArgs
}

/* istanbul ignore next */
const computeLoggingArgs = _environment_js__WEBPACK_IMPORTED_MODULE_0__["isNode"] ? computeNodeLoggingArgs : computeBrowserLoggingArgs

/**
 * @param {Array<string|Symbol|Object|number>} args
 */
const print = (...args) => {
  console.log(...computeLoggingArgs(args))
  /* istanbul ignore next */
  vconsoles.forEach(vc => vc.print(args))
}

/* istanbul ignore next */
/**
 * @param {Array<string|Symbol|Object|number>} args
 */
const warn = (...args) => {
  console.warn(...computeLoggingArgs(args))
  args.unshift(ORANGE)
  vconsoles.forEach(vc => vc.print(args))
}

/* istanbul ignore next */
/**
 * @param {Error} err
 */
const printError = err => {
  console.error(err)
  vconsoles.forEach(vc => vc.printError(err))
}

/* istanbul ignore next */
/**
 * @param {string} url image location
 * @param {number} height height of the image in pixel
 */
const printImg = (url, height) => {
  if (_environment_js__WEBPACK_IMPORTED_MODULE_0__["isBrowser"]) {
    console.log('%c                      ', `font-size: ${height}px; background-size: contain; background-repeat: no-repeat; background-image: url(${url})`)
    // console.log('%c                ', `font-size: ${height}x; background: url(${url}) no-repeat;`)
  }
  vconsoles.forEach(vc => vc.printImg(url, height))
}

/* istanbul ignore next */
/**
 * @param {string} base64
 * @param {number} height
 */
const printImgBase64 = (base64, height) => printImg(`data:image/gif;base64,${base64}`, height)

/**
 * @param {Array<string|Symbol|Object|number>} args
 */
const group = (...args) => {
  console.group(...computeLoggingArgs(args))
  /* istanbul ignore next */
  vconsoles.forEach(vc => vc.group(args))
}

/**
 * @param {Array<string|Symbol|Object|number>} args
 */
const groupCollapsed = (...args) => {
  console.groupCollapsed(...computeLoggingArgs(args))
  /* istanbul ignore next */
  vconsoles.forEach(vc => vc.groupCollapsed(args))
}

const groupEnd = () => {
  console.groupEnd()
  /* istanbul ignore next */
  vconsoles.forEach(vc => vc.groupEnd())
}

/* istanbul ignore next */
/**
 * @param {function():Node} createNode
 */
const printDom = createNode =>
  vconsoles.forEach(vc => vc.printDom(createNode()))

/* istanbul ignore next */
/**
 * @param {HTMLCanvasElement} canvas
 * @param {number} height
 */
const printCanvas = (canvas, height) => printImg(canvas.toDataURL(), height)

const vconsoles = new Set()

/* istanbul ignore next */
/**
 * @param {Array<string|Symbol|Object|number>} args
 * @return {Array<Element>}
 */
const _computeLineSpans = args => {
  const spans = []
  const currentStyle = new Map()
  // try with formatting until we find something unsupported
  let i = 0
  for (; i < args.length; i++) {
    const arg = args[i]
    // @ts-ignore
    const style = _browserStyleMap[arg]
    if (style !== undefined) {
      currentStyle.set(style.left, style.right)
    } else {
      if (arg.constructor === String || arg.constructor === Number) {
        // @ts-ignore
        const span = _dom_js__WEBPACK_IMPORTED_MODULE_3__["element"]('span', [_pair_js__WEBPACK_IMPORTED_MODULE_2__["create"]('style', _dom_js__WEBPACK_IMPORTED_MODULE_3__["mapToStyleString"](currentStyle))], [_dom_js__WEBPACK_IMPORTED_MODULE_3__["text"](arg)])
        if (span.innerHTML === '') {
          span.innerHTML = '&nbsp;'
        }
        spans.push(span)
      } else {
        break
      }
    }
  }
  // append the rest
  for (; i < args.length; i++) {
    let content = args[i]
    if (!(content instanceof Symbol)) {
      if (content.constructor !== String && content.constructor !== Number) {
        content = ' ' + _json_js__WEBPACK_IMPORTED_MODULE_4__["stringify"](content) + ' '
      }
      spans.push(_dom_js__WEBPACK_IMPORTED_MODULE_3__["element"]('span', [], [_dom_js__WEBPACK_IMPORTED_MODULE_3__["text"](/** @type {string} */ (content))]))
    }
  }
  return spans
}

const lineStyle = 'font-family:monospace;border-bottom:1px solid #e2e2e2;padding:2px;'

/* istanbul ignore next */
class VConsole {
  /**
   * @param {Element} dom
   */
  constructor (dom) {
    this.dom = dom
    /**
     * @type {Element}
     */
    this.ccontainer = this.dom
    this.depth = 0
    vconsoles.add(this)
  }

  /**
   * @param {Array<string|Symbol|Object|number>} args
   * @param {boolean} collapsed
   */
  group (args, collapsed = false) {
    _eventloop_js__WEBPACK_IMPORTED_MODULE_6__["enqueue"](() => {
      const triangleDown = _dom_js__WEBPACK_IMPORTED_MODULE_3__["element"]('span', [_pair_js__WEBPACK_IMPORTED_MODULE_2__["create"]('hidden', collapsed), _pair_js__WEBPACK_IMPORTED_MODULE_2__["create"]('style', 'color:grey;font-size:120%;')], [_dom_js__WEBPACK_IMPORTED_MODULE_3__["text"]('▼')])
      const triangleRight = _dom_js__WEBPACK_IMPORTED_MODULE_3__["element"]('span', [_pair_js__WEBPACK_IMPORTED_MODULE_2__["create"]('hidden', !collapsed), _pair_js__WEBPACK_IMPORTED_MODULE_2__["create"]('style', 'color:grey;font-size:125%;')], [_dom_js__WEBPACK_IMPORTED_MODULE_3__["text"]('▶')])
      const content = _dom_js__WEBPACK_IMPORTED_MODULE_3__["element"]('div', [_pair_js__WEBPACK_IMPORTED_MODULE_2__["create"]('style', `${lineStyle};padding-left:${this.depth * 10}px`)], [triangleDown, triangleRight, _dom_js__WEBPACK_IMPORTED_MODULE_3__["text"](' ')].concat(_computeLineSpans(args)))
      const nextContainer = _dom_js__WEBPACK_IMPORTED_MODULE_3__["element"]('div', [_pair_js__WEBPACK_IMPORTED_MODULE_2__["create"]('hidden', collapsed)])
      const nextLine = _dom_js__WEBPACK_IMPORTED_MODULE_3__["element"]('div', [], [content, nextContainer])
      _dom_js__WEBPACK_IMPORTED_MODULE_3__["append"](this.ccontainer, [nextLine])
      this.ccontainer = nextContainer
      this.depth++
      // when header is clicked, collapse/uncollapse container
      _dom_js__WEBPACK_IMPORTED_MODULE_3__["addEventListener"](content, 'click', event => {
        nextContainer.toggleAttribute('hidden')
        triangleDown.toggleAttribute('hidden')
        triangleRight.toggleAttribute('hidden')
      })
    })
  }

  /**
   * @param {Array<string|Symbol|Object|number>} args
   */
  groupCollapsed (args) {
    this.group(args, true)
  }

  groupEnd () {
    _eventloop_js__WEBPACK_IMPORTED_MODULE_6__["enqueue"](() => {
      if (this.depth > 0) {
        this.depth--
        // @ts-ignore
        this.ccontainer = this.ccontainer.parentElement.parentElement
      }
    })
  }

  /**
   * @param {Array<string|Symbol|Object|number>} args
   */
  print (args) {
    _eventloop_js__WEBPACK_IMPORTED_MODULE_6__["enqueue"](() => {
      _dom_js__WEBPACK_IMPORTED_MODULE_3__["append"](this.ccontainer, [_dom_js__WEBPACK_IMPORTED_MODULE_3__["element"]('div', [_pair_js__WEBPACK_IMPORTED_MODULE_2__["create"]('style', `${lineStyle};padding-left:${this.depth * 10}px`)], _computeLineSpans(args))])
    })
  }

  /**
   * @param {Error} err
   */
  printError (err) {
    this.print([RED, BOLD, err.toString()])
  }

  /**
   * @param {string} url
   * @param {number} height
   */
  printImg (url, height) {
    _eventloop_js__WEBPACK_IMPORTED_MODULE_6__["enqueue"](() => {
      _dom_js__WEBPACK_IMPORTED_MODULE_3__["append"](this.ccontainer, [_dom_js__WEBPACK_IMPORTED_MODULE_3__["element"]('img', [_pair_js__WEBPACK_IMPORTED_MODULE_2__["create"]('src', url), _pair_js__WEBPACK_IMPORTED_MODULE_2__["create"]('height', `${_math_js__WEBPACK_IMPORTED_MODULE_7__["round"](height * 1.5)}px`)])])
    })
  }

  /**
   * @param {Node} node
   */
  printDom (node) {
    _eventloop_js__WEBPACK_IMPORTED_MODULE_6__["enqueue"](() => {
      _dom_js__WEBPACK_IMPORTED_MODULE_3__["append"](this.ccontainer, [node])
    })
  }

  destroy () {
    _eventloop_js__WEBPACK_IMPORTED_MODULE_6__["enqueue"](() => {
      vconsoles.delete(this)
    })
  }
}

/* istanbul ignore next */
/**
 * @param {Element} dom
 */
const createVConsole = dom => new VConsole(dom)

const loggingColors = [GREEN, PURPLE, ORANGE, BLUE]
let nextColor = 0
let lastLoggingTime = _time_js__WEBPACK_IMPORTED_MODULE_8__["getUnixTime"]()

/**
 * @param {string} moduleName
 * @return {function(...any)}
 */
const createModuleLogger = moduleName => {
  const color = loggingColors[nextColor]
  const debugRegexVar = _environment_js__WEBPACK_IMPORTED_MODULE_0__["getVariable"]('log')
  const doLogging = debugRegexVar !== null && (debugRegexVar === '*' || debugRegexVar === 'true' || new RegExp(debugRegexVar, 'gi').test(moduleName))
  nextColor = (nextColor + 1) % loggingColors.length
  moduleName += ': '

  return !doLogging ? _function_js__WEBPACK_IMPORTED_MODULE_9__["nop"] : (...args) => {
    const timeNow = _time_js__WEBPACK_IMPORTED_MODULE_8__["getUnixTime"]()
    const timeDiff = timeNow - lastLoggingTime
    lastLoggingTime = timeNow
    print(color, moduleName, UNCOLOR, ...args.map(arg => (typeof arg === 'string' || typeof arg === 'symbol') ? arg : JSON.stringify(arg)), color, ' +' + timeDiff + 'ms')
  }
}


/***/ }),

/***/ "./node_modules/lib0/map.js":
/*!**********************************!*\
  !*** ./node_modules/lib0/map.js ***!
  \**********************************/
/*! exports provided: create, copy, setIfUndefined, map, any, all */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copy", function() { return copy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setIfUndefined", function() { return setIfUndefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "any", function() { return any; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "all", function() { return all; });
/**
 * Utility module to work with key-value stores.
 *
 * @module map
 */

/**
 * Creates a new Map instance.
 *
 * @function
 * @return {Map<any, any>}
 *
 * @function
 */
const create = () => new Map()

/**
 * Copy a Map object into a fresh Map object.
 *
 * @function
 * @template X,Y
 * @param {Map<X,Y>} m
 * @return {Map<X,Y>}
 */
const copy = m => {
  const r = create()
  m.forEach((v, k) => { r.set(k, v) })
  return r
}

/**
 * Get map property. Create T if property is undefined and set T on map.
 *
 * ```js
 * const listeners = map.setIfUndefined(events, 'eventName', set.create)
 * listeners.add(listener)
 * ```
 *
 * @function
 * @template T,K
 * @param {Map<K, T>} map
 * @param {K} key
 * @param {function():T} createT
 * @return {T}
 */
const setIfUndefined = (map, key, createT) => {
  let set = map.get(key)
  if (set === undefined) {
    map.set(key, set = createT())
  }
  return set
}

/**
 * Creates an Array and populates it with the content of all key-value pairs using the `f(value, key)` function.
 *
 * @function
 * @template K
 * @template V
 * @template R
 * @param {Map<K,V>} m
 * @param {function(V,K):R} f
 * @return {Array<R>}
 */
const map = (m, f) => {
  const res = []
  for (const [key, value] of m) {
    res.push(f(value, key))
  }
  return res
}

/**
 * Tests whether any key-value pairs pass the test implemented by `f(value, key)`.
 *
 * @todo should rename to some - similarly to Array.some
 *
 * @function
 * @template K
 * @template V
 * @param {Map<K,V>} m
 * @param {function(V,K):boolean} f
 * @return {boolean}
 */
const any = (m, f) => {
  for (const [key, value] of m) {
    if (f(value, key)) {
      return true
    }
  }
  return false
}

/**
 * Tests whether all key-value pairs pass the test implemented by `f(value, key)`.
 *
 * @function
 * @template K
 * @template V
 * @param {Map<K,V>} m
 * @param {function(V,K):boolean} f
 * @return {boolean}
 */
const all = (m, f) => {
  for (const [key, value] of m) {
    if (!f(value, key)) {
      return false
    }
  }
  return true
}


/***/ }),

/***/ "./node_modules/lib0/math.js":
/*!***********************************!*\
  !*** ./node_modules/lib0/math.js ***!
  \***********************************/
/*! exports provided: floor, ceil, abs, imul, round, log10, log2, log, sqrt, add, min, max, isNaN, pow, exp10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "floor", function() { return floor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ceil", function() { return ceil; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "abs", function() { return abs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "imul", function() { return imul; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "round", function() { return round; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log10", function() { return log10; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log2", function() { return log2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log", function() { return log; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrt", function() { return sqrt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "min", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "max", function() { return max; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNaN", function() { return isNaN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pow", function() { return pow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exp10", function() { return exp10; });
/**
 * Common Math expressions.
 *
 * @module math
 */

const floor = Math.floor
const ceil = Math.ceil
const abs = Math.abs
const imul = Math.imul
const round = Math.round
const log10 = Math.log10
const log2 = Math.log2
const log = Math.log
const sqrt = Math.sqrt

/**
 * @function
 * @param {number} a
 * @param {number} b
 * @return {number} The sum of a and b
 */
const add = (a, b) => a + b

/**
 * @function
 * @param {number} a
 * @param {number} b
 * @return {number} The smaller element of a and b
 */
const min = (a, b) => a < b ? a : b

/**
 * @function
 * @param {number} a
 * @param {number} b
 * @return {number} The bigger element of a and b
 */
const max = (a, b) => a > b ? a : b

const isNaN = Number.isNaN

const pow = Math.pow
/**
 * Base 10 exponential function. Returns the value of 10 raised to the power of pow.
 *
 * @param {number} exp
 * @return {number}
 */
const exp10 = exp => Math.pow(10, exp)


/***/ }),

/***/ "./node_modules/lib0/metric.js":
/*!*************************************!*\
  !*** ./node_modules/lib0/metric.js ***!
  \*************************************/
/*! exports provided: yotta, zetta, exa, peta, tera, giga, mega, kilo, hecto, deca, deci, centi, milli, micro, nano, pico, femto, atto, zepto, yocto, prefix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "yotta", function() { return yotta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zetta", function() { return zetta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exa", function() { return exa; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "peta", function() { return peta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tera", function() { return tera; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "giga", function() { return giga; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mega", function() { return mega; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kilo", function() { return kilo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hecto", function() { return hecto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deca", function() { return deca; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deci", function() { return deci; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "centi", function() { return centi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "milli", function() { return milli; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "micro", function() { return micro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nano", function() { return nano; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pico", function() { return pico; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "femto", function() { return femto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "atto", function() { return atto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zepto", function() { return zepto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "yocto", function() { return yocto; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prefix", function() { return prefix; });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/lib0/math.js");
/**
 * Utility module to convert metric values.
 *
 * @module metric
 */



const yotta = 1e24
const zetta = 1e21
const exa = 1e18
const peta = 1e15
const tera = 1e12
const giga = 1e9
const mega = 1e6
const kilo = 1e3
const hecto = 1e2
const deca = 10
const deci = 0.1
const centi = 0.01
const milli = 1e-3
const micro = 1e-6
const nano = 1e-9
const pico = 1e-12
const femto = 1e-15
const atto = 1e-18
const zepto = 1e-21
const yocto = 1e-24

const prefixUp = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
const prefixDown = ['', 'm', 'μ', 'n', 'p', 'f', 'a', 'z', 'y']

/**
 * Calculate the metric prefix for a number. Assumes E.g. `prefix(1000) = { n: 1, prefix: 'k' }`
 *
 * @param {number} n
 * @param {number} [baseMultiplier] Multiplier of the base (10^(3*baseMultiplier)). E.g. `convert(time, -3)` if time is already in milli seconds
 * @return {{n:number,prefix:string}}
 */
const prefix = (n, baseMultiplier = 0) => {
  const nPow = n === 0 ? 0 : _math_js__WEBPACK_IMPORTED_MODULE_0__["log10"](n)
  let mult = 0
  while (nPow < mult * 3 && baseMultiplier > -8) {
    baseMultiplier--
    mult--
  }
  while (nPow >= 3 + mult * 3 && baseMultiplier < 8) {
    baseMultiplier++
    mult++
  }
  const prefix = baseMultiplier < 0 ? prefixDown[-baseMultiplier] : prefixUp[baseMultiplier]
  return {
    n: _math_js__WEBPACK_IMPORTED_MODULE_0__["round"]((mult > 0 ? n / _math_js__WEBPACK_IMPORTED_MODULE_0__["exp10"](mult * 3) : n * _math_js__WEBPACK_IMPORTED_MODULE_0__["exp10"](mult * -3)) * 1e12) / 1e12,
    prefix
  }
}


/***/ }),

/***/ "./node_modules/lib0/mutex.js":
/*!************************************!*\
  !*** ./node_modules/lib0/mutex.js ***!
  \************************************/
/*! exports provided: createMutex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMutex", function() { return createMutex; });
/**
 * Mutual exclude for JavaScript.
 *
 * @module mutex
 */

/**
 * @callback mutex
 * @param {function():void} cb Only executed when this mutex is not in the current stack
 * @param {function():void} [elseCb] Executed when this mutex is in the current stack
 */

/**
 * Creates a mutual exclude function with the following property:
 *
 * ```js
 * const mutex = createMutex()
 * mutex(() => {
 *   // This function is immediately executed
 *   mutex(() => {
 *     // This function is not executed, as the mutex is already active.
 *   })
 * })
 * ```
 *
 * @return {mutex} A mutual exclude function
 * @public
 */
const createMutex = () => {
  let token = true
  return (f, g) => {
    if (token) {
      token = false
      try {
        f()
      } finally {
        token = true
      }
    } else if (g !== undefined) {
      g()
    }
  }
}


/***/ }),

/***/ "./node_modules/lib0/number.js":
/*!*************************************!*\
  !*** ./node_modules/lib0/number.js ***!
  \*************************************/
/*! exports provided: MAX_SAFE_INTEGER, MIN_SAFE_INTEGER, LOWEST_INT32, HIGHEST_INT32, isInteger, isNaN */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_SAFE_INTEGER", function() { return MAX_SAFE_INTEGER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MIN_SAFE_INTEGER", function() { return MIN_SAFE_INTEGER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOWEST_INT32", function() { return LOWEST_INT32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HIGHEST_INT32", function() { return HIGHEST_INT32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInteger", function() { return isInteger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNaN", function() { return isNaN; });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/lib0/math.js");
/* harmony import */ var _binary_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./binary.js */ "./node_modules/lib0/binary.js");
/**
 * Utility helpers for working with numbers.
 *
 * @module number
 */




const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER
const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER

const LOWEST_INT32 = 1 << 31
const HIGHEST_INT32 = _binary_js__WEBPACK_IMPORTED_MODULE_1__["BITS31"]

/**
 * @module number
 */

/* istanbul ignore next */
const isInteger = Number.isInteger || (num => typeof num === 'number' && isFinite(num) && _math_js__WEBPACK_IMPORTED_MODULE_0__["floor"](num) === num)
const isNaN = Number.isNaN


/***/ }),

/***/ "./node_modules/lib0/object.js":
/*!*************************************!*\
  !*** ./node_modules/lib0/object.js ***!
  \*************************************/
/*! exports provided: create, assign, keys, forEach, map, length, some, every, hasProperty, equalFlat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keys", function() { return keys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "length", function() { return length; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "some", function() { return some; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "every", function() { return every; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasProperty", function() { return hasProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equalFlat", function() { return equalFlat; });
/**
 * Utility functions for working with EcmaScript objects.
 *
 * @module object
 */

/**
 * @return {Object<string,any>} obj
 */
const create = () => Object.create(null)

/**
 * Object.assign
 */
const assign = Object.assign

/**
 * @param {Object<string,any>} obj
 */
const keys = Object.keys

/**
 * @param {Object<string,any>} obj
 * @param {function(any,string):any} f
 */
const forEach = (obj, f) => {
  for (const key in obj) {
    f(obj[key], key)
  }
}

/**
 * @template R
 * @param {Object<string,any>} obj
 * @param {function(any,string):R} f
 * @return {Array<R>}
 */
const map = (obj, f) => {
  const results = []
  for (const key in obj) {
    results.push(f(obj[key], key))
  }
  return results
}

/**
 * @param {Object<string,any>} obj
 * @return {number}
 */
const length = obj => keys(obj).length

/**
 * @param {Object<string,any>} obj
 * @param {function(any,string):boolean} f
 * @return {boolean}
 */
const some = (obj, f) => {
  for (const key in obj) {
    if (f(obj[key], key)) {
      return true
    }
  }
  return false
}

/**
 * @param {Object<string,any>} obj
 * @param {function(any,string):boolean} f
 * @return {boolean}
 */
const every = (obj, f) => {
  for (const key in obj) {
    if (!f(obj[key], key)) {
      return false
    }
  }
  return true
}

/**
 * Calls `Object.prototype.hasOwnProperty`.
 *
 * @param {any} obj
 * @param {string|symbol} key
 * @return {boolean}
 */
const hasProperty = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key)

/**
 * @param {Object<string,any>} a
 * @param {Object<string,any>} b
 * @return {boolean}
 */
const equalFlat = (a, b) => a === b || (length(a) === length(b) && every(a, (val, key) => (val !== undefined || hasProperty(b, key)) && b[key] === val))


/***/ }),

/***/ "./node_modules/lib0/observable.js":
/*!*****************************************!*\
  !*** ./node_modules/lib0/observable.js ***!
  \*****************************************/
/*! exports provided: Observable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Observable", function() { return Observable; });
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.js */ "./node_modules/lib0/map.js");
/* harmony import */ var _set_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./set.js */ "./node_modules/lib0/set.js");
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./array.js */ "./node_modules/lib0/array.js");
/**
 * Observable class prototype.
 *
 * @module observable
 */





/**
 * Handles named events.
 *
 * @template N
 */
class Observable {
  constructor () {
    /**
     * Some desc.
     * @type {Map<N, any>}
     */
    this._observers = _map_js__WEBPACK_IMPORTED_MODULE_0__["create"]()
  }

  /**
   * @param {N} name
   * @param {function} f
   */
  on (name, f) {
    _map_js__WEBPACK_IMPORTED_MODULE_0__["setIfUndefined"](this._observers, name, _set_js__WEBPACK_IMPORTED_MODULE_1__["create"]).add(f)
  }

  /**
   * @param {N} name
   * @param {function} f
   */
  once (name, f) {
    /**
     * @param  {...any} args
     */
    const _f = (...args) => {
      this.off(name, f)
      f(...args)
    }
    this.on(name, _f)
  }

  /**
   * @param {N} name
   * @param {function} f
   */
  off (name, f) {
    const observers = this._observers.get(name)
    if (observers !== undefined) {
      observers.delete(f)
      if (observers.size === 0) {
        this._observers.delete(name)
      }
    }
  }

  /**
   * Emit a named event. All registered event listeners that listen to the
   * specified name will receive the event.
   *
   * @todo This should catch exceptions
   *
   * @param {N} name The event name.
   * @param {Array<any>} args The arguments that are applied to the event listener.
   */
  emit (name, args) {
    // copy all listeners to an array first to make sure that no event is emitted to listeners that are subscribed while the event handler is called.
    return _array_js__WEBPACK_IMPORTED_MODULE_2__["from"]((this._observers.get(name) || _map_js__WEBPACK_IMPORTED_MODULE_0__["create"]()).values()).forEach(f => f(...args))
  }

  destroy () {
    this._observers = _map_js__WEBPACK_IMPORTED_MODULE_0__["create"]()
  }
}


/***/ }),

/***/ "./node_modules/lib0/pair.js":
/*!***********************************!*\
  !*** ./node_modules/lib0/pair.js ***!
  \***********************************/
/*! exports provided: Pair, create, createReversed, forEach, map */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pair", function() { return Pair; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createReversed", function() { return createReversed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/**
 * Working with value pairs.
 *
 * @module pair
 */

/**
 * @template L,R
 */
class Pair {
  /**
   * @param {L} left
   * @param {R} right
   */
  constructor (left, right) {
    this.left = left
    this.right = right
  }
}

/**
 * @template L,R
 * @param {L} left
 * @param {R} right
 * @return {Pair<L,R>}
 */
const create = (left, right) => new Pair(left, right)

/**
 * @template L,R
 * @param {R} right
 * @param {L} left
 * @return {Pair<L,R>}
 */
const createReversed = (right, left) => new Pair(left, right)

/**
 * @template L,R
 * @param {Array<Pair<L,R>>} arr
 * @param {function(L, R):any} f
 */
const forEach = (arr, f) => arr.forEach(p => f(p.left, p.right))

/**
 * @template L,R,X
 * @param {Array<Pair<L,R>>} arr
 * @param {function(L, R):X} f
 * @return {Array<X>}
 */
const map = (arr, f) => arr.map(p => f(p.left, p.right))


/***/ }),

/***/ "./node_modules/lib0/promise.js":
/*!**************************************!*\
  !*** ./node_modules/lib0/promise.js ***!
  \**************************************/
/*! exports provided: create, createEmpty, all, reject, resolve, until, wait */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEmpty", function() { return createEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "all", function() { return all; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reject", function() { return reject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolve", function() { return resolve; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "until", function() { return until; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wait", function() { return wait; });
/* harmony import */ var _time_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./time.js */ "./node_modules/lib0/time.js");
/**
 * Utility helpers to work with promises.
 *
 * @module promise
 */



/**
 * @template T
 * @callback PromiseResolve
 * @param {T|PromiseLike<T>} [result]
 */

/**
 * @template T
 * @param {function(PromiseResolve<T>,function(Error):void):any} f
 * @return {Promise<T>}
 */
const create = f => new Promise(f)

/**
 * @param {function(function():void,function(Error):void):void} f
 * @return {Promise<void>}
 */
const createEmpty = f => new Promise(f)

/**
 * `Promise.all` wait for all promises in the array to resolve and return the result
 * @template T
 * @param {Array<Promise<T>>} arrp
 * @return {Promise<Array<T>>}
 */
const all = arrp => Promise.all(arrp)

/**
 * @param {Error} [reason]
 * @return {Promise<never>}
 */
const reject = reason => Promise.reject(reason)

/**
 * @template T
 * @param {T|void} res
 * @return {Promise<T|void>}
 */
const resolve = res => Promise.resolve(res)

/**
 * @todo Next version, reorder parameters: check, [timeout, [intervalResolution]]
 *
 * @param {number} timeout
 * @param {function():boolean} check
 * @param {number} [intervalResolution]
 * @return {Promise<void>}
 */
const until = (timeout, check, intervalResolution = 10) => create((resolve, reject) => {
  const startTime = _time_js__WEBPACK_IMPORTED_MODULE_0__["getUnixTime"]()
  const hasTimeout = timeout > 0
  const untilInterval = () => {
    if (check()) {
      clearInterval(intervalHandle)
      resolve()
    } else if (hasTimeout) {
      /* istanbul ignore else */
      if (_time_js__WEBPACK_IMPORTED_MODULE_0__["getUnixTime"]() - startTime > timeout) {
        clearInterval(intervalHandle)
        reject(new Error('Timeout'))
      }
    }
  }
  const intervalHandle = setInterval(untilInterval, intervalResolution)
})

/**
 * @param {number} timeout
 * @return {Promise<undefined>}
 */
const wait = timeout => create((resolve, reject) => setTimeout(resolve, timeout))


/***/ }),

/***/ "./node_modules/lib0/random.js":
/*!*************************************!*\
  !*** ./node_modules/lib0/random.js ***!
  \*************************************/
/*! exports provided: rand, uint32, oneOf, uuidv4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rand", function() { return rand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uint32", function() { return uint32; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "oneOf", function() { return oneOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uuidv4", function() { return uuidv4; });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/lib0/math.js");
/* harmony import */ var _isomorphic_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isomorphic.js */ "./node_modules/lib0/isomorphic.js");

/**
 * Isomorphic module for true random numbers / buffers / uuids.
 *
 * Attention: falls back to Math.random if the browser does not support crypto.
 *
 * @module random
 */




const rand = Math.random

/* istanbul ignore next */
const uint32 = () => new Uint32Array(Object(_isomorphic_js__WEBPACK_IMPORTED_MODULE_1__["cryptoRandomBuffer"])(4))[0]

/**
 * @template T
 * @param {Array<T>} arr
 * @return {T}
 */
const oneOf = arr => arr[_math_js__WEBPACK_IMPORTED_MODULE_0__["floor"](rand() * arr.length)]

// @ts-ignore
const uuidv4Template = [1e7] + -1e3 + -4e3 + -8e3 + -1e11
const uuidv4 = () => uuidv4Template.replace(/[018]/g, /** @param {number} c */ c =>
  (c ^ uint32() & 15 >> c / 4).toString(16)
)


/***/ }),

/***/ "./node_modules/lib0/set.js":
/*!**********************************!*\
  !*** ./node_modules/lib0/set.js ***!
  \**********************************/
/*! exports provided: create, toArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toArray", function() { return toArray; });
/**
 * Utility module to work with sets.
 *
 * @module set
 */

const create = () => new Set()

/**
 * @template T
 * @param {Set<T>} set
 * @return {Array<T>}
 */
const toArray = set => Array.from(set)


/***/ }),

/***/ "./node_modules/lib0/storage.js":
/*!**************************************!*\
  !*** ./node_modules/lib0/storage.js ***!
  \**************************************/
/*! exports provided: varStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "varStorage", function() { return varStorage; });
/* global localStorage */

/**
 * Isomorphic variable storage.
 *
 * Uses LocalStorage in the browser and falls back to in-memory storage.
 *
 * @module storage
 */

/* istanbul ignore next */
class VarStoragePolyfill {
  constructor () {
    this.map = new Map()
  }

  /**
   * @param {string} key
   * @param {any} value
   */
  setItem (key, value) {
    this.map.set(key, value)
  }

  /**
   * @param {string} key
   */
  getItem (key) {
    return this.map.get(key)
  }
}

/* istanbul ignore next */
/**
 * @type {any}
 */
let _localStorage = new VarStoragePolyfill()

try {
  // if the same-origin rule is violated, accessing localStorage might thrown an error
  /* istanbul ignore next */
  if (typeof localStorage !== 'undefined') {
    _localStorage = localStorage
  }
} catch (e) { }

/* istanbul ignore next */
/**
 * This is basically localStorage in browser, or a polyfill in nodejs
 */
const varStorage = _localStorage


/***/ }),

/***/ "./node_modules/lib0/string.js":
/*!*************************************!*\
  !*** ./node_modules/lib0/string.js ***!
  \*************************************/
/*! exports provided: fromCharCode, fromCodePoint, trimLeft, fromCamelCase, utf8ByteLength, _encodeUtf8Polyfill, utf8TextEncoder, _encodeUtf8Native, encodeUtf8, _decodeUtf8Polyfill, utf8TextDecoder, _decodeUtf8Native, decodeUtf8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromCharCode", function() { return fromCharCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromCodePoint", function() { return fromCodePoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trimLeft", function() { return trimLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromCamelCase", function() { return fromCamelCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "utf8ByteLength", function() { return utf8ByteLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_encodeUtf8Polyfill", function() { return _encodeUtf8Polyfill; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "utf8TextEncoder", function() { return utf8TextEncoder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_encodeUtf8Native", function() { return _encodeUtf8Native; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodeUtf8", function() { return encodeUtf8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_decodeUtf8Polyfill", function() { return _decodeUtf8Polyfill; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "utf8TextDecoder", function() { return utf8TextDecoder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_decodeUtf8Native", function() { return _decodeUtf8Native; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decodeUtf8", function() { return decodeUtf8; });
/**
 * Utility module to work with strings.
 *
 * @module string
 */

const fromCharCode = String.fromCharCode
const fromCodePoint = String.fromCodePoint

/**
 * @param {string} s
 * @return {string}
 */
const toLowerCase = s => s.toLowerCase()

const trimLeftRegex = /^\s*/g

/**
 * @param {string} s
 * @return {string}
 */
const trimLeft = s => s.replace(trimLeftRegex, '')

const fromCamelCaseRegex = /([A-Z])/g

/**
 * @param {string} s
 * @param {string} separator
 * @return {string}
 */
const fromCamelCase = (s, separator) => trimLeft(s.replace(fromCamelCaseRegex, match => `${separator}${toLowerCase(match)}`))

/**
 * Compute the utf8ByteLength
 * @param {string} str
 * @return {number}
 */
const utf8ByteLength = str => unescape(encodeURIComponent(str)).length

/**
 * @param {string} str
 * @return {Uint8Array}
 */
const _encodeUtf8Polyfill = str => {
  const encodedString = unescape(encodeURIComponent(str))
  const len = encodedString.length
  const buf = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    buf[i] = /** @type {number} */ (encodedString.codePointAt(i))
  }
  return buf
}

/* istanbul ignore next */
const utf8TextEncoder = /** @type {TextEncoder} */ (typeof TextEncoder !== 'undefined' ? new TextEncoder() : null)

/**
 * @param {string} str
 * @return {Uint8Array}
 */
const _encodeUtf8Native = str => utf8TextEncoder.encode(str)

/**
 * @param {string} str
 * @return {Uint8Array}
 */
/* istanbul ignore next */
const encodeUtf8 = utf8TextEncoder ? _encodeUtf8Native : _encodeUtf8Polyfill

/**
 * @param {Uint8Array} buf
 * @return {string}
 */
const _decodeUtf8Polyfill = buf => {
  let remainingLen = buf.length
  let encodedString = ''
  let bufPos = 0
  while (remainingLen > 0) {
    const nextLen = remainingLen < 10000 ? remainingLen : 10000
    const bytes = new Array(nextLen)
    for (let i = 0; i < nextLen; i++) {
      bytes[i] = buf[bufPos++]
    }
    encodedString += String.fromCodePoint.apply(null, bytes)
    remainingLen -= nextLen
  }
  return decodeURIComponent(escape(encodedString))
}

/* istanbul ignore next */
const utf8TextDecoder = typeof TextDecoder === 'undefined' ? null : new TextDecoder('utf-8', { fatal: true, ignoreBOM: true })

/**
 * @param {Uint8Array} buf
 * @return {string}
 */
const _decodeUtf8Native = buf => /** @type {TextDecoder} */ (utf8TextDecoder).decode(buf)

/**
 * @param {Uint8Array} buf
 * @return {string}
 */
/* istanbul ignore next */
const decodeUtf8 = utf8TextDecoder ? _decodeUtf8Native : _decodeUtf8Polyfill


/***/ }),

/***/ "./node_modules/lib0/symbol.js":
/*!*************************************!*\
  !*** ./node_modules/lib0/symbol.js ***!
  \*************************************/
/*! exports provided: create, isSymbol */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSymbol", function() { return isSymbol; });
/**
 * Utility module to work with EcmaScript Symbols.
 *
 * @module symbol
 */

/**
 * Return fresh symbol.
 *
 * @return {Symbol}
 */
const create = Symbol

/**
 * @param {any} s
 * @return {boolean}
 */
const isSymbol = s => typeof s === 'symbol'


/***/ }),

/***/ "./node_modules/lib0/time.js":
/*!***********************************!*\
  !*** ./node_modules/lib0/time.js ***!
  \***********************************/
/*! exports provided: getDate, getUnixTime, humanizeDuration */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDate", function() { return getDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUnixTime", function() { return getUnixTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "humanizeDuration", function() { return humanizeDuration; });
/* harmony import */ var _metric_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metric.js */ "./node_modules/lib0/metric.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math.js */ "./node_modules/lib0/math.js");
/**
 * Utility module to work with time.
 *
 * @module time
 */




/**
 * Return current time.
 *
 * @return {Date}
 */
const getDate = () => new Date()

/**
 * Return current unix time.
 *
 * @return {number}
 */
const getUnixTime = Date.now

/**
 * Transform time (in ms) to a human readable format. E.g. 1100 => 1.1s. 60s => 1min. .001 => 10μs.
 *
 * @param {number} d duration in milliseconds
 * @return {string} humanized approximation of time
 */
const humanizeDuration = d => {
  if (d < 60000) {
    const p = _metric_js__WEBPACK_IMPORTED_MODULE_0__["prefix"](d, -1)
    return _math_js__WEBPACK_IMPORTED_MODULE_1__["round"](p.n * 100) / 100 + p.prefix + 's'
  }
  d = _math_js__WEBPACK_IMPORTED_MODULE_1__["floor"](d / 1000)
  const seconds = d % 60
  const minutes = _math_js__WEBPACK_IMPORTED_MODULE_1__["floor"](d / 60) % 60
  const hours = _math_js__WEBPACK_IMPORTED_MODULE_1__["floor"](d / 3600) % 24
  const days = _math_js__WEBPACK_IMPORTED_MODULE_1__["floor"](d / 86400)
  if (days > 0) {
    return days + 'd' + ((hours > 0 || minutes > 30) ? ' ' + (minutes > 30 ? hours + 1 : hours) + 'h' : '')
  }
  if (hours > 0) {
    /* istanbul ignore next */
    return hours + 'h' + ((minutes > 0 || seconds > 30) ? ' ' + (seconds > 30 ? minutes + 1 : minutes) + 'min' : '')
  }
  return minutes + 'min' + (seconds > 0 ? ' ' + seconds + 's' : '')
}


/***/ }),

/***/ "./node_modules/lib0/websocket.js":
/*!****************************************!*\
  !*** ./node_modules/lib0/websocket.js ***!
  \****************************************/
/*! exports provided: WebsocketClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebsocketClient", function() { return WebsocketClient; });
/* harmony import */ var _observable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./observable.js */ "./node_modules/lib0/observable.js");
/* harmony import */ var _time_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./time.js */ "./node_modules/lib0/time.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math.js */ "./node_modules/lib0/math.js");
/* eslint-env browser */

/**
 * Tiny websocket connection handler.
 *
 * Implements exponential backoff reconnects, ping/pong, and a nice event system using [lib0/observable].
 *
 * @module websocket
 */





const reconnectTimeoutBase = 1200
const maxReconnectTimeout = 2500
// @todo - this should depend on awareness.outdatedTime
const messageReconnectTimeout = 30000

/**
 * @param {WebsocketClient} wsclient
 */
const setupWS = (wsclient) => {
  if (wsclient.shouldConnect && wsclient.ws === null) {
    const websocket = new WebSocket(wsclient.url)
    const binaryType = wsclient.binaryType
    /**
     * @type {any}
     */
    let pingTimeout = null
    if (binaryType) {
      websocket.binaryType = binaryType
    }
    wsclient.ws = websocket
    wsclient.connecting = true
    wsclient.connected = false
    websocket.onmessage = event => {
      wsclient.lastMessageReceived = _time_js__WEBPACK_IMPORTED_MODULE_1__["getUnixTime"]()
      const data = event.data
      const message = typeof data === 'string' ? JSON.parse(data) : data
      if (message && message.type === 'pong') {
        clearTimeout(pingTimeout)
        pingTimeout = setTimeout(sendPing, messageReconnectTimeout / 2)
      }
      wsclient.emit('message', [message, wsclient])
    }
    /**
     * @param {any} error
     */
    const onclose = error => {
      if (wsclient.ws !== null) {
        wsclient.ws = null
        wsclient.connecting = false
        if (wsclient.connected) {
          wsclient.connected = false
          wsclient.emit('disconnect', [{ type: 'disconnect', error }, wsclient])
        } else {
          wsclient.unsuccessfulReconnects++
        }
        // Start with no reconnect timeout and increase timeout by
        // log10(wsUnsuccessfulReconnects).
        // The idea is to increase reconnect timeout slowly and have no reconnect
        // timeout at the beginning (log(1) = 0)
        setTimeout(setupWS, _math_js__WEBPACK_IMPORTED_MODULE_2__["min"](_math_js__WEBPACK_IMPORTED_MODULE_2__["log10"](wsclient.unsuccessfulReconnects + 1) * reconnectTimeoutBase, maxReconnectTimeout), wsclient)
      }
      clearTimeout(pingTimeout)
    }
    const sendPing = () => {
      if (wsclient.ws === websocket) {
        wsclient.send({
          type: 'ping'
        })
      }
    }
    websocket.onclose = () => onclose(null)
    websocket.onerror = error => onclose(error)
    websocket.onopen = () => {
      wsclient.lastMessageReceived = _time_js__WEBPACK_IMPORTED_MODULE_1__["getUnixTime"]()
      wsclient.connecting = false
      wsclient.connected = true
      wsclient.unsuccessfulReconnects = 0
      wsclient.emit('connect', [{ type: 'connect' }, wsclient])
      // set ping
      pingTimeout = setTimeout(sendPing, messageReconnectTimeout / 2)
    }
  }
}

/**
 * @extends Observable<string>
 */
class WebsocketClient extends _observable_js__WEBPACK_IMPORTED_MODULE_0__["Observable"] {
  /**
   * @param {string} url
   * @param {object} [opts]
   * @param {'arraybuffer' | 'blob' | null} [opts.binaryType] Set `ws.binaryType`
   */
  constructor (url, { binaryType } = {}) {
    super()
    this.url = url
    /**
     * @type {WebSocket?}
     */
    this.ws = null
    this.binaryType = binaryType || null
    this.connected = false
    this.connecting = false
    this.unsuccessfulReconnects = 0
    this.lastMessageReceived = 0
    /**
     * Whether to connect to other peers or not
     * @type {boolean}
     */
    this.shouldConnect = true
    this._checkInterval = setInterval(() => {
      if (this.connected && messageReconnectTimeout < _time_js__WEBPACK_IMPORTED_MODULE_1__["getUnixTime"]() - this.lastMessageReceived) {
        // no message received in a long time - not even your own awareness
        // updates (which are updated every 15 seconds)
        /** @type {WebSocket} */ (this.ws).close()
      }
    }, messageReconnectTimeout / 2)
    setupWS(this)
  }

  /**
   * @param {any} message
   */
  send (message) {
    if (this.ws) {
      this.ws.send(JSON.stringify(message))
    }
  }

  destroy () {
    clearInterval(this._checkInterval)
    this.disconnect()
    super.destroy()
  }

  disconnect () {
    this.shouldConnect = false
    if (this.ws !== null) {
      this.ws.close()
    }
  }

  connect () {
    this.shouldConnect = true
    if (!this.connected && this.ws === null) {
      setupWS(this)
    }
  }
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/simple-peer/simplepeer.min.js":
/*!****************************************************!*\
  !*** ./node_modules/simple-peer/simplepeer.min.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;(function(e){if(true)module.exports=e();else { var t; }})(function(){var t=Math.floor,n=Math.abs,r=Math.pow;return function(){function d(s,e,n){function t(o,i){if(!e[o]){if(!s[o]){var l="function"==typeof require&&require;if(!i&&l)return require(o,!0);if(r)return r(o,!0);var c=new Error("Cannot find module '"+o+"'");throw c.code="MODULE_NOT_FOUND",c}var a=e[o]={exports:{}};s[o][0].call(a.exports,function(e){var r=s[o][1][e];return t(r||e)},a,a.exports,d,s,e,n)}return e[o].exports}for(var r="function"==typeof require&&require,a=0;a<n.length;a++)t(n[a]);return t}return d}()({1:[function(e,t,n){'use strict';function r(e){var t=e.length;if(0<t%4)throw new Error("Invalid string. Length must be a multiple of 4");var n=e.indexOf("=");-1===n&&(n=t);var r=n===t?0:4-n%4;return[n,r]}function a(e,t,n){return 3*(t+n)/4-n}function o(e){var t,n,o=r(e),d=o[0],s=o[1],l=new p(a(e,d,s)),c=0,f=0<s?d-4:d;for(n=0;n<f;n+=4)t=u[e.charCodeAt(n)]<<18|u[e.charCodeAt(n+1)]<<12|u[e.charCodeAt(n+2)]<<6|u[e.charCodeAt(n+3)],l[c++]=255&t>>16,l[c++]=255&t>>8,l[c++]=255&t;return 2===s&&(t=u[e.charCodeAt(n)]<<2|u[e.charCodeAt(n+1)]>>4,l[c++]=255&t),1===s&&(t=u[e.charCodeAt(n)]<<10|u[e.charCodeAt(n+1)]<<4|u[e.charCodeAt(n+2)]>>2,l[c++]=255&t>>8,l[c++]=255&t),l}function d(e){return c[63&e>>18]+c[63&e>>12]+c[63&e>>6]+c[63&e]}function s(e,t,n){for(var r,a=[],o=t;o<n;o+=3)r=(16711680&e[o]<<16)+(65280&e[o+1]<<8)+(255&e[o+2]),a.push(d(r));return a.join("")}function l(e){for(var t,n=e.length,r=n%3,a=[],o=16383,d=0,l=n-r;d<l;d+=o)a.push(s(e,d,d+o>l?l:d+o));return 1===r?(t=e[n-1],a.push(c[t>>2]+c[63&t<<4]+"==")):2===r&&(t=(e[n-2]<<8)+e[n-1],a.push(c[t>>10]+c[63&t>>4]+c[63&t<<2]+"=")),a.join("")}n.byteLength=function(e){var t=r(e),n=t[0],a=t[1];return 3*(n+a)/4-a},n.toByteArray=o,n.fromByteArray=l;for(var c=[],u=[],p="undefined"==typeof Uint8Array?Array:Uint8Array,f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",g=0,h=f.length;g<h;++g)c[g]=f[g],u[f.charCodeAt(g)]=g;u[45]=62,u[95]=63},{}],2:[function(){},{}],3:[function(e,t,n){(function(t){/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */'use strict';var z=String.fromCharCode,K=Math.min;function a(e){if(2147483647<e)throw new RangeError("The value \""+e+"\" is invalid for option \"size\"");var n=new Uint8Array(e);return n.__proto__=t.prototype,n}function t(e,n,r){if("number"==typeof e){if("string"==typeof n)throw new TypeError("The \"string\" argument must be of type string. Received type number");return s(e)}return o(e,n,r)}function o(e,n,r){if("string"==typeof e)return l(e,n);if(ArrayBuffer.isView(e))return c(e);if(null==e)throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e);if(G(e,ArrayBuffer)||e&&G(e.buffer,ArrayBuffer))return u(e,n,r);if("number"==typeof e)throw new TypeError("The \"value\" argument must not be of type number. Received type number");var a=e.valueOf&&e.valueOf();if(null!=a&&a!==e)return t.from(a,n,r);var o=p(e);if(o)return o;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof e[Symbol.toPrimitive])return t.from(e[Symbol.toPrimitive]("string"),n,r);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof e)}function i(e){if("number"!=typeof e)throw new TypeError("\"size\" argument must be of type number");else if(0>e)throw new RangeError("The value \""+e+"\" is invalid for option \"size\"")}function d(e,t,n){return i(e),0>=e?a(e):void 0===t?a(e):"string"==typeof n?a(e).fill(t,n):a(e).fill(t)}function s(e){return i(e),a(0>e?0:0|f(e))}function l(e,n){if(("string"!=typeof n||""===n)&&(n="utf8"),!t.isEncoding(n))throw new TypeError("Unknown encoding: "+n);var r=0|h(e,n),o=a(r),i=o.write(e,n);return i!==r&&(o=o.slice(0,i)),o}function c(e){for(var t=0>e.length?0:0|f(e.length),n=a(t),r=0;r<t;r+=1)n[r]=255&e[r];return n}function u(e,n,r){if(0>n||e.byteLength<n)throw new RangeError("\"offset\" is outside of buffer bounds");if(e.byteLength<n+(r||0))throw new RangeError("\"length\" is outside of buffer bounds");var a;return a=void 0===n&&void 0===r?new Uint8Array(e):void 0===r?new Uint8Array(e,n):new Uint8Array(e,n,r),a.__proto__=t.prototype,a}function p(e){if(t.isBuffer(e)){var n=0|f(e.length),r=a(n);return 0===r.length?r:(e.copy(r,0,0,n),r)}return void 0===e.length?"Buffer"===e.type&&Array.isArray(e.data)?c(e.data):void 0:"number"!=typeof e.length||Y(e.length)?a(0):c(e)}function f(e){if(e>=2147483647)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+2147483647 .toString(16)+" bytes");return 0|e}function g(e){return+e!=e&&(e=0),t.alloc(+e)}function h(e,n){if(t.isBuffer(e))return e.length;if(ArrayBuffer.isView(e)||G(e,ArrayBuffer))return e.byteLength;if("string"!=typeof e)throw new TypeError("The \"string\" argument must be one of type string, Buffer, or ArrayBuffer. Received type "+typeof e);var r=e.length,a=2<arguments.length&&!0===arguments[2];if(!a&&0===r)return 0;for(var o=!1;;)switch(n){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return j(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return H(e).length;default:if(o)return a?-1:j(e).length;n=(""+n).toLowerCase(),o=!0;}}function _(e,t,n){var r=!1;if((void 0===t||0>t)&&(t=0),t>this.length)return"";if((void 0===n||n>this.length)&&(n=this.length),0>=n)return"";if(n>>>=0,t>>>=0,n<=t)return"";for(e||(e="utf8");;)switch(e){case"hex":return N(this,t,n);case"utf8":case"utf-8":return v(this,t,n);case"ascii":return A(this,t,n);case"latin1":case"binary":return x(this,t,n);case"base64":return T(this,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return I(this,t,n);default:if(r)throw new TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),r=!0;}}function m(e,t,n){var r=e[t];e[t]=e[n],e[n]=r}function b(e,n,r,a,o){if(0===e.length)return-1;if("string"==typeof r?(a=r,r=0):2147483647<r?r=2147483647:-2147483648>r&&(r=-2147483648),r=+r,Y(r)&&(r=o?0:e.length-1),0>r&&(r=e.length+r),r>=e.length){if(o)return-1;r=e.length-1}else if(0>r)if(o)r=0;else return-1;if("string"==typeof n&&(n=t.from(n,a)),t.isBuffer(n))return 0===n.length?-1:y(e,n,r,a,o);if("number"==typeof n)return n&=255,"function"==typeof Uint8Array.prototype.indexOf?o?Uint8Array.prototype.indexOf.call(e,n,r):Uint8Array.prototype.lastIndexOf.call(e,n,r):y(e,[n],r,a,o);throw new TypeError("val must be string, number or Buffer")}function y(e,t,n,r,a){function o(e,t){return 1===d?e[t]:e.readUInt16BE(t*d)}var d=1,s=e.length,l=t.length;if(void 0!==r&&(r=(r+"").toLowerCase(),"ucs2"===r||"ucs-2"===r||"utf16le"===r||"utf-16le"===r)){if(2>e.length||2>t.length)return-1;d=2,s/=2,l/=2,n/=2}var c;if(a){var u=-1;for(c=n;c<s;c++)if(o(e,c)!==o(t,-1===u?0:c-u))-1!==u&&(c-=c-u),u=-1;else if(-1===u&&(u=c),c-u+1===l)return u*d}else for(n+l>s&&(n=s-l),c=n;0<=c;c--){for(var p=!0,f=0;f<l;f++)if(o(e,c+f)!==o(t,f)){p=!1;break}if(p)return c}return-1}function C(e,t,n,r){n=+n||0;var a=e.length-n;r?(r=+r,r>a&&(r=a)):r=a;var o=t.length;r>o/2&&(r=o/2);for(var d,s=0;s<r;++s){if(d=parseInt(t.substr(2*s,2),16),Y(d))return s;e[n+s]=d}return s}function w(e,t,n,r){return V(j(t,e.length-n),e,n,r)}function R(e,t,n,r){return V(q(t),e,n,r)}function E(e,t,n,r){return R(e,t,n,r)}function S(e,t,n,r){return V(H(t),e,n,r)}function k(e,t,n,r){return V(W(t,e.length-n),e,n,r)}function T(e,t,n){return 0===t&&n===e.length?X.fromByteArray(e):X.fromByteArray(e.slice(t,n))}function v(e,t,n){n=K(e.length,n);for(var r=[],a=t;a<n;){var o=e[a],d=null,s=239<o?4:223<o?3:191<o?2:1;if(a+s<=n){var l,c,u,p;1===s?128>o&&(d=o):2===s?(l=e[a+1],128==(192&l)&&(p=(31&o)<<6|63&l,127<p&&(d=p))):3===s?(l=e[a+1],c=e[a+2],128==(192&l)&&128==(192&c)&&(p=(15&o)<<12|(63&l)<<6|63&c,2047<p&&(55296>p||57343<p)&&(d=p))):4===s?(l=e[a+1],c=e[a+2],u=e[a+3],128==(192&l)&&128==(192&c)&&128==(192&u)&&(p=(15&o)<<18|(63&l)<<12|(63&c)<<6|63&u,65535<p&&1114112>p&&(d=p))):void 0}null===d?(d=65533,s=1):65535<d&&(d-=65536,r.push(55296|1023&d>>>10),d=56320|1023&d),r.push(d),a+=s}return L(r)}function L(e){var t=e.length;if(t<=4096)return z.apply(String,e);for(var n="",r=0;r<t;)n+=z.apply(String,e.slice(r,r+=4096));return n}function A(e,t,n){var r="";n=K(e.length,n);for(var a=t;a<n;++a)r+=z(127&e[a]);return r}function x(e,t,n){var r="";n=K(e.length,n);for(var a=t;a<n;++a)r+=z(e[a]);return r}function N(e,t,n){var r=e.length;(!t||0>t)&&(t=0),(!n||0>n||n>r)&&(n=r);for(var a="",o=t;o<n;++o)a+=U(e[o]);return a}function I(e,t,n){for(var r=e.slice(t,n),a="",o=0;o<r.length;o+=2)a+=z(r[o]+256*r[o+1]);return a}function M(e,t,n){if(0!=e%1||0>e)throw new RangeError("offset is not uint");if(e+t>n)throw new RangeError("Trying to access beyond buffer length")}function P(e,n,r,a,o,i){if(!t.isBuffer(e))throw new TypeError("\"buffer\" argument must be a Buffer instance");if(n>o||n<i)throw new RangeError("\"value\" argument is out of bounds");if(r+a>e.length)throw new RangeError("Index out of range")}function D(e,t,n,r){if(n+r>e.length)throw new RangeError("Index out of range");if(0>n)throw new RangeError("Index out of range")}function F(e,t,n,r,a){return t=+t,n>>>=0,a||D(e,t,n,4,34028234663852886e22,-34028234663852886e22),$.write(e,t,n,r,23,4),n+4}function B(e,t,n,r,a){return t=+t,n>>>=0,a||D(e,t,n,8,17976931348623157e292,-17976931348623157e292),$.write(e,t,n,r,52,8),n+8}function O(e){if(e=e.split("=")[0],e=e.trim().replace(J,""),2>e.length)return"";for(;0!=e.length%4;)e+="=";return e}function U(e){return 16>e?"0"+e.toString(16):e.toString(16)}function j(e,t){t=t||1/0;for(var n,r=e.length,a=null,o=[],d=0;d<r;++d){if(n=e.charCodeAt(d),55295<n&&57344>n){if(!a){if(56319<n){-1<(t-=3)&&o.push(239,191,189);continue}else if(d+1===r){-1<(t-=3)&&o.push(239,191,189);continue}a=n;continue}if(56320>n){-1<(t-=3)&&o.push(239,191,189),a=n;continue}n=(a-55296<<10|n-56320)+65536}else a&&-1<(t-=3)&&o.push(239,191,189);if(a=null,128>n){if(0>(t-=1))break;o.push(n)}else if(2048>n){if(0>(t-=2))break;o.push(192|n>>6,128|63&n)}else if(65536>n){if(0>(t-=3))break;o.push(224|n>>12,128|63&n>>6,128|63&n)}else if(1114112>n){if(0>(t-=4))break;o.push(240|n>>18,128|63&n>>12,128|63&n>>6,128|63&n)}else throw new Error("Invalid code point")}return o}function q(e){for(var t=[],n=0;n<e.length;++n)t.push(255&e.charCodeAt(n));return t}function W(e,t){for(var n,r,a,o=[],d=0;d<e.length&&!(0>(t-=2));++d)n=e.charCodeAt(d),r=n>>8,a=n%256,o.push(a),o.push(r);return o}function H(e){return X.toByteArray(O(e))}function V(e,t,n,r){for(var a=0;a<r&&!(a+n>=t.length||a>=e.length);++a)t[a+n]=e[a];return a}function G(e,t){return e instanceof t||null!=e&&null!=e.constructor&&null!=e.constructor.name&&e.constructor.name===t.name}function Y(e){return e!==e}var X=e("base64-js"),$=e("ieee754");n.Buffer=t,n.SlowBuffer=g,n.INSPECT_MAX_BYTES=50;n.kMaxLength=2147483647,t.TYPED_ARRAY_SUPPORT=function(){try{var e=new Uint8Array(1);return e.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===e.foo()}catch(t){return!1}}(),t.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(t.prototype,"parent",{enumerable:!0,get:function(){return t.isBuffer(this)?this.buffer:void 0}}),Object.defineProperty(t.prototype,"offset",{enumerable:!0,get:function(){return t.isBuffer(this)?this.byteOffset:void 0}}),"undefined"!=typeof Symbol&&null!=Symbol.species&&t[Symbol.species]===t&&Object.defineProperty(t,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1}),t.poolSize=8192,t.from=function(e,t,n){return o(e,t,n)},t.prototype.__proto__=Uint8Array.prototype,t.__proto__=Uint8Array,t.alloc=function(e,t,n){return d(e,t,n)},t.allocUnsafe=function(e){return s(e)},t.allocUnsafeSlow=function(e){return s(e)},t.isBuffer=function(e){return null!=e&&!0===e._isBuffer&&e!==t.prototype},t.compare=function(e,n){if(G(e,Uint8Array)&&(e=t.from(e,e.offset,e.byteLength)),G(n,Uint8Array)&&(n=t.from(n,n.offset,n.byteLength)),!t.isBuffer(e)||!t.isBuffer(n))throw new TypeError("The \"buf1\", \"buf2\" arguments must be one of type Buffer or Uint8Array");if(e===n)return 0;for(var r=e.length,o=n.length,d=0,s=K(r,o);d<s;++d)if(e[d]!==n[d]){r=e[d],o=n[d];break}return r<o?-1:o<r?1:0},t.isEncoding=function(e){switch((e+"").toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1;}},t.concat=function(e,n){if(!Array.isArray(e))throw new TypeError("\"list\" argument must be an Array of Buffers");if(0===e.length)return t.alloc(0);var r;if(n===void 0)for(n=0,r=0;r<e.length;++r)n+=e[r].length;var a=t.allocUnsafe(n),o=0;for(r=0;r<e.length;++r){var d=e[r];if(G(d,Uint8Array)&&(d=t.from(d)),!t.isBuffer(d))throw new TypeError("\"list\" argument must be an Array of Buffers");d.copy(a,o),o+=d.length}return a},t.byteLength=h,t.prototype._isBuffer=!0,t.prototype.swap16=function(){var e=this.length;if(0!=e%2)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)m(this,t,t+1);return this},t.prototype.swap32=function(){var e=this.length;if(0!=e%4)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)m(this,t,t+3),m(this,t+1,t+2);return this},t.prototype.swap64=function(){var e=this.length;if(0!=e%8)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)m(this,t,t+7),m(this,t+1,t+6),m(this,t+2,t+5),m(this,t+3,t+4);return this},t.prototype.toString=function(){var e=this.length;return 0===e?"":0===arguments.length?v(this,0,e):_.apply(this,arguments)},t.prototype.toLocaleString=t.prototype.toString,t.prototype.equals=function(e){if(!t.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e||0===t.compare(this,e)},t.prototype.inspect=function(){var e="",t=n.INSPECT_MAX_BYTES;return e=this.toString("hex",0,t).replace(/(.{2})/g,"$1 ").trim(),this.length>t&&(e+=" ... "),"<Buffer "+e+">"},t.prototype.compare=function(e,n,r,a,o){if(G(e,Uint8Array)&&(e=t.from(e,e.offset,e.byteLength)),!t.isBuffer(e))throw new TypeError("The \"target\" argument must be one of type Buffer or Uint8Array. Received type "+typeof e);if(void 0===n&&(n=0),void 0===r&&(r=e?e.length:0),void 0===a&&(a=0),void 0===o&&(o=this.length),0>n||r>e.length||0>a||o>this.length)throw new RangeError("out of range index");if(a>=o&&n>=r)return 0;if(a>=o)return-1;if(n>=r)return 1;if(n>>>=0,r>>>=0,a>>>=0,o>>>=0,this===e)return 0;for(var d=o-a,s=r-n,l=K(d,s),c=this.slice(a,o),u=e.slice(n,r),p=0;p<l;++p)if(c[p]!==u[p]){d=c[p],s=u[p];break}return d<s?-1:s<d?1:0},t.prototype.includes=function(e,t,n){return-1!==this.indexOf(e,t,n)},t.prototype.indexOf=function(e,t,n){return b(this,e,t,n,!0)},t.prototype.lastIndexOf=function(e,t,n){return b(this,e,t,n,!1)},t.prototype.write=function(e,t,n,r){if(void 0===t)r="utf8",n=this.length,t=0;else if(void 0===n&&"string"==typeof t)r=t,n=this.length,t=0;else if(isFinite(t))t>>>=0,isFinite(n)?(n>>>=0,void 0===r&&(r="utf8")):(r=n,n=void 0);else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");var a=this.length-t;if((void 0===n||n>a)&&(n=a),0<e.length&&(0>n||0>t)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");r||(r="utf8");for(var o=!1;;)switch(r){case"hex":return C(this,e,t,n);case"utf8":case"utf-8":return w(this,e,t,n);case"ascii":return R(this,e,t,n);case"latin1":case"binary":return E(this,e,t,n);case"base64":return S(this,e,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return k(this,e,t,n);default:if(o)throw new TypeError("Unknown encoding: "+r);r=(""+r).toLowerCase(),o=!0;}},t.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};t.prototype.slice=function(e,n){var r=this.length;e=~~e,n=void 0===n?r:~~n,0>e?(e+=r,0>e&&(e=0)):e>r&&(e=r),0>n?(n+=r,0>n&&(n=0)):n>r&&(n=r),n<e&&(n=e);var a=this.subarray(e,n);return a.__proto__=t.prototype,a},t.prototype.readUIntLE=function(e,t,n){e>>>=0,t>>>=0,n||M(e,t,this.length);for(var r=this[e],a=1,o=0;++o<t&&(a*=256);)r+=this[e+o]*a;return r},t.prototype.readUIntBE=function(e,t,n){e>>>=0,t>>>=0,n||M(e,t,this.length);for(var r=this[e+--t],a=1;0<t&&(a*=256);)r+=this[e+--t]*a;return r},t.prototype.readUInt8=function(e,t){return e>>>=0,t||M(e,1,this.length),this[e]},t.prototype.readUInt16LE=function(e,t){return e>>>=0,t||M(e,2,this.length),this[e]|this[e+1]<<8},t.prototype.readUInt16BE=function(e,t){return e>>>=0,t||M(e,2,this.length),this[e]<<8|this[e+1]},t.prototype.readUInt32LE=function(e,t){return e>>>=0,t||M(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},t.prototype.readUInt32BE=function(e,t){return e>>>=0,t||M(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},t.prototype.readIntLE=function(e,t,n){e>>>=0,t>>>=0,n||M(e,t,this.length);for(var a=this[e],o=1,d=0;++d<t&&(o*=256);)a+=this[e+d]*o;return o*=128,a>=o&&(a-=r(2,8*t)),a},t.prototype.readIntBE=function(e,t,n){e>>>=0,t>>>=0,n||M(e,t,this.length);for(var a=t,o=1,d=this[e+--a];0<a&&(o*=256);)d+=this[e+--a]*o;return o*=128,d>=o&&(d-=r(2,8*t)),d},t.prototype.readInt8=function(e,t){return e>>>=0,t||M(e,1,this.length),128&this[e]?-1*(255-this[e]+1):this[e]},t.prototype.readInt16LE=function(e,t){e>>>=0,t||M(e,2,this.length);var n=this[e]|this[e+1]<<8;return 32768&n?4294901760|n:n},t.prototype.readInt16BE=function(e,t){e>>>=0,t||M(e,2,this.length);var n=this[e+1]|this[e]<<8;return 32768&n?4294901760|n:n},t.prototype.readInt32LE=function(e,t){return e>>>=0,t||M(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},t.prototype.readInt32BE=function(e,t){return e>>>=0,t||M(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},t.prototype.readFloatLE=function(e,t){return e>>>=0,t||M(e,4,this.length),$.read(this,e,!0,23,4)},t.prototype.readFloatBE=function(e,t){return e>>>=0,t||M(e,4,this.length),$.read(this,e,!1,23,4)},t.prototype.readDoubleLE=function(e,t){return e>>>=0,t||M(e,8,this.length),$.read(this,e,!0,52,8)},t.prototype.readDoubleBE=function(e,t){return e>>>=0,t||M(e,8,this.length),$.read(this,e,!1,52,8)},t.prototype.writeUIntLE=function(e,t,n,a){if(e=+e,t>>>=0,n>>>=0,!a){var o=r(2,8*n)-1;P(this,e,t,n,o,0)}var d=1,s=0;for(this[t]=255&e;++s<n&&(d*=256);)this[t+s]=255&e/d;return t+n},t.prototype.writeUIntBE=function(e,t,n,a){if(e=+e,t>>>=0,n>>>=0,!a){var o=r(2,8*n)-1;P(this,e,t,n,o,0)}var d=n-1,s=1;for(this[t+d]=255&e;0<=--d&&(s*=256);)this[t+d]=255&e/s;return t+n},t.prototype.writeUInt8=function(e,t,n){return e=+e,t>>>=0,n||P(this,e,t,1,255,0),this[t]=255&e,t+1},t.prototype.writeUInt16LE=function(e,t,n){return e=+e,t>>>=0,n||P(this,e,t,2,65535,0),this[t]=255&e,this[t+1]=e>>>8,t+2},t.prototype.writeUInt16BE=function(e,t,n){return e=+e,t>>>=0,n||P(this,e,t,2,65535,0),this[t]=e>>>8,this[t+1]=255&e,t+2},t.prototype.writeUInt32LE=function(e,t,n){return e=+e,t>>>=0,n||P(this,e,t,4,4294967295,0),this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e,t+4},t.prototype.writeUInt32BE=function(e,t,n){return e=+e,t>>>=0,n||P(this,e,t,4,4294967295,0),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},t.prototype.writeIntLE=function(e,t,n,a){if(e=+e,t>>>=0,!a){var o=r(2,8*n-1);P(this,e,t,n,o-1,-o)}var d=0,s=1,l=0;for(this[t]=255&e;++d<n&&(s*=256);)0>e&&0===l&&0!==this[t+d-1]&&(l=1),this[t+d]=255&(e/s>>0)-l;return t+n},t.prototype.writeIntBE=function(e,t,n,a){if(e=+e,t>>>=0,!a){var o=r(2,8*n-1);P(this,e,t,n,o-1,-o)}var d=n-1,s=1,l=0;for(this[t+d]=255&e;0<=--d&&(s*=256);)0>e&&0===l&&0!==this[t+d+1]&&(l=1),this[t+d]=255&(e/s>>0)-l;return t+n},t.prototype.writeInt8=function(e,t,n){return e=+e,t>>>=0,n||P(this,e,t,1,127,-128),0>e&&(e=255+e+1),this[t]=255&e,t+1},t.prototype.writeInt16LE=function(e,t,n){return e=+e,t>>>=0,n||P(this,e,t,2,32767,-32768),this[t]=255&e,this[t+1]=e>>>8,t+2},t.prototype.writeInt16BE=function(e,t,n){return e=+e,t>>>=0,n||P(this,e,t,2,32767,-32768),this[t]=e>>>8,this[t+1]=255&e,t+2},t.prototype.writeInt32LE=function(e,t,n){return e=+e,t>>>=0,n||P(this,e,t,4,2147483647,-2147483648),this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24,t+4},t.prototype.writeInt32BE=function(e,t,n){return e=+e,t>>>=0,n||P(this,e,t,4,2147483647,-2147483648),0>e&&(e=4294967295+e+1),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},t.prototype.writeFloatLE=function(e,t,n){return F(this,e,t,!0,n)},t.prototype.writeFloatBE=function(e,t,n){return F(this,e,t,!1,n)},t.prototype.writeDoubleLE=function(e,t,n){return B(this,e,t,!0,n)},t.prototype.writeDoubleBE=function(e,t,n){return B(this,e,t,!1,n)},t.prototype.copy=function(e,n,r,a){if(!t.isBuffer(e))throw new TypeError("argument should be a Buffer");if(r||(r=0),a||0===a||(a=this.length),n>=e.length&&(n=e.length),n||(n=0),0<a&&a<r&&(a=r),a===r)return 0;if(0===e.length||0===this.length)return 0;if(0>n)throw new RangeError("targetStart out of bounds");if(0>r||r>=this.length)throw new RangeError("Index out of range");if(0>a)throw new RangeError("sourceEnd out of bounds");a>this.length&&(a=this.length),e.length-n<a-r&&(a=e.length-n+r);var o=a-r;if(this===e&&"function"==typeof Uint8Array.prototype.copyWithin)this.copyWithin(n,r,a);else if(this===e&&r<n&&n<a)for(var d=o-1;0<=d;--d)e[d+n]=this[d+r];else Uint8Array.prototype.set.call(e,this.subarray(r,a),n);return o},t.prototype.fill=function(e,n,r,a){if("string"==typeof e){if("string"==typeof n?(a=n,n=0,r=this.length):"string"==typeof r&&(a=r,r=this.length),void 0!==a&&"string"!=typeof a)throw new TypeError("encoding must be a string");if("string"==typeof a&&!t.isEncoding(a))throw new TypeError("Unknown encoding: "+a);if(1===e.length){var o=e.charCodeAt(0);("utf8"===a&&128>o||"latin1"===a)&&(e=o)}}else"number"==typeof e&&(e&=255);if(0>n||this.length<n||this.length<r)throw new RangeError("Out of range index");if(r<=n)return this;n>>>=0,r=r===void 0?this.length:r>>>0,e||(e=0);var d;if("number"==typeof e)for(d=n;d<r;++d)this[d]=e;else{var s=t.isBuffer(e)?e:t.from(e,a),l=s.length;if(0===l)throw new TypeError("The value \""+e+"\" is invalid for argument \"value\"");for(d=0;d<r-n;++d)this[d+n]=s[d%l]}return this};var J=/[^+/0-9A-Za-z-_]/g}).call(this,e("buffer").Buffer)},{"base64-js":1,buffer:3,ieee754:8}],4:[function(e,t,n){(function(a){function o(){let e;try{e=n.storage.getItem("debug")}catch(e){}return!e&&"undefined"!=typeof a&&"env"in a&&(e=a.env.DEBUG),e}n.log=function(...e){return"object"==typeof console&&console.log&&console.log(...e)},n.formatArgs=function(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+t.exports.humanize(this.diff),!this.useColors)return;const n="color: "+this.color;e.splice(1,0,n,"color: inherit");let r=0,a=0;e[0].replace(/%[a-zA-Z%]/g,e=>{"%%"===e||(r++,"%c"===e&&(a=r))}),e.splice(a,0,n)},n.save=function(e){try{e?n.storage.setItem("debug",e):n.storage.removeItem("debug")}catch(e){}},n.load=o,n.useColors=function(){return!!("undefined"!=typeof window&&window.process&&("renderer"===window.process.type||window.process.__nwjs))||!("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))&&("undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&31<=parseInt(RegExp.$1,10)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))},n.storage=function(){try{return localStorage}catch(e){}}(),n.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],t.exports=e("./common")(n);const{formatters:i}=t.exports;i.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}}).call(this,e("_process"))},{"./common":5,_process:11}],5:[function(e,t){t.exports=function(t){function r(e){let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n),t|=0;return a.colors[n(t)%a.colors.length]}function a(e){function t(...e){if(!t.enabled)return;const r=t,o=+new Date,i=o-(n||o);r.diff=i,r.prev=n,r.curr=o,n=o,e[0]=a.coerce(e[0]),"string"!=typeof e[0]&&e.unshift("%O");let d=0;e[0]=e[0].replace(/%([a-zA-Z%])/g,(t,n)=>{if("%%"===t)return t;d++;const o=a.formatters[n];if("function"==typeof o){const n=e[d];t=o.call(r,n),e.splice(d,1),d--}return t}),a.formatArgs.call(r,e);const s=r.log||a.log;s.apply(r,e)}let n;return t.namespace=e,t.enabled=a.enabled(e),t.useColors=a.useColors(),t.color=r(e),t.destroy=o,t.extend=i,"function"==typeof a.init&&a.init(t),a.instances.push(t),t}function o(){const e=a.instances.indexOf(this);return-1!==e&&(a.instances.splice(e,1),!0)}function i(e,t){const n=a(this.namespace+("undefined"==typeof t?":":t)+e);return n.log=this.log,n}function d(e){return e.toString().substring(2,e.toString().length-2).replace(/\.\*\?$/,"*")}return a.debug=a,a.default=a,a.coerce=function(e){return e instanceof Error?e.stack||e.message:e},a.disable=function(){const e=[...a.names.map(d),...a.skips.map(d).map(e=>"-"+e)].join(",");return a.enable(""),e},a.enable=function(e){a.save(e),a.names=[],a.skips=[];let t;const n=("string"==typeof e?e:"").split(/[\s,]+/),r=n.length;for(t=0;t<r;t++)n[t]&&(e=n[t].replace(/\*/g,".*?"),"-"===e[0]?a.skips.push(new RegExp("^"+e.substr(1)+"$")):a.names.push(new RegExp("^"+e+"$")));for(t=0;t<a.instances.length;t++){const e=a.instances[t];e.enabled=a.enabled(e.namespace)}},a.enabled=function(e){if("*"===e[e.length-1])return!0;let t,n;for(t=0,n=a.skips.length;t<n;t++)if(a.skips[t].test(e))return!1;for(t=0,n=a.names.length;t<n;t++)if(a.names[t].test(e))return!0;return!1},a.humanize=e("ms"),Object.keys(t).forEach(e=>{a[e]=t[e]}),a.instances=[],a.names=[],a.skips=[],a.formatters={},a.selectColor=r,a.enable(a.load()),a}},{ms:10}],6:[function(e,t){function n(){this._events&&Object.prototype.hasOwnProperty.call(this,"_events")||(this._events=y(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0}function r(e){return void 0===e._maxListeners?n.defaultMaxListeners:e._maxListeners}function a(e,t,n){if(t)e.call(n);else for(var r=e.length,a=m(e,r),o=0;o<r;++o)a[o].call(n)}function d(e,t,n,r){if(t)e.call(n,r);else for(var a=e.length,o=m(e,a),d=0;d<a;++d)o[d].call(n,r)}function s(e,t,n,r,a){if(t)e.call(n,r,a);else for(var o=e.length,d=m(e,o),s=0;s<o;++s)d[s].call(n,r,a)}function l(e,t,n,r,a,o){if(t)e.call(n,r,a,o);else for(var d=e.length,s=m(e,d),l=0;l<d;++l)s[l].call(n,r,a,o)}function c(e,t,n,r){if(t)e.apply(n,r);else for(var a=e.length,o=m(e,a),d=0;d<a;++d)o[d].apply(n,r)}function u(e,t,n,a){var o,i,d;if("function"!=typeof n)throw new TypeError("\"listener\" argument must be a function");if(i=e._events,i?(i.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),i=e._events),d=i[t]):(i=e._events=y(null),e._eventsCount=0),!d)d=i[t]=n,++e._eventsCount;else if("function"==typeof d?d=i[t]=a?[n,d]:[d,n]:a?d.unshift(n):d.push(n),!d.warned&&(o=r(e),o&&0<o&&d.length>o)){d.warned=!0;var s=new Error("Possible EventEmitter memory leak detected. "+d.length+" \""+(t+"\" listeners added. Use emitter.setMaxListeners() to increase limit."));s.name="MaxListenersExceededWarning",s.emitter=e,s.type=t,s.count=d.length,"object"==typeof console&&console.warn&&console.warn("%s: %s",s.name,s.message)}return e}function p(){if(!this.fired)switch(this.target.removeListener(this.type,this.wrapFn),this.fired=!0,arguments.length){case 0:return this.listener.call(this.target);case 1:return this.listener.call(this.target,arguments[0]);case 2:return this.listener.call(this.target,arguments[0],arguments[1]);case 3:return this.listener.call(this.target,arguments[0],arguments[1],arguments[2]);default:for(var e=Array(arguments.length),t=0;t<e.length;++t)e[t]=arguments[t];this.listener.apply(this.target,e);}}function f(e,t,n){var r={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},a=w.call(p,r);return a.listener=n,r.wrapFn=a,a}function g(e,t,n){var r=e._events;if(!r)return[];var a=r[t];return a?"function"==typeof a?n?[a.listener||a]:[a]:n?b(a):m(a,a.length):[]}function h(e){var t=this._events;if(t){var n=t[e];if("function"==typeof n)return 1;if(n)return n.length}return 0}function _(e,t){for(var r=t,a=r+1,o=e.length;a<o;r+=1,a+=1)e[r]=e[a];e.pop()}function m(e,t){for(var n=Array(t),r=0;r<t;++r)n[r]=e[r];return n}function b(e){for(var t=Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}var y=Object.create||function(e){var t=function(){};return t.prototype=e,new t},C=Object.keys||function(e){var t=[];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.push(n);return n},w=Function.prototype.bind||function(e){var t=this;return function(){return t.apply(e,arguments)}};t.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0;var R,E=10;try{var S={};Object.defineProperty&&Object.defineProperty(S,"x",{value:0}),R=0===S.x}catch(e){R=!1}R?Object.defineProperty(n,"defaultMaxListeners",{enumerable:!0,get:function(){return E},set:function(e){if("number"!=typeof e||0>e||e!==e)throw new TypeError("\"defaultMaxListeners\" must be a positive number");E=e}}):n.defaultMaxListeners=E,n.prototype.setMaxListeners=function(e){if("number"!=typeof e||0>e||isNaN(e))throw new TypeError("\"n\" argument must be a positive number");return this._maxListeners=e,this},n.prototype.getMaxListeners=function(){return r(this)},n.prototype.emit=function(e){var t,n,r,o,u,p,f="error"===e;if(p=this._events,p)f=f&&null==p.error;else if(!f)return!1;if(f){if(1<arguments.length&&(t=arguments[1]),t instanceof Error)throw t;else{var g=new Error("Unhandled \"error\" event. ("+t+")");throw g.context=t,g}return!1}if(n=p[e],!n)return!1;var h="function"==typeof n;switch(r=arguments.length,r){case 1:a(n,h,this);break;case 2:d(n,h,this,arguments[1]);break;case 3:s(n,h,this,arguments[1],arguments[2]);break;case 4:l(n,h,this,arguments[1],arguments[2],arguments[3]);break;default:for(o=Array(r-1),u=1;u<r;u++)o[u-1]=arguments[u];c(n,h,this,o);}return!0},n.prototype.addListener=function(e,t){return u(this,e,t,!1)},n.prototype.on=n.prototype.addListener,n.prototype.prependListener=function(e,t){return u(this,e,t,!0)},n.prototype.once=function(e,t){if("function"!=typeof t)throw new TypeError("\"listener\" argument must be a function");return this.on(e,f(this,e,t)),this},n.prototype.prependOnceListener=function(e,t){if("function"!=typeof t)throw new TypeError("\"listener\" argument must be a function");return this.prependListener(e,f(this,e,t)),this},n.prototype.removeListener=function(e,t){var n,r,a,o,d;if("function"!=typeof t)throw new TypeError("\"listener\" argument must be a function");if(r=this._events,!r)return this;if(n=r[e],!n)return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=y(null):(delete r[e],r.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(a=-1,o=n.length-1;0<=o;o--)if(n[o]===t||n[o].listener===t){d=n[o].listener,a=o;break}if(0>a)return this;0===a?n.shift():_(n,a),1===n.length&&(r[e]=n[0]),r.removeListener&&this.emit("removeListener",e,d||t)}return this},n.prototype.removeAllListeners=function(e){var t,n,r;if(n=this._events,!n)return this;if(!n.removeListener)return 0===arguments.length?(this._events=y(null),this._eventsCount=0):n[e]&&(0==--this._eventsCount?this._events=y(null):delete n[e]),this;if(0===arguments.length){var a,o=C(n);for(r=0;r<o.length;++r)a=o[r],"removeListener"===a||this.removeAllListeners(a);return this.removeAllListeners("removeListener"),this._events=y(null),this._eventsCount=0,this}if(t=n[e],"function"==typeof t)this.removeListener(e,t);else if(t)for(r=t.length-1;0<=r;r--)this.removeListener(e,t[r]);return this},n.prototype.listeners=function(e){return g(this,e,!0)},n.prototype.rawListeners=function(e){return g(this,e,!1)},n.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):h.call(e,t)},n.prototype.listenerCount=h,n.prototype.eventNames=function(){return 0<this._eventsCount?Reflect.ownKeys(this._events):[]}},{}],7:[function(e,t){t.exports=function(){if("undefined"==typeof window)return null;var e={RTCPeerConnection:window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection,RTCSessionDescription:window.RTCSessionDescription||window.mozRTCSessionDescription||window.webkitRTCSessionDescription,RTCIceCandidate:window.RTCIceCandidate||window.mozRTCIceCandidate||window.webkitRTCIceCandidate};return e.RTCPeerConnection?e:null}},{}],8:[function(e,a,o){o.read=function(t,n,a,o,l){var c,u,p=8*l-o-1,f=(1<<p)-1,g=f>>1,h=-7,_=a?l-1:0,b=a?-1:1,d=t[n+_];for(_+=b,c=d&(1<<-h)-1,d>>=-h,h+=p;0<h;c=256*c+t[n+_],_+=b,h-=8);for(u=c&(1<<-h)-1,c>>=-h,h+=o;0<h;u=256*u+t[n+_],_+=b,h-=8);if(0===c)c=1-g;else{if(c===f)return u?NaN:(d?-1:1)*(1/0);u+=r(2,o),c-=g}return(d?-1:1)*u*r(2,c-o)},o.write=function(a,o,l,u,p,f){var _,b,y,g=Math.LN2,h=Math.log,C=8*f-p-1,w=(1<<C)-1,R=w>>1,E=23===p?r(2,-24)-r(2,-77):0,S=u?0:f-1,k=u?1:-1,d=0>o||0===o&&0>1/o?1:0;for(o=n(o),isNaN(o)||o===1/0?(b=isNaN(o)?1:0,_=w):(_=t(h(o)/g),1>o*(y=r(2,-_))&&(_--,y*=2),o+=1<=_+R?E/y:E*r(2,1-R),2<=o*y&&(_++,y/=2),_+R>=w?(b=0,_=w):1<=_+R?(b=(o*y-1)*r(2,p),_+=R):(b=o*r(2,R-1)*r(2,p),_=0));8<=p;a[l+S]=255&b,S+=k,b/=256,p-=8);for(_=_<<p|b,C+=p;0<C;a[l+S]=255&_,S+=k,_/=256,C-=8);a[l+S-k]|=128*d}},{}],9:[function(e,t){t.exports="function"==typeof Object.create?function(e,t){t&&(e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}))}:function(e,t){if(t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}}},{}],10:[function(e,t){var s=Math.round;function r(e){if(e+="",!(100<e.length)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();return"years"===n||"year"===n||"yrs"===n||"yr"===n||"y"===n?31557600000*r:"weeks"===n||"week"===n||"w"===n?604800000*r:"days"===n||"day"===n||"d"===n?86400000*r:"hours"===n||"hour"===n||"hrs"===n||"hr"===n||"h"===n?3600000*r:"minutes"===n||"minute"===n||"mins"===n||"min"===n||"m"===n?60000*r:"seconds"===n||"second"===n||"secs"===n||"sec"===n||"s"===n?1000*r:"milliseconds"===n||"millisecond"===n||"msecs"===n||"msec"===n||"ms"===n?r:void 0}}}function a(e){var t=n(e);return 86400000<=t?s(e/86400000)+"d":3600000<=t?s(e/3600000)+"h":60000<=t?s(e/60000)+"m":1000<=t?s(e/1000)+"s":e+"ms"}function o(e){var t=n(e);return 86400000<=t?i(e,t,86400000,"day"):3600000<=t?i(e,t,3600000,"hour"):60000<=t?i(e,t,60000,"minute"):1000<=t?i(e,t,1000,"second"):e+" ms"}function i(e,t,r,n){return s(e/r)+" "+n+(t>=1.5*r?"s":"")}var l=24*(60*60000);t.exports=function(e,t){t=t||{};var n=typeof e;if("string"==n&&0<e.length)return r(e);if("number"===n&&isFinite(e))return t.long?o(e):a(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},{}],11:[function(e,t){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function a(t){if(c===setTimeout)return setTimeout(t,0);if((c===n||!c)&&setTimeout)return c=setTimeout,setTimeout(t,0);try{return c(t,0)}catch(n){try{return c.call(null,t,0)}catch(n){return c.call(this,t,0)}}}function o(t){if(u===clearTimeout)return clearTimeout(t);if((u===r||!u)&&clearTimeout)return u=clearTimeout,clearTimeout(t);try{return u(t)}catch(n){try{return u.call(null,t)}catch(n){return u.call(this,t)}}}function i(){h&&f&&(h=!1,f.length?g=f.concat(g):_=-1,g.length&&d())}function d(){if(!h){var e=a(i);h=!0;for(var t=g.length;t;){for(f=g,g=[];++_<t;)f&&f[_].run();_=-1,t=g.length}f=null,h=!1,o(e)}}function s(e,t){this.fun=e,this.array=t}function l(){}var c,u,p=t.exports={};(function(){try{c="function"==typeof setTimeout?setTimeout:n}catch(t){c=n}try{u="function"==typeof clearTimeout?clearTimeout:r}catch(t){u=r}})();var f,g=[],h=!1,_=-1;p.nextTick=function(e){var t=Array(arguments.length-1);if(1<arguments.length)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];g.push(new s(e,t)),1!==g.length||h||a(d)},s.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=l,p.addListener=l,p.once=l,p.off=l,p.removeListener=l,p.removeAllListeners=l,p.emit=l,p.prependListener=l,p.prependOnceListener=l,p.listeners=function(){return[]},p.binding=function(){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},{}],12:[function(e,t){let n;t.exports="function"==typeof queueMicrotask?queueMicrotask:e=>(n||(n=Promise.resolve())).then(e).catch(e=>setTimeout(()=>{throw e},0))},{}],13:[function(e,t){(function(n,r){'use strict';var a=e("safe-buffer").Buffer,o=r.crypto||r.msCrypto;t.exports=o&&o.getRandomValues?function(e,t){if(e>4294967295)throw new RangeError("requested too many random bytes");var r=a.allocUnsafe(e);if(0<e)if(65536<e)for(var i=0;i<e;i+=65536)o.getRandomValues(r.slice(i,i+65536));else o.getRandomValues(r);return"function"==typeof t?n.nextTick(function(){t(null,r)}):r}:function(){throw new Error("Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11")}}).call(this,e("_process"),"undefined"==typeof global?"undefined"==typeof self?"undefined"==typeof window?{}:window:self:global)},{_process:11,"safe-buffer":29}],14:[function(e,t){'use strict';function n(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}function r(e,t,r){function a(e,n,r){return"string"==typeof t?t:t(e,n,r)}r||(r=Error);var o=function(e){function t(t,n,r){return e.call(this,a(t,n,r))||this}return n(t,e),t}(r);o.prototype.name=r.name,o.prototype.code=e,s[e]=o}function a(e,t){if(Array.isArray(e)){var n=e.length;return e=e.map(function(e){return e+""}),2<n?"one of ".concat(t," ").concat(e.slice(0,n-1).join(", "),", or ")+e[n-1]:2===n?"one of ".concat(t," ").concat(e[0]," or ").concat(e[1]):"of ".concat(t," ").concat(e[0])}return"of ".concat(t," ").concat(e+"")}function o(e,t,n){return e.substr(!n||0>n?0:+n,t.length)===t}function i(e,t,n){return(void 0===n||n>e.length)&&(n=e.length),e.substring(n-t.length,n)===t}function d(e,t,n){return"number"!=typeof n&&(n=0),!(n+t.length>e.length)&&-1!==e.indexOf(t,n)}var s={};r("ERR_INVALID_OPT_VALUE",function(e,t){return"The value \""+t+"\" is invalid for option \""+e+"\""},TypeError),r("ERR_INVALID_ARG_TYPE",function(e,t,n){var r;"string"==typeof t&&o(t,"not ")?(r="must not be",t=t.replace(/^not /,"")):r="must be";var s;if(i(e," argument"))s="The ".concat(e," ").concat(r," ").concat(a(t,"type"));else{var l=d(e,".")?"property":"argument";s="The \"".concat(e,"\" ").concat(l," ").concat(r," ").concat(a(t,"type"))}return s+=". Received type ".concat(typeof n),s},TypeError),r("ERR_STREAM_PUSH_AFTER_EOF","stream.push() after EOF"),r("ERR_METHOD_NOT_IMPLEMENTED",function(e){return"The "+e+" method is not implemented"}),r("ERR_STREAM_PREMATURE_CLOSE","Premature close"),r("ERR_STREAM_DESTROYED",function(e){return"Cannot call "+e+" after a stream was destroyed"}),r("ERR_MULTIPLE_CALLBACK","Callback called multiple times"),r("ERR_STREAM_CANNOT_PIPE","Cannot pipe, not readable"),r("ERR_STREAM_WRITE_AFTER_END","write after end"),r("ERR_STREAM_NULL_VALUES","May not write null values to stream",TypeError),r("ERR_UNKNOWN_ENCODING",function(e){return"Unknown encoding: "+e},TypeError),r("ERR_STREAM_UNSHIFT_AFTER_END_EVENT","stream.unshift() after end event"),t.exports.codes=s},{}],15:[function(e,t){(function(n){'use strict';function r(e){return this instanceof r?void(d.call(this,e),s.call(this,e),this.allowHalfOpen=!0,e&&(!1===e.readable&&(this.readable=!1),!1===e.writable&&(this.writable=!1),!1===e.allowHalfOpen&&(this.allowHalfOpen=!1,this.once("end",a)))):new r(e)}function a(){this._writableState.ended||n.nextTick(o,this)}function o(e){e.end()}var i=Object.keys||function(e){var t=[];for(var n in e)t.push(n);return t};t.exports=r;var d=e("./_stream_readable"),s=e("./_stream_writable");e("inherits")(r,d);for(var l,c=i(s.prototype),u=0;u<c.length;u++)l=c[u],r.prototype[l]||(r.prototype[l]=s.prototype[l]);Object.defineProperty(r.prototype,"writableHighWaterMark",{enumerable:!1,get:function(){return this._writableState.highWaterMark}}),Object.defineProperty(r.prototype,"writableBuffer",{enumerable:!1,get:function(){return this._writableState&&this._writableState.getBuffer()}}),Object.defineProperty(r.prototype,"writableLength",{enumerable:!1,get:function(){return this._writableState.length}}),Object.defineProperty(r.prototype,"destroyed",{enumerable:!1,get:function(){return void 0!==this._readableState&&void 0!==this._writableState&&this._readableState.destroyed&&this._writableState.destroyed},set:function(e){void 0===this._readableState||void 0===this._writableState||(this._readableState.destroyed=e,this._writableState.destroyed=e)}})}).call(this,e("_process"))},{"./_stream_readable":17,"./_stream_writable":19,_process:11,inherits:9}],16:[function(e,t){'use strict';function n(e){return this instanceof n?void r.call(this,e):new n(e)}t.exports=n;var r=e("./_stream_transform");e("inherits")(n,r),n.prototype._transform=function(e,t,n){n(null,e)}},{"./_stream_transform":18,inherits:9}],17:[function(e,t){(function(n,r){'use strict';function a(e){return P.from(e)}function o(e){return P.isBuffer(e)||e instanceof D}function i(e,t,n){return"function"==typeof e.prependListener?e.prependListener(t,n):void(e._events&&e._events[t]?Array.isArray(e._events[t])?e._events[t].unshift(n):e._events[t]=[n,e._events[t]]:e.on(t,n))}function d(t,n,r){A=A||e("./_stream_duplex"),t=t||{},"boolean"!=typeof r&&(r=n instanceof A),this.objectMode=!!t.objectMode,r&&(this.objectMode=this.objectMode||!!t.readableObjectMode),this.highWaterMark=H(this,t,"readableHighWaterMark",r),this.buffer=new j,this.length=0,this.pipes=null,this.pipesCount=0,this.flowing=null,this.ended=!1,this.endEmitted=!1,this.reading=!1,this.sync=!0,this.needReadable=!1,this.emittedReadable=!1,this.readableListening=!1,this.resumeScheduled=!1,this.paused=!0,this.emitClose=!1!==t.emitClose,this.autoDestroy=!!t.autoDestroy,this.destroyed=!1,this.defaultEncoding=t.defaultEncoding||"utf8",this.awaitDrain=0,this.readingMore=!1,this.decoder=null,this.encoding=null,t.encoding&&(!B&&(B=e("string_decoder/").StringDecoder),this.decoder=new B(t.encoding),this.encoding=t.encoding)}function s(t){if(A=A||e("./_stream_duplex"),!(this instanceof s))return new s(t);var n=this instanceof A;this._readableState=new d(t,this,n),this.readable=!0,t&&("function"==typeof t.read&&(this._read=t.read),"function"==typeof t.destroy&&(this._destroy=t.destroy)),M.call(this)}function l(e,t,n,r,o){x("readableAddChunk",t);var i=e._readableState;if(null===t)i.reading=!1,g(e,i);else{var d;if(o||(d=u(i,t)),d)X(e,d);else if(!(i.objectMode||t&&0<t.length))r||(i.reading=!1,m(e,i));else if("string"==typeof t||i.objectMode||Object.getPrototypeOf(t)===P.prototype||(t=a(t)),r)i.endEmitted?X(e,new K):c(e,i,t,!0);else if(i.ended)X(e,new Y);else{if(i.destroyed)return!1;i.reading=!1,i.decoder&&!n?(t=i.decoder.write(t),i.objectMode||0!==t.length?c(e,i,t,!1):m(e,i)):c(e,i,t,!1)}}return!i.ended&&(i.length<i.highWaterMark||0===i.length)}function c(e,t,n,r){t.flowing&&0===t.length&&!t.sync?(t.awaitDrain=0,e.emit("data",n)):(t.length+=t.objectMode?1:n.length,r?t.buffer.unshift(n):t.buffer.push(n),t.needReadable&&h(e)),m(e,t)}function u(e,t){var n;return o(t)||"string"==typeof t||void 0===t||e.objectMode||(n=new G("chunk",["string","Buffer","Uint8Array"],t)),n}function p(e){return 1073741824<=e?e=1073741824:(e--,e|=e>>>1,e|=e>>>2,e|=e>>>4,e|=e>>>8,e|=e>>>16,e++),e}function f(e,t){return 0>=e||0===t.length&&t.ended?0:t.objectMode?1:e===e?(e>t.highWaterMark&&(t.highWaterMark=p(e)),e<=t.length?e:t.ended?t.length:(t.needReadable=!0,0)):t.flowing&&t.length?t.buffer.head.data.length:t.length}function g(e,t){if(x("onEofChunk"),!t.ended){if(t.decoder){var n=t.decoder.end();n&&n.length&&(t.buffer.push(n),t.length+=t.objectMode?1:n.length)}t.ended=!0,t.sync?h(e):(t.needReadable=!1,!t.emittedReadable&&(t.emittedReadable=!0,_(e)))}}function h(e){var t=e._readableState;x("emitReadable",t.needReadable,t.emittedReadable),t.needReadable=!1,t.emittedReadable||(x("emitReadable",t.flowing),t.emittedReadable=!0,n.nextTick(_,e))}function _(e){var t=e._readableState;x("emitReadable_",t.destroyed,t.length,t.ended),!t.destroyed&&(t.length||t.ended)&&(e.emit("readable"),t.emittedReadable=!1),t.needReadable=!t.flowing&&!t.ended&&t.length<=t.highWaterMark,S(e)}function m(e,t){t.readingMore||(t.readingMore=!0,n.nextTick(b,e,t))}function b(e,t){for(;!t.reading&&!t.ended&&(t.length<t.highWaterMark||t.flowing&&0===t.length);){var n=t.length;if(x("maybeReadMore read 0"),e.read(0),n===t.length)break}t.readingMore=!1}function y(e){return function(){var t=e._readableState;x("pipeOnDrain",t.awaitDrain),t.awaitDrain&&t.awaitDrain--,0===t.awaitDrain&&I(e,"data")&&(t.flowing=!0,S(e))}}function C(e){var t=e._readableState;t.readableListening=0<e.listenerCount("readable"),t.resumeScheduled&&!t.paused?t.flowing=!0:0<e.listenerCount("data")&&e.resume()}function w(e){x("readable nexttick read 0"),e.read(0)}function R(e,t){t.resumeScheduled||(t.resumeScheduled=!0,n.nextTick(E,e,t))}function E(e,t){x("resume",t.reading),t.reading||e.read(0),t.resumeScheduled=!1,e.emit("resume"),S(e),t.flowing&&!t.reading&&e.read(0)}function S(e){var t=e._readableState;for(x("flow",t.flowing);t.flowing&&null!==e.read(););}function k(e,t){if(0===t.length)return null;var n;return t.objectMode?n=t.buffer.shift():!e||e>=t.length?(n=t.decoder?t.buffer.join(""):1===t.buffer.length?t.buffer.first():t.buffer.concat(t.length),t.buffer.clear()):n=t.buffer.consume(e,t.decoder),n}function T(e){var t=e._readableState;x("endReadable",t.endEmitted),t.endEmitted||(t.ended=!0,n.nextTick(v,t,e))}function v(e,t){if(x("endReadableNT",e.endEmitted,e.length),!e.endEmitted&&0===e.length&&(e.endEmitted=!0,t.readable=!1,t.emit("end"),e.autoDestroy)){var n=t._writableState;(!n||n.autoDestroy&&n.finished)&&t.destroy()}}function L(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1}t.exports=s;var A;s.ReadableState=d;var x,N=e("events").EventEmitter,I=function(e,t){return e.listeners(t).length},M=e("./internal/streams/stream"),P=e("buffer").Buffer,D=r.Uint8Array||function(){},F=e("util");x=F&&F.debuglog?F.debuglog("stream"):function(){};var B,O,U,j=e("./internal/streams/buffer_list"),q=e("./internal/streams/destroy"),W=e("./internal/streams/state"),H=W.getHighWaterMark,V=e("../errors").codes,G=V.ERR_INVALID_ARG_TYPE,Y=V.ERR_STREAM_PUSH_AFTER_EOF,z=V.ERR_METHOD_NOT_IMPLEMENTED,K=V.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;e("inherits")(s,M);var X=q.errorOrDestroy,$=["error","close","destroy","pause","resume"];Object.defineProperty(s.prototype,"destroyed",{enumerable:!1,get:function(){return void 0!==this._readableState&&this._readableState.destroyed},set:function(e){this._readableState&&(this._readableState.destroyed=e)}}),s.prototype.destroy=q.destroy,s.prototype._undestroy=q.undestroy,s.prototype._destroy=function(e,t){t(e)},s.prototype.push=function(e,t){var n,r=this._readableState;return r.objectMode?n=!0:"string"==typeof e&&(t=t||r.defaultEncoding,t!==r.encoding&&(e=P.from(e,t),t=""),n=!0),l(this,e,t,!1,n)},s.prototype.unshift=function(e){return l(this,e,null,!0,!1)},s.prototype.isPaused=function(){return!1===this._readableState.flowing},s.prototype.setEncoding=function(t){B||(B=e("string_decoder/").StringDecoder);var n=new B(t);this._readableState.decoder=n,this._readableState.encoding=this._readableState.decoder.encoding;for(var r=this._readableState.buffer.head,a="";null!==r;)a+=n.write(r.data),r=r.next;return this._readableState.buffer.clear(),""!==a&&this._readableState.buffer.push(a),this._readableState.length=a.length,this};s.prototype.read=function(e){x("read",e),e=parseInt(e,10);var t=this._readableState,r=e;if(0!==e&&(t.emittedReadable=!1),0===e&&t.needReadable&&((0===t.highWaterMark?0<t.length:t.length>=t.highWaterMark)||t.ended))return x("read: emitReadable",t.length,t.ended),0===t.length&&t.ended?T(this):h(this),null;if(e=f(e,t),0===e&&t.ended)return 0===t.length&&T(this),null;var a=t.needReadable;x("need readable",a),(0===t.length||t.length-e<t.highWaterMark)&&(a=!0,x("length less than watermark",a)),t.ended||t.reading?(a=!1,x("reading or ended",a)):a&&(x("do read"),t.reading=!0,t.sync=!0,0===t.length&&(t.needReadable=!0),this._read(t.highWaterMark),t.sync=!1,!t.reading&&(e=f(r,t)));var o;return o=0<e?k(e,t):null,null===o?(t.needReadable=t.length<=t.highWaterMark,e=0):(t.length-=e,t.awaitDrain=0),0===t.length&&(!t.ended&&(t.needReadable=!0),r!==e&&t.ended&&T(this)),null!==o&&this.emit("data",o),o},s.prototype._read=function(){X(this,new z("_read()"))},s.prototype.pipe=function(e,t){function r(e,t){x("onunpipe"),e===p&&t&&!1===t.hasUnpiped&&(t.hasUnpiped=!0,o())}function a(){x("onend"),e.end()}function o(){x("cleanup"),e.removeListener("close",l),e.removeListener("finish",c),e.removeListener("drain",_),e.removeListener("error",s),e.removeListener("unpipe",r),p.removeListener("end",a),p.removeListener("end",u),p.removeListener("data",d),m=!0,f.awaitDrain&&(!e._writableState||e._writableState.needDrain)&&_()}function d(t){x("ondata");var n=e.write(t);x("dest.write",n),!1===n&&((1===f.pipesCount&&f.pipes===e||1<f.pipesCount&&-1!==L(f.pipes,e))&&!m&&(x("false write response, pause",f.awaitDrain),f.awaitDrain++),p.pause())}function s(t){x("onerror",t),u(),e.removeListener("error",s),0===I(e,"error")&&X(e,t)}function l(){e.removeListener("finish",c),u()}function c(){x("onfinish"),e.removeListener("close",l),u()}function u(){x("unpipe"),p.unpipe(e)}var p=this,f=this._readableState;switch(f.pipesCount){case 0:f.pipes=e;break;case 1:f.pipes=[f.pipes,e];break;default:f.pipes.push(e);}f.pipesCount+=1,x("pipe count=%d opts=%j",f.pipesCount,t);var g=(!t||!1!==t.end)&&e!==n.stdout&&e!==n.stderr,h=g?a:u;f.endEmitted?n.nextTick(h):p.once("end",h),e.on("unpipe",r);var _=y(p);e.on("drain",_);var m=!1;return p.on("data",d),i(e,"error",s),e.once("close",l),e.once("finish",c),e.emit("pipe",p),f.flowing||(x("pipe resume"),p.resume()),e},s.prototype.unpipe=function(e){var t=this._readableState,n={hasUnpiped:!1};if(0===t.pipesCount)return this;if(1===t.pipesCount)return e&&e!==t.pipes?this:(e||(e=t.pipes),t.pipes=null,t.pipesCount=0,t.flowing=!1,e&&e.emit("unpipe",this,n),this);if(!e){var r=t.pipes,a=t.pipesCount;t.pipes=null,t.pipesCount=0,t.flowing=!1;for(var o=0;o<a;o++)r[o].emit("unpipe",this,{hasUnpiped:!1});return this}var d=L(t.pipes,e);return-1===d?this:(t.pipes.splice(d,1),t.pipesCount-=1,1===t.pipesCount&&(t.pipes=t.pipes[0]),e.emit("unpipe",this,n),this)},s.prototype.on=function(e,t){var r=M.prototype.on.call(this,e,t),a=this._readableState;return"data"===e?(a.readableListening=0<this.listenerCount("readable"),!1!==a.flowing&&this.resume()):"readable"==e&&!a.endEmitted&&!a.readableListening&&(a.readableListening=a.needReadable=!0,a.flowing=!1,a.emittedReadable=!1,x("on readable",a.length,a.reading),a.length?h(this):!a.reading&&n.nextTick(w,this)),r},s.prototype.addListener=s.prototype.on,s.prototype.removeListener=function(e,t){var r=M.prototype.removeListener.call(this,e,t);return"readable"===e&&n.nextTick(C,this),r},s.prototype.removeAllListeners=function(e){var t=M.prototype.removeAllListeners.apply(this,arguments);return("readable"===e||void 0===e)&&n.nextTick(C,this),t},s.prototype.resume=function(){var e=this._readableState;return e.flowing||(x("resume"),e.flowing=!e.readableListening,R(this,e)),e.paused=!1,this},s.prototype.pause=function(){return x("call pause flowing=%j",this._readableState.flowing),!1!==this._readableState.flowing&&(x("pause"),this._readableState.flowing=!1,this.emit("pause")),this._readableState.paused=!0,this},s.prototype.wrap=function(e){var t=this,r=this._readableState,a=!1;for(var o in e.on("end",function(){if(x("wrapped end"),r.decoder&&!r.ended){var e=r.decoder.end();e&&e.length&&t.push(e)}t.push(null)}),e.on("data",function(n){if((x("wrapped data"),r.decoder&&(n=r.decoder.write(n)),!(r.objectMode&&(null===n||void 0===n)))&&(r.objectMode||n&&n.length)){var o=t.push(n);o||(a=!0,e.pause())}}),e)void 0===this[o]&&"function"==typeof e[o]&&(this[o]=function(t){return function(){return e[t].apply(e,arguments)}}(o));for(var i=0;i<$.length;i++)e.on($[i],this.emit.bind(this,$[i]));return this._read=function(t){x("wrapped _read",t),a&&(a=!1,e.resume())},this},"function"==typeof Symbol&&(s.prototype[Symbol.asyncIterator]=function(){return void 0===O&&(O=e("./internal/streams/async_iterator")),O(this)}),Object.defineProperty(s.prototype,"readableHighWaterMark",{enumerable:!1,get:function(){return this._readableState.highWaterMark}}),Object.defineProperty(s.prototype,"readableBuffer",{enumerable:!1,get:function(){return this._readableState&&this._readableState.buffer}}),Object.defineProperty(s.prototype,"readableFlowing",{enumerable:!1,get:function(){return this._readableState.flowing},set:function(e){this._readableState&&(this._readableState.flowing=e)}}),s._fromList=k,Object.defineProperty(s.prototype,"readableLength",{enumerable:!1,get:function(){return this._readableState.length}}),"function"==typeof Symbol&&(s.from=function(t,n){return void 0===U&&(U=e("./internal/streams/from")),U(s,t,n)})}).call(this,e("_process"),"undefined"==typeof global?"undefined"==typeof self?"undefined"==typeof window?{}:window:self:global)},{"../errors":14,"./_stream_duplex":15,"./internal/streams/async_iterator":20,"./internal/streams/buffer_list":21,"./internal/streams/destroy":22,"./internal/streams/from":24,"./internal/streams/state":26,"./internal/streams/stream":27,_process:11,buffer:3,events:6,inherits:9,"string_decoder/":30,util:2}],18:[function(e,t){'use strict';function n(e,t){var n=this._transformState;n.transforming=!1;var r=n.writecb;if(null===r)return this.emit("error",new s);n.writechunk=null,n.writecb=null,null!=t&&this.push(t),r(e);var a=this._readableState;a.reading=!1,(a.needReadable||a.length<a.highWaterMark)&&this._read(a.highWaterMark)}function r(e){return this instanceof r?void(u.call(this,e),this._transformState={afterTransform:n.bind(this),needTransform:!1,transforming:!1,writecb:null,writechunk:null,writeencoding:null},this._readableState.needReadable=!0,this._readableState.sync=!1,e&&("function"==typeof e.transform&&(this._transform=e.transform),"function"==typeof e.flush&&(this._flush=e.flush)),this.on("prefinish",a)):new r(e)}function a(){var e=this;"function"!=typeof this._flush||this._readableState.destroyed?o(this,null,null):this._flush(function(t,n){o(e,t,n)})}function o(e,t,n){if(t)return e.emit("error",t);if(null!=n&&e.push(n),e._writableState.length)throw new c;if(e._transformState.transforming)throw new l;return e.push(null)}t.exports=r;var i=e("../errors").codes,d=i.ERR_METHOD_NOT_IMPLEMENTED,s=i.ERR_MULTIPLE_CALLBACK,l=i.ERR_TRANSFORM_ALREADY_TRANSFORMING,c=i.ERR_TRANSFORM_WITH_LENGTH_0,u=e("./_stream_duplex");e("inherits")(r,u),r.prototype.push=function(e,t){return this._transformState.needTransform=!1,u.prototype.push.call(this,e,t)},r.prototype._transform=function(e,t,n){n(new d("_transform()"))},r.prototype._write=function(e,t,n){var r=this._transformState;if(r.writecb=n,r.writechunk=e,r.writeencoding=t,!r.transforming){var a=this._readableState;(r.needTransform||a.needReadable||a.length<a.highWaterMark)&&this._read(a.highWaterMark)}},r.prototype._read=function(){var e=this._transformState;null===e.writechunk||e.transforming?e.needTransform=!0:(e.transforming=!0,this._transform(e.writechunk,e.writeencoding,e.afterTransform))},r.prototype._destroy=function(e,t){u.prototype._destroy.call(this,e,function(e){t(e)})}},{"../errors":14,"./_stream_duplex":15,inherits:9}],19:[function(e,t){(function(n,r){'use strict';function a(e){var t=this;this.next=null,this.entry=null,this.finish=function(){T(t,e)}}function o(e){return x.from(e)}function i(e){return x.isBuffer(e)||e instanceof N}function d(){}function s(t,n,r){v=v||e("./_stream_duplex"),t=t||{},"boolean"!=typeof r&&(r=n instanceof v),this.objectMode=!!t.objectMode,r&&(this.objectMode=this.objectMode||!!t.writableObjectMode),this.highWaterMark=P(this,t,"writableHighWaterMark",r),this.finalCalled=!1,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1,this.destroyed=!1;var o=!1===t.decodeStrings;this.decodeStrings=!o,this.defaultEncoding=t.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.corked=0,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(e){m(n,e)},this.writecb=null,this.writelen=0,this.bufferedRequest=null,this.lastBufferedRequest=null,this.pendingcb=0,this.prefinished=!1,this.errorEmitted=!1,this.emitClose=!1!==t.emitClose,this.autoDestroy=!!t.autoDestroy,this.bufferedRequestCount=0,this.corkedRequestsFree=new a(this)}function l(t){v=v||e("./_stream_duplex");var n=this instanceof v;return n||G.call(l,this)?void(this._writableState=new s(t,this,n),this.writable=!0,t&&("function"==typeof t.write&&(this._write=t.write),"function"==typeof t.writev&&(this._writev=t.writev),"function"==typeof t.destroy&&(this._destroy=t.destroy),"function"==typeof t.final&&(this._final=t.final)),A.call(this)):new l(t)}function c(e,t){var r=new W;V(e,r),n.nextTick(t,r)}function u(e,t,r,a){var o;return null===r?o=new q:"string"!=typeof r&&!t.objectMode&&(o=new F("chunk",["string","Buffer"],r)),!o||(V(e,o),n.nextTick(a,o),!1)}function p(e,t,n){return e.objectMode||!1===e.decodeStrings||"string"!=typeof t||(t=x.from(t,n)),t}function f(e,t,n,r,a,o){if(!n){var i=p(t,r,a);r!==i&&(n=!0,a="buffer",r=i)}var d=t.objectMode?1:r.length;t.length+=d;var s=t.length<t.highWaterMark;if(s||(t.needDrain=!0),t.writing||t.corked){var l=t.lastBufferedRequest;t.lastBufferedRequest={chunk:r,encoding:a,isBuf:n,callback:o,next:null},l?l.next=t.lastBufferedRequest:t.bufferedRequest=t.lastBufferedRequest,t.bufferedRequestCount+=1}else g(e,t,!1,d,r,a,o);return s}function g(e,t,n,r,a,o,i){t.writelen=r,t.writecb=i,t.writing=!0,t.sync=!0,t.destroyed?t.onwrite(new j("write")):n?e._writev(a,t.onwrite):e._write(a,o,t.onwrite),t.sync=!1}function h(e,t,r,a,o){--t.pendingcb,r?(n.nextTick(o,a),n.nextTick(S,e,t),e._writableState.errorEmitted=!0,V(e,a)):(o(a),e._writableState.errorEmitted=!0,V(e,a),S(e,t))}function _(e){e.writing=!1,e.writecb=null,e.length-=e.writelen,e.writelen=0}function m(e,t){var r=e._writableState,a=r.sync,o=r.writecb;if("function"!=typeof o)throw new O;if(_(r),t)h(e,r,a,t,o);else{var i=w(r)||e.destroyed;i||r.corked||r.bufferProcessing||!r.bufferedRequest||C(e,r),a?n.nextTick(b,e,r,i,o):b(e,r,i,o)}}function b(e,t,n,r){n||y(e,t),t.pendingcb--,r(),S(e,t)}function y(e,t){0===t.length&&t.needDrain&&(t.needDrain=!1,e.emit("drain"))}function C(e,t){t.bufferProcessing=!0;var n=t.bufferedRequest;if(e._writev&&n&&n.next){var r=t.bufferedRequestCount,o=Array(r),i=t.corkedRequestsFree;i.entry=n;for(var d=0,s=!0;n;)o[d]=n,n.isBuf||(s=!1),n=n.next,d+=1;o.allBuffers=s,g(e,t,!0,t.length,o,"",i.finish),t.pendingcb++,t.lastBufferedRequest=null,i.next?(t.corkedRequestsFree=i.next,i.next=null):t.corkedRequestsFree=new a(t),t.bufferedRequestCount=0}else{for(;n;){var l=n.chunk,c=n.encoding,u=n.callback,p=t.objectMode?1:l.length;if(g(e,t,!1,p,l,c,u),n=n.next,t.bufferedRequestCount--,t.writing)break}null===n&&(t.lastBufferedRequest=null)}t.bufferedRequest=n,t.bufferProcessing=!1}function w(e){return e.ending&&0===e.length&&null===e.bufferedRequest&&!e.finished&&!e.writing}function R(e,t){e._final(function(n){t.pendingcb--,n&&V(e,n),t.prefinished=!0,e.emit("prefinish"),S(e,t)})}function E(e,t){t.prefinished||t.finalCalled||("function"!=typeof e._final||t.destroyed?(t.prefinished=!0,e.emit("prefinish")):(t.pendingcb++,t.finalCalled=!0,n.nextTick(R,e,t)))}function S(e,t){var n=w(t);if(n&&(E(e,t),0===t.pendingcb&&(t.finished=!0,e.emit("finish"),t.autoDestroy))){var r=e._readableState;(!r||r.autoDestroy&&r.endEmitted)&&e.destroy()}return n}function k(e,t,r){t.ending=!0,S(e,t),r&&(t.finished?n.nextTick(r):e.once("finish",r)),t.ended=!0,e.writable=!1}function T(e,t,n){var r=e.entry;for(e.entry=null;r;){var a=r.callback;t.pendingcb--,a(n),r=r.next}t.corkedRequestsFree.next=e}t.exports=l;var v;l.WritableState=s;var L={deprecate:e("util-deprecate")},A=e("./internal/streams/stream"),x=e("buffer").Buffer,N=r.Uint8Array||function(){},I=e("./internal/streams/destroy"),M=e("./internal/streams/state"),P=M.getHighWaterMark,D=e("../errors").codes,F=D.ERR_INVALID_ARG_TYPE,B=D.ERR_METHOD_NOT_IMPLEMENTED,O=D.ERR_MULTIPLE_CALLBACK,U=D.ERR_STREAM_CANNOT_PIPE,j=D.ERR_STREAM_DESTROYED,q=D.ERR_STREAM_NULL_VALUES,W=D.ERR_STREAM_WRITE_AFTER_END,H=D.ERR_UNKNOWN_ENCODING,V=I.errorOrDestroy;e("inherits")(l,A),s.prototype.getBuffer=function(){for(var e=this.bufferedRequest,t=[];e;)t.push(e),e=e.next;return t},function(){try{Object.defineProperty(s.prototype,"buffer",{get:L.deprecate(function(){return this.getBuffer()},"_writableState.buffer is deprecated. Use _writableState.getBuffer instead.","DEP0003")})}catch(e){}}();var G;"function"==typeof Symbol&&Symbol.hasInstance&&"function"==typeof Function.prototype[Symbol.hasInstance]?(G=Function.prototype[Symbol.hasInstance],Object.defineProperty(l,Symbol.hasInstance,{value:function(e){return!!G.call(this,e)||!(this!==l)&&e&&e._writableState instanceof s}})):G=function(e){return e instanceof this},l.prototype.pipe=function(){V(this,new U)},l.prototype.write=function(e,t,n){var r=this._writableState,a=!1,s=!r.objectMode&&i(e);return s&&!x.isBuffer(e)&&(e=o(e)),"function"==typeof t&&(n=t,t=null),s?t="buffer":!t&&(t=r.defaultEncoding),"function"!=typeof n&&(n=d),r.ending?c(this,n):(s||u(this,r,e,n))&&(r.pendingcb++,a=f(this,r,s,e,t,n)),a},l.prototype.cork=function(){this._writableState.corked++},l.prototype.uncork=function(){var e=this._writableState;e.corked&&(e.corked--,!e.writing&&!e.corked&&!e.bufferProcessing&&e.bufferedRequest&&C(this,e))},l.prototype.setDefaultEncoding=function(e){if("string"==typeof e&&(e=e.toLowerCase()),!(-1<["hex","utf8","utf-8","ascii","binary","base64","ucs2","ucs-2","utf16le","utf-16le","raw"].indexOf((e+"").toLowerCase())))throw new H(e);return this._writableState.defaultEncoding=e,this},Object.defineProperty(l.prototype,"writableBuffer",{enumerable:!1,get:function(){return this._writableState&&this._writableState.getBuffer()}}),Object.defineProperty(l.prototype,"writableHighWaterMark",{enumerable:!1,get:function(){return this._writableState.highWaterMark}}),l.prototype._write=function(e,t,n){n(new B("_write()"))},l.prototype._writev=null,l.prototype.end=function(e,t,n){var r=this._writableState;return"function"==typeof e?(n=e,e=null,t=null):"function"==typeof t&&(n=t,t=null),null!==e&&void 0!==e&&this.write(e,t),r.corked&&(r.corked=1,this.uncork()),r.ending||k(this,r,n),this},Object.defineProperty(l.prototype,"writableLength",{enumerable:!1,get:function(){return this._writableState.length}}),Object.defineProperty(l.prototype,"destroyed",{enumerable:!1,get:function(){return void 0!==this._writableState&&this._writableState.destroyed},set:function(e){this._writableState&&(this._writableState.destroyed=e)}}),l.prototype.destroy=I.destroy,l.prototype._undestroy=I.undestroy,l.prototype._destroy=function(e,t){t(e)}}).call(this,e("_process"),"undefined"==typeof global?"undefined"==typeof self?"undefined"==typeof window?{}:window:self:global)},{"../errors":14,"./_stream_duplex":15,"./internal/streams/destroy":22,"./internal/streams/state":26,"./internal/streams/stream":27,_process:11,buffer:3,inherits:9,"util-deprecate":31}],20:[function(e,t){(function(n){'use strict';function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){return{value:e,done:t}}function o(e){var t=e[c];if(null!==t){var n=e[_].read();null!==n&&(e[g]=null,e[c]=null,e[u]=null,t(a(n,!1)))}}function i(e){n.nextTick(o,e)}function d(e,t){return function(n,r){e.then(function(){return t[f]?void n(a(void 0,!0)):void t[h](n,r)},r)}}var s,l=e("./end-of-stream"),c=Symbol("lastResolve"),u=Symbol("lastReject"),p=Symbol("error"),f=Symbol("ended"),g=Symbol("lastPromise"),h=Symbol("handlePromise"),_=Symbol("stream"),m=Object.getPrototypeOf(function(){}),b=Object.setPrototypeOf((s={get stream(){return this[_]},next:function(){var e=this,t=this[p];if(null!==t)return Promise.reject(t);if(this[f])return Promise.resolve(a(void 0,!0));if(this[_].destroyed)return new Promise(function(t,r){n.nextTick(function(){e[p]?r(e[p]):t(a(void 0,!0))})});var r,o=this[g];if(o)r=new Promise(d(o,this));else{var i=this[_].read();if(null!==i)return Promise.resolve(a(i,!1));r=new Promise(this[h])}return this[g]=r,r}},r(s,Symbol.asyncIterator,function(){return this}),r(s,"return",function(){var e=this;return new Promise(function(t,n){e[_].destroy(null,function(e){return e?void n(e):void t(a(void 0,!0))})})}),s),m);t.exports=function(e){var t,n=Object.create(b,(t={},r(t,_,{value:e,writable:!0}),r(t,c,{value:null,writable:!0}),r(t,u,{value:null,writable:!0}),r(t,p,{value:null,writable:!0}),r(t,f,{value:e._readableState.endEmitted,writable:!0}),r(t,h,{value:function(e,t){var r=n[_].read();r?(n[g]=null,n[c]=null,n[u]=null,e(a(r,!1))):(n[c]=e,n[u]=t)},writable:!0}),t));return n[g]=null,l(e,function(e){if(e&&"ERR_STREAM_PREMATURE_CLOSE"!==e.code){var t=n[u];return null!==t&&(n[g]=null,n[c]=null,n[u]=null,t(e)),void(n[p]=e)}var r=n[c];null!==r&&(n[g]=null,n[c]=null,n[u]=null,r(a(void 0,!0))),n[f]=!0}),e.on("readable",i.bind(null,n)),n}}).call(this,e("_process"))},{"./end-of-stream":23,_process:11}],21:[function(e,t){'use strict';function n(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function r(e){for(var t,r=1;r<arguments.length;r++)t=null==arguments[r]?{}:arguments[r],r%2?n(Object(t),!0).forEach(function(n){a(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):n(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))});return e}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var n,r=0;r<t.length;r++)n=t[r],n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}function d(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}function s(e,t,n){u.prototype.copy.call(e,t,n)}var l=e("buffer"),u=l.Buffer,p=e("util"),f=p.inspect,g=f&&f.custom||"inspect";t.exports=function(){function e(){o(this,e),this.head=null,this.tail=null,this.length=0}return d(e,[{key:"push",value:function(e){var t={data:e,next:null};0<this.length?this.tail.next=t:this.head=t,this.tail=t,++this.length}},{key:"unshift",value:function(e){var t={data:e,next:this.head};0===this.length&&(this.tail=t),this.head=t,++this.length}},{key:"shift",value:function(){if(0!==this.length){var e=this.head.data;return this.head=1===this.length?this.tail=null:this.head.next,--this.length,e}}},{key:"clear",value:function(){this.head=this.tail=null,this.length=0}},{key:"join",value:function(e){if(0===this.length)return"";for(var t=this.head,n=""+t.data;t=t.next;)n+=e+t.data;return n}},{key:"concat",value:function(e){if(0===this.length)return u.alloc(0);for(var t=u.allocUnsafe(e>>>0),n=this.head,r=0;n;)s(n.data,t,r),r+=n.data.length,n=n.next;return t}},{key:"consume",value:function(e,t){var n;return e<this.head.data.length?(n=this.head.data.slice(0,e),this.head.data=this.head.data.slice(e)):e===this.head.data.length?n=this.shift():n=t?this._getString(e):this._getBuffer(e),n}},{key:"first",value:function(){return this.head.data}},{key:"_getString",value:function(e){var t=this.head,r=1,a=t.data;for(e-=a.length;t=t.next;){var o=t.data,i=e>o.length?o.length:e;if(a+=i===o.length?o:o.slice(0,e),e-=i,0===e){i===o.length?(++r,this.head=t.next?t.next:this.tail=null):(this.head=t,t.data=o.slice(i));break}++r}return this.length-=r,a}},{key:"_getBuffer",value:function(e){var t=u.allocUnsafe(e),r=this.head,a=1;for(r.data.copy(t),e-=r.data.length;r=r.next;){var o=r.data,i=e>o.length?o.length:e;if(o.copy(t,t.length-e,0,i),e-=i,0===e){i===o.length?(++a,this.head=r.next?r.next:this.tail=null):(this.head=r,r.data=o.slice(i));break}++a}return this.length-=a,t}},{key:g,value:function(e,t){return f(this,r({},t,{depth:0,customInspect:!1}))}}]),e}()},{buffer:3,util:2}],22:[function(e,t){(function(e){'use strict';function n(e,t){a(e,t),r(e)}function r(e){e._writableState&&!e._writableState.emitClose||e._readableState&&!e._readableState.emitClose||e.emit("close")}function a(e,t){e.emit("error",t)}t.exports={destroy:function(t,o){var i=this,d=this._readableState&&this._readableState.destroyed,s=this._writableState&&this._writableState.destroyed;return d||s?(o?o(t):t&&(this._writableState?!this._writableState.errorEmitted&&(this._writableState.errorEmitted=!0,e.nextTick(a,this,t)):e.nextTick(a,this,t)),this):(this._readableState&&(this._readableState.destroyed=!0),this._writableState&&(this._writableState.destroyed=!0),this._destroy(t||null,function(t){!o&&t?i._writableState?i._writableState.errorEmitted?e.nextTick(r,i):(i._writableState.errorEmitted=!0,e.nextTick(n,i,t)):e.nextTick(n,i,t):o?(e.nextTick(r,i),o(t)):e.nextTick(r,i)}),this)},undestroy:function(){this._readableState&&(this._readableState.destroyed=!1,this._readableState.reading=!1,this._readableState.ended=!1,this._readableState.endEmitted=!1),this._writableState&&(this._writableState.destroyed=!1,this._writableState.ended=!1,this._writableState.ending=!1,this._writableState.finalCalled=!1,this._writableState.prefinished=!1,this._writableState.finished=!1,this._writableState.errorEmitted=!1)},errorOrDestroy:function(e,t){var n=e._readableState,r=e._writableState;n&&n.autoDestroy||r&&r.autoDestroy?e.destroy(t):e.emit("error",t)}}}).call(this,e("_process"))},{_process:11}],23:[function(e,t){'use strict';function n(e){var t=!1;return function(){if(!t){t=!0;for(var n=arguments.length,r=Array(n),a=0;a<n;a++)r[a]=arguments[a];e.apply(this,r)}}}function r(){}function a(e){return e.setHeader&&"function"==typeof e.abort}function o(e,t,d){if("function"==typeof t)return o(e,null,t);t||(t={}),d=n(d||r);var s=t.readable||!1!==t.readable&&e.readable,l=t.writable||!1!==t.writable&&e.writable,c=function(){e.writable||p()},u=e._writableState&&e._writableState.finished,p=function(){l=!1,u=!0,s||d.call(e)},f=e._readableState&&e._readableState.endEmitted,g=function(){s=!1,f=!0,l||d.call(e)},h=function(t){d.call(e,t)},_=function(){var t;return s&&!f?(e._readableState&&e._readableState.ended||(t=new i),d.call(e,t)):l&&!u?(e._writableState&&e._writableState.ended||(t=new i),d.call(e,t)):void 0},m=function(){e.req.on("finish",p)};return a(e)?(e.on("complete",p),e.on("abort",_),e.req?m():e.on("request",m)):l&&!e._writableState&&(e.on("end",c),e.on("close",c)),e.on("end",g),e.on("finish",p),!1!==t.error&&e.on("error",h),e.on("close",_),function(){e.removeListener("complete",p),e.removeListener("abort",_),e.removeListener("request",m),e.req&&e.req.removeListener("finish",p),e.removeListener("end",c),e.removeListener("close",c),e.removeListener("finish",p),e.removeListener("end",g),e.removeListener("error",h),e.removeListener("close",_)}}var i=e("../../../errors").codes.ERR_STREAM_PREMATURE_CLOSE;t.exports=o},{"../../../errors":14}],24:[function(e,t){t.exports=function(){throw new Error("Readable.from is not available in the browser")}},{}],25:[function(e,t){'use strict';function n(e){var t=!1;return function(){t||(t=!0,e.apply(void 0,arguments))}}function r(e){if(e)throw e}function a(e){return e.setHeader&&"function"==typeof e.abort}function o(t,r,o,i){i=n(i);var d=!1;t.on("close",function(){d=!0}),l===void 0&&(l=e("./end-of-stream")),l(t,{readable:r,writable:o},function(e){return e?i(e):void(d=!0,i())});var s=!1;return function(e){if(!d)return s?void 0:(s=!0,a(t)?t.abort():"function"==typeof t.destroy?t.destroy():void i(e||new p("pipe")))}}function i(e){e()}function d(e,t){return e.pipe(t)}function s(e){return e.length?"function"==typeof e[e.length-1]?e.pop():r:r}var l,c=e("../../../errors").codes,u=c.ERR_MISSING_ARGS,p=c.ERR_STREAM_DESTROYED;t.exports=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];var r=s(t);if(Array.isArray(t[0])&&(t=t[0]),2>t.length)throw new u("streams");var a,l=t.map(function(e,n){var d=n<t.length-1;return o(e,d,0<n,function(e){a||(a=e),e&&l.forEach(i),d||(l.forEach(i),r(a))})});return t.reduce(d)}},{"../../../errors":14,"./end-of-stream":23}],26:[function(e,n){'use strict';function r(e,t,n){return null==e.highWaterMark?t?e[n]:null:e.highWaterMark}var a=e("../../../errors").codes.ERR_INVALID_OPT_VALUE;n.exports={getHighWaterMark:function(e,n,o,i){var d=r(n,i,o);if(null!=d){if(!(isFinite(d)&&t(d)===d)||0>d){var s=i?o:"highWaterMark";throw new a(s,d)}return t(d)}return e.objectMode?16:16384}}},{"../../../errors":14}],27:[function(e,t){t.exports=e("events").EventEmitter},{events:6}],28:[function(e,t,n){n=t.exports=e("./lib/_stream_readable.js"),n.Stream=n,n.Readable=n,n.Writable=e("./lib/_stream_writable.js"),n.Duplex=e("./lib/_stream_duplex.js"),n.Transform=e("./lib/_stream_transform.js"),n.PassThrough=e("./lib/_stream_passthrough.js"),n.finished=e("./lib/internal/streams/end-of-stream.js"),n.pipeline=e("./lib/internal/streams/pipeline.js")},{"./lib/_stream_duplex.js":15,"./lib/_stream_passthrough.js":16,"./lib/_stream_readable.js":17,"./lib/_stream_transform.js":18,"./lib/_stream_writable.js":19,"./lib/internal/streams/end-of-stream.js":23,"./lib/internal/streams/pipeline.js":25}],29:[function(e,t,n){function r(e,t){for(var n in e)t[n]=e[n]}function a(e,t,n){return i(e,t,n)}var o=e("buffer"),i=o.Buffer;i.from&&i.alloc&&i.allocUnsafe&&i.allocUnsafeSlow?t.exports=o:(r(o,n),n.Buffer=a),a.prototype=Object.create(i.prototype),r(i,a),a.from=function(e,t,n){if("number"==typeof e)throw new TypeError("Argument must not be a number");return i(e,t,n)},a.alloc=function(e,t,n){if("number"!=typeof e)throw new TypeError("Argument must be a number");var r=i(e);return void 0===t?r.fill(0):"string"==typeof n?r.fill(t,n):r.fill(t),r},a.allocUnsafe=function(e){if("number"!=typeof e)throw new TypeError("Argument must be a number");return i(e)},a.allocUnsafeSlow=function(e){if("number"!=typeof e)throw new TypeError("Argument must be a number");return o.SlowBuffer(e)}},{buffer:3}],30:[function(e,t,n){'use strict';function r(e){if(!e)return"utf8";for(var t;;)switch(e){case"utf8":case"utf-8":return"utf8";case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return"utf16le";case"latin1":case"binary":return"latin1";case"base64":case"ascii":case"hex":return e;default:if(t)return;e=(""+e).toLowerCase(),t=!0;}}function a(e){var t=r(e);if("string"!=typeof t&&(m.isEncoding===b||!b(e)))throw new Error("Unknown encoding: "+e);return t||e}function o(e){this.encoding=a(e);var t;switch(this.encoding){case"utf16le":this.text=u,this.end=p,t=4;break;case"utf8":this.fillLast=c,t=4;break;case"base64":this.text=f,this.end=g,t=3;break;default:return this.write=h,void(this.end=_);}this.lastNeed=0,this.lastTotal=0,this.lastChar=m.allocUnsafe(t)}function d(e){if(127>=e)return 0;return 6==e>>5?2:14==e>>4?3:30==e>>3?4:2==e>>6?-1:-2}function s(e,t,n){var r=t.length-1;if(r<n)return 0;var a=d(t[r]);return 0<=a?(0<a&&(e.lastNeed=a-1),a):--r<n||-2===a?0:(a=d(t[r]),0<=a)?(0<a&&(e.lastNeed=a-2),a):--r<n||-2===a?0:(a=d(t[r]),0<=a?(0<a&&(2===a?a=0:e.lastNeed=a-3),a):0)}function l(e,t){if(128!=(192&t[0]))return e.lastNeed=0,"\uFFFD";if(1<e.lastNeed&&1<t.length){if(128!=(192&t[1]))return e.lastNeed=1,"\uFFFD";if(2<e.lastNeed&&2<t.length&&128!=(192&t[2]))return e.lastNeed=2,"\uFFFD"}}function c(e){var t=this.lastTotal-this.lastNeed,n=l(this,e,t);return void 0===n?this.lastNeed<=e.length?(e.copy(this.lastChar,t,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal)):void(e.copy(this.lastChar,t,0,e.length),this.lastNeed-=e.length):n}function u(e,t){if(0==(e.length-t)%2){var n=e.toString("utf16le",t);if(n){var r=n.charCodeAt(n.length-1);if(55296<=r&&56319>=r)return this.lastNeed=2,this.lastTotal=4,this.lastChar[0]=e[e.length-2],this.lastChar[1]=e[e.length-1],n.slice(0,-1)}return n}return this.lastNeed=1,this.lastTotal=2,this.lastChar[0]=e[e.length-1],e.toString("utf16le",t,e.length-1)}function p(e){var t=e&&e.length?this.write(e):"";if(this.lastNeed){var n=this.lastTotal-this.lastNeed;return t+this.lastChar.toString("utf16le",0,n)}return t}function f(e,t){var r=(e.length-t)%3;return 0==r?e.toString("base64",t):(this.lastNeed=3-r,this.lastTotal=3,1==r?this.lastChar[0]=e[e.length-1]:(this.lastChar[0]=e[e.length-2],this.lastChar[1]=e[e.length-1]),e.toString("base64",t,e.length-r))}function g(e){var t=e&&e.length?this.write(e):"";return this.lastNeed?t+this.lastChar.toString("base64",0,3-this.lastNeed):t}function h(e){return e.toString(this.encoding)}function _(e){return e&&e.length?this.write(e):""}var m=e("safe-buffer").Buffer,b=m.isEncoding||function(e){switch(e=""+e,e&&e.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return!0;default:return!1;}};n.StringDecoder=o,o.prototype.write=function(e){if(0===e.length)return"";var t,n;if(this.lastNeed){if(t=this.fillLast(e),void 0===t)return"";n=this.lastNeed,this.lastNeed=0}else n=0;return n<e.length?t?t+this.text(e,n):this.text(e,n):t||""},o.prototype.end=function(e){var t=e&&e.length?this.write(e):"";return this.lastNeed?t+"\uFFFD":t},o.prototype.text=function(e,t){var n=s(this,e,t);if(!this.lastNeed)return e.toString("utf8",t);this.lastTotal=n;var r=e.length-(n-this.lastNeed);return e.copy(this.lastChar,0,r),e.toString("utf8",t,r)},o.prototype.fillLast=function(e){return this.lastNeed<=e.length?(e.copy(this.lastChar,this.lastTotal-this.lastNeed,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal)):void(e.copy(this.lastChar,this.lastTotal-this.lastNeed,0,e.length),this.lastNeed-=e.length)}},{"safe-buffer":29}],31:[function(e,t){(function(e){function n(t){try{if(!e.localStorage)return!1}catch(e){return!1}var n=e.localStorage[t];return null!=n&&"true"===(n+"").toLowerCase()}t.exports=function(e,t){function r(){if(!a){if(n("throwDeprecation"))throw new Error(t);else n("traceDeprecation")?console.trace(t):console.warn(t);a=!0}return e.apply(this,arguments)}if(n("noDeprecation"))return e;var a=!1;return r}}).call(this,"undefined"==typeof global?"undefined"==typeof self?"undefined"==typeof window?{}:window:self:global)},{}],"/":[function(e,t){(function(n){function r(e){return e.replace(/a=ice-options:trickle\s\n/g,"")}function a(e,t){return e instanceof Error||(e=new Error(e)),e.code=t,e}function o(e){console.warn(e)}var i=e("debug")("simple-peer"),d=e("get-browser-rtc"),s=e("randombytes"),l=e("readable-stream"),c=e("queue-microtask"),u=65536;class p extends l.Duplex{constructor(e){if(e=Object.assign({allowHalfOpen:!1},e),super(e),this._id=s(4).toString("hex").slice(0,7),this._debug("new peer %o",e),this.channelName=e.initiator?e.channelName||s(20).toString("hex"):null,this.initiator=e.initiator||!1,this.channelConfig=e.channelConfig||p.channelConfig,this.negotiated=this.channelConfig.negotiated,this.config=Object.assign({},p.config,e.config),this.offerOptions=e.offerOptions||{},this.answerOptions=e.answerOptions||{},this.sdpTransform=e.sdpTransform||(e=>e),this.streams=e.streams||(e.stream?[e.stream]:[]),this.trickle=void 0===e.trickle||e.trickle,this.allowHalfTrickle=void 0!==e.allowHalfTrickle&&e.allowHalfTrickle,this.iceCompleteTimeout=e.iceCompleteTimeout||5000,this.destroyed=!1,this._connected=!1,this.remoteAddress=void 0,this.remoteFamily=void 0,this.remotePort=void 0,this.localAddress=void 0,this.localFamily=void 0,this.localPort=void 0,this._wrtc=e.wrtc&&"object"==typeof e.wrtc?e.wrtc:d(),!this._wrtc)if("undefined"==typeof window)throw a("No WebRTC support: Specify `opts.wrtc` option in this environment","ERR_WEBRTC_SUPPORT");else throw a("No WebRTC support: Not a supported browser","ERR_WEBRTC_SUPPORT");this._pcReady=!1,this._channelReady=!1,this._iceComplete=!1,this._iceCompleteTimer=null,this._channel=null,this._pendingCandidates=[],this._isNegotiating=!this.negotiated&&!this.initiator,this._batchedNegotiation=!1,this._queuedNegotiation=!1,this._sendersAwaitingStable=[],this._senderMap=new Map,this._firstStable=!0,this._closingInterval=null,this._remoteTracks=[],this._remoteStreams=[],this._chunk=null,this._cb=null,this._interval=null;try{this._pc=new this._wrtc.RTCPeerConnection(this.config)}catch(e){return void c(()=>this.destroy(a(e,"ERR_PC_CONSTRUCTOR")))}this._isReactNativeWebrtc="number"==typeof this._pc._peerConnectionId,this._pc.oniceconnectionstatechange=()=>{this._onIceStateChange()},this._pc.onicegatheringstatechange=()=>{this._onIceStateChange()},this._pc.onconnectionstatechange=()=>{this._onConnectionStateChange()},this._pc.onsignalingstatechange=()=>{this._onSignalingStateChange()},this._pc.onicecandidate=e=>{this._onIceCandidate(e)},this.initiator||this.negotiated?this._setupData({channel:this._pc.createDataChannel(this.channelName,this.channelConfig)}):this._pc.ondatachannel=e=>{this._setupData(e)},this.streams&&this.streams.forEach(e=>{this.addStream(e)}),this._pc.ontrack=e=>{this._onTrack(e)},this.initiator&&this._needsNegotiation(),this._onFinishBound=()=>{this._onFinish()},this.once("finish",this._onFinishBound)}get bufferSize(){return this._channel&&this._channel.bufferedAmount||0}get connected(){return this._connected&&"open"===this._channel.readyState}address(){return{port:this.localPort,family:this.localFamily,address:this.localAddress}}signal(e){if(this.destroyed)throw a("cannot signal after peer is destroyed","ERR_SIGNALING");if("string"==typeof e)try{e=JSON.parse(e)}catch(t){e={}}this._debug("signal()"),e.renegotiate&&this.initiator&&(this._debug("got request to renegotiate"),this._needsNegotiation()),e.transceiverRequest&&this.initiator&&(this._debug("got request for transceiver"),this.addTransceiver(e.transceiverRequest.kind,e.transceiverRequest.init)),e.candidate&&(this._pc.remoteDescription&&this._pc.remoteDescription.type?this._addIceCandidate(e.candidate):this._pendingCandidates.push(e.candidate)),e.sdp&&this._pc.setRemoteDescription(new this._wrtc.RTCSessionDescription(e)).then(()=>{this.destroyed||(this._pendingCandidates.forEach(e=>{this._addIceCandidate(e)}),this._pendingCandidates=[],"offer"===this._pc.remoteDescription.type&&this._createAnswer())}).catch(e=>{this.destroy(a(e,"ERR_SET_REMOTE_DESCRIPTION"))}),e.sdp||e.candidate||e.renegotiate||e.transceiverRequest||this.destroy(a("signal() called with invalid signal data","ERR_SIGNALING"))}_addIceCandidate(e){var t=new this._wrtc.RTCIceCandidate(e);this._pc.addIceCandidate(t).catch(e=>{!t.address||t.address.endsWith(".local")?o("Ignoring unsupported ICE candidate."):this.destroy(a(e,"ERR_ADD_ICE_CANDIDATE"))})}send(e){this._channel.send(e)}addTransceiver(e,t){if(this._debug("addTransceiver()"),this.initiator)try{this._pc.addTransceiver(e,t),this._needsNegotiation()}catch(e){this.destroy(a(e,"ERR_ADD_TRANSCEIVER"))}else this.emit("signal",{transceiverRequest:{kind:e,init:t}})}addStream(e){this._debug("addStream()"),e.getTracks().forEach(t=>{this.addTrack(t,e)})}addTrack(e,t){this._debug("addTrack()");var n=this._senderMap.get(e)||new Map,r=n.get(t);if(!r)r=this._pc.addTrack(e,t),n.set(t,r),this._senderMap.set(e,n),this._needsNegotiation();else if(r.removed)throw a("Track has been removed. You should enable/disable tracks that you want to re-add.","ERR_SENDER_REMOVED");else throw a("Track has already been added to that stream.","ERR_SENDER_ALREADY_ADDED")}replaceTrack(e,t,n){this._debug("replaceTrack()");var r=this._senderMap.get(e),o=r?r.get(n):null;if(!o)throw a("Cannot replace track that was never added.","ERR_TRACK_NOT_ADDED");t&&this._senderMap.set(t,r),null==o.replaceTrack?this.destroy(a("replaceTrack is not supported in this browser","ERR_UNSUPPORTED_REPLACETRACK")):o.replaceTrack(t)}removeTrack(e,t){this._debug("removeSender()");var n=this._senderMap.get(e),r=n?n.get(t):null;if(!r)throw a("Cannot remove track that was never added.","ERR_TRACK_NOT_ADDED");try{r.removed=!0,this._pc.removeTrack(r)}catch(e){"NS_ERROR_UNEXPECTED"===e.name?this._sendersAwaitingStable.push(r):this.destroy(a(e,"ERR_REMOVE_TRACK"))}this._needsNegotiation()}removeStream(e){this._debug("removeSenders()"),e.getTracks().forEach(t=>{this.removeTrack(t,e)})}_needsNegotiation(){this._debug("_needsNegotiation"),this._batchedNegotiation||(this._batchedNegotiation=!0,c(()=>{this._batchedNegotiation=!1,this._debug("starting batched negotiation"),this.negotiate()}))}negotiate(){this.initiator?this._isNegotiating?(this._queuedNegotiation=!0,this._debug("already negotiating, queueing")):(this._debug("start negotiation"),setTimeout(()=>{this._createOffer()},0)):this._isNegotiating?(this._queuedNegotiation=!0,this._debug("already negotiating, queueing")):(this._debug("requesting negotiation from initiator"),this.emit("signal",{renegotiate:!0})),this._isNegotiating=!0}destroy(e){this._destroy(e,()=>{})}_destroy(e,t){if(!this.destroyed){if(this._debug("destroy (error: %s)",e&&(e.message||e)),this.readable=this.writable=!1,this._readableState.ended||this.push(null),this._writableState.finished||this.end(),this.destroyed=!0,this._connected=!1,this._pcReady=!1,this._channelReady=!1,this._remoteTracks=null,this._remoteStreams=null,this._senderMap=null,clearInterval(this._closingInterval),this._closingInterval=null,clearInterval(this._interval),this._interval=null,this._chunk=null,this._cb=null,this._onFinishBound&&this.removeListener("finish",this._onFinishBound),this._onFinishBound=null,this._channel){try{this._channel.close()}catch(e){}this._channel.onmessage=null,this._channel.onopen=null,this._channel.onclose=null,this._channel.onerror=null}if(this._pc){try{this._pc.close()}catch(e){}this._pc.oniceconnectionstatechange=null,this._pc.onicegatheringstatechange=null,this._pc.onsignalingstatechange=null,this._pc.onicecandidate=null,this._pc.ontrack=null,this._pc.ondatachannel=null}this._pc=null,this._channel=null,e&&this.emit("error",e),this.emit("close"),t()}}_setupData(e){if(!e.channel)return this.destroy(a("Data channel event is missing `channel` property","ERR_DATA_CHANNEL"));this._channel=e.channel,this._channel.binaryType="arraybuffer","number"==typeof this._channel.bufferedAmountLowThreshold&&(this._channel.bufferedAmountLowThreshold=u),this.channelName=this._channel.label,this._channel.onmessage=e=>{this._onChannelMessage(e)},this._channel.onbufferedamountlow=()=>{this._onChannelBufferedAmountLow()},this._channel.onopen=()=>{this._onChannelOpen()},this._channel.onclose=()=>{this._onChannelClose()},this._channel.onerror=e=>{this.destroy(a(e,"ERR_DATA_CHANNEL"))};var t=!1;this._closingInterval=setInterval(()=>{this._channel&&"closing"===this._channel.readyState?(t&&this._onChannelClose(),t=!0):t=!1},5000)}_read(){}_write(e,t,n){if(this.destroyed)return n(a("cannot write after peer is destroyed","ERR_DATA_CHANNEL"));if(this._connected){try{this.send(e)}catch(e){return this.destroy(a(e,"ERR_DATA_CHANNEL"))}this._channel.bufferedAmount>u?(this._debug("start backpressure: bufferedAmount %d",this._channel.bufferedAmount),this._cb=n):n(null)}else this._debug("write before connect"),this._chunk=e,this._cb=n}_onFinish(){if(!this.destroyed){const e=()=>{setTimeout(()=>this.destroy(),1e3)};this._connected?e():this.once("connect",e)}}_startIceCompleteTimeout(){this.destroyed||this._iceCompleteTimer||(this._debug("started iceComplete timeout"),this._iceCompleteTimer=setTimeout(()=>{this._iceComplete||(this._iceComplete=!0,this._debug("iceComplete timeout completed"),this.emit("iceTimeout"),this.emit("_iceComplete"))},this.iceCompleteTimeout))}_createOffer(){this.destroyed||this._pc.createOffer(this.offerOptions).then(e=>{if(this.destroyed)return;this.trickle||this.allowHalfTrickle||(e.sdp=r(e.sdp)),e.sdp=this.sdpTransform(e.sdp);const t=()=>{if(!this.destroyed){var t=this._pc.localDescription||e;this._debug("signal"),this.emit("signal",{type:t.type,sdp:t.sdp})}};this._pc.setLocalDescription(e).then(()=>{this._debug("createOffer success"),this.destroyed||(this.trickle||this._iceComplete?t():this.once("_iceComplete",t))}).catch(e=>{this.destroy(a(e,"ERR_SET_LOCAL_DESCRIPTION"))})}).catch(e=>{this.destroy(a(e,"ERR_CREATE_OFFER"))})}_requestMissingTransceivers(){this._pc.getTransceivers&&this._pc.getTransceivers().forEach(e=>{e.mid||!e.sender.track||e.requested||(e.requested=!0,this.addTransceiver(e.sender.track.kind))})}_createAnswer(){this.destroyed||this._pc.createAnswer(this.answerOptions).then(e=>{if(this.destroyed)return;this.trickle||this.allowHalfTrickle||(e.sdp=r(e.sdp)),e.sdp=this.sdpTransform(e.sdp);const t=()=>{if(!this.destroyed){var t=this._pc.localDescription||e;this._debug("signal"),this.emit("signal",{type:t.type,sdp:t.sdp}),this.initiator||this._requestMissingTransceivers()}};this._pc.setLocalDescription(e).then(()=>{this.destroyed||(this.trickle||this._iceComplete?t():this.once("_iceComplete",t))}).catch(e=>{this.destroy(a(e,"ERR_SET_LOCAL_DESCRIPTION"))})}).catch(e=>{this.destroy(a(e,"ERR_CREATE_ANSWER"))})}_onConnectionStateChange(){this.destroyed||"failed"===this._pc.connectionState&&this.destroy(a("Connection failed.","ERR_CONNECTION_FAILURE"))}_onIceStateChange(){if(!this.destroyed){var e=this._pc.iceConnectionState,t=this._pc.iceGatheringState;this._debug("iceStateChange (connection: %s) (gathering: %s)",e,t),this.emit("iceStateChange",e,t),("connected"===e||"completed"===e)&&(this._pcReady=!0,this._maybeReady()),"failed"===e&&this.destroy(a("Ice connection failed.","ERR_ICE_CONNECTION_FAILURE")),"closed"===e&&this.destroy(a("Ice connection closed.","ERR_ICE_CONNECTION_CLOSED"))}}getStats(e){const t=e=>("[object Array]"===Object.prototype.toString.call(e.values)&&e.values.forEach(t=>{Object.assign(e,t)}),e);0===this._pc.getStats.length||this._isReactNativeWebrtc?this._pc.getStats().then(n=>{var r=[];n.forEach(e=>{r.push(t(e))}),e(null,r)},t=>e(t)):0<this._pc.getStats.length?this._pc.getStats(n=>{if(!this.destroyed){var r=[];n.result().forEach(e=>{var n={};e.names().forEach(t=>{n[t]=e.stat(t)}),n.id=e.id,n.type=e.type,n.timestamp=e.timestamp,r.push(t(n))}),e(null,r)}},t=>e(t)):e(null,[])}_maybeReady(){if(this._debug("maybeReady pc %s channel %s",this._pcReady,this._channelReady),this._connected||this._connecting||!this._pcReady||!this._channelReady)return;this._connecting=!0;const e=()=>{this.destroyed||this.getStats((t,n)=>{if(this.destroyed)return;t&&(n=[]);var r={},o={},i={},d=!1;n.forEach(e=>{("remotecandidate"===e.type||"remote-candidate"===e.type)&&(r[e.id]=e),("localcandidate"===e.type||"local-candidate"===e.type)&&(o[e.id]=e),("candidatepair"===e.type||"candidate-pair"===e.type)&&(i[e.id]=e)});const s=e=>{d=!0;var t=o[e.localCandidateId];t&&(t.ip||t.address)?(this.localAddress=t.ip||t.address,this.localPort=+t.port):t&&t.ipAddress?(this.localAddress=t.ipAddress,this.localPort=+t.portNumber):"string"==typeof e.googLocalAddress&&(t=e.googLocalAddress.split(":"),this.localAddress=t[0],this.localPort=+t[1]),this.localAddress&&(this.localFamily=this.localAddress.includes(":")?"IPv6":"IPv4");var n=r[e.remoteCandidateId];n&&(n.ip||n.address)?(this.remoteAddress=n.ip||n.address,this.remotePort=+n.port):n&&n.ipAddress?(this.remoteAddress=n.ipAddress,this.remotePort=+n.portNumber):"string"==typeof e.googRemoteAddress&&(n=e.googRemoteAddress.split(":"),this.remoteAddress=n[0],this.remotePort=+n[1]),this.remoteAddress&&(this.remoteFamily=this.remoteAddress.includes(":")?"IPv6":"IPv4"),this._debug("connect local: %s:%s remote: %s:%s",this.localAddress,this.localPort,this.remoteAddress,this.remotePort)};if(n.forEach(e=>{"transport"===e.type&&e.selectedCandidatePairId&&s(i[e.selectedCandidatePairId]),("googCandidatePair"===e.type&&"true"===e.googActiveConnection||("candidatepair"===e.type||"candidate-pair"===e.type)&&e.selected)&&s(e)}),!d&&(!Object.keys(i).length||Object.keys(o).length))return void setTimeout(e,100);if(this._connecting=!1,this._connected=!0,this._chunk){try{this.send(this._chunk)}catch(e){return this.destroy(a(e,"ERR_DATA_CHANNEL"))}this._chunk=null,this._debug("sent chunk from \"write before connect\"");var l=this._cb;this._cb=null,l(null)}"number"!=typeof this._channel.bufferedAmountLowThreshold&&(this._interval=setInterval(()=>this._onInterval(),150),this._interval.unref&&this._interval.unref()),this._debug("connect"),this.emit("connect")})};e()}_onInterval(){this._cb&&this._channel&&!(this._channel.bufferedAmount>u)&&this._onChannelBufferedAmountLow()}_onSignalingStateChange(){this.destroyed||("stable"===this._pc.signalingState&&!this._firstStable&&(this._isNegotiating=!1,this._debug("flushing sender queue",this._sendersAwaitingStable),this._sendersAwaitingStable.forEach(e=>{this._pc.removeTrack(e),this._queuedNegotiation=!0}),this._sendersAwaitingStable=[],this._queuedNegotiation&&(this._debug("flushing negotiation queue"),this._queuedNegotiation=!1,this._needsNegotiation()),this._debug("negotiate"),this.emit("negotiate")),this._firstStable=!1,this._debug("signalingStateChange %s",this._pc.signalingState),this.emit("signalingStateChange",this._pc.signalingState))}_onIceCandidate(e){this.destroyed||(e.candidate&&this.trickle?this.emit("signal",{candidate:{candidate:e.candidate.candidate,sdpMLineIndex:e.candidate.sdpMLineIndex,sdpMid:e.candidate.sdpMid}}):!e.candidate&&!this._iceComplete&&(this._iceComplete=!0,this.emit("_iceComplete")),e.candidate&&this._startIceCompleteTimeout())}_onChannelMessage(e){if(!this.destroyed){var t=e.data;t instanceof ArrayBuffer&&(t=n.from(t)),this.push(t)}}_onChannelBufferedAmountLow(){if(!this.destroyed&&this._cb){this._debug("ending backpressure: bufferedAmount %d",this._channel.bufferedAmount);var e=this._cb;this._cb=null,e(null)}}_onChannelOpen(){this._connected||this.destroyed||(this._debug("on channel open"),this._channelReady=!0,this._maybeReady())}_onChannelClose(){this.destroyed||(this._debug("on channel close"),this.destroy())}_onTrack(e){this.destroyed||e.streams.forEach(t=>{this._debug("on track"),this.emit("track",e.track,t),this._remoteTracks.push({track:e.track,stream:t}),this._remoteStreams.some(e=>e.id===t.id)||(this._remoteStreams.push(t),c(()=>{this.emit("stream",t)}))})}_debug(){var e=[].slice.call(arguments);e[0]="["+this._id+"] "+e[0],i.apply(null,e)}}p.WEBRTC_SUPPORT=!!d(),p.config={iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:global.stun.twilio.com:3478?transport=udp"}],sdpSemantics:"unified-plan"},p.channelConfig={},t.exports=p}).call(this,e("buffer").Buffer)},{buffer:3,debug:4,"get-browser-rtc":7,"queue-microtask":12,randombytes:13,"readable-stream":28}]},{},[])("/")});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/y-protocols/awareness.js":
/*!***********************************************!*\
  !*** ./node_modules/y-protocols/awareness.js ***!
  \***********************************************/
/*! exports provided: outdatedTimeout, Awareness, removeAwarenessStates, encodeAwarenessUpdate, applyAwarenessUpdate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "outdatedTimeout", function() { return outdatedTimeout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Awareness", function() { return Awareness; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeAwarenessStates", function() { return removeAwarenessStates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodeAwarenessUpdate", function() { return encodeAwarenessUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyAwarenessUpdate", function() { return applyAwarenessUpdate; });
/* harmony import */ var lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lib0/encoding.js */ "./node_modules/lib0/encoding.js");
/* harmony import */ var lib0_decoding_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lib0/decoding.js */ "./node_modules/lib0/decoding.js");
/* harmony import */ var lib0_time_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lib0/time.js */ "./node_modules/lib0/time.js");
/* harmony import */ var lib0_math_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lib0/math.js */ "./node_modules/lib0/math.js");
/* harmony import */ var lib0_observable_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lib0/observable.js */ "./node_modules/lib0/observable.js");
/* harmony import */ var yjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! yjs */ "./node_modules/yjs/dist/yjs.mjs");
/**
 * @module awareness-protocol
 */






 // eslint-disable-line

const outdatedTimeout = 30000

/**
 * @typedef {Object} MetaClientState
 * @property {number} MetaClientState.clock
 * @property {number} MetaClientState.lastUpdated unix timestamp
 */

/**
 * The Awareness class implements a simple shared state protocol that can be used for non-persistent data like awareness information
 * (cursor, username, status, ..). Each client can update its own local state and listen to state changes of
 * remote clients. Every client may set a state of a remote peer to `null` to mark the client as offline.
 *
 * Each client is identified by a unique client id (something we borrow from `doc.clientID`). A client can override
 * its own state by propagating a message with an increasing timestamp (`clock`). If such a message is received, it is
 * applied if the known state of that client is older than the new state (`clock < newClock`). If a client thinks that
 * a remote client is offline, it may propagate a message with
 * `{ clock: currentClientClock, state: null, client: remoteClient }`. If such a
 * message is received, and the known clock of that client equals the received clock, it will override the state with `null`.
 *
 * Before a client disconnects, it should propagate a `null` state with an updated clock.
 *
 * Awareness states must be updated every 30 seconds. Otherwise the Awareness instance will delete the client state.
 *
 * @extends {Observable<string>}
 */
class Awareness extends lib0_observable_js__WEBPACK_IMPORTED_MODULE_4__["Observable"] {
  /**
   * @param {Y.Doc} doc
   */
  constructor (doc) {
    super()
    this.doc = doc
    /**
     * Maps from client id to client state
     * @type {Map<number, Object<string, any>>}
     */
    this.states = new Map()
    /**
     * @type {Map<number, MetaClientState>}
     */
    this.meta = new Map()
    this._checkInterval = setInterval(() => {
      const now = lib0_time_js__WEBPACK_IMPORTED_MODULE_2__["getUnixTime"]()
      if (this.getLocalState() !== null && (outdatedTimeout / 2 <= now - /** @type {{lastUpdated:number}} */ (this.meta.get(doc.clientID)).lastUpdated)) {
        // renew local clock
        this.setLocalState(this.getLocalState())
      }
      /**
       * @type {Array<number>}
       */
      const remove = []
      this.meta.forEach((meta, clientid) => {
        if (clientid !== doc.clientID && outdatedTimeout <= now - meta.lastUpdated && this.states.has(clientid)) {
          remove.push(clientid)
        }
      })
      if (remove.length > 0) {
        removeAwarenessStates(this, remove, 'timeout')
      }
    }, lib0_math_js__WEBPACK_IMPORTED_MODULE_3__["floor"](outdatedTimeout / 10))
    doc.on('destroy', () => {
      this.destroy()
    })
    this.setLocalState({})
  }
  destroy () {
    clearInterval(this._checkInterval)
  }
  /**
   * @return {Object<string,Object>|null}
   */
  getLocalState () {
    return this.states.get(this.doc.clientID) || null
  }
  /**
   * @param {Object<string,any>|null} state
   */
  setLocalState (state) {
    const clientID = this.doc.clientID
    const currLocalMeta = this.meta.get(clientID)
    const clock = currLocalMeta === undefined ? 0 : currLocalMeta.clock + 1
    if (state === null) {
      this.states.delete(clientID)
    } else {
      this.states.set(clientID, state)
    }
    this.meta.set(clientID, {
      clock,
      lastUpdated: lib0_time_js__WEBPACK_IMPORTED_MODULE_2__["getUnixTime"]()
    })
    const added = []
    const updated = []
    const removed = []
    if (state === null) {
      removed.push(clientID)
    } else if (currLocalMeta === undefined) {
      added.push(clientID)
    } else {
      updated.push(clientID)
    }
    this.emit('change', [{ added, updated, removed }, 'local'])
  }
  /**
   * @param {string} field
   * @param {Object} value
   */
  setLocalStateField (field, value) {
    const state = this.getLocalState()
    if (state !== null) {
      state[field] = value
      this.setLocalState(state)
    }
  }
  /**
   * @return {Map<number,Object<string,any>>}
   */
  getStates () {
    return this.states
  }
}

/**
 * Mark (remote) clients as inactive and remove them from the list of active peers.
 * This change will be propagated to remote clients.
 *
 * @param {Awareness} awareness
 * @param {Array<number>} clients
 * @param {any} origin
 */
const removeAwarenessStates = (awareness, clients, origin) => {
  const removed = []
  for (let i = 0; i < clients.length; i++) {
    const clientID = clients[i]
    if (awareness.states.has(clientID)) {
      awareness.states.delete(clientID)
      if (clientID === awareness.doc.clientID) {
        const curMeta = /** @type {MetaClientState} */ (awareness.meta.get(clientID))
        awareness.meta.set(clientID, {
          clock: curMeta.clock + 1,
          lastUpdated: lib0_time_js__WEBPACK_IMPORTED_MODULE_2__["getUnixTime"]()
        })
      }
      removed.push(clientID)
    }
  }
  if (removed.length > 0) {
    awareness.emit('change', [{ added: [], updated: [], removed }, origin])
  }
}

/**
 * @param {Awareness} awareness
 * @param {Array<number>} clients
 * @return {Uint8Array}
 */
const encodeAwarenessUpdate = (awareness, clients, states = awareness.states) => {
  const len = clients.length
  const encoder = lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["createEncoder"]()
  lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["writeVarUint"](encoder, len)
  for (let i = 0; i < len; i++) {
    const clientID = clients[i]
    const state = states.get(clientID) || null
    const clock = /** @type {MetaClientState} */ (awareness.meta.get(clientID)).clock
    lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["writeVarUint"](encoder, clientID)
    lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["writeVarUint"](encoder, clock)
    lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["writeVarString"](encoder, JSON.stringify(state))
  }
  return lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["toUint8Array"](encoder)
}

/**
 * @param {Awareness} awareness
 * @param {Uint8Array} update
 * @param {any} origin This will be added to the emitted change event
 */
const applyAwarenessUpdate = (awareness, update, origin) => {
  const decoder = lib0_decoding_js__WEBPACK_IMPORTED_MODULE_1__["createDecoder"](update)
  const timestamp = lib0_time_js__WEBPACK_IMPORTED_MODULE_2__["getUnixTime"]()
  const added = []
  const updated = []
  const removed = []
  const len = lib0_decoding_js__WEBPACK_IMPORTED_MODULE_1__["readVarUint"](decoder)
  for (let i = 0; i < len; i++) {
    const clientID = lib0_decoding_js__WEBPACK_IMPORTED_MODULE_1__["readVarUint"](decoder)
    let clock = lib0_decoding_js__WEBPACK_IMPORTED_MODULE_1__["readVarUint"](decoder)
    const state = JSON.parse(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_1__["readVarString"](decoder))
    const clientMeta = awareness.meta.get(clientID)
    const currClock = clientMeta === undefined ? 0 : clientMeta.clock
    if (currClock < clock || (currClock === clock && state === null && awareness.states.has(clientID))) {
      if (state === null) {
        // never let a remote client remove this local state
        if (clientID === awareness.doc.clientID && awareness.getLocalState() != null) {
          // remote client removed the local state. Do not remote state. Broadcast a message indicating
          // that this client still exists by increasing the clock
          clock++
        } else {
          awareness.states.delete(clientID)
        }
      } else {
        awareness.states.set(clientID, state)
      }
      awareness.meta.set(clientID, {
        clock,
        lastUpdated: timestamp
      })
      if (clientMeta === undefined && state !== null) {
        added.push(clientID)
      } else if (clientMeta !== undefined && state === null) {
        removed.push(clientID)
      } else if (state !== null) {
        updated.push(clientID)
      }
    }
  }
  if (added.length > 0 || updated.length > 0 || removed.length > 0) {
    awareness.emit('change', [{
      added, updated, removed
    }, origin])
  }
}


/***/ }),

/***/ "./node_modules/y-protocols/sync.js":
/*!******************************************!*\
  !*** ./node_modules/y-protocols/sync.js ***!
  \******************************************/
/*! exports provided: messageYjsSyncStep1, messageYjsSyncStep2, messageYjsUpdate, writeSyncStep1, writeSyncStep2, readSyncStep1, readSyncStep2, writeUpdate, readUpdate, readSyncMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "messageYjsSyncStep1", function() { return messageYjsSyncStep1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "messageYjsSyncStep2", function() { return messageYjsSyncStep2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "messageYjsUpdate", function() { return messageYjsUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeSyncStep1", function() { return writeSyncStep1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeSyncStep2", function() { return writeSyncStep2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readSyncStep1", function() { return readSyncStep1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readSyncStep2", function() { return readSyncStep2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeUpdate", function() { return writeUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readUpdate", function() { return readUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readSyncMessage", function() { return readSyncMessage; });
/* harmony import */ var lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lib0/encoding.js */ "./node_modules/lib0/encoding.js");
/* harmony import */ var lib0_decoding_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lib0/decoding.js */ "./node_modules/lib0/decoding.js");
/* harmony import */ var yjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! yjs */ "./node_modules/yjs/dist/yjs.mjs");
/**
 * @module sync-protocol
 */





/**
 * @typedef {Map<number, number>} StateMap
 */

/**
 * Core Yjs defines three message types:
 * • YjsSyncStep1: Includes the State Set of the sending client. When received, the client should reply with YjsSyncStep2.
 * • YjsSyncStep2: Includes all missing structs and the complete delete set. When received, the the client is assured that
 *   it received all information from the remote client.
 *
 * In a peer-to-peer network, you may want to introduce a SyncDone message type. Both parties should initiate the connection
 * with SyncStep1. When a client received SyncStep2, it should reply with SyncDone. When the local client received both
 * SyncStep2 and SyncDone, it is assured that it is synced to the remote client.
 *
 * In a client-server model, you want to handle this differently: The client should initiate the connection with SyncStep1.
 * When the server receives SyncStep1, it should reply with SyncStep2 immediately followed by SyncStep1. The client replies
 * with SyncStep2 when it receives SyncStep1. Optionally the server may send a SyncDone after it received SyncStep2, so the
 * client knows that the sync is finished.  There are two reasons for this more elaborated sync model: 1. This protocol can
 * easily be implemented on top of http and websockets. 2. The server shoul only reply to requests, and not initiate them.
 * Therefore it is necesarry that the client initiates the sync.
 *
 * Construction of a message:
 * [messageType : varUint, message definition..]
 *
 * Note: A message does not include information about the room name. This must to be handled by the upper layer protocol!
 *
 * stringify[messageType] stringifies a message definition (messageType is already read from the bufffer)
 */

const messageYjsSyncStep1 = 0
const messageYjsSyncStep2 = 1
const messageYjsUpdate = 2

/**
 * Create a sync step 1 message based on the state of the current shared document.
 *
 * @param {encoding.Encoder} encoder
 * @param {Y.Doc} doc
 */
const writeSyncStep1 = (encoder, doc) => {
  lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["writeVarUint"](encoder, messageYjsSyncStep1)
  const sv = yjs__WEBPACK_IMPORTED_MODULE_2__["encodeStateVector"](doc)
  lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["writeVarUint8Array"](encoder, sv)
}

/**
 * @param {encoding.Encoder} encoder
 * @param {Y.Doc} doc
 * @param {Uint8Array} [encodedStateVector]
 */
const writeSyncStep2 = (encoder, doc, encodedStateVector) => {
  lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["writeVarUint"](encoder, messageYjsSyncStep2)
  lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["writeVarUint8Array"](encoder, yjs__WEBPACK_IMPORTED_MODULE_2__["encodeStateAsUpdate"](doc, encodedStateVector))
}

/**
 * Read SyncStep1 message and reply with SyncStep2.
 *
 * @param {decoding.Decoder} decoder The reply to the received message
 * @param {encoding.Encoder} encoder The received message
 * @param {Y.Doc} doc
 */
const readSyncStep1 = (decoder, encoder, doc) =>
  writeSyncStep2(encoder, doc, lib0_decoding_js__WEBPACK_IMPORTED_MODULE_1__["readVarUint8Array"](decoder))

/**
 * Read and apply Structs and then DeleteStore to a y instance.
 *
 * @param {decoding.Decoder} decoder
 * @param {Y.Doc} doc
 * @param {any} transactionOrigin
 */
const readSyncStep2 = (decoder, doc, transactionOrigin) => {
  yjs__WEBPACK_IMPORTED_MODULE_2__["applyUpdate"](doc, lib0_decoding_js__WEBPACK_IMPORTED_MODULE_1__["readVarUint8Array"](decoder), transactionOrigin)
}

/**
 * @param {encoding.Encoder} encoder
 * @param {Uint8Array} update
 */
const writeUpdate = (encoder, update) => {
  lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["writeVarUint"](encoder, messageYjsUpdate)
  lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["writeVarUint8Array"](encoder, update)
}

/**
 * Read and apply Structs and then DeleteStore to a y instance.
 *
 * @param {decoding.Decoder} decoder
 * @param {Y.Doc} doc
 * @param {any} transactionOrigin
 */
const readUpdate = readSyncStep2

/**
 * @param {decoding.Decoder} decoder A message received from another client
 * @param {encoding.Encoder} encoder The reply message. Will not be sent if empty.
 * @param {Y.Doc} doc
 * @param {any} transactionOrigin
 */
const readSyncMessage = (decoder, encoder, doc, transactionOrigin) => {
  const messageType = lib0_decoding_js__WEBPACK_IMPORTED_MODULE_1__["readVarUint"](decoder)
  switch (messageType) {
    case messageYjsSyncStep1:
      readSyncStep1(decoder, encoder, doc)
      break
    case messageYjsSyncStep2:
      readSyncStep2(decoder, doc, transactionOrigin)
      break
    case messageYjsUpdate:
      readUpdate(decoder, doc, transactionOrigin)
      break
    default:
      throw new Error('Unknown message type')
  }
  return messageType
}


/***/ }),

/***/ "./node_modules/y-webrtc/src/crypto.js":
/*!*********************************************!*\
  !*** ./node_modules/y-webrtc/src/crypto.js ***!
  \*********************************************/
/*! exports provided: deriveKey, encrypt, encryptJson, decrypt, decryptJson */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deriveKey", function() { return deriveKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encrypt", function() { return encrypt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encryptJson", function() { return encryptJson; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decrypt", function() { return decrypt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decryptJson", function() { return decryptJson; });
/* harmony import */ var lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lib0/encoding.js */ "./node_modules/lib0/encoding.js");
/* harmony import */ var lib0_decoding_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lib0/decoding.js */ "./node_modules/lib0/decoding.js");
/* harmony import */ var lib0_promise_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lib0/promise.js */ "./node_modules/lib0/promise.js");
/* harmony import */ var lib0_error_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lib0/error.js */ "./node_modules/lib0/error.js");
/* harmony import */ var lib0_string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lib0/string.js */ "./node_modules/lib0/string.js");
/* eslint-env browser */







/**
 * @param {string} secret
 * @param {string} roomName
 * @return {PromiseLike<CryptoKey>}
 */
const deriveKey = (secret, roomName) => {
  const secretBuffer = lib0_string_js__WEBPACK_IMPORTED_MODULE_4__["encodeUtf8"](secret).buffer
  const salt = lib0_string_js__WEBPACK_IMPORTED_MODULE_4__["encodeUtf8"](roomName).buffer
  return crypto.subtle.importKey(
    'raw',
    secretBuffer,
    'PBKDF2',
    false,
    ['deriveKey']
  ).then(keyMaterial =>
    crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      {
        name: 'AES-GCM',
        length: 256
      },
      true,
      ['encrypt', 'decrypt']
    )
  )
}

/**
 * @param {Uint8Array} data data to be encrypted
 * @param {CryptoKey?} key
 * @return {PromiseLike<Uint8Array>} encrypted, base64 encoded message
 */
const encrypt = (data, key) => {
  if (!key) {
    return /** @type {PromiseLike<Uint8Array>} */ (lib0_promise_js__WEBPACK_IMPORTED_MODULE_2__["resolve"](data))
  }
  const iv = crypto.getRandomValues(new Uint8Array(12))
  return crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    data
  ).then(cipher => {
    const encryptedDataEncoder = lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["createEncoder"]()
    lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["writeVarString"](encryptedDataEncoder, 'AES-GCM')
    lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["writeVarUint8Array"](encryptedDataEncoder, iv)
    lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["writeVarUint8Array"](encryptedDataEncoder, new Uint8Array(cipher))
    return lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["toUint8Array"](encryptedDataEncoder)
  })
}

/**
 * @param {Object} data data to be encrypted
 * @param {CryptoKey?} key
 * @return {PromiseLike<Uint8Array>} encrypted data, if key is provided
 */
const encryptJson = (data, key) => {
  const dataEncoder = lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["createEncoder"]()
  lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["writeAny"](dataEncoder, data)
  return encrypt(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_0__["toUint8Array"](dataEncoder), key)
}

/**
 * @param {Uint8Array} data
 * @param {CryptoKey?} key
 * @return {PromiseLike<Uint8Array>} decrypted buffer
 */
const decrypt = (data, key) => {
  if (!key) {
    return /** @type {PromiseLike<Uint8Array>} */ (lib0_promise_js__WEBPACK_IMPORTED_MODULE_2__["resolve"](data))
  }
  const dataDecoder = lib0_decoding_js__WEBPACK_IMPORTED_MODULE_1__["createDecoder"](data)
  const algorithm = lib0_decoding_js__WEBPACK_IMPORTED_MODULE_1__["readVarString"](dataDecoder)
  if (algorithm !== 'AES-GCM') {
    lib0_promise_js__WEBPACK_IMPORTED_MODULE_2__["reject"](lib0_error_js__WEBPACK_IMPORTED_MODULE_3__["create"]('Unknown encryption algorithm'))
  }
  const iv = lib0_decoding_js__WEBPACK_IMPORTED_MODULE_1__["readVarUint8Array"](dataDecoder)
  const cipher = lib0_decoding_js__WEBPACK_IMPORTED_MODULE_1__["readVarUint8Array"](dataDecoder)
  return crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    cipher
  ).then(data => new Uint8Array(data))
}

/**
 * @param {Uint8Array} data
 * @param {CryptoKey?} key
 * @return {PromiseLike<Object>} decrypted object
 */
const decryptJson = (data, key) =>
  decrypt(data, key).then(decryptedValue =>
    lib0_decoding_js__WEBPACK_IMPORTED_MODULE_1__["readAny"](lib0_decoding_js__WEBPACK_IMPORTED_MODULE_1__["createDecoder"](new Uint8Array(decryptedValue)))
  )


/***/ }),

/***/ "./node_modules/y-webrtc/src/y-webrtc.js":
/*!***********************************************!*\
  !*** ./node_modules/y-webrtc/src/y-webrtc.js ***!
  \***********************************************/
/*! exports provided: WebrtcConn, Room, SignalingConn, WebrtcProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebrtcConn", function() { return WebrtcConn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Room", function() { return Room; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignalingConn", function() { return SignalingConn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebrtcProvider", function() { return WebrtcProvider; });
/* harmony import */ var lib0_websocket_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lib0/websocket.js */ "./node_modules/lib0/websocket.js");
/* harmony import */ var lib0_map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lib0/map.js */ "./node_modules/lib0/map.js");
/* harmony import */ var lib0_error_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lib0/error.js */ "./node_modules/lib0/error.js");
/* harmony import */ var lib0_random_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lib0/random.js */ "./node_modules/lib0/random.js");
/* harmony import */ var lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lib0/encoding.js */ "./node_modules/lib0/encoding.js");
/* harmony import */ var lib0_decoding_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lib0/decoding.js */ "./node_modules/lib0/decoding.js");
/* harmony import */ var lib0_observable_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lib0/observable.js */ "./node_modules/lib0/observable.js");
/* harmony import */ var lib0_logging_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lib0/logging.js */ "./node_modules/lib0/logging.js");
/* harmony import */ var lib0_promise_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lib0/promise.js */ "./node_modules/lib0/promise.js");
/* harmony import */ var lib0_broadcastchannel_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lib0/broadcastchannel.js */ "./node_modules/lib0/broadcastchannel.js");
/* harmony import */ var lib0_buffer_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lib0/buffer.js */ "./node_modules/lib0/buffer.js");
/* harmony import */ var lib0_math_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lib0/math.js */ "./node_modules/lib0/math.js");
/* harmony import */ var lib0_mutex_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lib0/mutex.js */ "./node_modules/lib0/mutex.js");
/* harmony import */ var yjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! yjs */ "./node_modules/yjs/dist/yjs.mjs");
/* harmony import */ var simple_peer_simplepeer_min_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! simple-peer/simplepeer.min.js */ "./node_modules/simple-peer/simplepeer.min.js");
/* harmony import */ var simple_peer_simplepeer_min_js__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(simple_peer_simplepeer_min_js__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var y_protocols_sync_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! y-protocols/sync.js */ "./node_modules/y-protocols/sync.js");
/* harmony import */ var y_protocols_awareness_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! y-protocols/awareness.js */ "./node_modules/y-protocols/awareness.js");
/* harmony import */ var _crypto_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./crypto.js */ "./node_modules/y-webrtc/src/crypto.js");














 // eslint-disable-line







const log = lib0_logging_js__WEBPACK_IMPORTED_MODULE_7__["createModuleLogger"]('y-webrtc')

const messageSync = 0
const messageQueryAwareness = 3
const messageAwareness = 1
const messageBcPeerId = 4

/**
 * @type {Map<string, SignalingConn>}
 */
const signalingConns = new Map()

/**
 * @type {Map<string,Room>}
 */
const rooms = new Map()

/**
 * @param {Room} room
 */
const checkIsSynced = room => {
  let synced = true
  room.webrtcConns.forEach(peer => {
    if (!peer.synced) {
      synced = false
    }
  })
  if ((!synced && room.synced) || (synced && !room.synced)) {
    room.synced = synced
    room.provider.emit('synced', [{ synced }])
    log('synced ', lib0_logging_js__WEBPACK_IMPORTED_MODULE_7__["BOLD"], room.name, lib0_logging_js__WEBPACK_IMPORTED_MODULE_7__["UNBOLD"], ' with all peers')
  }
}

/**
 * @param {Room} room
 * @param {Uint8Array} buf
 * @param {function} syncedCallback
 * @return {encoding.Encoder?}
 */
const readMessage = (room, buf, syncedCallback) => {
  const decoder = lib0_decoding_js__WEBPACK_IMPORTED_MODULE_5__["createDecoder"](buf)
  const encoder = lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["createEncoder"]()
  const messageType = lib0_decoding_js__WEBPACK_IMPORTED_MODULE_5__["readVarUint"](decoder)
  if (room === undefined) {
    return null
  }
  const awareness = room.awareness
  const doc = room.doc
  let sendReply = false
  switch (messageType) {
    case messageSync: {
      lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["writeVarUint"](encoder, messageSync)
      const syncMessageType = y_protocols_sync_js__WEBPACK_IMPORTED_MODULE_15__["readSyncMessage"](decoder, encoder, doc, room)
      if (syncMessageType === y_protocols_sync_js__WEBPACK_IMPORTED_MODULE_15__["messageYjsSyncStep2"] && !room.synced) {
        syncedCallback()
      }
      if (syncMessageType === y_protocols_sync_js__WEBPACK_IMPORTED_MODULE_15__["messageYjsSyncStep1"]) {
        sendReply = true
      }
      break
    }
    case messageQueryAwareness:
      lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["writeVarUint"](encoder, messageAwareness)
      lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["writeVarUint8Array"](encoder, y_protocols_awareness_js__WEBPACK_IMPORTED_MODULE_16__["encodeAwarenessUpdate"](awareness, Array.from(awareness.getStates().keys())))
      sendReply = true
      break
    case messageAwareness:
      y_protocols_awareness_js__WEBPACK_IMPORTED_MODULE_16__["applyAwarenessUpdate"](awareness, lib0_decoding_js__WEBPACK_IMPORTED_MODULE_5__["readVarUint8Array"](decoder), room)
      break
    case messageBcPeerId: {
      const add = lib0_decoding_js__WEBPACK_IMPORTED_MODULE_5__["readUint8"](decoder) === 1
      const peerName = lib0_decoding_js__WEBPACK_IMPORTED_MODULE_5__["readVarString"](decoder)
      if (peerName !== room.peerId && ((room.bcConns.has(peerName) && !add) || (!room.bcConns.has(peerName) && add))) {
        const removed = []
        const added = []
        if (add) {
          room.bcConns.add(peerName)
          added.push(peerName)
        } else {
          room.bcConns.delete(peerName)
          removed.push(peerName)
        }
        room.provider.emit('peers', [{
          added,
          removed,
          webrtcPeers: Array.from(room.webrtcConns.keys()),
          bcPeers: Array.from(room.bcConns)
        }])
        broadcastBcPeerId(room)
      }
      break
    }
    default:
      console.error('Unable to compute message')
      return encoder
  }
  if (!sendReply) {
    // nothing has been written, no answer created
    return null
  }
  return encoder
}

/**
 * @param {WebrtcConn} peerConn
 * @param {Uint8Array} buf
 * @return {encoding.Encoder?}
 */
const readPeerMessage = (peerConn, buf) => {
  const room = peerConn.room
  log('received message from ', lib0_logging_js__WEBPACK_IMPORTED_MODULE_7__["BOLD"], peerConn.remotePeerId, lib0_logging_js__WEBPACK_IMPORTED_MODULE_7__["GREY"], ' (', room.name, ')', lib0_logging_js__WEBPACK_IMPORTED_MODULE_7__["UNBOLD"], lib0_logging_js__WEBPACK_IMPORTED_MODULE_7__["UNCOLOR"])
  return readMessage(room, buf, () => {
    peerConn.synced = true
    log('synced ', lib0_logging_js__WEBPACK_IMPORTED_MODULE_7__["BOLD"], room.name, lib0_logging_js__WEBPACK_IMPORTED_MODULE_7__["UNBOLD"], ' with ', lib0_logging_js__WEBPACK_IMPORTED_MODULE_7__["BOLD"], peerConn.remotePeerId)
    checkIsSynced(room)
  })
}

/**
 * @param {WebrtcConn} webrtcConn
 * @param {encoding.Encoder} encoder
 */
const sendWebrtcConn = (webrtcConn, encoder) => {
  log('send message to ', lib0_logging_js__WEBPACK_IMPORTED_MODULE_7__["BOLD"], webrtcConn.remotePeerId, lib0_logging_js__WEBPACK_IMPORTED_MODULE_7__["UNBOLD"], lib0_logging_js__WEBPACK_IMPORTED_MODULE_7__["GREY"], ' (', webrtcConn.room.name, ')', lib0_logging_js__WEBPACK_IMPORTED_MODULE_7__["UNCOLOR"])
  try {
    webrtcConn.peer.send(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["toUint8Array"](encoder))
  } catch (e) {}
}

/**
 * @param {Room} room
 * @param {Uint8Array} m
 */
const broadcastWebrtcConn = (room, m) => {
  log('broadcast message in ', lib0_logging_js__WEBPACK_IMPORTED_MODULE_7__["BOLD"], room.name, lib0_logging_js__WEBPACK_IMPORTED_MODULE_7__["UNBOLD"])
  room.webrtcConns.forEach(conn => {
    try {
      conn.peer.send(m)
    } catch (e) {}
  })
}

class WebrtcConn {
  /**
   * @param {SignalingConn} signalingConn
   * @param {boolean} initiator
   * @param {string} remotePeerId
   * @param {Room} room
   */
  constructor (signalingConn, initiator, remotePeerId, room) {
    log('establishing connection to ', lib0_logging_js__WEBPACK_IMPORTED_MODULE_7__["BOLD"], remotePeerId)
    this.room = room
    this.remotePeerId = remotePeerId
    this.closed = false
    this.connected = false
    this.synced = false
    /**
     * @type {any}
     */
    this.peer = new simple_peer_simplepeer_min_js__WEBPACK_IMPORTED_MODULE_14___default.a({ initiator, ...room.provider.peerOpts })
    this.peer.on('signal', signal => {
      publishSignalingMessage(signalingConn, room, { to: remotePeerId, from: room.peerId, type: 'signal', signal })
    })
    this.peer.on('connect', () => {
      log('connected to ', lib0_logging_js__WEBPACK_IMPORTED_MODULE_7__["BOLD"], remotePeerId)
      this.connected = true
      // send sync step 1
      const provider = room.provider
      const doc = provider.doc
      const awareness = room.awareness
      const encoder = lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["createEncoder"]()
      lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["writeVarUint"](encoder, messageSync)
      y_protocols_sync_js__WEBPACK_IMPORTED_MODULE_15__["writeSyncStep1"](encoder, doc)
      sendWebrtcConn(this, encoder)
      const awarenessStates = awareness.getStates()
      if (awarenessStates.size > 0) {
        const encoder = lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["createEncoder"]()
        lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["writeVarUint"](encoder, messageAwareness)
        lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["writeVarUint8Array"](encoder, y_protocols_awareness_js__WEBPACK_IMPORTED_MODULE_16__["encodeAwarenessUpdate"](awareness, Array.from(awarenessStates.keys())))
        sendWebrtcConn(this, encoder)
      }
    })
    this.peer.on('close', () => {
      this.connected = false
      this.closed = true
      if (room.webrtcConns.has(this.remotePeerId)) {
        room.webrtcConns.delete(this.remotePeerId)
        room.provider.emit('peers', [{
          removed: [this.remotePeerId],
          added: [],
          webrtcPeers: Array.from(room.webrtcConns.keys()),
          bcPeers: Array.from(room.bcConns)
        }])
      }
      checkIsSynced(room)
      this.peer.destroy()
      log('closed connection to ', lib0_logging_js__WEBPACK_IMPORTED_MODULE_7__["BOLD"], remotePeerId)
    })
    this.peer.on('error', err => {
      announceSignalingInfo(room)
      log('error in connection to ', lib0_logging_js__WEBPACK_IMPORTED_MODULE_7__["BOLD"], remotePeerId, ': ', err)
    })
    this.peer.on('data', data => {
      const answer = readPeerMessage(this, data)
      if (answer !== null) {
        sendWebrtcConn(this, answer)
      }
    })
  }

  destroy () {
    this.peer.destroy()
  }
}

/**
 * @param {Room} room
 * @param {Uint8Array} m
 */
const broadcastBcMessage = (room, m) => _crypto_js__WEBPACK_IMPORTED_MODULE_17__["encrypt"](m, room.key).then(data =>
  room.mux(() =>
    lib0_broadcastchannel_js__WEBPACK_IMPORTED_MODULE_9__["publish"](room.name, data)
  )
)

/**
 * @param {Room} room
 * @param {Uint8Array} m
 */
const broadcastRoomMessage = (room, m) => {
  if (room.bcconnected) {
    broadcastBcMessage(room, m)
  }
  broadcastWebrtcConn(room, m)
}

/**
 * @param {Room} room
 */
const announceSignalingInfo = room => {
  signalingConns.forEach(conn => {
    // only subcribe if connection is established, otherwise the conn automatically subscribes to all rooms
    if (conn.connected) {
      conn.send({ type: 'subscribe', topics: [room.name] })
      if (room.webrtcConns.size < room.provider.maxConns) {
        publishSignalingMessage(conn, room, { type: 'announce', from: room.peerId })
      }
    }
  })
}

/**
 * @param {Room} room
 */
const broadcastBcPeerId = room => {
  if (room.provider.filterBcConns) {
    // broadcast peerId via broadcastchannel
    const encoderPeerIdBc = lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["createEncoder"]()
    lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["writeVarUint"](encoderPeerIdBc, messageBcPeerId)
    lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["writeUint8"](encoderPeerIdBc, 1)
    lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["writeVarString"](encoderPeerIdBc, room.peerId)
    broadcastBcMessage(room, lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["toUint8Array"](encoderPeerIdBc))
  }
}

class Room {
  /**
   * @param {Y.Doc} doc
   * @param {WebrtcProvider} provider
   * @param {string} name
   * @param {CryptoKey|null} key
   */
  constructor (doc, provider, name, key) {
    /**
     * Do not assume that peerId is unique. This is only meant for sending signaling messages.
     *
     * @type {string}
     */
    this.peerId = lib0_random_js__WEBPACK_IMPORTED_MODULE_3__["uuidv4"]()
    this.doc = doc
    /**
     * @type {awarenessProtocol.Awareness}
     */
    this.awareness = provider.awareness
    this.provider = provider
    this.synced = false
    this.name = name
    // @todo make key secret by scoping
    this.key = key
    /**
     * @type {Map<string, WebrtcConn>}
     */
    this.webrtcConns = new Map()
    /**
     * @type {Set<string>}
     */
    this.bcConns = new Set()
    this.mux = Object(lib0_mutex_js__WEBPACK_IMPORTED_MODULE_12__["createMutex"])()
    this.bcconnected = false
    /**
     * @param {ArrayBuffer} data
     */
    this._bcSubscriber = data =>
      _crypto_js__WEBPACK_IMPORTED_MODULE_17__["decrypt"](new Uint8Array(data), key).then(m =>
        this.mux(() => {
          const reply = readMessage(this, m, () => {})
          if (reply) {
            broadcastBcMessage(this, lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["toUint8Array"](reply))
          }
        })
      )
    /**
     * Listens to Yjs updates and sends them to remote peers
     *
     * @param {Uint8Array} update
     * @param {any} origin
     */
    this._docUpdateHandler = (update, origin) => {
      if (origin !== this) {
        const encoder = lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["createEncoder"]()
        lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["writeVarUint"](encoder, messageSync)
        y_protocols_sync_js__WEBPACK_IMPORTED_MODULE_15__["writeUpdate"](encoder, update)
        broadcastRoomMessage(this, lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["toUint8Array"](encoder))
      }
    }
    /**
     * Listens to Awareness updates and sends them to remote peers
     *
     * @param {any} changed
     * @param {any} origin
     */
    this._awarenessUpdateHandler = ({ added, updated, removed }, origin) => {
      const changedClients = added.concat(updated).concat(removed)
      const encoderAwareness = lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["createEncoder"]()
      lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["writeVarUint"](encoderAwareness, messageAwareness)
      lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["writeVarUint8Array"](encoderAwareness, y_protocols_awareness_js__WEBPACK_IMPORTED_MODULE_16__["encodeAwarenessUpdate"](this.awareness, changedClients))
      broadcastRoomMessage(this, lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["toUint8Array"](encoderAwareness))
    }
    this.doc.on('update', this._docUpdateHandler)
    this.awareness.on('change', this._awarenessUpdateHandler)
    window.addEventListener('beforeunload', () => {
      y_protocols_awareness_js__WEBPACK_IMPORTED_MODULE_16__["removeAwarenessStates"](this.awareness, [doc.clientID], 'window unload')
      rooms.forEach(room => {
        room.disconnect()
      })
    })
  }

  connect () {
    // signal through all available signaling connections
    announceSignalingInfo(this)
    const roomName = this.name
    lib0_broadcastchannel_js__WEBPACK_IMPORTED_MODULE_9__["subscribe"](roomName, this._bcSubscriber)
    this.bcconnected = true
    // broadcast peerId via broadcastchannel
    broadcastBcPeerId(this)
    // write sync step 1
    const encoderSync = lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["createEncoder"]()
    lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["writeVarUint"](encoderSync, messageSync)
    y_protocols_sync_js__WEBPACK_IMPORTED_MODULE_15__["writeSyncStep1"](encoderSync, this.doc)
    broadcastBcMessage(this, lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["toUint8Array"](encoderSync))
    // broadcast local state
    const encoderState = lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["createEncoder"]()
    lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["writeVarUint"](encoderState, messageSync)
    y_protocols_sync_js__WEBPACK_IMPORTED_MODULE_15__["writeSyncStep2"](encoderState, this.doc)
    broadcastBcMessage(this, lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["toUint8Array"](encoderState))
    // write queryAwareness
    const encoderAwarenessQuery = lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["createEncoder"]()
    lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["writeVarUint"](encoderAwarenessQuery, messageQueryAwareness)
    broadcastBcMessage(this, lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["toUint8Array"](encoderAwarenessQuery))
    // broadcast local awareness state
    const encoderAwarenessState = lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["createEncoder"]()
    lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["writeVarUint"](encoderAwarenessState, messageAwareness)
    lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["writeVarUint8Array"](encoderAwarenessState, y_protocols_awareness_js__WEBPACK_IMPORTED_MODULE_16__["encodeAwarenessUpdate"](this.awareness, [this.doc.clientID]))
    broadcastBcMessage(this, lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["toUint8Array"](encoderAwarenessState))
  }

  disconnect () {
    // signal through all available signaling connections
    signalingConns.forEach(conn => {
      if (conn.connected) {
        conn.send({ type: 'unsubscribe', topics: [this.name] })
      }
    })
    y_protocols_awareness_js__WEBPACK_IMPORTED_MODULE_16__["removeAwarenessStates"](this.awareness, [this.doc.clientID], 'disconnect')
    // broadcast peerId removal via broadcastchannel
    const encoderPeerIdBc = lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["createEncoder"]()
    lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["writeVarUint"](encoderPeerIdBc, messageBcPeerId)
    lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["writeUint8"](encoderPeerIdBc, 0) // remove peerId from other bc peers
    lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["writeVarString"](encoderPeerIdBc, this.peerId)
    broadcastBcMessage(this, lib0_encoding_js__WEBPACK_IMPORTED_MODULE_4__["toUint8Array"](encoderPeerIdBc))

    lib0_broadcastchannel_js__WEBPACK_IMPORTED_MODULE_9__["unsubscribe"](this.name, this._bcSubscriber)
    this.bcconnected = false
    this.doc.off('update', this._docUpdateHandler)
    this.awareness.off('change', this._awarenessUpdateHandler)
    this.webrtcConns.forEach(conn => conn.destroy())
  }

  destroy () {
    this.disconnect()
  }
}

/**
 * @param {Y.Doc} doc
 * @param {WebrtcProvider} provider
 * @param {string} name
 * @param {CryptoKey|null} key
 * @return {Room}
 */
const openRoom = (doc, provider, name, key) => {
  // there must only be one room
  if (rooms.has(name)) {
    throw lib0_error_js__WEBPACK_IMPORTED_MODULE_2__["create"](`A Yjs Doc connected to room "${name}" already exists!`)
  }
  const room = new Room(doc, provider, name, key)
  rooms.set(name, /** @type {Room} */ (room))
  return room
}

/**
 * @param {SignalingConn} conn
 * @param {Room} room
 * @param {any} data
 */
const publishSignalingMessage = (conn, room, data) => {
  if (room.key) {
    _crypto_js__WEBPACK_IMPORTED_MODULE_17__["encryptJson"](data, room.key).then(data => {
      conn.send({ type: 'publish', topic: room.name, data: lib0_buffer_js__WEBPACK_IMPORTED_MODULE_10__["toBase64"](data) })
    })
  } else {
    conn.send({ type: 'publish', topic: room.name, data })
  }
}

class SignalingConn extends lib0_websocket_js__WEBPACK_IMPORTED_MODULE_0__["WebsocketClient"] {
  constructor (url) {
    super(url)
    /**
     * @type {Set<WebrtcProvider>}
     */
    this.providers = new Set()
    this.on('connect', () => {
      log(`connected (${url})`)
      const topics = Array.from(rooms.keys())
      this.send({ type: 'subscribe', topics })
      rooms.forEach(room =>
        publishSignalingMessage(this, room, { type: 'announce', from: room.peerId })
      )
    })
    this.on('message', m => {
      switch (m.type) {
        case 'publish': {
          const roomName = m.topic
          const room = rooms.get(roomName)
          if (room == null || typeof roomName !== 'string') {
            return
          }
          const execMessage = data => {
            const webrtcConns = room.webrtcConns
            const peerId = room.peerId
            if (data == null || data.from === peerId || (data.to !== undefined && data.to !== peerId) || room.bcConns.has(data.from)) {
              // ignore messages that are not addressed to this conn, or from clients that are connected via broadcastchannel
              return
            }
            const emitPeerChange = webrtcConns.has(data.from) ? () => {} : () =>
              room.provider.emit('peers', [{
                removed: [],
                added: [data.from],
                webrtcPeers: Array.from(room.webrtcConns.keys()),
                bcPeers: Array.from(room.bcConns)
              }])
            switch (data.type) {
              case 'announce':
                if (webrtcConns.size < room.provider.maxConns) {
                  lib0_map_js__WEBPACK_IMPORTED_MODULE_1__["setIfUndefined"](webrtcConns, data.from, () => new WebrtcConn(this, true, data.from, room))
                  emitPeerChange()
                }
                break
              case 'signal':
                if (data.to === peerId) {
                  lib0_map_js__WEBPACK_IMPORTED_MODULE_1__["setIfUndefined"](webrtcConns, data.from, () => new WebrtcConn(this, false, data.from, room)).peer.signal(data.signal)
                  emitPeerChange()
                }
                break
            }
          }
          if (room.key) {
            if (typeof m.data === 'string') {
              _crypto_js__WEBPACK_IMPORTED_MODULE_17__["decryptJson"](lib0_buffer_js__WEBPACK_IMPORTED_MODULE_10__["fromBase64"](m.data), room.key).then(execMessage)
            }
          } else {
            execMessage(m.data)
          }
        }
      }
    })
    this.on('disconnect', () => log(`disconnect (${url})`))
  }
}

/**
 * @extends Observable<string>
 */
class WebrtcProvider extends lib0_observable_js__WEBPACK_IMPORTED_MODULE_6__["Observable"] {
  /**
   * @param {string} roomName
   * @param {Y.Doc} doc
   * @param {Object} [opts]
   * @param {Array<string>} [opts.signaling]
   * @param {string?} [opts.password]
   * @param {awarenessProtocol.Awareness} [opts.awareness]
   * @param {number} [opts.maxConns]
   * @param {boolean} [opts.filterBcConns]
   * @param {any} [opts.peerOpts]
   */
  constructor (
    roomName,
    doc,
    {
      signaling = ['wss://signaling.yjs.dev', 'wss://y-webrtc-signaling-eu.herokuapp.com', 'wss://y-webrtc-signaling-us.herokuapp.com'],
      password = null,
      awareness = new y_protocols_awareness_js__WEBPACK_IMPORTED_MODULE_16__["Awareness"](doc),
      maxConns = 20 + lib0_math_js__WEBPACK_IMPORTED_MODULE_11__["floor"](lib0_random_js__WEBPACK_IMPORTED_MODULE_3__["rand"]() * 15), // the random factor reduces the chance that n clients form a cluster
      filterBcConns = true,
      peerOpts = {} // simple-peer options. See https://github.com/feross/simple-peer#peer--new-peeropts
    } = {}
  ) {
    super()
    this.roomName = roomName
    this.doc = doc
    this.filterBcConns = filterBcConns
    /**
     * @type {awarenessProtocol.Awareness}
     */
    this.awareness = awareness
    this.shouldConnect = false
    this.signalingUrls = signaling
    this.signalingConns = []
    this.maxConns = maxConns
    this.peerOpts = peerOpts
    /**
     * @type {PromiseLike<CryptoKey | null>}
     */
    this.key = password ? _crypto_js__WEBPACK_IMPORTED_MODULE_17__["deriveKey"](password, roomName) : /** @type {PromiseLike<null>} */ (lib0_promise_js__WEBPACK_IMPORTED_MODULE_8__["resolve"](null))
    /**
     * @type {Room|null}
     */
    this.room = null
    this.key.then(key => {
      this.room = openRoom(doc, this, roomName, key)
      if (this.shouldConnect) {
        this.room.connect()
      } else {
        this.room.disconnect()
      }
    })
    this.connect()
  }

  /**
   * @type {boolean}
   */
  get connected () {
    return this.room !== null && this.shouldConnect
  }

  connect () {
    this.shouldConnect = true
    this.signalingUrls.forEach(url => {
      const signalingConn = lib0_map_js__WEBPACK_IMPORTED_MODULE_1__["setIfUndefined"](signalingConns, url, () => new SignalingConn(url))
      this.signalingConns.push(signalingConn)
      signalingConn.providers.add(this)
    })
    if (this.room) {
      this.room.connect()
    }
  }

  disconnect () {
    this.shouldConnect = false
    this.signalingConns.forEach(conn => {
      conn.providers.delete(this)
      if (conn.providers.size === 0) {
        conn.destroy()
        signalingConns.delete(this.roomName)
      }
    })
    if (this.room) {
      this.room.disconnect()
    }
  }

  destroy () {
    // need to wait for key before deleting room
    this.key.then(() => {
      /** @type {Room} */ (this.room).destroy()
      rooms.delete(this.roomName)
    })
    super.destroy()
  }
}


/***/ }),

/***/ "./node_modules/yjs/dist/yjs.mjs":
/*!***************************************!*\
  !*** ./node_modules/yjs/dist/yjs.mjs ***!
  \***************************************/
/*! exports provided: AbstractStruct, AbstractType, Array, ContentAny, ContentBinary, ContentDeleted, ContentEmbed, ContentFormat, ContentJSON, ContentString, ContentType, Doc, GC, ID, Item, Map, PermanentUserData, RelativePosition, Snapshot, Text, Transaction, UndoManager, XmlElement, XmlFragment, XmlHook, XmlText, YArrayEvent, YEvent, YMapEvent, YXmlEvent, applyUpdate, compareIDs, compareRelativePositions, createAbsolutePositionFromRelativePosition, createDeleteSet, createDeleteSetFromStructStore, createID, createRelativePositionFromJSON, createRelativePositionFromTypeIndex, createSnapshot, decodeSnapshot, emptySnapshot, encodeSnapshot, encodeStateAsUpdate, encodeStateVector, equalSnapshots, findRootTypeKey, getState, isDeleted, isParentOf, iterateDeletedStructs, readRelativePosition, snapshot, transact, tryGc, typeListToArraySnapshot, typeMapGetSnapshot, writeRelativePosition */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractStruct", function() { return AbstractStruct; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractType", function() { return AbstractType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Array", function() { return YArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentAny", function() { return ContentAny; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentBinary", function() { return ContentBinary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentDeleted", function() { return ContentDeleted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentEmbed", function() { return ContentEmbed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentFormat", function() { return ContentFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentJSON", function() { return ContentJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentString", function() { return ContentString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentType", function() { return ContentType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Doc", function() { return Doc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GC", function() { return GC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ID", function() { return ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Item", function() { return Item; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Map", function() { return YMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PermanentUserData", function() { return PermanentUserData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RelativePosition", function() { return RelativePosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Snapshot", function() { return Snapshot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Text", function() { return YText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Transaction", function() { return Transaction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UndoManager", function() { return UndoManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XmlElement", function() { return YXmlElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XmlFragment", function() { return YXmlFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XmlHook", function() { return YXmlHook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XmlText", function() { return YXmlText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YArrayEvent", function() { return YArrayEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YEvent", function() { return YEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YMapEvent", function() { return YMapEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YXmlEvent", function() { return YXmlEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyUpdate", function() { return applyUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compareIDs", function() { return compareIDs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compareRelativePositions", function() { return compareRelativePositions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAbsolutePositionFromRelativePosition", function() { return createAbsolutePositionFromRelativePosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDeleteSet", function() { return createDeleteSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDeleteSetFromStructStore", function() { return createDeleteSetFromStructStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createID", function() { return createID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRelativePositionFromJSON", function() { return createRelativePositionFromJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createRelativePositionFromTypeIndex", function() { return createRelativePositionFromTypeIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSnapshot", function() { return createSnapshot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decodeSnapshot", function() { return decodeSnapshot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emptySnapshot", function() { return emptySnapshot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodeSnapshot", function() { return encodeSnapshot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodeStateAsUpdate", function() { return encodeStateAsUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encodeStateVector", function() { return encodeStateVector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equalSnapshots", function() { return equalSnapshots; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findRootTypeKey", function() { return findRootTypeKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getState", function() { return getState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDeleted", function() { return isDeleted; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isParentOf", function() { return isParentOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "iterateDeletedStructs", function() { return iterateDeletedStructs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readRelativePosition", function() { return readRelativePosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "snapshot", function() { return snapshot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transact", function() { return transact; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tryGc", function() { return tryGc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "typeListToArraySnapshot", function() { return typeListToArraySnapshot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "typeMapGetSnapshot", function() { return typeMapGetSnapshot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeRelativePosition", function() { return writeRelativePosition; });
/* harmony import */ var lib0_array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lib0/array.js */ "./node_modules/lib0/array.js");
/* harmony import */ var lib0_math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lib0/math.js */ "./node_modules/lib0/math.js");
/* harmony import */ var lib0_map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lib0/map.js */ "./node_modules/lib0/map.js");
/* harmony import */ var lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lib0/encoding.js */ "./node_modules/lib0/encoding.js");
/* harmony import */ var lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lib0/decoding.js */ "./node_modules/lib0/decoding.js");
/* harmony import */ var lib0_observable_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lib0/observable.js */ "./node_modules/lib0/observable.js");
/* harmony import */ var lib0_random_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lib0/random.js */ "./node_modules/lib0/random.js");
/* harmony import */ var lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lib0/binary.js */ "./node_modules/lib0/binary.js");
/* harmony import */ var lib0_function_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lib0/function.js */ "./node_modules/lib0/function.js");
/* harmony import */ var lib0_error_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lib0/error.js */ "./node_modules/lib0/error.js");
/* harmony import */ var lib0_set_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lib0/set.js */ "./node_modules/lib0/set.js");
/* harmony import */ var lib0_time_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! lib0/time.js */ "./node_modules/lib0/time.js");
/* harmony import */ var lib0_iterator_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! lib0/iterator.js */ "./node_modules/lib0/iterator.js");
/* harmony import */ var lib0_object_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! lib0/object.js */ "./node_modules/lib0/object.js");
/* harmony import */ var lib0_buffer_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! lib0/buffer.js */ "./node_modules/lib0/buffer.js");
















class DeleteItem {
  /**
   * @param {number} clock
   * @param {number} len
   */
  constructor (clock, len) {
    /**
     * @type {number}
     */
    this.clock = clock;
    /**
     * @type {number}
     */
    this.len = len;
  }
}

/**
 * We no longer maintain a DeleteStore. DeleteSet is a temporary object that is created when needed.
 * - When created in a transaction, it must only be accessed after sorting, and merging
 *   - This DeleteSet is send to other clients
 * - We do not create a DeleteSet when we send a sync message. The DeleteSet message is created directly from StructStore
 * - We read a DeleteSet as part of a sync/update message. In this case the DeleteSet is already sorted and merged.
 */
class DeleteSet {
  constructor () {
    /**
     * @type {Map<number,Array<DeleteItem>>}
     */
    this.clients = new Map();
  }
}

/**
 * Iterate over all structs that the DeleteSet gc's.
 *
 * @param {Transaction} transaction
 * @param {DeleteSet} ds
 * @param {function(GC|Item):void} f
 *
 * @function
 */
const iterateDeletedStructs = (transaction, ds, f) =>
  ds.clients.forEach((deletes, clientid) => {
    const structs = /** @type {Array<GC|Item>} */ (transaction.doc.store.clients.get(clientid));
    for (let i = 0; i < deletes.length; i++) {
      const del = deletes[i];
      iterateStructs(transaction, structs, del.clock, del.len, f);
    }
  });

/**
 * @param {Array<DeleteItem>} dis
 * @param {number} clock
 * @return {number|null}
 *
 * @private
 * @function
 */
const findIndexDS = (dis, clock) => {
  let left = 0;
  let right = dis.length - 1;
  while (left <= right) {
    const midindex = Object(lib0_math_js__WEBPACK_IMPORTED_MODULE_1__["floor"])((left + right) / 2);
    const mid = dis[midindex];
    const midclock = mid.clock;
    if (midclock <= clock) {
      if (clock < midclock + mid.len) {
        return midindex
      }
      left = midindex + 1;
    } else {
      right = midindex - 1;
    }
  }
  return null
};

/**
 * @param {DeleteSet} ds
 * @param {ID} id
 * @return {boolean}
 *
 * @private
 * @function
 */
const isDeleted = (ds, id) => {
  const dis = ds.clients.get(id.client);
  return dis !== undefined && findIndexDS(dis, id.clock) !== null
};

/**
 * @param {DeleteSet} ds
 *
 * @private
 * @function
 */
const sortAndMergeDeleteSet = ds => {
  ds.clients.forEach(dels => {
    dels.sort((a, b) => a.clock - b.clock);
    // merge items without filtering or splicing the array
    // i is the current pointer
    // j refers to the current insert position for the pointed item
    // try to merge dels[i] into dels[j-1] or set dels[j]=dels[i]
    let i, j;
    for (i = 1, j = 1; i < dels.length; i++) {
      const left = dels[j - 1];
      const right = dels[i];
      if (left.clock + left.len === right.clock) {
        left.len += right.len;
      } else {
        if (j < i) {
          dels[j] = right;
        }
        j++;
      }
    }
    dels.length = j;
  });
};

/**
 * @param {Array<DeleteSet>} dss
 * @return {DeleteSet} A fresh DeleteSet
 */
const mergeDeleteSets = dss => {
  const merged = new DeleteSet();
  for (let dssI = 0; dssI < dss.length; dssI++) {
    dss[dssI].clients.forEach((delsLeft, client) => {
      if (!merged.clients.has(client)) {
        // Write all missing keys from current ds and all following.
        // If merged already contains `client` current ds has already been added.
        /**
         * @type {Array<DeleteItem>}
         */
        const dels = delsLeft.slice();
        for (let i = dssI + 1; i < dss.length; i++) {
          Object(lib0_array_js__WEBPACK_IMPORTED_MODULE_0__["appendTo"])(dels, dss[i].clients.get(client) || []);
        }
        merged.clients.set(client, dels);
      }
    });
  }
  sortAndMergeDeleteSet(merged);
  return merged
};

/**
 * @param {DeleteSet} ds
 * @param {ID} id
 * @param {number} length
 *
 * @private
 * @function
 */
const addToDeleteSet = (ds, id, length) => {
  Object(lib0_map_js__WEBPACK_IMPORTED_MODULE_2__["setIfUndefined"])(ds.clients, id.client, () => []).push(new DeleteItem(id.clock, length));
};

const createDeleteSet = () => new DeleteSet();

/**
 * @param {StructStore} ss
 * @return {DeleteSet} Merged and sorted DeleteSet
 *
 * @private
 * @function
 */
const createDeleteSetFromStructStore = ss => {
  const ds = createDeleteSet();
  ss.clients.forEach((structs, client) => {
    /**
     * @type {Array<DeleteItem>}
     */
    const dsitems = [];
    for (let i = 0; i < structs.length; i++) {
      const struct = structs[i];
      if (struct.deleted) {
        const clock = struct.id.clock;
        let len = struct.length;
        if (i + 1 < structs.length) {
          for (let next = structs[i + 1]; i + 1 < structs.length && next.id.clock === clock + len && next.deleted; next = structs[++i + 1]) {
            len += next.length;
          }
        }
        dsitems.push(new DeleteItem(clock, len));
      }
    }
    if (dsitems.length > 0) {
      ds.clients.set(client, dsitems);
    }
  });
  return ds
};

/**
 * @param {encoding.Encoder} encoder
 * @param {DeleteSet} ds
 *
 * @private
 * @function
 */
const writeDeleteSet = (encoder, ds) => {
  Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, ds.clients.size);
  ds.clients.forEach((dsitems, client) => {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, client);
    const len = dsitems.length;
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, len);
    for (let i = 0; i < len; i++) {
      const item = dsitems[i];
      Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, item.clock);
      Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, item.len);
    }
  });
};

/**
 * @param {decoding.Decoder} decoder
 * @return {DeleteSet}
 *
 * @private
 * @function
 */
const readDeleteSet = decoder => {
  const ds = new DeleteSet();
  const numClients = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
  for (let i = 0; i < numClients; i++) {
    const client = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
    const numberOfDeletes = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
    for (let i = 0; i < numberOfDeletes; i++) {
      addToDeleteSet(ds, createID(client, Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder)), Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder));
    }
  }
  return ds
};

/**
 * @param {decoding.Decoder} decoder
 * @param {Transaction} transaction
 * @param {StructStore} store
 *
 * @private
 * @function
 */
const readAndApplyDeleteSet = (decoder, transaction, store) => {
  const unappliedDS = new DeleteSet();
  const numClients = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
  for (let i = 0; i < numClients; i++) {
    const client = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
    const numberOfDeletes = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
    const structs = store.clients.get(client) || [];
    const state = getState(store, client);
    for (let i = 0; i < numberOfDeletes; i++) {
      const clock = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
      const len = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
      if (clock < state) {
        if (state < clock + len) {
          addToDeleteSet(unappliedDS, createID(client, state), clock + len - state);
        }
        let index = findIndexSS(structs, clock);
        /**
         * We can ignore the case of GC and Delete structs, because we are going to skip them
         * @type {Item}
         */
        // @ts-ignore
        let struct = structs[index];
        // split the first item if necessary
        if (!struct.deleted && struct.id.clock < clock) {
          structs.splice(index + 1, 0, splitItem(transaction, struct, clock - struct.id.clock));
          index++; // increase we now want to use the next struct
        }
        while (index < structs.length) {
          // @ts-ignore
          struct = structs[index++];
          if (struct.id.clock < clock + len) {
            if (!struct.deleted) {
              if (clock + len < struct.id.clock + struct.length) {
                structs.splice(index, 0, splitItem(transaction, struct, clock + len - struct.id.clock));
              }
              struct.delete(transaction);
            }
          } else {
            break
          }
        }
      } else {
        addToDeleteSet(unappliedDS, createID(client, clock), len);
      }
    }
  }
  if (unappliedDS.clients.size > 0) {
    // TODO: no need for encoding+decoding ds anymore
    const unappliedDSEncoder = Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["createEncoder"])();
    writeDeleteSet(unappliedDSEncoder, unappliedDS);
    store.pendingDeleteReaders.push(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["createDecoder"])(Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["toUint8Array"])(unappliedDSEncoder)));
  }
};

/**
 * @module Y
 */

/**
 * A Yjs instance handles the state of shared data.
 * @extends Observable<string>
 */
class Doc extends lib0_observable_js__WEBPACK_IMPORTED_MODULE_5__["Observable"] {
  /**
   * @param {Object} conf configuration
   * @param {boolean} [conf.gc] Disable garbage collection (default: gc=true)
   * @param {function(Item):boolean} [conf.gcFilter] Will be called before an Item is garbage collected. Return false to keep the Item.
   */
  constructor ({ gc = true, gcFilter = () => true } = {}) {
    super();
    this.gc = gc;
    this.gcFilter = gcFilter;
    this.clientID = Object(lib0_random_js__WEBPACK_IMPORTED_MODULE_6__["uint32"])();
    /**
     * @type {Map<string, AbstractType<YEvent>>}
     */
    this.share = new Map();
    this.store = new StructStore();
    /**
     * @type {Transaction | null}
     */
    this._transaction = null;
    /**
     * @type {Array<Transaction>}
     */
    this._transactionCleanups = [];
  }

  /**
   * Changes that happen inside of a transaction are bundled. This means that
   * the observer fires _after_ the transaction is finished and that all changes
   * that happened inside of the transaction are sent as one message to the
   * other peers.
   *
   * @param {function(Transaction):void} f The function that should be executed as a transaction
   * @param {any} [origin] Origin of who started the transaction. Will be stored on transaction.origin
   *
   * @public
   */
  transact (f, origin = null) {
    transact(this, f, origin);
  }

  /**
   * Define a shared data type.
   *
   * Multiple calls of `y.get(name, TypeConstructor)` yield the same result
   * and do not overwrite each other. I.e.
   * `y.define(name, Y.Array) === y.define(name, Y.Array)`
   *
   * After this method is called, the type is also available on `y.share.get(name)`.
   *
   * *Best Practices:*
   * Define all types right after the Yjs instance is created and store them in a separate object.
   * Also use the typed methods `getText(name)`, `getArray(name)`, ..
   *
   * @example
   *   const y = new Y(..)
   *   const appState = {
   *     document: y.getText('document')
   *     comments: y.getArray('comments')
   *   }
   *
   * @param {string} name
   * @param {Function} TypeConstructor The constructor of the type definition. E.g. Y.Text, Y.Array, Y.Map, ...
   * @return {AbstractType<any>} The created type. Constructed with TypeConstructor
   *
   * @public
   */
  get (name, TypeConstructor = AbstractType) {
    const type = Object(lib0_map_js__WEBPACK_IMPORTED_MODULE_2__["setIfUndefined"])(this.share, name, () => {
      // @ts-ignore
      const t = new TypeConstructor();
      t._integrate(this, null);
      return t
    });
    const Constr = type.constructor;
    if (TypeConstructor !== AbstractType && Constr !== TypeConstructor) {
      if (Constr === AbstractType) {
        // @ts-ignore
        const t = new TypeConstructor();
        t._map = type._map;
        type._map.forEach(/** @param {Item?} n */ n => {
          for (; n !== null; n = n.left) {
            // @ts-ignore
            n.parent = t;
          }
        });
        t._start = type._start;
        for (let n = t._start; n !== null; n = n.right) {
          n.parent = t;
        }
        t._length = type._length;
        this.share.set(name, t);
        t._integrate(this, null);
        return t
      } else {
        throw new Error(`Type with the name ${name} has already been defined with a different constructor`)
      }
    }
    return type
  }

  /**
   * @template T
   * @param {string} name
   * @return {YArray<T>}
   *
   * @public
   */
  getArray (name) {
    // @ts-ignore
    return this.get(name, YArray)
  }

  /**
   * @param {string} name
   * @return {YText}
   *
   * @public
   */
  getText (name) {
    // @ts-ignore
    return this.get(name, YText)
  }

  /**
   * @param {string} name
   * @return {YMap<any>}
   *
   * @public
   */
  getMap (name) {
    // @ts-ignore
    return this.get(name, YMap)
  }

  /**
   * @param {string} name
   * @return {YXmlFragment}
   *
   * @public
   */
  getXmlFragment (name) {
    // @ts-ignore
    return this.get(name, YXmlFragment)
  }

  /**
   * Emit `destroy` event and unregister all event handlers.
   */
  destroy () {
    this.emit('destroyed', [true]);
    super.destroy();
  }

  /**
   * @param {string} eventName
   * @param {function} f
   */
  on (eventName, f) {
    super.on(eventName, f);
  }

  /**
   * @param {string} eventName
   * @param {function} f
   */
  off (eventName, f) {
    super.off(eventName, f);
  }
}

/**
 * @param {encoding.Encoder} encoder
 * @param {Array<AbstractStruct>} structs All structs by `client`
 * @param {number} client
 * @param {number} clock write structs starting with `ID(client,clock)`
 *
 * @function
 */
const writeStructs = (encoder, structs, client, clock) => {
  // write first id
  const startNewStructs = findIndexSS(structs, clock);
  // write # encoded structs
  Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, structs.length - startNewStructs);
  writeID(encoder, createID(client, clock));
  const firstStruct = structs[startNewStructs];
  // write first struct with an offset
  firstStruct.write(encoder, clock - firstStruct.id.clock, 0);
  for (let i = startNewStructs + 1; i < structs.length; i++) {
    structs[i].write(encoder, 0, 0);
  }
};

/**
 * @param {decoding.Decoder} decoder
 * @param {number} numOfStructs
 * @param {ID} nextID
 * @return {Array<GCRef|ItemRef>}
 *
 * @private
 * @function
 */
const readStructRefs = (decoder, numOfStructs, nextID) => {
  /**
   * @type {Array<GCRef|ItemRef>}
   */
  const refs = [];
  for (let i = 0; i < numOfStructs; i++) {
    const info = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readUint8"])(decoder);
    const ref = (lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BITS5"] & info) === 0 ? new GCRef(decoder, nextID, info) : new ItemRef(decoder, nextID, info);
    nextID = createID(nextID.client, nextID.clock + ref.length);
    refs.push(ref);
  }
  return refs
};

/**
 * @param {encoding.Encoder} encoder
 * @param {StructStore} store
 * @param {Map<number,number>} _sm
 *
 * @private
 * @function
 */
const writeClientsStructs = (encoder, store, _sm) => {
  // we filter all valid _sm entries into sm
  const sm = new Map();
  _sm.forEach((clock, client) => {
    // only write if new structs are available
    if (getState(store, client) > clock) {
      sm.set(client, clock);
    }
  });
  getStateVector(store).forEach((clock, client) => {
    if (!_sm.has(client)) {
      sm.set(client, 0);
    }
  });
  // write # states that were updated
  Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, sm.size);
  sm.forEach((clock, client) => {
    // @ts-ignore
    writeStructs(encoder, store.clients.get(client), client, clock);
  });
};

/**
 * @param {decoding.Decoder} decoder The decoder object to read data from.
 * @return {Map<number,Array<GCRef|ItemRef>>}
 *
 * @private
 * @function
 */
const readClientsStructRefs = decoder => {
  /**
   * @type {Map<number,Array<GCRef|ItemRef>>}
   */
  const clientRefs = new Map();
  const numOfStateUpdates = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
  for (let i = 0; i < numOfStateUpdates; i++) {
    const numberOfStructs = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
    const nextID = readID(decoder);
    const refs = readStructRefs(decoder, numberOfStructs, nextID);
    clientRefs.set(nextID.client, refs);
  }
  return clientRefs
};

/**
 * Resume computing structs generated by struct readers.
 *
 * While there is something to do, we integrate structs in this order
 * 1. top element on stack, if stack is not empty
 * 2. next element from current struct reader (if empty, use next struct reader)
 *
 * If struct causally depends on another struct (ref.missing), we put next reader of
 * `ref.id.client` on top of stack.
 *
 * At some point we find a struct that has no causal dependencies,
 * then we start emptying the stack.
 *
 * It is not possible to have circles: i.e. struct1 (from client1) depends on struct2 (from client2)
 * depends on struct3 (from client1). Therefore the max stack size is eqaul to `structReaders.length`.
 *
 * This method is implemented in a way so that we can resume computation if this update
 * causally depends on another update.
 *
 * @param {Transaction} transaction
 * @param {StructStore} store
 *
 * @private
 * @function
 */
const resumeStructIntegration = (transaction, store) => {
  const stack = store.pendingStack;
  const clientsStructRefs = store.pendingClientsStructRefs;
  // iterate over all struct readers until we are done
  while (stack.length !== 0 || clientsStructRefs.size !== 0) {
    if (stack.length === 0) {
      // take any first struct from clientsStructRefs and put it on the stack
      const [client, structRefs] = clientsStructRefs.entries().next().value;
      stack.push(structRefs.refs[structRefs.i++]);
      if (structRefs.refs.length === structRefs.i) {
        clientsStructRefs.delete(client);
      }
    }
    const ref = stack[stack.length - 1];
    const m = ref._missing;
    const client = ref.id.client;
    const localClock = getState(store, client);
    const offset = ref.id.clock < localClock ? localClock - ref.id.clock : 0;
    if (ref.id.clock + offset !== localClock) {
      // A previous message from this client is missing
      // check if there is a pending structRef with a smaller clock and switch them
      const structRefs = clientsStructRefs.get(client);
      if (structRefs !== undefined) {
        const r = structRefs.refs[structRefs.i];
        if (r.id.clock < ref.id.clock) {
          // put ref with smaller clock on stack instead and continue
          structRefs.refs[structRefs.i] = ref;
          stack[stack.length - 1] = r;
          // sort the set because this approach might bring the list out of order
          structRefs.refs = structRefs.refs.slice(structRefs.i).sort((r1, r2) => r1.id.clock - r2.id.clock);
          structRefs.i = 0;
          continue
        }
      }
      // wait until missing struct is available
      return
    }
    while (m.length > 0) {
      const missing = m[m.length - 1];
      if (getState(store, missing.client) <= missing.clock) {
        const client = missing.client;
        // get the struct reader that has the missing struct
        const structRefs = clientsStructRefs.get(client);
        if (structRefs === undefined) {
          // This update message causally depends on another update message.
          return
        }
        stack.push(structRefs.refs[structRefs.i++]);
        if (structRefs.i === structRefs.refs.length) {
          clientsStructRefs.delete(client);
        }
        break
      }
      ref._missing.pop();
    }
    if (m.length === 0) {
      if (offset < ref.length) {
        ref.toStruct(transaction, store, offset).integrate(transaction);
      }
      stack.pop();
    }
  }
};

/**
 * @param {Transaction} transaction
 * @param {StructStore} store
 *
 * @private
 * @function
 */
const tryResumePendingDeleteReaders = (transaction, store) => {
  const pendingReaders = store.pendingDeleteReaders;
  store.pendingDeleteReaders = [];
  for (let i = 0; i < pendingReaders.length; i++) {
    readAndApplyDeleteSet(pendingReaders[i], transaction, store);
  }
};

/**
 * @param {encoding.Encoder} encoder
 * @param {Transaction} transaction
 *
 * @private
 * @function
 */
const writeStructsFromTransaction = (encoder, transaction) => writeClientsStructs(encoder, transaction.doc.store, transaction.beforeState);

/**
 * @param {StructStore} store
 * @param {Map<number, Array<GCRef|ItemRef>>} clientsStructsRefs
 *
 * @private
 * @function
 */
const mergeReadStructsIntoPendingReads = (store, clientsStructsRefs) => {
  const pendingClientsStructRefs = store.pendingClientsStructRefs;
  for (const [client, structRefs] of clientsStructsRefs) {
    const pendingStructRefs = pendingClientsStructRefs.get(client);
    if (pendingStructRefs === undefined) {
      pendingClientsStructRefs.set(client, { refs: structRefs, i: 0 });
    } else {
      // merge into existing structRefs
      const merged = pendingStructRefs.i > 0 ? pendingStructRefs.refs.slice(pendingStructRefs.i) : pendingStructRefs.refs;
      for (let i = 0; i < structRefs.length; i++) {
        merged.push(structRefs[i]);
      }
      pendingStructRefs.i = 0;
      pendingStructRefs.refs = merged.sort((r1, r2) => r1.id.clock - r2.id.clock);
    }
  }
};

/**
 * Read the next Item in a Decoder and fill this Item with the read data.
 *
 * This is called when data is received from a remote peer.
 *
 * @param {decoding.Decoder} decoder The decoder object to read data from.
 * @param {Transaction} transaction
 * @param {StructStore} store
 *
 * @private
 * @function
 */
const readStructs = (decoder, transaction, store) => {
  const clientsStructRefs = readClientsStructRefs(decoder);
  mergeReadStructsIntoPendingReads(store, clientsStructRefs);
  resumeStructIntegration(transaction, store);
  tryResumePendingDeleteReaders(transaction, store);
};

/**
 * Read and apply a document update.
 *
 * This function has the same effect as `applyUpdate` but accepts an decoder.
 *
 * @param {decoding.Decoder} decoder
 * @param {Doc} ydoc
 * @param {any} [transactionOrigin] This will be stored on `transaction.origin` and `.on('update', (update, origin))`
 *
 * @function
 */
const readUpdate = (decoder, ydoc, transactionOrigin) =>
  transact(ydoc, transaction => {
    readStructs(decoder, transaction, ydoc.store);
    readAndApplyDeleteSet(decoder, transaction, ydoc.store);
  }, transactionOrigin, false);

/**
 * Apply a document update created by, for example, `y.on('update', update => ..)` or `update = encodeStateAsUpdate()`.
 *
 * This function has the same effect as `readUpdate` but accepts an Uint8Array instead of a Decoder.
 *
 * @param {Doc} ydoc
 * @param {Uint8Array} update
 * @param {any} [transactionOrigin] This will be stored on `transaction.origin` and `.on('update', (update, origin))`
 *
 * @function
 */
const applyUpdate = (ydoc, update, transactionOrigin) =>
  readUpdate(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["createDecoder"])(update), ydoc, transactionOrigin);

/**
 * Write all the document as a single update message. If you specify the state of the remote client (`targetStateVector`) it will
 * only write the operations that are missing.
 *
 * @param {encoding.Encoder} encoder
 * @param {Doc} doc
 * @param {Map<number,number>} [targetStateVector] The state of the target that receives the update. Leave empty to write all known structs
 *
 * @function
 */
const writeStateAsUpdate = (encoder, doc, targetStateVector = new Map()) => {
  writeClientsStructs(encoder, doc.store, targetStateVector);
  writeDeleteSet(encoder, createDeleteSetFromStructStore(doc.store));
};

/**
 * Write all the document as a single update message that can be applied on the remote document. If you specify the state of the remote client (`targetState`) it will
 * only write the operations that are missing.
 *
 * Use `writeStateAsUpdate` instead if you are working with lib0/encoding.js#Encoder
 *
 * @param {Doc} doc
 * @param {Uint8Array} [encodedTargetStateVector] The state of the target that receives the update. Leave empty to write all known structs
 * @return {Uint8Array}
 *
 * @function
 */
const encodeStateAsUpdate = (doc, encodedTargetStateVector) => {
  const encoder = Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["createEncoder"])();
  const targetStateVector = encodedTargetStateVector == null ? new Map() : decodeStateVector(encodedTargetStateVector);
  writeStateAsUpdate(encoder, doc, targetStateVector);
  return Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["toUint8Array"])(encoder)
};

/**
 * Read state vector from Decoder and return as Map
 *
 * @param {decoding.Decoder} decoder
 * @return {Map<number,number>} Maps `client` to the number next expected `clock` from that client.
 *
 * @function
 */
const readStateVector = decoder => {
  const ss = new Map();
  const ssLength = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
  for (let i = 0; i < ssLength; i++) {
    const client = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
    const clock = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
    ss.set(client, clock);
  }
  return ss
};

/**
 * Read decodedState and return State as Map.
 *
 * @param {Uint8Array} decodedState
 * @return {Map<number,number>} Maps `client` to the number next expected `clock` from that client.
 *
 * @function
 */
const decodeStateVector = decodedState => readStateVector(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["createDecoder"])(decodedState));

/**
 * Write State Vector to `lib0/encoding.js#Encoder`.
 *
 * @param {encoding.Encoder} encoder
 * @param {Map<number,number>} sv
 * @function
 */
const writeStateVector = (encoder, sv) => {
  Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, sv.size);
  sv.forEach((clock, client) => {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, client);
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, clock);
  });
  return encoder
};

/**
 * Write State Vector to `lib0/encoding.js#Encoder`.
 *
 * @param {encoding.Encoder} encoder
 * @param {Doc} doc
 *
 * @function
 */
const writeDocumentStateVector = (encoder, doc) => writeStateVector(encoder, getStateVector(doc.store));

/**
 * Encode State as Uint8Array.
 *
 * @param {Doc} doc
 * @return {Uint8Array}
 *
 * @function
 */
const encodeStateVector = doc => {
  const encoder = Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["createEncoder"])();
  writeDocumentStateVector(encoder, doc);
  return Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["toUint8Array"])(encoder)
};

/**
 * General event handler implementation.
 *
 * @template ARG0, ARG1
 *
 * @private
 */
class EventHandler {
  constructor () {
    /**
     * @type {Array<function(ARG0, ARG1):void>}
     */
    this.l = [];
  }
}

/**
 * @template ARG0,ARG1
 * @returns {EventHandler<ARG0,ARG1>}
 *
 * @private
 * @function
 */
const createEventHandler = () => new EventHandler();

/**
 * Adds an event listener that is called when
 * {@link EventHandler#callEventListeners} is called.
 *
 * @template ARG0,ARG1
 * @param {EventHandler<ARG0,ARG1>} eventHandler
 * @param {function(ARG0,ARG1):void} f The event handler.
 *
 * @private
 * @function
 */
const addEventHandlerListener = (eventHandler, f) =>
  eventHandler.l.push(f);

/**
 * Removes an event listener.
 *
 * @template ARG0,ARG1
 * @param {EventHandler<ARG0,ARG1>} eventHandler
 * @param {function(ARG0,ARG1):void} f The event handler that was added with
 *                     {@link EventHandler#addEventListener}
 *
 * @private
 * @function
 */
const removeEventHandlerListener = (eventHandler, f) => {
  eventHandler.l = eventHandler.l.filter(g => f !== g);
};

/**
 * Call all event listeners that were added via
 * {@link EventHandler#addEventListener}.
 *
 * @template ARG0,ARG1
 * @param {EventHandler<ARG0,ARG1>} eventHandler
 * @param {ARG0} arg0
 * @param {ARG1} arg1
 *
 * @private
 * @function
 */
const callEventHandlerListeners = (eventHandler, arg0, arg1) =>
  Object(lib0_function_js__WEBPACK_IMPORTED_MODULE_8__["callAll"])(eventHandler.l, [arg0, arg1]);

class ID {
  /**
   * @param {number} client client id
   * @param {number} clock unique per client id, continuous number
   */
  constructor (client, clock) {
    /**
     * Client id
     * @type {number}
     */
    this.client = client;
    /**
     * unique per client id, continuous number
     * @type {number}
     */
    this.clock = clock;
  }
}

/**
 * @param {ID | null} a
 * @param {ID | null} b
 * @return {boolean}
 *
 * @function
 */
const compareIDs = (a, b) => a === b || (a !== null && b !== null && a.client === b.client && a.clock === b.clock);

/**
 * @param {number} client
 * @param {number} clock
 *
 * @private
 * @function
 */
const createID = (client, clock) => new ID(client, clock);

/**
 * @param {encoding.Encoder} encoder
 * @param {ID} id
 *
 * @private
 * @function
 */
const writeID = (encoder, id) => {
  Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, id.client);
  Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, id.clock);
};

/**
 * Read ID.
 * * If first varUint read is 0xFFFFFF a RootID is returned.
 * * Otherwise an ID is returned
 *
 * @param {decoding.Decoder} decoder
 * @return {ID}
 *
 * @private
 * @function
 */
const readID = decoder =>
  createID(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder), Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder));

/**
 * The top types are mapped from y.share.get(keyname) => type.
 * `type` does not store any information about the `keyname`.
 * This function finds the correct `keyname` for `type` and throws otherwise.
 *
 * @param {AbstractType<any>} type
 * @return {string}
 *
 * @private
 * @function
 */
const findRootTypeKey = type => {
  // @ts-ignore _y must be defined, otherwise unexpected case
  for (const [key, value] of type.doc.share) {
    if (value === type) {
      return key
    }
  }
  throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["unexpectedCase"])()
};

/**
 * Check if `parent` is a parent of `child`.
 *
 * @param {AbstractType<any>} parent
 * @param {Item|null} child
 * @return {Boolean} Whether `parent` is a parent of `child`.
 *
 * @private
 * @function
 */
const isParentOf = (parent, child) => {
  while (child !== null) {
    if (child.parent === parent) {
      return true
    }
    child = child.parent._item;
  }
  return false
};

class PermanentUserData {
  /**
   * @param {Doc} doc
   * @param {YMap<any>} [storeType]
   */
  constructor (doc, storeType = doc.getMap('users')) {
    /**
     * @type {Map<string,DeleteSet>}
     */
    const dss = new Map();
    this.yusers = storeType;
    this.doc = doc;
    /**
     * Maps from clientid to userDescription
     *
     * @type {Map<number,string>}
     */
    this.clients = new Map();
    this.dss = dss;
    /**
     * @param {YMap<any>} user
     * @param {string} userDescription
     */
    const initUser = (user, userDescription) => {
      /**
       * @type {YArray<Uint8Array>}
       */
      const ds = user.get('ds');
      const ids = user.get('ids');
      const addClientId = /** @param {number} clientid */ clientid => this.clients.set(clientid, userDescription);
      ds.observe(/** @param {YArrayEvent<any>} event */ event => {
        event.changes.added.forEach(item => {
          item.content.getContent().forEach(encodedDs => {
            if (encodedDs instanceof Uint8Array) {
              this.dss.set(userDescription, mergeDeleteSets([this.dss.get(userDescription) || createDeleteSet(), readDeleteSet(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["createDecoder"])(encodedDs))]));
            }
          });
        });
      });
      this.dss.set(userDescription, mergeDeleteSets(ds.map(encodedDs => readDeleteSet(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["createDecoder"])(encodedDs)))));
      ids.observe(/** @param {YArrayEvent<any>} event */ event =>
        event.changes.added.forEach(item => item.content.getContent().forEach(addClientId))
      );
      ids.forEach(addClientId);
    };
    // observe users
    storeType.observe(event => {
      event.keysChanged.forEach(userDescription =>
        initUser(storeType.get(userDescription), userDescription)
      );
    });
    // add intial data
    storeType.forEach(initUser);
  }

  /**
   * @param {Doc} doc
   * @param {number} clientid
   * @param {string} userDescription
   * @param {Object} [conf]
   * @param {function(Transaction, DeleteSet):boolean} [conf.filter]
   */
  setUserMapping (doc, clientid, userDescription, { filter = () => true } = {}) {
    const users = this.yusers;
    let user = users.get(userDescription);
    if (!user) {
      user = new YMap();
      user.set('ids', new YArray());
      user.set('ds', new YArray());
      users.set(userDescription, user);
    }
    user.get('ids').push([clientid]);
    users.observe(event => {
      setTimeout(() => {
        const userOverwrite = users.get(userDescription);
        if (userOverwrite !== user) {
          // user was overwritten, port all data over to the next user object
          // @todo Experiment with Y.Sets here
          user = userOverwrite;
          // @todo iterate over old type
          this.clients.forEach((_userDescription, clientid) => {
            if (userDescription === _userDescription) {
              user.get('ids').push([clientid]);
            }
          });
          const encoder = Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["createEncoder"])();
          const ds = this.dss.get(userDescription);
          if (ds) {
            writeDeleteSet(encoder, ds);
            user.get('ds').push([Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["toUint8Array"])(encoder)]);
          }
        }
      }, 0);
    });
    doc.on('afterTransaction', /** @param {Transaction} transaction */ transaction => {
      setTimeout(() => {
        const yds = user.get('ds');
        const ds = transaction.deleteSet;
        if (transaction.local && ds.clients.size > 0 && filter(transaction, ds)) {
          const encoder = Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["createEncoder"])();
          writeDeleteSet(encoder, ds);
          yds.push([Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["toUint8Array"])(encoder)]);
        }
      });
    });
  }

  /**
   * @param {number} clientid
   * @return {any}
   */
  getUserByClientId (clientid) {
    return this.clients.get(clientid) || null
  }

  /**
   * @param {ID} id
   * @return {string | null}
   */
  getUserByDeletedId (id) {
    for (const [userDescription, ds] of this.dss) {
      if (isDeleted(ds, id)) {
        return userDescription
      }
    }
    return null
  }
}

/**
 * A relative position is based on the Yjs model and is not affected by document changes.
 * E.g. If you place a relative position before a certain character, it will always point to this character.
 * If you place a relative position at the end of a type, it will always point to the end of the type.
 *
 * A numeric position is often unsuited for user selections, because it does not change when content is inserted
 * before or after.
 *
 * ```Insert(0, 'x')('a|bc') = 'xa|bc'``` Where | is the relative position.
 *
 * One of the properties must be defined.
 *
 * @example
 *   // Current cursor position is at position 10
 *   const relativePosition = createRelativePositionFromIndex(yText, 10)
 *   // modify yText
 *   yText.insert(0, 'abc')
 *   yText.delete(3, 10)
 *   // Compute the cursor position
 *   const absolutePosition = createAbsolutePositionFromRelativePosition(y, relativePosition)
 *   absolutePosition.type === yText // => true
 *   console.log('cursor location is ' + absolutePosition.index) // => cursor location is 3
 *
 */
class RelativePosition {
  /**
   * @param {ID|null} type
   * @param {string|null} tname
   * @param {ID|null} item
   */
  constructor (type, tname, item) {
    /**
     * @type {ID|null}
     */
    this.type = type;
    /**
     * @type {string|null}
     */
    this.tname = tname;
    /**
     * @type {ID | null}
     */
    this.item = item;
  }
}

/**
 * @param {any} json
 * @return {RelativePosition}
 *
 * @function
 */
const createRelativePositionFromJSON = json => new RelativePosition(json.type == null ? null : createID(json.type.client, json.type.clock), json.tname || null, json.item == null ? null : createID(json.item.client, json.item.clock));

class AbsolutePosition {
  /**
   * @param {AbstractType<any>} type
   * @param {number} index
   */
  constructor (type, index) {
    /**
     * @type {AbstractType<any>}
     */
    this.type = type;
    /**
     * @type {number}
     */
    this.index = index;
  }
}

/**
 * @param {AbstractType<any>} type
 * @param {number} index
 *
 * @function
 */
const createAbsolutePosition = (type, index) => new AbsolutePosition(type, index);

/**
 * @param {AbstractType<any>} type
 * @param {ID|null} item
 *
 * @function
 */
const createRelativePosition = (type, item) => {
  let typeid = null;
  let tname = null;
  if (type._item === null) {
    tname = findRootTypeKey(type);
  } else {
    typeid = type._item.id;
  }
  return new RelativePosition(typeid, tname, item)
};

/**
 * Create a relativePosition based on a absolute position.
 *
 * @param {AbstractType<any>} type The base type (e.g. YText or YArray).
 * @param {number} index The absolute position.
 * @return {RelativePosition}
 *
 * @function
 */
const createRelativePositionFromTypeIndex = (type, index) => {
  let t = type._start;
  while (t !== null) {
    if (!t.deleted && t.countable) {
      if (t.length > index) {
        // case 1: found position somewhere in the linked list
        return createRelativePosition(type, createID(t.id.client, t.id.clock + index))
      }
      index -= t.length;
    }
    t = t.right;
  }
  return createRelativePosition(type, null)
};

/**
 * @param {encoding.Encoder} encoder
 * @param {RelativePosition} rpos
 *
 * @function
 */
const writeRelativePosition = (encoder, rpos) => {
  const { type, tname, item } = rpos;
  if (item !== null) {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, 0);
    writeID(encoder, item);
  } else if (tname !== null) {
    // case 2: found position at the end of the list and type is stored in y.share
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeUint8"])(encoder, 1);
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarString"])(encoder, tname);
  } else if (type !== null) {
    // case 3: found position at the end of the list and type is attached to an item
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeUint8"])(encoder, 2);
    writeID(encoder, type);
  } else {
    throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["unexpectedCase"])()
  }
  return encoder
};

/**
 * @param {decoding.Decoder} decoder
 * @return {RelativePosition|null}
 *
 * @function
 */
const readRelativePosition = decoder => {
  let type = null;
  let tname = null;
  let itemID = null;
  switch (Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder)) {
    case 0:
      // case 1: found position somewhere in the linked list
      itemID = readID(decoder);
      break
    case 1:
      // case 2: found position at the end of the list and type is stored in y.share
      tname = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarString"])(decoder);
      break
    case 2: {
      // case 3: found position at the end of the list and type is attached to an item
      type = readID(decoder);
    }
  }
  return new RelativePosition(type, tname, itemID)
};

/**
 * @param {RelativePosition} rpos
 * @param {Doc} doc
 * @return {AbsolutePosition|null}
 *
 * @function
 */
const createAbsolutePositionFromRelativePosition = (rpos, doc) => {
  const store = doc.store;
  const rightID = rpos.item;
  const typeID = rpos.type;
  const tname = rpos.tname;
  let type = null;
  let index = 0;
  if (rightID !== null) {
    if (getState(store, rightID.client) <= rightID.clock) {
      return null
    }
    const res = followRedone(store, rightID);
    const right = res.item;
    if (!(right instanceof Item)) {
      return null
    }
    type = right.parent;
    if (type._item === null || !type._item.deleted) {
      index = right.deleted || !right.countable ? 0 : res.diff;
      let n = right.left;
      while (n !== null) {
        if (!n.deleted && n.countable) {
          index += n.length;
        }
        n = n.left;
      }
    }
  } else {
    if (tname !== null) {
      type = doc.get(tname);
    } else if (typeID !== null) {
      if (getState(store, typeID.client) <= typeID.clock) {
        // type does not exist yet
        return null
      }
      const { item } = followRedone(store, typeID);
      if (item instanceof Item && item.content instanceof ContentType) {
        type = item.content.type;
      } else {
        // struct is garbage collected
        return null
      }
    } else {
      throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["unexpectedCase"])()
    }
    index = type._length;
  }
  return createAbsolutePosition(type, index)
};

/**
 * @param {RelativePosition|null} a
 * @param {RelativePosition|null} b
 *
 * @function
 */
const compareRelativePositions = (a, b) => a === b || (
  a !== null && b !== null && a.tname === b.tname && compareIDs(a.item, b.item) && compareIDs(a.type, b.type)
);

class Snapshot {
  /**
   * @param {DeleteSet} ds
   * @param {Map<number,number>} sv state map
   */
  constructor (ds, sv) {
    /**
     * @type {DeleteSet}
     */
    this.ds = ds;
    /**
     * State Map
     * @type {Map<number,number>}
     */
    this.sv = sv;
  }
}

/**
 * @param {Snapshot} snap1
 * @param {Snapshot} snap2
 * @return {boolean}
 */
const equalSnapshots = (snap1, snap2) => {
  const ds1 = snap1.ds.clients;
  const ds2 = snap2.ds.clients;
  const sv1 = snap1.sv;
  const sv2 = snap2.sv;
  if (sv1.size !== sv2.size || ds1.size !== ds2.size) {
    return false
  }
  for (const [key, value] of sv1) {
    if (sv2.get(key) !== value) {
      return false
    }
  }
  for (const [client, dsitems1] of ds1) {
    const dsitems2 = ds2.get(client) || [];
    if (dsitems1.length !== dsitems2.length) {
      return false
    }
    for (let i = 0; i < dsitems1.length; i++) {
      const dsitem1 = dsitems1[i];
      const dsitem2 = dsitems2[i];
      if (dsitem1.clock !== dsitem2.clock || dsitem1.len !== dsitem2.len) {
        return false
      }
    }
  }
  return true
};

/**
 * @param {Snapshot} snapshot
 * @return {Uint8Array}
 */
const encodeSnapshot = snapshot => {
  const encoder = Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["createEncoder"])();
  writeDeleteSet(encoder, snapshot.ds);
  writeStateVector(encoder, snapshot.sv);
  return Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["toUint8Array"])(encoder)
};

/**
 * @param {Uint8Array} buf
 * @return {Snapshot}
 */
const decodeSnapshot = buf => {
  const decoder = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["createDecoder"])(buf);
  return new Snapshot(readDeleteSet(decoder), readStateVector(decoder))
};

/**
 * @param {DeleteSet} ds
 * @param {Map<number,number>} sm
 * @return {Snapshot}
 */
const createSnapshot = (ds, sm) => new Snapshot(ds, sm);

const emptySnapshot = createSnapshot(createDeleteSet(), new Map());

/**
 * @param {Doc} doc
 * @return {Snapshot}
 */
const snapshot = doc => createSnapshot(createDeleteSetFromStructStore(doc.store), getStateVector(doc.store));

/**
 * @param {Item} item
 * @param {Snapshot|undefined} snapshot
 *
 * @protected
 * @function
 */
const isVisible = (item, snapshot) => snapshot === undefined ? !item.deleted : (
  snapshot.sv.has(item.id.client) && (snapshot.sv.get(item.id.client) || 0) > item.id.clock && !isDeleted(snapshot.ds, item.id)
);

/**
 * @param {Transaction} transaction
 * @param {Snapshot} snapshot
 */
const splitSnapshotAffectedStructs = (transaction, snapshot) => {
  const meta = Object(lib0_map_js__WEBPACK_IMPORTED_MODULE_2__["setIfUndefined"])(transaction.meta, splitSnapshotAffectedStructs, lib0_set_js__WEBPACK_IMPORTED_MODULE_10__["create"]);
  const store = transaction.doc.store;
  // check if we already split for this snapshot
  if (!meta.has(snapshot)) {
    snapshot.sv.forEach((clock, client) => {
      if (clock < getState(store, client)) {
        getItemCleanStart(transaction, createID(client, clock));
      }
    });
    iterateDeletedStructs(transaction, snapshot.ds, item => {});
    meta.add(snapshot);
  }
};

class StructStore {
  constructor () {
    /**
     * @type {Map<number,Array<GC|Item>>}
     */
    this.clients = new Map();
    /**
     * Store incompleted struct reads here
     * `i` denotes to the next read operation
     * We could shift the array of refs instead, but shift is incredible
     * slow in Chrome for arrays with more than 100k elements
     * @see tryResumePendingStructRefs
     * @type {Map<number,{i:number,refs:Array<GCRef|ItemRef>}>}
     */
    this.pendingClientsStructRefs = new Map();
    /**
     * Stack of pending structs waiting for struct dependencies
     * Maximum length of stack is structReaders.size
     * @type {Array<GCRef|ItemRef>}
     */
    this.pendingStack = [];
    /**
     * @type {Array<decoding.Decoder>}
     */
    this.pendingDeleteReaders = [];
  }
}

/**
 * Return the states as a Map<client,clock>.
 * Note that clock refers to the next expected clock id.
 *
 * @param {StructStore} store
 * @return {Map<number,number>}
 *
 * @public
 * @function
 */
const getStateVector = store => {
  const sm = new Map();
  store.clients.forEach((structs, client) => {
    const struct = structs[structs.length - 1];
    sm.set(client, struct.id.clock + struct.length);
  });
  return sm
};

/**
 * @param {StructStore} store
 * @param {number} client
 * @return {number}
 *
 * @public
 * @function
 */
const getState = (store, client) => {
  const structs = store.clients.get(client);
  if (structs === undefined) {
    return 0
  }
  const lastStruct = structs[structs.length - 1];
  return lastStruct.id.clock + lastStruct.length
};

/**
 * @param {StructStore} store
 * @param {GC|Item} struct
 *
 * @private
 * @function
 */
const addStruct = (store, struct) => {
  let structs = store.clients.get(struct.id.client);
  if (structs === undefined) {
    structs = [];
    store.clients.set(struct.id.client, structs);
  } else {
    const lastStruct = structs[structs.length - 1];
    if (lastStruct.id.clock + lastStruct.length !== struct.id.clock) {
      throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["unexpectedCase"])()
    }
  }
  structs.push(struct);
};

/**
 * Perform a binary search on a sorted array
 * @param {Array<any>} structs
 * @param {number} clock
 * @return {number}
 *
 * @private
 * @function
 */
const findIndexSS = (structs, clock) => {
  let left = 0;
  let right = structs.length - 1;
  while (left <= right) {
    const midindex = Object(lib0_math_js__WEBPACK_IMPORTED_MODULE_1__["floor"])((left + right) / 2);
    const mid = structs[midindex];
    const midclock = mid.id.clock;
    if (midclock <= clock) {
      if (clock < midclock + mid.length) {
        return midindex
      }
      left = midindex + 1;
    } else {
      right = midindex - 1;
    }
  }
  // Always check state before looking for a struct in StructStore
  // Therefore the case of not finding a struct is unexpected
  throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["unexpectedCase"])()
};

/**
 * Expects that id is actually in store. This function throws or is an infinite loop otherwise.
 *
 * @param {StructStore} store
 * @param {ID} id
 * @return {GC|Item}
 *
 * @private
 * @function
 */
const find = (store, id) => {
  /**
   * @type {Array<GC|Item>}
   */
  // @ts-ignore
  const structs = store.clients.get(id.client);
  return structs[findIndexSS(structs, id.clock)]
};

/**
 * Expects that id is actually in store. This function throws or is an infinite loop otherwise.
 *
 * @param {StructStore} store
 * @param {ID} id
 * @return {Item}
 *
 * @private
 * @function
 */
// @ts-ignore
const getItem = (store, id) => find(store, id);

/**
 * @param {Transaction} transaction
 * @param {Array<Item|GC>} structs
 * @param {number} clock
 */
const findIndexCleanStart = (transaction, structs, clock) => {
  const index = findIndexSS(structs, clock);
  const struct = structs[index];
  if (struct.id.clock < clock && struct instanceof Item) {
    structs.splice(index + 1, 0, splitItem(transaction, struct, clock - struct.id.clock));
    return index + 1
  }
  return index
};

/**
 * Expects that id is actually in store. This function throws or is an infinite loop otherwise.
 *
 * @param {Transaction} transaction
 * @param {ID} id
 * @return {Item}
 *
 * @private
 * @function
 */
const getItemCleanStart = (transaction, id) => {
  const structs = /** @type {Array<Item>} */ (transaction.doc.store.clients.get(id.client));
  return structs[findIndexCleanStart(transaction, structs, id.clock)]
};

/**
 * Expects that id is actually in store. This function throws or is an infinite loop otherwise.
 *
 * @param {Transaction} transaction
 * @param {StructStore} store
 * @param {ID} id
 * @return {Item}
 *
 * @private
 * @function
 */
const getItemCleanEnd = (transaction, store, id) => {
  /**
   * @type {Array<Item>}
   */
  // @ts-ignore
  const structs = store.clients.get(id.client);
  const index = findIndexSS(structs, id.clock);
  const struct = structs[index];
  if (id.clock !== struct.id.clock + struct.length - 1 && struct.constructor !== GC) {
    structs.splice(index + 1, 0, splitItem(transaction, struct, id.clock - struct.id.clock + 1));
  }
  return struct
};

/**
 * Replace `item` with `newitem` in store
 * @param {StructStore} store
 * @param {GC|Item} struct
 * @param {GC|Item} newStruct
 *
 * @private
 * @function
 */
const replaceStruct = (store, struct, newStruct) => {
  const structs = /** @type {Array<GC|Item>} */ (store.clients.get(struct.id.client));
  structs[findIndexSS(structs, struct.id.clock)] = newStruct;
};

/**
 * Iterate over a range of structs
 *
 * @param {Transaction} transaction
 * @param {Array<Item|GC>} structs
 * @param {number} clockStart Inclusive start
 * @param {number} len
 * @param {function(GC|Item):void} f
 *
 * @function
 */
const iterateStructs = (transaction, structs, clockStart, len, f) => {
  if (len === 0) {
    return
  }
  const clockEnd = clockStart + len;
  let index = findIndexCleanStart(transaction, structs, clockStart);
  let struct;
  do {
    struct = structs[index++];
    if (clockEnd < struct.id.clock + struct.length) {
      findIndexCleanStart(transaction, structs, clockEnd);
    }
    f(struct);
  } while (index < structs.length && structs[index].id.clock < clockEnd)
};

/**
 * A transaction is created for every change on the Yjs model. It is possible
 * to bundle changes on the Yjs model in a single transaction to
 * minimize the number on messages sent and the number of observer calls.
 * If possible the user of this library should bundle as many changes as
 * possible. Here is an example to illustrate the advantages of bundling:
 *
 * @example
 * const map = y.define('map', YMap)
 * // Log content when change is triggered
 * map.observe(() => {
 *   console.log('change triggered')
 * })
 * // Each change on the map type triggers a log message:
 * map.set('a', 0) // => "change triggered"
 * map.set('b', 0) // => "change triggered"
 * // When put in a transaction, it will trigger the log after the transaction:
 * y.transact(() => {
 *   map.set('a', 1)
 *   map.set('b', 1)
 * }) // => "change triggered"
 *
 * @public
 */
class Transaction {
  /**
   * @param {Doc} doc
   * @param {any} origin
   * @param {boolean} local
   */
  constructor (doc, origin, local) {
    /**
     * The Yjs instance.
     * @type {Doc}
     */
    this.doc = doc;
    /**
     * Describes the set of deleted items by ids
     * @type {DeleteSet}
     */
    this.deleteSet = new DeleteSet();
    /**
     * Holds the state before the transaction started.
     * @type {Map<Number,Number>}
     */
    this.beforeState = getStateVector(doc.store);
    /**
     * Holds the state after the transaction.
     * @type {Map<Number,Number>}
     */
    this.afterState = new Map();
    /**
     * All types that were directly modified (property added or child
     * inserted/deleted). New types are not included in this Set.
     * Maps from type to parentSubs (`item.parentSub = null` for YArray)
     * @type {Map<AbstractType<YEvent>,Set<String|null>>}
     */
    this.changed = new Map();
    /**
     * Stores the events for the types that observe also child elements.
     * It is mainly used by `observeDeep`.
     * @type {Map<AbstractType<YEvent>,Array<YEvent>>}
     */
    this.changedParentTypes = new Map();
    /**
     * @type {Set<ID>}
     */
    this._mergeStructs = new Set();
    /**
     * @type {any}
     */
    this.origin = origin;
    /**
     * Stores meta information on the transaction
     * @type {Map<any,any>}
     */
    this.meta = new Map();
    /**
     * Whether this change originates from this doc.
     * @type {boolean}
     */
    this.local = local;
  }
}

/**
 * @param {Transaction} transaction
 */
const computeUpdateMessageFromTransaction = transaction => {
  if (transaction.deleteSet.clients.size === 0 && !Object(lib0_map_js__WEBPACK_IMPORTED_MODULE_2__["any"])(transaction.afterState, (clock, client) => transaction.beforeState.get(client) !== clock)) {
    return null
  }
  const encoder = Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["createEncoder"])();
  sortAndMergeDeleteSet(transaction.deleteSet);
  writeStructsFromTransaction(encoder, transaction);
  writeDeleteSet(encoder, transaction.deleteSet);
  return encoder
};

/**
 * @param {Transaction} transaction
 *
 * @private
 * @function
 */
const nextID = transaction => {
  const y = transaction.doc;
  return createID(y.clientID, getState(y.store, y.clientID))
};

/**
 * If `type.parent` was added in current transaction, `type` technically
 * did not change, it was just added and we should not fire events for `type`.
 *
 * @param {Transaction} transaction
 * @param {AbstractType<YEvent>} type
 * @param {string|null} parentSub
 */
const addChangedTypeToTransaction = (transaction, type, parentSub) => {
  const item = type._item;
  if (item === null || (item.id.clock < (transaction.beforeState.get(item.id.client) || 0) && !item.deleted)) {
    Object(lib0_map_js__WEBPACK_IMPORTED_MODULE_2__["setIfUndefined"])(transaction.changed, type, lib0_set_js__WEBPACK_IMPORTED_MODULE_10__["create"]).add(parentSub);
  }
};

/**
 * @param {Array<AbstractStruct>} structs
 * @param {number} pos
 */
const tryToMergeWithLeft = (structs, pos) => {
  const left = structs[pos - 1];
  const right = structs[pos];
  if (left.deleted === right.deleted && left.constructor === right.constructor) {
    if (left.mergeWith(right)) {
      structs.splice(pos, 1);
      if (right instanceof Item && right.parentSub !== null && right.parent._map.get(right.parentSub) === right) {
        right.parent._map.set(right.parentSub, /** @type {Item} */ (left));
      }
    }
  }
};

/**
 * @param {DeleteSet} ds
 * @param {StructStore} store
 * @param {function(Item):boolean} gcFilter
 */
const tryGcDeleteSet = (ds, store, gcFilter) => {
  for (const [client, deleteItems] of ds.clients) {
    const structs = /** @type {Array<AbstractStruct>} */ (store.clients.get(client));
    for (let di = deleteItems.length - 1; di >= 0; di--) {
      const deleteItem = deleteItems[di];
      const endDeleteItemClock = deleteItem.clock + deleteItem.len;
      for (
        let si = findIndexSS(structs, deleteItem.clock), struct = structs[si];
        si < structs.length && struct.id.clock < endDeleteItemClock;
        struct = structs[++si]
      ) {
        const struct = structs[si];
        if (deleteItem.clock + deleteItem.len <= struct.id.clock) {
          break
        }
        if (struct instanceof Item && struct.deleted && !struct.keep && gcFilter(struct)) {
          struct.gc(store, false);
        }
      }
    }
  }
};

/**
 * @param {DeleteSet} ds
 * @param {StructStore} store
 */
const tryMergeDeleteSet = (ds, store) => {
  // try to merge deleted / gc'd items
  // merge from right to left for better efficiecy and so we don't miss any merge targets
  for (const [client, deleteItems] of ds.clients) {
    const structs = /** @type {Array<AbstractStruct>} */ (store.clients.get(client));
    for (let di = deleteItems.length - 1; di >= 0; di--) {
      const deleteItem = deleteItems[di];
      // start with merging the item next to the last deleted item
      const mostRightIndexToCheck = Object(lib0_math_js__WEBPACK_IMPORTED_MODULE_1__["min"])(structs.length - 1, 1 + findIndexSS(structs, deleteItem.clock + deleteItem.len - 1));
      for (
        let si = mostRightIndexToCheck, struct = structs[si];
        si > 0 && struct.id.clock >= deleteItem.clock;
        struct = structs[--si]
      ) {
        tryToMergeWithLeft(structs, si);
      }
    }
  }
};

/**
 * @param {DeleteSet} ds
 * @param {StructStore} store
 * @param {function(Item):boolean} gcFilter
 */
const tryGc = (ds, store, gcFilter) => {
  tryGcDeleteSet(ds, store, gcFilter);
  tryMergeDeleteSet(ds, store);
};

/**
 * @param {Array<Transaction>} transactionCleanups
 * @param {number} i
 */
const cleanupTransactions = (transactionCleanups, i) => {
  if (i < transactionCleanups.length) {
    const transaction = transactionCleanups[i];
    const doc = transaction.doc;
    const store = doc.store;
    const ds = transaction.deleteSet;
    try {
      sortAndMergeDeleteSet(ds);
      transaction.afterState = getStateVector(transaction.doc.store);
      doc._transaction = null;
      doc.emit('beforeObserverCalls', [transaction, doc]);
      /**
       * An array of event callbacks.
       *
       * Each callback is called even if the other ones throw errors.
       *
       * @type {Array<function():void>}
       */
      const fs = [];
      // observe events on changed types
      transaction.changed.forEach((subs, itemtype) =>
        fs.push(() => {
          if (itemtype._item === null || !itemtype._item.deleted) {
            itemtype._callObserver(transaction, subs);
          }
        })
      );
      fs.push(() => {
        // deep observe events
        transaction.changedParentTypes.forEach((events, type) =>
          fs.push(() => {
            // We need to think about the possibility that the user transforms the
            // Y.Doc in the event.
            if (type._item === null || !type._item.deleted) {
              events = events
                .filter(event =>
                  event.target._item === null || !event.target._item.deleted
                );
              events
                .forEach(event => {
                  event.currentTarget = type;
                });
              // We don't need to check for events.length
              // because we know it has at least one element
              callEventHandlerListeners(type._dEH, events, transaction);
            }
          })
        );
        fs.push(() => doc.emit('afterTransaction', [transaction, doc]));
      });
      Object(lib0_function_js__WEBPACK_IMPORTED_MODULE_8__["callAll"])(fs, []);
    } finally {
      // Replace deleted items with ItemDeleted / GC.
      // This is where content is actually remove from the Yjs Doc.
      if (doc.gc) {
        tryGcDeleteSet(ds, store, doc.gcFilter);
      }
      tryMergeDeleteSet(ds, store);

      // on all affected store.clients props, try to merge
      for (const [client, clock] of transaction.afterState) {
        const beforeClock = transaction.beforeState.get(client) || 0;
        if (beforeClock !== clock) {
          const structs = /** @type {Array<AbstractStruct>} */ (store.clients.get(client));
          // we iterate from right to left so we can safely remove entries
          const firstChangePos = Object(lib0_math_js__WEBPACK_IMPORTED_MODULE_1__["max"])(findIndexSS(structs, beforeClock), 1);
          for (let i = structs.length - 1; i >= firstChangePos; i--) {
            tryToMergeWithLeft(structs, i);
          }
        }
      }
      // try to merge mergeStructs
      // @todo: it makes more sense to transform mergeStructs to a DS, sort it, and merge from right to left
      //        but at the moment DS does not handle duplicates
      for (const mid of transaction._mergeStructs) {
        const client = mid.client;
        const clock = mid.clock;
        const structs = /** @type {Array<AbstractStruct>} */ (store.clients.get(client));
        const replacedStructPos = findIndexSS(structs, clock);
        if (replacedStructPos + 1 < structs.length) {
          tryToMergeWithLeft(structs, replacedStructPos + 1);
        }
        if (replacedStructPos > 0) {
          tryToMergeWithLeft(structs, replacedStructPos);
        }
      }
      // @todo Merge all the transactions into one and provide send the data as a single update message
      doc.emit('afterTransactionCleanup', [transaction, doc]);
      if (doc._observers.has('update')) {
        const updateMessage = computeUpdateMessageFromTransaction(transaction);
        if (updateMessage !== null) {
          doc.emit('update', [Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["toUint8Array"])(updateMessage), transaction.origin, doc]);
        }
      }
      if (transactionCleanups.length <= i + 1) {
        doc._transactionCleanups = [];
      } else {
        cleanupTransactions(transactionCleanups, i + 1);
      }
    }
  }
};

/**
 * Implements the functionality of `y.transact(()=>{..})`
 *
 * @param {Doc} doc
 * @param {function(Transaction):void} f
 * @param {any} [origin=true]
 *
 * @function
 */
const transact = (doc, f, origin = null, local = true) => {
  const transactionCleanups = doc._transactionCleanups;
  let initialCall = false;
  if (doc._transaction === null) {
    initialCall = true;
    doc._transaction = new Transaction(doc, origin, local);
    transactionCleanups.push(doc._transaction);
    doc.emit('beforeTransaction', [doc._transaction, doc]);
  }
  try {
    f(doc._transaction);
  } finally {
    if (initialCall && transactionCleanups[0] === doc._transaction) {
      // The first transaction ended, now process observer calls.
      // Observer call may create new transactions for which we need to call the observers and do cleanup.
      // We don't want to nest these calls, so we execute these calls one after
      // another.
      // Also we need to ensure that all cleanups are called, even if the
      // observes throw errors.
      // This file is full of hacky try {} finally {} blocks to ensure that an
      // event can throw errors and also that the cleanup is called.
      cleanupTransactions(transactionCleanups, 0);
    }
  }
};

class StackItem {
  /**
   * @param {DeleteSet} ds
   * @param {number} start clock start of the local client
   * @param {number} len
   */
  constructor (ds, start, len) {
    this.ds = ds;
    this.start = start;
    this.len = len;
    /**
     * Use this to save and restore metadata like selection range
     */
    this.meta = new Map();
  }
}

/**
 * @param {UndoManager} undoManager
 * @param {Array<StackItem>} stack
 * @param {string} eventType
 * @return {StackItem?}
 */
const popStackItem = (undoManager, stack, eventType) => {
  /**
   * Whether a change happened
   * @type {StackItem?}
   */
  let result = null;
  const doc = undoManager.doc;
  const scope = undoManager.scope;
  transact(doc, transaction => {
    while (stack.length > 0 && result === null) {
      const store = doc.store;
      const clientID = doc.clientID;
      const stackItem = /** @type {StackItem} */ (stack.pop());
      const stackStartClock = stackItem.start;
      const stackEndClock = stackItem.start + stackItem.len;
      const itemsToRedo = new Set();
      // @todo iterateStructs should not need the structs parameter
      const structs = /** @type {Array<GC|Item>} */ (store.clients.get(clientID));
      let performedChange = false;
      if (stackStartClock !== stackEndClock) {
        // make sure structs don't overlap with the range of created operations [stackItem.start, stackItem.start + stackItem.end)
        getItemCleanStart(transaction, createID(clientID, stackStartClock));
        if (stackEndClock < getState(doc.store, clientID)) {
          getItemCleanStart(transaction, createID(clientID, stackEndClock));
        }
      }
      iterateDeletedStructs(transaction, stackItem.ds, struct => {
        if (
          struct instanceof Item &&
          scope.some(type => isParentOf(type, struct)) &&
          // Never redo structs in [stackItem.start, stackItem.start + stackItem.end) because they were created and deleted in the same capture interval.
          !(struct.id.client === clientID && struct.id.clock >= stackStartClock && struct.id.clock < stackEndClock)
        ) {
          itemsToRedo.add(struct);
        }
      });
      itemsToRedo.forEach(struct => {
        performedChange = redoItem(transaction, struct, itemsToRedo) !== null || performedChange;
      });
      /**
       * @type {Array<Item>}
       */
      const itemsToDelete = [];
      iterateStructs(transaction, structs, stackStartClock, stackItem.len, struct => {
        if (struct instanceof Item) {
          if (struct.redone !== null) {
            let { item, diff } = followRedone(store, struct.id);
            if (diff > 0) {
              item = getItemCleanStart(transaction, createID(item.id.client, item.id.clock + diff));
            }
            if (item.length > stackItem.len) {
              getItemCleanStart(transaction, createID(item.id.client, stackEndClock));
            }
            struct = item;
          }
          if (!struct.deleted && scope.some(type => isParentOf(type, /** @type {Item} */ (struct)))) {
            itemsToDelete.push(struct);
          }
        }
      });
      // We want to delete in reverse order so that children are deleted before
      // parents, so we have more information available when items are filtered.
      for (let i = itemsToDelete.length - 1; i >= 0; i--) {
        const item = itemsToDelete[i];
        if (undoManager.deleteFilter(item)) {
          item.delete(transaction);
          performedChange = true;
        }
      }
      result = stackItem;
      if (result != null) {
        undoManager.emit('stack-item-popped', [{ stackItem: result, type: eventType }, undoManager]);
      }
    }
  }, undoManager);
  return result
};

/**
 * @typedef {Object} UndoManagerOptions
 * @property {number} [UndoManagerOptions.captureTimeout=500]
 * @property {function(Item):boolean} [UndoManagerOptions.deleteFilter=()=>true] Sometimes
 * it is necessary to filter whan an Undo/Redo operation can delete. If this
 * filter returns false, the type/item won't be deleted even it is in the
 * undo/redo scope.
 * @property {Set<any>} [UndoManagerOptions.trackedOrigins=new Set([null])]
 */

/**
 * Fires 'stack-item-added' event when a stack item was added to either the undo- or
 * the redo-stack. You may store additional stack information via the
 * metadata property on `event.stackItem.meta` (it is a `Map` of metadata properties).
 * Fires 'stack-item-popped' event when a stack item was popped from either the
 * undo- or the redo-stack. You may restore the saved stack information from `event.stackItem.meta`.
 *
 * @extends {Observable<'stack-item-added'|'stack-item-popped'>}
 */
class UndoManager extends lib0_observable_js__WEBPACK_IMPORTED_MODULE_5__["Observable"] {
  /**
   * @param {AbstractType<any>|Array<AbstractType<any>>} typeScope Accepts either a single type, or an array of types
   * @param {UndoManagerOptions} options
   */
  constructor (typeScope, { captureTimeout, deleteFilter = () => true, trackedOrigins = new Set([null]) } = {}) {
    if (captureTimeout == null) {
      captureTimeout = 500;
    }
    super();
    this.scope = typeScope instanceof Array ? typeScope : [typeScope];
    this.deleteFilter = deleteFilter;
    trackedOrigins.add(this);
    this.trackedOrigins = trackedOrigins;
    /**
     * @type {Array<StackItem>}
     */
    this.undoStack = [];
    /**
     * @type {Array<StackItem>}
     */
    this.redoStack = [];
    /**
     * Whether the client is currently undoing (calling UndoManager.undo)
     *
     * @type {boolean}
     */
    this.undoing = false;
    this.redoing = false;
    this.doc = /** @type {Doc} */ (this.scope[0].doc);
    this.lastChange = 0;
    this.doc.on('afterTransaction', /** @param {Transaction} transaction */ transaction => {
      // Only track certain transactions
      if (!this.scope.some(type => transaction.changedParentTypes.has(type)) || (!this.trackedOrigins.has(transaction.origin) && (!transaction.origin || !this.trackedOrigins.has(transaction.origin.constructor)))) {
        return
      }
      const undoing = this.undoing;
      const redoing = this.redoing;
      const stack = undoing ? this.redoStack : this.undoStack;
      if (undoing) {
        this.stopCapturing(); // next undo should not be appended to last stack item
      } else if (!redoing) {
        // neither undoing nor redoing: delete redoStack
        this.redoStack = [];
      }
      const beforeState = transaction.beforeState.get(this.doc.clientID) || 0;
      const afterState = transaction.afterState.get(this.doc.clientID) || 0;
      const now = Object(lib0_time_js__WEBPACK_IMPORTED_MODULE_11__["getUnixTime"])();
      if (now - this.lastChange < captureTimeout && stack.length > 0 && !undoing && !redoing) {
        // append change to last stack op
        const lastOp = stack[stack.length - 1];
        lastOp.ds = mergeDeleteSets([lastOp.ds, transaction.deleteSet]);
        lastOp.len = afterState - lastOp.start;
      } else {
        // create a new stack op
        stack.push(new StackItem(transaction.deleteSet, beforeState, afterState - beforeState));
      }
      if (!undoing && !redoing) {
        this.lastChange = now;
      }
      // make sure that deleted structs are not gc'd
      iterateDeletedStructs(transaction, transaction.deleteSet, /** @param {Item|GC} item */ item => {
        if (item instanceof Item && this.scope.some(type => isParentOf(type, item))) {
          keepItem(item, true);
        }
      });
      this.emit('stack-item-added', [{ stackItem: stack[stack.length - 1], origin: transaction.origin, type: undoing ? 'redo' : 'undo' }, this]);
    });
  }

  clear () {
    this.doc.transact(transaction => {
      /**
       * @param {StackItem} stackItem
       */
      const clearItem = stackItem => {
        iterateDeletedStructs(transaction, stackItem.ds, item => {
          if (item instanceof Item && this.scope.some(type => isParentOf(type, item))) {
            keepItem(item, false);
          }
        });
      };
      this.undoStack.forEach(clearItem);
      this.redoStack.forEach(clearItem);
    });
    this.undoStack = [];
    this.redoStack = [];
  }

  /**
   * UndoManager merges Undo-StackItem if they are created within time-gap
   * smaller than `options.captureTimeout`. Call `um.stopCapturing()` so that the next
   * StackItem won't be merged.
   *
   *
   * @example
   *     // without stopCapturing
   *     ytext.insert(0, 'a')
   *     ytext.insert(1, 'b')
   *     um.undo()
   *     ytext.toString() // => '' (note that 'ab' was removed)
   *     // with stopCapturing
   *     ytext.insert(0, 'a')
   *     um.stopCapturing()
   *     ytext.insert(0, 'b')
   *     um.undo()
   *     ytext.toString() // => 'a' (note that only 'b' was removed)
   *
   */
  stopCapturing () {
    this.lastChange = 0;
  }

  /**
   * Undo last changes on type.
   *
   * @return {StackItem?} Returns StackItem if a change was applied
   */
  undo () {
    this.undoing = true;
    let res;
    try {
      res = popStackItem(this, this.undoStack, 'undo');
    } finally {
      this.undoing = false;
    }
    return res
  }

  /**
   * Redo last undo operation.
   *
   * @return {StackItem?} Returns StackItem if a change was applied
   */
  redo () {
    this.redoing = true;
    let res;
    try {
      res = popStackItem(this, this.redoStack, 'redo');
    } finally {
      this.redoing = false;
    }
    return res
  }
}

/**
 * YEvent describes the changes on a YType.
 */
class YEvent {
  /**
   * @param {AbstractType<any>} target The changed type.
   * @param {Transaction} transaction
   */
  constructor (target, transaction) {
    /**
     * The type on which this event was created on.
     * @type {AbstractType<any>}
     */
    this.target = target;
    /**
     * The current target on which the observe callback is called.
     * @type {AbstractType<any>}
     */
    this.currentTarget = target;
    /**
     * The transaction that triggered this event.
     * @type {Transaction}
     */
    this.transaction = transaction;
    /**
     * @type {Object|null}
     */
    this._changes = null;
  }

  /**
   * Computes the path from `y` to the changed type.
   *
   * The following property holds:
   * @example
   *   let type = y
   *   event.path.forEach(dir => {
   *     type = type.get(dir)
   *   })
   *   type === event.target // => true
   */
  get path () {
    // @ts-ignore _item is defined because target is integrated
    return getPathTo(this.currentTarget, this.target)
  }

  /**
   * Check if a struct is deleted by this event.
   *
   * In contrast to change.deleted, this method also returns true if the struct was added and then deleted.
   *
   * @param {AbstractStruct} struct
   * @return {boolean}
   */
  deletes (struct) {
    return isDeleted(this.transaction.deleteSet, struct.id)
  }

  /**
   * Check if a struct is added by this event.
   *
   * In contrast to change.deleted, this method also returns true if the struct was added and then deleted.
   *
   * @param {AbstractStruct} struct
   * @return {boolean}
   */
  adds (struct) {
    return struct.id.clock >= (this.transaction.beforeState.get(struct.id.client) || 0)
  }

  /**
   * @return {{added:Set<Item>,deleted:Set<Item>,delta:Array<{insert:Array<any>}|{delete:number}|{retain:number}>}}
   */
  get changes () {
    let changes = this._changes;
    if (changes === null) {
      const target = this.target;
      const added = Object(lib0_set_js__WEBPACK_IMPORTED_MODULE_10__["create"])();
      const deleted = Object(lib0_set_js__WEBPACK_IMPORTED_MODULE_10__["create"])();
      /**
       * @type {Array<{insert:Array<any>}|{delete:number}|{retain:number}>}
       */
      const delta = [];
      /**
       * @type {Map<string,{ action: 'add' | 'update' | 'delete', oldValue: any}>}
       */
      const keys = new Map();
      changes = {
        added, deleted, delta, keys
      };
      const changed = /** @type Set<string|null> */ (this.transaction.changed.get(target));
      if (changed.has(null)) {
        /**
         * @type {any}
         */
        let lastOp = null;
        const packOp = () => {
          if (lastOp) {
            delta.push(lastOp);
          }
        };
        for (let item = target._start; item !== null; item = item.right) {
          if (item.deleted) {
            if (this.deletes(item) && !this.adds(item)) {
              if (lastOp === null || lastOp.delete === undefined) {
                packOp();
                lastOp = { delete: 0 };
              }
              lastOp.delete += item.length;
              deleted.add(item);
            } // else nop
          } else {
            if (this.adds(item)) {
              if (lastOp === null || lastOp.insert === undefined) {
                packOp();
                lastOp = { insert: [] };
              }
              lastOp.insert = lastOp.insert.concat(item.content.getContent());
              added.add(item);
            } else {
              if (lastOp === null || lastOp.retain === undefined) {
                packOp();
                lastOp = { retain: 0 };
              }
              lastOp.retain += item.length;
            }
          }
        }
        if (lastOp !== null && lastOp.retain === undefined) {
          packOp();
        }
      }
      changed.forEach(key => {
        if (key !== null) {
          const item = /** @type {Item} */ (target._map.get(key));
          /**
           * @type {'delete' | 'add' | 'update'}
           */
          let action;
          let oldValue;
          if (this.adds(item)) {
            let prev = item.left;
            while (prev !== null && this.adds(prev)) {
              prev = prev.left;
            }
            if (this.deletes(item)) {
              if (prev !== null && this.deletes(prev)) {
                action = 'delete';
                oldValue = Object(lib0_array_js__WEBPACK_IMPORTED_MODULE_0__["last"])(prev.content.getContent());
              } else {
                return
              }
            } else {
              if (prev !== null && this.deletes(prev)) {
                action = 'update';
                oldValue = Object(lib0_array_js__WEBPACK_IMPORTED_MODULE_0__["last"])(prev.content.getContent());
              } else {
                action = 'add';
                oldValue = undefined;
              }
            }
          } else {
            if (this.deletes(item)) {
              action = 'delete';
              oldValue = Object(lib0_array_js__WEBPACK_IMPORTED_MODULE_0__["last"])(/** @type {Item} */ item.content.getContent());
            } else {
              return // nop
            }
          }
          keys.set(key, { action, oldValue });
        }
      });
      this._changes = changes;
    }
    return /** @type {any} */ (changes)
  }
}

/**
 * Compute the path from this type to the specified target.
 *
 * @example
 *   // `child` should be accessible via `type.get(path[0]).get(path[1])..`
 *   const path = type.getPathTo(child)
 *   // assuming `type instanceof YArray`
 *   console.log(path) // might look like => [2, 'key1']
 *   child === type.get(path[0]).get(path[1])
 *
 * @param {AbstractType<any>} parent
 * @param {AbstractType<any>} child target
 * @return {Array<string|number>} Path to the target
 *
 * @private
 * @function
 */
const getPathTo = (parent, child) => {
  const path = [];
  while (child._item !== null && child !== parent) {
    if (child._item.parentSub !== null) {
      // parent is map-ish
      path.unshift(child._item.parentSub);
    } else {
      // parent is array-ish
      let i = 0;
      let c = child._item.parent._start;
      while (c !== child._item && c !== null) {
        if (!c.deleted) {
          i++;
        }
        c = c.right;
      }
      path.unshift(i);
    }
    child = child._item.parent;
  }
  return path
};

/**
 * Call event listeners with an event. This will also add an event to all
 * parents (for `.observeDeep` handlers).
 *
 * @template EventType
 * @param {AbstractType<EventType>} type
 * @param {Transaction} transaction
 * @param {EventType} event
 */
const callTypeObservers = (type, transaction, event) => {
  const changedType = type;
  const changedParentTypes = transaction.changedParentTypes;
  while (true) {
    // @ts-ignore
    Object(lib0_map_js__WEBPACK_IMPORTED_MODULE_2__["setIfUndefined"])(changedParentTypes, type, () => []).push(event);
    if (type._item === null) {
      break
    }
    type = type._item.parent;
  }
  callEventHandlerListeners(changedType._eH, event, transaction);
};

/**
 * @template EventType
 * Abstract Yjs Type class
 */
class AbstractType {
  constructor () {
    /**
     * @type {Item|null}
     */
    this._item = null;
    /**
     * @type {Map<string,Item>}
     */
    this._map = new Map();
    /**
     * @type {Item|null}
     */
    this._start = null;
    /**
     * @type {Doc|null}
     */
    this.doc = null;
    this._length = 0;
    /**
     * Event handlers
     * @type {EventHandler<EventType,Transaction>}
     */
    this._eH = createEventHandler();
    /**
     * Deep event handlers
     * @type {EventHandler<Array<YEvent>,Transaction>}
     */
    this._dEH = createEventHandler();
  }

  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item|null} item
   */
  _integrate (y, item) {
    this.doc = y;
    this._item = item;
  }

  /**
   * @return {AbstractType<EventType>}
   */
  _copy () {
    throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["methodUnimplemented"])()
  }

  /**
   * @param {encoding.Encoder} encoder
   */
  _write (encoder) { }

  /**
   * The first non-deleted item
   */
  get _first () {
    let n = this._start;
    while (n !== null && n.deleted) {
      n = n.right;
    }
    return n
  }

  /**
   * Creates YEvent and calls all type observers.
   * Must be implemented by each type.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver (transaction, parentSubs) { /* skip if no type is specified */ }

  /**
   * Observe all events that are created on this type.
   *
   * @param {function(EventType, Transaction):void} f Observer function
   */
  observe (f) {
    addEventHandlerListener(this._eH, f);
  }

  /**
   * Observe all events that are created by this type and its children.
   *
   * @param {function(Array<YEvent>,Transaction):void} f Observer function
   */
  observeDeep (f) {
    addEventHandlerListener(this._dEH, f);
  }

  /**
   * Unregister an observer function.
   *
   * @param {function(EventType,Transaction):void} f Observer function
   */
  unobserve (f) {
    removeEventHandlerListener(this._eH, f);
  }

  /**
   * Unregister an observer function.
   *
   * @param {function(Array<YEvent>,Transaction):void} f Observer function
   */
  unobserveDeep (f) {
    removeEventHandlerListener(this._dEH, f);
  }

  /**
   * @abstract
   * @return {any}
   */
  toJSON () {}
}

/**
 * @param {AbstractType<any>} type
 * @return {Array<any>}
 *
 * @private
 * @function
 */
const typeListToArray = type => {
  const cs = [];
  let n = type._start;
  while (n !== null) {
    if (n.countable && !n.deleted) {
      const c = n.content.getContent();
      for (let i = 0; i < c.length; i++) {
        cs.push(c[i]);
      }
    }
    n = n.right;
  }
  return cs
};

/**
 * @param {AbstractType<any>} type
 * @param {Snapshot} snapshot
 * @return {Array<any>}
 *
 * @private
 * @function
 */
const typeListToArraySnapshot = (type, snapshot) => {
  const cs = [];
  let n = type._start;
  while (n !== null) {
    if (n.countable && isVisible(n, snapshot)) {
      const c = n.content.getContent();
      for (let i = 0; i < c.length; i++) {
        cs.push(c[i]);
      }
    }
    n = n.right;
  }
  return cs
};

/**
 * Executes a provided function on once on overy element of this YArray.
 *
 * @param {AbstractType<any>} type
 * @param {function(any,number,any):void} f A function to execute on every element of this YArray.
 *
 * @private
 * @function
 */
const typeListForEach = (type, f) => {
  let index = 0;
  let n = type._start;
  while (n !== null) {
    if (n.countable && !n.deleted) {
      const c = n.content.getContent();
      for (let i = 0; i < c.length; i++) {
        f(c[i], index++, type);
      }
    }
    n = n.right;
  }
};

/**
 * @template C,R
 * @param {AbstractType<any>} type
 * @param {function(C,number,AbstractType<any>):R} f
 * @return {Array<R>}
 *
 * @private
 * @function
 */
const typeListMap = (type, f) => {
  /**
   * @type {Array<any>}
   */
  const result = [];
  typeListForEach(type, (c, i) => {
    result.push(f(c, i, type));
  });
  return result
};

/**
 * @param {AbstractType<any>} type
 * @return {IterableIterator<any>}
 *
 * @private
 * @function
 */
const typeListCreateIterator = type => {
  let n = type._start;
  /**
   * @type {Array<any>|null}
   */
  let currentContent = null;
  let currentContentIndex = 0;
  return {
    [Symbol.iterator] () {
      return this
    },
    next: () => {
      // find some content
      if (currentContent === null) {
        while (n !== null && n.deleted) {
          n = n.right;
        }
        // check if we reached the end, no need to check currentContent, because it does not exist
        if (n === null) {
          return {
            done: true,
            value: undefined
          }
        }
        // we found n, so we can set currentContent
        currentContent = n.content.getContent();
        currentContentIndex = 0;
        n = n.right; // we used the content of n, now iterate to next
      }
      const value = currentContent[currentContentIndex++];
      // check if we need to empty currentContent
      if (currentContent.length <= currentContentIndex) {
        currentContent = null;
      }
      return {
        done: false,
        value
      }
    }
  }
};

/**
 * @param {AbstractType<any>} type
 * @param {number} index
 * @return {any}
 *
 * @private
 * @function
 */
const typeListGet = (type, index) => {
  for (let n = type._start; n !== null; n = n.right) {
    if (!n.deleted && n.countable) {
      if (index < n.length) {
        return n.content.getContent()[index]
      }
      index -= n.length;
    }
  }
};

/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {Item?} referenceItem
 * @param {Array<Object<string,any>|Array<any>|boolean|number|string|Uint8Array>} content
 *
 * @private
 * @function
 */
const typeListInsertGenericsAfter = (transaction, parent, referenceItem, content) => {
  let left = referenceItem;
  const right = referenceItem === null ? parent._start : referenceItem.right;
  /**
   * @type {Array<Object|Array<any>|number>}
   */
  let jsonContent = [];
  const packJsonContent = () => {
    if (jsonContent.length > 0) {
      left = new Item(nextID(transaction), left, left === null ? null : left.lastId, right, right === null ? null : right.id, parent, null, new ContentAny(jsonContent));
      left.integrate(transaction);
      jsonContent = [];
    }
  };
  content.forEach(c => {
    switch (c.constructor) {
      case Number:
      case Object:
      case Boolean:
      case Array:
      case String:
        jsonContent.push(c);
        break
      default:
        packJsonContent();
        switch (c.constructor) {
          case Uint8Array:
          case ArrayBuffer:
            left = new Item(nextID(transaction), left, left === null ? null : left.lastId, right, right === null ? null : right.id, parent, null, new ContentBinary(new Uint8Array(/** @type {Uint8Array} */ (c))));
            left.integrate(transaction);
            break
          default:
            if (c instanceof AbstractType) {
              left = new Item(nextID(transaction), left, left === null ? null : left.lastId, right, right === null ? null : right.id, parent, null, new ContentType(c));
              left.integrate(transaction);
            } else {
              throw new Error('Unexpected content type in insert operation')
            }
        }
    }
  });
  packJsonContent();
};

/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {number} index
 * @param {Array<Object<string,any>|Array<any>|number|string|Uint8Array>} content
 *
 * @private
 * @function
 */
const typeListInsertGenerics = (transaction, parent, index, content) => {
  if (index === 0) {
    return typeListInsertGenericsAfter(transaction, parent, null, content)
  }
  let n = parent._start;
  for (; n !== null; n = n.right) {
    if (!n.deleted && n.countable) {
      if (index <= n.length) {
        if (index < n.length) {
          // insert in-between
          getItemCleanStart(transaction, createID(n.id.client, n.id.clock + index));
        }
        break
      }
      index -= n.length;
    }
  }
  return typeListInsertGenericsAfter(transaction, parent, n, content)
};

/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {number} index
 * @param {number} length
 *
 * @private
 * @function
 */
const typeListDelete = (transaction, parent, index, length) => {
  if (length === 0) { return }
  let n = parent._start;
  // compute the first item to be deleted
  for (; n !== null && index > 0; n = n.right) {
    if (!n.deleted && n.countable) {
      if (index < n.length) {
        getItemCleanStart(transaction, createID(n.id.client, n.id.clock + index));
      }
      index -= n.length;
    }
  }
  // delete all items until done
  while (length > 0 && n !== null) {
    if (!n.deleted) {
      if (length < n.length) {
        getItemCleanStart(transaction, createID(n.id.client, n.id.clock + length));
      }
      n.delete(transaction);
      length -= n.length;
    }
    n = n.right;
  }
  if (length > 0) {
    throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["create"])('array length exceeded')
  }
};

/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {string} key
 *
 * @private
 * @function
 */
const typeMapDelete = (transaction, parent, key) => {
  const c = parent._map.get(key);
  if (c !== undefined) {
    c.delete(transaction);
  }
};

/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {string} key
 * @param {Object|number|Array<any>|string|Uint8Array|AbstractType<any>} value
 *
 * @private
 * @function
 */
const typeMapSet = (transaction, parent, key, value) => {
  const left = parent._map.get(key) || null;
  let content;
  if (value == null) {
    content = new ContentAny([value]);
  } else {
    switch (value.constructor) {
      case Number:
      case Object:
      case Boolean:
      case Array:
      case String:
        content = new ContentAny([value]);
        break
      case Uint8Array:
        content = new ContentBinary(/** @type {Uint8Array} */ (value));
        break
      default:
        if (value instanceof AbstractType) {
          content = new ContentType(value);
        } else {
          throw new Error('Unexpected content type')
        }
    }
  }
  new Item(nextID(transaction), left, left === null ? null : left.lastId, null, null, parent, key, content).integrate(transaction);
};

/**
 * @param {AbstractType<any>} parent
 * @param {string} key
 * @return {Object<string,any>|number|Array<any>|string|Uint8Array|AbstractType<any>|undefined}
 *
 * @private
 * @function
 */
const typeMapGet = (parent, key) => {
  const val = parent._map.get(key);
  return val !== undefined && !val.deleted ? val.content.getContent()[val.length - 1] : undefined
};

/**
 * @param {AbstractType<any>} parent
 * @return {Object<string,Object<string,any>|number|Array<any>|string|Uint8Array|AbstractType<any>|undefined>}
 *
 * @private
 * @function
 */
const typeMapGetAll = (parent) => {
  /**
   * @type {Object<string,any>}
   */
  const res = {};
  for (const [key, value] of parent._map) {
    if (!value.deleted) {
      res[key] = value.content.getContent()[value.length - 1];
    }
  }
  return res
};

/**
 * @param {AbstractType<any>} parent
 * @param {string} key
 * @return {boolean}
 *
 * @private
 * @function
 */
const typeMapHas = (parent, key) => {
  const val = parent._map.get(key);
  return val !== undefined && !val.deleted
};

/**
 * @param {AbstractType<any>} parent
 * @param {string} key
 * @param {Snapshot} snapshot
 * @return {Object<string,any>|number|Array<any>|string|Uint8Array|AbstractType<any>|undefined}
 *
 * @private
 * @function
 */
const typeMapGetSnapshot = (parent, key, snapshot) => {
  let v = parent._map.get(key) || null;
  while (v !== null && (!snapshot.sv.has(v.id.client) || v.id.clock >= (snapshot.sv.get(v.id.client) || 0))) {
    v = v.left;
  }
  return v !== null && isVisible(v, snapshot) ? v.content.getContent()[v.length - 1] : undefined
};

/**
 * @param {Map<string,Item>} map
 * @return {IterableIterator<Array<any>>}
 *
 * @private
 * @function
 */
const createMapIterator = map => Object(lib0_iterator_js__WEBPACK_IMPORTED_MODULE_12__["iteratorFilter"])(map.entries(), /** @param {any} entry */ entry => !entry[1].deleted);

/**
 * @module YArray
 */

/**
 * Event that describes the changes on a YArray
 * @template T
 */
class YArrayEvent extends YEvent {
  /**
   * @param {YArray<T>} yarray The changed type
   * @param {Transaction} transaction The transaction object
   */
  constructor (yarray, transaction) {
    super(yarray, transaction);
    this._transaction = transaction;
  }
}

/**
 * A shared Array implementation.
 * @template T
 * @extends AbstractType<YArrayEvent<T>>
 * @implements {IterableIterator<T>}
 */
class YArray extends AbstractType {
  constructor () {
    super();
    /**
     * @type {Array<any>?}
     * @private
     */
    this._prelimContent = [];
  }

  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate (y, item) {
    super._integrate(y, item);
    this.insert(0, /** @type {Array<any>} */ (this._prelimContent));
    this._prelimContent = null;
  }

  _copy () {
    return new YArray()
  }

  get length () {
    return this._prelimContent === null ? this._length : this._prelimContent.length
  }

  /**
   * Creates YArrayEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver (transaction, parentSubs) {
    callTypeObservers(this, transaction, new YArrayEvent(this, transaction));
  }

  /**
   * Inserts new content at an index.
   *
   * Important: This function expects an array of content. Not just a content
   * object. The reason for this "weirdness" is that inserting several elements
   * is very efficient when it is done as a single operation.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  yarray.insert(0, ['a'])
   *  // Insert numbers 1, 2 at position 1
   *  yarray.insert(1, [1, 2])
   *
   * @param {number} index The index to insert content at.
   * @param {Array<T>} content The array of content
   */
  insert (index, content) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        typeListInsertGenerics(transaction, this, index, content);
      });
    } else {
      /** @type {Array<any>} */ (this._prelimContent).splice(index, 0, ...content);
    }
  }

  /**
   * Appends content to this YArray.
   *
   * @param {Array<T>} content Array of content to append.
   */
  push (content) {
    this.insert(this.length, content);
  }

  /**
   * Deletes elements starting from an index.
   *
   * @param {number} index Index at which to start deleting elements
   * @param {number} length The number of elements to remove. Defaults to 1.
   */
  delete (index, length = 1) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        typeListDelete(transaction, this, index, length);
      });
    } else {
      /** @type {Array<any>} */ (this._prelimContent).splice(index, length);
    }
  }

  /**
   * Returns the i-th element from a YArray.
   *
   * @param {number} index The index of the element to return from the YArray
   * @return {T}
   */
  get (index) {
    return typeListGet(this, index)
  }

  /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @return {Array<T>}
   */
  toArray () {
    return typeListToArray(this)
  }

  /**
   * Transforms this Shared Type to a JSON object.
   *
   * @return {Array<any>}
   */
  toJSON () {
    return this.map(c => c instanceof AbstractType ? c.toJSON() : c)
  }

  /**
   * Returns an Array with the result of calling a provided function on every
   * element of this YArray.
   *
   * @template T,M
   * @param {function(T,number,YArray<T>):M} f Function that produces an element of the new Array
   * @return {Array<M>} A new array with each element being the result of the
   *                 callback function
   */
  map (f) {
    return typeListMap(this, /** @type {any} */ (f))
  }

  /**
   * Executes a provided function on once on overy element of this YArray.
   *
   * @param {function(T,number,YArray<T>):void} f A function to execute on every element of this YArray.
   */
  forEach (f) {
    typeListForEach(this, f);
  }

  /**
   * @return {IterableIterator<T>}
   */
  [Symbol.iterator] () {
    return typeListCreateIterator(this)
  }

  /**
   * @param {encoding.Encoder} encoder
   */
  _write (encoder) {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, YArrayRefID);
  }
}

/**
 * @param {decoding.Decoder} decoder
 *
 * @private
 * @function
 */
const readYArray = decoder => new YArray();

/**
 * @template T
 * Event that describes the changes on a YMap.
 */
class YMapEvent extends YEvent {
  /**
   * @param {YMap<T>} ymap The YArray that changed.
   * @param {Transaction} transaction
   * @param {Set<any>} subs The keys that changed.
   */
  constructor (ymap, transaction, subs) {
    super(ymap, transaction);
    this.keysChanged = subs;
  }
}

/**
 * @template T number|string|Object|Array|Uint8Array
 * A shared Map implementation.
 *
 * @extends AbstractType<YMapEvent<T>>
 * @implements {IterableIterator}
 */
class YMap extends AbstractType {
  constructor () {
    super();
    /**
     * @type {Map<string,any>?}
     * @private
     */
    this._prelimContent = new Map();
  }

  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate (y, item) {
    super._integrate(y, item);
    for (const [key, value] of /** @type {Map<string, any>} */ (this._prelimContent)) {
      this.set(key, value);
    }
    this._prelimContent = null;
  }

  _copy () {
    return new YMap()
  }

  /**
   * Creates YMapEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver (transaction, parentSubs) {
    callTypeObservers(this, transaction, new YMapEvent(this, transaction, parentSubs));
  }

  /**
   * Transforms this Shared Type to a JSON object.
   *
   * @return {Object<string,T>}
   */
  toJSON () {
    /**
     * @type {Object<string,T>}
     */
    const map = {};
    for (const [key, item] of this._map) {
      if (!item.deleted) {
        const v = item.content.getContent()[item.length - 1];
        map[key] = v instanceof AbstractType ? v.toJSON() : v;
      }
    }
    return map
  }

  /**
   * Returns the keys for each element in the YMap Type.
   *
   * @return {IterableIterator<string>}
   */
  keys () {
    return Object(lib0_iterator_js__WEBPACK_IMPORTED_MODULE_12__["iteratorMap"])(createMapIterator(this._map), /** @param {any} v */ v => v[0])
  }

  /**
   * Returns the keys for each element in the YMap Type.
   *
   * @return {IterableIterator<string>}
   */
  values () {
    return Object(lib0_iterator_js__WEBPACK_IMPORTED_MODULE_12__["iteratorMap"])(createMapIterator(this._map), /** @param {any} v */ v => v[1].content.getContent()[v[1].length - 1])
  }

  /**
   * Returns an Iterator of [key, value] pairs
   *
   * @return {IterableIterator<any>}
   */
  entries () {
    return Object(lib0_iterator_js__WEBPACK_IMPORTED_MODULE_12__["iteratorMap"])(createMapIterator(this._map), /** @param {any} v */ v => [v[0], v[1].content.getContent()[v[1].length - 1]])
  }

  /**
   * Executes a provided function on once on overy key-value pair.
   *
   * @param {function(T,string,YMap<T>):void} f A function to execute on every element of this YArray.
   */
  forEach (f) {
    /**
     * @type {Object<string,T>}
     */
    const map = {};
    for (const [key, item] of this._map) {
      if (!item.deleted) {
        f(item.content.getContent()[item.length - 1], key, this);
      }
    }
    return map
  }

  /**
   * @return {IterableIterator<T>}
   */
  [Symbol.iterator] () {
    return this.entries()
  }

  /**
   * Remove a specified element from this YMap.
   *
   * @param {string} key The key of the element to remove.
   */
  delete (key) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        typeMapDelete(transaction, this, key);
      });
    } else {
      /** @type {Map<string, any>} */ (this._prelimContent).delete(key);
    }
  }

  /**
   * Adds or updates an element with a specified key and value.
   *
   * @param {string} key The key of the element to add to this YMap
   * @param {T} value The value of the element to add
   */
  set (key, value) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        typeMapSet(transaction, this, key, value);
      });
    } else {
      /** @type {Map<string, any>} */ (this._prelimContent).set(key, value);
    }
    return value
  }

  /**
   * Returns a specified element from this YMap.
   *
   * @param {string} key
   * @return {T|undefined}
   */
  get (key) {
    return /** @type {any} */ (typeMapGet(this, key))
  }

  /**
   * Returns a boolean indicating whether the specified key exists or not.
   *
   * @param {string} key The key to test.
   * @return {boolean}
   */
  has (key) {
    return typeMapHas(this, key)
  }

  /**
   * @param {encoding.Encoder} encoder
   */
  _write (encoder) {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, YMapRefID);
  }
}

/**
 * @param {decoding.Decoder} decoder
 *
 * @private
 * @function
 */
const readYMap = decoder => new YMap();

/**
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
const equalAttrs = (a, b) => a === b || (typeof a === 'object' && typeof b === 'object' && a && b && Object(lib0_object_js__WEBPACK_IMPORTED_MODULE_13__["equalFlat"])(a, b));

class ItemListPosition {
  /**
   * @param {Item|null} left
   * @param {Item|null} right
   */
  constructor (left, right) {
    this.left = left;
    this.right = right;
  }
}

class ItemTextListPosition extends ItemListPosition {
  /**
   * @param {Item|null} left
   * @param {Item|null} right
   * @param {Map<string,any>} currentAttributes
   */
  constructor (left, right, currentAttributes) {
    super(left, right);
    this.currentAttributes = currentAttributes;
  }
}

class ItemInsertionResult extends ItemListPosition {
  /**
   * @param {Item|null} left
   * @param {Item|null} right
   * @param {Map<string,any>} negatedAttributes
   */
  constructor (left, right, negatedAttributes) {
    super(left, right);
    this.negatedAttributes = negatedAttributes;
  }
}

/**
 * @param {Transaction} transaction
 * @param {Map<string,any>} currentAttributes
 * @param {Item|null} left
 * @param {Item|null} right
 * @param {number} count
 * @return {ItemTextListPosition}
 *
 * @private
 * @function
 */
const findNextPosition = (transaction, currentAttributes, left, right, count) => {
  while (right !== null && count > 0) {
    switch (right.content.constructor) {
      case ContentEmbed:
      case ContentString:
        if (!right.deleted) {
          if (count < right.length) {
            // split right
            getItemCleanStart(transaction, createID(right.id.client, right.id.clock + count));
          }
          count -= right.length;
        }
        break
      case ContentFormat:
        if (!right.deleted) {
          updateCurrentAttributes(currentAttributes, /** @type {ContentFormat} */ (right.content));
        }
        break
    }
    left = right;
    right = right.right;
  }
  return new ItemTextListPosition(left, right, currentAttributes)
};

/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {number} index
 * @return {ItemTextListPosition}
 *
 * @private
 * @function
 */
const findPosition = (transaction, parent, index) => {
  const currentAttributes = new Map();
  const right = parent._start;
  return findNextPosition(transaction, currentAttributes, null, right, index)
};

/**
 * Negate applied formats
 *
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {Item|null} left
 * @param {Item|null} right
 * @param {Map<string,any>} negatedAttributes
 * @return {ItemListPosition}
 *
 * @private
 * @function
 */
const insertNegatedAttributes = (transaction, parent, left, right, negatedAttributes) => {
  // check if we really need to remove attributes
  while (
    right !== null && (
      right.deleted === true || (
        right.content.constructor === ContentFormat &&
        equalAttrs(negatedAttributes.get(/** @type {ContentFormat} */ (right.content).key), /** @type {ContentFormat} */ (right.content).value)
      )
    )
  ) {
    if (!right.deleted) {
      negatedAttributes.delete(/** @type {ContentFormat} */ (right.content).key);
    }
    left = right;
    right = right.right;
  }
  for (const [key, val] of negatedAttributes) {
    left = new Item(nextID(transaction), left, left === null ? null : left.lastId, right, right === null ? null : right.id, parent, null, new ContentFormat(key, val));
    left.integrate(transaction);
  }
  return { left, right }
};

/**
 * @param {Map<string,any>} currentAttributes
 * @param {ContentFormat} format
 *
 * @private
 * @function
 */
const updateCurrentAttributes = (currentAttributes, format) => {
  const { key, value } = format;
  if (value === null) {
    currentAttributes.delete(key);
  } else {
    currentAttributes.set(key, value);
  }
};

/**
 * @param {Item|null} left
 * @param {Item|null} right
 * @param {Map<string,any>} currentAttributes
 * @param {Object<string,any>} attributes
 * @return {ItemListPosition}
 *
 * @private
 * @function
 */
const minimizeAttributeChanges = (left, right, currentAttributes, attributes) => {
  // go right while attributes[right.key] === right.value (or right is deleted)
  while (true) {
    if (right === null) {
      break
    } else if (right.deleted) ; else if (right.content.constructor === ContentFormat && equalAttrs(attributes[(/** @type {ContentFormat} */ (right.content)).key] || null, /** @type {ContentFormat} */ (right.content).value)) {
      // found a format, update currentAttributes and continue
      updateCurrentAttributes(currentAttributes, /** @type {ContentFormat} */ (right.content));
    } else {
      break
    }
    left = right;
    right = right.right;
  }
  return new ItemListPosition(left, right)
};

/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {Item|null} left
 * @param {Item|null} right
 * @param {Map<string,any>} currentAttributes
 * @param {Object<string,any>} attributes
 * @return {ItemInsertionResult}
 *
 * @private
 * @function
 **/
const insertAttributes = (transaction, parent, left, right, currentAttributes, attributes) => {
  const negatedAttributes = new Map();
  // insert format-start items
  for (const key in attributes) {
    const val = attributes[key];
    const currentVal = currentAttributes.get(key) || null;
    if (!equalAttrs(currentVal, val)) {
      // save negated attribute (set null if currentVal undefined)
      negatedAttributes.set(key, currentVal);
      left = new Item(nextID(transaction), left, left === null ? null : left.lastId, right, right === null ? null : right.id, parent, null, new ContentFormat(key, val));
      left.integrate(transaction);
    }
  }
  return new ItemInsertionResult(left, right, negatedAttributes)
};

/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {Item|null} left
 * @param {Item|null} right
 * @param {Map<string,any>} currentAttributes
 * @param {string|object} text
 * @param {Object<string,any>} attributes
 * @return {ItemListPosition}
 *
 * @private
 * @function
 **/
const insertText = (transaction, parent, left, right, currentAttributes, text, attributes) => {
  for (const [key] of currentAttributes) {
    if (attributes[key] === undefined) {
      attributes[key] = null;
    }
  }
  const minPos = minimizeAttributeChanges(left, right, currentAttributes, attributes);
  const insertPos = insertAttributes(transaction, parent, minPos.left, minPos.right, currentAttributes, attributes);
  left = insertPos.left;
  right = insertPos.right;
  // insert content
  const content = text.constructor === String ? new ContentString(/** @type {string} */ (text)) : new ContentEmbed(text);
  left = new Item(nextID(transaction), left, left === null ? null : left.lastId, right, right === null ? null : right.id, parent, null, content);
  left.integrate(transaction);
  return insertNegatedAttributes(transaction, parent, left, insertPos.right, insertPos.negatedAttributes)
};

/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {Item|null} left
 * @param {Item|null} right
 * @param {Map<string,any>} currentAttributes
 * @param {number} length
 * @param {Object<string,any>} attributes
 * @return {ItemListPosition}
 *
 * @private
 * @function
 */
const formatText = (transaction, parent, left, right, currentAttributes, length, attributes) => {
  const minPos = minimizeAttributeChanges(left, right, currentAttributes, attributes);
  const insertPos = insertAttributes(transaction, parent, minPos.left, minPos.right, currentAttributes, attributes);
  const negatedAttributes = insertPos.negatedAttributes;
  left = insertPos.left;
  right = insertPos.right;
  // iterate until first non-format or null is found
  // delete all formats with attributes[format.key] != null
  while (length > 0 && right !== null) {
    if (!right.deleted) {
      switch (right.content.constructor) {
        case ContentFormat: {
          const { key, value } = /** @type {ContentFormat} */ (right.content);
          const attr = attributes[key];
          if (attr !== undefined) {
            if (equalAttrs(attr, value)) {
              negatedAttributes.delete(key);
            } else {
              negatedAttributes.set(key, value);
            }
            right.delete(transaction);
          }
          updateCurrentAttributes(currentAttributes, /** @type {ContentFormat} */ (right.content));
          break
        }
        case ContentEmbed:
        case ContentString:
          if (length < right.length) {
            getItemCleanStart(transaction, createID(right.id.client, right.id.clock + length));
          }
          length -= right.length;
          break
      }
    }
    left = right;
    right = right.right;
  }
  // Quill just assumes that the editor starts with a newline and that it always
  // ends with a newline. We only insert that newline when a new newline is
  // inserted - i.e when length is bigger than type.length
  if (length > 0) {
    let newlines = '';
    for (; length > 0; length--) {
      newlines += '\n';
    }
    left = new Item(nextID(transaction), left, left === null ? null : left.lastId, right, right === null ? null : right.id, parent, null, new ContentString(newlines));
    left.integrate(transaction);
  }
  return insertNegatedAttributes(transaction, parent, left, right, negatedAttributes)
};

/**
 * @param {Transaction} transaction
 * @param {Item|null} left
 * @param {Item|null} right
 * @param {Map<string,any>} currentAttributes
 * @param {number} length
 * @return {ItemListPosition}
 *
 * @private
 * @function
 */
const deleteText = (transaction, left, right, currentAttributes, length) => {
  while (length > 0 && right !== null) {
    if (right.deleted === false) {
      switch (right.content.constructor) {
        case ContentFormat:
          updateCurrentAttributes(currentAttributes, /** @type {ContentFormat} */ (right.content));
          break
        case ContentEmbed:
        case ContentString:
          if (length < right.length) {
            getItemCleanStart(transaction, createID(right.id.client, right.id.clock + length));
          }
          length -= right.length;
          right.delete(transaction);
          break
      }
    }
    left = right;
    right = right.right;
  }
  return { left, right }
};

/**
 * The Quill Delta format represents changes on a text document with
 * formatting information. For mor information visit {@link https://quilljs.com/docs/delta/|Quill Delta}
 *
 * @example
 *   {
 *     ops: [
 *       { insert: 'Gandalf', attributes: { bold: true } },
 *       { insert: ' the ' },
 *       { insert: 'Grey', attributes: { color: '#cccccc' } }
 *     ]
 *   }
 *
 */

/**
  * Attributes that can be assigned to a selection of text.
  *
  * @example
  *   {
  *     bold: true,
  *     font-size: '40px'
  *   }
  *
  * @typedef {Object} TextAttributes
  */

/**
 * @typedef {Object} DeltaItem
 * @property {number|undefined} DeltaItem.delete
 * @property {number|undefined} DeltaItem.retain
 * @property {string|undefined} DeltaItem.string
 * @property {Object<string,any>} DeltaItem.attributes
 */

/**
 * Event that describes the changes on a YText type.
 */
class YTextEvent extends YEvent {
  /**
   * @param {YText} ytext
   * @param {Transaction} transaction
   */
  constructor (ytext, transaction) {
    super(ytext, transaction);
    /**
     * @type {Array<DeltaItem>|null}
     */
    this._delta = null;
  }

  /**
   * Compute the changes in the delta format.
   * A {@link https://quilljs.com/docs/delta/|Quill Delta}) that represents the changes on the document.
   *
   * @type {Array<DeltaItem>}
   *
   * @public
   */
  get delta () {
    if (this._delta === null) {
      const y = /** @type {Doc} */ (this.target.doc);
      this._delta = [];
      transact(y, transaction => {
        const delta = /** @type {Array<DeltaItem>} */ (this._delta);
        const currentAttributes = new Map(); // saves all current attributes for insert
        const oldAttributes = new Map();
        let item = this.target._start;
        /**
         * @type {string?}
         */
        let action = null;
        /**
         * @type {Object<string,any>}
         */
        const attributes = {}; // counts added or removed new attributes for retain
        /**
         * @type {string|object}
         */
        let insert = '';
        let retain = 0;
        let deleteLen = 0;
        const addOp = () => {
          if (action !== null) {
            /**
             * @type {any}
             */
            let op;
            switch (action) {
              case 'delete':
                op = { delete: deleteLen };
                deleteLen = 0;
                break
              case 'insert':
                op = { insert };
                if (currentAttributes.size > 0) {
                  op.attributes = {};
                  for (const [key, value] of currentAttributes) {
                    if (value !== null) {
                      op.attributes[key] = value;
                    }
                  }
                }
                insert = '';
                break
              case 'retain':
                op = { retain };
                if (Object.keys(attributes).length > 0) {
                  op.attributes = {};
                  for (const key in attributes) {
                    op.attributes[key] = attributes[key];
                  }
                }
                retain = 0;
                break
            }
            delta.push(op);
            action = null;
          }
        };
        while (item !== null) {
          switch (item.content.constructor) {
            case ContentEmbed:
              if (this.adds(item)) {
                if (!this.deletes(item)) {
                  addOp();
                  action = 'insert';
                  insert = /** @type {ContentEmbed} */ (item.content).embed;
                  addOp();
                }
              } else if (this.deletes(item)) {
                if (action !== 'delete') {
                  addOp();
                  action = 'delete';
                }
                deleteLen += 1;
              } else if (!item.deleted) {
                if (action !== 'retain') {
                  addOp();
                  action = 'retain';
                }
                retain += 1;
              }
              break
            case ContentString:
              if (this.adds(item)) {
                if (!this.deletes(item)) {
                  if (action !== 'insert') {
                    addOp();
                    action = 'insert';
                  }
                  insert += /** @type {ContentString} */ (item.content).str;
                }
              } else if (this.deletes(item)) {
                if (action !== 'delete') {
                  addOp();
                  action = 'delete';
                }
                deleteLen += item.length;
              } else if (!item.deleted) {
                if (action !== 'retain') {
                  addOp();
                  action = 'retain';
                }
                retain += item.length;
              }
              break
            case ContentFormat: {
              const { key, value } = /** @type {ContentFormat} */ (item.content);
              if (this.adds(item)) {
                if (!this.deletes(item)) {
                  const curVal = currentAttributes.get(key) || null;
                  if (!equalAttrs(curVal, value)) {
                    if (action === 'retain') {
                      addOp();
                    }
                    if (equalAttrs(value, (oldAttributes.get(key) || null))) {
                      delete attributes[key];
                    } else {
                      attributes[key] = value;
                    }
                  } else {
                    item.delete(transaction);
                  }
                }
              } else if (this.deletes(item)) {
                oldAttributes.set(key, value);
                const curVal = currentAttributes.get(key) || null;
                if (!equalAttrs(curVal, value)) {
                  if (action === 'retain') {
                    addOp();
                  }
                  attributes[key] = curVal;
                }
              } else if (!item.deleted) {
                oldAttributes.set(key, value);
                const attr = attributes[key];
                if (attr !== undefined) {
                  if (!equalAttrs(attr, value)) {
                    if (action === 'retain') {
                      addOp();
                    }
                    if (value === null) {
                      attributes[key] = value;
                    } else {
                      delete attributes[key];
                    }
                  } else {
                    item.delete(transaction);
                  }
                }
              }
              if (!item.deleted) {
                if (action === 'insert') {
                  addOp();
                }
                updateCurrentAttributes(currentAttributes, /** @type {ContentFormat} */ (item.content));
              }
              break
            }
          }
          item = item.right;
        }
        addOp();
        while (delta.length > 0) {
          const lastOp = delta[delta.length - 1];
          if (lastOp.retain !== undefined && lastOp.attributes === undefined) {
            // retain delta's if they don't assign attributes
            delta.pop();
          } else {
            break
          }
        }
      });
    }
    return this._delta
  }
}

/**
 * Type that represents text with formatting information.
 *
 * This type replaces y-richtext as this implementation is able to handle
 * block formats (format information on a paragraph), embeds (complex elements
 * like pictures and videos), and text formats (**bold**, *italic*).
 *
 * @extends AbstractType<YTextEvent>
 */
class YText extends AbstractType {
  /**
   * @param {String} [string] The initial value of the YText.
   */
  constructor (string) {
    super();
    /**
     * Array of pending operations on this type
     * @type {Array<function():void>?}
     */
    this._pending = string !== undefined ? [() => this.insert(0, string)] : [];
  }

  /**
   * Number of characters of this text type.
   *
   * @type {number}
   */
  get length () {
    return this._length
  }

  /**
   * @param {Doc} y
   * @param {Item} item
   */
  _integrate (y, item) {
    super._integrate(y, item);
    try {
      /** @type {Array<function>} */ (this._pending).forEach(f => f());
    } catch (e) {
      console.error(e);
    }
    this._pending = null;
  }

  _copy () {
    return new YText()
  }

  /**
   * Creates YTextEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver (transaction, parentSubs) {
    callTypeObservers(this, transaction, new YTextEvent(this, transaction));
  }

  /**
   * Returns the unformatted string representation of this YText type.
   *
   * @public
   */
  toString () {
    let str = '';
    /**
     * @type {Item|null}
     */
    let n = this._start;
    while (n !== null) {
      if (!n.deleted && n.countable && n.content.constructor === ContentString) {
        str += /** @type {ContentString} */ (n.content).str;
      }
      n = n.right;
    }
    return str
  }

  /**
   * Returns the unformatted string representation of this YText type.
   *
   * @return {string}
   * @public
   */
  toJSON () {
    return this.toString()
  }

  /**
   * Apply a {@link Delta} on this shared YText type.
   *
   * @param {any} delta The changes to apply on this element.
   *
   * @public
   */
  applyDelta (delta) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        /**
         * @type {ItemListPosition}
         */
        let pos = new ItemListPosition(null, this._start);
        const currentAttributes = new Map();
        for (let i = 0; i < delta.length; i++) {
          const op = delta[i];
          if (op.insert !== undefined) {
            // Quill assumes that the content starts with an empty paragraph.
            // Yjs/Y.Text assumes that it starts empty. We always hide that
            // there is a newline at the end of the content.
            // If we omit this step, clients will see a different number of
            // paragraphs, but nothing bad will happen.
            const ins = (typeof op.insert === 'string' && i === delta.length - 1 && pos.right === null && op.insert.slice(-1) === '\n') ? op.insert.slice(0, -1) : op.insert;
            if (typeof ins !== 'string' || ins.length > 0) {
              pos = insertText(transaction, this, pos.left, pos.right, currentAttributes, ins, op.attributes || {});
            }
          } else if (op.retain !== undefined) {
            pos = formatText(transaction, this, pos.left, pos.right, currentAttributes, op.retain, op.attributes || {});
          } else if (op.delete !== undefined) {
            pos = deleteText(transaction, pos.left, pos.right, currentAttributes, op.delete);
          }
        }
      });
    } else {
      /** @type {Array<function>} */ (this._pending).push(() => this.applyDelta(delta));
    }
  }

  /**
   * Returns the Delta representation of this YText type.
   *
   * @param {Snapshot} [snapshot]
   * @param {Snapshot} [prevSnapshot]
   * @param {function('removed' | 'added', ID):any} [computeYChange]
   * @return {any} The Delta representation of this type.
   *
   * @public
   */
  toDelta (snapshot, prevSnapshot, computeYChange) {
    /**
     * @type{Array<any>}
     */
    const ops = [];
    const currentAttributes = new Map();
    const doc = /** @type {Doc} */ (this.doc);
    let str = '';
    let n = this._start;
    function packStr () {
      if (str.length > 0) {
        // pack str with attributes to ops
        /**
         * @type {Object<string,any>}
         */
        const attributes = {};
        let addAttributes = false;
        for (const [key, value] of currentAttributes) {
          addAttributes = true;
          attributes[key] = value;
        }
        /**
         * @type {Object<string,any>}
         */
        const op = { insert: str };
        if (addAttributes) {
          op.attributes = attributes;
        }
        ops.push(op);
        str = '';
      }
    }
    // snapshots are merged again after the transaction, so we need to keep the
    // transalive until we are done
    transact(doc, transaction => {
      if (snapshot) {
        splitSnapshotAffectedStructs(transaction, snapshot);
      }
      if (prevSnapshot) {
        splitSnapshotAffectedStructs(transaction, prevSnapshot);
      }
      while (n !== null) {
        if (isVisible(n, snapshot) || (prevSnapshot !== undefined && isVisible(n, prevSnapshot))) {
          switch (n.content.constructor) {
            case ContentString: {
              const cur = currentAttributes.get('ychange');
              if (snapshot !== undefined && !isVisible(n, snapshot)) {
                if (cur === undefined || cur.user !== n.id.client || cur.state !== 'removed') {
                  packStr();
                  currentAttributes.set('ychange', computeYChange ? computeYChange('removed', n.id) : { type: 'removed' });
                }
              } else if (prevSnapshot !== undefined && !isVisible(n, prevSnapshot)) {
                if (cur === undefined || cur.user !== n.id.client || cur.state !== 'added') {
                  packStr();
                  currentAttributes.set('ychange', computeYChange ? computeYChange('added', n.id) : { type: 'added' });
                }
              } else if (cur !== undefined) {
                packStr();
                currentAttributes.delete('ychange');
              }
              str += /** @type {ContentString} */ (n.content).str;
              break
            }
            case ContentEmbed: {
              packStr();
              /**
               * @type {Object<string,any>}
               */
              const op = {
                insert: /** @type {ContentEmbed} */ (n.content).embed
              };
              if (currentAttributes.size > 0) {
                const attrs = /** @type {Object<string,any>} */ ({});
                op.attributes = attrs;
                for (const [key, value] of currentAttributes) {
                  attrs[key] = value;
                }
              }
              ops.push(op);
              break
            }
            case ContentFormat:
              if (isVisible(n, snapshot)) {
                packStr();
                updateCurrentAttributes(currentAttributes, /** @type {ContentFormat} */ (n.content));
              }
              break
          }
        }
        n = n.right;
      }
      packStr();
    }, splitSnapshotAffectedStructs);
    return ops
  }

  /**
   * Insert text at a given index.
   *
   * @param {number} index The index at which to start inserting.
   * @param {String} text The text to insert at the specified position.
   * @param {TextAttributes} [attributes] Optionally define some formatting
   *                                    information to apply on the inserted
   *                                    Text.
   * @public
   */
  insert (index, text, attributes) {
    if (text.length <= 0) {
      return
    }
    const y = this.doc;
    if (y !== null) {
      transact(y, transaction => {
        const { left, right, currentAttributes } = findPosition(transaction, this, index);
        if (!attributes) {
          attributes = {};
          // @ts-ignore
          currentAttributes.forEach((v, k) => { attributes[k] = v; });
        }
        insertText(transaction, this, left, right, currentAttributes, text, attributes);
      });
    } else {
      /** @type {Array<function>} */ (this._pending).push(() => this.insert(index, text, attributes));
    }
  }

  /**
   * Inserts an embed at a index.
   *
   * @param {number} index The index to insert the embed at.
   * @param {Object} embed The Object that represents the embed.
   * @param {TextAttributes} attributes Attribute information to apply on the
   *                                    embed
   *
   * @public
   */
  insertEmbed (index, embed, attributes = {}) {
    if (embed.constructor !== Object) {
      throw new Error('Embed must be an Object')
    }
    const y = this.doc;
    if (y !== null) {
      transact(y, transaction => {
        const { left, right, currentAttributes } = findPosition(transaction, this, index);
        insertText(transaction, this, left, right, currentAttributes, embed, attributes);
      });
    } else {
      /** @type {Array<function>} */ (this._pending).push(() => this.insertEmbed(index, embed, attributes));
    }
  }

  /**
   * Deletes text starting from an index.
   *
   * @param {number} index Index at which to start deleting.
   * @param {number} length The number of characters to remove. Defaults to 1.
   *
   * @public
   */
  delete (index, length) {
    if (length === 0) {
      return
    }
    const y = this.doc;
    if (y !== null) {
      transact(y, transaction => {
        const { left, right, currentAttributes } = findPosition(transaction, this, index);
        deleteText(transaction, left, right, currentAttributes, length);
      });
    } else {
      /** @type {Array<function>} */ (this._pending).push(() => this.delete(index, length));
    }
  }

  /**
   * Assigns properties to a range of text.
   *
   * @param {number} index The position where to start formatting.
   * @param {number} length The amount of characters to assign properties to.
   * @param {TextAttributes} attributes Attribute information to apply on the
   *                                    text.
   *
   * @public
   */
  format (index, length, attributes) {
    const y = this.doc;
    if (y !== null) {
      transact(y, transaction => {
        const { left, right, currentAttributes } = findPosition(transaction, this, index);
        if (right === null) {
          return
        }
        formatText(transaction, this, left, right, currentAttributes, length, attributes);
      });
    } else {
      /** @type {Array<function>} */ (this._pending).push(() => this.format(index, length, attributes));
    }
  }

  /**
   * @param {encoding.Encoder} encoder
   */
  _write (encoder) {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, YTextRefID);
  }
}

/**
 * @param {decoding.Decoder} decoder
 * @return {YText}
 *
 * @private
 * @function
 */
const readYText = decoder => new YText();

/**
 * @module YXml
 */

/**
 * Define the elements to which a set of CSS queries apply.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors|CSS_Selectors}
 *
 * @example
 *   query = '.classSelector'
 *   query = 'nodeSelector'
 *   query = '#idSelector'
 *
 * @typedef {string} CSS_Selector
 */

/**
 * Dom filter function.
 *
 * @callback domFilter
 * @param {string} nodeName The nodeName of the element
 * @param {Map} attributes The map of attributes.
 * @return {boolean} Whether to include the Dom node in the YXmlElement.
 */

/**
 * Represents a subset of the nodes of a YXmlElement / YXmlFragment and a
 * position within them.
 *
 * Can be created with {@link YXmlFragment#createTreeWalker}
 *
 * @public
 * @implements {IterableIterator}
 */
class YXmlTreeWalker {
  /**
   * @param {YXmlFragment | YXmlElement} root
   * @param {function(AbstractType<any>):boolean} [f]
   */
  constructor (root, f = () => true) {
    this._filter = f;
    this._root = root;
    /**
     * @type {Item}
     */
    this._currentNode = /** @type {Item} */ (root._start);
    this._firstCall = true;
  }

  [Symbol.iterator] () {
    return this
  }

  /**
   * Get the next node.
   *
   * @return {IteratorResult<YXmlElement|YXmlText|YXmlHook>} The next node.
   *
   * @public
   */
  next () {
    /**
     * @type {Item|null}
     */
    let n = this._currentNode;
    let type = /** @type {ContentType} */ (n.content).type;
    if (n !== null && (!this._firstCall || n.deleted || !this._filter(type))) { // if first call, we check if we can use the first item
      do {
        type = /** @type {ContentType} */ (n.content).type;
        if (!n.deleted && (type.constructor === YXmlElement || type.constructor === YXmlFragment) && type._start !== null) {
          // walk down in the tree
          n = type._start;
        } else {
          // walk right or up in the tree
          while (n !== null) {
            if (n.right !== null) {
              n = n.right;
              break
            } else if (n.parent === this._root) {
              n = null;
            } else {
              n = n.parent._item;
            }
          }
        }
      } while (n !== null && (n.deleted || !this._filter(/** @type {ContentType} */ (n.content).type)))
    }
    this._firstCall = false;
    if (n === null) {
      // @ts-ignore
      return { value: undefined, done: true }
    }
    this._currentNode = n;
    return { value: /** @type {any} */ (n.content).type, done: false }
  }
}

/**
 * Represents a list of {@link YXmlElement}.and {@link YXmlText} types.
 * A YxmlFragment is similar to a {@link YXmlElement}, but it does not have a
 * nodeName and it does not have attributes. Though it can be bound to a DOM
 * element - in this case the attributes and the nodeName are not shared.
 *
 * @public
 * @extends AbstractType<YXmlEvent>
 */
class YXmlFragment extends AbstractType {
  constructor () {
    super();
    /**
     * @type {Array<any>|null}
     */
    this._prelimContent = [];
  }

  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate (y, item) {
    super._integrate(y, item);
    this.insert(0, /** @type {Array<any>} */ (this._prelimContent));
    this._prelimContent = null;
  }

  _copy () {
    return new YXmlFragment()
  }

  get length () {
    return this._prelimContent === null ? this._length : this._prelimContent.length
  }

  /**
   * Create a subtree of childNodes.
   *
   * @example
   * const walker = elem.createTreeWalker(dom => dom.nodeName === 'div')
   * for (let node in walker) {
   *   // `node` is a div node
   *   nop(node)
   * }
   *
   * @param {function(AbstractType<any>):boolean} filter Function that is called on each child element and
   *                          returns a Boolean indicating whether the child
   *                          is to be included in the subtree.
   * @return {YXmlTreeWalker} A subtree and a position within it.
   *
   * @public
   */
  createTreeWalker (filter) {
    return new YXmlTreeWalker(this, filter)
  }

  /**
   * Returns the first YXmlElement that matches the query.
   * Similar to DOM's {@link querySelector}.
   *
   * Query support:
   *   - tagname
   * TODO:
   *   - id
   *   - attribute
   *
   * @param {CSS_Selector} query The query on the children.
   * @return {YXmlElement|YXmlText|YXmlHook|null} The first element that matches the query or null.
   *
   * @public
   */
  querySelector (query) {
    query = query.toUpperCase();
    // @ts-ignore
    const iterator = new YXmlTreeWalker(this, element => element.nodeName && element.nodeName.toUpperCase() === query);
    const next = iterator.next();
    if (next.done) {
      return null
    } else {
      return next.value
    }
  }

  /**
   * Returns all YXmlElements that match the query.
   * Similar to Dom's {@link querySelectorAll}.
   *
   * @todo Does not yet support all queries. Currently only query by tagName.
   *
   * @param {CSS_Selector} query The query on the children
   * @return {Array<YXmlElement|YXmlText|YXmlHook|null>} The elements that match this query.
   *
   * @public
   */
  querySelectorAll (query) {
    query = query.toUpperCase();
    // @ts-ignore
    return Array.from(new YXmlTreeWalker(this, element => element.nodeName && element.nodeName.toUpperCase() === query))
  }

  /**
   * Creates YXmlEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */
  _callObserver (transaction, parentSubs) {
    callTypeObservers(this, transaction, new YXmlEvent(this, parentSubs, transaction));
  }

  /**
   * Get the string representation of all the children of this YXmlFragment.
   *
   * @return {string} The string representation of all children.
   */
  toString () {
    return typeListMap(this, xml => xml.toString()).join('')
  }

  /**
   * @return {string}
   */
  toJSON () {
    return this.toString()
  }

  /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks={}] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Node} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM (_document = document, hooks = {}, binding) {
    const fragment = _document.createDocumentFragment();
    if (binding !== undefined) {
      binding._createAssociation(fragment, this);
    }
    typeListForEach(this, xmlType => {
      fragment.insertBefore(xmlType.toDOM(_document, hooks, binding), null);
    });
    return fragment
  }

  /**
   * Inserts new content at an index.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  xml.insert(0, [new Y.XmlText('text')])
   *
   * @param {number} index The index to insert content at
   * @param {Array<YXmlElement|YXmlText>} content The array of content
   */
  insert (index, content) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        typeListInsertGenerics(transaction, this, index, content);
      });
    } else {
      // @ts-ignore _prelimContent is defined because this is not yet integrated
      this._prelimContent.splice(index, 0, ...content);
    }
  }

  /**
   * Deletes elements starting from an index.
   *
   * @param {number} index Index at which to start deleting elements
   * @param {number} [length=1] The number of elements to remove. Defaults to 1.
   */
  delete (index, length = 1) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        typeListDelete(transaction, this, index, length);
      });
    } else {
      // @ts-ignore _prelimContent is defined because this is not yet integrated
      this._prelimContent.splice(index, length);
    }
  }

  /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @return {Array<YXmlElement|YXmlText|YXmlHook>}
   */
  toArray () {
    return typeListToArray(this)
  }

  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {encoding.Encoder} encoder The encoder to write data to.
   */
  _write (encoder) {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, YXmlFragmentRefID);
  }
}

/**
 * @param {decoding.Decoder} decoder
 * @return {YXmlFragment}
 *
 * @private
 * @function
 */
const readYXmlFragment = decoder => new YXmlFragment();

/**
 * An YXmlElement imitates the behavior of a
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}.
 *
 * * An YXmlElement has attributes (key value pairs)
 * * An YXmlElement has childElements that must inherit from YXmlElement
 */
class YXmlElement extends YXmlFragment {
  constructor (nodeName = 'UNDEFINED') {
    super();
    this.nodeName = nodeName;
    /**
     * @type {Map<string, any>|null}
     */
    this._prelimAttrs = new Map();
  }

  /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */
  _integrate (y, item) {
    super._integrate(y, item)
    ;(/** @type {Map<string, any>} */ (this._prelimAttrs)).forEach((value, key) => {
      this.setAttribute(key, value);
    });
    this._prelimAttrs = null;
  }

  /**
   * Creates an Item with the same effect as this Item (without position effect)
   *
   * @return {YXmlElement}
   */
  _copy () {
    return new YXmlElement(this.nodeName)
  }

  /**
   * Returns the XML serialization of this YXmlElement.
   * The attributes are ordered by attribute-name, so you can easily use this
   * method to compare YXmlElements
   *
   * @return {string} The string representation of this type.
   *
   * @public
   */
  toString () {
    const attrs = this.getAttributes();
    const stringBuilder = [];
    const keys = [];
    for (const key in attrs) {
      keys.push(key);
    }
    keys.sort();
    const keysLen = keys.length;
    for (let i = 0; i < keysLen; i++) {
      const key = keys[i];
      stringBuilder.push(key + '="' + attrs[key] + '"');
    }
    const nodeName = this.nodeName.toLocaleLowerCase();
    const attrsString = stringBuilder.length > 0 ? ' ' + stringBuilder.join(' ') : '';
    return `<${nodeName}${attrsString}>${super.toString()}</${nodeName}>`
  }

  /**
   * Removes an attribute from this YXmlElement.
   *
   * @param {String} attributeName The attribute name that is to be removed.
   *
   * @public
   */
  removeAttribute (attributeName) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        typeMapDelete(transaction, this, attributeName);
      });
    } else {
      /** @type {Map<string,any>} */ (this._prelimAttrs).delete(attributeName);
    }
  }

  /**
   * Sets or updates an attribute.
   *
   * @param {String} attributeName The attribute name that is to be set.
   * @param {String} attributeValue The attribute value that is to be set.
   *
   * @public
   */
  setAttribute (attributeName, attributeValue) {
    if (this.doc !== null) {
      transact(this.doc, transaction => {
        typeMapSet(transaction, this, attributeName, attributeValue);
      });
    } else {
      /** @type {Map<string, any>} */ (this._prelimAttrs).set(attributeName, attributeValue);
    }
  }

  /**
   * Returns an attribute value that belongs to the attribute name.
   *
   * @param {String} attributeName The attribute name that identifies the
   *                               queried value.
   * @return {String} The queried attribute value.
   *
   * @public
   */
  getAttribute (attributeName) {
    return /** @type {any} */ (typeMapGet(this, attributeName))
  }

  /**
   * Returns all attribute name/value pairs in a JSON Object.
   *
   * @param {Snapshot} [snapshot]
   * @return {Object<string, any>} A JSON Object that describes the attributes.
   *
   * @public
   */
  getAttributes (snapshot) {
    return typeMapGetAll(this)
  }

  /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks={}] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Node} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM (_document = document, hooks = {}, binding) {
    const dom = _document.createElement(this.nodeName);
    const attrs = this.getAttributes();
    for (const key in attrs) {
      dom.setAttribute(key, attrs[key]);
    }
    typeListForEach(this, yxml => {
      dom.appendChild(yxml.toDOM(_document, hooks, binding));
    });
    if (binding !== undefined) {
      binding._createAssociation(dom, this);
    }
    return dom
  }

  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {encoding.Encoder} encoder The encoder to write data to.
   */
  _write (encoder) {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, YXmlElementRefID);
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarString"])(encoder, this.nodeName);
  }
}

/**
 * @param {decoding.Decoder} decoder
 * @return {YXmlElement}
 *
 * @function
 */
const readYXmlElement = decoder => new YXmlElement(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarString"])(decoder));

/**
 * An Event that describes changes on a YXml Element or Yxml Fragment
 */
class YXmlEvent extends YEvent {
  /**
   * @param {YXmlElement|YXmlFragment} target The target on which the event is created.
   * @param {Set<string|null>} subs The set of changed attributes. `null` is included if the
   *                   child list changed.
   * @param {Transaction} transaction The transaction instance with wich the
   *                                  change was created.
   */
  constructor (target, subs, transaction) {
    super(target, transaction);
    /**
     * Whether the children changed.
     * @type {Boolean}
     * @private
     */
    this.childListChanged = false;
    /**
     * Set of all changed attributes.
     * @type {Set<string|null>}
     */
    this.attributesChanged = new Set();
    subs.forEach((sub) => {
      if (sub === null) {
        this.childListChanged = true;
      } else {
        this.attributesChanged.add(sub);
      }
    });
  }
}

/**
 * You can manage binding to a custom type with YXmlHook.
 *
 * @extends {YMap<any>}
 */
class YXmlHook extends YMap {
  /**
   * @param {string} hookName nodeName of the Dom Node.
   */
  constructor (hookName) {
    super();
    /**
     * @type {string}
     */
    this.hookName = hookName;
  }

  /**
   * Creates an Item with the same effect as this Item (without position effect)
   */
  _copy () {
    return new YXmlHook(this.hookName)
  }

  /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object.<string, any>} [hooks] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type
   * @return {Element} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM (_document = document, hooks = {}, binding) {
    const hook = hooks[this.hookName];
    let dom;
    if (hook !== undefined) {
      dom = hook.createDom(this);
    } else {
      dom = document.createElement(this.hookName);
    }
    dom.setAttribute('data-yjs-hook', this.hookName);
    if (binding !== undefined) {
      binding._createAssociation(dom, this);
    }
    return dom
  }

  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {encoding.Encoder} encoder The encoder to write data to.
   */
  _write (encoder) {
    super._write(encoder);
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, YXmlHookRefID);
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarString"])(encoder, this.hookName);
  }
}

/**
 * @param {decoding.Decoder} decoder
 * @return {YXmlHook}
 *
 * @private
 * @function
 */
const readYXmlHook = decoder =>
  new YXmlHook(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarString"])(decoder));

/**
 * Represents text in a Dom Element. In the future this type will also handle
 * simple formatting information like bold and italic.
 */
class YXmlText extends YText {
  _copy () {
    return new YXmlText()
  }

  /**
   * Creates a Dom Element that mirrors this YXmlText.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Text} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */
  toDOM (_document = document, hooks, binding) {
    const dom = _document.createTextNode(this.toString());
    if (binding !== undefined) {
      binding._createAssociation(dom, this);
    }
    return dom
  }

  toString () {
    // @ts-ignore
    return this.toDelta().map(delta => {
      const nestedNodes = [];
      for (const nodeName in delta.attributes) {
        const attrs = [];
        for (const key in delta.attributes[nodeName]) {
          attrs.push({ key, value: delta.attributes[nodeName][key] });
        }
        // sort attributes to get a unique order
        attrs.sort((a, b) => a.key < b.key ? -1 : 1);
        nestedNodes.push({ nodeName, attrs });
      }
      // sort node order to get a unique order
      nestedNodes.sort((a, b) => a.nodeName < b.nodeName ? -1 : 1);
      // now convert to dom string
      let str = '';
      for (let i = 0; i < nestedNodes.length; i++) {
        const node = nestedNodes[i];
        str += `<${node.nodeName}`;
        for (let j = 0; j < node.attrs.length; j++) {
          const attr = node.attrs[j];
          str += ` ${attr.key}="${attr.value}"`;
        }
        str += '>';
      }
      str += delta.insert;
      for (let i = nestedNodes.length - 1; i >= 0; i--) {
        str += `</${nestedNodes[i].nodeName}>`;
      }
      return str
    }).join('')
  }

  /**
   * @return {string}
   */
  toJSON () {
    return this.toString()
  }

  /**
   * @param {encoding.Encoder} encoder
   */
  _write (encoder) {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, YXmlTextRefID);
  }
}

/**
 * @param {decoding.Decoder} decoder
 * @return {YXmlText}
 *
 * @private
 * @function
 */
const readYXmlText = decoder => new YXmlText();

class AbstractStruct {
  /**
   * @param {ID} id
   * @param {number} length
   */
  constructor (id, length) {
    /**
     * The uniqe identifier of this struct.
     * @type {ID}
     * @readonly
     */
    this.id = id;
    this.length = length;
    this.deleted = false;
  }

  /**
   * Merge this struct with the item to the right.
   * This method is already assuming that `this.id.clock + this.length === this.id.clock`.
   * Also this method does *not* remove right from StructStore!
   * @param {AbstractStruct} right
   * @return {boolean} wether this merged with right
   */
  mergeWith (right) {
    return false
  }

  /**
   * @param {encoding.Encoder} encoder The encoder to write data to.
   * @param {number} offset
   * @param {number} encodingRef
   */
  write (encoder, offset, encodingRef) {
    throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["methodUnimplemented"])()
  }

  /**
   * @param {Transaction} transaction
   */
  integrate (transaction) {
    throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["methodUnimplemented"])()
  }
}

class AbstractStructRef {
  /**
   * @param {ID} id
   */
  constructor (id) {
    /**
     * @type {Array<ID>}
     */
    this._missing = [];
    /**
     * The uniqe identifier of this type.
     * @type {ID}
     */
    this.id = id;
  }

  /**
   * @param {Transaction} transaction
   * @return {Array<ID|null>}
   */
  getMissing (transaction) {
    return this._missing
  }

  /**
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @param {number} offset
   * @return {AbstractStruct}
   */
  toStruct (transaction, store, offset) {
    throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["methodUnimplemented"])()
  }
}

const structGCRefNumber = 0;

/**
 * @private
 */
class GC extends AbstractStruct {
  /**
   * @param {ID} id
   * @param {number} length
   */
  constructor (id, length) {
    super(id, length);
    this.deleted = true;
  }

  delete () {}

  /**
   * @param {GC} right
   * @return {boolean}
   */
  mergeWith (right) {
    this.length += right.length;
    return true
  }

  /**
   * @param {Transaction} transaction
   */
  integrate (transaction) {
    addStruct(transaction.doc.store, this);
  }

  /**
   * @param {encoding.Encoder} encoder
   * @param {number} offset
   */
  write (encoder, offset) {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeUint8"])(encoder, structGCRefNumber);
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, this.length - offset);
  }
}

/**
 * @private
 */
class GCRef extends AbstractStructRef {
  /**
   * @param {decoding.Decoder} decoder
   * @param {ID} id
   * @param {number} info
   */
  constructor (decoder, id, info) {
    super(id);
    /**
     * @type {number}
     */
    this.length = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
  }

  /**
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @param {number} offset
   * @return {GC}
   */
  toStruct (transaction, store, offset) {
    if (offset > 0) {
      // @ts-ignore
      this.id = createID(this.id.client, this.id.clock + offset);
      this.length -= offset;
    }
    return new GC(
      this.id,
      this.length
    )
  }
}

class ContentBinary {
  /**
   * @param {Uint8Array} content
   */
  constructor (content) {
    this.content = content;
  }

  /**
   * @return {number}
   */
  getLength () {
    return 1
  }

  /**
   * @return {Array<any>}
   */
  getContent () {
    return [this.content]
  }

  /**
   * @return {boolean}
   */
  isCountable () {
    return true
  }

  /**
   * @return {ContentBinary}
   */
  copy () {
    return new ContentBinary(this.content)
  }

  /**
   * @param {number} offset
   * @return {ContentBinary}
   */
  splice (offset) {
    throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["methodUnimplemented"])()
  }

  /**
   * @param {ContentBinary} right
   * @return {boolean}
   */
  mergeWith (right) {
    return false
  }

  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate (transaction, item) {}
  /**
   * @param {Transaction} transaction
   */
  delete (transaction) {}
  /**
   * @param {StructStore} store
   */
  gc (store) {}
  /**
   * @param {encoding.Encoder} encoder
   * @param {number} offset
   */
  write (encoder, offset) {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint8Array"])(encoder, this.content);
  }

  /**
   * @return {number}
   */
  getRef () {
    return 3
  }
}

/**
 * @param {decoding.Decoder} decoder
 * @return {ContentBinary}
 */
const readContentBinary = decoder => new ContentBinary(Object(lib0_buffer_js__WEBPACK_IMPORTED_MODULE_14__["copyUint8Array"])(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint8Array"])(decoder)));

class ContentDeleted {
  /**
   * @param {number} len
   */
  constructor (len) {
    this.len = len;
  }

  /**
   * @return {number}
   */
  getLength () {
    return this.len
  }

  /**
   * @return {Array<any>}
   */
  getContent () {
    return []
  }

  /**
   * @return {boolean}
   */
  isCountable () {
    return false
  }

  /**
   * @return {ContentDeleted}
   */
  copy () {
    return new ContentDeleted(this.len)
  }

  /**
   * @param {number} offset
   * @return {ContentDeleted}
   */
  splice (offset) {
    const right = new ContentDeleted(this.len - offset);
    this.len = offset;
    return right
  }

  /**
   * @param {ContentDeleted} right
   * @return {boolean}
   */
  mergeWith (right) {
    this.len += right.len;
    return true
  }

  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate (transaction, item) {
    addToDeleteSet(transaction.deleteSet, item.id, this.len);
    item.deleted = true;
  }

  /**
   * @param {Transaction} transaction
   */
  delete (transaction) {}
  /**
   * @param {StructStore} store
   */
  gc (store) {}
  /**
   * @param {encoding.Encoder} encoder
   * @param {number} offset
   */
  write (encoder, offset) {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, this.len - offset);
  }

  /**
   * @return {number}
   */
  getRef () {
    return 1
  }
}

/**
 * @private
 *
 * @param {decoding.Decoder} decoder
 * @return {ContentDeleted}
 */
const readContentDeleted = decoder => new ContentDeleted(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder));

/**
 * @private
 */
class ContentEmbed {
  /**
   * @param {Object} embed
   */
  constructor (embed) {
    this.embed = embed;
  }

  /**
   * @return {number}
   */
  getLength () {
    return 1
  }

  /**
   * @return {Array<any>}
   */
  getContent () {
    return [this.embed]
  }

  /**
   * @return {boolean}
   */
  isCountable () {
    return true
  }

  /**
   * @return {ContentEmbed}
   */
  copy () {
    return new ContentEmbed(this.embed)
  }

  /**
   * @param {number} offset
   * @return {ContentEmbed}
   */
  splice (offset) {
    throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["methodUnimplemented"])()
  }

  /**
   * @param {ContentEmbed} right
   * @return {boolean}
   */
  mergeWith (right) {
    return false
  }

  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate (transaction, item) {}
  /**
   * @param {Transaction} transaction
   */
  delete (transaction) {}
  /**
   * @param {StructStore} store
   */
  gc (store) {}
  /**
   * @param {encoding.Encoder} encoder
   * @param {number} offset
   */
  write (encoder, offset) {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarString"])(encoder, JSON.stringify(this.embed));
  }

  /**
   * @return {number}
   */
  getRef () {
    return 5
  }
}

/**
 * @private
 *
 * @param {decoding.Decoder} decoder
 * @return {ContentEmbed}
 */
const readContentEmbed = decoder => new ContentEmbed(JSON.parse(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarString"])(decoder)));

/**
 * @private
 */
class ContentFormat {
  /**
   * @param {string} key
   * @param {Object} value
   */
  constructor (key, value) {
    this.key = key;
    this.value = value;
  }

  /**
   * @return {number}
   */
  getLength () {
    return 1
  }

  /**
   * @return {Array<any>}
   */
  getContent () {
    return []
  }

  /**
   * @return {boolean}
   */
  isCountable () {
    return false
  }

  /**
   * @return {ContentFormat}
   */
  copy () {
    return new ContentFormat(this.key, this.value)
  }

  /**
   * @param {number} offset
   * @return {ContentFormat}
   */
  splice (offset) {
    throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["methodUnimplemented"])()
  }

  /**
   * @param {ContentFormat} right
   * @return {boolean}
   */
  mergeWith (right) {
    return false
  }

  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate (transaction, item) {}
  /**
   * @param {Transaction} transaction
   */
  delete (transaction) {}
  /**
   * @param {StructStore} store
   */
  gc (store) {}
  /**
   * @param {encoding.Encoder} encoder
   * @param {number} offset
   */
  write (encoder, offset) {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarString"])(encoder, this.key);
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarString"])(encoder, JSON.stringify(this.value));
  }

  /**
   * @return {number}
   */
  getRef () {
    return 6
  }
}

/**
 * @param {decoding.Decoder} decoder
 * @return {ContentFormat}
 */
const readContentFormat = decoder => new ContentFormat(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarString"])(decoder), JSON.parse(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarString"])(decoder)));

/**
 * @private
 */
class ContentJSON {
  /**
   * @param {Array<any>} arr
   */
  constructor (arr) {
    /**
     * @type {Array<any>}
     */
    this.arr = arr;
  }

  /**
   * @return {number}
   */
  getLength () {
    return this.arr.length
  }

  /**
   * @return {Array<any>}
   */
  getContent () {
    return this.arr
  }

  /**
   * @return {boolean}
   */
  isCountable () {
    return true
  }

  /**
   * @return {ContentJSON}
   */
  copy () {
    return new ContentJSON(this.arr)
  }

  /**
   * @param {number} offset
   * @return {ContentJSON}
   */
  splice (offset) {
    const right = new ContentJSON(this.arr.slice(offset));
    this.arr = this.arr.slice(0, offset);
    return right
  }

  /**
   * @param {ContentJSON} right
   * @return {boolean}
   */
  mergeWith (right) {
    this.arr = this.arr.concat(right.arr);
    return true
  }

  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate (transaction, item) {}
  /**
   * @param {Transaction} transaction
   */
  delete (transaction) {}
  /**
   * @param {StructStore} store
   */
  gc (store) {}
  /**
   * @param {encoding.Encoder} encoder
   * @param {number} offset
   */
  write (encoder, offset) {
    const len = this.arr.length;
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, len - offset);
    for (let i = offset; i < len; i++) {
      const c = this.arr[i];
      Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarString"])(encoder, c === undefined ? 'undefined' : JSON.stringify(c));
    }
  }

  /**
   * @return {number}
   */
  getRef () {
    return 2
  }
}

/**
 * @private
 *
 * @param {decoding.Decoder} decoder
 * @return {ContentJSON}
 */
const readContentJSON = decoder => {
  const len = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
  const cs = [];
  for (let i = 0; i < len; i++) {
    const c = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarString"])(decoder);
    if (c === 'undefined') {
      cs.push(undefined);
    } else {
      cs.push(JSON.parse(c));
    }
  }
  return new ContentJSON(cs)
};

class ContentAny {
  /**
   * @param {Array<any>} arr
   */
  constructor (arr) {
    /**
     * @type {Array<any>}
     */
    this.arr = arr;
  }

  /**
   * @return {number}
   */
  getLength () {
    return this.arr.length
  }

  /**
   * @return {Array<any>}
   */
  getContent () {
    return this.arr
  }

  /**
   * @return {boolean}
   */
  isCountable () {
    return true
  }

  /**
   * @return {ContentAny}
   */
  copy () {
    return new ContentAny(this.arr)
  }

  /**
   * @param {number} offset
   * @return {ContentAny}
   */
  splice (offset) {
    const right = new ContentAny(this.arr.slice(offset));
    this.arr = this.arr.slice(0, offset);
    return right
  }

  /**
   * @param {ContentAny} right
   * @return {boolean}
   */
  mergeWith (right) {
    this.arr = this.arr.concat(right.arr);
    return true
  }

  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate (transaction, item) {}
  /**
   * @param {Transaction} transaction
   */
  delete (transaction) {}
  /**
   * @param {StructStore} store
   */
  gc (store) {}
  /**
   * @param {encoding.Encoder} encoder
   * @param {number} offset
   */
  write (encoder, offset) {
    const len = this.arr.length;
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, len - offset);
    for (let i = offset; i < len; i++) {
      const c = this.arr[i];
      Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeAny"])(encoder, c);
    }
  }

  /**
   * @return {number}
   */
  getRef () {
    return 8
  }
}

/**
 * @param {decoding.Decoder} decoder
 * @return {ContentAny}
 */
const readContentAny = decoder => {
  const len = Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder);
  const cs = [];
  for (let i = 0; i < len; i++) {
    cs.push(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readAny"])(decoder));
  }
  return new ContentAny(cs)
};

/**
 * @private
 */
class ContentString {
  /**
   * @param {string} str
   */
  constructor (str) {
    /**
     * @type {string}
     */
    this.str = str;
  }

  /**
   * @return {number}
   */
  getLength () {
    return this.str.length
  }

  /**
   * @return {Array<any>}
   */
  getContent () {
    return this.str.split('')
  }

  /**
   * @return {boolean}
   */
  isCountable () {
    return true
  }

  /**
   * @return {ContentString}
   */
  copy () {
    return new ContentString(this.str)
  }

  /**
   * @param {number} offset
   * @return {ContentString}
   */
  splice (offset) {
    const right = new ContentString(this.str.slice(offset));
    this.str = this.str.slice(0, offset);
    return right
  }

  /**
   * @param {ContentString} right
   * @return {boolean}
   */
  mergeWith (right) {
    this.str += right.str;
    return true
  }

  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate (transaction, item) {}
  /**
   * @param {Transaction} transaction
   */
  delete (transaction) {}
  /**
   * @param {StructStore} store
   */
  gc (store) {}
  /**
   * @param {encoding.Encoder} encoder
   * @param {number} offset
   */
  write (encoder, offset) {
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarString"])(encoder, offset === 0 ? this.str : this.str.slice(offset));
  }

  /**
   * @return {number}
   */
  getRef () {
    return 4
  }
}

/**
 * @private
 *
 * @param {decoding.Decoder} decoder
 * @return {ContentString}
 */
const readContentString = decoder => new ContentString(Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarString"])(decoder));

/**
 * @type {Array<function(decoding.Decoder):AbstractType<any>>}
 * @private
 */
const typeRefs = [
  readYArray,
  readYMap,
  readYText,
  readYXmlElement,
  readYXmlFragment,
  readYXmlHook,
  readYXmlText
];

const YArrayRefID = 0;
const YMapRefID = 1;
const YTextRefID = 2;
const YXmlElementRefID = 3;
const YXmlFragmentRefID = 4;
const YXmlHookRefID = 5;
const YXmlTextRefID = 6;

/**
 * @private
 */
class ContentType {
  /**
   * @param {AbstractType<YEvent>} type
   */
  constructor (type) {
    /**
     * @type {AbstractType<any>}
     */
    this.type = type;
  }

  /**
   * @return {number}
   */
  getLength () {
    return 1
  }

  /**
   * @return {Array<any>}
   */
  getContent () {
    return [this.type]
  }

  /**
   * @return {boolean}
   */
  isCountable () {
    return true
  }

  /**
   * @return {ContentType}
   */
  copy () {
    return new ContentType(this.type._copy())
  }

  /**
   * @param {number} offset
   * @return {ContentType}
   */
  splice (offset) {
    throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["methodUnimplemented"])()
  }

  /**
   * @param {ContentType} right
   * @return {boolean}
   */
  mergeWith (right) {
    return false
  }

  /**
   * @param {Transaction} transaction
   * @param {Item} item
   */
  integrate (transaction, item) {
    this.type._integrate(transaction.doc, item);
  }

  /**
   * @param {Transaction} transaction
   */
  delete (transaction) {
    let item = this.type._start;
    while (item !== null) {
      if (!item.deleted) {
        item.delete(transaction);
      } else {
        // Whis will be gc'd later and we want to merge it if possible
        // We try to merge all deleted items after each transaction,
        // but we have no knowledge about that this needs to be merged
        // since it is not in transaction.ds. Hence we add it to transaction._mergeStructs
        transaction._mergeStructs.add(item.id);
      }
      item = item.right;
    }
    this.type._map.forEach(item => {
      if (!item.deleted) {
        item.delete(transaction);
      } else {
        // same as above
        transaction._mergeStructs.add(item.id);
      }
    });
    transaction.changed.delete(this.type);
  }

  /**
   * @param {StructStore} store
   */
  gc (store) {
    let item = this.type._start;
    while (item !== null) {
      item.gc(store, true);
      item = item.right;
    }
    this.type._start = null;
    this.type._map.forEach(/** @param {Item | null} item */ (item) => {
      while (item !== null) {
        item.gc(store, true);
        item = item.left;
      }
    });
    this.type._map = new Map();
  }

  /**
   * @param {encoding.Encoder} encoder
   * @param {number} offset
   */
  write (encoder, offset) {
    this.type._write(encoder);
  }

  /**
   * @return {number}
   */
  getRef () {
    return 7
  }
}

/**
 * @private
 *
 * @param {decoding.Decoder} decoder
 * @return {ContentType}
 */
const readContentType = decoder => new ContentType(typeRefs[Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder)](decoder));

/**
 * @todo This should return several items
 *
 * @param {StructStore} store
 * @param {ID} id
 * @return {{item:Item, diff:number}}
 */
const followRedone = (store, id) => {
  /**
   * @type {ID|null}
   */
  let nextID = id;
  let diff = 0;
  let item;
  do {
    if (diff > 0) {
      nextID = createID(nextID.client, nextID.clock + diff);
    }
    item = getItem(store, nextID);
    diff = nextID.clock - item.id.clock;
    nextID = item.redone;
  } while (nextID !== null && item instanceof Item)
  return {
    item, diff
  }
};

/**
 * Make sure that neither item nor any of its parents is ever deleted.
 *
 * This property does not persist when storing it into a database or when
 * sending it to other peers
 *
 * @param {Item|null} item
 * @param {boolean} keep
 */
const keepItem = (item, keep) => {
  while (item !== null && item.keep !== keep) {
    item.keep = keep;
    item = item.parent._item;
  }
};

/**
 * Split leftItem into two items
 * @param {Transaction} transaction
 * @param {Item} leftItem
 * @param {number} diff
 * @return {Item}
 *
 * @function
 * @private
 */
const splitItem = (transaction, leftItem, diff) => {
  const id = leftItem.id;
  // create rightItem
  const rightItem = new Item(
    createID(id.client, id.clock + diff),
    leftItem,
    createID(id.client, id.clock + diff - 1),
    leftItem.right,
    leftItem.rightOrigin,
    leftItem.parent,
    leftItem.parentSub,
    leftItem.content.splice(diff)
  );
  if (leftItem.deleted) {
    rightItem.deleted = true;
  }
  if (leftItem.keep) {
    rightItem.keep = true;
  }
  if (leftItem.redone !== null) {
    rightItem.redone = createID(leftItem.redone.client, leftItem.redone.clock + diff);
  }
  // update left (do not set leftItem.rightOrigin as it will lead to problems when syncing)
  leftItem.right = rightItem;
  // update right
  if (rightItem.right !== null) {
    rightItem.right.left = rightItem;
  }
  // right is more specific.
  transaction._mergeStructs.add(rightItem.id);
  // update parent._map
  if (rightItem.parentSub !== null && rightItem.right === null) {
    rightItem.parent._map.set(rightItem.parentSub, rightItem);
  }
  leftItem.length = diff;
  return rightItem
};

/**
 * Redoes the effect of this operation.
 *
 * @param {Transaction} transaction The Yjs instance.
 * @param {Item} item
 * @param {Set<Item>} redoitems
 *
 * @return {Item|null}
 *
 * @private
 */
const redoItem = (transaction, item, redoitems) => {
  if (item.redone !== null) {
    return getItemCleanStart(transaction, item.redone)
  }
  let parentItem = item.parent._item;
  /**
   * @type {Item|null}
   */
  let left;
  /**
   * @type {Item|null}
   */
  let right;
  if (item.parentSub === null) {
    // Is an array item. Insert at the old position
    left = item.left;
    right = item;
  } else {
    // Is a map item. Insert as current value
    left = item;
    while (left.right !== null) {
      left = left.right;
      if (left.id.client !== transaction.doc.clientID) {
        // It is not possible to redo this item because it conflicts with a
        // change from another client
        return null
      }
    }
    if (left.right !== null) {
      left = /** @type {Item} */ (item.parent._map.get(item.parentSub));
    }
    right = null;
  }
  // make sure that parent is redone
  if (parentItem !== null && parentItem.deleted === true && parentItem.redone === null) {
    // try to undo parent if it will be undone anyway
    if (!redoitems.has(parentItem) || redoItem(transaction, parentItem, redoitems) === null) {
      return null
    }
  }
  if (parentItem !== null && parentItem.redone !== null) {
    while (parentItem.redone !== null) {
      parentItem = getItemCleanStart(transaction, parentItem.redone);
    }
    // find next cloned_redo items
    while (left !== null) {
      /**
       * @type {Item|null}
       */
      let leftTrace = left;
      // trace redone until parent matches
      while (leftTrace !== null && leftTrace.parent._item !== parentItem) {
        leftTrace = leftTrace.redone === null ? null : getItemCleanStart(transaction, leftTrace.redone);
      }
      if (leftTrace !== null && leftTrace.parent._item === parentItem) {
        left = leftTrace;
        break
      }
      left = left.left;
    }
    while (right !== null) {
      /**
       * @type {Item|null}
       */
      let rightTrace = right;
      // trace redone until parent matches
      while (rightTrace !== null && rightTrace.parent._item !== parentItem) {
        rightTrace = rightTrace.redone === null ? null : getItemCleanStart(transaction, rightTrace.redone);
      }
      if (rightTrace !== null && rightTrace.parent._item === parentItem) {
        right = rightTrace;
        break
      }
      right = right.right;
    }
  }
  const redoneItem = new Item(
    nextID(transaction),
    left, left === null ? null : left.lastId,
    right, right === null ? null : right.id,
    parentItem === null ? item.parent : /** @type {ContentType} */ (parentItem.content).type,
    item.parentSub,
    item.content.copy()
  );
  item.redone = redoneItem.id;
  keepItem(redoneItem, true);
  redoneItem.integrate(transaction);
  return redoneItem
};

/**
 * Abstract class that represents any content.
 */
class Item extends AbstractStruct {
  /**
   * @param {ID} id
   * @param {Item | null} left
   * @param {ID | null} origin
   * @param {Item | null} right
   * @param {ID | null} rightOrigin
   * @param {AbstractType<any>} parent
   * @param {string | null} parentSub
   * @param {AbstractContent} content
   */
  constructor (id, left, origin, right, rightOrigin, parent, parentSub, content) {
    super(id, content.getLength());
    /**
     * The item that was originally to the left of this item.
     * @type {ID | null}
     * @readonly
     */
    this.origin = origin;
    /**
     * The item that is currently to the left of this item.
     * @type {Item | null}
     */
    this.left = left;
    /**
     * The item that is currently to the right of this item.
     * @type {Item | null}
     */
    this.right = right;
    /**
     * The item that was originally to the right of this item.
     * @readonly
     * @type {ID | null}
     */
    this.rightOrigin = rightOrigin;
    /**
     * The parent type.
     * @type {AbstractType<any>}
     * @readonly
     */
    this.parent = parent;
    /**
     * If the parent refers to this item with some kind of key (e.g. YMap, the
     * key is specified here. The key is then used to refer to the list in which
     * to insert this item. If `parentSub = null` type._start is the list in
     * which to insert to. Otherwise it is `parent._map`.
     * @type {String | null}
     * @readonly
     */
    this.parentSub = parentSub;
    /**
     * Whether this item was deleted or not.
     * @type {Boolean}
     */
    this.deleted = false;
    /**
     * If this type's effect is reundone this type refers to the type that undid
     * this operation.
     * @type {ID | null}
     */
    this.redone = null;
    /**
     * @type {AbstractContent}
     */
    this.content = content;
    this.length = content.getLength();
    this.countable = content.isCountable();
    /**
     * If true, do not garbage collect this Item.
     */
    this.keep = false;
  }

  /**
   * @param {Transaction} transaction
   */
  integrate (transaction) {
    const store = transaction.doc.store;
    const id = this.id;
    const parent = this.parent;
    const parentSub = this.parentSub;
    const length = this.length;
    /**
     * @type {Item|null}
     */
    let o;
    // set o to the first conflicting item
    if (this.left !== null) {
      o = this.left.right;
    } else if (parentSub !== null) {
      o = parent._map.get(parentSub) || null;
      while (o !== null && o.left !== null) {
        o = o.left;
      }
    } else {
      o = parent._start;
    }
    // TODO: use something like DeleteSet here (a tree implementation would be best)
    /**
     * @type {Set<Item>}
     */
    const conflictingItems = new Set();
    /**
     * @type {Set<Item>}
     */
    const itemsBeforeOrigin = new Set();
    // Let c in conflictingItems, b in itemsBeforeOrigin
    // ***{origin}bbbb{this}{c,b}{c,b}{o}***
    // Note that conflictingItems is a subset of itemsBeforeOrigin
    while (o !== null && o !== this.right) {
      itemsBeforeOrigin.add(o);
      conflictingItems.add(o);
      if (compareIDs(this.origin, o.origin)) {
        // case 1
        if (o.id.client < id.client) {
          this.left = o;
          conflictingItems.clear();
        }
      } else if (o.origin !== null && itemsBeforeOrigin.has(getItem(store, o.origin))) {
        // case 2
        if (o.origin === null || !conflictingItems.has(getItem(store, o.origin))) {
          this.left = o;
          conflictingItems.clear();
        }
      } else {
        break
      }
      o = o.right;
    }
    // reconnect left/right + update parent map/start if necessary
    if (this.left !== null) {
      const right = this.left.right;
      this.right = right;
      this.left.right = this;
    } else {
      let r;
      if (parentSub !== null) {
        r = parent._map.get(parentSub) || null;
        while (r !== null && r.left !== null) {
          r = r.left;
        }
      } else {
        r = parent._start;
        parent._start = this;
      }
      this.right = r;
    }
    if (this.right !== null) {
      this.right.left = this;
    } else if (parentSub !== null) {
      // set as current parent value if right === null and this is parentSub
      parent._map.set(parentSub, this);
      if (this.left !== null) {
        // this is the current attribute value of parent. delete right
        this.left.delete(transaction);
      }
    }
    // adjust length of parent
    if (parentSub === null && this.countable && !this.deleted) {
      parent._length += length;
    }
    addStruct(store, this);
    this.content.integrate(transaction, this);
    // add parent to transaction.changed
    addChangedTypeToTransaction(transaction, parent, parentSub);
    if ((parent._item !== null && parent._item.deleted) || (this.right !== null && parentSub !== null)) {
      // delete if parent is deleted or if this is not the current attribute value of parent
      this.delete(transaction);
    }
  }

  /**
   * Returns the next non-deleted item
   */
  get next () {
    let n = this.right;
    while (n !== null && n.deleted) {
      n = n.right;
    }
    return n
  }

  /**
   * Returns the previous non-deleted item
   */
  get prev () {
    let n = this.left;
    while (n !== null && n.deleted) {
      n = n.left;
    }
    return n
  }

  /**
   * Computes the last content address of this Item.
   */
  get lastId () {
    return createID(this.id.client, this.id.clock + this.length - 1)
  }

  /**
   * Try to merge two items
   *
   * @param {Item} right
   * @return {boolean}
   */
  mergeWith (right) {
    if (
      compareIDs(right.origin, this.lastId) &&
      this.right === right &&
      compareIDs(this.rightOrigin, right.rightOrigin) &&
      this.id.client === right.id.client &&
      this.id.clock + this.length === right.id.clock &&
      this.deleted === right.deleted &&
      this.redone === null &&
      right.redone === null &&
      this.content.constructor === right.content.constructor &&
      this.content.mergeWith(right.content)
    ) {
      if (right.keep) {
        this.keep = true;
      }
      this.right = right.right;
      if (this.right !== null) {
        this.right.left = this;
      }
      this.length += right.length;
      return true
    }
    return false
  }

  /**
   * Mark this Item as deleted.
   *
   * @param {Transaction} transaction
   */
  delete (transaction) {
    if (!this.deleted) {
      const parent = this.parent;
      // adjust the length of parent
      if (this.countable && this.parentSub === null) {
        parent._length -= this.length;
      }
      this.deleted = true;
      addToDeleteSet(transaction.deleteSet, this.id, this.length);
      Object(lib0_map_js__WEBPACK_IMPORTED_MODULE_2__["setIfUndefined"])(transaction.changed, parent, lib0_set_js__WEBPACK_IMPORTED_MODULE_10__["create"]).add(this.parentSub);
      this.content.delete(transaction);
    }
  }

  /**
   * @param {StructStore} store
   * @param {boolean} parentGCd
   */
  gc (store, parentGCd) {
    if (!this.deleted) {
      throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["unexpectedCase"])()
    }
    this.content.gc(store);
    if (parentGCd) {
      replaceStruct(store, this, new GC(this.id, this.length));
    } else {
      this.content = new ContentDeleted(this.length);
    }
  }

  /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {encoding.Encoder} encoder The encoder to write data to.
   * @param {number} offset
   */
  write (encoder, offset) {
    const origin = offset > 0 ? createID(this.id.client, this.id.clock + offset - 1) : this.origin;
    const rightOrigin = this.rightOrigin;
    const parentSub = this.parentSub;
    const info = (this.content.getRef() & lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BITS5"]) |
      (origin === null ? 0 : lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BIT8"]) | // origin is defined
      (rightOrigin === null ? 0 : lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BIT7"]) | // right origin is defined
      (parentSub === null ? 0 : lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BIT6"]); // parentSub is non-null
    Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeUint8"])(encoder, info);
    if (origin !== null) {
      writeID(encoder, origin);
    }
    if (rightOrigin !== null) {
      writeID(encoder, rightOrigin);
    }
    if (origin === null && rightOrigin === null) {
      const parent = this.parent;
      if (parent._item === null) {
        // parent type on y._map
        // find the correct key
        const ykey = findRootTypeKey(parent);
        Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, 1); // write parentYKey
        Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarString"])(encoder, ykey);
      } else {
        Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarUint"])(encoder, 0); // write parent id
        writeID(encoder, parent._item.id);
      }
      if (parentSub !== null) {
        Object(lib0_encoding_js__WEBPACK_IMPORTED_MODULE_3__["writeVarString"])(encoder, parentSub);
      }
    }
    this.content.write(encoder, offset);
  }
}

/**
 * @param {decoding.Decoder} decoder
 * @param {number} info
 */
const readItemContent = (decoder, info) => contentRefs[info & lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BITS5"]](decoder);

/**
 * A lookup map for reading Item content.
 *
 * @type {Array<function(decoding.Decoder):AbstractContent>}
 */
const contentRefs = [
  () => { throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["unexpectedCase"])() }, // GC is not ItemContent
  readContentDeleted,
  readContentJSON,
  readContentBinary,
  readContentString,
  readContentEmbed,
  readContentFormat,
  readContentType,
  readContentAny
];

/**
 * @private
 */
class ItemRef extends AbstractStructRef {
  /**
   * @param {decoding.Decoder} decoder
   * @param {ID} id
   * @param {number} info
   */
  constructor (decoder, id, info) {
    super(id);
    /**
     * The item that was originally to the left of this item.
     * @type {ID | null}
     */
    this.left = (info & lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BIT8"]) === lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BIT8"] ? readID(decoder) : null;
    /**
     * The item that was originally to the right of this item.
     * @type {ID | null}
     */
    this.right = (info & lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BIT7"]) === lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BIT7"] ? readID(decoder) : null;
    const canCopyParentInfo = (info & (lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BIT7"] | lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BIT8"])) === 0;
    const hasParentYKey = canCopyParentInfo ? Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarUint"])(decoder) === 1 : false;
    /**
     * If parent = null and neither left nor right are defined, then we know that `parent` is child of `y`
     * and we read the next string as parentYKey.
     * It indicates how we store/retrieve parent from `y.share`
     * @type {string|null}
     */
    this.parentYKey = canCopyParentInfo && hasParentYKey ? Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarString"])(decoder) : null;
    /**
     * The parent type.
     * @type {ID | null}
     */
    this.parent = canCopyParentInfo && !hasParentYKey ? readID(decoder) : null;
    /**
     * If the parent refers to this item with some kind of key (e.g. YMap, the
     * key is specified here. The key is then used to refer to the list in which
     * to insert this item. If `parentSub = null` type._start is the list in
     * which to insert to. Otherwise it is `parent._map`.
     * @type {String | null}
     */
    this.parentSub = canCopyParentInfo && (info & lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BIT6"]) === lib0_binary_js__WEBPACK_IMPORTED_MODULE_7__["BIT6"] ? Object(lib0_decoding_js__WEBPACK_IMPORTED_MODULE_4__["readVarString"])(decoder) : null;
    const missing = this._missing;
    if (this.left !== null) {
      missing.push(this.left);
    }
    if (this.right !== null) {
      missing.push(this.right);
    }
    if (this.parent !== null) {
      missing.push(this.parent);
    }
    /**
     * @type {AbstractContent}
     */
    this.content = readItemContent(decoder, info);
    this.length = this.content.getLength();
  }

  /**
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @param {number} offset
   * @return {Item|GC}
   */
  toStruct (transaction, store, offset) {
    if (offset > 0) {
      /**
       * @type {ID}
       */
      const id = this.id;
      this.id = createID(id.client, id.clock + offset);
      this.left = createID(this.id.client, this.id.clock - 1);
      this.content = this.content.splice(offset);
      this.length -= offset;
    }

    const left = this.left === null ? null : getItemCleanEnd(transaction, store, this.left);
    const right = this.right === null ? null : getItemCleanStart(transaction, this.right);
    let parent = null;
    let parentSub = this.parentSub;
    if (this.parent !== null) {
      const parentItem = getItem(store, this.parent);
      // Edge case: toStruct is called with an offset > 0. In this case left is defined.
      // Depending in which order structs arrive, left may be GC'd and the parent not
      // deleted. This is why we check if left is GC'd. Strictly we don't have
      // to check if right is GC'd, but we will in case we run into future issues
      if (!parentItem.deleted && (left === null || left.constructor !== GC) && (right === null || right.constructor !== GC)) {
        parent = /** @type {ContentType} */ (parentItem.content).type;
      }
    } else if (this.parentYKey !== null) {
      parent = transaction.doc.get(this.parentYKey);
    } else if (left !== null) {
      if (left.constructor !== GC) {
        parent = left.parent;
        parentSub = left.parentSub;
      }
    } else if (right !== null) {
      if (right.constructor !== GC) {
        parent = right.parent;
        parentSub = right.parentSub;
      }
    } else {
      throw Object(lib0_error_js__WEBPACK_IMPORTED_MODULE_9__["unexpectedCase"])()
    }

    return parent === null
      ? new GC(this.id, this.length)
      : new Item(
        this.id,
        left,
        this.left,
        right,
        this.right,
        parent,
        parentSub,
        this.content
      )
  }
}


//# sourceMappingURL=yjs.mjs.map


/***/ }),

/***/ "./src/client/editing.ts":
/*!*******************************!*\
  !*** ./src/client/editing.ts ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var yjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! yjs */ "./node_modules/yjs/dist/yjs.mjs");
/* harmony import */ var y_webrtc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! y-webrtc */ "./node_modules/y-webrtc/src/y-webrtc.js");
// I think block editing that's not 100% wysiwyg is better than an arbitrary editor
// easier to convert and not so much unexpected things
// also more user friendly?
// possible to create page builder
// yjs
// just get inspired by them
// maybe custom elements may help or so
// editor.js
// gutenberg
// USE https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type

// node node_modules/y-webrtc/bin/server.js




const ydoc = new yjs__WEBPACK_IMPORTED_MODULE_0__["Doc"]()
// clients connected to the same room-name share document updates
const provider = new y_webrtc__WEBPACK_IMPORTED_MODULE_1__["WebrtcProvider"]('your-room-name', ydoc)
const yarray = ydoc.get('array', yjs__WEBPACK_IMPORTED_MODULE_0__["Array"])

console.log(provider)
console.log(yarray)

/***/ })

/******/ });
//# sourceMappingURL=mohe.bundle.js.map