import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  OnDestroy,
  OnInit,
  HostListener,
} from "@angular/core"

import { ActivatedRoute } from "@angular/router"
import { Subscription } from "rxjs"

import {
  TrainingService
} from "../../services"

import {
  ITrainerConfigs,
  ITrainerResults,
  IGameFieldSize,
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
    private _el: ElementRef
  ) {}

  size!: IGameFieldSize

  private _updateSize() {
    if (this._el.nativeElement) {
      const { width, height } = this._el.nativeElement.getBoundingClientRect()
      this.size = {...this.size, width, height}
    }
  }

  @HostListener("window:resize")
  onResize() {
    this._updateSize()
  }

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
    this._updateSize()

    this._trainingSubscriber = this._trainingService
                                    .config
                                    .subscribe((config) => {
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




