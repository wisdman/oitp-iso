import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  HostListener,
} from "@angular/core"

import {
  INumberExpressionTrainerConfig,
  INumberExpressionTrainerResult,
} from "./number-expression.trainer.interfaces"

interface IItem {
  value: string | number
  userValue?: string | number
}

@Component({
  selector: "trainer-number-expression",
  templateUrl: "./number-expression.trainer.component.html",
  styleUrls: [ "./number-expression.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberExpressionTrainerComponent implements OnInit, OnChanges {

  @Input()
  config!: INumberExpressionTrainerConfig

  result: INumberExpressionTrainerResult = {
    id: "number-expression",
    config: this.config
  }

  @Output("result")
  resultValueChange = new EventEmitter<INumberExpressionTrainerResult>()

  private _updateResult(result: Partial<INumberExpressionTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  matrix: Array<IItem> = []
  items: Array<string> = ["+", "-", "*", "/"]

  ngOnInit() {
    this.matrix = this.config.expression
                             .map( value => ({ value }) )

    this._updateResult({
      isFinish: false,
      success: 0,
      error: 0,
    })
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  private _check() {
    const success = this.matrix
                        .reduce( (success, item) => item.value === item.userValue ? ++success : success, 0)
    const error = this.matrix.length - success
    const isDone = this.matrix.every(item => item.userValue !== undefined)
    this._updateResult({ success, error, isFinish: error === 0 || isDone })
  }

  dragStart(event: DragEvent, value?: number | string) {
    if (value === undefined || typeof value === "number") {
      return
    }

    (event.dataTransfer as DataTransfer).setData("value", value)
  }

  allowDrop(event: DragEvent) {
    if (!this.config.isGameMode) {
      return
    }
    event.preventDefault()
  }

  drop(event: DragEvent, item:IItem) {
    event.preventDefault()

    const value = (event.dataTransfer as DataTransfer).getData("value")
    item.userValue = value
    this._check()
  }

  @HostListener("click", ["$event"])
  onHostClick() {
    this._updateResult({ isFinish: true })
  }
}
