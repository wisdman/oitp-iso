import { ChangeDetectionStrategy, Component } from "@angular/core"

import { AbstractTrainer } from "../abstract"
import { ITextReadingConfig } from "./text-reading.interfaces"

@Component({
  selector: "trainer-text-reading",
  templateUrl: "./text-reading.trainer.html",
  styleUrls: [ "./text-reading.trainer.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextReadingTrainer extends AbstractTrainer<ITextReadingConfig> {

  init() {
    this.fullscreenService.unlock()
    this.preview()
  }
}
