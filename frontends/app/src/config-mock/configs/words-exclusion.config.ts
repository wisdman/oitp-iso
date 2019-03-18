// Исключить слово

import { UUID } from "../uuid"

import {
  // IWordsExclusionTrainerConfig,
  IQuestionTrainerConfig,
} from "../../trainers"

export async function getWordsExclusionTrainerConfig(): Promise<IQuestionTrainerConfig> {

  const items = DATA.sort(() => Math.random() - 0.5)[0]

  const a = items.map( w => ({data: w, type: "text" }) ) as Array<any>

  return {
    id: "question",
    uid: new UUID(1).toString(),

    header: "Уберите лишнее слово",
    body: "",

    items: a,
  }

  // return {
  //   id: "words-exclusion",
  //   uid: new UUID(1).toString(),
  //   items,
  // }
}

const DATA = [
  [ "тис", "пихта", "лиственница", "туя", "чабрец" ],
  [ "сыр", "сметана", "йогурт", "ряженка", "каша" ],
  [ "асфальт", "галька", "песок", "брусчатка", "ручей" ],
  [ "микроскоп", "мультиметр", "термометр", "спидометр", "интернет" ],
  [ "элегия", "ода", "эпиграмма", "эпитафия", "повесть" ],
]