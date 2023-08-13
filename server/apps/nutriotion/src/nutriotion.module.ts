import { Module } from '@nestjs/common';
import { NutriotionController } from './nutriotion.controller';
import { NutriotionService } from './nutriotion.service';

@Module({
  imports: [],
  controllers: [NutriotionController],
  providers: [NutriotionService],
})
export class NutriotionModule {}
