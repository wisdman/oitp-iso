import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import {
  SVGRectangle,
  genSVGRectangle,
} from "../../lib/svg"

import { AbstractTrainerComponent } from "../abstract"

import {
  IMatrixSequenceTrainerConfig,
  IMatrixSequenceTrainerResult,
} from "./matrix-sequence.trainer.interfaces"

interface IMatrixItem extends SVGRectangle {
  data: number,

  isSuccess?: boolean
  isError?: boolean
  isActive?: boolean
}

@Component({
  selector: "trainer-matrix-sequence",
  templateUrl: "./matrix-sequence.trainer.component.html",
  styleUrls: [ "./matrix-sequence.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatrixSequenceTrainerComponent
extends AbstractTrainerComponent<IMatrixSequenceTrainerConfig, IMatrixSequenceTrainerResult> {

  matrix!: Array<IMatrixItem>
  current: number = 1

  init() {
    this.current = 1

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

    this.setTimeout(this.config.playTimeLimit)
  }

  timeout() {
    super.timeout()
    this.finish()
  }

  onTouch(item: IMatrixItem) {
    let { success, error } = this.result

    if (item.data === this.current) {
      this.current++
      success++

      if (this.config.showSucess) {
        item.isSuccess = true
      } else {
        item.isActive = true
        setTimeout(() => {
          item.isActive = false
          this.markForCheck()
        }, 250)
      }

      if (this.current > this.matrix.length) {
        this.finish()
      }

    } else {
      error++

      item.isError = true
      setTimeout(() => {
        item.isError = false
        this.markForCheck()
      }, 250)
    }

    this.updateResult({ success, error })
  }
}
