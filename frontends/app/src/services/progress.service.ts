import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"

type ILogRecord = {
  date: Date,
  event: string,
  data: any,
}

@Injectable({ providedIn: "root" })
export class ProgressService {

  private progressSource = new BehaviorSubject<Array<ILogRecord>>([])

  get progress() {
    return this.progressSource.asObservable()
  }
}
