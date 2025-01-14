import { Injectable } from '@nestjs/common';
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

  async remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
