import { Component, ChangeDetectionStrategy } from "@angular/core"

import { ProgressService } from "../../services"

@Component({
  selector: "progress-list",
  templateUrl: "./progress-list.component.html",
  styleUrls: [ "./progress-list.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressListComponent {
  constructor(private _progressService: ProgressService) {}
  public user = this._progressService.progress
}
