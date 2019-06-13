import { Component, ChangeDetectionStrategy } from "@angular/core"

import { UserService } from "../../services"

@Component({
  selector: "progress-list",
  templateUrl: "./progress-list.component.html",
  styleUrls: [ "./progress-list.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressListComponent {
  constructor(private _userService: UserService) {}
  public progress = this._userService.progress
}
