import { Component, ChangeDetectionStrategy } from "@angular/core"

import {
  UserService,
  IProgressItem,
} from "../../services"

@Component({
  selector: "progress-list",
  templateUrl: "./progress-list.component.html",
  styleUrls: [ "./progress-list.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressListComponent {
  constructor(private _userService: UserService) {}
  public progress = this._userService.progress

  getTrend(item: IProgressItem): "up" | "down" {
    return item.last[item.last.length - 1] >= item.average ? "up" : "down"
  }
}
