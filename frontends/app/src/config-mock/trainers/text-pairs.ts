import { UUID } from "../uuid"

import {
  ITextPairsTrainerConfig
} from "../../trainers"

function fetchData(type: string): Promise<Array<Array<string>>> {
  return fetch(`/${type}.json`).then(response => response.json())
}

export async function getTextPairsTrainerConfig({
  type,
  itemsCount,
}:{
  type: "synonyms" | "antonyms" | "paronyms" | "accuracy"
  itemsCount: number
}): Promise<ITextPairsTrainerConfig> {

  const data = await fetchData(type)

  const pairs = data.sort(() => Math.random() - 0.5)
                    .slice(0, itemsCount)
                    .map(([a,b]) => [a,b] as [string, string])

  return {
    id: "text-pairs",
    uid: new UUID(1).toString(),
    mode: "play",
    pairs,
  }
}
