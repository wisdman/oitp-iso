import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  OnInit,
} from "@angular/core"

import { ActivatedRoute } from "@angular/router"

import { Subscription } from "rxjs"
import { map } from "rxjs/operators"

import {
  TrainingService
} from "../../services"

import {
  ITrainerResults
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
    private _route: ActivatedRoute,
    private _trainingService: TrainingService,
  ) {}

  isLoading = this._trainingService
                  .state
                  .pipe(map(state => state === "loading" || state === "uploading"))

  globalTimer = this._trainingService.globalTimer
  config = this._trainingService.config

  lapLimit: number = 0

  onResult(result: ITrainerResults) {
    if (result.isFinish) {
      this._trainingService.step()
    }
  }

  private _lapTimerSubscriber!: Subscription
  private _routeParamsSubscriber!: Subscription

  ngOnInit() {
    this._lapTimerSubscriber = this._trainingService
                                   .lapLimit
                                   .subscribe(lapLimit => {
                                     if (lapLimit > 0) {
                                       this.lapLimit = 0
                                       this._cdr.detectChanges()
                                     }

                                     this.lapLimit = lapLimit
                                     this._cdr.detectChanges()
                                   })

    this._routeParamsSubscriber = this._route
                                      .params
                                      .subscribe(params => {
                                        this._trainingService
                                            .initTraining(params.type)
                                      })
  }

  ngOnDestroy() {
    this._lapTimerSubscriber.unsubscribe()
    this._routeParamsSubscriber.unsubscribe()

    this._trainingService.resetTraining()
  }
}




