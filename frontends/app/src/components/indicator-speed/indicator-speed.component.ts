import { Component, ChangeDetectionStrategy } from "@angular/core"

import { UserService } from "../../services"

@Component({
  selector: "indicator-speed",
  templateUrl: "./indicator-speed.component.html",
  styleUrls: [ "./indicator-speed.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndicatorSpeedComponent {
  constructor(private _userService: UserService) {}
  public user = this._userService.user
}
