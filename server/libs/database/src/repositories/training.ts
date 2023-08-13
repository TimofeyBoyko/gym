import { TrainingEntity } from '@app/entities';
import { appDataSource } from '../typeorm.config';
import { Injectable } from '@nestjs/common';

export const trainingRepository = appDataSource.getRepository(TrainingEntity);

@Injectable()
export class TrainingRepository {
  constructor() {}

  async get(id: number): Promise<TrainingEntity> {
    const training: TrainingEntity = await trainingRepository.findOneBy({ id });

    return training;
  }

  async getByUserId(userId: number): Promise<TrainingEntity[]> {
    const training: TrainingEntity[] = await trainingRepository.findBy({
      userId,
    });

    return training;
  }

  async getAll(): Promise<TrainingEntity[]> {
    const Trainings: TrainingEntity[] = await trainingRepository.find();

    return Trainings;
  }

  create(): TrainingEntity {
    return trainingRepository.create();
  }

  async save(training: TrainingEntity): Promise<TrainingEntity> {
    const newTraining = await trainingRepository.save(training);

    return newTraining;
  }

  async update(training: TrainingEntity): Promise<void> {
    await trainingRepository.update({ id: training.id }, training);
  }

  async delete(id: number): Promise<void> {
    await trainingRepository.delete({ id });
  }

  async deleteByUserId(userId: number): Promise<void> {
    await trainingRepository.delete({ userId });
  }
}
