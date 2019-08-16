import { ITrainerConfig } from "../interfaces"

export type IRelaxID = "relax"
export type IRelaxUI = "relax"

export interface IRelaxConfig extends ITrainerConfig {
  id: IRelaxID
  ui: IRelaxUI

  image: number
  data: string
}
