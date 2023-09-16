import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';

import { getUserMicroserviceOptions } from '@app/shared/configs';
import { AllExceptionsFilter } from '@app/shared/filters';

import { UserModule } from './user.module';
import { AuthGuard } from '@app/shared/guards';
import { configService } from '@app/shared/services';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

  const options: MicroserviceOptions = getUserMicroserviceOptions();

  app.connectMicroservice<MicroserviceOptions>(options);

  const httpAdapter = app.get(HttpAdapterHost);
  const reflector = app.get(Reflector);
  const jwtService = app.get(JwtService);

  app.setGlobalPrefix('/api/user');
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalGuards(new AuthGuard(jwtService, reflector));

  const userPort = +configService.get('USER_PORT');

  await app.listen(userPort);
}
bootstrap();
