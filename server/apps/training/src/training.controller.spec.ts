import { Test, TestingModule } from '@nestjs/testing';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';

describe('TrainingController', () => {
  let trainingController: TrainingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TrainingController],
      providers: [TrainingService],
    }).compile();

    trainingController = app.get<TrainingController>(TrainingController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(trainingController.getHello()).toBe('Hello World!');
    });
  });
});
