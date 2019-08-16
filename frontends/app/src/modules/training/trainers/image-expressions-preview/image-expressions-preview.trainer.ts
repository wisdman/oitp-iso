import { ChangeDetectionStrategy, Component } from "@angular/core"

import { AbstractTrainer } from "../abstract"
import { IImageExpressionsPreviewConfig } from "./image-expressions-preview.interfaces"

const ASSETS_EXPRESSIONS = "/assets/expressions"

@Component({
  selector: "trainer-image-expressions-preview",
  templateUrl: "./image-expressions-preview.trainer.html",
  styleUrls: [ "./image-expressions-preview.trainer.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageExpressionsPreviewTrainer extends AbstractTrainer<IImageExpressionsPreviewConfig> {

  getSrcset(id: number, type: "jpg" | "webp" = "jpg") {
    return `${ASSETS_EXPRESSIONS}/${id}.${type}`
  }

  init() {
    this.fullscreenService.unlock()
    this.preview()
  }

  timeout() {
    this.finish()
  }
}
