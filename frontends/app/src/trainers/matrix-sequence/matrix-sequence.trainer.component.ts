import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core"

import { RoughGenerator } from "../../lib/rough/generator"

import {
  LapTimerService,
} from "../../services"

import {
  IMatrixSequenceTrainerConfig,
  IMatrixSequenceTrainerItem,
  IMatrixSequenceTrainerResult,
  MatrixSequenceTrainerID,
} from "./matrix-sequence.trainer.interfaces"

@Component({
  selector: "trainer-matrix-sequence",
  templateUrl: "./matrix-sequence.trainer.component.html",
  styleUrls: [ "./matrix-sequence.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatrixSequenceTrainerComponent implements OnInit, OnChanges {
  constructor(
    private _cdr: ChangeDetectorRef,
    private _elRef:ElementRef<HTMLElement>,
    private _lapTimerService: LapTimerService,
  ){}

  private _style = getComputedStyle(this._elRef.nativeElement)

  private _getCSSPropertyIntValue(property: string): number {
    const value = this._style.getPropertyValue(property)
    return Number.parseInt(value)
  }


  @Input()
  config!: IMatrixSequenceTrainerConfig

  result: IMatrixSequenceTrainerResult = {
    id: MatrixSequenceTrainerID,
    config: this.config,
    success: 0,
    error: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<IMatrixSequenceTrainerResult>()

  private _updateResult(result: Partial<IMatrixSequenceTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  ngOnInit() {
    this._init()
    this._updateResult({
      isFinish: false,
      success: 0,
      error: 0,
    })
    this._lapTimerService.setLapTimeout(this.config.timeLimit || 0)
  }

  matrix!: Array<IMatrixSequenceTrainerItem>
  matrixViewBox: string = "0 0 0 0"
  matrixWidth: number = 0
  matrixHeight: number = 0

  current: number = 0

  private _init() {
    this.current = 0

    const side = Math.sqrt(this.config.matrix.length)
    const columns = Math.ceil(side)
    const rows = Math.floor(side)

    const boxSize = this._getCSSPropertyIntValue("--box-size")
    const gap = this._getCSSPropertyIntValue("--gap")

    const width = boxSize * columns + gap * (columns + 1)
    const height = boxSize * rows + gap * (rows + 1)

    this.matrixViewBox = `0 0 ${width} ${height}`
    this.matrixWidth = width
    this.matrixHeight = height

    const svgGenerator = new RoughGenerator({}, { width, height } )

    this.matrix = this.config.matrix.map((data, i) => {
      const x = (boxSize + gap) * (i % columns) + gap
      const y = (boxSize + gap) * Math.floor(i/columns) + gap

      const sets = svgGenerator.rectangle(x, y, boxSize, boxSize, {
                                          fill: "none",
                                          fillStyle: "solid",
                                          roughness: 1,
                                        }).sets

      const pathSet = sets.find(set => set.type === "path")
      const path = pathSet && svgGenerator.opsToPath(pathSet) || ""

      const fillPathSet = sets.find(set => set.type === "fillPath")
      const fillPath = fillPathSet && svgGenerator.opsToPath(fillPathSet) || ""

      return {
        data,
        x,
        y,
        width: boxSize,
        height: boxSize,
        path,
        fillPath,
        color: "",
        background: ""
      }
    })
  }


  private _step(item: IMatrixSequenceTrainerItem) {
    if (item.data === (this.current + 1)) {
      this.current++
      this._updateResult({
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
        this._cdr.markForCheck()
      }, 250)
      return
    }

    this._updateResult({ error: this.result.error + 1 })

    item.isError = true
    setTimeout(() => {
      item.isError = false
      this._cdr.markForCheck()
    }, 250)
  }

  onTouch(item: IMatrixSequenceTrainerItem) {
    this._step(item)
  }
}
