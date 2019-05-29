import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import {
  AbstractTrainerComponent,
} from "../abstract"

import {
  genSVGRectangle,
} from "../../lib/svg"

import {
  IMatrixSequenceTrainerConfig,
  IMatrixSequenceTrainerItem,
  IMatrixSequenceTrainerResult,
} from "./matrix-sequence.trainer.interfaces"

@Component({
  selector: "trainer-matrix-sequence",
  templateUrl: "./matrix-sequence.trainer.component.html",
  styleUrls: [ "./matrix-sequence.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatrixSequenceTrainerComponent
extends AbstractTrainerComponent<IMatrixSequenceTrainerConfig, IMatrixSequenceTrainerResult> {

  matrix!: Array<IMatrixSequenceTrainerItem>
  matrixViewBox: string = "0 0 0 0"
  matrixWidth: number = 0
  matrixHeight: number = 0

  current: number = 0

  init() {
    this.current = 0

    const side = Math.sqrt(this.config.matrix.length)
    const columns = Math.ceil(side)
    const rows = Math.floor(side)

    const boxSize = this.getCSSPropertyIntValue("--box-size")
    const gap = this.getCSSPropertyIntValue("--gap")

    const width = boxSize * columns + gap * (columns + 1)
    const height = boxSize * rows + gap * (rows + 1)

    this.matrixViewBox = `0 0 ${width} ${height}`
    this.matrixWidth = width
    this.matrixHeight = height

    this.matrix = this.config.matrix.map((data, i) => {
      const x = (boxSize + gap) * (i % columns) + gap
      const y = (boxSize + gap) * Math.floor(i/columns) + gap

      return {
        ...genSVGRectangle(x, y, boxSize, boxSize),
        data,
        color: "",
        background: ""
      }
    })
  }

  private _step(item: IMatrixSequenceTrainerItem) {
    if (item.data === (this.current + 1)) {
      this.current++
      this.updateResult({
        success: this.result.success + 1,
        isFinish: this.current >= this.matrix.length
      })

      if (this.config.showSucess) {
        item.isSuccess = true
        return
      }

      item.isActive = true
      setTimeout(() => {
        item.isActive = false
        this.markForCheck()
      }, 250)
      return
    }

    this.updateResult({ error: this.result.error + 1 })

    item.isError = true
    setTimeout(() => {
      item.isError = false
      this.markForCheck()
    }, 250)
  }

  onTouch(item: IMatrixSequenceTrainerItem) {
    this._step(item)
  }
}
