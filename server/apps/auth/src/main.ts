import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AllExceptionsFilter } from '@app/shared/filters';
import { configService } from '@app/shared/services';
import { SHORT_PASSWORD, WRONG_EMAIL } from '@app/shared/errors/auth';

import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const httpAdapter = app.get(HttpAdapterHost);

  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('The auth API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.setGlobalPrefix('/api/auth');
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => {
          const { property } = error;

          let message = '';

          switch (property) {
            case 'email':
              message = WRONG_EMAIL;
              break;
            case 'password':
              message = SHORT_PASSWORD;
              break;
            default:
              message = error.constraints[Object.keys(error.constraints)[0]];
              break;
          }

          return {
            property,
            message,
          };
        });
        return new BadRequestException(result[0]);
      },
      stopAtFirstError: true,
    }),
  );

  const port = +configService.get('AUTH_PORT');

  await app.listen(port);
}
bootstrap();
