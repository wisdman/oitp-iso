
import {
  ITrainerConfig,
  ITrainerResult,
} from "../interfaces"

export type IImageCanvasTrainer = "image-canvas"

export type IImageCanvasTrainerShapeType = "polygon" | "ellipse"

export interface IImageCanvasTrainerShape {
  type: IImageCanvasTrainerShapeType
  value: Array<Array<number>>

  fill: string
  stroke: string
}


export interface IImageCanvasTrainerConfig extends ITrainerConfig {
  id: IImageCanvasTrainer

  items: Array<IImageCanvasTrainerShape>
  matrix: Array<number>
}

export interface IImageCanvasTrainerResult extends ITrainerResult {
  id: IImageCanvasTrainer
  config: IImageCanvasTrainerConfig
}
