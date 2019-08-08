import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

@Component({
  selector: "login-layout",
  templateUrl: "./login.layout.component.html",
  styleUrls: [ "./login.layout.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginLayoutComponent {}
