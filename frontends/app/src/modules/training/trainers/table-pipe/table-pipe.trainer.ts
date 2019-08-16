import { ChangeDetectionStrategy, Component } from "@angular/core"

import { Subscription, merge } from "rxjs"
import { filter, map } from "rxjs/operators"

import { SVGShape, genSVGRectangle } from "../../libs/svg"

import { AbstractTrainer } from "../abstract"
import { ISwipe } from "../../services"
import { ITablePipeConfig } from "./table-pipe.interfaces"

interface IItem extends SVGShape {
  data: string
  action: ISwipe
  isSuccess?: boolean,
  isError?: boolean,
}

@Component({
  selector: "trainer-table-pipe",
  templateUrl: "./table-pipe.trainer.html",
  styleUrls: [ "./table-pipe.trainer.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePipeTrainer extends AbstractTrainer<ITablePipeConfig> {

  current: number = 0
  rules!: Array<IItem>
  matrix!: Array<IItem>

  private _actionSubscriber!: Subscription

  init() {
    this.current = 0

    const itemSize = this.getCSSPropertyIntValue("--trainer-svg-height")
    const padding = this.getCSSPropertyIntValue("--trainer-svg-padding")

    this.matrixHeight = itemSize + padding * 2
    this.matrixWidth = itemSize + padding * 2

    this.rules = this.config.items.map(item => ({...genSVGRectangle(2, 2, itemSize, itemSize), ...item}))
    this.matrix = this.config.matrix.map(i => ({...genSVGRectangle(2, 2, itemSize, itemSize), ...this.rules[i]}))

    if (this._actionSubscriber) this._actionSubscriber.unsubscribe()
    this._actionSubscriber = merge(
      this.pointerService.swipe,
      this.keypadService.keydown.pipe(
        filter(({key}) => ["DOWN", "UP", "LEFT", "RIGHT"].includes(key)),
        map(({key, originalEvent}) => {
          originalEvent.preventDefault()
          originalEvent.stopPropagation()
          return key as ISwipe
        })
      ),
    ).subscribe(action => this._step(action))
  }

  destroy() {
    this._actionSubscriber.unsubscribe()
  }

  timeout() {
    this.finish()
  }

  finish() {
    const success = this.matrix.reduce((sum, {isSuccess}) => isSuccess ? ++sum : sum, 0)
    super.finish(success / this.config.matrix.length * 100)
  }

  private _step(action: ISwipe) {
    if (this.current >= this.matrix.length) {
      return
    }

    const currentItem = this.matrix[this.current]
    currentItem.isSuccess = currentItem.action === action
    currentItem.isError = !currentItem.isSuccess
    this.markForCheck()

    this.current++
    if (this.current >= this.matrix.length) {
      this.finish()
      return
    }
  }
}
