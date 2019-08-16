import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

@Component({
  selector: "login-email",
  templateUrl: "./login-email.component.html",
  styleUrls: [ "./login-email.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginEmailLayoutComponent {}
