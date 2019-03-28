import { UUID } from "../uuid"

import {
  IMatrixFillingTrainerConfig,
  IMatrixFillingTrainerItem,
} from "../../trainers"

function fetchMatrixs(): Promise<Array<Array<number>>> {
  return fetch("/matrixs.json").then(response => response.json())
}

const ALPHABET = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("")

function getSVG(letter: string) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <text style="font-weight:700;color:inherit;fill:currentColor" font-size="24" y="50%" dy="2px" x="50%" dominant-baseline="middle" text-anchor="middle">${letter}</text>
    </svg>
  `.trim()
}

function toImage(svg: string) {
  return "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svg)))
}

export async function getMatrixFillingLettersTrainerConfigs({
  side,
}:{
  side: number
}): Promise<Array<IMatrixFillingTrainerConfig>> {

  const matrixs = await fetchMatrixs()
  const matrix = matrixs
                  .filter(M => Math.sqrt(M.length) === side)
                  .sort(() => Math.random() - 0.5)[0]

  const letters = ALPHABET.sort(() => Math.random() - 0.5)
  const items = matrix.filter((v, idx, self) => idx === self.indexOf(v))
                      .map(i => {
                        const item: IMatrixFillingTrainerItem = {
                          shape: toImage(getSVG(letters[i])),
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
