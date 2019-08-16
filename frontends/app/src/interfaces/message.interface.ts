
export interface IMessage {
  type: "NOTICE" | "WARNING" | "ERROR"
  message: string
  timeOut: number
}