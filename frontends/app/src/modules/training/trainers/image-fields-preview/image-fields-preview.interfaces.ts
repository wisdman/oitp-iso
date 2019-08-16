import { ITrainerConfig } from "../interfaces"

export type IImageFieldsPreviewID = "image-fields"
export type IImageFieldsPreviewUI = "image-fields-preview"

export interface IImageFieldsPreviewConfig extends ITrainerConfig {
  id: IImageFieldsPreviewID
  ui: IImageFieldsPreviewUI

  items: Array<number>
}