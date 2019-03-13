import { Injectable } from "@angular/core"

import {
  from,
  of,
  Subject,
  timer,
} from "rxjs"

import {
  filter,
  map,
  switchMap,
  tap,
  zip,
} from "rxjs/operators"

import {
  RANDOM_CONFIG
} from "../common/random"

@Injectable({ providedIn: "root" })
export class TrainingService {

  private _globalTimerSubject = new Subject<number>()
  globalTimer = this._globalTimerSubject
                    .pipe(
                      switchMap((start) => timer(0, 1000).pipe(map(s => start - s))),
                      filter(v => v > 0),
                    )

  private _lapTimerSubject = new Subject<number>()
  private _trainingSubject = new Subject<"everyday" | "once" | undefined>()
  config = this._trainingSubject
                .pipe(
                  switchMap(type => type && from(RANDOM_CONFIG(type)) || of(undefined)),
                  switchMap(value => value && from(value) || of(undefined)),
                  zip(
                    this._lapTimerSubject
                        .pipe(
                          switchMap((start) => timer(0, 1000).pipe(map(s => start - s))),
                          filter(v => v === 0),
                        ),
                    value => value
                  ),
                  tap(value => {
                    if (value === undefined) {
                      return
                    }

                    this._lapTimerSubject.next(value.timeLimit || Number.MAX_SAFE_INTEGER)

                    if (!value.globalTimeLimit) {
                      return
                    }

                    this._globalTimerSubject.next(value.globalTimeLimit)
                  }),
                )

  setTraining(type?: "everyday" | "once" | undefined) {
    this._trainingSubject.next(type)
    this._lapTimerSubject.next(0)
  }

  step() {
    this._lapTimerSubject.next(0)
  }
}
