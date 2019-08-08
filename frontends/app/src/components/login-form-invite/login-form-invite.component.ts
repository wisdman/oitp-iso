import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import {
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms"

@Component({
  selector: "login-form-invite",
  templateUrl: "./login-form-invite.component.html",
  styleUrls: [ "./login-form-invite.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormInviteComponent {
  constructor(
    private _fb: FormBuilder,
  ) {}

  form = this._fb.group({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password1: ['', Validators.required],
    password2: ['', Validators.required],
  })

  onSubmit(event: Event) {
    event.preventDefault()
  }
}
