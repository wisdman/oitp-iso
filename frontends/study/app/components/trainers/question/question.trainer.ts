import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, OnInit } from "@angular/core"

@Component({
  selector: "question-trainer",
  templateUrl: "./question.trainer.html",
  styleUrls: [ "./question.trainer.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionTrainer implements OnInit {

  @Input()
  config: {
    html: string
    answers: Array<{ html: string, value: number }>
  } = {
    html: "",
    answers: [{
      html: "Да",
      value: 1
    },{
      html: "Нет",
      value: 0
    }]
  }

  result: {
    success: number,
    error: number,
    isFinish: boolean
  } = {
    success: 0,
    error: 0,
    isFinish: false
  }

  @Output("result")
  resultValueChange = new EventEmitter<{ success: number, error: number,  isFinish: boolean }>()

  private updateResult(result: Partial<{ success: number, error: number,  isFinish: boolean }>) {
    this.result = {...this.result, ...result}
    this.resultValueChange.emit(this.result)
  }

  ngOnInit() {
    this.updateResult({ isFinish: false })
  }

  onClick(item: { value: number }) {
    this.updateResult({
      success: item.value > 0 ? this.result.success + item.value : this.result.success,
      error: item.value <= 0 ? this.result.error + 1 : this.result.error,
      isFinish: true
    })
  }
}
