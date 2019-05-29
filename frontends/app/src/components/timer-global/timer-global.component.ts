import { Component, ChangeDetectionStrategy } from "@angular/core"

import {
  TimerService
} from "../../services"

@Component({
  selector: "timer-global",
  templateUrl: "./timer-global.component.html",
  styleUrls: [ "./timer-global.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerGlobalComponent {
  constructor(private _timerService: TimerService){}
  globalTimer = this._timerService.globalTimer
}
