import { Injectable } from "@angular/core"
import { HttpClient } from  "@angular/common/http"

import { from } from "rxjs"

import {
  API_AUTH,
  API_USER,
} from "../app.config"

type IUser = Partial<{
  id: number
  name: string
  avatar: string
  premium: number

  charge: number

  intelligence: number
  knowledge: number
  memory: number

  speed: Array<number>
}>


@Injectable({ providedIn: "root" })
export class UserService {

  constructor(private _httpClient:HttpClient) {}

  getUser() {
    return this._httpClient.get<IUser>(API_USER)
  }

  login({
    email,
    password,
  }:{
    email: string,
    password: string,
  }) {
    const request = fetch(API_AUTH, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: email.toLowerCase(), password})
    }).then(r => r.status === 200)

    return from(request)
  }

  logout(){
    const request = fetch(API_AUTH, { method: "DELETE" })
    return from(request)
  }

  register({
    email,
    reset = false
  }:{
    email: string,
    reset: boolean
  }) {
    const request = fetch(API_AUTH, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, reset})
    }).then(r => r.status === 200)

    return from(request)
  }
}
