export function randomBytes(size: number): Uint8Array {
  let rnd = new Uint8Array(size)
  window.crypto.getRandomValues(rnd)
  return rnd
}