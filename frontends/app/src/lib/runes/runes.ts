
export const RU = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ"
export const EN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
export const NUMBERS = "1234567890"

export const LRU = RU.toLowerCase()
export const LEN = EN.toLowerCase()

export const RUNES = RU + EN + NUMBERS
export const LRUNES = RUNES.toLowerCase()

const notRuneRegExp = new RegExp(`[^${LRUNES}]+`,"igm")
export function getRuneString(v: string): string {
  return v.replace(notRuneRegExp, "").replace("Ё","Е")
}

export function compareRuneString(A: string, B: string): boolean {
  return getRuneString(A).toLowerCase() === getRuneString(B).toLowerCase()
}