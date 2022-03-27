import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

window.addEventListener('beforeunload', async () => {
  await prisma.$disconnect();
});
