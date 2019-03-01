import { Component, ChangeDetectionStrategy } from "@angular/core"

@Component({
  selector: "main-chart-card",
  templateUrl: "./main-chart.card.component.html",
  styleUrls: [ "./main-chart.card.component.css" ],
  host: {"class": "card"},
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainChartCardComponent {

  perception: number = 51
  memory: number = 48
  intelligence: number = 50
  knowledge: number = 61

}
