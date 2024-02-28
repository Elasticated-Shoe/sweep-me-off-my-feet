import { TEvent } from "src/types/TEvent";

export type TEventType = string

export interface IEvent {
  readonly eventType: TEventType
  listAvailableEvents: () => Promise<TEvent[]>
  getEvent: (id: string) => Promise<TEvent>
}