import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
} from "@angular/core"

import { ActivatedRoute } from "@angular/router"
import { Subscription } from "rxjs"

import {
  TrainingService
} from "../../services"

import {
  ITrainerConfigs,
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
    private _route: ActivatedRoute,
    private _trainingService: TrainingService,
    private _cdr: ChangeDetectorRef,
  ) {}

  globalTimer = this._trainingService.globalTimer
  config?: ITrainerConfigs

  onResult(result: ITrainerResults) {
    if (result.isFinish) {
      this._trainingService.step()
    }
  }

  private _trainingSubscriber!: Subscription
  private _routeParamsSubscriber!: Subscription

  ngOnInit() {
    this._trainingSubscriber = this._trainingService.config.subscribe((config) => {
      this.config = config
      console.log(this.config)
      this._cdr.markForCheck()
    })


    this._routeParamsSubscriber = this._route
                                      .params
                                      .subscribe(params => {
                                        this._trainingService
                                            .setTraining(params.type)
                                      })
  }

  ngOnDestroy() {
    this._routeParamsSubscriber.unsubscribe()
    this._trainingSubscriber.unsubscribe()
    this._trainingService.setTraining()
  }
}




