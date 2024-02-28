import { TEvent } from "src/types/TEvent";
import { TSweep } from "src/types/TSweep";
import { ISweepDatabase } from "./ISweepDatabase";
import { DatabaseType } from "src/types/DatabaseType";
import { Injectable } from "@nestjs/common";
import { TDatabaseOptions } from "src/config/configuration";
import * as AWS from "aws-sdk";

const sweepsTableName = "SWEEPS";

const sweepsTable = {
  AttributeDefinitions: [
    {
      AttributeName: "sweep", 
      AttributeType: "S"
    }, 
    {
      AttributeName: "sweep_id", 
      AttributeType: "S"
    }
  ], 
  KeySchema: [
    {
      AttributeName: "sweep", 
      KeyType: "HASH"
    }, 
    {
      AttributeName: "sweep_id", 
      KeyType: "RANGE"
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  },
  TableName: sweepsTableName
};

@Injectable()
export class DynamoDatabase implements ISweepDatabase {
  private dynamodb: AWS.DynamoDB;
  public readonly type: DatabaseType = DatabaseType.DYNAMO;

  public constructor(private readonly config: TDatabaseOptions) {
    
  }
  

  public async connect(): Promise<void> {
    AWS.config.update({
      accessKeyId: "myKeyId",
      secretAccessKey: "secretKey",
      region: "local"
    });

    this.dynamodb = new AWS.DynamoDB({
      endpoint: `http://${this.config.host}:${this.config.port}/`
    });

    await this.dynamodb.deleteTable({
      TableName: sweepsTableName,
    }).promise();

    const tables = await this.dynamodb.listTables().promise();
    if(!tables.TableNames.includes(sweepsTableName)) {
      await this.dynamodb.createTable(sweepsTable).promise()
    }
  }

  public async getSweepById(id: string): Promise<TSweep | null> {
    const result = await this.dynamodb.getItem({
      Key: {
        "sweep": {
          S: "sweep"
        }, 
        "sweep_id": {
          S: id
        }
      }, 
      TableName: sweepsTableName
    }).promise()

    return AWS.DynamoDB.Converter.unmarshall(result.Item) as TSweep | null
  };
    

  public async getSweeps(): Promise<TSweep[]> {
    const params = {
      KeyConditionExpression: "sweep = :sweep",
      ExpressionAttributeValues: {
        ":sweep": { S: "sweep" }
      },
      TableName: sweepsTableName,
    }

    const result = await this.dynamodb.query(params).promise();

    const sweeps = result.Items.map(sweep => AWS.DynamoDB.Converter.unmarshall(sweep) as TSweep);

    return sweeps
  }

  public async createSweep(sweep: TSweep): Promise<void> {
    await this.dynamodb.putItem({
      Item: {
        "sweep": {
          S: "sweep"
        },
        "sweep_id": {
          S: sweep.sweep_id
        },
        "openDate": {
          N: sweep.openDate.toString()
        },
        "name": {
          S: sweep.name
        }
      },
      TableName: sweepsTableName
    }).promise()
  }

  public async updateSweep(sweep: TSweep): Promise<void> {
    await this.createSweep(sweep);
  }
}