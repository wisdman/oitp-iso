import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, OnInit } from "@angular/core"

@Component({
  selector: "info-text-trainer",
  templateUrl: "./info-text.trainer.html",
  styleUrls: [ "./info-text.trainer.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoTextTrainer implements OnInit {

  @Input()
  config: {
    html: string
  } = {
    html: ""
  }

  result: {
    isFinish: boolean
  } = {
    isFinish: false
  }

  @Output("result")
  resultValueChange = new EventEmitter<{ isFinish: boolean }>()

  private updateResult(result: Partial<{ isFinish: boolean }>) {
    this.result = {...this.result, ...result}
    this.resultValueChange.emit(this.result)
  }

  ngOnInit() {
    this.updateResult({ isFinish: false })
  }

  onClick(event: Event) {
    event.preventDefault()
    this.updateResult({ isFinish: true })
  }
}
