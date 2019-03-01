import { Component } from "@angular/core"

@Component({
  selector: "schools-item-indicators",
  templateUrl: "./schools-item-indicators.component.html",
  styleUrls: [ "./schools-item-indicators.component.css" ],
})
export class SchoolsItemIndicatorsComponent {

  chartType:string = "line"
  chartOptions:any = {
    responsive: true
  }
  chartLegend: boolean = false
  chartLabels:Array<any> = ["Ноябрь", "Декабрь", "Январь"]

  chartData1:Array<any> = [ [0, 30, 30] ]
  chartData2:Array<any> = [ [0, 1000, 0] ]

  chartPolarArea = "polarArea"
  chartPolarData = [401, 203, 592, 666]
  chartPolarLabels = ["Восприятие", "Память", "Интеллект", "Эрудиция"]

  chartBatType:string = "bar"
}
