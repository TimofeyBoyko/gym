import { NutritionEntity } from '@app/entities';
import { appDataSource } from '../typeorm.config';
import { Injectable } from '@nestjs/common';

export const nutritionRepository = appDataSource.getRepository(NutritionEntity);

@Injectable()
export class NutritionRepository {
  constructor() {}

  async get(id: number): Promise<NutritionEntity> {
    const nutrition: NutritionEntity = await nutritionRepository.findOneBy({
      id,
    });

    return nutrition;
  }

  async getByUserId(userId: number): Promise<NutritionEntity[]> {
    const nutrition: NutritionEntity[] = await nutritionRepository.findBy({
      userId,
    });

    return nutrition;
  }

  async getAll(): Promise<NutritionEntity[]> {
    const nutritions: NutritionEntity[] = await nutritionRepository.find();

    return nutritions;
  }

  create(): NutritionEntity {
    return nutritionRepository.create();
  }

  async save(Nutrition: NutritionEntity): Promise<NutritionEntity> {
    const newNutrition = await nutritionRepository.save(Nutrition);

    return newNutrition;
  }

  async update(nutrition: NutritionEntity): Promise<void> {
    await nutritionRepository.update({ id: nutrition.id }, nutrition);
  }

  async delete(id: number): Promise<void> {
    await nutritionRepository.delete({ id });
  }

  async deleteByUserId(userId: number): Promise<void> {
    await nutritionRepository.delete({ userId });
  }
}
