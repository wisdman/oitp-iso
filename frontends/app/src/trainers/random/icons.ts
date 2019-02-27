
import {
  IImage
} from "../common/interfaces"

import {
  NewValueArray
} from "../common/functions"

const ICONS_FLAT_COUNT = 1140
const ICONS_ROUND_COUNT = 0

export const ICONS = {
  "flat": NewValueArray(ICONS_FLAT_COUNT, id => ({ id } as IImage)),
  "round": NewValueArray(ICONS_ROUND_COUNT, id => ({ id } as IImage)),
}
