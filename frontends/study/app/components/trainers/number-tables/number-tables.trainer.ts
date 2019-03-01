import { Component, ChangeDetectionStrategy, ElementRef, EventEmitter, Input, Output, ViewChild, OnInit, OnChanges, SimpleChanges  } from "@angular/core"

import {
  IMatrixItem,
  IConfig,
  IResult
} from "./number-tables.interfaces"

@Component({
  selector: "number-tables-trainer",
  templateUrl: "./number-tables.trainer.html",
  styleUrls: [ "./number-tables.trainer.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberTablesTrainer implements OnInit, OnChanges {

  @ViewChild("matrixNode") matrixRef: ElementRef<HTMLDivElement>

  @Input()
  config: IConfig = {
    columns: 5,
    rows: 5,
    start: 0,
    last: 25,
    matrix: Array.from(Array(25), (_, i) =>({ value: ++i })).sort(() => Math.random() - 0.5),
  }

  result: IResult = {
    success: 0,
    error: 0,
    step: 0,
    isFinish: false
  }

  @Output("result")
  resultValueChange = new EventEmitter<IResult>()

  private updateResult(result: Partial<IResult>) {
    this.result = {...this.result, ...result}
    this.resultValueChange.emit(this.result)
  }

  private prepareMatrix() {
    const max = this.config.columns * this.config.rows

    if (this.config.matrix.length === 0) {
      this.config.matrix = Array.from(Array(max), (_, i) =>({ value: ++i })).sort(() => Math.random() - 0.5)
      return
    }

    while (this.config.matrix.length < max) {
      this.config.matrix = this.config.matrix.concat(this.config.matrix)
    }

    this.config.matrix = this.config.matrix.slice(0, max)
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  ngOnInit() {
    this.prepareMatrix()

    this.matrixRef.nativeElement.style.setProperty("--columns", `${this.config.columns}`)
    this.matrixRef.nativeElement.style.setProperty("--rows", `${this.config.rows}`)
    this.matrixRef.nativeElement.style.setProperty("--max", `${Math.max(this.config.columns, this.config.rows)}`)

    this.updateResult({
      success: 0,
      error: 0,
      step: this.config.start,
      isFinish: false
    })
  }

  onClick(item: IMatrixItem) {
    if (item.value === (this.result.step + 1)) {
      this.updateResult({ step: this.result.step + 1, success: this.result.success + 1 })
      item.success = true
    } else {
      this.updateResult({ error: this.result.error + 1 })
      item.error = true
      setTimeout(() => item.error = false, 1000)
    }

    if (this.result.step >= this.config.last) {
      this.updateResult({ isFinish: true })
    }
  }
}
