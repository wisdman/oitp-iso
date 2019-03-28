import { UUID } from "../uuid"

import {
  IClassificationTrainerConfig,
  IClassificationTrainerItem,
} from "../../trainers"

const IMAGES = {
  "/images/1.jpg":"Майкл Оуэн",
  "/images/2.jpg":"Сергей Игнашевич",
  "/images/3.jpg":"Криштиану Роналду",
  "/images/4.jpg":"Николас Пареха",
  "/images/5.jpg":"Уэйн Руни",
  "/images/6.jpg":"Златан Ибрагимович",
}



// interface IClassificationImages {
//   [key: string]: string
// }

// function fetchData():  Promise<IClassificationImages> {
//   return fetch("/classification-colors.json").then(response => response.json())
// }

export async function getClassificationImagesTrainerConfig({
  itemsCount = 3,
}:{
  itemsCount?: number
} = {}): Promise<IClassificationTrainerConfig> {

  const items = Object.entries(IMAGES)
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
    type: "image",
    items
  }
}

