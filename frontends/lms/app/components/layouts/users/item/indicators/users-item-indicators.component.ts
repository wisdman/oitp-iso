import { Component } from "@angular/core"

@Component({
  selector: "users-item-indicators",
  templateUrl: "./users-item-indicators.component.html",
  styleUrls: [ "./users-item-indicators.component.css" ],
})
export class UsersItemIndicatorsComponent {

  chartType:string = "line"
  chartOptions:any = {
    responsive: true
  }
  chartLegend: boolean = false
  chartLabels:Array<any> = ["Ноябрь", "Декабрь", "Январь"]

  chartData1:Array<any> = [ [0, 59, 80] ]
  chartData2:Array<any> = [ [0, 1458, 3976] ]
  chartData3:Array<any> = [ [0, 99, 72] ]
  chartData4:Array<any> = [ [1000, 132, 435] ]
  chartData5:Array<any> = [ [1000, 111, 169] ]
  chartData6:Array<any> = [ [1000, 598, 382] ]
  chartData7:Array<any> = [ [1000, 0, 799] ]

  chartPolarArea = "polarArea"
  chartPolarData = [435, 169, 382, 799]
  chartPolarLabels = ["Восприятие", "Память", "Интеллект", "Эрудиция"]
}
