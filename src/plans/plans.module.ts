import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module'; // Certifique-se de usar o caminho correto
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';

@Module({
  imports: [PrismaModule],
  providers: [PlansService],
  controllers: [PlansController],
})
export class PlansModule {}
