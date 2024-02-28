import { TSweep } from "src/types/TSweep";
import { ISweepDatabase } from "./ISweepDatabase";
import { DatabaseType } from "src/types/DatabaseType";
import { Injectable } from "@nestjs/common";
import { TDatabaseOptions } from "src/config/configuration";

@Injectable()
export class MongoDatabase implements ISweepDatabase {
  public readonly type: DatabaseType = DatabaseType.MONGO;

  public constructor(private readonly config: TDatabaseOptions) {
    
  }

  connect(): Promise<void> {
    console.log("connect for mongo has been called")
    return;
  }

  getSweepById: (id: string) => Promise<TSweep>;
  getSweeps: () => Promise<TSweep[]>;
  createSweep: (sweep: TSweep) => Promise<void>;
  updateSweep: (sweep: TSweep) => Promise<void>;
}