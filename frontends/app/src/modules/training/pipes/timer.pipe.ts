import { Pipe, PipeTransform } from "@angular/core"

@Pipe({ name: "timer" })
export class TimerPipe implements PipeTransform {
  transform(ss: number | undefined): string {
    return typeof ss !== "number" || !Number.isInteger(ss) || ss <= 0 ?
      "" : `${Math.floor(ss / 60)}:${String(ss % 60).padStart(2, "0")}`
  }
}
