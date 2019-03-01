/*
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const BTH = Array.from(Array(256), (_, i) => i.toString(16).padStart(2,"0"))
export function bytesToUuid(buf: Uint8Array): string {
  return BTH[ buf[ 0] ] + BTH[ buf[ 1] ] +
         BTH[ buf[ 2] ] + BTH[ buf[ 3] ] + "-" +
         BTH[ buf[ 4] ] + BTH[ buf[ 5] ] + "-" +
         BTH[ buf[ 6] ] + BTH[ buf[ 7] ] + "-" +
         BTH[ buf[ 8] ] + BTH[ buf[ 9] ] + "-" +
         BTH[ buf[10] ] + BTH[ buf[11] ] +
         BTH[ buf[12] ] + BTH[ buf[13] ] +
         BTH[ buf[14] ] + BTH[ buf[15] ]
}