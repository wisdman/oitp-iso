import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import {
  merge,
  Subscription,
} from "rxjs"

import { getRuneString } from "../../lib/runes"

import { AbstractTrainerComponent } from "../abstract"

import {
  ITextLettersTrainerConfig,
  ITextLettersTrainerResult,
} from "./text-letters.trainer.interfaces"

@Component({
  selector: "trainer-text-letters",
  templateUrl: "./text-letters.trainer.component.html",
  styleUrls: [ "./text-letters.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextLettersTrainerComponent
extends AbstractTrainerComponent<ITextLettersTrainerConfig, ITextLettersTrainerResult> {

  mode: "show" | "play" | "result" = "show"

  data!: string
  runes!: Array<string>

  private _keypadRuneSubscription!: Subscription
  private _keypadSubscription!: Subscription

  init() {
    this.keypadService.show("RU")

    this.data = this.config.data
    this.runes = getRuneString(this.config.data).split("").map(() => "")

    this.mode = "show"
    this.setTimeout(this.config.showTimeLimit)

    if (this._keypadRuneSubscription) this._keypadRuneSubscription.unsubscribe()
    this._keypadRuneSubscription = this.keypadService.ru.subscribe(rune => this._step(rune))

    if (this._keypadSubscription) this._keypadSubscription.unsubscribe()
    this._keypadSubscription = merge(this.keypadService.enter, this.keypadService.space)
                                .subscribe(() => this._next())
  }

  destroy() {
    if (this._keypadRuneSubscription) this._keypadRuneSubscription.unsubscribe()
    if (this._keypadSubscription) this._keypadSubscription.unsubscribe()
    this.keypadService.hide()
  }

  timeout() {
    switch (this.mode) {
      case "show":
        this.startPlay()
        return

      case "play":
        super.timeout()
        this.showResult()
        return
    }
  }

  startPlay() {
    this.mode = "play"
    this.markForCheck()
    this.setTimeout(this.config.playTimeLimit)
  }

  showResult() {
    this.setTimeout(0)
    this.mode = "result"
    this.markForCheck()
  }

  private _step(rune: string) {
    const idx = this.runes.findIndex(value => !value)
    if (idx < 0) {
      return
    }

    this.runes[idx+1] = rune
  }

  private _next() {
    switch (this.mode) {
      case "show":
        this.startPlay()
        return

      case "play":
        super.timeout()
        this.showResult()
        return
    }
  }

  // private _step(rune: string) {
  //   const next = this.runes.find(item => !item.user)
  //   if (next === undefined) {
  //     this._result()
  //     return
  //   }

  //   next.user = rune

  //   const success =  this.runes.filter(({rune, user}) => rune === user).length
  //   const error = this.runes.length - success
  //   this.updateResult({ success, error })

  //   if (this.runes.every(({user}) => !!user)) {
  //     this._result()
  //   }
  // }

  // onKey(rune: string) {
  //   if (this.mode !== "play") {
  //     return
  //   }

  //   if (!RUNES.includes(rune)) {
  //     return
  //   }

  //   this._step(rune)
  // }

  // onButtonTouch() {
  //   if (this.mode === "result") {
  //     this.finish()
  //     return
  //   }

  //   this._play()
  // }
}
