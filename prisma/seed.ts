import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

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
      name: 'Plano de Celular 50GB',
      description: 'Whatspp ilimitado!',
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Plano de Celular 100GB',
      description: 'Whatspp e Youtube ilimitados!',
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: 'Plano de Celular 150GB',
      description: 'Whatspp, Youtube e Waze ilimitados!',
    },
  });

  const plan1 = await prisma.plan.create({
    data: {
      name: 'Operadora Claro',
      description: 'Planos da Claro!',
      products: {
        connect: [{ id: product1.id }],
      },
    },
  });

  const plan2 = await prisma.plan.create({
    data: {
      name: 'Operadora Tim',
      description: 'Planos da Tim!',
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
