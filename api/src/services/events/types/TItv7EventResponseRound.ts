import { TItv7EventResponseChallenge } from "./TItv7EventResponseChallenge"

export type TItv7EventResponseRound = {
  id: number,
  status: string,
  startDateTime: string,
  endDateTime: string,
  jackpot: number,
  name: string,
  challenges: TItv7EventResponseChallenge[],
  tieredJackpot: string | null,
  boostedJackpot: string | null,
  festivalId: string | null,
  meetingId: string | null
}