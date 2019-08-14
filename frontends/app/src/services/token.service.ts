import { Injectable } from "@angular/core"

import { AUTH_TOKEN_KEY } from "../app.config"

@Injectable({ providedIn: "root" })
export class TokenService {

  private _token: string = ""

  private _loadToken() {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    if (token !== null) {
      this._token = token
      return
    }
    this._token = ""
  }

  private _saveToken() {
    if (this._token === "") {
      localStorage.removeItem(AUTH_TOKEN_KEY)
      return
    }
    localStorage.setItem(AUTH_TOKEN_KEY, this._token)
  }

  constructor() {
    this._loadToken()
  }

  get token(): string {
    return this._token
  }

  set token(value: string) {
    this._token = value.trim()
    this._saveToken()
  }

  get hasToken() {
    return !!this._token
  }
}
