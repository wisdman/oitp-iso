import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
} from "@angular/core"

import { Subscription } from "rxjs"
import { map } from "rxjs/operators"

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
  public progress = this._progressService.progress

  private _progressSubscription?: Subscription

  ngOnInit() {
    if (this._progressSubscription) this._progressSubscription.unsubscribe()
    this._progressSubscription = this
                                    ._progressService
                                    .progress
                                    .pipe(map(p => p.charge))
                                    .subscribe(value => {
                                      window.requestAnimationFrame(()=>{
                                        this._elRef.nativeElement.style.setProperty("--value", `${value}`)
                                      })
                                    })
  }

  ngOnDestroy() {
    if (this._progressSubscription) this._progressSubscription.unsubscribe()
  }
}
