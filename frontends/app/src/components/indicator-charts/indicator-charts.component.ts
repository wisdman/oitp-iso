import { Component, ChangeDetectionStrategy } from "@angular/core"

import { UserService } from "../../services"

@Component({
  selector: "indicator-charts",
  templateUrl: "./indicator-charts.component.html",
  styleUrls: [ "./indicator-charts.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndicatorChartsComponent {
  constructor(private _userService: UserService) {}
  public user = this._userService.user
}
