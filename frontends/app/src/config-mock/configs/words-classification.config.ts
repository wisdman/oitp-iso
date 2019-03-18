// Классификация слов

import { UUID } from "../uuid"

import {
  IWordsClassificationTrainerItem,
  IWordsClassificationTrainerConfig,
} from "../../trainers"

export async function getWordsClassificationTrainerConfig(itemsSize: number): Promise<IWordsClassificationTrainerConfig> {

  const DATA = await fetch("/words-classification.json")
                      .then(response => response.json()) as Array<IWordsClassificationTrainerItem>

  const items = DATA.sort(() => Math.random() - 0.5)
                    .slice(0, itemsSize)
                    .map(value => {
                      value.items = value.items.slice(0, 3)
                      return value
                    })

  return {
    id: "words-classification",
    uid: new UUID(1).toString(),
    items
  }
}