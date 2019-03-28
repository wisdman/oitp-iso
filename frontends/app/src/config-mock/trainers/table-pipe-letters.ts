
import {
  ITablePipeTrainerConfig,
  ITablePipeTrainerItemActionType,
} from "../../trainers"

import {
  UUID
} from "../uuid"

const ALPHABET = "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЫЭЮЯ".split("")
const NUMBERS = "1234567890".split("")
const ACTIONS: Array<ITablePipeTrainerItemActionType> = ["up", "down", "left", "right" ]

function getSVG(letter: string) {
  const SVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <text style="color:rgba(0, 0, 0, 0.87);font-family:'Open Sans','Helvetica Neue',sans-serif;font-weight:600;font-size:24px" y="50%" dy="2px" x="50%" dominant-baseline="middle" text-anchor="middle">${letter}</text>
    </svg>
  `.trim()

  const base64 = btoa(SVG.replace(/[\u00A0-\u2666]/g, function(c) {
    return '&#' + c.charCodeAt(0) + ';';
}));

  return "data:image/svg+xml;base64," + base64
}

export async function getTablePipeLettersTrainerConfig({
  type,
  length,
  itemsCount,
}: {
  type: "letters" | "numbers"
  length: number
  itemsCount: 1 | 2 | 3 | 4
}): Promise<ITablePipeTrainerConfig> {

  const rules = (type === "letters" ? ALPHABET : NUMBERS)
                  .sort(() => Math.random() - 0.5)
                  .sort(() => Math.random() - 0.5)
                  .sort(() => Math.random() - 0.5)
                  .slice(0, itemsCount)
                  .map( (c, i) => ({
                    data: getSVG(c),
                    action: ACTIONS[i],
                  }))

  const items = Array.from(Array(length), () => rules[Math.floor(Math.random() * rules.length)])
                     .sort(() => Math.random() - 0.5)
                     .sort(() => Math.random() - 0.5)
                     .sort(() => Math.random() - 0.5)

  return {
    id: "table-pipe",
    uid: new UUID(1).toString(),
    items,
  }
}