import { ITrainerConfig } from "../interfaces"

export type IRelaxTrainerID = "relax"
export type IRelaxTrainerUI = "relax"

export interface IRelaxTrainerConfig extends ITrainerConfig {
  id: IRelaxTrainerID
  ui: IRelaxTrainerUI

  image: number
  data: string
}
