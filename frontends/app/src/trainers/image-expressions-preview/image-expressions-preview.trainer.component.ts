import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { ASSETS_EXPRESSIONS } from "../../app.config"

import { AbstractTrainerComponent } from "../abstract"

import { IImageExpressionsPreviewTrainerConfig } from "./image-expressions-preview.trainer.interfaces"

@Component({
  selector: "trainer-image-expressions-preview",
  templateUrl: "./image-expressions-preview.trainer.component.html",
  styleUrls: [ "./image-expressions-preview.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageExpressionsPreviewTrainerComponent
extends AbstractTrainerComponent<IImageExpressionsPreviewTrainerConfig> {

  getSrcset(id: number, type: "jpg" | "webp" = "jpg") {
    return `${ASSETS_EXPRESSIONS}/${id}.${type}`
  }

  init() {
    this.fullscreenService.unlock()
  }

  timeout() {
    super.timeout()
    this.finish()
  }
}
