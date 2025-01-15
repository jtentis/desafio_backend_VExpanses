import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) { }

  async create({ name, description, planId }: CreateProductDto) {
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
    const products = await this.prisma.product.findMany();

    if(products.length == 0){
      throw new BadRequestException(`Sem produtos para listar`);
    }

    const product = await this.prisma.product.findMany({
      include: {
        plan: false
      }
    });

    const filteredProduct = product.map(({ planId, ...rest }) => rest);

    return filteredProduct;
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException(`O ID fornecido é inválido.`);
    }

    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`O produto com ID ${id} não foi encontrado.`);
    }

    const { planId, ...filteredProduct } = product;

    return filteredProduct;
  }

  async update(productId: number, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Produto com ID ${productId} não encontrado.`);
    }

    return this.prisma.product.update({
      where: { id: productId },
      data: updateProductDto,
    });
  }

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
