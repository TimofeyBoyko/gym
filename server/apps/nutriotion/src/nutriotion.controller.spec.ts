import { Test, TestingModule } from '@nestjs/testing';
import { NutriotionController } from './nutriotion.controller';
import { NutriotionService } from './nutriotion.service';

describe('NutriotionController', () => {
  let nutriotionController: NutriotionController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NutriotionController],
      providers: [NutriotionService],
    }).compile();

    nutriotionController = app.get<NutriotionController>(NutriotionController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(nutriotionController.getHello()).toBe('Hello World!');
    });
  });
});
