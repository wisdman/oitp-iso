import { ChangeDetectionStrategy, Component } from "@angular/core"

import { AbstractTrainer } from "../abstract"
import { ITextLettersPreviewConfig } from "./text-letters-preview.interfaces"

@Component({
  selector: "trainer-text-letters-preview",
  templateUrl: "./text-letters-preview.trainer.html",
  styleUrls: [ "./text-letters-preview.trainer.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextLettersPreviewTrainer extends AbstractTrainer<ITextLettersPreviewConfig> {

  init() {
    this.fullscreenService.unlock()
    this.preview()
  }

  timeout() {
    this.finish()
  }
}
