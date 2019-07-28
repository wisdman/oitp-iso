export interface ILogItem {
  id: string
}

export type ILog = Array<ILogItem>

export interface IProgressItem {
  id: string
  values: Array<number>
  average: number
}

export interface IProgress {
  charge: number // Заряд мозга
  speed: Array<number> // Скорость мышления
  items: Array<IProgressItem>
}
