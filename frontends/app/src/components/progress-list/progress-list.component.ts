import { Component, ChangeDetectionStrategy } from "@angular/core"

import {
  ProgressService,
  IProgressItem,
} from "../../services"

@Component({
  selector: "progress-list",
  templateUrl: "./progress-list.component.html",
  styleUrls: [ "./progress-list.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressListComponent {
  constructor(private _progressService: ProgressService) {}
  public progress = this._progressService.progress

  getTrend(item: IProgressItem): "up" | "down" {
    return item.values[item.values.length - 1] >= item.average ? "up" : "down"
  }
}
