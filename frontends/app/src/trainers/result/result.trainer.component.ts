import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { Subscription } from "rxjs"

import { AbstractTrainerComponent } from "../abstract"

import { API_RESULT } from "../../app.config"

import {
  IResultTrainerConfig,
  IResultTrainerResult,
} from "./result.trainer.interfaces"

@Component({
  selector: "trainer-result",
  templateUrl: "./result.trainer.component.html",
  styleUrls: [ "./result.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultTrainerComponent
extends AbstractTrainerComponent<IResultTrainerConfig, IResultTrainerResult> {

  r: number = 70 + Math.ceil(Math.random()*20)

  private _httpSubscriber!: Subscription

  init() {
    this.timerService.pause()

    this._httpSubscriber = this.httpClient.get<{}>(`${API_RESULT}/${this.config.training}/finish`).subscribe(result => {
      console.dir(result)
    })
  }

  destroy() {
    this._httpSubscriber.unsubscribe()
  }
}
