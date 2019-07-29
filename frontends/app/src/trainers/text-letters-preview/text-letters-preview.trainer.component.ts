import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { AbstractTrainerComponent } from "../abstract"

import { ITextLettersPreviewTrainerConfig } from "./text-letters-preview.trainer.interfaces"

@Component({
  selector: "trainer-text-letters-preview",
  templateUrl: "./text-letters-preview.trainer.component.html",
  styleUrls: [ "./text-letters-preview.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextLettersPreviewTrainerComponent
  extends AbstractTrainerComponent<ITextLettersPreviewTrainerConfig> {

  init() {
    this.fullscreenService.unlock()
    this.preview()
  }

  timeout() {
    this.finish()
  }
}
