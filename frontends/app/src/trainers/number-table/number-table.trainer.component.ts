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
  INumberTableTrainerConfig,
  INumberTableTrainerResult,
} from "./number-table.trainer.interfaces"

interface IItem {
  value: number,
  background: string,
  success?: boolean,
  error?: boolean,
}

@Component({
  selector: "trainer-number-table",
  templateUrl: "./number-table.trainer.component.html",
  styleUrls: [ "./number-table.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberTableTrainerComponent implements OnInit, OnChanges {

  constructor(private _sanitizer: DomSanitizer){}

  @Input()
  config!: INumberTableTrainerConfig

  result: INumberTableTrainerResult = {
    id: "number-table",
    config: this.config,
    success: 0,
    error: 0,
    current: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<INumberTableTrainerResult>()

  private _updateResult(result: Partial<INumberTableTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  matrix: Array<IItem> = []

  get matrixStyle() {
    const side = Math.sqrt(this.matrix.length)
    return this._sanitizer.bypassSecurityTrustStyle(`--side: ${side}`)
  }

  onClick(item: IItem) {
    if (item.value === (this.result.current + 1)) {
      this._updateResult({
        current: this.result.current + 1,
        success: this.result.success + 1,
      })
      item.success = true
    } else {
      this._updateResult({
        error: this.result.error + 1
      })
      item.error = true
      setTimeout(() => item.error = false, 1000)
    }

    if (this.result.current >= this.config.last) {
      this._updateResult({ isFinish: true })
    }
  }

  ngOnInit() {
    this.matrix = this.config.matrix.map(item => ({...item}))
    this._updateResult({
      isFinish: false,
      success: 0,
      error: 0,
      current: 0,
    })
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }
}
