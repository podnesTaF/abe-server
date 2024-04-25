import { Module } from '@nestjs/common';
import { RaceResultService } from './race-result.service';
import { RaceResultController } from './race-result.controller';

@Module({
  controllers: [RaceResultController],
  providers: [RaceResultService]
})
export class RaceResultModule {}
