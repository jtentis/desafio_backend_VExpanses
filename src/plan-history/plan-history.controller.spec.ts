import { Test, TestingModule } from '@nestjs/testing';
import { PlanHistoryController } from './plan-history.controller';

describe('PlanHistoryController', () => {
  let controller: PlanHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanHistoryController],
    }).compile();

    controller = module.get<PlanHistoryController>(PlanHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
