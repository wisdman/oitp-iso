import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import {
  merge,
  from,
  Subject,
  Subscription,
  zip,
} from "rxjs"

import {
  takeWhile,
} from "rxjs/operators"

import { ASSETS_ICONS } from "../../app.config"

import { AbstractTrainerComponent } from "../abstract"

import { ISelectorItem } from "../../components/trainer-selector"

import {
  IImageFieldTrainerConfig,
  IImageFieldTrainerResult,
} from "./image-field.trainer.interfaces"

interface IMatrixItem {
  x: number,
  y: number,
  item: number,
}

@Component({
  selector: "trainer-image-field",
  templateUrl: "./image-field.trainer.component.html",
  styleUrls: [ "./image-field.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageFieldTrainerComponent
extends AbstractTrainerComponent<IImageFieldTrainerConfig, IImageFieldTrainerResult> {

  mode: "show" | "play" | "result" = "show"

  getIconHref(icon: number) {
    return `${ASSETS_ICONS}/${icon}.svg`
  }

  answers!: Array<ISelectorItem & { correct: boolean }>
  matrix!: Array<IMatrixItem>

  itemWidth!: number
  itemHeight!: number

  private _getMatrix(page: Array<number>): Array<IMatrixItem> {
    const cX = this.matrixWidth / 2
    const cY = this.matrixHeight / 2
    const radius = Math.min(this.matrixWidth, this.matrixHeight) / 2 - Math.max(this.itemWidth, this.itemHeight) / 2

    const angle = 360 / page.length
    const startAngle = Math.floor(Math.random() * -100)

    return page.map((item, i) => {
      const delta = (startAngle + angle * i)*Math.PI/180
      const x = Math.round(cX + radius*Math.cos(delta))
      const y = Math.round(cY + radius*Math.sin(delta))
      return { x, y, item }
    })
  }

  private _keypadSubscriber!: Subscription

  private _stepSubject: Subject<undefined> = new Subject<undefined>()
  private _pageSubscription!: Subscription

  init() {
    this.matrixWidth = this.matrixHeight = this.getCSSPropertyIntValue("--matrix-size")
    this.itemWidth = this.itemHeight = this.getCSSPropertyIntValue("--item-size")

    this.answers = this.config.answers.map(({icon, correct}) => ({ data: this.getIconHref(icon), correct }))

    if (this._pageSubscription) this._pageSubscription.unsubscribe()
    this._pageSubscription = zip(
      from([...this.config.pages, undefined]),
      this._stepSubject,
      value => value as Array<number>
    ).pipe(
      takeWhile(page => page !== undefined),
    ).subscribe(
      page => {
        this.matrix = this._getMatrix(page)
        this.markForCheck()
        this.setTimeout(this.config.pageTimeLimit)
      },
      error => console.error(error),
      () => this._paly(),
    )

    if (this._keypadSubscriber) this._keypadSubscriber.unsubscribe()
    this._keypadSubscriber = merge(this.keypadService.enter, this.keypadService.space)
                              .subscribe(() => this.onKeypad())

    this.mode = "show"
    this._stepSubject.next()
  }

  private _paly() {
    this.mode = "play"
    this.markForCheck()
    this.setTimeout(this.config.playTimeLimit)
  }

  private _result() {
    this.setTimeout(0)
    this.mode = "result"

    this.answers.forEach(answer => {
      answer.isSuccess = answer.isActive && answer.correct
      answer.isError = answer.isActive && !answer.correct
      answer.isMark = !answer.isActive && answer.correct

      console.log(answer)
    })

    this.markForCheck()
  }

  timeout() {
    switch (this.mode) {
      case "show":
        this._stepSubject.next()
        return

      case "play":
        super.timeout()
        this._result()
        return
    }
  }

  onKeypad() {
    switch (this.mode) {
      case "show":
        this._stepSubject.next()
        return

      case "play":
        return

      case "play":
        this.finish()
        return
    }
  }

  onButtonTouch() {
    switch (this.mode) {
      case "show":
        this._stepSubject.next()
        return

      case "play":
        this._result()
        return

      case "play":
        this.finish()
        return
    }
  }
}
