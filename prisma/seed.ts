import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // criacao de produtos
  const product1 = await prisma.product.create({
    data: {
      name: 'Produto 1',
      description: 'Descrição do Produto 1',
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Produto 2',
      description: 'Descrição do Produto 2',
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: 'Produto 3',
      description: 'Descrição do Produto 3',
    },
  });

  // criacao de um plano com produtos
  const plan1 = await prisma.plan.create({
    data: {
      name: 'Plano Básico',
      description: 'Plano inicial com produtos básicos.',
      products: {
        connect: [{ id: product1.id }, { id: product2.id }],
      },
    },
  });

  // historico de produtos adicionados ao plano
  await prisma.planHistory.create({
    data: {
      action: 'Adicionado',
      productId: product1.id,
      planId: plan1.id,
    },
  });

  await prisma.planHistory.create({
    data: {
      action: 'Adicionado',
      productId: product2.id,
      planId: plan1.id,
    },
  });

  // criacao de outro plano sem produtos no início
  await prisma.plan.create({
    data: {
      name: 'Plano Premium',
      description: 'Plano premium sem produtos iniciais.',
    },
  });

  console.log('Seed executado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
