export interface IMonth {
  value: number
  name: string
}

export interface IBirthday {
  day: number
  month: IMonth
  year: number
}