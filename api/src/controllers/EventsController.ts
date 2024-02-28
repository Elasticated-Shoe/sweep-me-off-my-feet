import { Controller, Get, Inject } from '@nestjs/common';
import { ISweepDatabase } from 'src/services/database/ISweepDatabase';
import { IEvent } from 'src/services/events/IEvent';
import { Itv7Events } from 'src/services/events/Itv7Events';
import { TEvent } from 'src/types/TEvent';

@Controller("events")
export class EventsControler {
  private readonly supportedEventSources: IEvent[] = []
  constructor(
    @Inject(Itv7Events) private readonly itv7Event: IEvent
  ) {
    this.supportedEventSources.push(itv7Event)
  }

  @Get("all")
  public async getAllEvents(): Promise<TEvent[]> {
    const events: TEvent[] = []
    for(const eventSource of this.supportedEventSources) {
      const eventSourceEvents = await eventSource.listAvailableEvents();
      events.push(...eventSourceEvents);
    }

    return events;
  }
}
