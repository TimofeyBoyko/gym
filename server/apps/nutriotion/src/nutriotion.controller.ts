import { Controller, Get } from '@nestjs/common';
import { NutriotionService } from './nutriotion.service';

@Controller()
export class NutriotionController {
  constructor(private readonly nutriotionService: NutriotionService) {}

  @Get()
  getHello(): string {
    return this.nutriotionService.getHello();
  }
}
