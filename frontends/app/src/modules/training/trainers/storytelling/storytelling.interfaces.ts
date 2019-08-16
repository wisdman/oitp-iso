import { ITrainerConfig } from "../interfaces"

export type IStorytellingID = "storytelling"
export type IStorytellingUI = "storytelling"

export interface IStorytellingConfig extends ITrainerConfig {
  id: IStorytellingID
  ui: IStorytellingUI

  image: number
  audio: number
}
