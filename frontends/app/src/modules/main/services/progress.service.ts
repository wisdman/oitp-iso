import { Injectable } from "@angular/core"
import { HttpClient } from  "@angular/common/http"

import { BehaviorSubject } from "rxjs"
import { shareReplay, switchMap } from "rxjs/operators"

import { IProgress } from "../interfaces"

const API_PROGRESS = "$API/self/progress"

@Injectable()
export class ProgressService {
  constructor(
    private _httpClient:HttpClient,
  ) {}

  private _reload: BehaviorSubject<void> = new BehaviorSubject<void>(undefined)
  reload() { this._reload.next() }

  progress = this._reload.pipe(
    switchMap(() => this._httpClient.get<IProgress>(API_PROGRESS)),
    shareReplay(1),
  )
}
