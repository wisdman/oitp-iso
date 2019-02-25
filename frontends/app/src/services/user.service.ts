import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"

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

  private userSource = new BehaviorSubject<IUser | undefined>(undefined)

  get user() {
    return this.userSource.asObservable()
  }

  private updateUser(data: IUser) {
    this.userSource.next({ ...this.userSource.getValue(), ...data })
  }

  constructor() {
    this.updateUser({
      name: "Дмитрий Поляков",
      premium: 101,

      charge: 72,

      intelligence: 50,
      knowledge: 61,
      memory: 32,

      speed: [54, 57, 68, 42, 81]
    })
  }

}
