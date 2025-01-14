import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('populando database');

  const user1 = await prisma.user.create({
    data: {
      username: 'usuario_teste',
      password: await bcrypt.hash('password_teste', 10),
    },
  });

  const product1 = await prisma.product.create({
    data: {
      name: 'Produto A',
      description: 'Descrição do Produto A',
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Produto B',
      description: 'Descrição do Produto B',
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: 'Produto C',
      description: 'Descrição do Produto C',
    },
  });

  const plan1 = await prisma.plan.create({
    data: {
      name: 'plano básico',
      description: 'plano inicial.',
      products: {
        connect: [{ id: product1.id }],
      },
    },
  });

  const plan2 = await prisma.plan.create({
    data: {
      name: 'plano premium',
      description: 'plano premium com produtos premium',
      products: {
        connect: [{ id: product2.id }, { id: product3.id }],
      },
    },
  });

  //seedando historico só pra nao ficar vazio
  await prisma.planHistory.createMany({
    data: [
      { action: 'Adicionado', planId: plan1.id, productId: product1.id },
      { action: 'Adicionado', planId: plan2.id, productId: product2.id },
      { action: 'Adicionado', planId: plan2.id, productId: product3.id },
    ],
  });

  console.log('historico criado.');
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
