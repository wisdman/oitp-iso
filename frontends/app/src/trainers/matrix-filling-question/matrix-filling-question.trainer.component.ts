import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { Subscription } from "rxjs"

import { ASSETS_ICONS } from "../../app.config"

import { AbstractTrainerComponent } from "../abstract"

import { ISelectorItem } from "../../components/trainer-selector"

import {
  IMatrixFillingQuestionTrainerConfig,
  IMatrixFillingQuestionTrainerResult,
} from "./matrix-filling-question.trainer.interfaces"

@Component({
  selector: "trainer-matrix-filling-question",
  templateUrl: "./matrix-filling-question.trainer.component.html",
  styleUrls: [ "./matrix-filling-question.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatrixFillingQuestionTrainerComponent
extends AbstractTrainerComponent<IMatrixFillingQuestionTrainerConfig, IMatrixFillingQuestionTrainerResult> {

  mode: "play" | "result" = "play"

  getIconHref(icon: number) {
    return `${ASSETS_ICONS}/${icon}.svg`
  }

  items!: Array<ISelectorItem & { correct: boolean }>

  private _keypadEnterSubscriber!: Subscription
  private _keypadSpaceSubscriber!: Subscription

  init() {
    this.items = this.config.items
                     .map(({icon, correct}) => ({
                       data: this.getIconHref(icon),
                       correct
                     }))
                     .sort(() => Math.random() - 0.5)
                     .sort(() => Math.random() - 0.5)

    if (this._keypadEnterSubscriber) this._keypadEnterSubscriber.unsubscribe()
    this._keypadEnterSubscriber = this.keypadService.enter
                                      .subscribe(() => this.mode === "result" ? this.finish() : this.showResult())

    if (this._keypadSpaceSubscriber) this._keypadSpaceSubscriber.unsubscribe()
    this._keypadEnterSubscriber = this.keypadService.space
                                      .subscribe(() => this.mode === "result" && this.finish())

    this.mode = "play"
    this.setTimeout(this.config.playTimeLimit)
  }

  destroy() {
    if (this._keypadEnterSubscriber) this._keypadEnterSubscriber.unsubscribe()
      if (this._keypadSpaceSubscriber) this._keypadSpaceSubscriber.unsubscribe()
  }

  showResult() {
    this.setTimeout(0)
    this.mode = "result"

    this.items.forEach(item => {
      item.isSuccess = item.isActive && item.correct
      item.isError = item.isActive && !item.correct
      item.isMark = !item.isActive && item.correct
    })

    this.markForCheck()
  }

  timeout() {
    super.timeout()
    this.showResult()
  }
}