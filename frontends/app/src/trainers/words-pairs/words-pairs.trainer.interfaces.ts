
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IWordsPairsTrainer = "words-pairs"

export type IWordsPairsItemSide = "left" | "right"
export type IWordsPairsType = "antonyms" | "paronyms" | "synonyms"

export interface IWordsPairsItem {
  companion: IWordsPairsItem,

  x: number,
  y: number,

  path: string,
  fillPath: string,

  text: string,

  side: IWordsPairsItemSide
  disabled?: boolean
}

export interface IWordsPairsTrainerConfig extends ITrainerConfig {
  id: IWordsPairsTrainer
  mode: "show" | "play"
  itemsType: IWordsPairsType
  items: Array<[string, string]>

  timeLimit: number
}

export interface IWordsPairsTrainerResult extends ITrainerResult {
  id: IWordsPairsTrainer
  config: IWordsPairsTrainerConfig
  success: number
}
