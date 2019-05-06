import { Component, ChangeDetectionStrategy } from "@angular/core"

import {
  TrainingService
} from "../../services"

@Component({
  selector: "global-timer",
  templateUrl: "./global-timer.component.html",
  styleUrls: [ "./global-timer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalTimerComponent {
  constructor(private _trainingService: TrainingService){}
  globalTimer = this._trainingService.globalTimer
}
