import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { Subscription } from "rxjs"

import { AbstractTrainerComponent } from "../abstract"

import { IResultTrainerConfig } from "./result.trainer.interfaces"

@Component({
  selector: "trainer-result",
  templateUrl: "./result.trainer.component.html",
  styleUrls: [ "./result.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultTrainerComponent
  extends AbstractTrainerComponent<IResultTrainerConfig> {

  r: number = 0
  private _resultsSubscriber!: Subscription

  init() {
    this.timerService.pause()
    this.r = 0

    if (this._resultsSubscriber) this._resultsSubscriber.unsubscribe()
    this._resultsSubscriber = this.trainingService.finish().subscribe(result => {
      this.result()
      this.r = result
    })

    this.preview()
  }

  destroy() {
    if (this._resultsSubscriber) this._resultsSubscriber.unsubscribe()
  }
}
