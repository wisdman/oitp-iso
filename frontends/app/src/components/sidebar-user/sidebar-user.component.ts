import { Component, ChangeDetectionStrategy } from "@angular/core"

import { UserService } from "../../services"

@Component({
  selector: "sidebar-user",
  templateUrl: "./sidebar-user.component.html",
  styleUrls: [ "./sidebar-user.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarUserComponent {
  constructor(private _userService: UserService) {}
  public user = this._userService.getUser()
}
