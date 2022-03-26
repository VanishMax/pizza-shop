import { PrismaClient } from '@prisma/client';
import seedData from './seed-data';

const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    seedData.map((pizza, i) => {
      return prisma.pizza.upsert({
        where: { id: i + 1 },
        update: {},
        create: pizza,
      });
    }),
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
