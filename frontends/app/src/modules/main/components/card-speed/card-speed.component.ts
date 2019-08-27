import { Component, ChangeDetectionStrategy } from "@angular/core"

// import { ProgressService } from "../../services"

@Component({
  selector: "card-speed",
  templateUrl: "./card-speed.component.html",
  styleUrls: [ "./card-speed.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardSpeedComponent {
  values = [50,76,82,66]

  // constructor(private _progressService: ProgressService) {}
  // public progress = this._progressService.progress
}
