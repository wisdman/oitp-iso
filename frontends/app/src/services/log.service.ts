import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"

type ILogRecord = {
  date: Date,
  event: string,
  data: any,
}

@Injectable({ providedIn: "root" })
export class LogService {

  private logSource = new BehaviorSubject<Array<ILogRecord>>([])

  get log() {
    return this.logSource.asObservable()
  }
}
