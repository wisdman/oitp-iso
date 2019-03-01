import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core"
import { Router } from "@angular/router"

import { timer, interval, Subscription } from "rxjs"
import { takeUntil } from "rxjs/operators"

@Component({
  selector: "training-root-layout",
  templateUrl: "./training.root-layout.component.html",
  styleUrls: [ "./training.root-layout.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingRootLayoutComponent {

  program = [{
    trainer: "info-text",
    config: {
      html: ARTICLE,
      limit: 300,
      result: false,
    }
  },{
    trainer: "question",
    config: {
      html: "Маленькие дети уходят с первого занятия с желанием вернуться?",
      limit: 60,
      result: true,
      answers: [{
        html: "Да",
        value: 1
      },{
        html: "Нет",
        value: 0
      }].sort(() => Math.random() - 0.5)
    }
  },{
    trainer: "number-tables",
    config: {
      limit: 30,
      result: true,
      columns: 5,
      rows: 5,
      start: 0,
      last: 25,
      matrix: Array.from(Array(25), (_, i) =>({ value: ++i })).sort(() => Math.random() - 0.5),
    }
  },{
    trainer: "number-tables",
    config: {
      limit: 30,
      result: true,
      columns: 3,
      rows: 3,
      start: 0,
      last: 9,
      matrix: [
      1,4,6,
      7,2,5,
      9,8,3,
      ].map(value =>({value}))
    }
  },{
    trainer: "number-tables",
    config: {
      limit: 30,
      result: true,
      columns: 5,
      rows: 5,
      start: 0,
      last: 25,
      matrix: Array.from(Array(25), (_, i) =>({ value: ++i })).sort(() => Math.random() - 0.5),
    }
  },{
    trainer: "question",
    config: {
      html: "Мотивация – не является главным условием для начала занятий",
      limit: 60,
      result: true,
      answers: [{
        html: "Утверждение ложно",
        value: 1
      },{
        html: "Утверждение истино",
        value: 0
      }].sort(() => Math.random() - 0.5)
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
    localStorage.setItem("isEverydayEnded", "true")

    let brain = Number.parseInt(localStorage.getItem("brainCharge") || "") || 69
    localStorage.setItem("brainCharge", String(++brain))

    let fiveDaysDiscount = Number.parseInt(localStorage.getItem("fiveDaysDiscount") || "") || 1
    localStorage.setItem("fiveDaysDiscount", String(++fiveDaysDiscount))

    this._router.navigateByUrl("/")
  }
}

const ARTICLE = `
<h1>Статья № 8</h1>
<p>Социальное поведение подростков после обучения в Школе скорочтения, управления информации выравнивается не потому, что ему бесконечно объясняли, что можно, то нельзя (нам некогда заниматься «воспитательными» задачами), а потому, что начинает работать весь головной мозг. Следствие - уходят проблемы в обучении и проблемы социальные.</p>
<p>Во время диагностики мы выявляем, что у ребенка отлично, что хорошо, какие слабые места. Даже маленькие дети уходят с первого занятия с желанием вернуться, учиться. Мотивация – главное условие для начала занятий. Наши ученики играют в поисковом режиме и осознают, какова конечная цель обучения.</p>
<p>Родители, не надейтесь, что проблемы вы сможете решить с помощью учителей, психологов. Не потому, что они плохи, а потому, что в условиях большого класса, отсутствия специальных трансформативно-развивающих программ решить данную проблему невозможно. Это причина, а следствием является то, что 11 лет в школе для такого ребенка превращаются в 11 лет стресса.</p>
`