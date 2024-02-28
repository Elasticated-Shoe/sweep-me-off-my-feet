import { TEvent } from "src/types/TEvent";
import { IEvent } from "./IEvent";
import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { TItv7EventResponseAllRounds } from "./types/TItv7EventResponseAllRounds";
import { TItv7EventResponseRound } from "./types/TItv7EventResponseRound";
import { TItv7EventResponseRace } from "./types/TItv7EventResponseRace";

type TItv7EventResponseRaceWithIds = TItv7EventResponseRace & {roundId: number, raceId: number}

@Injectable()
export class Itv7Events implements IEvent {
  private readonly allRoundsEndpoint = "https://itv7.itv.com/api/v2/round";
  private savedEvents: TEvent[] = [];

  public readonly eventType: string;

  public constructor(
    private readonly httpService: HttpService
  ) {

  }

  public async listAvailableEvents(): Promise<TEvent[]> {
    if(this.savedEvents.length) {
      console.log("returning previously fetched events")
      return this.savedEvents;
    }

    const { data } = await this.httpService.get<TItv7EventResponseAllRounds[]>(this.allRoundsEndpoint).toPromise()

    const roundPromises = data.map(round => this.httpService.get(`${this.allRoundsEndpoint}/${round.id}`).toPromise())
    const rounds: TItv7EventResponseRound[] = (await Promise.all(roundPromises)).flatMap(response => response.data);

    const allRaces = rounds.flatMap(round => round.challenges.map(challenge => ({...challenge, roundId: round.id})));

    const racePromises = allRaces.filter(race => race.race).map<Promise<TItv7EventResponseRaceWithIds>>(race => new Promise(async (resolve) => {
      const { data } = await this.httpService.get(`${this.allRoundsEndpoint}/${race.roundId}/race/${race.race.id}`).toPromise();
      resolve({
        ...data,
        roundId: race.roundId,
        raceId: race.race.id
      });
    }));

    
    const races: TItv7EventResponseRaceWithIds[] = (await Promise.all(racePromises)).flatMap(response => response);

    this.savedEvents = races.map(race => ({
      id: `${race.roundId.toString()}:${race.raceId.toString()}`,
      name: race.name,
      type: "ITV7",
      competitors: race.runners.map(runner => ({
        id: runner.id.toString(),
        name: runner.name
      })),
      startDate: (new Date(race.startDateTime)).getTime(),
      results: null
    }));

    return this.savedEvents;
  }

  getEvent: (id: string) => Promise<TEvent>;
}