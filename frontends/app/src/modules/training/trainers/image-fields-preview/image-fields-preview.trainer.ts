import { ChangeDetectionStrategy, Component } from "@angular/core"

import { AbstractTrainer } from "../abstract"
import { IImageFieldsPreviewConfig } from "./image-fields-preview.interfaces"

const ASSETS_ICONS = "/assets/icons"

@Component({
  selector: "trainer-image-fields-preview",
  templateUrl: "./image-fields-preview.trainer.html",
  styleUrls: [ "./image-fields-preview.trainer.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageFieldsPreviewTrainer extends AbstractTrainer<IImageFieldsPreviewConfig> {

  getIconHref(icon: number) {
    return `${ASSETS_ICONS}/${icon}.svg`
  }

  matrix!: Array<{
    x: number,
    y: number,
    item: number,
  }>

  itemWidth!: number
  itemHeight!: number

  init() {
    this.matrixWidth = this.matrixHeight = this.getCSSPropertyIntValue("--matrix-size")
    this.itemWidth = this.itemHeight = this.getCSSPropertyIntValue("--item-size")

    const cX = this.matrixWidth / 2
    const cY = this.matrixHeight / 2
    const radius = Math.min(this.matrixWidth, this.matrixHeight) / 2 - Math.max(this.itemWidth, this.itemHeight) / 2

    const angle = 360 / this.config.items.length
    const startAngle = Math.floor(Math.random() * -100)

    this.matrix = this.config.items.map((item, i) => {
      const delta = (startAngle + angle * i)*Math.PI/180
      const x = Math.round(cX + radius*Math.cos(delta))
      const y = Math.round(cY + radius*Math.sin(delta))
      return { x, y, item }
    })

    this.preview()
  }

  timeout() {
    this.finish()
  }
}
