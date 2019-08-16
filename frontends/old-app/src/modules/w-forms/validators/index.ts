
import { EmailValidator } from "./email.validator"
import { EquallyValidator } from "./equally.validator"
import { MinValidator } from "./min.validator"
import { RegExpValidator } from "./regexp.validator"
import { RequiredValidator } from "./required.validator"
import { СhainValidator } from "./chain.validator"

export class Validators {
  static Email = EmailValidator
  static Equally = EquallyValidator
  static Min = MinValidator
  static RegExp = RegExpValidator
  static Required = RequiredValidator
  static Сhain = СhainValidator

  private constructor(){}
}
