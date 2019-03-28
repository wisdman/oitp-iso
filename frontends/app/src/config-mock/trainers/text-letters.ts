import { UUID } from "../uuid"

import {
  ITextLettersTrainerConfig
} from "../../trainers"

function fetchData(): Promise<string> {
  return fetch(`/letters.txt`).then(response => response.text())
}

export async function getTextLettersTrainerConfig(
): Promise<ITextLettersTrainerConfig> {

  const data = await fetchData()
  const sentence = data.split(/[\n\r]+/)
                       .sort((a, b) => a.length < b.length ? -1 : 1)
                       .slice(0, 10)
                       .sort(() => Math.random() - 0.5)
                       [0]

  const consfig: ITextLettersTrainerConfig = {
    id: "text-letters",
    uid: new UUID(1).toString(),
    mode: "show",
    sentence,
  }

  // return [consfig, {...consfig, mode: "play"}]
  return consfig
}
