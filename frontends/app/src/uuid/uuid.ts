import v1 from "./v1"
import v4 from "./v4"

const UUIDv1_REGEXP = /^[a-f0-9]{8}-[a-f0-9]{4}-1[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i
const UUIDv4_REGEXP = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i

const UUIDnil_PATTERN = "00000000-0000-0000-0000-000000000000"
const UUIDnil_REGEXP = /^00000000-0000-0000-0000-000000000000$/

export class UUID {

  static getArray(value: any): Array<UUID> {
    return new Array<any>().concat(value)
                           .map( item => {
                             try {
                               const uuid = new UUID(item && item.id || item)
                               return uuid.version === null ? null : uuid
                             } catch(_) {
                               return null
                             }
                           })
                           .filter( item => item !== null ) as Array<UUID>
  }

  readonly version: null | 1 | 4
  readonly uuid: string

  constructor(uuid: UUID | string | null | 1 | 4  = null) {

    if (uuid instanceof UUID) {
      this.version = uuid.version
      this.uuid = uuid.uuid
      return this
    }

    if (typeof uuid === 'string') {
      let value = uuid.toLowerCase()

      if ( UUIDnil_REGEXP.test(value) ) {
        this.version = null
        this.uuid = value
        return this
      }

      if ( UUIDv1_REGEXP.test(value) ) {
        this.version = 1
        this.uuid = value
        return this
      }

      if ( UUIDv4_REGEXP.test(value) ) {
        this.version = 4
        this.uuid = value
        return this
      }

      throw new Error(`UUID "${uuid}" does not match the UUID string`)
    }

    if (uuid === null) {
      this.version = null
      this.uuid = UUIDnil_PATTERN
      return this
    }

    if (uuid === 1) {
      this.version = 1
      this.uuid = v1()
      return this
    }

    if (uuid === 4) {
      this.version = 4
      this.uuid = v4()
      return this
    }

    throw new Error(`Illegal UUID version of "${uuid}"`)
  }

  get value(): string {
    return this.uuid
  }

  valueOf(): any {
    return this.uuid
  }

  toNumber(): number {
    return NaN
  }

  toString(): string {
    return this.uuid
  }

  toJSON(): any {
    return this.uuid
  }

  [Symbol.toPrimitive](hint : "default" | "string" | "number") {
    switch (hint) {
      case "default":
        return this.valueOf()
      case "number":
        return this.toNumber()
      case "string":
        return this.toString()
      default:
        throw new TypeError("Cannot convert UUID value to unknown value")
    }
  }

  [Symbol.toStringTag]() {
    return "UUID"
  }
}