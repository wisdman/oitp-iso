import { randomBytes } from "./randomBytes"
import { bytesToUuid } from "./bytesToUuid"

export default () => {
  let rnds = randomBytes(16)

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40
  rnds[8] = (rnds[8] & 0x3f) | 0x80

  return bytesToUuid(rnds)
}