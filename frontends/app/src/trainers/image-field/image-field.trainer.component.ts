import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import {
  AbstractTrainerComponent,
} from "../abstract"

import {
  IImageFieldItem,
  IImageFieldTrainerConfig,
  IImageFieldTrainerResult,
} from "./image-field.trainer.interfaces"

@Component({
  selector: "trainer-image-field",
  templateUrl: "./image-field.trainer.component.html",
  styleUrls: [ "./image-field.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageFieldTrainerComponent
extends AbstractTrainerComponent<IImageFieldTrainerConfig, IImageFieldTrainerResult> {

  items!: Array<IImageFieldItem>

  init() {
    const vertex = this.config.items.length
    const angle = 360 / vertex
    const radius = Math.min(this.width, this.height) / 4
    const randomTheta = Math.floor(Math.random() * 100)

    this.items = this.config.items.map((data, i) => {
      const theta = randomTheta + (Math.PI * angle * i) / 180
      const dx = radius * Math.cos(theta)
      const dy = radius * Math.sin(theta)
      const transform = `translate(${dx}px, ${dy}px)`
      return {data: `/icons/${data}.svg`, transform}
    })

    this.setTimeout(this.config.timeLimit)
  }
}
