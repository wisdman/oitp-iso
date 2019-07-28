import { IMonth } from "./birthday.interfaces"

const CURRENT_DATE = new Date()
export const CURRENT_YEAR = CURRENT_DATE.getFullYear()

const MIN_YEAR = 1900
const MAX_YEAR = CURRENT_YEAR - 10

export const MONTHS: Array<IMonth> = [{
    value: 1,
    name: "Январь",
  },{
    value: 2,
    name: "Февраль",
  },{
    value: 3,
    name: "Март",
  },{
    value: 4,
    name: "Апрель",
  },{
    value: 5,
    name: "Май",
  },{
    value: 6,
    name: "Июнь",
  },{
    value: 7,
    name: "Июль",
  },{
    value: 8,
    name: "Август",
  },{
    value: 9,
    name: "Сентябрь",
  },{
    value: 10,
    name: "Октябрь",
  },{
    value: 11,
    name: "Ноябрь",
  },{
    value: 12,
    name: "Декабрь",
  }]

export const YEARS = Array.from(new Array(MAX_YEAR - MIN_YEAR), (_, i) => MAX_YEAR - i)