import {
  ShuffleArray,
} from "./functions"

import { UUID } from "../uuid"


import {
  IArticleTrainerConfig,
  IQuestionTrainerTextAnswer,
  IQuestionTrainerConfig,
} from "../trainers"

export async function getArticleConfig(): Promise<{
  article: IArticleTrainerConfig,
  questions: Array<IQuestionTrainerConfig>
}> {
  const DATA = await fetch(`/articles.txt`).then(response => response.text())

  const [body, q, ...answers] = ShuffleArray(DATA.split(/[\r\n\s-]*===\s\d+\s===[\r\n\s]*/g))
                                .filter(str => !!str)[0]
                                .split(/[\r\n\s-]*[_*]+[\r\n\s-]*/)
                                .filter(str => !!str)

  let questions = q.split(/\s*[\r\n]+\s*/)
                   .map((body,i) => ({ body, answer: answers[i]}) )
                   .map(({body, answer}) => {
                       return {
                         body,
                         answers: ["Истина", "Ложь"]
                                   .map(data => data.charAt(0) === answer
                                              ? { type: "text", data, correct: true }
                                              : { type: "text", data, correct: false })
                                   .map(data => data as IQuestionTrainerTextAnswer)
                       }
                   })
                   .map( question => ({...question, id: "question", uid: new UUID(1)}) as IQuestionTrainerConfig )

  return {
    article: {
      uid: new UUID(1),
      id: "article",
      header: "",
      body: body.split(/\s*[\r\n]+\s*/).map(str => `<p>${str}</p>`).join(""),
      button: "Продолжить",
    },
    questions
  }
}
