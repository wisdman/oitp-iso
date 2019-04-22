import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core"

import { DomSanitizer } from "@angular/platform-browser"

import {
  IMatrixSequenceTrainerConfig,
  IMatrixSequenceTrainerResult,
  IMatrixSequenceTrainerItem,
} from "./matrix-sequence.trainer.interfaces"

// interface IItem {
//   value: number,
//   color: string,
//   background: string,
//   success?: boolean,
//   error?: boolean,
// }

@Component({
  selector: "trainer-matrix-sequence",
  templateUrl: "./matrix-sequence.trainer.component.html",
  styleUrls: [ "./matrix-sequence.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatrixSequenceTrainerComponent implements OnInit, OnChanges {
  @Input()
  config!: IMatrixSequenceTrainerConfig

  result: IMatrixSequenceTrainerResult = {
    id: "matrix-sequence",
    config: this.config,
    success: 0,
    error: 0,
    current: 0,
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
      current: 0,
    })
  }


  constructor(private _sanitizer: DomSanitizer){}

  matrix!: Array<IMatrixSequenceTrainerItem>

  get matrixStyle() {
    const side = Math.sqrt(this.matrix.length)
    return this._sanitizer.bypassSecurityTrustStyle(`--side: ${side}`)
  }

  private _init() {
    this.matrix = this.config.matrix.map(value => ({
      value,
      color: "#776e65",
      background: "#ffffff",
    }))

    console.log(this.matrix)
  }

  onClick(item: IMatrixSequenceTrainerItem) {
    if (item.value === (this.result.current + 1)) {
      this._updateResult({
        current: this.result.current + 1,
        success: this.result.success + 1,
      })
      item.isSuccess = true
    } else {
      this._updateResult({
        error: this.result.error + 1
      })
      item.isError = true
      setTimeout(() => item.isError = false, 1000)
    }

    if (this.result.current >= this.matrix.length) {
      this._updateResult({ isFinish: true })
    }
  }
}
