export function getArrayLike(a: Array<any> | ArrayBuffer | ArrayBufferView | DataView | string): ArrayLike<any> {
  if (typeof a === 'string') return a;
  if (ArrayBuffer.isView(a)) {
    if (a instanceof Uint8Array) return a;
    return new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
  }
  if (Array.isArray(a)) {
    return a;
  }
  return a.byteLength ? new Uint8Array(a) : [a];
}
