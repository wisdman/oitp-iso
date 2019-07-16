import { ITrainerConfig } from "../interfaces"

export type IImageFieldsPreviewTrainerID = "image-fields"
export type IImageFieldsPreviewTrainerUI = "image-fields-preview"

export interface IImageFieldsPreviewTrainerConfig extends ITrainerConfig {
  id: IImageFieldsPreviewTrainerID
  ui: IImageFieldsPreviewTrainerUI

  items: Array<number>
}