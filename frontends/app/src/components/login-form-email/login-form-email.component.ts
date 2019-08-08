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
  selector: "login-form-email",
  templateUrl: "./login-form-email.component.html",
  styleUrls: [ "./login-form-email.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormEmailComponent {
  constructor(
    private _fb: FormBuilder,
  ) {}

  form = this._fb.group({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: ['', Validators.required],
  })

  onSubmit(event: Event) {
    event.preventDefault()
  }
}
