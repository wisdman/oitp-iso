import { Component, ChangeDetectionStrategy } from "@angular/core"

import { AbstractTrainer } from "../abstract"

import { IImageDifferencesConfig } from "./image-differences.interfaces"

@Component({
  selector: "trainer-image-differences",
  templateUrl: "./image-differences.trainer.html",
  styleUrls: ["./image-differences.trainer.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageDifferencesTrainer extends AbstractTrainer<IImageDifferencesConfig> {}
