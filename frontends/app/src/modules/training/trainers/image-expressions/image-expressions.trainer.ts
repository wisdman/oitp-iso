import { ChangeDetectionStrategy, Component } from "@angular/core"

import { AbstractTrainer } from "../abstract"
import { IImageExpressionsConfig } from "./image-expressions.interfaces"

const ASSETS_EXPRESSIONS = "/assets/expressions"

@Component({
  selector: "trainer-image-expressions",
  templateUrl: "./image-expressions.trainer.html",
  styleUrls: [ "./image-expressions.trainer.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageExpressionsTrainer extends AbstractTrainer<IImageExpressionsConfig> {

  getSrcset(id: number, type: "jpg" | "webp" = "jpg") {
    return `${ASSETS_EXPRESSIONS}/${id}.${type}`
  }

  private _prepareString(value: string): string {
    return value.toUpperCase()
                .replace("Й", "И")
                .replace("Ё", "Е")
                .replace(/[^0-9A-ZА-Я\s]+/ig," ")
                .replace(/\s+/ig, " ")
                .trim()
  }

  isSuccess: boolean = false
  userData: string = ""

  init() {
    this.fullscreenService.unlock()

    this.isSuccess = false
    this.userData = ""
  }

  timeout() {
    this.result()
  }

  result() {
    super.result()
    this.isSuccess = this._prepareString(this.config.data || "") === this._prepareString(this.userData || "")
  }

  finish() {
    super.finish(this.isSuccess ? 100 : 0)
  }
}
