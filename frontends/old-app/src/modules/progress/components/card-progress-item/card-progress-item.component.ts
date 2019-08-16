import { Component, ChangeDetectionStrategy } from "@angular/core"

import {
  ProgressService,
  IProgressItem,
} from "../../services"

@Component({
  selector: "card-progress-item",
  templateUrl: "./card-progress-item.component.html",
  styleUrls: [ "./card-progress-item.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProgressItemComponent {
  constructor(private _progressService: ProgressService) {}
  public progress = this._progressService.progressList

  getTrend(item: IProgressItem): "up" | "down" {
    return item.values[item.values.length - 1] >= item.average ? "up" : "down"
  }
}
