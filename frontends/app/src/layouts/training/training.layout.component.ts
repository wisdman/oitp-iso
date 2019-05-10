import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  OnInit,
} from "@angular/core"

import { ActivatedRoute, Router } from "@angular/router"

import {
  Subject,
  Subscription,
} from "rxjs"

import { zip } from "rxjs/operators"

import {
  LapTimerService,
  TrainingService,
} from "../../services"

import {
  ITrainerConfigs,
  ITrainerResults,
} from "../../trainers"

@Component({
  selector: "training-layout",
  templateUrl: "./training.layout.component.html",
  styleUrls: [ "./training.layout.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingLayoutComponent implements OnInit, OnDestroy {

  constructor(
    private _cdr: ChangeDetectorRef,
    private _lapTimerService: LapTimerService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _trainingService: TrainingService,
  ) {}

  private _stepSubject!: Subject<true>
  config?: ITrainerConfigs

  onResult(result: ITrainerResults) {
    if (result.isFinish) {
      this._stepSubject.next(true)
    }
  }

  onTimeout() {
    this._stepSubject.next(true)
  }

  mode: "greeting" | "game" | "result" = "greeting"
  onStart() {
    this.mode = "game"
    this._trainingService.isGlobalTimerEnabled = true
    this._stepSubject.next(true)
  }

  onFinish() {
     // this.mode = "result"
     this._trainingService.isGlobalTimerEnabled = false
  }

  private _routeParamsSubscriber!: Subscription
  private _trainingSubscriber!: Subscription

  ngOnInit() {
    this.mode = "greeting"
    this._stepSubject = new Subject<true>()

    this._routeParamsSubscriber = this._route.params.subscribe(params => {
      this._trainingSubscriber = this._trainingService
                                      .getTraining(params.type)
                                      .pipe(
                                        zip(this._stepSubject, value => value)
                                      ).subscribe(
                                        config => {
                                          this._lapTimerService.setLapTimeout(0)
                                          this.config = config
                                          this._cdr.markForCheck()
                                          console.log(this.config)
                                        },
                                        error => console.error(error),
                                        () => this.onFinish()
                                      )
    })
  }

  ngOnDestroy() {
    if (this._trainingSubscriber) this._trainingSubscriber.unsubscribe()
    if (this._routeParamsSubscriber) this._routeParamsSubscriber.unsubscribe()
  }

  onGoDashboard() {
    this._router.navigate(["/"])
  }
}
