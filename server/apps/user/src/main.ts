import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';

import { configService, getUserMicroserviceOptions } from '@app/shared/configs';
import { AllExceptionsFilter } from '@app/shared/filters';

import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

  const options: MicroserviceOptions = getUserMicroserviceOptions();

  app.connectMicroservice<MicroserviceOptions>(options);

  const httpAdapter = app.get(HttpAdapterHost);

  app.setGlobalPrefix('/api/user');
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const userPort = +configService.get('USER_PORT');

  await app.listen(userPort);
}
bootstrap();
