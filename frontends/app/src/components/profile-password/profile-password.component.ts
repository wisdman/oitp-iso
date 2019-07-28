import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import {
  FormBuilder,
  Validators,
  // FormControl,
} from "@angular/forms"

@Component({
  selector: "profile-password",
  templateUrl: "./profile-password.component.html",
  styleUrls: [ "./profile-password.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePasswordComponent {
  constructor(
    private _fb: FormBuilder,
  ) {}

  form = this._fb.group({
    currentPassword: ['', Validators.required],
    password1: ['', Validators.required],
    password2: ['', Validators.required],
  })

  onSubmit(event: Event) {
    event.preventDefault()
  }
}
