import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  OnDestroy,
  OnInit,
} from "@angular/core"

import { Subscription} from "rxjs"
import { TimerLapService } from "../../services"

@Component({
  selector: "lap-timer",
  templateUrl: "./lap-timer.component.html",
  styleUrls: [ "./lap-timer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LapTimerComponent implements OnInit, OnDestroy {
  constructor(
    private _el: ElementRef<HTMLElement>,
    private _timerLapService: TimerLapService,
  ){}

  private _lapTimerSubscriber!: Subscription

  ngOnInit() {
    this._lapTimerSubscriber = this._timerLapService.timer.subscribe(timeout => this._initAnimations(timeout))
  }

  ngOnDestroy() {
    if (this._lapTimerSubscriber) this._lapTimerSubscriber.unsubscribe()
  }

  private _initAnimations(timeout: number) {
    window.requestAnimationFrame(() => {
      this._el.nativeElement.style.setProperty("--limit", "0")
      this._el.nativeElement.style.setProperty("--animation", "none")
      if (timeout <= 0) return
      window.requestAnimationFrame(() => {
        this._el.nativeElement.style.setProperty("--limit", String(timeout))
        this._el.nativeElement.style.setProperty("--animation", "lapProgress")

      })
    })
  }
}
