// Вопросы

import { UUID } from "../uuid"

import {
  IQuestionTrainerConfig
} from "../../trainers"

export async function getQuestionTrainerConfig(): Promise<IQuestionTrainerConfig> {

  return {
    id: "question",
    uid: new UUID(1).toString(),

    header: "Замените знак вопроса числом",
    body: `<p>17 (136) 8</p><p>??? (117) 9</p>`,

    items: [{
      type: "number",
      data: 13,
    },{
      type: "number",
      data: 11,
    },{
      type: "number",
      data: 15,
    },{
      type: "number",
      data: 9,
    },{
      type: "number",
      data: 17,
    }].sort(() => Math.random() - 0.5) as any
  }
}