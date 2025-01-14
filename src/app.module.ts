import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlansModule } from './plans/plans.module';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma/prisma.service';
import { PlanHistoryModule } from './plan-history/plan-history.module';

@Module({
  imports: [PlansModule, ProductsModule, PlanHistoryModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
