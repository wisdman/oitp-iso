import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { ASSETS_EXPRESSIONS } from "../../app.config"

import { AbstractTrainerComponent } from "../abstract"

import {
  IImageExpressionsQuestionTrainerConfig,
  IImageExpressionsQuestionTrainerResult,
} from "./image-expressions-question.trainer.interfaces"

@Component({
  selector: "trainer-image-expressions-question",
  templateUrl: "./image-expressions-question.trainer.component.html",
  styleUrls: [ "./image-expressions-question.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageExpressionsQuestionTrainerComponent
extends AbstractTrainerComponent<IImageExpressionsQuestionTrainerConfig, IImageExpressionsQuestionTrainerResult> {

  getSrcset(id: number, type: "jpg" | "webp" = "jpg") {
    return `${ASSETS_EXPRESSIONS}/${id}.${type}`
  }

  private _prepareString(value: string): string {
    return value.toUpperCase()
                .replace(/[^0-9A-ZА-ЯЙЁ\s]+/ig,"")
                .replace(/\s+/, " ")
                .trim()
                .replace("Й", "И")
                .replace("Ё", "Е")
  }

  isSuccess: boolean = false
  userData: string = ""

  mode: "play" | "result" = "play"

  init() {
    this.isSuccess = false
    this.userData = ""

    this.mode = "play"
    this.setTimeout(this.config.playTimeLimit)
  }

  showResult() {
    this.setTimeout(0)
    this.isSuccess = this._prepareString(this.config.data || "") === this._prepareString(this.userData || "")
    console.log(this._prepareString(this.config.data || ""), this._prepareString(this.userData || ""))
    this.mode = "result"
  }

  timeout() {
    super.timeout()
    this.showResult()
  }

  finish() {
    this.updateResult({
      success: this.isSuccess ? 1 : 0,
      error: this.isSuccess ? 0 : 1,
    })
    super.finish()
  }
}
