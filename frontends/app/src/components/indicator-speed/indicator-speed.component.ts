import { Component, ChangeDetectionStrategy } from "@angular/core"

import { ProgressService } from "../../services"

@Component({
  selector: "indicator-speed",
  templateUrl: "./indicator-speed.component.html",
  styleUrls: [ "./indicator-speed.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndicatorSpeedComponent {
  constructor(private _progressService: ProgressService) {}
  public progress = this._progressService.progress
}
