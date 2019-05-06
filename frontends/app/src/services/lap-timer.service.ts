import { Injectable } from "@angular/core"

import {
  of,
  Subject,
} from "rxjs"

import {
  filter,
  delay,
  switchMap,
} from "rxjs/operators"

@Injectable({ providedIn: "root" })
export class LapTimerService {

  private _lapTimerSubject = new Subject<number>()

  setLapTimeout(value: number) {
    this._lapTimerSubject.next(value)
  }

  lapTimer = this._lapTimerSubject.pipe(
    switchMap(timeout => timeout >= 0 ? of(timeout) : of(0)),
  )

  lapTimeout = this._lapTimerSubject.pipe(
    switchMap(timeout => timeout >= 0 ? of(timeout).pipe(delay(timeout * 1000)) : of(0)),
    filter(timeout => timeout > 0),
  )
}
