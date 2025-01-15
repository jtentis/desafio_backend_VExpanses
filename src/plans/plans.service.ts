import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Serviço do Prisma
import { CreatePlanDto } from './dto/create-plan.dto';

@Injectable()
export class PlansService {
    constructor(private prisma: PrismaService) { }

    async create(createPlanDto: CreatePlanDto) {
        const plan = await this.prisma.plan.create({
            data: {
                name: createPlanDto.name,
                description: createPlanDto.description,
                products: {
                    connect: createPlanDto.productIds.map(id => ({ id })),
                },
            },
        });

        for (const productId of createPlanDto.productIds) {
            await this.prisma.planHistory.create({
                data: {
                    action: `Produto ${productId} foi adicionado ao plano ${plan.name}.`,
                    planId: plan.id,
                    productId: productId,
                },
            });
        }
        return plan;
    }

    async addProductToPlan(planId: number, productId: number) {
        const plan = await this.prisma.plan.update({
            where: {
                id: planId,
            },
            data: {
                products: {
                    connect: {
                        id: productId,
                    },
                },
            },
            include: {
                products: true,
            }
        });

        await this.prisma.planHistory.create({
            data: {
                action: `Produto ${productId} adcionado com sucesso!`,
                planId: planId,
                productId: productId,
            },
        });

        return plan;
    }

    async removeProductFromPlan(planId: number, productId: number) {
        const plan = await this.prisma.plan.update({
            where: { id: planId },
            data: {
                products: {
                    disconnect: { id: productId },
                },
            },
        });

        await this.prisma.planHistory.create({
            data: {
                action: `Produto ${productId} removido com sucesso!`,
                planId: planId,
                productId: productId,
            },
        });
        return plan;
    }

    async getPlanDetails(planId: number) {
        const plan = await this.prisma.plan.findUnique({
            where: { id: planId },
            include: {
                products: true,
                planHistory: true,
            },
        });
        return plan;
    }

    async getAllPlanDetails() {
        const plans = await this.prisma.plan.findMany({
            include: {
                products: true,
                planHistory: true,
            },
        });
        return plans;
    }
}
