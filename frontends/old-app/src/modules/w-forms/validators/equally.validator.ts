import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormGroup,
} from "@angular/forms"

export function EquallyValidator(equallyControlName: string, message: string): ValidatorFn {
  return function(control: AbstractControl): ValidationErrors | null {
    const equallyControl = (control.parent as FormGroup).controls[equallyControlName]
    if (!equallyControl) {
      throw new Error("Incorrent equallyControlName")
    }
    if (control.value !== equallyControl.value) {
      return { Equally: { message } }
    }
    return null
  }
}