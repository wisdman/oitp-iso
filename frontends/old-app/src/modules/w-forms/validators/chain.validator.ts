import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms"

export function СhainValidator(...validators: Array<ValidatorFn>): ValidatorFn {
  return function(control: AbstractControl): ValidationErrors | null {
    for (const validator of validators) {
      const err = validator(control)
      if (err) {
        return err
      }
    }
    return null
  }
}
