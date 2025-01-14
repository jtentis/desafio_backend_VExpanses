import { Module } from '@nestjs/common';
import { PlanHistoryService } from './plan-history.service';
import { PlanHistoryController } from './plan-history.controller';

@Module({
  providers: [PlanHistoryService],
  controllers: [PlanHistoryController]
})
export class PlanHistoryModule {}
