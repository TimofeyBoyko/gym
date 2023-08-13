import { Injectable } from '@nestjs/common';

@Injectable()
export class NutriotionService {
  getHello(): string {
    return 'Hello World!';
  }
}
