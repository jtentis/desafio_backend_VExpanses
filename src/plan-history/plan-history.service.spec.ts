import { Test, TestingModule } from '@nestjs/testing';
import { PlanHistoryService } from './plan-history.service';

describe('PlanHistoryService', () => {
  let service: PlanHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanHistoryService],
    }).compile();

    service = module.get<PlanHistoryService>(PlanHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
