
import styles from "./random-icons.css"
import template from "./random-icons.html"

import {
  AbstractTrainer,
  Trainer,
  CSSProperty,
} from "../common/trainer"

import {
  RandomInt,
} from "../common/math"

import {
  ShuffleArray,
  NewIntArray,
  NewValueArray,
} from "../common/array"

type IConfig = {
  width: number,
  height: number,
  items: Array<number>,
  matrix: Array<number>,
}

const ICONS_COUNT = 1140
const ICONS = NewIntArray(ICONS_COUNT, 1)

const RANDOM_DATA = (): IConfig => {
  const width = RandomInt(2, 7)
  const height = RandomInt(Math.max(2, width - 1), Math.min(7, width + 1))

  const iconsCount = RandomInt(2, 5)
  const items = ShuffleArray(ICONS).slice(0, iconsCount)
  const matrix = NewValueArray(width * height, items)

  return { width, height, items, matrix }
}

@Trainer({
  selector: "trainer-icons-table",
  template, styles,
})
export class IconsTableTrainer extends AbstractTrainer {

  constructor(private _config: IConfig = RANDOM_DATA()) {
    super()
  }

  @CSSProperty("--matrix-width")
  matrixWidth: number = 0

  @CSSProperty("--matrix-height")
  matrixHeight: number = 0

  private _items: Array<{ id: number, img: HTMLImageElement }> = []
  private _matrix: Array<{ id: number, img: HTMLImageElement, div: HTMLDivElement }> = []

  private async _fetchItems(arr: Array<number>) {
    return (await Promise.all(
      arr.map(id =>
              fetch(`/flat-min/${id}.svg`)
              .then(response => response.text())
              .then(text => ({ id, data: "data:image/svg+xml;base64," + window.btoa(text) }))
            )
    )).map(({id, data})=> {
      const img = new Image()
      img.id = String(id)
      img.classList.add("icon")
      img.src = data
      return {id, img}
    })
  }

  async onInit() {
    this.matrixWidth = this._config.width
    this.matrixHeight = this._config.height
    this._items = await this._fetchItems(this._config.items)
    this._matrix = await this._fetchItems(this._config.matrix)
  }
}

