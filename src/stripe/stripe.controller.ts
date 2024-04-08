import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  RawBodyRequest,
  Req,
} from "@nestjs/common";
import { Request } from "express";
import { SubscribeDto } from "./dto/subscribe.dto";
import { StripeService } from "./stripe.service";

@Controller("stripe")
export class StripeController {
  @Inject() stripeService: StripeService;

  @Post("webhook")
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Headers("stripe-signature") signature: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    if (!signature)
      throw new BadRequestException("Missing stripe-signature header");
    if (!req.rawBody) throw new BadRequestException("No body provided");
    return this.stripeService.handleWebhook(signature, req.rawBody);
  }

  @Post("/subscribe")
  async subscribeToRole(@Body() subscribeDto: SubscribeDto) {
    const { userId, roleId } = subscribeDto;

    return this.stripeService.createSubscription(userId, roleId);
  }

  @Post("/subscription/success")
  handlePaymentSuccess(@Body() body: { sessionId: string }) {
    return this.stripeService.handleSuccessSubscription(body.sessionId);
  }
}

