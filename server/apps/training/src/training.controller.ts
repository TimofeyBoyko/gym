import { Controller, Get } from '@nestjs/common';
import { TrainingService } from './training.service';

@Controller()
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Get()
  getHello(): string {
    return this.trainingService.getHello();
  }
}
