import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { config } from "dotenv";
import * as admin from "firebase-admin";
import { AppModule } from "./app.module";
import { firebaseConfig } from "./config/firebase.config";

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);

  admin.initializeApp({
    credential: admin.credential.cert({
      ...firebaseConfig,
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });

  app.enableCors({
    origin: [/^(.*)/],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders:
      "Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for",
  });
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix("api/v1");
  await app.listen(process.env.PORT || 4000, process.env.HOST);
}
bootstrap();
