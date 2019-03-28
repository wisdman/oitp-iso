import { UUID } from "../uuid"

import {
  ITextSortTrainerConfig
} from "../../trainers"

// function fetchData(type: string): Promise<Array<Array<string>>> {
//   return fetch(`/words-${type}.json`).then(response => response.json())
// }

export async function getTextSortTrainerConfig(): Promise<[ITextSortTrainerConfig, ITextSortTrainerConfig]> {

  // const data = await fetchData(type)

  const items = DATA.sort(() => Math.random() - 0.5)[0]
                    .slice(0, 5)

  const config: ITextSortTrainerConfig = {
    id: "text-sort",
    uid: new UUID(1).toString(),
    mode: "show",
    items
  }

  return [config, {...config, mode: "play", items: items.sort(() => Math.random() - 0.5) }]
}

const DATA = [
["ньюфаундленд","кровать","пижама","подснежник","свет","змея","клетка","канарейка","мальчик","корзинка"],
["медведь","газета","взгляд","игрушки","комната","кактус","циферблат","этаж","фонарик","дверь"],
["собака","забор","листок","буквы","георгины","проволока","север","компас","гость","инопланетянин"],
["огрызок","водолаз","одеяло","посуда","цветок","дети","телевизор","учебник","ракетка","штора"],
]