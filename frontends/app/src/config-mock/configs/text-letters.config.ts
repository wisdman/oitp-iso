// Первые буквы

import { UUID } from "../uuid"

import {
  ITextLettersTrainerConfig
} from "../../trainers"

export async function getTextLettersTrainerConfig(): Promise<ITextLettersTrainerConfig> {

  const DATA = await fetch("/letters.txt").then(response => response.text())
  const sentence = DATA.split(/[\n\r]+/)
                       .sort((a, b) => a.length < b.length ? -1 : 1)
                       [Math.floor(Math.random() * 10)]

  return {
    id: "text-letters",
    uid: new UUID(1).toString(),
    sentence,
  }
}