export interface ILogItem {
  id: string
}

export type ILog = Array<ILogItem>

export interface IProgressItem {
  id: string
  values: Array<number>
  average: number
}

export type IProgress = Array<IProgressItem>

