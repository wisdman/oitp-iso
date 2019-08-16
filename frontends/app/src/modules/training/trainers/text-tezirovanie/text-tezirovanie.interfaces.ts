import { ITrainerConfig } from "../interfaces"

export type ITextTezirovanieID = "text-tezirovanie"
export type ITextTezirovanieUI = "text-tezirovanie"

export interface ITextTezirovanieConfig extends ITrainerConfig {
  id: ITextTezirovanieID
  ui: ITextTezirovanieUI

  text: string
}
