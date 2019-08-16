import { Component, ChangeDetectionStrategy } from "@angular/core"

import { InfoService } from "../../services"

@Component({
  selector: "card-info",
  templateUrl: "./card-info.component.html",
  styleUrls: [ "./card-info.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardInfoComponent {
  constructor(private _infoService: InfoService) {}
  public info = this._infoService.getInfo()
}
