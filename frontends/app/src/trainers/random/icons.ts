
import {
  IImage
} from "../"

import {
  NewValueArray
} from "../common/functions"

const ICONS_FLAT_COUNT = 1140
const ICONS_ROUND_COUNT = 0

export const ICONS = {
  "flat": NewValueArray(ICONS_FLAT_COUNT, id => ({ id } as IImage)),
  "round": NewValueArray(ICONS_ROUND_COUNT, id => ({ id } as IImage)),
}

export function fetchIcons(arr: Array<IImage>) {
  return Promise.all(
    arr.map(image =>
            fetch(`/flat-min/${image.id}.svg`)
            .then(response => response.text())
            .then(text => {
              image.data =  text
              return image
            })
          )
  )
}
