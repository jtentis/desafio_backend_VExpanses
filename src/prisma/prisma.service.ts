import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect(); // conectando com o banco de dados
  }

  async onModuleDestroy() {
    await this.$disconnect(); // desconecta caso destrua o modulo
  }
}
