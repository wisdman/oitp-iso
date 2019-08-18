import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"

import { Subscription } from "rxjs"

import { FullscreenService, TrainingService } from "../../services"
import { ITrainerConfigs, ITrainerResult, } from "../../trainers"

@Component({
  selector: "training-layout",
  templateUrl: "./training.layout.html",
  styleUrls: [ "./training.layout.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingLayout implements OnInit, OnDestroy {

  constructor(
    private _cdr: ChangeDetectorRef,
    private _route: ActivatedRoute,
    private _router: Router,
    private _trainingService: TrainingService,
    public fullscreenService: FullscreenService,
  ) {}

  config!: ITrainerConfigs

  onResult(result: ITrainerResult) {
    if (this.config.ui === "result") {
      this._router.navigate(["/"])
      return
    }
    this._trainingService.putResult(result)
  }

  private _routeParamsSubscriber!: Subscription
  private _trainingSubscriber!: Subscription

  private _enterFullScreen() {
    document.documentElement && document.documentElement.requestFullscreen && document.documentElement.requestFullscreen()
  }

  private _exitFullScreen() {
    document.exitFullscreen && document.exitFullscreen()
  }

  ngOnInit() {
    this._trainingSubscriber = this._trainingService.config.subscribe(config => {
      this.config = config
      this._cdr.markForCheck()
    })

    this._routeParamsSubscriber = this._route.params.subscribe(params => this._trainingService.initTraining(params.type))
    this._enterFullScreen()
  }

  ngOnDestroy() {
    this._exitFullScreen()
    this._routeParamsSubscriber.unsubscribe()
    this._trainingSubscriber.unsubscribe()
  }
}
