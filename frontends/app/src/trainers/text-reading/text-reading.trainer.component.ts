import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import {
  AbstractTrainerComponent,
} from "../abstract"

import {
  ITextReadingTrainerConfig,
  ITextReadingTrainerResult,
} from "./text-reading.trainer.interfaces"

@Component({
  selector: "trainer-text-reading",
  templateUrl: "./text-reading.trainer.component.html",
  styleUrls: [ "./text-reading.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextReadingTrainerComponent
extends AbstractTrainerComponent<ITextReadingTrainerConfig, ITextReadingTrainerResult> {

  init() {
    this.setTimeout(this.config.timeLimit)
  }

  onClick() {
    this.finish()
  }
}
