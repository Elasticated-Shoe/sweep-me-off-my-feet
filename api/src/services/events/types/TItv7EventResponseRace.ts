import { TItv7EventResponseRunner } from "./TItv7EventResponseRunner"

export type TItv7EventResponseRace = {
  name: string,
  title: string,
  link:string,
  surface: string,
  going:string,
  winningDistance: string,
  distanceUnit: string,
  distanceText: string,
  raceClass: number,
  commentIcs: string | null,
  startDateTime: string,
  boostedJackpot: string | null,
  runners: TItv7EventResponseRunner[]
}