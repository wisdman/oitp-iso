import { IBirthday } from "./birthday.interfaces"
import { MONTHS, YEARS } from "./birthday.data"

export function GetBirthday(v?: string | number | Date): IBirthday {
  const d = v instanceof Date ? v : v === undefined ? new Date() : new Date(v)

  if (!Number.isNaN(Number(d))) {
    return {
      day: d.getDate(),
      month: MONTHS.find(({value}) => value === d.getMonth() + 1) || MONTHS[0],
      year: YEARS.find(value => value === d.getFullYear()) || YEARS[0],
    }
  }

  return {
    day: 1,
    month: MONTHS[0],
    year: YEARS[0],
  }
}
