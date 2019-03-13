import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core"

import {
  from,
  Subject,
  // zip,
  // timer,
  // of,
  // race
  // merge,
  // interval,
  timer,
} from "rxjs"

import {
  filter,
  zip,
  // mapTo,
  // multicast,
  // first,
  tap,
  // race,
  // do,
  // materialize,
  map,
  // mergeAll,
  switchMap,
  // concatMap,
  // take,
  // delay,
  // audit,
  // pairwise,
//   // takeUntil,
//   // timeout,
} from "rxjs/operators"


@Component({
  selector: "login-layout",
  templateUrl: "./login.layout.component.html",
  styleUrls: [ "./login.layout.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginLayoutComponent implements OnInit {

  private _timerSubject = new Subject<number>()

  private _timer = this._timerSubject.pipe(
                                       switchMap((start) => timer(0, 1000).pipe(map(s => start - s)))

                                      )

  private _configs = from([{ value: 1, timeLimit: 0 }, { value: 2, timeLimit: 10 }, { value: 3, timeLimit: 10 }, { value: 4, timeLimit: 0 }, { value: 5, timeLimit: 0 }])
    .pipe(
          zip(this._timer.pipe(filter(v => v===0)), v => v),
          tap(v => this._timerSubject.next(v.timeLimit || Number.MAX_SAFE_INTEGER)),


          )



  // private _stepSource = new BehaviorSubject<undefined>(undefined)
  // private _step = this._stepSource.asObservable()

  // private _stepSource1 = new BehaviorSubject<0|1>(0)
  // private _stepSource2 = new BehaviorSubject<0|1>(0)

  // private _configs = from([{ value: 1, timeLimit: 0 }, { value: 2, timeLimit: 10 }, { value: 3, timeLimit: 10 }, { value: 4, timeLimit: 0 }, { value: 5, timeLimit: 0 }])
  //                 .pipe(
  //                   o =>




  config!: { value: number, timeLimit: number }

  ngOnInit() {
    // this._timer.subscribe(config => {
      // console.log("timer:", config)
      // this.config = config
    // })

    this._configs.subscribe(config => {
      console.log(config)
      // this.config = config
    })
  }

  onClick1() {
    this._timerSubject.next(0)
  }

  onClick2() {
    // this._stepSource2.next(1)
  }

}
