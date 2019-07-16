import { ITrainerConfig } from "../interfaces"

export type IStorytellingTrainerID = "storytelling"
export type IStorytellingTrainerUI = "storytelling"

export interface IStorytellingTrainerConfig extends ITrainerConfig {
  id: IStorytellingTrainerID
  ui: IStorytellingTrainerUI

  image: number
  audio: number
}
