import { Injectable } from "@angular/core"

import {
  BehaviorSubject,
  from,
  interval,
  Subscription,
  timer,
  zip,
  // race,
} from "rxjs"

import {
  map,
  switchMap,
  takeUntil,
  // timeout,
} from "rxjs/operators"

import {
  RANDOM_CONFIG
} from "../common/random"

type ITrainingState = "loading" | "progress" | "uploading" | "result" | "error"

@Injectable({ providedIn: "root" })
export class TrainingService {

  private _stateSource = new BehaviorSubject<ITrainingState>("loading")
  state = this._stateSource.asObservable()

  private _trainingSource = new BehaviorSubject< "everyday" | "once" | undefined>(undefined)
  private _training = this._trainingSource
                          .asObservable()
                          .pipe(
                            switchMap(type => type && from(RANDOM_CONFIG(type)) || from(Promise.resolve(undefined)))
                          )

  private _stepSource = new BehaviorSubject<0|1>(0)

  config = zip(
             this._training
                 .pipe(
                    switchMap(value => value && from(value) || from([undefined]))
                 ),
             this._stepSource.asObservable(),
             (value) => value
           )

  trainer = this.config
                .pipe(
                  map(config => config && config.id || undefined)
                )

  lapLimit = this.config
                  .pipe(
                    map(config => config && config.timeLimit || 0)
                  )

  // lapTimer = this.config
  //                 .pipe(
  //                   map(config => {
  //                     console.log(config)
  //                     return config && config.timeLimit || 0
  //                   }),
  //                   // switchMap( limit => {
  //                   //   console.log(limit)
  //                   //   return limit > 0 ? from([1]).pipe(timeout(limit * 1000)) : from([0])
  //                   // })
  //                 ).subscribe((v) => console.log("tik", v))

  initTraining(type: "everyday" | "once") {
    this._globalTimerStart(30*60)
    this._trainingSource.next(type)
  }

  resetTraining() {
    this._globalTimerStop()
    this._trainingSource.next(undefined)
  }

  step() {
    this._stepSource.next(1)
  }

  // === Global timer ===

  private _globalTimerSource = new BehaviorSubject<number>(0)
  globalTimer = this._globalTimerSource.asObservable()

  private _globalTimerSubscriber?: Subscription

  private _globalTimerStop() {
    if (this._globalTimerSubscriber !== undefined) {
      this._globalTimerSubscriber.unsubscribe()
      this._globalTimerSubscriber = undefined
    }
    this._globalTimerSource.next(0)
  }

  private _globalTimerTimeout() {
    this._globalTimerStop()
  }

  private _globalTimerStart(limit: number) {
    this._globalTimerStop()

    if (limit <= 0) {
      return
    }

    this._globalTimerSource.next(limit)

    const tik = interval(1000).pipe(takeUntil(timer(limit * 1000)))
    this._globalTimerSubscriber = tik.subscribe(
                                    () => this._globalTimerSource.next(this._globalTimerSource.getValue() - 1),
                                    error => console.error(error),
                                    () => this._globalTimerTimeout()
                                  )
  }
}
