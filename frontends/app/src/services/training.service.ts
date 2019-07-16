import { Injectable } from "@angular/core"
import { HttpClient } from  "@angular/common/http"

import {
  concat,
  from,
  of,
  Subject,
} from "rxjs"

import {
  map,
  mergeMap,
  share,
  switchMap,
  tap,
  zip,
} from "rxjs/operators"

import {
  DEBUG,

  API_TRAINING_DEBUG,
  API_TRAINING_EVERYDAY,
  API_TRAINING_ONCE,
  API_RESULT,
} from "../app.config"

import {
  IGreetingTrainerConfig,
  IResultTrainerConfig,
  ITrainerResult,
  ITraining,
  ITrainingType,
} from "../trainers"

import {
  TimerService,
} from "./timer.service"


@Injectable({ providedIn: "root" })
export class TrainingService {

  constructor(
    private _httpClient:HttpClient,
    private _timerService: TimerService,
  ) {}

  private _results: Subject<ITrainerResult> = new Subject<ITrainerResult>()
  putResult(result: ITrainerResult) {
    this._results.next(result)
  }

  private _training: Subject<string> = new Subject<string>()
  initTraining(type: ITrainingType) {
    switch (type) {
      case "debug":
        this._training.next(API_TRAINING_DEBUG)
        return
      case "everyday":
        this._training.next(API_TRAINING_EVERYDAY)
        return
      case "once":
        this._training.next(API_TRAINING_ONCE)
        return
    }
    throw TypeError("Incorrect training type")
  }

  private _trainingConfig = this._training.pipe(
    tap(() => this._timerService.pause()),
    switchMap(url => this._httpClient.post<ITraining>(url, {})),
    tap(training => this._timerService.setGlobalTimeout(training.timeLimit || 0)),
    share(),
  )

  results = this._trainingConfig.pipe(
    switchMap(() => this._results),
    switchMap(result =>
      !result.idx ? of(result)
                  : this._httpClient.post(`${API_RESULT}/${result.training}`,result).pipe(
                      map(() => result)
                    )
    ),
    tap(result => DEBUG && console.log("RESULT:", result)),
  )

  config = this._trainingConfig.pipe(
    mergeMap(training => concat(
      of({
        id: "greeting",
        ui: "greeting",
        training: training.id,
        type: training.type,
        timeLimit: 0,
      } as IGreetingTrainerConfig),
      from(training.trainers).pipe(map(trainer => ({...trainer, training: training.id }) )),
      of({
        id: "result",
        ui: "result",
        training: training.id,
        type: training.type,
        timeLimit: 0,
      } as IResultTrainerConfig),
    )),
    zip(concat(of(undefined), this.results), value => value),
    tap(config => DEBUG && console.log("CONFIG:", config)),
    share(),
  )
}
