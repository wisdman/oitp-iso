
export const RU = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ"
export const EN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
export const NUMBERS = "1234567890"

export const LRU = RU.toLowerCase()
export const LEN = EN.toLowerCase()



const notRuneRegExp = new RegExp(`[^${LRU}${LEN}${NUMBERS}]+`,"igm")
console.dir(notRuneRegExp)
export function getRuneString(v: string): string {
  return v.replace(notRuneRegExp, "")
}

export function compareRuneString(A: string, B: string): boolean {
  return getRuneString(A).toLowerCase() === getRuneString(B).toLowerCase()
}