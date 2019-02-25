import { Component, ChangeDetectionStrategy } from "@angular/core"

import { LogService } from "../../services"

@Component({
  selector: "log",
  templateUrl: "./log.component.html",
  styleUrls: [ "./log.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogComponent {
  constructor(private _logService: LogService) {}
  public user = this._logService.log
}
