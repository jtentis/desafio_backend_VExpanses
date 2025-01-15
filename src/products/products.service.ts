import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create({name, description, planId}: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: {
        name,
        description,
        planId
      }
    });

    if (planId) {
        await this.prisma.planHistory.create({
          data: {
            action: `Produto ${product.id} foi adicionado ao plano ${planId}.`,
            planId,
            productId: product.id,
          },
        });
      }
      return product;
  }

  async findAll() {
    return this.prisma.product.findMany({
        include:{
            plan: true
        }
    });
  }

  async findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  //TODO: fix this
  async remove(productId: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Produto com ID ${productId} não encontrado.`);
    }

    const relatedPlans = await this.prisma.planHistory.findMany({
      where: { productId },
      select: { planId: true },
    });

    for (const plan of relatedPlans) {
      await this.prisma.planHistory.create({
        data: {
          action: `Produto ${product.name} foi excluído do plano ${plan.planId}.`,
          planId: plan.planId,
          productId,
        },
      });
    }

    await this.prisma.product.delete({
      where: { id: productId },
    });

    return { message: `Produto ${productId} removido com sucesso.` };
  }
}
