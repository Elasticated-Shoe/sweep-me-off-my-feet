import { DatabaseType } from "src/types/DatabaseType";
import { ISweepDatabase } from "./ISweepDatabase";
import { MongoDatabase } from "./MongoDatabase";
import { TDatabaseOptions } from "src/config/configuration";
import { ConfigService } from "@nestjs/config";
import { DynamoDatabase } from "./DynamoDatabase";

export const SweepDatabaseFactory = async (config: ConfigService): Promise<ISweepDatabase> => {
  const databaseConfig = config.get<TDatabaseOptions>("database")

  let database: ISweepDatabase; 
  switch (databaseConfig.type) {
    case DatabaseType.MONGO:
      database = new MongoDatabase(databaseConfig)
      break;
    case DatabaseType.DYNAMO:
        database = new DynamoDatabase(databaseConfig)
        break;
    default:
      throw new Error(`Database of type ${databaseConfig.type} not found in factory method`)
  }

  await database.connect()

  return database;
}