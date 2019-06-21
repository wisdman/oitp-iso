import {
  Component,
  ChangeDetectionStrategy,
} from "@angular/core"

import { Subscription } from "rxjs"

import { AbstractTrainerComponent } from "../abstract"

import {
  IImageCarpetTrainerConfig,
  IImageCarpetTrainerResult,
} from "./image-carpet.trainer.interfaces"

import {
  ICarperItem
} from "../../services"

@Component({
  selector: "trainer-image-carpet",
  templateUrl: "./image-carpet.trainer.component.html",
  styleUrls: [ "./image-carpet.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCarpetTrainerComponent
extends AbstractTrainerComponent<IImageCarpetTrainerConfig, IImageCarpetTrainerResult> {

  mode: "show" | "play" | "result" = "show"

  items!: Array<ICarperItem>

  private _carpetSubscription!: Subscription

  init() {
    this.mode = "show"

    this._carpetSubscription = this.carpetService.carpet.subscribe(carpet => {
      this.matrixWidth = carpet.width
      this.matrixHeight = carpet.height
      this.items = carpet.items
      this.markForCheck()

      this.mode = "show"
      this.setTimeout(this.config.showTimeLimit)
    })

    this.carpetService.getCarpet(this.config.item)
  }

  destroy() {
    this._carpetSubscription.unsubscribe()
  }

  startPlay() {
    this.mode = "play"
    this.setTimeout(this.config.playTimeLimit)
    this.markForCheck()
  }

  showResult() {
    this.finish()
  }

  timeout() {
    switch (this.mode) {
      case "show":
        this.startPlay()
        return

     case "play":
        this.showResult()
        return
    }
  }
}
