import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUser = async (id: number) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      emailAddress: true,
      firstName: true,
      lastName: true,
    },
  });
};
