import { Injectable } from "@angular/core"

import { HttpClient } from  "@angular/common/http"

import { BehaviorSubject } from "rxjs"

import {
  switchMap,
  shareReplay,
} from "rxjs/operators"

import {
  API_LOG,
  API_PROGRESS,
} from "../../app.config"

import {
  ILog,
  IProgress,
} from "./progress.interfaces"

@Injectable({ providedIn: "root" })
export class ProgressService {
  constructor(
    private _httpClient:HttpClient,
  ) {}

  private _reload: BehaviorSubject<void> = new BehaviorSubject<void>(undefined)
  reload() {
    this._reload.next()
  }

  progress = this._reload.pipe(
    switchMap(() => this._httpClient.get<IProgress>(API_PROGRESS)),
    shareReplay(1),
  )

  log = this._reload.pipe(
    switchMap(() => this._httpClient.get<ILog>(API_LOG)),
    shareReplay(1),
  )
}
