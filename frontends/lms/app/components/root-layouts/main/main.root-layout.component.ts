import { Component } from "@angular/core"

import { APP_FULL_NAME } from "../../../app.config"

@Component({
  selector: "main-root-layout",
  templateUrl: "./main.root-layout.component.html",
  styleUrls: [ "./main.root-layout.component.css" ],
})
export class MainRootLayoutComponent {
  asideShown: boolean = false
  appFullName = APP_FULL_NAME
}
