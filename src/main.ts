import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const configService = new ConfigService('.env');
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const options = new DocumentBuilder()
      .setTitle('Hearthstone cards API')
      .setDescription('List of all Heathstone cards APIs')
      .setVersion('1.0')
      .addTag('cards')
      .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(configService.get('NODE_PORT'));
}

bootstrap();
