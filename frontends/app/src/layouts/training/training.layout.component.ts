import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
} from "@angular/core"

import { ActivatedRoute } from "@angular/router"

import { Subscription, timer, interval } from "rxjs"
import { takeUntil } from "rxjs/operators"

import {
  TTrainingConfig,
} from "../../trainers"

import {
  TrainingService
} from "../../services"

@Component({
  selector: "training-layout",
  templateUrl: "./training.layout.component.html",
  styleUrls: [ "./training.layout.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingLayoutComponent implements OnInit, OnDestroy {

  @ViewChild("fieldNode") fieldRef?: ElementRef<SVGPathElement>
  @ViewChild("progressNode") progressRef?: ElementRef<SVGPathElement>

  config?: TTrainingConfig

  constructor(
    private _cdr: ChangeDetectorRef,
    private _trainingService: TrainingService,
    private _route: ActivatedRoute,
  ) {}

  step: "start" | "progress" | "finish" = "start"

  lapTimer: number = 0
  private _lapTimerSubscriber?: Subscription

  private _lapTimerStop() {
    if (this._lapTimerSubscriber !== undefined) {
      this._lapTimerSubscriber.unsubscribe()
      this._lapTimerSubscriber = undefined
    }
    this.lapTimer = 0
    this._cdr.detectChanges()
  }

  private _lapProgressStart(limit: number = 0) {
    this._lapTimerStop()
    if (limit > 0) {
      const tik = interval(1000).pipe(takeUntil(timer(limit * 1000)))
      this.lapTimer = limit
      this._cdr.markForCheck()
      this._lapTimerSubscriber = tik.subscribe(
                                  () => {},
                                  error => console.error(error),
                                  () => {
                                    this._lapTimerStop()
                                    this.onLapTimeout()
                                  }
                                )
    }
  }


  globalTimer: number = 0
  private _globalTimerSubscriber?: Subscription

  private _globalTimerStop() {
    if (this._globalTimerSubscriber !== undefined) {
      this._globalTimerSubscriber.unsubscribe()
      this._globalTimerSubscriber = undefined
    }
    this.globalTimer = 0
    this._cdr.markForCheck()
  }

  private _globalTimerStart(limit: number = 0) {
    this._globalTimerStop()
    if (limit > 0) {
      const tik = interval(1000).pipe(takeUntil(timer(limit * 1000)))
      this.globalTimer = limit
      this._cdr.markForCheck()
      this._globalTimerSubscriber = tik.subscribe(
                                      () => {
                                        this.globalTimer--
                                        this._cdr.markForCheck()
                                      },
                                      error => console.error(error),
                                      () => {
                                        this._globalTimerStop()
                                        this.onGlobalTimeout()
                                      }
                                    )
    }
  }


  private _resetState() {
    this.config = undefined
    this.step = "start"
    this._lapTimerStop()
    this._globalTimerStop()
  }


  onGlobalTimeout() {
    this.step = "finish"
  }

  onLapTimeout() {
    this._lapProgressStart(10)
  }

  onStartClick() {
    this.step = "progress"
    this._globalTimerStart(1800)
    this._lapProgressStart(10)
  }

  private _routeParamsSubscriber?: Subscription

  ngOnInit() {
    this._routeParamsSubscriber = this._route.params.subscribe(params => {
      this._resetState()
      this._trainingService
          .getTraining(params.type)
          .subscribe(config => this.config = config)
    })
  }

  ngOnDestroy() {
    if (this._routeParamsSubscriber) {
      this._routeParamsSubscriber.unsubscribe()
    }
    this._lapTimerStop()
    this._globalTimerStop()
  }
}
