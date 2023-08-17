import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { configService } from '../services';

export const getUserMicroserviceOptions = (): MicroserviceOptions => {
  const rbUser = configService.get('RABBITMQ_USER');
  const rbPass = configService.get('RABBITMQ_PASS');
  const rbHost = configService.get('RABBITMQ_HOST');
  const rbUserQueue = configService.get('RABBITMQ_USER_QUEUE');

  const options: MicroserviceOptions = {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${rbUser}:${rbPass}@${rbHost}`],
      queue: rbUserQueue,
      queueOptions: {
        durable: false,
      },
      noAck: false,
    },
  };

  return options;
};
