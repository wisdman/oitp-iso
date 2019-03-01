
import styles from "./random-icons.css"
import template from "./random-icons.html"

import {
  AbstractTrainer,
  Trainer,
} from "../common/trainer"

import {
  ShuffleCopy
} from "../common/array"


const ICONS_COUNT = 1140
const ICONS = Array.from(Array(ICONS_COUNT), (_, i) =>++i)

@Trainer({
  selector: "trainer-random-icons",
  template, styles,
})
export class RandomIconsTrainer extends AbstractTrainer {

  private _icons: Array<HTMLImageElement> = []

  private _getRandomIcon(count: number) {
    if (count > ICONS_COUNT) {
      throw new TypeError("Count more maximum")
    }

    if (count === ICONS_COUNT) {
      return ShuffleCopy(ICONS)
    }

    return ShuffleCopy(ICONS).slice(0, count)
  }

  async onInit() {
    this._icons = (await Promise.all(
      this._getRandomIcon(5)
          .map(id =>
            fetch(`/flat-min/${id}.svg`)
            .then(response => response.text())
            .then(svg => ({ id, data: "data:image/svg+xml;base64," + window.btoa(svg) }))
          )
    )).map(({id, data})=> {
      const img = new Image()
      img.id = String(id)
      img.classList.add("icon")
      img.src = data
      return img
    })
  }

  async onConnect() {
    for (let img of this._icons) {
      this.$().appendChild(img)
    }
  }
}

