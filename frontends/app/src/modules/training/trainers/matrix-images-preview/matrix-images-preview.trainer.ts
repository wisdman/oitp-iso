import { Component, ChangeDetectionStrategy } from "@angular/core"

import { SVGShape, genSVGRectangle } from "../../libs/svg"

import { AbstractTrainer } from "../abstract"
import { IMatrixImagesPreviewConfig } from "./matrix-images-preview.interfaces"

const ASSETS_ICONS = "/assets/icons"

@Component({
  selector: "trainer-matrix-images-preview",
  templateUrl: "./matrix-images-preview.trainer.html",
  styleUrls: [ "./matrix-images-preview.trainer.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatrixImagesPreviewTrainer extends AbstractTrainer<IMatrixImagesPreviewConfig> {

  getIconHref(icon: number) {
    return `${ASSETS_ICONS}/${icon}.svg`
  }

  defs!: Array<string>
  matrix!: Array<SVGShape & { data: number }>

  imageSize!: number
  itemsHeight!: number

  init() {
    this.defs =this.config.items.map(icon => this.getIconHref(icon))
    this.imageSize = this.getCSSPropertyIntValue("--trainer-icon-size")

    const itemWidth = this.getCSSPropertyIntValue("--trainer-box-size")
    const itemHeight = itemWidth

    const padding = this.getCSSPropertyIntValue("--trainer-svg-padding")
    const gap = this.getCSSPropertyIntValue("--gap")

    const side = Math.sqrt(this.config.matrix.length)
    const columns = Math.ceil(side)
    const rows = Math.floor(side)

    this.matrixWidth = padding * 2 + itemWidth * columns + gap * (columns - 1)
    this.matrixHeight = padding * 2 + itemHeight * rows + gap * (rows - 1)

    this.matrix = this.config.matrix.map((data, i) => {
      const x = padding + (itemWidth + gap) * (i % columns)
      const y = padding + (itemHeight + gap) * Math.floor(i/columns)

      return {
        ...genSVGRectangle(x, y, itemWidth, itemHeight),
        data: this.defs[data] !== undefined ? data : -1,
      }
    })

    this.preview()
  }

  timeout() {
    this.finish()
  }
}
