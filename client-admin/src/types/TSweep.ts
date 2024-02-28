import { TEvent } from "./TEvent"

export type TSweep = {
  sweep_id: string,
  openDate: number,
  name: string,
  events: TEvent[]
}