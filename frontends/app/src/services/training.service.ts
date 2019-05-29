import { Injectable } from "@angular/core"
import { HttpClient } from  "@angular/common/http"

import {
  from,
  Observable,
  concat,
  of,
} from "rxjs"

import {
  switchMap,
} from "rxjs/operators"

import {
  API_TRAINING_EVERYDAY,
  API_TRAINING_ONCE,
} from "../app.config"

import {
  ITraining,
  ITrainerConfigs,
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

  getTraining(type: "everyday" | "once"): Observable<ITrainerConfigs | undefined> {
    var config: Observable<ITraining>

    switch (type) {
      case "everyday":
        config = this._httpClient.get<ITraining>(API_TRAINING_EVERYDAY)
        break
      case "once":
        config = this._httpClient.get<ITraining>(API_TRAINING_ONCE)
        break
      default:
        throw TypeError("Incorrect training type")
    }

    return config.pipe(
      switchMap(training => {
        this._timerService.setGlobalTimeout(training.timeLimit || 0)
        return concat(from(training.trainers), of(undefined))
      })
    )
  }
}
