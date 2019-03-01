
import { IRole } from "./role.interface"

export interface IUser {
  id: number

  name: string
  avatar: number

  roles: Array<IRole>

  email: string
  phone: string
}