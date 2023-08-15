import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TrainingEntity } from '@app/entities';

@Injectable()
export class TrainingRepository {
  constructor(
    @InjectRepository(TrainingEntity)
    private trainingRepository: Repository<TrainingEntity>,
  ) {}

  async get(id: string): Promise<TrainingEntity> {
    const training: TrainingEntity = await this.trainingRepository.findOneBy({
      id,
    });

    return training;
  }

  async getByUserId(userId: string): Promise<TrainingEntity[]> {
    const training: TrainingEntity[] = await this.trainingRepository.findBy({
      userId,
    });

    return training;
  }

  async getAll(): Promise<TrainingEntity[]> {
    const Trainings: TrainingEntity[] = await this.trainingRepository.find();

    return Trainings;
  }

  create(): TrainingEntity {
    return this.trainingRepository.create();
  }

  async save(training: TrainingEntity): Promise<TrainingEntity> {
    const newTraining = await this.trainingRepository.save(training);

    return newTraining;
  }

  async update(training: TrainingEntity): Promise<void> {
    await this.trainingRepository.update({ id: training.id }, training);
  }

  async delete(id: string): Promise<void> {
    await this.trainingRepository.delete({ id });
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.trainingRepository.delete({ userId });
  }
}
