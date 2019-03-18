import { randomBytes } from "./randomBytes"
import { bytesToUuid } from "./bytesToUuid"

// random #'s we need to init node and clockseq
const SEED_BYTES = randomBytes(16)

// create and 48-bit node id, (47 random bits + multicast bit = 1)
const NODE_ID = [
  SEED_BYTES[0] | 0x01,
  SEED_BYTES[1],
  SEED_BYTES[2],
  SEED_BYTES[3],
  SEED_BYTES[4],
  SEED_BYTES[5],
]

// randomize (14 bit) clockseq
let _clockseq = (SEED_BYTES[6] << 8 | SEED_BYTES[7]) & 0x3fff

// Previous uuid creation time
let lastMSecs = 0
let lastNSecs = 0

export default (): string => {
  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  let msecs = new Date().getTime()

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  let nsecs = lastNSecs + 1

  // Time since last uuid creation (in msecs)
  let dt = (msecs - lastMSecs) + (nsecs - lastNSecs) / 10000

  // Per 4.2.1.2, Bump clockseq on clock regression
  let clockseq = dt < 0 ? _clockseq + 1 & 0x3fff : _clockseq

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if (dt < 0 || msecs > lastMSecs) {
    nsecs = 0
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000)
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec")

  lastMSecs = msecs
  lastNSecs = nsecs
  _clockseq = clockseq

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000

  let i = 0
  let b = new Uint8Array(16)

  // `time_low`
  let tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000
  b[i++] = tl >>> 24 & 0xff
  b[i++] = tl >>> 16 & 0xff
  b[i++] = tl >>> 8 & 0xff
  b[i++] = tl & 0xff

  // `time_mid`
  let tmh = (msecs / 0x100000000 * 10000) & 0xfffffff
  b[i++] = tmh >>> 8 & 0xff
  b[i++] = tmh & 0xff

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10 // include version
  b[i++] = tmh >>> 16 & 0xff

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80

  // `clock_seq_low`
  b[i++] = clockseq & 0xff

  // `node`
  for (let n = 0; n < 6; ++n)
    b[i + n] = NODE_ID[n]

  return bytesToUuid(b)
}