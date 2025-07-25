import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      emailAddress: true,
      firstName: true,
      lastName: true,
      createdAt: true,
    },
  });
};
