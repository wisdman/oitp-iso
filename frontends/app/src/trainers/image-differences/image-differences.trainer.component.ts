import {
  Component,
  ChangeDetectionStrategy,
} from "@angular/core"

import {
  AbstractTrainerComponent,
} from "../abstract"

import {
  IImageDifferencesTrainerConfig,
  IImageDifferencesTrainerResult,
} from "./image-differences.trainer.interfaces"

@Component({
  selector: "trainer-image-differences",
  templateUrl: "./image-differences.trainer.component.html",
  styleUrls: [ "./image-differences.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageDifferencesTrainerComponent
  extends AbstractTrainerComponent<IImageDifferencesTrainerConfig, IImageDifferencesTrainerResult> {

  init() {
    this.mode = "show"
    this.setTimeout(this.config.timeLimit)
  }
}
