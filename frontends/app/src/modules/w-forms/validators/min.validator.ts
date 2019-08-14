import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms"

export function MinValidator(min: number, message: string): ValidatorFn {
  return function(control: AbstractControl): ValidationErrors | null {
    const value = control.value
    if (value == null || value.length < min) {
      return { RegExp: { message } }
    }
    return null
  }
}
