import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core"

import {
  ActivatedRoute,
  Router,
} from "@angular/router"

import { Subscription } from "rxjs"

import {
  KeypadService,
  PointerService,
  TimerService,
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
    private _keypadService: KeypadService,
    private _pointerService: PointerService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _timerService: TimerService,
    private _trainingService: TrainingService,
  ) {}

  mode: "greeting" | "game" | "result" = "greeting"
  config!: ITrainerConfigs

  onResult(result: ITrainerResults) {
    if (result.isFinish) {
      this._trainingService.step()
    }
  }

  onStart() {
    this.mode = "game"
    this._trainingService.step()
    this._timerService.continue()
  }

  private _routeParamsSubscriber!: Subscription
  private _trainingSubscriber!: Subscription

  ngOnInit() {
    this._timerService.pause()
    this._pointerService.lockScroll()
    this._keypadService.lockKeypad()
    this.mode = "greeting"

    if (this._trainingSubscriber) this._trainingSubscriber.unsubscribe()
    this._trainingSubscriber = this._trainingService.config.subscribe(config => {
      if (config === undefined) {
        this.mode = "result"
        this._cdr.markForCheck()
        return
      }

      this.config = config
      this._cdr.markForCheck()
      console.log(this.config)
    })

    if (this._routeParamsSubscriber) this._routeParamsSubscriber.unsubscribe()
    this._routeParamsSubscriber = this._route.params.subscribe(params => this._trainingService.initTraining(params.type))
  }

  ngOnDestroy() {
    if (this._routeParamsSubscriber) this._routeParamsSubscriber.unsubscribe()
    if (this._trainingSubscriber) this._trainingSubscriber.unsubscribe()
    this._keypadService.unlockKeypad()
    this._pointerService.unlockScroll()
  }

  onGoDashboard() {
    this._router.navigate(["/"])
  }
}
