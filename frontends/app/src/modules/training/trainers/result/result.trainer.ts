import { ChangeDetectionStrategy, Component } from "@angular/core"

import { Subscription } from "rxjs"

import { AbstractTrainer } from "../abstract"
import { IResultConfig } from "./result.interfaces"

@Component({
  selector: "trainer-result",
  templateUrl: "./result.trainer.html",
  styleUrls: [ "./result.trainer.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultTrainer extends AbstractTrainer<IResultConfig> {

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
