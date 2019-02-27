
import {
  IConfig,
  IResult,
  IImage,
  IСell,
} from "../"

export type IIconsTable = "icons-table"
export type IIconsTableCell = IСell<IImage>

export interface IIconsTableConfig extends IConfig<IIconsTable> {
  mode: "show" | "fill"
  width: number
  height: number
  items: Array<IImage>
  matrix: Array<IIconsTableCell>
}

export interface IIconsTableResult extends IResult<IIconsTable> {
  config: IIconsTableConfig
}