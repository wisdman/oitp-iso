import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import {
  concat,
  from,
  of,
  Subject,
  Subscription,
  zip,
} from "rxjs"

import { mergeMap } from "rxjs/operators"

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

  get isSuccess() {
    if (!this.item || !this.item.data) {
      return false
    }

    const userData = this.userData.toUpperCase().replace(/[^0-9a-zA-Zа-яА-Я]+/ig,"")
    const itemData = this.item.data.toUpperCase().replace(/[^0-9a-zA-Zа-яА-Я]+/ig,"")
    return userData === itemData
  }

  private _stepSubject: Subject<undefined> = new Subject<undefined>()
  private _itemSubscription!: Subscription

  init() {
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
      undefined,
      () => this._paly(),
    )

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
        this.item = item
        this.markForCheck()

        if (item.mode === "play") {
          this.setTimeout(this.config.playTimeLimit)
          this.userData = ""
          return
        }

        this.setTimeout(0)
      },
      undefined,
      () => this.finish(),
    )

    this._stepSubject.next()
  }

  destroy() {
    this._itemSubscription.unsubscribe()
  }

  timeout() {
    this._stepSubject.next()
  }

  next() {
    this._stepSubject.next()
  }
}
