import {
  Component,
  ChangeDetectionStrategy,
} from "@angular/core"

import {
  AbstractTrainerComponent,
} from "../abstract"

import {
  IImageExpressionsTrainerConfig,
  IImageExpressionsTrainerPage,
  IImageExpressionsTrainerResult,
} from "./image-expressions.trainer.interfaces"

@Component({
  selector: "trainer-image-expressions",
  templateUrl: "./image-expressions.trainer.component.html",
  styleUrls: [ "./image-expressions.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageExpressionsTrainerComponent
  extends AbstractTrainerComponent<IImageExpressionsTrainerConfig, IImageExpressionsTrainerResult> {

  pages!: Array<IImageExpressionsTrainerPage & {userData: string}>
  currentPage: number = -1

  get page() {
    if (this.currentPage < 0) {
      return undefined
    }
    return this.pages[this.currentPage]
  }

  init() {
    this.keypadService.show("RU")

    this.currentPage = -1
    this.pages = this.config.pages
                            .sort(() => Math.random() - 0.5)
                            .map(value => ({...value, userData: ""}))
    this.mode = "show"
    this._step()
  }

  destroy() {
    this.keypadService.hide()
  }

  private _play() {
    this.currentPage = -1
    this.pages = this.pages.sort(() => Math.random() - 0.5)
    this.mode = "play"
    this._step()
  }

  private _step() {
    this.currentPage++
    // if (this.mode === "show"){
    //   this.setTimeout(this.config.showTimeLimit)
    // } else if (this.mode === "play"){
    //   this.setTimeout(this.config.playTimeLimit)
    // }
  }

  timeout() {
    switch (this.mode) {
      case "show":
        if (this.currentPage >= this.pages.length - 1) {
          this._play()
        } else {
          this._step()
        }
        break

      case "play":
        if (this.currentPage >= this.pages.length - 1) {
          super.timeout()
        } else {
          this._step()
        }
        break
    }
    this.markForCheck()
  }

  onButtonTouch() {
    switch (this.mode) {
      case "show":
        if (this.currentPage >= this.pages.length - 1) {
          this._play()
        } else {
          this._step()
        }
        break

      case "play":
        if (this.currentPage >= this.pages.length - 1) {
          this.finish()
        } else {
          this._step()
        }
        break
    }
    this.markForCheck()
  }

}
