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

function fetchMatrixs(): Promise<Array<Array<number>>> {
  return fetch("/matrixs.json").then(response => response.json())
}

export async function getMatrixFillingImagesTrainerConfigs({
  side,
}:{
  side: number
}): Promise<Array<IMatrixFillingTrainerConfig>> {

  const matrixs = await fetchMatrixs()
  const matrix = matrixs
                  .filter(M => Math.sqrt(M.length) === side)
                  .sort(() => Math.random() - 0.5)[0]

  const itemsData = matrix.filter((v, idx, self) => idx === self.indexOf(v))
  const itemsShapes = await Promise.all(ICONS.sort(() => Math.random() - 0.5)
                                             .slice(0, itemsData.length)
                                             .map(fetchIcon)
                                    )

  const items = itemsData
                .map(i => {
                  const item: IMatrixFillingTrainerItem = {
                    shape: itemsShapes[i],
                    color: "#000000",
                    background: "#ffffff",
                  }
                  return item
                })

  const config: IMatrixFillingTrainerConfig =  {
    id: "matrix-filling",
    uid: new UUID(1).toString(),
    mode: "show",
    items,
    matrix
  }

  return [config, {...config, mode: "play"}]
}
