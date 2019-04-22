import { Component, ChangeDetectionStrategy } from "@angular/core"

import { UserService } from "../../services"

@Component({
  selector: "header-user",
  templateUrl: "./header-user.component.html",
  styleUrls: [ "./header-user.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderUserComponent {
  constructor(private _userService: UserService) {}
  public user = this._userService.getUser()
}
