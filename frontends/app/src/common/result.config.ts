import { UUID } from "../uuid"

import {
  IResultsTrainerConfig
} from "../trainers"


export async function getResultsConfig(): Promise<IResultsTrainerConfig> {
  return {
    uid: new UUID(1),
    id: "results",
    header: "Тренировка завершена",
    result: Math.floor(Math.random()*50)+20,
    text: [],
    button: "Вернутся в кабинет",
  }
}
