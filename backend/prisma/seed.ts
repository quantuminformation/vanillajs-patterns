import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seed/users';

const prisma = new PrismaClient();

const main = async () => {
  const users = await seedUsers(prisma);

};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
