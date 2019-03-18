// Пары слов

import { UUID } from "../uuid"

import {
  IWordsPairsTrainerConfig
} from "../../trainers"

export async function getWordsPairsTrainerConfig(itemsSize: number): Promise<IWordsPairsTrainerConfig> {

  const items = Array.from(Array(itemsSize), (_, i) => [`Левое ${i+1}`,`Правое ${i+1}`] )

  return {
    id: "words-pairs",
    uid: new UUID(1).toString(),
    items
  }
}
