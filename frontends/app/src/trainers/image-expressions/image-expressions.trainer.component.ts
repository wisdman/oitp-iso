import {
  Component,
  ChangeDetectionStrategy,
} from "@angular/core"

import {
  concat,
  from,
  of,
  Subject,
  Subscription,
  zip,
} from "rxjs"

import {
  mergeMap,
} from "rxjs/operators"

import { compareRuneString } from "../../lib/runes"

import { ASSETS_EXPRESSIONS } from "../../app.config"

import { AbstractTrainerComponent } from "../abstract"

import {
  IImageExpressionsTrainerConfig,
  IImageExpressionsTrainerItem,
  IImageExpressionsTrainerResult,
} from "./image-expressions.trainer.interfaces"

interface IItem extends Partial<IImageExpressionsTrainerItem> {
  mode: "show" | "play" | "result"
}

@Component({
  selector: "trainer-image-expressions",
  templateUrl: "./image-expressions.trainer.component.html",
  styleUrls: [ "./image-expressions.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageExpressionsTrainerComponent
extends AbstractTrainerComponent<IImageExpressionsTrainerConfig, IImageExpressionsTrainerResult> {

  getSrcset(id: number, type: "jpg" | "webp" = "jpg") {
    return `${ASSETS_EXPRESSIONS}/${id}.${type}`
  }

  item!: IItem
  userData:string = ""

  get isSucess() {
    if (!this.item || !this.item.data) {
      return false
    }
    return compareRuneString(this.userData, this.item.data)
  }

  private _keypadEnterSubscriber!: Subscription
  private _keypadSpaceSubscriber!: Subscription

  private _stepSubject: Subject<undefined> = new Subject<undefined>()
  private _itemSubscription!: Subscription

  init() {
    this.keypadService.show("RU")

    if (this._itemSubscription) this._itemSubscription.unsubscribe()
    this._itemSubscription = zip(
      from([...this.config.items.sort(() => Math.random() - 0.5), undefined]),
      this._stepSubject,
      value => ({...value, mode: "show"} as IItem),
    ).subscribe(
      item => {
        this.item = item
        this.markForCheck()
        this.setTimeout(this.config.showTimeLimit)
      },
      error => console.error(error),
      () => this._paly(),
    )

    if (this._keypadEnterSubscriber) this._keypadEnterSubscriber.unsubscribe()
    this._keypadEnterSubscriber = this.keypadService.enter.subscribe(() => this.onButtonTouch())

    if (this._keypadSpaceSubscriber) this._keypadSpaceSubscriber.unsubscribe()
    this._keypadSpaceSubscriber = this.keypadService.space.subscribe(() => {
      if (this.item.mode === "show" || this.item.mode === "result") {
        this.onButtonTouch()
      }
    })

    this._stepSubject.next()
  }

  private _paly() {
    if (this._itemSubscription) this._itemSubscription.unsubscribe()
    this._itemSubscription = zip(
      concat(
        from(this.config.items.sort(() => Math.random() - 0.5))
          .pipe(mergeMap(value => from([{...value, mode: "play"} as IItem, {...value, mode: "result"} as IItem]))),
        of({ mode: "result" } as IItem),
      ),
      this._stepSubject,
      value => value,
    ).subscribe(
      item => {
        console.log(item)
        this.item = item
        this.markForCheck()

        if (item.mode === "play") {
          this.setTimeout(this.config.playTimeLimit)
          this.userData = ""
          return
        }

        this.setTimeout(0)
      },
      error => console.error(error),
      () => this.finish(),
    )

    this._stepSubject.next()
  }

  destroy() {
    if (this._itemSubscription) this._itemSubscription.unsubscribe()
    if (this._keypadEnterSubscriber) this._keypadEnterSubscriber.unsubscribe()
    if (this._keypadSpaceSubscriber) this._keypadSpaceSubscriber.unsubscribe()
    this.keypadService.hide()
  }

  timeout() {
    this._stepSubject.next()
  }

  onButtonTouch() {
    this._stepSubject.next()
  }
}
