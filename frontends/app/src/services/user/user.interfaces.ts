export interface INetworkInformation {
  downlink: number,
  effectiveType: string,
  rtt: number,
  type: string,
}

export interface IUser {
  email: string
  emailIsValid: boolean

  phone: string
  phoneIsValid: boolean

  name: string
  surname: string

  avatar: string | null

  gender: string
  country: string
  location: string

  birthday: string
}
