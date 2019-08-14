import { ValidatorFn } from "@angular/forms"
import { RegExpValidator } from "./regexp.validator"

export function EmailValidator(message: string): ValidatorFn {
  return RegExpValidator(/^[a-z0-9_\.%+-]+@[a-z0-9_\.-]*[a-z0-9]$/, message)
}
