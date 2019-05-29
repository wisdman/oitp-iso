import {
  Component,
  ChangeDetectionStrategy,
} from "@angular/core"

import { Subscription, merge } from "rxjs"

import {
  AbstractTrainerComponent,

} from "../abstract"

import {
  SVGRectangle,
  genSVGRectangle,
} from "../../lib/svg"

import {
  ITablePipeTrainerAction,
  ITablePipeTrainerConfig,
  ITablePipeTrainerResult,
} from "./table-pipe.trainer.interfaces"

interface IItem extends SVGRectangle {
  data: string
  action: ITablePipeTrainerAction
  isSuccess?: boolean,
  isError?: boolean,
}

@Component({
  selector: "trainer-table-pipe",
  templateUrl: "./table-pipe.trainer.component.html",
  styleUrls: [ "./table-pipe.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePipeTrainerComponent extends AbstractTrainerComponent<ITablePipeTrainerConfig, ITablePipeTrainerResult> {

  current: number = 0
  rules!: Array<IItem>
  matrix!: Array<IItem>

  itemSize!: number
  get viewBox() {
    return `0 0 ${this.itemSize} ${this.itemSize}`
  }

  private _actionSubscriber!: Subscription

  init() {
    this.current = 0

    this.itemSize = this.getCSSPropertyIntValue("--item-size")

    const drawSize = this.itemSize - 4
    this.rules = this.config.items.map(item => ({...genSVGRectangle(2, 2, drawSize, drawSize), ...item}))
    this.matrix = this.config.matrix.map(i => ({...genSVGRectangle(2, 2, drawSize, drawSize), ...this.rules[i]}))

    if (this._actionSubscriber) this._actionSubscriber.unsubscribe()
    this._actionSubscriber = merge(this.pointerService.swipe, this.keypadService.arrow)
                              .subscribe(action => this._step(action))

    this.setTimeout(this.config.timeLimit)
  }

  destroy() {
    if (this._actionSubscriber) this._actionSubscriber.unsubscribe()
  }

  private _step(action: ITablePipeTrainerAction) {
    const currentItem = this.matrix[this.current]
    currentItem.isSuccess = currentItem.action === action
    currentItem.isError = !currentItem.isSuccess
    this.markForCheck()

    const result = this.matrix.reduce((prev, item) => {
      if (item.isSuccess) prev.success++
      if (item.isError) prev.error++
      return prev
    },{success: 0, error: 0})

    this.updateResult({...result})

    if (this.current + 1 >= this.matrix.length) {
      this.finish()
      return
    }

    this.current++
  }
}
