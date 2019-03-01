import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core"
import { Router } from "@angular/router"

import { timer, interval, Subscription } from "rxjs"
import { takeUntil } from "rxjs/operators"

@Component({
  selector: "trainer-root-layout",
  templateUrl: "./trainer.root-layout.component.html",
  styleUrls: [ "./trainer.root-layout.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainerRootLayoutComponent {

  program = [{
    trainer: "number-tables",
    config: {
      limit: 30,
      result: true,
      columns: 3,
      rows: 3,
      start: 0,
      last: 9,
      matrix: Array.from(Array(9), (_, i) =>({ value: ++i })).sort(() => Math.random() - 0.5),
    }
  },{
    trainer: "number-tables",
    config: {
      limit: 30,
      result: true,
      columns: 4,
      rows: 4,
      start: 0,
      last: 16,
      matrix: Array.from(Array(16), (_, i) =>({ value: ++i })).sort(() => Math.random() - 0.5),
    }
  },{
    trainer: "number-tables",
    config: {
      limit: 30,
      result: true,
      columns: 4,
      rows: 4,
      start: 0,
      last: 16,
      matrix: Array.from(Array(16), (_, i) =>({ value: ++i })).sort(() => Math.random() - 0.5),
    }
  }]

  step: number = 0

  constructor(
    private _router: Router,
    private _cdr: ChangeDetectorRef,
  ){}

  get trainer() {
    return this.program[this.step].trainer
  }

  get config() {
    return this.program[this.step].config || { limit: 0 }
  }

  result: {
    success: number,
    error: number,
    step: number,
    timeout: number,
  } = {
    success: 0,
    error: 0,
    step: 0,
    timeout: 0,
  }

  status: "greeting" | "training" | "result" = "greeting"

  timer: number = 0
  timerSubscriber?: Subscription

  private resetTimer() {
    if (this.timerSubscriber !== undefined) {
      this.timerSubscriber.unsubscribe()
      this.timerSubscriber = undefined
    }
    this.timer = 0
  }

  onLetsgo() {

    this.status = "training"
    this.resetTimer()

    let tik = interval(1000)
    if (this.config.limit > 0) {
      tik = tik.pipe(takeUntil(timer(this.config.limit * 1000)))
      this.timer = this.config.limit

      this.timerSubscriber = tik.subscribe(
                               () => {
                                 this.timer--
                                 this._cdr.detectChanges()
                               },
                               error => console.error(error),
                               () => { this.onFinish() }
                             )
    }
  }

  reval: number = Math.floor(Math.random() * (90 - 80) ) + 80;

  onResult(result: {
    success: number,
    error: number,
    step: number,
    isFinish: false,
  }) {
    this.result = {...this.result, ...result}
    if (result.isFinish) {
      this.onFinish()
    }
  }

  onFinish() {
    this.result = { ...this.result, timeout: this.timer }
    this.resetTimer()
    this.step++

    if (this.step < this.program.length) {
      this.onLetsgo()
      this._cdr.detectChanges()
      return
    }

    this.reval = Math.floor(Math.random() * (90 - 80) ) + 80;
    this.status = "result"
    this._cdr.detectChanges()
  }

  onClose(event: Event) {
    event.preventDefault()
    this.resetTimer()
    this._router.navigateByUrl("/")
  }

  onEnd(event: Event) {
    event.preventDefault()
    this.resetTimer()

    let brain = Number.parseInt(localStorage.getItem("brainCharge") || "") || 69
    localStorage.setItem("brainCharge", String(++brain))
    this._router.navigateByUrl("/")
  }
}
