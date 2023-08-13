import { Injectable } from '@nestjs/common';

@Injectable()
export class TrainingService {
  getHello(): string {
    return 'Hello World!';
  }
}
