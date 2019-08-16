import { ChangeDetectionStrategy, Component } from "@angular/core"

import { SVGShape, genSVGRectangle } from "../../libs/svg"

import { AbstractTrainer } from "../abstract"
import { IMatrixSequencePlayConfig } from "./matrix-sequence-play.interfaces"

interface IMatrixItem extends SVGShape {
  data: number,

  isSuccess?: boolean
  isError?: boolean
  isActive?: boolean
}

@Component({
  selector: "trainer-matrix-sequence-play",
  templateUrl: "./matrix-sequence-play.trainer.html",
  styleUrls: [ "./matrix-sequence-play.trainer.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatrixSequencePlayTrainer extends AbstractTrainer<IMatrixSequencePlayConfig> {

  matrix!: Array<IMatrixItem>
  current: number = 1
  success: number = 0

  init() {
    this.current = 1
    this.success = 0

    const side = Math.sqrt(this.config.matrix.length)
    const columns = Math.ceil(side)
    const rows = Math.floor(side)

    const itemWidth = this.getCSSPropertyIntValue("--trainer-box-size")
    const itemHeight = itemWidth

    const padding = this.getCSSPropertyIntValue("--trainer-svg-padding")
    const gap = this.getCSSPropertyIntValue("--gap")

    this.matrixWidth = itemWidth * columns + gap * (columns - 1)
                     + padding * 2

    this.matrixHeight = itemHeight * rows + gap * (rows - 1)
                      + padding * 2

    this.matrix = this.config.matrix.map((data, i) => {
      const x = padding + (itemWidth + gap) * (i % columns)
      const y = padding + (itemHeight + gap) * Math.floor(i/columns)

      return {
        ...genSVGRectangle(x, y, itemWidth, itemHeight),
        data,
      }
    })
  }

  timeout() {
    this.finish()
  }

  finish() {
    super.finish(this.success / this.config.matrix.length * 100)
  }

  onTouch(item: IMatrixItem) {
    if (item.data === this.current) {
      this.current++
      this.success++

      if (this.config.showSuccess) {
        item.isSuccess = true
      } else {
        item.isActive = true
        setTimeout(() => {
          item.isActive = false
          this.markForCheck()
        }, 250)
      }
    } else {
      this.success--
      item.isError = true
      setTimeout(() => {
        item.isError = false
        this.markForCheck()
      }, 250)
    }

    if (this.current > this.matrix.length) {
      this.finish()
    }
  }
}
