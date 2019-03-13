
import { UUID } from "./uuid"

import {
  ShuffleArray,
} from "./functions"

import {
  IQuestionTrainerTextAnswer,
  IQuestionTrainerConfig,
  ITezirovanieTrainerConfig,
} from "../trainers"

export async function getTezirovanieConfig(): Promise<ITezirovanieTrainerConfig> {
  const DATA = await fetch(`/articles.txt`).then(response => response.text())

  const arr = DATA.split(/[\r\n\s-]*===\s\d+\s===[\r\n\s]*/g)
                  .filter(str => !!str)
                  .map( str => str.split(/[\r\n\s-]*[_*]+[\r\n\s-]*/).filter(str => !!str)  )
                  .map( ([body, q, ...answers]) => {
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
                         .map( question => ({...question, id: "question", uid: new UUID(1).toString()}) as IQuestionTrainerConfig )

                    return { body, questions }
                  }).sort((a, b) => a.body.length < b.body.length ? -1 : 1)

  return {
    uid: new UUID(1).toString(),
    id: "tezirovanie",
    header: "Выдилите основной тезис",
    body: ShuffleArray(arr.slice(0,10))[0].body.split(/\s*[\r\n]+\s*/).map(str => `<p>${str}</p>`).join(""),
    timeLimit: 180,
  }
}
