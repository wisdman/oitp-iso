import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from "@angular/core"

@Component({
  selector: "training-result",
  templateUrl: "./training-result.component.html",
  styleUrls: [ "./training-result.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingResultComponent {
  @Input("result")
  result: number = 83

  @Output("buttonClick")
  buttonClickValueChange = new EventEmitter<true>()

  onClick() {
    this.buttonClickValueChange.emit(true)
  }
}
