import { NestFactory } from '@nestjs/core';
import { TrainingModule } from './training.module';

async function bootstrap() {
  const app = await NestFactory.create(TrainingModule);
  await app.listen(3000);
}
bootstrap();
