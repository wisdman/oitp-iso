import { UUID } from "../uuid"

import {
  IClassificationTrainerConfig,
  IClassificationTrainerItem,
} from "../../trainers"

interface IClassificationWords {
  group: string
  items: Array<string>
}

function fetchData():  Promise<Array<IClassificationWords>> {
  return fetch("/classification-words.json").then(response => response.json())
}

export async function getClassificationWordsTrainerConfig({
  groupCount,
  itemsCount,
}:{
  groupCount: number
  itemsCount: number
}): Promise<IClassificationTrainerConfig> {

  const DATA = await fetchData()

  const items = DATA.sort(() => Math.random() - 0.5)
                    .slice(0, groupCount)
                    .map(({group, items}) => {
                      return items
                              .sort(() => Math.random() - 0.5)
                              .slice(0, itemsCount)
                              .map(data => {
                                const item: IClassificationTrainerItem = {
                                  data, group
                                }
                                return item
                              })
                    }).flat()
                    .sort(() => Math.random() - 0.5)

  return {
    id: "classification",
    uid: new UUID(1).toString(),
    type: "text",
    items
  }
}