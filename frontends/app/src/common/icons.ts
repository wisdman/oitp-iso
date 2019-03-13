
import {
  IImage
} from "../trainers"

import {
  NewValueArray
} from "./functions"

const ICONS_FLAT_COUNT = 188
const ICONS_ROUND_COUNT = 0

export const ICONS = {
  "flat": NewValueArray(ICONS_FLAT_COUNT, id => ({ id: id + 1 } as IImage)),
  "round": NewValueArray(ICONS_ROUND_COUNT, id => ({ id: id + 1 } as IImage)),
}

export function fetchIcons(arr: Array<IImage>) {
  return Promise.all(
    arr.map(image =>
            fetch(`/icons/vll/${image.id}.svg`)
            .then(response => response.text())
            .then(text => {
              image.data = "data:image/svg+xml;base64," + window.btoa(text)
              return image
            })
          )
  )
}
