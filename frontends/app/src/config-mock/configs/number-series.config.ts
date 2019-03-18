// Ряды

import { UUID } from "../uuid"

import {
  IQuestionTrainerConfig
} from "../../trainers"

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

export async function getNumberSeriesTrainerConfig(itemsSize: number): Promise<IQuestionTrainerConfig> {

  const start = randomInt(10,20)
  const p = randomInt(1,9)
  const m = randomInt(1,9)

  const items: Array<number> = [start]
  for (let i = 1; i < itemsSize; i++) {
    items[i] = i % 2 ? items[i-1] + p : items[i-1] - m
  }

  const body = items.slice(0, -1).join(", ")
  const a = items[items.length-1]

  return {
    id: "question",
    uid: new UUID(1).toString(),

    header: "Дополните ряд чисел",
    body: `<p>${body}, ...</p>`,

    items: [{
      type: "number",
      data: a + p,
    },{
      type: "number",
      data: a,
    },{
      type: "number",
      data: a + m,
    },{
      type: "number",
      data: a - 2,
    }],
  }
}