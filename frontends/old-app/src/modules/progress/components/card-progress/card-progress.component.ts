import { Component, ChangeDetectionStrategy } from "@angular/core"

import {
  ProgressService,
  IProgressItem,
} from "../../services"

@Component({
  selector: "card-progress",
  templateUrl: "./card-progress.component.html",
  styleUrls: [ "./card-progress.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProgressComponent {
  constructor(private _progressService: ProgressService) {}
  public progress = this._progressService.progressList

  getTrend(item: IProgressItem): "up" | "down" {
    return item.values[item.values.length - 1] >= item.average ? "up" : "down"
  }
}
