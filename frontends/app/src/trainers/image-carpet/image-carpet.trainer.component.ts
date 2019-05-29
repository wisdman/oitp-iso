import {
  Component,
  ChangeDetectionStrategy,
} from "@angular/core"

import {
  AbstractTrainerComponent,
} from "../abstract"

import {
  IImageCarpetTrainerConfig,
  IImageCarpetTrainerResult,
} from "./image-carpet.trainer.interfaces"

@Component({
  selector: "trainer-image-carpet",
  templateUrl: "./image-carpet.trainer.component.html",
  styleUrls: [ "./image-carpet.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCarpetTrainerComponent
  extends AbstractTrainerComponent<IImageCarpetTrainerConfig, IImageCarpetTrainerResult> {

  init() {
    this.mode = "show"
    this.setTimeout(this.config.timeLimit)
  }
}
