import { UUID } from "../uuid"

import {
  IImageFieldTrainerConfig,
  IQuestionTrainerConfig,
  IQuestionTrainerAnswer,
} from "../../trainers"

const ICONS_COUNT = 188
const ICONS = Array.from(Array(ICONS_COUNT), (_,i) => `/icons/${i+1}.svg`)

function fetchIcon(url: string) {
  return fetch(url)
          .then(response => response.text())
          .then(text => "data:image/svg+xml;base64," + window.btoa(text))
}

export async function getImageFieldsTrainerConfigs({
  itemsCount,
  fakeCount,
  ansversCount,
}:{
  itemsCount: Array<number>,
  fakeCount: number
  ansversCount: number
}): Promise<Array<IImageFieldTrainerConfig | IQuestionTrainerConfig>> {

  const correctCount = itemsCount.reduce((sum, i) => sum +=i, 0)

  const allItems = await Promise.all(ICONS.sort(() => Math.random() - 0.5)
                                          .slice(0, correctCount + fakeCount)
                                          .map(fetchIcon)
                                    )

  const items = allItems.slice()

  const fields: Array<IImageFieldTrainerConfig> = itemsCount.map(i => items.splice(0,i))
                                                            .map(items => {
                                                              const item: IImageFieldTrainerConfig = {
                                                                id: "image-field",
                                                                uid: new UUID(1).toString(),
                                                                items,
                                                              }
                                                              return item
                                                            })

  const question: IQuestionTrainerConfig = {
    id: "question",
    uid: new UUID(1).toString(),
    body: "<h1>Отметьте фигуры встретившиеся вам ранее</h1>",
    multiple: true,
    button: "Продолжить",
    items: allItems.map((data, i) => {
      const item: IQuestionTrainerAnswer = {
        type: "image",
        correct: i < correctCount,
        data,
      }
      return item
    }).sort(() => Math.random() - 0.5)
      .slice(0, ansversCount)
  }

  return [...fields, question]
}