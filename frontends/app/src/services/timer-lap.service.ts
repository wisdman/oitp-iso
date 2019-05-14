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
export class TimerLapService {
  private _timerSubject = new Subject<number>()

  setTimeout(value: number) {
    this._timerSubject.next(value)
  }

  timer = this._timerSubject.pipe(
    switchMap(timeout => timeout >= 0 ? of(timeout) : of(0)),
  )

  timeout = this._timerSubject.pipe(
    switchMap(timeout => timeout >= 0 ? of(timeout).pipe(delay(timeout * 1000)) : of(0)),
    filter(timeout => timeout > 0),
  )
}
