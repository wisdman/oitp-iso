import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { ASSETS_EXPRESSIONS } from "../../app.config"

import { AbstractTrainerComponent } from "../abstract"

import { IImageExpressionsTrainerConfig } from "./image-expressions.trainer.interfaces"

@Component({
  selector: "trainer-image-expressions",
  templateUrl: "./image-expressions.trainer.component.html",
  styleUrls: [ "./image-expressions.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageExpressionsTrainerComponent
  extends AbstractTrainerComponent<IImageExpressionsTrainerConfig> {

  getSrcset(id: number, type: "jpg" | "webp" = "jpg") {
    return `${ASSETS_EXPRESSIONS}/${id}.${type}`
  }

  private _prepareString(value: string): string {
    return value.toUpperCase()
                .replace("Й", "И")
                .replace("Ё", "Е")
                .replace(/[^0-9A-ZА-Я\s]+/ig,"")
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
