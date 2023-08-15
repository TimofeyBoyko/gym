import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NutritionEntity } from '@app/entities';

@Injectable()
export class NutritionRepository {
  constructor(
    @InjectRepository(NutritionEntity)
    private nutritionRepository: Repository<NutritionEntity>,
  ) {}

  async get(id: string): Promise<NutritionEntity> {
    const nutrition: NutritionEntity = await this.nutritionRepository.findOneBy(
      {
        id,
      },
    );

    return nutrition;
  }

  async getByUserId(userId: string): Promise<NutritionEntity[]> {
    const nutrition: NutritionEntity[] = await this.nutritionRepository.findBy({
      userId,
    });

    return nutrition;
  }

  async getAll(): Promise<NutritionEntity[]> {
    const nutritions: NutritionEntity[] = await this.nutritionRepository.find();

    return nutritions;
  }

  create(): NutritionEntity {
    return this.nutritionRepository.create();
  }

  async save(Nutrition: NutritionEntity): Promise<NutritionEntity> {
    const newNutrition = await this.nutritionRepository.save(Nutrition);

    return newNutrition;
  }

  async update(nutrition: NutritionEntity): Promise<void> {
    await this.nutritionRepository.update({ id: nutrition.id }, nutrition);
  }

  async delete(id: string): Promise<void> {
    await this.nutritionRepository.delete({ id });
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.nutritionRepository.delete({ userId });
  }
}
