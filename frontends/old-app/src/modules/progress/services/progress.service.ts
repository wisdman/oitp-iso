import { Injectable } from "@angular/core"

import { HttpClient } from  "@angular/common/http"

import { BehaviorSubject } from "rxjs"

import {
  map,
  share,
  shareReplay,
  switchMap,
} from "rxjs/operators"

import {
  API_SELF_LOG,
  API_SELF_PROGRESS,
} from "../../app.config"

import {
  ILog,
  IProgress,
} from "./progress.interfaces"

const LIST_ITEMS = 'lexicon,arithmetic,variability,verbal,harmonization,inductance,mnemonics,visually-memory,space-logic,attention,visually-perception,auditory-memory,teasing,accuracy,numeric-tables'.split(",")

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
    switchMap(() => this._httpClient.get<IProgress>(API_SELF_PROGRESS)),
    shareReplay(1),
  )

  progressList = this.progress.pipe(
    map(items => items.filter(item => LIST_ITEMS.includes(item.id)) ),
    share(),
  )

  progressCharge = this.progress.pipe(
    map(items => items.find(item => item.id === 'charge') || { id: "charge", values: [100], average: 1000 }),
    share(),
  )

  log = this._reload.pipe(
    switchMap(() => this._httpClient.get<ILog>(API_SELF_LOG)),
    shareReplay(1),
  )
}