import { Component, ChangeDetectionStrategy, Input } from "@angular/core"

import { IProgressItem } from "../../interfaces"

@Component({
  selector: "card-progress-item",
  templateUrl: "./card-progress-item.component.html",
  styleUrls: [ "./card-progress-item.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProgressItemComponent {
  @Input()
  item!: IProgressItem

  getTrend(item: IProgressItem): "up" | "down" {
    return item.values[item.values.length - 1] >= item.average ? "up" : "down"
  }
}