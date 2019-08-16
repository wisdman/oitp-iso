import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms"

export function RegExpValidator(regExp: RegExp, message: string): ValidatorFn {
  return function(control: AbstractControl): ValidationErrors | null {
    if (!regExp.test(control.value)) {
      return { RegExp: { message } }
    }
    return null
  }
}
