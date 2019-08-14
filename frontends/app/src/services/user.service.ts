import { Injectable } from "@angular/core"
import { HttpClient } from  "@angular/common/http"

import { BehaviorSubject } from "rxjs"
import { switchMap, shareReplay } from "rxjs/operators"

import { API_SELF_USER } from "../app.config"

export interface IUser {
  id: string

  email: string
  phone: string

  validity: any,
  tariff: any,

  name: string
  surname: string

  avatar: string | null

  gender: string
  country: string
  location: string

  birthday: string
}

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(
    private _httpClient:HttpClient,
  ) {}

  private _reload: BehaviorSubject<void> = new BehaviorSubject<void>(undefined)
  reload() {
    this._reload.next()
  }

  user = this._reload.pipe(
    switchMap(() => this._httpClient.get<IUser>(API_SELF_USER)),
    shareReplay(1),
  )

  update(user: Partial<IUser>) {
    return this._httpClient.post(API_SELF_USER, user)
  }
}
