import { Component, ChangeDetectionStrategy } from "@angular/core"

import { ProgressService } from "../../services"

@Component({
  selector: "indicator-charts",
  templateUrl: "./indicator-charts.component.html",
  styleUrls: [ "./indicator-charts.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndicatorChartsComponent {
  constructor(private _progressService: ProgressService) {}
  public progress = this._progressService.progress
}
