import { Injectable } from "@angular/core"
import { HttpClient } from  "@angular/common/http"

import {
  concat,
  from,
  of,
  Subject,
} from "rxjs"

import {
  mergeMap,
  share,
  switchMap,
  zip,
} from "rxjs/operators"

import {
  API_TRAINING_EVERYDAY,
  API_TRAINING_ONCE,
} from "../app.config"

import { ITraining } from "../trainers"

import {
  TimerService,
} from "./timer.service"

@Injectable({ providedIn: "root" })
export class TrainingService {

  constructor(
    private _httpClient:HttpClient,
    private _timerService: TimerService,
  ) {}

  private _training: Subject<string> = new Subject<string>()
  initTraining(type: "everyday" | "once") {
    switch (type) {
      case "everyday":
        this._training.next(API_TRAINING_EVERYDAY)
        return
      case "once":
        this._training.next(API_TRAINING_ONCE)
        return
    }
    throw TypeError("Incorrect training type")
  }

  private _stepSubject: Subject<undefined> =  new Subject<undefined>()
  step() {
    this._stepSubject.next()
  }

  config = this._training.pipe(
    switchMap(url => this._httpClient.get<ITraining>(url)),
    mergeMap(training => {
      this._timerService.setGlobalTimeout(training.timeLimit || 0)
      return concat(from(training.trainers), of(undefined))
    }),
    zip(this._stepSubject, value => value),
    share(),
  )
}
