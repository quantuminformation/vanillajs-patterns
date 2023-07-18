import type { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Tony',
    email: 'tony@test.com',
    passwordHash: await bcrypt.hash('password', 10),
    emailVerified: true,
    customFields: {
      test: 'field',
    },
  },
  {
    name: 'Nikos',
    email: 'nikos@test.com',
    passwordHash: await bcrypt.hash('password', 10),
    emailVerified: true,
  },
];

export const seedUsers = (prisma: PrismaClient) =>
  Promise.all(userData.map((data) => prisma.user.create({ data })));
