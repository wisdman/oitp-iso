import {
  RandomInt,
  ShuffleArray,
  // NewValueArray,
} from "./functions"

import { UUID } from "./uuid"


import {
  IWordsColumnsTrainerConfig,
  IWordsColumnsTrainerColumn,
  IWordsColumnsTrainerWord,
} from "../trainers"

export async function getWordsColumnsConfig(): Promise<IWordsColumnsTrainerConfig> {
  const DATA = await fetch(`/words.json`).then(response => response.json())
  const columnsCount = RandomInt(3, 4)

  const columns = ShuffleArray(Object.entries(DATA.tags))
                  .slice(0, columnsCount)
                  .map(([id, title]) => ({id, title} as IWordsColumnsTrainerColumn) )

  let words = columns.map(({id}) => id)
                     .map((id) => ({ id, arr: ShuffleArray(DATA.data[id].split(",")).slice(0, RandomInt(3, 5))}) )
                     .map(({id, arr}) => arr.map(word => ({id, word}) as  IWordsColumnsTrainerWord) )
                     .flat()

  words = ShuffleArray(words)

  return {
    uid: new UUID(1).toString(),
    id: "words-columns",
    words,
    columns,
  }
}
