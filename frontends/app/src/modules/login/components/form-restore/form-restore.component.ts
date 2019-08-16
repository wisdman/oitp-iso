import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core"
import { FormGroup, FormControl } from "@angular/forms"

import { Validators } from "../../../w-forms"

@Component({
  selector: "login-form-restore",
  templateUrl: "./form-restore.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FormRestoreComponent {

  form = new FormGroup({
    email: new FormControl('', Validators.Email("Некорректный E-mail")),
  })

  onSubmit(event: Event) {
    this.form.markAsTouched()
    event.preventDefault()
  }
}
