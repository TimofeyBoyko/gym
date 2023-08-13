import { NestFactory } from '@nestjs/core';
import { NutriotionModule } from './nutriotion.module';

async function bootstrap() {
  const app = await NestFactory.create(NutriotionModule);
  await app.listen(3000);
}
bootstrap();
