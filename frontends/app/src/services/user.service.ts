import { Injectable } from "@angular/core"

import { BehaviorSubject, from } from "rxjs"

import {
  API_AUTH,
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

  constructor() {
    this.updateUser({
      name: "Дмитрий Поляков",
      premium: 90,

      charge: 83,

      intelligence: 82,
      knowledge: 76,
      memory: 80,

      speed: [65, 67, 72, 62, 81]
    })
  }

  private userSource = new BehaviorSubject<IUser | undefined>(undefined)

  get user() {
    return this.userSource.asObservable()
  }

  private updateUser(data: IUser) {
    this.userSource.next({ ...this.userSource.getValue(), ...data })
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
      body: JSON.stringify({email, password})
    }).then(r => r.status === 200)

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
