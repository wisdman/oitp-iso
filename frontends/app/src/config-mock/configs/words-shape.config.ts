// Фигуры из слов
// Груговые схемы

import { UUID } from "../uuid"

import {
  IWordsShapeTrainerConfig
} from "../../trainers"

export async function getWordsShapeTrainerConfig(): Promise<IWordsShapeTrainerConfig> {

  return {
    id: "words-shape",
    uid: new UUID(1).toString(),
  }
}