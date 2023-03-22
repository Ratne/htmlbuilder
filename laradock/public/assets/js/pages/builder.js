/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports) {

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
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
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
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
/*!
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
Buffer.TYPED_ARRAY_SUPPORT = __webpack_require__.g.TYPED_ARRAY_SUPPORT !== undefined
  ? __webpack_require__.g.TYPED_ARRAY_SUPPORT
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


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[10].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[10].oneOf[1].use[2]!./node_modules/grapesjs/dist/css/grapes.min.css":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[10].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[10].oneOf[1].use[2]!./node_modules/grapesjs/dist/css/grapes.min.css ***!
  \*******************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".CodeMirror{font-family:monospace;height:300px;color:black;direction:ltr}.CodeMirror-lines{padding:4px 0}.CodeMirror pre.CodeMirror-line,.CodeMirror pre.CodeMirror-line-like{padding:0 4px}.CodeMirror-scrollbar-filler,.CodeMirror-gutter-filler{background-color:white}.CodeMirror-gutters{border-right:1px solid #ddd;background-color:#f7f7f7;white-space:nowrap}.CodeMirror-linenumber{padding:0 3px 0 5px;min-width:20px;text-align:right;color:#999;white-space:nowrap}.CodeMirror-guttermarker{color:black}.CodeMirror-guttermarker-subtle{color:#999}.CodeMirror-cursor{border-left:1px solid black;border-right:none;width:0}.CodeMirror div.CodeMirror-secondarycursor{border-left:1px solid silver}.cm-fat-cursor .CodeMirror-cursor{width:auto;border:0 !important;background:#7e7}.cm-fat-cursor div.CodeMirror-cursors{z-index:1}.cm-fat-cursor .CodeMirror-line::-moz-selection, .cm-fat-cursor .CodeMirror-line>span::-moz-selection, .cm-fat-cursor .CodeMirror-line>span>span::-moz-selection{background:transparent}.cm-fat-cursor .CodeMirror-line::selection,.cm-fat-cursor .CodeMirror-line>span::selection,.cm-fat-cursor .CodeMirror-line>span>span::selection{background:transparent}.cm-fat-cursor .CodeMirror-line::-moz-selection,.cm-fat-cursor .CodeMirror-line>span::-moz-selection,.cm-fat-cursor .CodeMirror-line>span>span::-moz-selection{background:transparent}.cm-fat-cursor{caret-color:transparent}@-webkit-keyframes blink{50%{background-color:transparent}}@keyframes blink{50%{background-color:transparent}}.cm-tab{display:inline-block;text-decoration:inherit}.CodeMirror-rulers{position:absolute;left:0;right:0;top:-50px;bottom:0;overflow:hidden}.CodeMirror-ruler{border-left:1px solid #ccc;top:0;bottom:0;position:absolute}.cm-s-default .cm-header{color:blue}.cm-s-default .cm-quote{color:#090}.cm-negative{color:#d44}.cm-positive{color:#292}.cm-header,.cm-strong{font-weight:bold}.cm-em{font-style:italic}.cm-link{text-decoration:underline}.cm-strikethrough{text-decoration:line-through}.cm-s-default .cm-keyword{color:#708}.cm-s-default .cm-atom{color:#219}.cm-s-default .cm-number{color:#164}.cm-s-default .cm-def{color:blue}.cm-s-default .cm-variable-2{color:#05a}.cm-s-default .cm-variable-3,.cm-s-default .cm-type{color:#085}.cm-s-default .cm-comment{color:#a50}.cm-s-default .cm-string{color:#a11}.cm-s-default .cm-string-2{color:#f50}.cm-s-default .cm-meta{color:#555}.cm-s-default .cm-qualifier{color:#555}.cm-s-default .cm-builtin{color:#30a}.cm-s-default .cm-bracket{color:#997}.cm-s-default .cm-tag{color:#170}.cm-s-default .cm-attribute{color:#00c}.cm-s-default .cm-hr{color:#999}.cm-s-default .cm-link{color:#00c}.cm-s-default .cm-error{color:red}.cm-invalidchar{color:red}.CodeMirror-composing{border-bottom:2px solid}div.CodeMirror span.CodeMirror-matchingbracket{color:#0b0}div.CodeMirror span.CodeMirror-nonmatchingbracket{color:#a22}.CodeMirror-matchingtag{background:rgba(255, 150, 0, 0.3)}.CodeMirror-activeline-background{background:#e8f2ff}.CodeMirror{position:relative;overflow:hidden;background:white}.CodeMirror-scroll{overflow:scroll !important;margin-bottom:-50px;margin-right:-50px;padding-bottom:50px;height:100%;outline:none;position:relative;z-index:0}.CodeMirror-sizer{position:relative;border-right:50px solid transparent}.CodeMirror-vscrollbar,.CodeMirror-hscrollbar,.CodeMirror-scrollbar-filler,.CodeMirror-gutter-filler{position:absolute;z-index:6;display:none;outline:none}.CodeMirror-vscrollbar{right:0;top:0;overflow-x:hidden;overflow-y:scroll}.CodeMirror-hscrollbar{bottom:0;left:0;overflow-y:hidden;overflow-x:scroll}.CodeMirror-scrollbar-filler{right:0;bottom:0}.CodeMirror-gutter-filler{left:0;bottom:0}.CodeMirror-gutters{position:absolute;left:0;top:0;min-height:100%;z-index:3}.CodeMirror-gutter{white-space:normal;height:100%;display:inline-block;vertical-align:top;margin-bottom:-50px}.CodeMirror-gutter-wrapper{position:absolute;z-index:4;background:none !important;border:none !important}.CodeMirror-gutter-background{position:absolute;top:0;bottom:0;z-index:4}.CodeMirror-gutter-elt{position:absolute;cursor:default;z-index:4}.CodeMirror-gutter-wrapper ::-moz-selection{background-color:transparent}.CodeMirror-gutter-wrapper ::selection{background-color:transparent}.CodeMirror-gutter-wrapper ::-moz-selection{background-color:transparent}.CodeMirror-lines{cursor:text;min-height:1px}.CodeMirror pre.CodeMirror-line,.CodeMirror pre.CodeMirror-line-like{border-radius:0;border-width:0;background:transparent;font-family:inherit;font-size:inherit;margin:0;white-space:pre;word-wrap:normal;line-height:inherit;color:inherit;z-index:2;position:relative;overflow:visible;-webkit-tap-highlight-color:transparent;-webkit-font-variant-ligatures:contextual;font-variant-ligatures:contextual}.CodeMirror-wrap pre.CodeMirror-line,.CodeMirror-wrap pre.CodeMirror-line-like{word-wrap:break-word;white-space:pre-wrap;word-break:normal}.CodeMirror-linebackground{position:absolute;left:0;right:0;top:0;bottom:0;z-index:0}.CodeMirror-linewidget{position:relative;z-index:2;padding:.1px}.CodeMirror-rtl pre{direction:rtl}.CodeMirror-code{outline:none}.CodeMirror-scroll,.CodeMirror-sizer,.CodeMirror-gutter,.CodeMirror-gutters,.CodeMirror-linenumber{-webkit-box-sizing:content-box;box-sizing:content-box}.CodeMirror-measure{position:absolute;width:100%;height:0;overflow:hidden;visibility:hidden}.CodeMirror-cursor{position:absolute;pointer-events:none}.CodeMirror-measure pre{position:static}div.CodeMirror-cursors{visibility:hidden;position:relative;z-index:3}div.CodeMirror-dragcursors{visibility:visible}.CodeMirror-focused div.CodeMirror-cursors{visibility:visible}.CodeMirror-selected{background:#d9d9d9}.CodeMirror-focused .CodeMirror-selected{background:#d7d4f0}.CodeMirror-crosshair{cursor:crosshair}.CodeMirror-line::-moz-selection, .CodeMirror-line>span::-moz-selection, .CodeMirror-line>span>span::-moz-selection{background:#d7d4f0}.CodeMirror-line::selection,.CodeMirror-line>span::selection,.CodeMirror-line>span>span::selection{background:#d7d4f0}.CodeMirror-line::-moz-selection,.CodeMirror-line>span::-moz-selection,.CodeMirror-line>span>span::-moz-selection{background:#d7d4f0}.cm-searching{background-color:#ffa;background-color:rgba(255, 255, 0, 0.4)}.cm-force-border{padding-right:.1px}@media print{.CodeMirror div.CodeMirror-cursors{visibility:hidden}}.cm-tab-wrap-hack:after{content:\"\"}span.CodeMirror-selectedtext{background:none}.cm-s-hopscotch.CodeMirror{background:#322931;color:#d5d3d5}.cm-s-hopscotch div.CodeMirror-selected{background:#433b42 !important}.cm-s-hopscotch .CodeMirror-gutters{background:#322931;border-right:0px}.cm-s-hopscotch .CodeMirror-linenumber{color:#797379}.cm-s-hopscotch .CodeMirror-cursor{border-left:1px solid #989498 !important}.cm-s-hopscotch span.cm-comment{color:#b33508}.cm-s-hopscotch span.cm-atom{color:#c85e7c}.cm-s-hopscotch span.cm-number{color:#c85e7c}.cm-s-hopscotch span.cm-property,.cm-s-hopscotch span.cm-attribute{color:#8fc13e}.cm-s-hopscotch span.cm-keyword{color:#dd464c}.cm-s-hopscotch span.cm-string{color:#fdcc59}.cm-s-hopscotch span.cm-variable{color:#8fc13e}.cm-s-hopscotch span.cm-variable-2{color:#1290bf}.cm-s-hopscotch span.cm-def{color:#fd8b19}.cm-s-hopscotch span.cm-error{background:#dd464c;color:#989498}.cm-s-hopscotch span.cm-bracket{color:#d5d3d5}.cm-s-hopscotch span.cm-tag{color:#dd464c}.cm-s-hopscotch span.cm-link{color:#c85e7c}.cm-s-hopscotch .CodeMirror-matchingbracket{text-decoration:underline;color:white !important}.cm-s-hopscotch .CodeMirror-activeline-background{background:#302020}.sp-container{position:absolute;top:0;left:0;display:inline-block;z-index:9999994;overflow:hidden}.sp-container.sp-flat{position:relative}.sp-container,.sp-container *{-webkit-box-sizing:content-box;box-sizing:content-box}.sp-top{position:relative;width:100%;display:inline-block}.sp-top-inner{position:absolute;top:0;left:0;bottom:0;right:0}.sp-color{position:absolute;top:0;left:0;bottom:0;right:20%}.sp-hue{position:absolute;top:0;right:0;bottom:0;left:84%;height:100%}.sp-clear-enabled .sp-hue{top:33px;height:77.5%}.sp-fill{padding-top:80%}.sp-sat,.sp-val{position:absolute;top:0;left:0;right:0;bottom:0}.sp-alpha-enabled .sp-top{margin-bottom:18px}.sp-alpha-enabled .sp-alpha{display:block}.sp-alpha-handle{position:absolute;top:-4px;bottom:-4px;width:6px;left:50%;cursor:pointer;border:1px solid #000;background:#fff;opacity:.8}.sp-alpha{display:none;position:absolute;bottom:-14px;right:0;left:0;height:8px}.sp-alpha-inner{border:solid 1px #333}.sp-clear{display:none}.sp-clear.sp-clear-display{background-position:center}.sp-clear-enabled .sp-clear{display:block;position:absolute;top:0px;right:0;bottom:0;left:84%;height:28px}.sp-container,.sp-replacer,.sp-preview,.sp-dragger,.sp-slider,.sp-alpha,.sp-clear,.sp-alpha-handle,.sp-container.sp-dragging .sp-input,.sp-container button{-webkit-user-select:none;-moz-user-select:-moz-none;-o-user-select:none;-ms-user-select:none;user-select:none}.sp-container.sp-input-disabled .sp-input-container{display:none}.sp-container.sp-buttons-disabled .sp-button-container{display:none}.sp-container.sp-palette-buttons-disabled .sp-palette-button-container{display:none}.sp-palette-only .sp-picker-container{display:none}.sp-palette-disabled .sp-palette-container{display:none}.sp-initial-disabled .sp-initial{display:none}.sp-sat{background-image:-webkit-gradient(linear, left top, right top, from(#fff), to(rgba(204, 154, 129, 0)));background-image:linear-gradient(to right, #fff, rgba(204, 154, 129, 0));-ms-filter:\"progid:DXImageTransform.Microsoft.gradient(GradientType = 1, startColorstr=#FFFFFFFF, endColorstr=#00CC9A81)\";filter:progid:DXImageTransform.Microsoft.gradient(GradientType = 1, startColorstr=\"#FFFFFFFF\", endColorstr=\"#00CC9A81\")}.sp-val{background-image:-webkit-gradient(linear, left bottom, left top, from(#000), to(rgba(204, 154, 129, 0)));background-image:linear-gradient(to top, #000, rgba(204, 154, 129, 0));-ms-filter:\"progid:DXImageTransform.Microsoft.gradient(startColorstr=#00CC9A81, endColorstr=#FF000000)\";filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\"#00CC9A81\", endColorstr=\"#FF000000\")}.sp-hue{background:-webkit-gradient(linear, left top, left bottom, from(#ff0000), color-stop(17%, #ffff00), color-stop(33%, #00ff00), color-stop(50%, #00ffff), color-stop(67%, #0000ff), color-stop(83%, #ff00ff), to(#ff0000));background:linear-gradient(to bottom, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)}.sp-1{height:17%;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\"#ff0000\", endColorstr=\"#ffff00\")}.sp-2{height:16%;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\"#ffff00\", endColorstr=\"#00ff00\")}.sp-3{height:17%;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\"#00ff00\", endColorstr=\"#00ffff\")}.sp-4{height:17%;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\"#00ffff\", endColorstr=\"#0000ff\")}.sp-5{height:16%;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\"#0000ff\", endColorstr=\"#ff00ff\")}.sp-6{height:17%;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\"#ff00ff\", endColorstr=\"#ff0000\")}.sp-hidden{display:none !important}.sp-cf:before,.sp-cf:after{content:\"\";display:table}.sp-cf:after{clear:both}@media(max-device-width: 480px){.sp-color{right:40%}.sp-hue{left:63%}.sp-fill{padding-top:60%}}.sp-dragger{border-radius:5px;height:5px;width:5px;border:1px solid #fff;background:#000;cursor:pointer;position:absolute;top:0;left:0}.sp-slider{position:absolute;top:0;cursor:pointer;height:3px;left:-1px;right:-1px;border:1px solid #000;background:#fff;opacity:.8}.sp-container{border-radius:0;background-color:#ececec;border:solid 1px #f0c49b;padding:0}.sp-container,.sp-container button,.sp-container input,.sp-color,.sp-hue,.sp-clear{font:normal 12px \"Lucida Grande\",\"Lucida Sans Unicode\",\"Lucida Sans\",Geneva,Verdana,sans-serif;-webkit-box-sizing:border-box;-ms-box-sizing:border-box;box-sizing:border-box}.sp-top{margin-bottom:3px}.sp-color,.sp-hue,.sp-clear{border:solid 1px #666}.sp-input-container{float:right;width:100px;margin-bottom:4px}.sp-initial-disabled .sp-input-container{width:100%}.sp-input{font-size:12px !important;border:1px inset;padding:4px 5px;margin:0;width:100%;background:rgba(0,0,0,0);border-radius:3px;color:#222}.sp-input:focus{border:1px solid orange}.sp-input.sp-validation-error{border:1px solid red;background:#fdd}.sp-picker-container,.sp-palette-container{float:left;position:relative;padding:10px;padding-bottom:300px;margin-bottom:-290px}.sp-picker-container{width:172px;border-left:solid 1px #fff}.sp-palette-container{border-right:solid 1px #ccc}.sp-palette-only .sp-palette-container{border:0}.sp-palette .sp-thumb-el{display:block;position:relative;float:left;width:24px;height:15px;margin:3px;cursor:pointer;border:solid 2px rgba(0,0,0,0)}.sp-palette .sp-thumb-el:hover,.sp-palette .sp-thumb-el.sp-thumb-active{border-color:orange}.sp-thumb-el{position:relative}.sp-initial{float:left;border:solid 1px #333}.sp-initial span{width:30px;height:25px;border:none;display:block;float:left;margin:0}.sp-initial .sp-clear-display{background-position:center}.sp-palette-button-container,.sp-button-container{float:right}.sp-replacer{margin:0;overflow:hidden;cursor:pointer;padding:4px;display:inline-block;border:solid 1px #91765d;background:#eee;color:#333;vertical-align:middle}.sp-replacer:hover,.sp-replacer.sp-active{border-color:#f0c49b;color:#111}.sp-replacer.sp-disabled{cursor:default;border-color:silver;color:silver}.sp-dd{padding:2px 0;height:16px;line-height:16px;float:left;font-size:10px}.sp-preview{position:relative;width:25px;height:20px;border:solid 1px #222;margin-right:5px;float:left;z-index:0}.sp-palette{max-width:220px}.sp-palette .sp-thumb-el{width:16px;height:16px;margin:2px 1px;border:solid 1px #d0d0d0}.sp-container{padding-bottom:0}.sp-container button{background-color:#eee;background-image:-webkit-gradient(linear, left top, left bottom, from(#eeeeee), to(#cccccc));background-image:linear-gradient(to bottom, #eeeeee, #cccccc);border:1px solid #ccc;border-bottom:1px solid #bbb;border-radius:3px;color:#333;font-size:14px;line-height:1;padding:5px 4px;text-align:center;text-shadow:0 1px 0 #eee;vertical-align:middle}.sp-container button:hover{background-color:#ddd;background-image:-webkit-gradient(linear, left top, left bottom, from(#dddddd), to(#bbbbbb));background-image:linear-gradient(to bottom, #dddddd, #bbbbbb);border:1px solid #bbb;border-bottom:1px solid #999;cursor:pointer;text-shadow:0 1px 0 #ddd}.sp-container button:active{border:1px solid #aaa;border-bottom:1px solid #888;-webkit-box-shadow:inset 0 0 5px 2px #aaa,0 1px 0 0 #eee;-ms-box-shadow:inset 0 0 5px 2px #aaa,0 1px 0 0 #eee;-o-box-shadow:inset 0 0 5px 2px #aaa,0 1px 0 0 #eee;box-shadow:inset 0 0 5px 2px #aaa,0 1px 0 0 #eee}.sp-cancel{font-size:11px;color:#d93f3f !important;margin:0;padding:2px;margin-right:5px;vertical-align:middle;text-decoration:none}.sp-cancel:hover{color:#d93f3f !important;text-decoration:underline}.sp-palette span:hover,.sp-palette span.sp-thumb-active{border-color:#000}.sp-preview,.sp-alpha,.sp-thumb-el{position:relative;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==)}.sp-preview-inner,.sp-alpha-inner,.sp-thumb-inner{display:block;position:absolute;top:0;left:0;bottom:0;right:0}.sp-palette .sp-thumb-inner{background-position:50% 50%;background-repeat:no-repeat}.sp-palette .sp-thumb-light.sp-thumb-active .sp-thumb-inner{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAIVJREFUeNpiYBhsgJFMffxAXABlN5JruT4Q3wfi/0DsT64h8UD8HmpIPCWG/KemIfOJCUB+Aoacx6EGBZyHBqI+WsDCwuQ9mhxeg2A210Ntfo8klk9sOMijaURm7yc1UP2RNCMbKE9ODK1HM6iegYLkfx8pligC9lCD7KmRof0ZhjQACDAAceovrtpVBRkAAAAASUVORK5CYII=)}.sp-palette .sp-thumb-dark.sp-thumb-active .sp-thumb-inner{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAMdJREFUOE+tkgsNwzAMRMugEAahEAahEAZhEAqlEAZhEAohEAYh81X2dIm8fKpEspLGvudPOsUYpxE2BIJCroJmEW9qJ+MKaBFhEMNabSy9oIcIPwrB+afvAUFoK4H0tMaQ3XtlrggDhOVVMuT4E5MMG0FBbCEYzjYT7OxLEvIHQLY2zWwQ3D+9luyOQTfKDiFD3iUIfPk8VqrKjgAiSfGFPecrg6HN6m/iBcwiDAo7WiBeawa+Kwh7tZoSCGLMqwlSAzVDhoK+6vH4G0P5wdkAAAAASUVORK5CYII=)}.sp-clear-display{background-repeat:no-repeat;background-position:center;background-image:url(data:image/gif;base64,R0lGODlhFAAUAPcAAAAAAJmZmZ2dnZ6enqKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq/Hx8fLy8vT09PX19ff39/j4+Pn5+fr6+vv7+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAUABQAAAihAP9FoPCvoMGDBy08+EdhQAIJCCMybCDAAYUEARBAlFiQQoMABQhKUJBxY0SPICEYHBnggEmDKAuoPMjS5cGYMxHW3IiT478JJA8M/CjTZ0GgLRekNGpwAsYABHIypcAgQMsITDtWJYBR6NSqMico9cqR6tKfY7GeBCuVwlipDNmefAtTrkSzB1RaIAoXodsABiZAEFB06gIBWC1mLVgBa0AAOw==)}@font-face{font-family:\"font3336\";src:url(\"../fonts/main-fonts.eot?v=20\");src:url(\"../fonts/main-fonts.woff?v=20\") format(\"woff\"),url(\"../fonts/main-fonts.ttf?v=20\") format(\"truetype\"),url(\"../fonts/main-fonts.svg?v=20\") format(\"svg\"),url(\"../fonts/main-fonts.eot?v=20\") format(\"embedded-opentype\");font-weight:normal;font-style:normal}.gjs-is__grab,.gjs-is__grab *{cursor:-webkit-grab !important;cursor:grab !important}.gjs-is__grabbing,.gjs-is__grabbing *{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none;cursor:-webkit-grabbing !important;cursor:grabbing !important}.gjs-one-bg{background-color:#444}.gjs-one-color{color:#444}.gjs-one-color-h:hover{color:#444}.gjs-two-bg{background-color:#ddd}.gjs-two-color{color:#ddd}.gjs-two-color-h:hover{color:#ddd}.gjs-three-bg{background-color:#804f7b}.gjs-three-color{color:#804f7b}.gjs-three-color-h:hover{color:#804f7b}.gjs-four-bg{background-color:#d278c9}.gjs-four-color{color:#d278c9}.gjs-four-color-h:hover{color:#d278c9}.gjs-danger-bg{background-color:#dd3636}.gjs-danger-color{color:#dd3636}.gjs-danger-color-h:hover{color:#dd3636}.gjs-bg-main,.gjs-sm-colorp-c,.gjs-off-prv{background-color:#444}.gjs-color-main,.gjs-sm-stack #gjs-sm-add,.gjs-off-prv{color:#ddd;fill:#ddd}.gjs-color-active{color:#f8f8f8;fill:#f8f8f8}.gjs-color-warn{color:#ffca6f;fill:#ffca6f}.gjs-color-hl{color:#71b7f1;fill:#71b7f1}.gjs-fonts::before{display:block;font:normal normal normal 14px font3336;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-size:5em}.gjs-f-b1::before{content:\"Q\"}.gjs-f-b2::before{content:\"W\"}.gjs-f-b3::before{content:\"E\"}.gjs-f-b37::before{content:\"R\"}.gjs-f-hero::before{content:\"T\"}.gjs-f-h1p::before{content:\"y\"}.gjs-f-3ba::before{content:\"u\"}.gjs-f-image::before{content:\"I\"}.gjs-f-text::before{content:\"o\"}.gjs-f-quo::before{content:\"p\"}.gjs-f-button::before{content:\"B\"}.gjs-f-divider::before{content:\"D\"}.gjs-invis-invis,.gjs-clm-tags #gjs-clm-new,.gjs-no-app{background-color:rgba(0,0,0,0);border:none;color:inherit}.gjs-no-app{height:10px}.gjs-test::btn{color:\"#fff\"}.opac50{opacity:.5;filter:alpha(opacity=50)}.gjs-checker-bg,.gjs-field-colorp-c,.checker-bg,.gjs-sm-layer-preview{background-image:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==\")}.gjs-no-user-select,.gjs-rte-toolbar,.gjs-layer-name,.gjs-grabbing,.gjs-grabbing *{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none}.gjs-no-pointer-events,.gjs-margin-v-el,.gjs-padding-v-el,.gjs-fixedmargin-v-el,.gjs-fixedpadding-v-el,.gjs-resizer-c{pointer-events:none}.gjs-bdrag{pointer-events:none !important;position:absolute !important;z-index:10 !important;width:auto}.gjs-drag-helper{background-color:#3b97e3 !important;pointer-events:none !important;position:absolute !important;z-index:10 !important;-webkit-transform:scale(0.3) !important;transform:scale(0.3) !important;transform-origin:top left !important;-webkit-transform-origin:top left !important;margin:15px !important;-webkit-transition:none !important;transition:none !important;outline:none !important}.gjs-grabbing,.gjs-grabbing *{cursor:grabbing !important;cursor:-webkit-grabbing !important}.gjs-grabbing{overflow:hidden}.gjs-off-prv{position:relative;z-index:10;padding:5px;cursor:pointer}.gjs-editor-cont ::-webkit-scrollbar-track{background:rgba(0,0,0,.1)}.gjs-editor-cont ::-webkit-scrollbar-thumb{background-color:rgba(255,255,255,.2)}.gjs-editor-cont ::-webkit-scrollbar{width:8px}.clear{clear:both}.no-select,.gjs-clm-tags #gjs-clm-close,.gjs-category-title,.gjs-layer-title,.gjs-block-category .gjs-title,.gjs-sm-sector-title,.gjs-com-no-select,.gjs-com-no-select img{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none}.gjs-no-touch-actions{-ms-touch-action:none;touch-action:none}.gjs-disabled{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none;opacity:.5;filter:alpha(opacity=50)}.gjs-editor{font-family:Helvetica,sans-serif;font-size:.75rem;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;height:100%}.gjs-freezed,.gjs-freezed{opacity:.5;filter:alpha(opacity=50);pointer-events:none}.gjs-traits-label{border-bottom:1px solid rgba(0,0,0,.2);font-weight:lighter;margin-bottom:5px;padding:10px;text-align:left}.gjs-label-wrp{width:30%;min-width:30%}.gjs-field-wrp{-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1}.gjs-trt-header{font-weight:lighter;padding:10px}.gjs-trt-trait{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;padding:5px 10px;font-weight:lighter;-webkit-box-align:center;-ms-flex-align:center;align-items:center;text-align:left}.gjs-trt-traits{font-size:.75rem}.gjs-trt-trait .gjs-label{text-align:left;text-overflow:ellipsis;overflow:hidden}.gjs-guide-info{position:absolute}.gjs-guide-info__content{position:absolute;height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;padding:5px}.gjs-guide-info__line{position:relative;margin:auto}.gjs-guide-info__line::before,.gjs-guide-info__line::after{content:\"\";display:block;position:absolute;background-color:inherit}.gjs-guide-info__y{padding:0 5px}.gjs-guide-info__y .gjs-guide-info__content{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.gjs-guide-info__y .gjs-guide-info__line{width:100%;height:1px}.gjs-guide-info__y .gjs-guide-info__line::before,.gjs-guide-info__y .gjs-guide-info__line::after{width:1px;height:10px;top:0;bottom:0;left:0;margin:auto}.gjs-guide-info__y .gjs-guide-info__line::after{left:auto;right:0}.gjs-guide-info__x{padding:5px 0}.gjs-guide-info__x .gjs-guide-info__content{-webkit-box-align:center;-ms-flex-align:center;align-items:center}.gjs-guide-info__x .gjs-guide-info__line{height:100%;width:1px}.gjs-guide-info__x .gjs-guide-info__line::before,.gjs-guide-info__x .gjs-guide-info__line::after{width:10px;height:1px;left:0;right:0;top:0;margin:auto;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.gjs-guide-info__x .gjs-guide-info__line::after{top:auto;bottom:0}.gjs-badge{white-space:nowrap}.gjs-badge__icon{vertical-align:middle;display:inline-block;width:15px;height:15px}.gjs-badge__icon svg{fill:currentColor}.gjs-badge__name{display:inline-block;vertical-align:middle}.gjs-frame-wrapper{position:absolute;width:100%;height:100%;left:0;right:0;margin:auto}.gjs-frame-wrapper--anim{-webkit-transition:width .35s ease,height .35s ease;transition:width .35s ease,height .35s ease}.gjs-frame-wrapper__top{-webkit-transform:translateY(-100%) translateX(-50%);transform:translateY(-100%) translateX(-50%);display:-webkit-box;display:-ms-flexbox;display:flex;padding:5px 0;position:absolute;width:100%;left:50%;top:0}.gjs-frame-wrapper__top-r{margin-left:auto}.gjs-frame-wrapper__left{position:absolute;left:0;-webkit-transform:translateX(-100%) translateY(-50%);transform:translateX(-100%) translateY(-50%);height:100%;top:50%}.gjs-frame-wrapper__bottom{position:absolute;bottom:0;-webkit-transform:translateY(100%) translateX(-50%);transform:translateY(100%) translateX(-50%);width:100%;left:50%}.gjs-frame-wrapper__right{position:absolute;right:0;-webkit-transform:translateX(100%) translateY(-50%);transform:translateX(100%) translateY(-50%);height:100%;top:50%}.gjs-frame-wrapper__icon{width:24px;cursor:pointer}.gjs-frame-wrapper__icon>svg{fill:currentColor}.gjs-padding-v-top,.gjs-fixedpadding-v-top{width:100%;top:0;left:0}.gjs-padding-v-right,.gjs-fixedpadding-v-right{right:0}.gjs-padding-v-bottom,.gjs-fixedpadding-v-bottom{width:100%;left:0;bottom:0}.gjs-padding-v-left,.gjs-fixedpadding-v-left{left:0}.gjs-cv-canvas{background-color:rgba(0,0,0,.15);-webkit-box-sizing:border-box;box-sizing:border-box;width:85%;height:calc(100% - 40px);bottom:0;overflow:hidden;z-index:1;position:absolute;left:0;top:40px}.gjs-cv-canvas.gjs-cui{width:100%;height:100%;top:0}.gjs-cv-canvas.gjs-is__grab .gjs-cv-canvas__frames,.gjs-cv-canvas.gjs-is__grabbing .gjs-cv-canvas__frames{pointer-events:none}.gjs-cv-canvas__frames{position:absolute;top:0;left:0;width:100%;height:100%}.gjs-cv-canvas .gjs-ghost{display:none;pointer-events:none;background-color:#5b5b5b;border:2px dashed #ccc;position:absolute;z-index:10;opacity:.55;filter:alpha(opacity=55)}.gjs-cv-canvas .gjs-highlighter,.gjs-cv-canvas .gjs-highlighter-sel{position:absolute;outline:1px solid #3b97e3;outline-offset:-1px;pointer-events:none;width:100%;height:100%}.gjs-cv-canvas .gjs-highlighter-warning{outline:3px solid #ffca6f}.gjs-cv-canvas .gjs-highlighter-sel{outline:2px solid #3b97e3;outline-offset:-2px}.gjs-cv-canvas #gjs-tools,.gjs-cv-canvas .gjs-tools{width:100%;height:100%;position:absolute;top:0;left:0;outline:none;z-index:1}.gjs-cv-canvas *{-webkit-box-sizing:border-box;box-sizing:border-box}.gjs-frame{outline:medium none;height:100%;width:100%;border:none;margin:auto;display:block;-webkit-transition:width .35s ease,height .35s ease;transition:width .35s ease,height .35s ease;position:absolute;top:0;bottom:0;left:0;right:0}.gjs-toolbar{position:absolute;background-color:#3b97e3;white-space:nowrap;color:#fff;z-index:10;top:0;left:0}.gjs-toolbar-item{width:26px;padding:5px;cursor:pointer;display:inline-block}.gjs-toolbar-item svg{fill:currentColor;vertical-align:middle}.gjs-resizer-c{position:absolute;left:0;top:0;width:100%;height:100%;z-index:9}.gjs-margin-v-el,.gjs-padding-v-el,.gjs-fixedmargin-v-el,.gjs-fixedpadding-v-el{opacity:.1;filter:alpha(opacity=10);position:absolute;background-color:#ff0}.gjs-fixedmargin-v-el,.gjs-fixedpadding-v-el{opacity:.2;filter:alpha(opacity=20)}.gjs-padding-v-el,.gjs-fixedpadding-v-el{background-color:navy}.gjs-resizer-h{pointer-events:all;position:absolute;border:3px solid #3b97e3;width:10px;height:10px;background-color:#fff;margin:-5px}.gjs-resizer-h-tl{top:0;left:0;cursor:nwse-resize}.gjs-resizer-h-tr{top:0;right:0;cursor:nesw-resize}.gjs-resizer-h-tc{top:0;margin:-5px auto;left:0;right:0;cursor:ns-resize}.gjs-resizer-h-cl{left:0;margin:auto -5px;top:0;bottom:0;cursor:ew-resize}.gjs-resizer-h-cr{margin:auto -5px;top:0;bottom:0;right:0;cursor:ew-resize}.gjs-resizer-h-bl{bottom:0;left:0;cursor:nesw-resize}.gjs-resizer-h-bc{bottom:0;margin:-5px auto;left:0;right:0;cursor:ns-resize}.gjs-resizer-h-br{bottom:0;right:0;cursor:nwse-resize}.gjs-pn-panel .gjs-resizer-h{background-color:rgba(0,0,0,.2);border:none;opacity:0;-webkit-transition:opacity .25s;transition:opacity .25s}.gjs-pn-panel .gjs-resizer-h:hover{opacity:1}.gjs-pn-panel .gjs-resizer-h-tc,.gjs-pn-panel .gjs-resizer-h-bc{margin:0 auto;width:100%}.gjs-pn-panel .gjs-resizer-h-cr,.gjs-pn-panel .gjs-resizer-h-cl{margin:auto 0;height:100%}.gjs-resizing .gjs-highlighter,.gjs-resizing .gjs-badge{display:none !important}.gjs-resizing-tl *{cursor:nwse-resize !important}.gjs-resizing-tr *{cursor:nesw-resize !important}.gjs-resizing-tc *{cursor:ns-resize !important}.gjs-resizing-cl *{cursor:ew-resize !important}.gjs-resizing-cr *{cursor:ew-resize !important}.gjs-resizing-bl *{cursor:nesw-resize !important}.gjs-resizing-bc *{cursor:ns-resize !important}.gjs-resizing-br *{cursor:nwse-resize !important}.btn-cl,.gjs-am-close,.gjs-mdl-btn-close{opacity:.3;filter:alpha(opacity=30);font-size:25px;cursor:pointer}.btn-cl:hover,.gjs-am-close:hover,.gjs-mdl-btn-close:hover{opacity:.7;filter:alpha(opacity=70)}.no-dots,.ui-resizable-handle{border:none !important;margin:0 !important;outline:none !important}.gjs-com-dashed *{outline:1px dashed #888;outline-offset:-2px;-webkit-box-sizing:border-box;box-sizing:border-box}.gjs-com-badge,.gjs-badge{pointer-events:none;background-color:#3b97e3;color:#fff;padding:2px 5px;position:absolute;z-index:1;font-size:12px;outline:none;display:none}.gjs-badge-warning{background-color:#ffca6f}.gjs-placeholder,.gjs-com-placeholder,.gjs-placeholder{position:absolute;z-index:10;pointer-events:none;display:none}.gjs-placeholder,.gjs-placeholder{border-style:solid !important;outline:none;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transition:top .2s,left .2s,width .2s,height .2s;transition:top .2s,left .2s,width .2s,height .2s}.gjs-placeholder.horizontal,.gjs-com-placeholder.horizontal,.gjs-placeholder.horizontal{border-color:rgba(0,0,0,0) #62c462;border-width:3px 5px;margin:-3px 0 0}.gjs-placeholder.vertical,.gjs-com-placeholder.vertical,.gjs-placeholder.vertical{border-color:#62c462 rgba(0,0,0,0);border-width:5px 3px;margin:0 0 0 -3px}.gjs-placeholder-int,.gjs-com-placeholder-int,.gjs-placeholder-int{background-color:#62c462;-webkit-box-shadow:0 0 3px rgba(0,0,0,.2);box-shadow:0 0 3px rgba(0,0,0,.2);height:100%;width:100%;pointer-events:none;padding:1.5px;outline:none}.gjs-pn-panel{display:inline-block;position:absolute;-webkit-box-sizing:border-box;box-sizing:border-box;text-align:center;padding:5px;z-index:3}.gjs-pn-panel .icon-undo,.gjs-pn-panel .icon-redo{font-size:20px;height:30px;width:25px}.gjs-pn-commands{width:85%;left:0;top:0;-webkit-box-shadow:0 0 5px rgba(0,0,0,.2);box-shadow:0 0 5px rgba(0,0,0,.2)}.gjs-pn-options{right:15%;top:0}.gjs-pn-views{border-bottom:2px solid rgba(0,0,0,.2);right:0;width:15%;z-index:4}.gjs-pn-views-container{height:100%;padding:42px 0 0;right:0;width:15%;overflow:auto;-webkit-box-shadow:0 0 5px rgba(0,0,0,.2);box-shadow:0 0 5px rgba(0,0,0,.2)}.gjs-pn-buttons{-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.gjs-pn-btn{-webkit-box-sizing:border-box;box-sizing:border-box;min-height:30px;min-width:30px;line-height:21px;background-color:rgba(0,0,0,0);border:none;font-size:18px;margin-right:5px;border-radius:2px;padding:4px;position:relative;cursor:pointer}.gjs-pn-btn.gjs-pn-active{background-color:rgba(0,0,0,.15);-webkit-box-shadow:0 0 3px rgba(0,0,0,.25) inset;box-shadow:0 0 3px rgba(0,0,0,.25) inset}.gjs-pn-btn svg{fill:currentColor}.gjs-label{line-height:18px}.gjs-fields{display:-webkit-box;display:-ms-flexbox;display:flex}.gjs-select{padding:0;width:100%}.gjs-select select{padding-right:10px}.gjs-select:-moz-focusring,.gjs-select select:-moz-focusring{color:rgba(0,0,0,0);text-shadow:0 0 0 rgba(255,255,255,.7)}.gjs-input:focus,.gjs-button:focus,.gjs-btn-prim:focus,.gjs-select:focus,.gjs-select select:focus{outline:none}.gjs-field input,.gjs-field select,.gjs-field textarea{-webkit-appearance:none;-moz-appearance:none;appearance:none;color:inherit;border:none;background-color:rgba(0,0,0,0);-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;position:relative;padding:5px;z-index:1}.gjs-field input:focus,.gjs-field select:focus,.gjs-field textarea:focus{outline:none}.gjs-field input[type=number]{-moz-appearance:textfield}.gjs-field input[type=number]::-webkit-outer-spin-button,.gjs-field input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}.gjs-field-range{-webkit-box-flex:9;-ms-flex:9 1 auto;flex:9 1 auto}.gjs-field-integer input{padding-right:30px}.gjs-select option,.gjs-field-select option,.gjs-clm-select option,.gjs-sm-select option,.gjs-fields option,.gjs-sm-unit option{background-color:#444;color:#ddd}.gjs-field{background-color:rgba(0,0,0,.2);border:none;-webkit-box-shadow:none;box-shadow:none;border-radius:2px;-webkit-box-sizing:border-box;box-sizing:border-box;padding:0;position:relative}.gjs-field textarea{resize:vertical}.gjs-field .gjs-sel-arrow{height:100%;width:9px;position:absolute;right:0;top:0;z-index:0}.gjs-field .gjs-d-s-arrow{bottom:0;top:0;margin:auto;right:5px;border-top:4px solid rgba(255,255,255,.7);position:absolute;height:0;width:0;border-left:3px solid rgba(0,0,0,0);border-right:4px solid rgba(0,0,0,0);cursor:pointer}.gjs-field-arrows{position:absolute;cursor:ns-resize;margin:auto;height:20px;width:9px;z-index:10;bottom:0;right:3px;top:0}.gjs-field-color,.gjs-field-radio{width:100%}.gjs-field-color input{padding-right:22px;-webkit-box-sizing:border-box;box-sizing:border-box}.gjs-field-colorp{border-left:1px solid rgba(0,0,0,.2);-webkit-box-sizing:border-box;box-sizing:border-box;height:100%;padding:2px;position:absolute;right:0;top:0;width:22px;z-index:10}.gjs-field-colorp .gjs-checker-bg,.gjs-field-colorp .gjs-field-colorp-c{height:100%;width:100%;border-radius:1px}.gjs-field-colorp-c{height:100%;position:relative;width:100%}.gjs-field-color-picker{background-color:#ddd;cursor:pointer;height:100%;width:100%;-webkit-box-shadow:0 0 1px rgba(0,0,0,.2);box-shadow:0 0 1px rgba(0,0,0,.2);border-radius:1px;position:absolute;top:0}.gjs-field-checkbox{padding:0;width:17px;height:17px;display:block;cursor:pointer}.gjs-field-checkbox input{display:none}.gjs-field-checkbox input:checked+.gjs-chk-icon{border-color:rgba(255,255,255,.5);border-width:0 2px 2px 0;border-style:solid}.gjs-radio-item{-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto;text-align:center;border-left:1px solid rgba(0,0,0,.2)}.gjs-radio-item:first-child{border:none}.gjs-radio-item:hover{background:rgba(0,0,0,.2)}.gjs-radio-item input{display:none}.gjs-radio-item input:checked+.gjs-radio-item-label{background-color:rgba(255,255,255,.2)}.gjs-radio-items{display:-webkit-box;display:-ms-flexbox;display:flex}.gjs-radio-item-label{cursor:pointer;display:block;padding:5px}.gjs-field-units{position:absolute;margin:auto;right:10px;bottom:0;top:0}.gjs-field-unit{position:absolute;right:10px;top:3px;font-size:10px;color:rgba(255,255,255,.7);cursor:pointer}.gjs-input-unit{text-align:center}.gjs-field-arrow-u,.gjs-field-arrow-d{position:absolute;height:0;width:0;border-left:3px solid rgba(0,0,0,0);border-right:4px solid rgba(0,0,0,0);border-top:4px solid rgba(255,255,255,.7);bottom:4px;cursor:pointer}.gjs-field-arrow-u{border-bottom:4px solid rgba(255,255,255,.7);border-top:none;top:4px}.gjs-field-select{padding:0}.gjs-field-range{background-color:rgba(0,0,0,0);border:none;-webkit-box-shadow:none;box-shadow:none;padding:0}.gjs-field-range input{margin:0;height:100%}.gjs-field-range input:focus{outline:none}.gjs-field-range input::-webkit-slider-thumb{-webkit-appearance:none;margin-top:-4px;height:10px;width:10px;border:1px solid rgba(0,0,0,.2);border-radius:100%;background-color:#ddd;cursor:pointer}.gjs-field-range input::-moz-range-thumb{height:10px;width:10px;border:1px solid rgba(0,0,0,.2);border-radius:100%;background-color:#ddd;cursor:pointer}.gjs-field-range input::-ms-thumb{height:10px;width:10px;border:1px solid rgba(0,0,0,.2);border-radius:100%;background-color:#ddd;cursor:pointer}.gjs-field-range input::-moz-range-track{background-color:rgba(0,0,0,.2);border-radius:1px;margin-top:3px;height:3px}.gjs-field-range input::-webkit-slider-runnable-track{background-color:rgba(0,0,0,.2);border-radius:1px;margin-top:3px;height:3px}.gjs-field-range input::-ms-track{background-color:rgba(0,0,0,.2);border-radius:1px;margin-top:3px;height:3px}.gjs-btn-prim{color:inherit;background-color:rgba(255,255,255,.1);border-radius:2px;padding:3px 6px;padding:5px;cursor:pointer;border:none}.gjs-btn-prim:active{background-color:rgba(255,255,255,.1)}.gjs-btn--full{width:100%}.gjs-chk-icon{-webkit-transform:rotate(45deg);transform:rotate(45deg);-webkit-box-sizing:border-box;box-sizing:border-box;display:block;height:14px;margin:0 5px;width:6px}.gjs-add-trasp{background:none;border:none;color:#ddd;cursor:pointer;font-size:1em;border-radius:2px;opacity:.75;filter:alpha(opacity=75)}.gjs-add-trasp:hover{opacity:1;filter:alpha(opacity=100)}.gjs-add-trasp:active{background-color:rgba(0,0,0,.2)}.gjs-devices-c{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:2px 3px 3px 3px}.gjs-devices-c .gjs-device-label{-webkit-box-flex:2;-ms-flex-positive:2;flex-grow:2;text-align:left;margin-right:10px}.gjs-devices-c .gjs-select{-webkit-box-flex:20;-ms-flex-positive:20;flex-grow:20}.gjs-devices-c .gjs-add-trasp{-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;margin-left:5px}.gjs-category-open,.gjs-block-category.gjs-open,.gjs-sm-sector.gjs-sm-open{border-bottom:1px solid rgba(0,0,0,.25)}.gjs-category-title,.gjs-layer-title,.gjs-block-category .gjs-title,.gjs-sm-sector-title{font-weight:lighter;background-color:rgba(0,0,0,.1);letter-spacing:1px;padding:9px 10px 9px 20px;border-bottom:1px solid rgba(0,0,0,.25);text-align:left;position:relative;cursor:pointer}.gjs-sm-clear{cursor:pointer;width:14px;min-width:14px;height:14px;margin-left:3px}.gjs-sm-header{font-weight:lighter;padding:10px}.gjs-sm-sector{clear:both;font-weight:lighter;text-align:left}.gjs-sm-sector-title{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.gjs-sm-sector-caret{width:17px;height:17px;min-width:17px;-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.gjs-sm-sector-label{margin-left:5px}.gjs-sm-sector.gjs-sm-open .gjs-sm-sector-caret{-webkit-transform:none;transform:none}.gjs-sm-properties{font-size:.75rem;padding:10px 5px;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%}.gjs-sm-label{margin:5px 5px 3px 0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.gjs-sm-close-btn,.gjs-sm-preview-file-close{display:block;font-size:23px;position:absolute;cursor:pointer;right:5px;top:0;opacity:.7;filter:alpha(opacity=70)}.gjs-sm-close-btn:hover,.gjs-sm-preview-file-close:hover{opacity:.9;filter:alpha(opacity=90)}.gjs-sm-field,.gjs-clm-select,.gjs-clm-field{width:100%;position:relative}.gjs-sm-field input,.gjs-clm-select input,.gjs-clm-field input,.gjs-sm-field select,.gjs-clm-select select,.gjs-clm-field select{background-color:rgba(0,0,0,0);color:rgba(255,255,255,.7);border:none;width:100%}.gjs-sm-field input,.gjs-clm-select input,.gjs-clm-field input{-webkit-box-sizing:border-box;box-sizing:border-box}.gjs-sm-field select,.gjs-clm-select select,.gjs-clm-field select{position:relative;z-index:1;-webkit-appearance:none;-moz-appearance:none;appearance:none}.gjs-sm-field select::-ms-expand,.gjs-clm-select select::-ms-expand,.gjs-clm-field select::-ms-expand{display:none}.gjs-sm-field select:-moz-focusring,.gjs-clm-select select:-moz-focusring,.gjs-clm-field select:-moz-focusring{color:rgba(0,0,0,0);text-shadow:0 0 0 rgba(255,255,255,.7)}.gjs-sm-field input:focus,.gjs-clm-select input:focus,.gjs-clm-field input:focus,.gjs-sm-field select:focus,.gjs-clm-select select:focus,.gjs-clm-field select:focus{outline:none}.gjs-sm-field .gjs-sm-unit,.gjs-clm-select .gjs-sm-unit,.gjs-clm-field .gjs-sm-unit{position:absolute;right:10px;top:3px;font-size:10px;color:rgba(255,255,255,.7);cursor:pointer}.gjs-sm-field .gjs-clm-sel-arrow,.gjs-clm-select .gjs-clm-sel-arrow,.gjs-clm-field .gjs-clm-sel-arrow,.gjs-sm-field .gjs-sm-int-arrows,.gjs-clm-select .gjs-sm-int-arrows,.gjs-clm-field .gjs-sm-int-arrows,.gjs-sm-field .gjs-sm-sel-arrow,.gjs-clm-select .gjs-sm-sel-arrow,.gjs-clm-field .gjs-sm-sel-arrow{height:100%;width:9px;position:absolute;right:0;top:0;cursor:ns-resize}.gjs-sm-field .gjs-sm-sel-arrow,.gjs-clm-select .gjs-sm-sel-arrow,.gjs-clm-field .gjs-sm-sel-arrow{cursor:pointer}.gjs-sm-field .gjs-clm-d-s-arrow,.gjs-clm-select .gjs-clm-d-s-arrow,.gjs-clm-field .gjs-clm-d-s-arrow,.gjs-sm-field .gjs-sm-d-arrow,.gjs-clm-select .gjs-sm-d-arrow,.gjs-clm-field .gjs-sm-d-arrow,.gjs-sm-field .gjs-sm-d-s-arrow,.gjs-clm-select .gjs-sm-d-s-arrow,.gjs-clm-field .gjs-sm-d-s-arrow,.gjs-sm-field .gjs-sm-u-arrow,.gjs-clm-select .gjs-sm-u-arrow,.gjs-clm-field .gjs-sm-u-arrow{position:absolute;height:0;width:0;border-left:3px solid rgba(0,0,0,0);border-right:4px solid rgba(0,0,0,0);cursor:pointer}.gjs-sm-field .gjs-sm-u-arrow,.gjs-clm-select .gjs-sm-u-arrow,.gjs-clm-field .gjs-sm-u-arrow{border-bottom:4px solid rgba(255,255,255,.7);top:4px}.gjs-sm-field .gjs-clm-d-s-arrow,.gjs-clm-select .gjs-clm-d-s-arrow,.gjs-clm-field .gjs-clm-d-s-arrow,.gjs-sm-field .gjs-sm-d-arrow,.gjs-clm-select .gjs-sm-d-arrow,.gjs-clm-field .gjs-sm-d-arrow,.gjs-sm-field .gjs-sm-d-s-arrow,.gjs-clm-select .gjs-sm-d-s-arrow,.gjs-clm-field .gjs-sm-d-s-arrow{border-top:4px solid rgba(255,255,255,.7);bottom:4px}.gjs-sm-field .gjs-clm-d-s-arrow,.gjs-clm-select .gjs-clm-d-s-arrow,.gjs-clm-field .gjs-clm-d-s-arrow,.gjs-sm-field .gjs-sm-d-s-arrow,.gjs-clm-select .gjs-sm-d-s-arrow,.gjs-clm-field .gjs-sm-d-s-arrow{bottom:7px}.gjs-sm-field.gjs-sm-color,.gjs-sm-color.gjs-clm-field,.gjs-sm-field.gjs-sm-input,.gjs-sm-input.gjs-clm-field,.gjs-sm-field.gjs-sm-integer,.gjs-sm-integer.gjs-clm-field,.gjs-sm-field.gjs-sm-list,.gjs-sm-list.gjs-clm-field,.gjs-sm-field.gjs-sm-select,.gjs-clm-select,.gjs-sm-select.gjs-clm-field{background-color:rgba(0,0,0,.2);border:1px solid rgba(0,0,0,.1);-webkit-box-shadow:1px 1px 0 rgba(255,255,255,.1);box-shadow:1px 1px 0 rgba(255,255,255,.1);color:rgba(255,255,255,.7);border-radius:2px;-webkit-box-sizing:border-box;box-sizing:border-box;padding:0 5px}.gjs-sm-field.gjs-sm-composite,.gjs-sm-composite.gjs-clm-select,.gjs-sm-composite.gjs-clm-field{border-radius:2px}.gjs-sm-field.gjs-sm-select,.gjs-clm-select,.gjs-sm-select.gjs-clm-field{padding:0}.gjs-sm-field.gjs-sm-select select,.gjs-clm-select select,.gjs-sm-select.gjs-clm-field select{height:20px}.gjs-sm-field.gjs-sm-select option,.gjs-clm-select option,.gjs-sm-select.gjs-clm-field option{padding:3px 0}.gjs-sm-field.gjs-sm-composite,.gjs-sm-composite.gjs-clm-select,.gjs-sm-composite.gjs-clm-field{background-color:rgba(0,0,0,.1);border:1px solid rgba(0,0,0,.25)}.gjs-sm-field.gjs-sm-list,.gjs-sm-list.gjs-clm-select,.gjs-sm-list.gjs-clm-field{width:auto;padding:0;overflow:hidden;float:left}.gjs-sm-field.gjs-sm-list input,.gjs-sm-list.gjs-clm-select input,.gjs-sm-list.gjs-clm-field input{display:none}.gjs-sm-field.gjs-sm-list label,.gjs-sm-list.gjs-clm-select label,.gjs-sm-list.gjs-clm-field label{cursor:pointer;padding:5px;display:block}.gjs-sm-field.gjs-sm-list .gjs-sm-radio:checked+label,.gjs-sm-list.gjs-clm-select .gjs-sm-radio:checked+label,.gjs-sm-list.gjs-clm-field .gjs-sm-radio:checked+label{background-color:rgba(255,255,255,.2)}.gjs-sm-field.gjs-sm-list .gjs-sm-icon,.gjs-sm-list.gjs-clm-select .gjs-sm-icon,.gjs-sm-list.gjs-clm-field .gjs-sm-icon{background-repeat:no-repeat;background-position:center;text-shadow:none;line-height:normal}.gjs-sm-field.gjs-sm-integer select,.gjs-sm-integer.gjs-clm-select select,.gjs-sm-integer.gjs-clm-field select{width:auto;padding:0}.gjs-sm-list .gjs-sm-el{float:left;border-left:1px solid rgba(0,0,0,.2)}.gjs-sm-list .gjs-sm-el:first-child{border:none}.gjs-sm-list .gjs-sm-el:hover{background:rgba(0,0,0,.2)}.gjs-sm-slider .gjs-field-integer{-webkit-box-flex:1;-ms-flex:1 1 65px;flex:1 1 65px}.gjs-sm-property{-webkit-box-sizing:border-box;box-sizing:border-box;float:left;width:50%;margin-bottom:5px;padding:0 5px}.gjs-sm-property--full,.gjs-sm-property.gjs-sm-composite,.gjs-sm-property.gjs-sm-file,.gjs-sm-property.gjs-sm-list,.gjs-sm-property.gjs-sm-stack,.gjs-sm-property.gjs-sm-slider,.gjs-sm-property.gjs-sm-color{width:100%}.gjs-sm-property .gjs-sm-btn{background-color:rgba(33,33,33,.2);border-radius:2px;-webkit-box-shadow:1px 1px 0 rgba(5,5,5,.2),1px 1px 0 rgba(43,43,43,.2) inset;box-shadow:1px 1px 0 rgba(5,5,5,.2),1px 1px 0 rgba(43,43,43,.2) inset;padding:5px;position:relative;text-align:center;height:auto;width:100%;cursor:pointer;color:#ddd;-webkit-box-sizing:border-box;box-sizing:border-box;text-shadow:-1px -1px 0 rgba(0,0,0,.2);border:none;opacity:.85;filter:alpha(opacity=85)}.gjs-sm-property .gjs-sm-btn-c{-webkit-box-sizing:border-box;box-sizing:border-box;float:left;width:100%}.gjs-sm-property__text-shadow .gjs-sm-layer-preview-cnt::after{color:#000;content:\"T\";font-weight:900;line-height:17px;padding:0 4px}.gjs-sm-preview-file{background-color:rgba(255,255,255,.05);border-radius:2px;margin-top:5px;position:relative;overflow:hidden;border:1px solid rgba(252,252,252,.05);padding:3px 20px}.gjs-sm-preview-file-cnt{background-size:auto 100%;background-repeat:no-repeat;background-position:center center;height:50px}.gjs-sm-preview-file-close{top:-5px;width:14px;height:14px}.gjs-sm-layers{margin-top:5px;padding:1px 3px;min-height:30px}.gjs-sm-layer{background-color:rgba(255,255,255,.055);border-radius:2px;margin:2px 0;padding:7px;position:relative}.gjs-sm-layer.gjs-sm-active{background-color:rgba(255,255,255,.12)}.gjs-sm-layer .gjs-sm-label-wrp{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.gjs-sm-layer #gjs-sm-move{height:14px;width:14px;min-width:14px;cursor:-webkit-grab;cursor:grab}.gjs-sm-layer #gjs-sm-label{-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin:0 5px}.gjs-sm-layer-preview{height:15px;width:15px;min-width:15px;margin-right:5px;border-radius:2px}.gjs-sm-layer-preview-cnt{border-radius:2px;background-color:#fff;height:100%;width:100%;background-size:cover !important}.gjs-sm-layer #gjs-sm-close-layer{display:block;cursor:pointer;height:14px;width:14px;min-width:14px;opacity:.5;filter:alpha(opacity=50)}.gjs-sm-layer #gjs-sm-close-layer:hover{opacity:.8;filter:alpha(opacity=80)}.gjs-sm-stack .gjs-sm-properties{padding:5px 0 0}.gjs-sm-stack #gjs-sm-add{background:none;border:none;cursor:pointer;outline:none;position:absolute;right:0;top:-17px;opacity:.75;padding:0;width:18px;height:18px}.gjs-sm-stack #gjs-sm-add:hover{opacity:1;filter:alpha(opacity=100)}.gjs-sm-colorp-c{height:100%;width:20px;position:absolute;right:0;top:0;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:2px;padding:2px}.gjs-sm-colorp-c .gjs-checker-bg,.gjs-sm-colorp-c .gjs-field-colorp-c{height:100%;width:100%;border-radius:1px}.gjs-sm-color-picker{background-color:#ddd;cursor:pointer;height:16px;width:100%;margin-top:-16px;-webkit-box-shadow:0 0 1px rgba(0,0,0,.2);box-shadow:0 0 1px rgba(0,0,0,.2);border-radius:1px}.gjs-sm-btn-upload #gjs-sm-upload{left:0;top:0;position:absolute;width:100%;opacity:0;cursor:pointer}.gjs-sm-btn-upload #gjs-sm-label{padding:2px 0}.gjs-sm-layer>#gjs-sm-move{opacity:.7;filter:alpha(opacity=70);cursor:move;font-size:12px;float:left;margin:0 5px 0 0}.gjs-sm-layer>#gjs-sm-move:hover{opacity:.9;filter:alpha(opacity=90)}.gjs-blocks-c{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}.gjs-block-categories{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.gjs-block-category{width:100%}.gjs-block-category .gjs-caret-icon{margin-right:5px}.gjs-block{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none;width:45%;min-width:45px;padding:1em;-webkit-box-sizing:border-box;box-sizing:border-box;min-height:90px;cursor:all-scroll;font-size:11px;font-weight:lighter;text-align:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;border:1px solid rgba(0,0,0,.2);border-radius:3px;margin:10px 2.5% 5px;-webkit-box-shadow:0 1px 0 0 rgba(0,0,0,.15);box-shadow:0 1px 0 0 rgba(0,0,0,.15);-webkit-transition:all .2s ease 0s;transition:all .2s ease 0s;-webkit-transition-property:color,-webkit-box-shadow;transition-property:color,-webkit-box-shadow;transition-property:box-shadow,color;transition-property:box-shadow,color,-webkit-box-shadow}.gjs-block:hover{-webkit-box-shadow:0 3px 4px 0 rgba(0,0,0,.15);box-shadow:0 3px 4px 0 rgba(0,0,0,.15)}.gjs-block svg{fill:currentColor}.gjs-block__media{margin-bottom:10px;pointer-events:none}.gjs-block-svg{width:54px;fill:currentColor}.gjs-block-svg-path{fill:currentColor}.gjs-block.fa{font-size:2em;line-height:2em;padding:11px}.gjs-block-label{line-height:normal;font-size:.65rem;font-weight:normal;font-family:Helvetica,sans-serif;overflow:hidden;text-overflow:ellipsis;pointer-events:none}.gjs-block.gjs-bdrag{width:auto;padding:0}.gjs-selected-parent{border:1px solid #ffca6f}.gjs-opac50{opacity:.5;filter:alpha(opacity=50)}.gjs-layer{font-weight:lighter;text-align:left;position:relative;background-color:rgba(0,0,0,.1);font-size:.75rem;display:grid}.gjs-layer-hidden{opacity:.55;filter:alpha(opacity=55)}.gjs-layer-count{position:absolute;right:27px;top:9px}.gjs-layer-vis{left:0;top:0;padding:7px 5px 7px 10px;position:absolute;-webkit-box-sizing:content-box;box-sizing:content-box;cursor:pointer;width:13px;z-index:1}.gjs-layer-vis-off{display:none}.gjs-layer-vis.gjs-layer-off .gjs-layer-vis-on{display:none}.gjs-layer-vis.gjs-layer-off .gjs-layer-vis-off{display:block}.gjs-layer-caret{width:15px;padding:2px;cursor:pointer;position:absolute;-webkit-box-sizing:content-box;box-sizing:content-box;left:-15px;top:0;-webkit-transform:rotate(90deg);transform:rotate(90deg);opacity:.7;filter:alpha(opacity=70)}.gjs-layer-caret:hover{opacity:1;filter:alpha(opacity=100)}.gjs-layer-caret.gjs-layer-open{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.gjs-layer-title{padding:3px 10px 5px 30px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.gjs-layer-title-inn{-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;width:100%}.gjs-layer__icon{display:block;width:100%;max-width:15px;max-height:15px;padding-left:5px}.gjs-layer__icon svg{fill:currentColor}.gjs-layer-name{padding:5px 0;display:inline-block;-webkit-box-sizing:content-box;box-sizing:content-box;overflow:hidden;white-space:nowrap;margin:0 30px 0 5px;max-width:170px}.gjs-layer-name--no-edit{text-overflow:ellipsis}.gjs-layer>.gjs-layer-children{display:none}.gjs-layer.open>.gjs-layer-children{display:block}.gjs-layer-no-chld>.gjs-layer-title-inn>.gjs-layer-caret{display:none}.gjs-layer-move{padding:9px 7px;position:absolute;width:13px;-webkit-box-sizing:content-box;box-sizing:content-box;cursor:move;right:0;top:0}.gjs-layer.gjs-hovered .gjs-layer-title{background-color:rgba(255,255,255,.015)}.gjs-layer.gjs-selected .gjs-layer-title{background-color:rgba(255,255,255,.1)}.gjs-layers{position:relative;height:100%}.gjs-layers #gjs-placeholder{width:100%;position:absolute}.gjs-layers #gjs-placeholder #gjs-plh-int{height:100%;padding:1px}.gjs-layers #gjs-placeholder #gjs-plh-int.gjs-insert{background-color:#62c462}#gjs-clm-add-tag,.gjs-clm-tags-btn{background-color:rgba(255,255,255,.15);border-radius:2px;padding:3px;margin-right:3px;border:1px solid rgba(0,0,0,.15);width:24px;height:24px;-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer}.gjs-clm-tags-btn svg{fill:currentColor;display:block}.gjs-clm-header{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin:7px 0}.gjs-clm-header-status{-ms-flex-negative:1;flex-shrink:1;margin-left:auto}.gjs-clm-tag{display:-webkit-box;display:-ms-flexbox;display:flex;overflow:hidden;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border-radius:3px;margin:0 3px 3px 0;padding:5px;cursor:default}.gjs-clm-tag-status,.gjs-clm-tag-close{width:12px;height:12px;-ms-flex-negative:1;flex-shrink:1}.gjs-clm-tag-status svg,.gjs-clm-tag-close svg{vertical-align:middle;fill:currentColor}.gjs-clm-sels-info{margin:7px 0;text-align:left}.gjs-clm-sel-id{font-size:.9em;opacity:.5;filter:alpha(opacity=50)}.gjs-clm-label-sel{float:left;padding-right:5px}.gjs-clm-tags{font-size:.75rem;padding:10px 5px}.gjs-clm-tags #gjs-clm-sel{padding:7px 0;float:left}.gjs-clm-tags #gjs-clm-sel{font-style:italic;margin-left:5px}.gjs-clm-tags #gjs-clm-tags-field{clear:both;padding:5px;margin-bottom:5px;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.gjs-clm-tags #gjs-clm-tags-c{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;vertical-align:top;overflow:hidden}.gjs-clm-tags #gjs-clm-new{color:#ddd;padding:5px 6px;display:none}.gjs-clm-tags #gjs-clm-close{opacity:.85;filter:alpha(opacity=85);font-size:20px;line-height:0;cursor:pointer;color:rgba(255,255,255,.9)}.gjs-clm-tags #gjs-clm-close:hover{opacity:1;filter:alpha(opacity=100)}.gjs-clm-tags #gjs-clm-checkbox{color:rgba(255,255,255,.9);vertical-align:middle;cursor:pointer;font-size:9px}.gjs-clm-tags #gjs-clm-tag-label{-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;text-overflow:ellipsis;overflow:hidden;padding:0 3px;cursor:text}.gjs-mdl-container{font-family:Helvetica,sans-serif;overflow-y:auto;position:fixed;background-color:rgba(0,0,0,.5);display:-webkit-box;display:-ms-flexbox;display:flex;top:0;left:0;right:0;bottom:0;z-index:100}.gjs-mdl-dialog{text-shadow:-1px -1px 0 rgba(0,0,0,.05);-webkit-animation:gjs-slide-down .215s;animation:gjs-slide-down .215s;margin:auto;max-width:850px;width:90%;border-radius:3px;font-weight:lighter;position:relative;z-index:2}.gjs-mdl-title{font-size:1rem}.gjs-mdl-btn-close{position:absolute;right:15px;top:5px}.gjs-mdl-active .gjs-mdl-dialog{-webkit-animation:gjs-mdl-slide-down .216s;animation:gjs-mdl-slide-down .216s}.gjs-mdl-header,.gjs-mdl-content{padding:10px 15px;clear:both}.gjs-mdl-header{position:relative;border-bottom:1px solid rgba(0,0,0,.2);padding:15px 15px 7px}.gjs-export-dl::after{content:\"\";clear:both;display:block;margin-bottom:10px}.gjs-dropzone{display:none;opacity:0;position:absolute;top:0;left:0;z-index:11;width:100%;height:100%;-webkit-transition:opacity .25s;transition:opacity .25s;pointer-events:none}.gjs-dropzone-active .gjs-dropzone{display:block;opacity:1}.gjs-am-assets{height:290px;overflow:auto;clear:both;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start;-ms-flex-line-pack:start;align-content:flex-start}.gjs-am-assets-header{padding:5px}.gjs-am-add-asset .gjs-am-add-field{width:70%;float:left}.gjs-am-add-asset button{width:25%;float:right}.gjs-am-preview-cont{position:relative;height:70px;width:30%;background-color:#444;border-radius:2px;float:left;overflow:hidden}.gjs-am-preview{position:absolute;background-position:center center;background-size:cover;background-repeat:no-repeat;height:100%;width:100%;z-index:1}.gjs-am-preview-bg{opacity:.5;filter:alpha(opacity=50);position:absolute;height:100%;width:100%;z-index:0}.gjs-am-dimensions{opacity:.5;filter:alpha(opacity=50);font-size:10px}.gjs-am-meta{width:70%;float:left;font-size:12px;padding:5px 0 0 5px;-webkit-box-sizing:border-box;box-sizing:border-box}.gjs-am-meta>div{margin-bottom:5px}.gjs-am-close{cursor:pointer;position:absolute;right:5px;top:0;display:none}.gjs-am-asset{border-bottom:1px solid rgba(0,0,0,.2);padding:5px;cursor:pointer;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%}.gjs-am-asset:hover .gjs-am-close{display:block}.gjs-am-highlight{background-color:rgba(255,255,255,.1)}.gjs-am-assets-cont{background-color:rgba(0,0,0,.1);border-radius:3px;-webkit-box-sizing:border-box;box-sizing:border-box;padding:10px;width:45%;float:right;height:325px;overflow:hidden}.gjs-am-file-uploader{width:55%;float:left}.gjs-am-file-uploader>form{background-color:rgba(0,0,0,.1);border:2px dashed;border-radius:3px;position:relative;text-align:center;margin-bottom:15px}.gjs-am-file-uploader>form.gjs-am-hover{border:2px solid #62c462;color:#75cb75}.gjs-am-file-uploader>form.gjs-am-disabled{border-color:red}.gjs-am-file-uploader>form #gjs-am-uploadFile{opacity:0;filter:alpha(opacity=0);padding:150px 10px;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box}.gjs-am-file-uploader #gjs-am-title{position:absolute;padding:150px 10px;width:100%}.gjs-cm-editor-c{float:left;-webkit-box-sizing:border-box;box-sizing:border-box;width:50%}.gjs-cm-editor-c .CodeMirror{height:450px}.gjs-cm-editor{font-size:12px}.gjs-cm-editor#gjs-cm-htmlmixed{padding-right:10px;border-right:1px solid rgba(0,0,0,.2)}.gjs-cm-editor#gjs-cm-htmlmixed #gjs-cm-title{color:#a97d44}.gjs-cm-editor#gjs-cm-css{padding-left:10px}.gjs-cm-editor#gjs-cm-css #gjs-cm-title{color:#ddca7e}.gjs-cm-editor #gjs-cm-title{background-color:rgba(0,0,0,.2);font-size:12px;padding:5px 10px 3px;text-align:right}.gjs-rte-toolbar{border:1px solid rgba(0,0,0,.2);position:absolute;border-radius:3px;z-index:10}.gjs-rte-actionbar{display:-webkit-box;display:-ms-flexbox;display:flex}.gjs-rte-action{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding:5px;width:25px;border-right:1px solid rgba(0,0,0,.2);text-align:center;cursor:pointer;outline:none}.gjs-rte-action:last-child{border-right:none}.gjs-rte-action:hover{background-color:rgba(255,255,255,.1)}.gjs-rte-active{background-color:rgba(255,255,255,.1)}.gjs-rte-disabled{color:rgba(255,255,255,.1);cursor:not-allowed}.gjs-rte-disabled:hover{background-color:unset}.gjs-editor-cont .sp-hue,.gjs-editor-cont .sp-slider{cursor:row-resize}.gjs-editor-cont .sp-color,.gjs-editor-cont .sp-dragger{cursor:crosshair}.gjs-editor-cont .sp-alpha-inner,.gjs-editor-cont .sp-alpha-handle{cursor:col-resize}.gjs-editor-cont .sp-hue{left:90%}.gjs-editor-cont .sp-color{right:15%}.gjs-editor-cont .sp-container{border:1px solid rgba(0,0,0,.2);-webkit-box-shadow:0 0 7px rgba(0,0,0,.2);box-shadow:0 0 7px rgba(0,0,0,.2);border-radius:3px}.gjs-editor-cont .sp-picker-container{border:none}.gjs-editor-cont .colpick_dark .colpick_color{outline:1px solid rgba(0,0,0,.2)}.gjs-editor-cont .sp-cancel,.gjs-editor-cont .sp-cancel:hover{bottom:-8px;color:#777 !important;font-size:25px;left:0;position:absolute;text-decoration:none}.gjs-editor-cont .sp-alpha-handle{background-color:#ccc;border:1px solid #555;width:4px}.gjs-editor-cont .sp-color,.gjs-editor-cont .sp-hue{border:1px solid #333}.gjs-editor-cont .sp-slider{background-color:#ccc;border:1px solid #555;height:3px;left:-4px;width:22px}.gjs-editor-cont .sp-dragger{background:rgba(0,0,0,0);-webkit-box-shadow:0 0 0 1px #111;box-shadow:0 0 0 1px #111}.gjs-editor-cont .sp-button-container{float:none;width:100%;position:relative;text-align:right}.gjs-editor-cont .sp-container button,.gjs-editor-cont .sp-container button:hover,.gjs-editor-cont .sp-container button:active{background:rgba(0,0,0,.2);border-color:rgba(0,0,0,.2);color:#ddd;text-shadow:none;-webkit-box-shadow:none;box-shadow:none;padding:3px 5px}.gjs-editor-cont .sp-palette-container{border:none;float:none;margin:0;padding:5px 10px 0}.gjs-editor-cont .sp-palette .sp-thumb-el,.gjs-editor-cont .sp-palette .sp-thumb-el:hover{border:1px solid rgba(0,0,0,.9)}.gjs-editor-cont .sp-palette .sp-thumb-el:hover,.gjs-editor-cont .sp-palette .sp-thumb-el.sp-thumb-active{border-color:rgba(0,0,0,.9)}.gjs-hidden{display:none}@-webkit-keyframes gjs-slide-down{0%{-webkit-transform:translate(0, -3rem);transform:translate(0, -3rem);opacity:0}100%{-webkit-transform:translate(0, 0);transform:translate(0, 0);opacity:1}}@keyframes gjs-slide-down{0%{-webkit-transform:translate(0, -3rem);transform:translate(0, -3rem);opacity:0}100%{-webkit-transform:translate(0, 0);transform:translate(0, 0);opacity:1}}@-webkit-keyframes gjs-slide-up{0%{-webkit-transform:translate(0, 0);transform:translate(0, 0);opacity:1}100%{-webkit-transform:translate(0, -3rem);transform:translate(0, -3rem);opacity:0}}@keyframes gjs-slide-up{0%{-webkit-transform:translate(0, 0);transform:translate(0, 0);opacity:1}100%{-webkit-transform:translate(0, -3rem);transform:translate(0, -3rem);opacity:0}}.cm-s-hopscotch span.cm-error{color:#fff}\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ (function(module) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/grapesjs/dist/grapes.min.js":
/*!**************************************************!*\
  !*** ./node_modules/grapesjs/dist/grapes.min.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
/*! grapesjs - 0.20.3 */
//# sourceMappingURL=grapes.min.js.map

/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports) {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
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
/***/ (function(module) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/grapesjs/dist/css/grapes.min.css":
/*!*******************************************************!*\
  !*** ./node_modules/grapesjs/dist/css/grapes.min.css ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_cjs_js_ruleSet_1_rules_10_oneOf_1_use_1_postcss_loader_dist_cjs_js_ruleSet_1_rules_10_oneOf_1_use_2_grapes_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../css-loader/dist/cjs.js??ruleSet[1].rules[10].oneOf[1].use[1]!../../../postcss-loader/dist/cjs.js??ruleSet[1].rules[10].oneOf[1].use[2]!./grapes.min.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[10].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[10].oneOf[1].use[2]!./node_modules/grapesjs/dist/css/grapes.min.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_ruleSet_1_rules_10_oneOf_1_use_1_postcss_loader_dist_cjs_js_ruleSet_1_rules_10_oneOf_1_use_2_grapes_min_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ __webpack_exports__["default"] = (_css_loader_dist_cjs_js_ruleSet_1_rules_10_oneOf_1_use_1_postcss_loader_dist_cjs_js_ruleSet_1_rules_10_oneOf_1_use_2_grapes_min_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!********************************************!*\
  !*** ./resources/js/components/builder.js ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var grapesjs_dist_css_grapes_min_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! grapesjs/dist/css/grapes.min.css */ "./node_modules/grapesjs/dist/css/grapes.min.css");
/* harmony import */ var grapesjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! grapesjs */ "./node_modules/grapesjs/dist/grapes.min.js");
/* harmony import */ var grapesjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(grapesjs__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Builder = /*#__PURE__*/function () {
  function Builder() {
    _classCallCheck(this, Builder);

    var lp = './img/';
    var plp = 'https://via.placeholder.com/350x250/';
    this.images = [lp + 'team1.jpg', lp + 'team2.jpg', lp + 'team3.jpg', plp + '78c5d6/fff/image1.jpg', plp + '459ba8/fff/image2.jpg', plp + '79c267/fff/image3.jpg', plp + 'c5d647/fff/image4.jpg', plp + 'f28c33/fff/image5.jpg', plp + 'e868a2/fff/image6.jpg', plp + 'cc4360/fff/image7.jpg', lp + 'work-desk.jpg', lp + 'phone-app.png', lp + 'bg-gr-v.png'];
    this.configure();
  }

  _createClass(Builder, [{
    key: "configure",
    value: function configure() {
      this.editor = grapesjs__WEBPACK_IMPORTED_MODULE_1___default().init(this.getConfiguration());
      this.editor.I18n.addMessages({
        en: {
          styleManager: {
            properties: {
              'background-repeat': 'Repeat',
              'background-position': 'Position',
              'background-attachment': 'Attachment',
              'background-size': 'Size'
            }
          }
        }
      });
    }
  }, {
    key: "getConfiguration",
    value: function getConfiguration() {
      return {
        height: $(window).height() - 50 + 'px',
        container: '#gjs',
        fromElement: true,
        showOffsets: true,
        storageManager: false,
        assetManager: {
          embedAsBase64: true,
          assets: this.images
        },
        selectorManager: {
          componentFirst: true
        },
        styleManager: {
          sectors: [{
            name: 'General',
            properties: [{
              extend: 'float',
              type: 'radio',
              "default": 'none',
              options: [{
                value: 'none',
                className: 'fa fa-times'
              }, {
                value: 'left',
                className: 'fa fa-align-left'
              }, {
                value: 'right',
                className: 'fa fa-align-right'
              }]
            }, 'display', {
              extend: 'position',
              type: 'select'
            }, 'top', 'right', 'left', 'bottom']
          }, {
            name: 'Dimension',
            open: false,
            properties: ['width', {
              id: 'flex-width',
              type: 'integer',
              name: 'Width',
              units: ['px', '%'],
              property: 'flex-basis',
              toRequire: 1
            }, 'height', 'max-width', 'min-height', 'margin', 'padding']
          }, {
            name: 'Typography',
            open: false,
            properties: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', {
              extend: 'text-align',
              options: [{
                id: 'left',
                label: 'Left',
                className: 'fa fa-align-left'
              }, {
                id: 'center',
                label: 'Center',
                className: 'fa fa-align-center'
              }, {
                id: 'right',
                label: 'Right',
                className: 'fa fa-align-right'
              }, {
                id: 'justify',
                label: 'Justify',
                className: 'fa fa-align-justify'
              }]
            }, {
              property: 'text-decoration',
              type: 'radio',
              "default": 'none',
              options: [{
                id: 'none',
                label: 'None',
                className: 'fa fa-times'
              }, {
                id: 'underline',
                label: 'underline',
                className: 'fa fa-underline'
              }, {
                id: 'line-through',
                label: 'Line-through',
                className: 'fa fa-strikethrough'
              }]
            }, 'text-shadow']
          }, {
            name: 'Decorations',
            open: false,
            properties: ['opacity', 'border-radius', 'border', 'box-shadow', 'background' // { id: 'background-bg', property: 'background', type: 'bg' }
            ]
          }, {
            name: 'Extra',
            open: false,
            buildProps: ['transition', 'perspective', 'transform']
          }, {
            name: 'Flex',
            open: false,
            properties: [{
              name: 'Flex Container',
              property: 'display',
              type: 'select',
              defaults: 'block',
              list: [{
                value: 'block',
                name: 'Disable'
              }, {
                value: 'flex',
                name: 'Enable'
              }]
            }, {
              name: 'Flex Parent',
              property: 'label-parent-flex',
              type: 'integer'
            }, {
              name: 'Direction',
              property: 'flex-direction',
              type: 'radio',
              defaults: 'row',
              list: [{
                value: 'row',
                name: 'Row',
                className: 'icons-flex icon-dir-row',
                title: 'Row'
              }, {
                value: 'row-reverse',
                name: 'Row reverse',
                className: 'icons-flex icon-dir-row-rev',
                title: 'Row reverse'
              }, {
                value: 'column',
                name: 'Column',
                title: 'Column',
                className: 'icons-flex icon-dir-col'
              }, {
                value: 'column-reverse',
                name: 'Column reverse',
                title: 'Column reverse',
                className: 'icons-flex icon-dir-col-rev'
              }]
            }, {
              name: 'Justify',
              property: 'justify-content',
              type: 'radio',
              defaults: 'flex-start',
              list: [{
                value: 'flex-start',
                className: 'icons-flex icon-just-start',
                title: 'Start'
              }, {
                value: 'flex-end',
                title: 'End',
                className: 'icons-flex icon-just-end'
              }, {
                value: 'space-between',
                title: 'Space between',
                className: 'icons-flex icon-just-sp-bet'
              }, {
                value: 'space-around',
                title: 'Space around',
                className: 'icons-flex icon-just-sp-ar'
              }, {
                value: 'center',
                title: 'Center',
                className: 'icons-flex icon-just-sp-cent'
              }]
            }, {
              name: 'Align',
              property: 'align-items',
              type: 'radio',
              defaults: 'center',
              list: [{
                value: 'flex-start',
                title: 'Start',
                className: 'icons-flex icon-al-start'
              }, {
                value: 'flex-end',
                title: 'End',
                className: 'icons-flex icon-al-end'
              }, {
                value: 'stretch',
                title: 'Stretch',
                className: 'icons-flex icon-al-str'
              }, {
                value: 'center',
                title: 'Center',
                className: 'icons-flex icon-al-center'
              }]
            }, {
              name: 'Flex Children',
              property: 'label-parent-flex',
              type: 'integer'
            }, {
              name: 'Order',
              property: 'order',
              type: 'integer',
              defaults: 0,
              min: 0
            }, {
              name: 'Flex',
              property: 'flex',
              type: 'composite',
              properties: [{
                name: 'Grow',
                property: 'flex-grow',
                type: 'integer',
                defaults: 0,
                min: 0
              }, {
                name: 'Shrink',
                property: 'flex-shrink',
                type: 'integer',
                defaults: 0,
                min: 0
              }, {
                name: 'Basis',
                property: 'flex-basis',
                type: 'integer',
                units: ['px', '%', ''],
                unit: '',
                defaults: 'auto'
              }]
            }, {
              name: 'Align',
              property: 'align-self',
              type: 'radio',
              defaults: 'auto',
              list: [{
                value: 'auto',
                name: 'Auto'
              }, {
                value: 'flex-start',
                title: 'Start',
                className: 'icons-flex icon-al-start'
              }, {
                value: 'flex-end',
                title: 'End',
                className: 'icons-flex icon-al-end'
              }, {
                value: 'stretch',
                title: 'Stretch',
                className: 'icons-flex icon-al-str'
              }, {
                value: 'center',
                title: 'Center',
                className: 'icons-flex icon-al-center'
              }]
            }]
          }]
        },
        plugins: ['gjs-blocks-basic', 'grapesjs-plugin-forms', 'grapesjs-component-countdown', 'grapesjs-plugin-export', 'grapesjs-tabs', 'grapesjs-custom-code', 'grapesjs-touch', 'grapesjs-parser-postcss', 'grapesjs-tooltip', 'grapesjs-tui-image-editor', 'grapesjs-typed', 'grapesjs-style-bg', 'grapesjs-preset-webpage'],
        pluginsOpts: {
          'gjs-blocks-basic': {
            flexGrid: true
          },
          'grapesjs-tui-image-editor': {
            script: [// 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.6.7/fabric.min.js',
            'https://uicdn.toast.com/tui.code-snippet/v1.5.2/tui-code-snippet.min.js', 'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.js', 'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.js'],
            style: ['https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.css', 'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.css']
          },
          'grapesjs-tabs': {
            tabsBlock: {
              category: 'Extra'
            }
          },
          'grapesjs-typed': {
            block: {
              category: 'Extra',
              content: {
                type: 'typed',
                'type-speed': 40,
                strings: ['Text row one', 'Text row two', 'Text row three']
              }
            }
          },
          'grapesjs-preset-webpage': {
            modalImportTitle: 'Import Template',
            modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
            modalImportContent: function modalImportContent(editor) {
              return editor.getHtml() + '<style>' + editor.getCss() + '</style>';
            }
          }
        }
      };
    }
  }]);

  return Builder;
}();

window.builder = new Builder();
}();
/******/ })()
;