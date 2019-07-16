import { ITrainerConfig } from "../interfaces"

export type ITextTezirovanieTrainerID = "text-tezirovanie"
export type ITextTezirovanieTrainerUI = "text-tezirovanie"

export interface ITextTezirovanieTrainerConfig extends ITrainerConfig {
  id: ITextTezirovanieTrainerID
  ui: ITextTezirovanieTrainerUI

  data: string
}
