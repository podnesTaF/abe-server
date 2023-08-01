import { Body, Controller, Post } from '@nestjs/common';
import { IntegrationService } from './integration.service';

@Controller('integration')
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @Post('/race-result')
  async createRaceResults(@Body() body: any) {
    console.log(body);
    return await this.integrationService.createRaceResults(body);
  }

  @Post('/race-result/pacer-joker-switch')
  async createRaceResultsPacerJokerSwitch(@Body() body: any) {
    console.log(body);
    return await this.integrationService.createRaceResultsPacerJokerSwitch(
      body,
    );
  }
}
