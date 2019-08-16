import { ChangeDetectionStrategy, Component } from "@angular/core"

@Component({
  selector: "login-layout",
  templateUrl: "./login.layout.html",
  styleUrls: [ "./login.layout.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginLayout {}
