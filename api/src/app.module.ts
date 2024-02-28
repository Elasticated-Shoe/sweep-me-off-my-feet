import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { ISweepDatabase } from './services/database/ISweepDatabase';
import { SweepDatabaseFactory } from './services/database/SweepDatabaseFactory';
import { Itv7Events } from './services/events/Itv7Events';
import { EventsControler } from './controllers/EventsController';
import { HttpModule } from '@nestjs/axios';
import { SweepsController } from './controllers/SweepsController';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './guards/AuthenticationGuard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    HttpModule,
    JwtModule.register({}),
  ],
  controllers: [
    EventsControler,
    SweepsController
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: ISweepDatabase,
      useFactory: (configService: ConfigService) => SweepDatabaseFactory(configService),
      inject: [
        ConfigService
      ]
    },
    Itv7Events
  ],
})

export class AppModule {}
