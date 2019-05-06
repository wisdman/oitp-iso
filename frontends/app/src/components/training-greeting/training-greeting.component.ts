import { Component, ChangeDetectionStrategy, Output, EventEmitter } from "@angular/core"

@Component({
  selector: "training-greeting",
  templateUrl: "./training-greeting.component.html",
  styleUrls: [ "./training-greeting.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingGreetingComponent {
  @Output("buttonClick")
  buttonClickValueChange = new EventEmitter<true>()

  onClick() {
    this.buttonClickValueChange.emit(true)
  }
}
