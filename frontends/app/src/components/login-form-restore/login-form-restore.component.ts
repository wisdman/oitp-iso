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
  selector: "login-form-restore",
  templateUrl: "./login-form-restore.component.html",
  styleUrls: [ "./login-form-restore.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormRestoreComponent {
  constructor(
    private _fb: FormBuilder,
  ) {}

  form = this._fb.group({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
  })

  onSubmit(event: Event) {
    event.preventDefault()
  }
}
