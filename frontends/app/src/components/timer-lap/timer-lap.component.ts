import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  OnDestroy,
  OnInit,
} from "@angular/core"

import { Subscription} from "rxjs"
import { TimerService } from "../../services"

@Component({
  selector: "timer-lap",
  templateUrl: "./timer-lap.component.html",
  styleUrls: [ "./timer-lap.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerLapComponent implements OnInit, OnDestroy {
  constructor(
    private _elRef: ElementRef<HTMLElement>,
    private _timerService: TimerService,
  ){}

  private _timerSubscriber!: Subscription

  ngOnInit() {
    if (this._timerSubscriber) this._timerSubscriber.unsubscribe()
    this._timerSubscriber = this._timerService.lapTimer.subscribe(value => this._setValue(value))
  }

  ngOnDestroy() {
    if (this._timerSubscriber) this._timerSubscriber.unsubscribe()
  }

  private _setValue([limit, value]: [number, number]) {
    const element = this._elRef.nativeElement
    if (limit <= 0) {
      window.requestAnimationFrame(() => {
        element.classList.remove("animate")
        element.style.setProperty("--value", "0")
        window.requestAnimationFrame(() => {
          element.classList.add("animate")
        })
      })
      return
    }

    value = Math.round(value / (limit - 1) * 100000) / 100000
    window.requestAnimationFrame(() => {
      element.style.setProperty("--value", String(value))
    })
  }
}
