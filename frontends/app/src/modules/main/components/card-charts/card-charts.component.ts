import { Component, ChangeDetectionStrategy } from "@angular/core"

import { ProgressService } from "../../services"

@Component({
  selector: "card-charts",
  templateUrl: "./card-charts.component.html",
  styleUrls: [ "./card-charts.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardChartsComponent {
  constructor(public progressService: ProgressService) {}
}
