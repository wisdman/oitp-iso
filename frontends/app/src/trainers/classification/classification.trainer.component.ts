import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild,
} from "@angular/core"

import {
  concat,
  from,
  of,
  Subject,
  Subscription,
  timer,
  zip,
} from "rxjs"

import {
  switchMap,
  filter,
} from "rxjs/operators"

import {
  notUndefined
} from "../../lib/util"

import {
  SVGRectangle,
  genSVGRectangle,
} from "../../lib/svg"

import {
  AbstractTrainerComponent,
} from "../abstract"

import {
  IClassificationTrainerConfig,
  IClassificationTrainerItem,
  IClassificationTrainerResult,
} from "./classification.trainer.interfaces"

interface IGroup extends SVGRectangle {
  data: string
  isSuccess?: boolean
  isError?: boolean
}

@Component({
  selector: "trainer-classification",
  templateUrl: "./classification.trainer.component.html",
  styleUrls: [ "./classification.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassificationTrainerComponent
  extends AbstractTrainerComponent<IClassificationTrainerConfig, IClassificationTrainerResult> {

  private _stepSubject!: Subject<undefined>
  private _itemsSubscription!: Subscription

  matrix!: Array<IGroup>
  item!: IClassificationTrainerItem

  matrixWidth: number = 0
  matrixHeight: number = 0

  get matrixViewBox(): string {
    return `0 0 ${this.matrixWidth || 0} ${this.matrixHeight || 0}`
  }

  resultAnimationDuration!: number

  init() {
    const itemMsTimeLimit = this.config.itemTimeLimit * 1000
    this.setCSSProperty("--animation-duration", `${itemMsTimeLimit}ms`)

    this.resultAnimationDuration = this.getCSSPropertyIntValue("--result-animation-duration")

    this._stepSubject = new Subject<undefined>()

    this._itemsSubscription = zip(
      concat(from(this.config.items), of(undefined)),
      this._stepSubject.pipe(switchMap(() => timer(0, itemMsTimeLimit))),
      value => value,
    ).pipe(filter(notUndefined))
     .subscribe(
      item => {
        this.item = item
        this.markForCheck()
        this._resetAnimation()
      },
      error => console.error(error),
      () => this._finish(),
    )

    const groups = [...new Set(this.config.items.map(({group}) => group))]
                    .sort(() => Math.random() - 0.5)

    if (this.config.type === "colors") {
      this._initColorMatrix(groups)
    } else {
      this._initTextMatrix(groups)
    }

    this._stepSubject.next()
    this.setTimeout(this.config.itemTimeLimit * this.matrix.length)
  }

  destroy() {
    if (this._itemsSubscription) this._itemsSubscription.unsubscribe()
  }

  private _initColorMatrix(groups: Array<string>) {
    const gap = this.getCSSPropertyIntValue("--gap")
    const padding = this.getCSSPropertyIntValue("--padding")

    const columns = groups.length
    const itemWidth = Math.floor((this.width - padding * 2 - (columns - 1) * gap) / columns)
    const itemHeight = this.getCSSPropertyIntValue("--trainer-text-item-height")

    this.matrixWidth = padding
                     + itemWidth * columns + gap * (columns - 1)
                     + padding

    this.matrixHeight = padding
                      + itemHeight
                      + padding

    this.matrix = groups.map((data, i) =>
      ({...genSVGRectangle(padding + (itemWidth + gap) * i, padding, itemWidth, itemHeight), data})
    )
  }

  private _initTextMatrix(groups: Array<string>) {
    const gap = this.getCSSPropertyIntValue("--gap")
    const padding = this.getCSSPropertyIntValue("--padding")

    const maxTextWidth = Math.max(...this.getTextWidth(groups))
    const textPadding = this.getCSSPropertyIntValue("--text-padding")

    let itemWidth = textPadding + maxTextWidth + textPadding

    let columns = (() => {
      const best = Math.floor(this.width / itemWidth)
      for (let i = 5; i > 0; i--) {
        if (groups.length % i === 0 && i < best){
          return i
        }
      }
      return 1
    })()
    const row = Math.ceil(groups.length / columns)

    itemWidth = Math.floor(this.width / columns)
    const itemHeight = this.getCSSPropertyIntValue("--trainer-text-item-height");

    this.matrixWidth = padding
                     + itemWidth * columns + gap * (columns - 1)
                     + padding

    this.matrixHeight = padding
                      + itemHeight * row + gap * (row - 1)
                      + padding

    this.matrix = groups.map((data, i) => {
      const x = padding + (itemWidth + gap) * (i % columns)
      const y = padding + (itemHeight + gap) * Math.floor(i/columns)
      return {...genSVGRectangle(x, y, itemWidth, itemHeight), data}
    })
  }

  @ViewChild("dataNode", { static: true }) dataNodeRef!: ElementRef<HTMLSpanElement>
  private _resetAnimation() {
    const element = this.dataNodeRef.nativeElement
    window.requestAnimationFrame(() => {
      element.classList.remove("animate")
      window.requestAnimationFrame(() => {
        element.classList.add("animate")
      })
    })
  }

  private _finish() {
    setTimeout(() => this.finish(), this.resultAnimationDuration)
  }

  onTouch(group: IGroup) {
    let { success, error } = this.result
    if (this.item.group === group.data) {
      success++
      group.isSuccess = true
      setTimeout(() => {
        group.isSuccess = false
        this.markForCheck()
      }, this.resultAnimationDuration)
    } else {
      error++
      group.isError = true
      setTimeout(() => {
        group.isError = false
        this.markForCheck()
      }, this.resultAnimationDuration)
    }
    this.updateResult({ success, error })
    this._stepSubject.next()
  }
}
