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
      name: "Test User",
      premium: 90,

      charge: 50,

      intelligence: 50,
      knowledge: 50,
      memory: 50,

      speed: [50, 50, 50, 50, 50]
    })
  }

}
