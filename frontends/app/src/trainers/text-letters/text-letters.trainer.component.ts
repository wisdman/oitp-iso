import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import {
  merge,
  Subscription,
} from "rxjs"

import { NOT_RUNES_RX } from "../../lib/runes"

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

  runes!: Array<{
    data: string
    userData: string
  }>

  private _keypadRuneSubscription!: Subscription
  private _keypadEnterOrSpaceSubscription!: Subscription
  private _keypadBackspaceSubscription!: Subscription

  private _getRunes(v: string) {
    return v.replace(NOT_RUNES_RX, " ")
            .split(/\s+/)
            .map(s => s.charAt(0).toUpperCase())
  }

  init() {
    this.keypadService.show("RU")

    this.runes = this._getRunes(this.config.data)
                     .map(data => ({data, userData:""}))

    if (this._keypadRuneSubscription) this._keypadRuneSubscription.unsubscribe()
    this._keypadRuneSubscription = merge(
                                    this.keypadService.ru,
                                    // this.keypadService.en,
                                    this.keypadService.numbers,
                                  ).subscribe(rune => this._onRune(rune))

    if (this._keypadBackspaceSubscription) this._keypadBackspaceSubscription.unsubscribe()
    this._keypadBackspaceSubscription = this.keypadService.backspace.subscribe(() => this._onBackspace())

    if (this._keypadEnterOrSpaceSubscription) this._keypadEnterOrSpaceSubscription.unsubscribe()
    this._keypadEnterOrSpaceSubscription = merge(
                                             this.keypadService.enter,
                                             this.keypadService.space,
                                           ).subscribe(() => this._onEnterOrSpace())

    this.mode = "show"
    this.setTimeout(this.config.showTimeLimit)
  }

  destroy() {
    if (this._keypadRuneSubscription) this._keypadRuneSubscription.unsubscribe()
    if (this._keypadBackspaceSubscription) this._keypadBackspaceSubscription.unsubscribe()
    if (this._keypadEnterOrSpaceSubscription) this._keypadEnterOrSpaceSubscription.unsubscribe()
    this.keypadService.hide()
  }

  start() {
    this.setTimeout(this.config.playTimeLimit)
    this.mode = "play"
    this.markForCheck()
  }

  private _result() {
    this.setTimeout(0)
    this.mode = "result"
    this.markForCheck()
  }

  finish() {
    const success = this.runes.reduce((acc, {data, userData}) => data === userData ? ++acc : acc, 0)
    const error = this.runes.length = success
    this.updateResult({ success, error })
    super.finish()
  }

  private _onRune(rune: string) {
    if (this.mode !== "play") {
      return
    }

    const idx = this.runes.findIndex(({userData}) => !userData)
    if (idx < 0) {
      return
    }

    this.runes[idx].userData = rune
    this.markForCheck()

    const finish = this.runes.every(({userData}) => !!userData)
    if (finish) {
      this._result()
    }
  }

  private _onBackspace() {
    if (this.mode !== "play") {
      return
    }

    let idx = this.runes.findIndex(({userData}) => !userData) - 1
    if (idx < 0) {
      idx = this.runes.length - 1
    }

    this.runes[idx].userData = ""
    this.markForCheck()
  }

  timeout() {
    switch (this.mode) {
      case "show":
        this.start()
        return
      case "play":
        super.timeout()
        this._result()
        return
    }
  }

  private _onEnterOrSpace() {
    switch (this.mode) {
      case "show":
        this.start()
        return
      case "result":
        this.finish()
        return
    }
  }
}
