import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
} from "@angular/core"

import { Subscription } from "rxjs"

import { ProgressService } from "../../services"

@Component({
  selector: "indicator-brain",
  templateUrl: "./indicator-brain.component.html",
  styleUrls: [ "./indicator-brain.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndicatorBrainComponent implements OnInit, OnDestroy {
  constructor(
    private _elRef:ElementRef<HTMLElement>,
    private _progressService: ProgressService,
  ) { }
  public progress = this._progressService.progressCharge

  private _progressSubscription?: Subscription

  ngOnInit() {
    if (this._progressSubscription) this._progressSubscription.unsubscribe()
    this._progressSubscription = this._progressService.progressCharge.subscribe(item => {
      window.requestAnimationFrame(()=>{
        this._elRef.nativeElement.style.setProperty("--value", `${item.average}`)
      })
    })
  }

  ngOnDestroy() {
    if (this._progressSubscription) this._progressSubscription.unsubscribe()
  }
}
