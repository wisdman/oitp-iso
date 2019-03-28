import { UUID } from "../uuid"

import {
  IQuestionTrainerConfig,
  IQuestionTrainerAnswer
} from "../../trainers"

export async function getMathQTrainerConfig(): Promise<IQuestionTrainerConfig> {

  const q = Q.sort(() => Math.random() - 0.5)[0]
  const a = q.pop() || 0

  const answers = [
        a - Math.floor(Math.random() * 5 - 1),
        a - Math.floor(Math.random() * 5),
        a,
        a + Math.floor(Math.random() * 5 + 1),
        a + Math.floor(Math.random() * 5),
  ]

  const question: IQuestionTrainerConfig = {
    id: "question",
    uid: new UUID(1).toString(),
    body: `<h1>${q.join(", ")}</h1><p>Вставте недостающее число</p>`,
    // multiple: true,
    // button: "Продолжить",
    items: answers.map((data) => {
      const item: IQuestionTrainerAnswer = {
        type: "text",
        data: String(data),
      }
      return item
    }).sort(() => Math.random() - 0.5)
  }

  return question
}


const Q = [
  [16, 9, 15, 17, 10, 16, 18, 11, 17, 19],
  [21, 28, 32, 25, 32, 36, 28, 35, 39, 31],
  [24, 12, 15, 20, 10, 13, 18, 9, 12, 17, 8.5],
  [15, 30, 35, 70, 75, 150, 155, 310],
  [20, 16, 21, 27, 24, 28, 33, 31, 34, 38, 37],
  [18, 9, 14, 7, 10, 15, 7.5, 10,5, 15,5, 7.75],
  [20, 16, 21, 28, 24, 29, 38, 34, 39, 46, 4]
]