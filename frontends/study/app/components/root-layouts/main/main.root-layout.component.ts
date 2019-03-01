import { Component, ChangeDetectionStrategy } from "@angular/core"

import { APP_FULL_NAME } from "../../../app.config"

@Component({
  selector: "main-root-layout",
  templateUrl: "./main.root-layout.component.html",
  styleUrls: [ "./styles/index.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainRootLayoutComponent {
  appFullName = APP_FULL_NAME
}
