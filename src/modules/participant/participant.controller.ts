import { Body, Controller, Param, Post } from "@nestjs/common";
import { CreateParticipantDto } from "./dto/create-participant.dto";
import { ParticipantService } from "./participant.service";

@Controller("participants")
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  createParticipant(@Body() dto: CreateParticipantDto) {
    return this.participantService.createParticipant(dto);
  }

  @Post("/:token/resend-confirmation-email")
  resendConfirmationEmail(@Param("token") token: string) {
    return this.participantService.resendConfirmationEmail(token);
  }

  @Post("unique")
  isUnique(@Body() dto: { email: string; eventRaceTypeIds: number[] }) {
    return this.participantService.isUnique(dto);
  }
}

