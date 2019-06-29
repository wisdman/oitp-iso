export interface ILogItem {
  id: string
}

export type ILog = Array<ILogItem>

export interface INetworkInformation {
  downlink: number,
  effectiveType: string,
  rtt: number,
  type: string,
}

export interface IProgressItem {
  id: string
  values: Array<number>
  average: number
}

export interface IProgress {
  charge: number // Заряд мозга

  memory: number // Память
  knowledge: number // Эрудиция
  intelligence: number // Мышление

  speed: Array<number> // Скорость мышления

  items: Array<IProgressItem>
}

export interface IUser {
  id: string

  email: string
  emailIsValid: boolean

  phone: string
  phoneIsValid: boolean

  name: string
  surname: string

  avatar: string | null
}



