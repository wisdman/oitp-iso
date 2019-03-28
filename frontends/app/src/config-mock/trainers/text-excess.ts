import { UUID } from "../uuid"

import {
  IQuestionTrainerConfig,
  IQuestionTrainerAnswer
} from "../../trainers"

function fetchData(): Promise<Array<Array<string>>> {
  return fetch(`/excess.json`).then(response => response.json())
}

export async function getTextExcessTrainerConfig(): Promise<IQuestionTrainerConfig> {

  const data = await fetchData()

  const answers = data.sort(() => Math.random() - 0.5)[0]
                      .sort(() => Math.random() - 0.5)

  const question: IQuestionTrainerConfig = {
    id: "question",
    uid: new UUID(1).toString(),
    body: "<h1>Какое слово лишнее?</h1>",
    // multiple: true,
    // button: "Продолжить",
    items: answers.map((data) => {
      const item: IQuestionTrainerAnswer = {
        type: "text",
        data,
      }
      return item
    })
  }

  return question
}
