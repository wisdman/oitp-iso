// Исключить лишнее

import { UUID } from "../uuid"

import {
  // INumberExclusionTrainerConfig,
  IQuestionTrainerConfig,
} from "../../trainers"

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
const random = (): number => {
  const a = randomInt(1, 9)
  const b = randomInt(1, 9)
  // const c = randomInt(1, 9)
  // const d = a * b - c
  // const res = a * 1000 + b * 100 + c * 10 + d
  return a * 1000 + b * 100 + b * 10 + a
}

export async function getNumberExclusionTrainerConfig(itemsSize: number): Promise<IQuestionTrainerConfig> {

  const items = Array.from(Array(itemsSize), () => random())
  items.push(random() + 1)

  // return {
  //   id: "number-exclusion",
  //   uid: new UUID(1).toString(),
  //   items,
  // }

  const a: Array<any> = items.map( value => {
    return {
      type: "number",
      data: value,
    }
  }).sort(() => Math.random() - 0.5)

  return {
    id: "question",
    uid: new UUID(1).toString(),

    header: "Какое число лишнее",
    body: "",

    items: a,
  }
}