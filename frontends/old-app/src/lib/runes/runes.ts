
export const RU = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ"
export const RU_LOW = RU.toLowerCase()

export const EN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
export const EN_LOW = EN.toLowerCase()

export const NUMBERS = "1234567890"

export const RUNES = RU + EN
export const RUNES_LOW = RU_LOW + EN_LOW

export const RUNES_RX = RegExp(`[${RUNES + RUNES_LOW + NUMBERS}]+`,"g")
export const NOT_RUNES_RX = RegExp(`[^${RUNES + RUNES_LOW + NUMBERS}]+`,"g")

export function getRuneString(v: string): string {
  return v.replace(NOT_RUNES_RX, "")
          .replace("Ё","Е")
          .replace("ё","е")
}

export function compareRuneString(A: string, B: string): boolean {
  return getRuneString(A).toLowerCase() === getRuneString(B).toLowerCase()
}