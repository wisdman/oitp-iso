import { Injectable } from "@angular/core"

@Injectable({ providedIn: "root" })
export class TokenService {
  static AUTH_TOKEN_KEY = "token"

  private _token: string = ""

  private _loadToken() {
    const token = localStorage.getItem(TokenService.AUTH_TOKEN_KEY)
    if (token !== null) {
      this._token = token
      return
    }
    this._token = ""
  }

  private _saveToken() {
    if (this._token === "") {
      localStorage.removeItem(TokenService.AUTH_TOKEN_KEY)
      return
    }
    localStorage.setItem(TokenService.AUTH_TOKEN_KEY, this._token)
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
