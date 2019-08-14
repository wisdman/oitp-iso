import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms"

export function RequiredValidator(message: string): ValidatorFn {
  return function(control: AbstractControl): ValidationErrors | null {
    const value = control.value
    if (value == null || value.length === 0) {
      return { Required: { message } }
    }
    return null
  }
}
