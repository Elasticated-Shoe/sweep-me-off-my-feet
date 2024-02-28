import { DatabaseType } from "src/types/DatabaseType"
import { TSweep } from "src/types/TSweep"

export interface ISweepDatabase {
  // can't define static on an interface but please implement as such
  readonly  type: DatabaseType
  connect(): Promise<void>
  getSweepById: (id: string) => Promise<TSweep | null>
  getSweeps: () => Promise<TSweep[]>
  createSweep: (sweep: TSweep) => Promise<void>
  updateSweep: (sweep: TSweep) => Promise<void>
}

export const ISweepDatabase = Symbol("ISweepDatabase");