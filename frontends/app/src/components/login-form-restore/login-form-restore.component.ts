import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import {
  FormBuilder,
  FormControl,
} from "@angular/forms"

import { Validators } from "../../modules/w-forms"

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
    email: new FormControl('', Validators.Email("Некорректный E-mail")),
  })

  onSubmit(event: Event) {
    this.form.markAsTouched()
    event.preventDefault()
  }
}
