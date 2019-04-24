
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type ITextPairsTrainer = "text-pairs"

export type ITextPairsItemSide = "left" | "right"
export type ITextPairsType = "antonyms" | "paronyms" | "synonyms" | "specific"

export interface ITextPairsItem {
  companion: ITextPairsItem,
  path: string,
  fillPath: string,
  text: string,
  x: number,
  y: number,

  side: ITextPairsItemSide
  disabled?: boolean
}

export interface ITextPairsTrainerConfig extends ITrainerConfig {
  id: ITextPairsTrainer
  mode: "show" | "play"
  type: ITextPairsType
  items: Array<[string, string]>
}

export interface ITextPairsTrainerResult extends ITrainerResult {
  id: ITextPairsTrainer
  config: ITextPairsTrainerConfig
  success: number
}
