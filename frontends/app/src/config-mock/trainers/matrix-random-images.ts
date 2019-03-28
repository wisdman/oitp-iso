import { UUID } from "../uuid"

import {
  IMatrixFillingTrainerConfig,
  IMatrixFillingTrainerItem,
} from "../../trainers"

const ICONS_COUNT = 188
const ICONS = Array.from(Array(ICONS_COUNT), (_,i) => `/icons/${i+1}.svg`)

function fetchIcon(url: string) {
  return fetch(url)
          .then(response => response.text())
          .then(text => "data:image/svg+xml;base64," + window.btoa(text))
}

export async function getMatrixFillingRandomImagesTrainerConfigs({
  side,
  itemsCount,
  unique = false,
}:{
  side: number
  itemsCount: number,
  unique?: boolean,
}): Promise<Array<IMatrixFillingTrainerConfig>> {

  const itemsShapes = await Promise.all(ICONS.sort(() => Math.random() - 0.5)
                                             .slice(0, itemsCount)
                                             .map(fetchIcon)
                                    )
  const items = itemsShapes
                .map(shape => {
                  const item: IMatrixFillingTrainerItem = {
                    shape,
                    color: "#000000",
                    background: "#ffffff",
                  }
                  return item
                })

  const matrix = Array.from(Array(side * side), (_,i) => unique ? i : Math.floor(Math.random() * items.length))

  const config: IMatrixFillingTrainerConfig =  {
    id: "matrix-filling",
    uid: new UUID(1).toString(),
    mode: "show",
    items,
    matrix
  }

  return [config, {...config, mode: "play"}]
}
