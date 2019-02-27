
// ======= Random functions ======

export function RandomInt(min: number = 0, max?: number) {
  if (max === undefined) {
    max = min
    min = 0
  }
  return Math.floor(Math.random() * (max - min)) + min
}

export function RandomBoolean() {
  return RandomInt(0, 1) === 1
}



// ======= Array functions ======

export function ShuffleArray<T>(arr: Array<T>, copy: boolean = true): Array<T> {
  return copy ? ShuffleArray(Array.from(arr), false) : arr.sort(() => Math.random() - 0.5)
}

export function NewIntArray(length: number, start: number = 0) {
  return  Array.from(Array(length), (_, i) => start+i)
}

export function NewValueArray<T>(
  length: number,
  value: ((i: number) => T) | Array<T> | T,
): Array<T> {
  if (value instanceof Function) {
    return Array.from(Array(length), (_, i) => value(i))
  }

  if (Array.isArray(value)) {
    const repeat = Math.ceil(length / value.length)
    return Array.from(Array(repeat), () => value).flat().slice(0, length)
  }

  return Array.from(Array(length), () => value)
}
