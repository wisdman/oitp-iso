import { Injectable } from "@angular/core"

import { BehaviorSubject, Subject, timer, of } from "rxjs"
import { distinctUntilChanged, filter, map, scan, share, switchMap, withLatestFrom } from "rxjs/operators"

@Injectable()
export class TimerService {

  private _isPaused: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  pause() {
    this._isPaused.next(true)
  }
  continue() {
    this._isPaused.next(false)
  }

  private _globalTimerSubject = new Subject<number>()
  setGlobalTimeout(value: number) {
    this._globalTimerSubject.next(value)
  }

  globalTimer = this._globalTimerSubject
                    .pipe(
                      switchMap(start =>
                        timer(0, 1000).pipe(
                          withLatestFrom(this._isPaused),
                          scan( (current, [_, isPaused]) => isPaused ? current : --current, start)
                        )
                      ),
                      share(),
                    )

  globalTimeout = this.globalTimer.pipe(filter(value => value === 0), share())

  private _lapTimerSubject = new Subject<number>()
  setLapTimeout(value: number) {
    this._lapTimerSubject.next(0)
    this._lapTimerSubject.next(value / 1000) // TODO
  }

  lapTimer = this._lapTimerSubject
                 .pipe(
                   switchMap(limit => {
                     if (limit <= 0) return of([0,0] as [number, number])

                     return this.globalTimer.pipe(
                       scan(current => ++current, 0),
                       map(value => (value > limit ? [limit, limit] : [limit, value]) as [number, number]),
                     )
                   }),
                   distinctUntilChanged((A, B) => A[0] === B[0] && A[1] === B[1]),
                   share(),
                 )

  lapTimeout = this.lapTimer.pipe(filter(([limit, value]) => limit > 0 && value === limit), share())
}
