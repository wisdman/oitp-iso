import { Pipe, PipeTransform, Inject } from "@angular/core"
import { LOCALE_ID } from "@angular/core"

const DECL_OF_NUM = (n: number, titles: Array<string>) =>
  titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]

@Pipe({ name: "days" })
export class DaysPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private _locale: string) {}

  transform(ss: number | undefined): string {
    if (typeof ss !== "number" || !Number.isInteger(ss) || ss <= 0) {
      return ""
    }

    let day = "days"

    switch (this._locale) {
      case "ru":
        day = DECL_OF_NUM(ss, ["день", "дня", "дней"])
        break
    }

    return `${ss} ${day}`
  }
}