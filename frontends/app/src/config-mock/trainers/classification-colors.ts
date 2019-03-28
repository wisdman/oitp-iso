import { UUID } from "../uuid"

import {
  IClassificationTrainerConfig,
  IClassificationTrainerItem,
} from "../../trainers"

interface IClassificationColors {
  [key: string]: string
}

function fetchData():  Promise<IClassificationColors> {
  return fetch("/classification-colors.json").then(response => response.json())
}

export async function getClassificationColorsTrainerConfig({
  itemsCount = 5,
}:{
  itemsCount?: number
} = {}): Promise<IClassificationTrainerConfig> {

  const DATA = await fetchData()

  const items = Object.entries(DATA)
                      .sort(() => Math.random() - 0.5)
                      .slice(0, itemsCount)
                      .map(([data, group]) => {
                        const item: IClassificationTrainerItem = {
                          data, group
                        }
                        return item
                      })

  return {
    id: "classification",
    uid: new UUID(1).toString(),
    type: "color",
    items,
  }
}

