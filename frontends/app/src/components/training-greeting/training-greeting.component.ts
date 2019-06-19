import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from "@angular/core"

@Component({
  selector: "training-greeting",
  templateUrl: "./training-greeting.component.html",
  styleUrls: [ "./training-greeting.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingGreetingComponent {

  @Output("touch")
  touchValueChange = new EventEmitter<undefined>()

  onTouch() {
    this.touchValueChange.emit()
  }
}
