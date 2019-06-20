import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { ASSETS_EXPRESSIONS } from "../../app.config"

import { AbstractTrainerComponent } from "../abstract"

import {
  IImageExpressionsTrainerConfig,
  IImageExpressionsTrainerResult,
} from "./image-expressions.trainer.interfaces"

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

  init() {
    this.setTimeout(this.config.showTimeLimit)
  }

  timeout() {
    this.finish()
  }
}
