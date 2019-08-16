import { Pipe, PipeTransform } from "@angular/core"

@Pipe({ name: "timer" })
export class TimerPipe implements PipeTransform {
  transform(ss: number | undefined): string {
    if (typeof ss !== "number" || !Number.isInteger(ss) || ss <= 0) {
      return ""
    }

    return `${Math.floor(ss / 60)}:${String(ss % 60).padStart(2, "0")}`
  }
}