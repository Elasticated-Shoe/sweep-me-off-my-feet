import { Body, Controller, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { Public } from 'src/guards/Public';
import { ISweepDatabase } from 'src/services/database/ISweepDatabase';
import { TSweep } from 'src/types/TSweep';

@Controller("sweeps")
export class SweepsController {
  constructor(
    @Inject(ISweepDatabase) private readonly database: ISweepDatabase
  ) {}

  @Get("all")
  @Public()
  public async getAllSweeps(): Promise<TSweep[]> {
    return this.database.getSweeps()
  }

  @Put()
  public async createASweep(@Body() requestBody): Promise<void> {
    await this.database.createSweep(requestBody)
  }

  @Get(':id')
  public async getSweepById(@Param('id') id: string): Promise<TSweep> {
    return await this.database.getSweepById(id);
  }

  @Get(':id/:entry')
  public async checkUserStatusForSweep(@Param('id') id: string, @Param('entry') entry: string): Promise<TSweep> {
    return await this.database.getSweepById(id);
  }

  @Post(':id/:entry')
  public async addUserToSweep(@Param('id') id: string, @Param('entry') entry: string): Promise<void> {
    // return await this.database.getSweepById(id);
  }
}
