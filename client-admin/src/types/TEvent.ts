import { TEventParticipantsResults } from "./TEventParticipantResults";
import { TEventParticipants } from "./TEventParticipants";

export type TEventType = string

export type TEvent = {
  id: string,
  name: string,
  type: TEventType,
  competitors: TEventParticipants[] | null,
  startDate: number
  results: TEventParticipantsResults[] | null
}