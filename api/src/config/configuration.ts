import { DatabaseType } from "src/types/DatabaseType";

export type TDatabaseOptions = {
  type: DatabaseType,
  host: string,
  port: number,
  username: string,
  password: string
}

export type TConfig = {
  port: number,
  database: TDatabaseOptions
}

const validateDatabaseType = (database: string): string => {
  if(Object.values<string>(DatabaseType).includes(database)) {
    return database
  }

  throw new Error(`Database of type: ${database} is unsupported`);
}

export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  database: {
    type: validateDatabaseType(process.env.DATABASE),
    host: process.env.HOST,
    port: parseInt(process.env.PORT),
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  }
});