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
  API_TRAINING_RESULT,
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

  private _resultsBuffer:  Array<ITrainerResult> = []

  results = this._trainingConfig.pipe(
    switchMap(() => this._results),
    tap(result => DEBUG && console.log("RESULT:", result)),
    tap(result => {
      if (this._resultsBuffer.length === 0) {
        this._resultsBuffer = [result]
        return
      }

      const trainingId = this._resultsBuffer[this._resultsBuffer.length - 1].training
      if (trainingId !== result.training) {
        this._resultsBuffer = [result]
        return
      }

      this._resultsBuffer = [...this._resultsBuffer, result]
    })
  )

  config = this._trainingConfig.pipe(
    mergeMap(training => concat(
      of({
        id: "greeting",
        ui: "greeting",
        type: training.type,
        playTimeLimit: 0,
        previewTimeLimit: 0,
        training: training.id,
      } as IGreetingTrainerConfig),
      from(training.trainers).pipe(map(config => ({...config, training: training.id}) )),
      of({
        id: "result",
        ui: "result",
        type: training.type,
        playTimeLimit: 0,
        previewTimeLimit: 0,
        training: training.id,
      } as IResultTrainerConfig),
    )),
    zip(concat(of(undefined), this.results), value => value),
    tap(config => DEBUG && console.log("CONFIG:", config)),
    share(),
  )

  finish() {
    const trainingId = this._resultsBuffer[this._resultsBuffer.length - 1].training
    return this._httpClient.put<number>(`${API_TRAINING_RESULT}/${trainingId}`, this._resultsBuffer)
  }
}
